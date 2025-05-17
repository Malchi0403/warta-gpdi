import { NextResponse } from "next/server";

interface dataThumbnail {
  uri: string;
  id: string;
}
type Video = {
  id: string;
  description?: string;
  title?: string;
  source: string;
  permalink_url: string;
  thumbnails: dataThumbnail[];
};

let cache: { data: Video[]; timestamp: number } | null = null;
const CACHE_DURATION = 1000 * 60 * 5; // 5 menit

export async function GET() {
    const PAGE_ID = process.env.FB_PAGE_ID;
//   const PAGE_ID = 110389493930625;
//   const ACCESS_TOKEN =
//     "EAAR4oZB47qqUBOZBYzcJmwkpokYxNveqjKwmyEFMBGZC29wf89vG6Cvc9WkBkgVbxN7KyfZBLFDQZBDZCVsIZAB7P1jX3WyUZAlbIQUV1kPIiCIyP8UrAL3qHgmVxMHao9sivw7LRO2rKEZCvi1nnZBwwjsmUjx6VZAl1VqWr1CiQ8udWsBqY5g37mgaY0XET93ZC0pnw3ID7iA4sBLSMlvaeY6zvPvpKU1ZCtFGYtZC8ZD";
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

  if (!PAGE_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Environment variables not set" },
      { status: 500 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({ data: cache.data });
  }

  try {
    const url = `https://graph.facebook.com/v22.0/${PAGE_ID}/videos?fields=live_status,id,title,description,source,permalink_url,thumbnails.limit(3){uri,id}&access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const json = await response.json();
    if (json.error) {
      return NextResponse.json({ error: json.error.message }, { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = json.data.filter((item: any) => item.live_status);

    cache = { data: filtered, timestamp: Date.now() };
    return NextResponse.json({ data: filtered });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Facebook videos" },
      { status: 500 }
    );
  }
}
