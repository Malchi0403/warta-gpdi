import { NextRequest, NextResponse } from "next/server";
type Cell = { v?: string | number | boolean | null };

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get("tab");
    const url = `${process.env.URL_SPREADSHEET}tqx=out:json&sheet=${tab}`;

    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    console.log(response,"ini response")
    const cols = json.table.cols;
    const rows = json.table.rows;
    if (tab === "Komsel") {
      const headers = cols
        .slice(0, 6)
        .filter((a: { label: string }) => a.label !== "Ketua")
        .map((b: { label: string }) => b.label.toLowerCase());
      const validRows = rows
        .filter((a: any) => a !== null)
        .map((b: any) => b.c.slice(0, 6))
        .map((a: any) => {
          return a.filter((b: any) => b !== null);
        })
        .filter((a: any) => a.length > 5)
        .slice(-13);

      const data = validRows
        .map((row: any) => {
          const obj: Record<string, string> = {};
          headers.forEach((key: string, i: number) => {
            if (!key) return;
            if (i === 3) {
              obj[key] = row[4]?.v ?? "";
            } else if (i === 4) {
              obj[key] = row[5]?.f ?? "";
            } else if (i === 5) {
              obj[key] = "";
            } else {
              obj[key] = row[i]?.v ?? "";
            }
          });
          return obj;
        })
        .sort((a: any, b: any) => {
          const dateA = new Date(a.tanggal);
          const dateB = new Date(b.tanggal);
          return dateB.getTime() - dateA.getTime();
        });

      return NextResponse.json({ data });
    } else if (tab === "Ibadah Raya") {
      const headers = cols
        .map((a: { label: string }) => {
          if (!a.label) return "";
          if (a.label === "Penerima tamu (tambahan) ") return "";
          if (a.label.startsWith("Tanggal")) return "Tanggal";
          return a.label.trim().replace(/\s+/g, "_");
        })
        .filter(Boolean);

      const validRows = rows
        .map((e: any) => e.c)
        .map((e: any) => {
          if (e.length < 2) return;
          return e.filter((a: Cell | null) => a !== null && a.v !== null);
        })
        .filter((b: number[]) => b.length > 2)
        .slice(-12);
      const dataTanggal: string[][] = [];
      let currentTanggal = "";
      validRows.forEach((row: any) => {
        const values = row.map(
          (s: { v: string }) => s?.v?.toString().trim() || ""
        );
        const first = values[0];

        const isTanggal = /^\d{1,2}\s\w+\s\d{4}$/.test(first);
        const isIbadah = /^Ibadah\s(I{1,3}|IV|V)$/.test(values[1]);

        if (isTanggal && isIbadah) {
          currentTanggal = first;
          dataTanggal.push(values);
        } else if (!isTanggal && isIbadah) {
          dataTanggal.push([currentTanggal, ...values]);
        } else {
          if (dataTanggal.length > 0) {
            dataTanggal[dataTanggal.length - 1].push(...values);
          }
        }
      });

      const result = [];

      for (const ibadah of dataTanggal) {
        const tanggal = ibadah[0];
        let currentGroup: string[] = [];

        for (let i = 1; i < ibadah.length; i++) {
          const val = ibadah[i];
          if (val.startsWith("Ibadah")) {
            if (currentGroup.length > 0) result.push(currentGroup);
            currentGroup = [tanggal, val];
          } else {
            currentGroup.push(val);
          }
        }

        if (currentGroup.length > 0) result.push(currentGroup);
      }
      const data = result.map((row) => {
        const obj: Record<string, string> = {};

        row.forEach((cell: string | null, idx: number) => {
          const key = headers[idx].toLowerCase();
          if (key && cell) {
            obj[key] = cell ?? "";
          }
        });

        return obj;
      });
      return NextResponse.json({ data });
    } else if (tab === "Pemuda") {
      const headers = cols
        .map((a: { label: string }) => {
          if (a.label === "") return;
          return a.label.toLowerCase().replace(" ", "_");
        })
        .filter((a: any) => a !== undefined && a !== "no");
      const validRows = rows
        .map((a: any) => a.c)
        .slice(-8)
        .map((a: any) => {
          return a.filter((b: any, i: number) => {
            if (i !== 0) {
              return b !== null && b.v !== null;
              // return b;
            }
          });
        });
      const data = validRows
        .map((row: any) => {
          const obj: Record<string, string> = {};
          if (row.length === 12) {
            row.forEach((a: { v: string; f: string }, i: number) => {
              if (i === 2) {
                obj[headers[i]] = a?.f ?? "";
              } else {
                obj[headers[i]] = a?.v ?? "";
              }
            });
          } else if (row.length === 6) {
            row.forEach((a: { v: string; f: string }, i: number) => {
              if (i === 5) {
                obj[headers[11]] = a?.v ?? "";
              } else if (i === 4) {
                obj[headers[6]] = a?.v ?? "";
              } else if (i === 2) {
                obj[headers[i]] = a?.f ?? "";
              } else {
                obj[headers[i]] = a?.v ?? "";
              }
            });
          }
          if (obj["tanggal"]) {
            return obj;
          }
        })
        .filter((a: any) => a !== undefined);


      return NextResponse.json({ data });
    } else if (tab === "Doa Jumat") {
      const allowedHeaders = ["tanggal", "jam", "pendoa", "musik_1"];
      const headers = cols
        .map((a: { label: string }) => {
          if (a.label === "") return;
          return a.label.toLowerCase().replace(" ", "_").split("/")[0];
        })
        .filter((label: string) => label && allowedHeaders.includes(label));
      const validRows = rows
        .map((a: any) => a.c)
        .slice(-8)
        .map((a: any) => {
          return a.filter((b: any, i: number) => {
            if (i !== 0) {
              return b !== null;
              // return b;
            }
          });
        });

      const data = validRows.map((row: any) => {
        const obj: Record<string, string> = {};
        row.forEach((a: any, i: number) => {
          if (i === 0) {
            obj[headers[0]] = a.v ?? "";
          } else if (i === 2) {
            obj[headers[1]] = a.f ?? "";
          } else if (i === 3) {
            obj[headers[2]] = a.v ?? "";
          } else if (i === 4) {
            obj[headers[3]] = a.v ?? "";
          }
        });

        return obj;
      });

      return NextResponse.json({ data });
    } else if (tab === "Sekolah Minggu") {
      const allowedHeaders = [
        "tanggal",
        "jam",
        "wl",
        "pembicara_glory",
        "pembicara_imanuel",
        "pembicara_haleluya",
      ];
      const headers = cols
        .map((a: { label: string }) => {
          if (a.label === "") return;
          return a.label.toLowerCase().replace(" ", "_").split("/")[0];
        })
        .filter((label: string) => label && allowedHeaders.includes(label));

      const validRows = rows
        .map((a: any) => a.c)
        .slice(-8)
        .map((a: any) => {
          return a.filter((b: any, i: number) => {
            if (i !== 0) {
              return b !== null;
              // return b;
            }
          });
        });

      const data = validRows.map((row: any) => {
        const obj: Record<string, string> = {};
        row.forEach((a: any, i: number) => {
          if (i === 0) {
            obj[headers[0]] = a.v ?? "";
          } else if (i === 2) {
            obj[headers[1]] = a.f ?? "";
          } else if (i === 3) {
            obj[headers[2]] = a.v ?? "";
          } else if (i === 4) {
            obj[headers[3]] = a.v ?? "";
          } else if (i === 5) {
            obj[headers[4]] = a.v ?? "";
          } else if (i === 6) {
            obj[headers[5]] = a.v ?? "";
          }
        });

        return obj;
      });
      

      return NextResponse.json({ data });
    } else if (tab === "Ibadah Pria") {
      const allowedHeaders = [
        "tanggal",
        "jam",
        "wl",
        "pembicara",
        "musik",
        "alamat",
      ];
      const headers = cols
        .map((a: { label: string }) => {
          if (a.label === "") return;
          return a.label.toLowerCase().replace(" ", "_").split("/")[0];
        })
        .filter((label: string) => label && allowedHeaders.includes(label));
      const validRows = rows
        .map((a: any) => a.c)
        .slice(-4)
        .map((a: any) => {
          return a.filter((b: any, i: number) => {
            if (i !== 0) {
              return b !== null && b.v !== null;
            }
          });
        });

      const data = validRows.map((row: any) => {
        const obj: Record<string, string> = {};
        headers.forEach((a : any,i :number) => {
          if(i === 0) {

            obj[a] = row[i]?.v ?? ""
          } else if(i === 1) {
            obj[a] = row[2]?.f ?? ""
            
          } else if(i === 2) {
            obj[a] = row[3]?.v ?? ""
            
          } else if(i === 5) {
            obj[a] = row[6]?.v ?? "GPdI Shekinah Graha Harapan"

          } else {
            obj[a] = row[i+1]?.v ?? ""
            
          }
        })

        return obj;
      });
      console.log(data);


      return NextResponse.json({ data });
    } else if (tab === "Ibadah Wanita") {
      const allowedHeaders = [
        "tanggal",
        "jam",
        "wl",
        "pembicara",
      ];
      const headers = cols
        .map((a: { label: string }) => {
          if (a.label === "") return;
          return a.label.toLowerCase().replace(" ", "_").split("/")[0];
        })
        .filter((label: string) => label && allowedHeaders.includes(label));
      const validRows = rows
        .map((a: any) => a.c)
        .slice(-4)
        .map((a: any) => {
          return a.filter((b: any, i: number) => {
            if (i !== 0) {
              return b !== null && b.v !== null;
            }
          });
        });

      const data = validRows.map((row: any) => {
        const obj: Record<string, string> = {};
        headers.forEach((a : any,i :number) => {
          if(i === 0) {

            obj[a] = row[i]?.v ?? ""
          } else if(i === 1) {
            obj[a] = row[2]?.f ?? ""
            
          } else {
            obj[a] = row[i+1]?.v ?? ""
            
          }
        })

        return obj;
      });
      console.log(data);

      return NextResponse.json({ data });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch sheet data", { status: 500 });
  }
}
