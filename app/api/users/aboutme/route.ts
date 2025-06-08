import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {

    const userId = await getDataFromToken(request)
    const user = await User.findById({ _id: userId }).select("-password")
    if(!user)
    {
        return NextResponse.json({ error: "Error fetching user" }, { status: 400 });
    }

    return NextResponse.json({
        message: "User found",
        data: user
    })
  }
  catch(error: any){
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}