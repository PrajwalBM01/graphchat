import { NextRequest, NextResponse } from "next/server"

type ResponseData = {
  message: string
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  console.log(searchParams)
  console.log(id)
  return NextResponse.json<ResponseData>(
    {
      message: `got ${id}`,
    },
    { status: 200 }
  )
}
