import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Data received from ERP:", data);
    return NextResponse.json({ message: "Sync Successful", received: data });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
  }
}
