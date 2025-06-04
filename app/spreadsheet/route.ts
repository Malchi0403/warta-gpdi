type Cell = { v?: string | number | boolean | null };

export async function GET() {
  //   const SHEET_ID = '1uG9OeNzCFbge6yVXDROJU5g-9RvT1qt-7YaBydflQ_A';
  //   const SHEET_NAME = 'Ibadah Raya';
  const url = `https://docs.google.com/spreadsheets/d/1uG9OeNzCFbge6yVXDROJU5g-9RvT1qt-7YaBydflQ_A/gviz/tq?tqx=out:json&sheet=Ibadah Raya`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.cols;
    const cell = json.table.rows;
    const headers = rows
      .map((a: { label: string }) => {
        if (!a.label) return "";
        if (a.label === "Penerima tamu (tambahan) ") return "";
        if (a.label.startsWith("Tanggal")) return "Tanggal";
        return a.label.trim().replace(/\s+/g, "_")
      }).filter(Boolean)

    const validRows = cell
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((e : any) => e.c)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((e : any) => {
        if (e.length < 2) return;
        return e.filter((a : Cell | null) => a !== null && a.v !== null);
      })
      .filter((b : number[]) => b.length > 2)
      .slice(-12);
const dataTanggal: string[][] = [];
let currentTanggal = "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
validRows.forEach((row :any) => {
  const values = row.map((s:{v:string}) => s?.v?.toString().trim() || "");
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
    if (val.startsWith('Ibadah')) {
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
        if(key && cell) {

            obj[key] = cell ?? ""
        }
      });

      return obj;
    });
    return Response.json({ data });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch sheet data", { status: 500 });
  }
}
