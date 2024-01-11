import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {q} = await req.json();
    console.log(q)
    try {
        const data = await axios.get("https://pixabay.com/api/", {

            params: {
              key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY || "",
              q: `${q}`,
              image_type: "photo",
              orientation: "horizontal",
            },
          });
      return NextResponse.json(data, {status: 200})
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching todos' }, {status: 500});
    }
  }