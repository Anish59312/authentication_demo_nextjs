import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { username, password } = reqBody;
    console.log(reqBody)

    const user = await User.findOne({username})

    if(!user){
        return NextResponse.json({ error: "User does not exsist" }, { status: 400 });
    }

    console.log(user)

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
    }

    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.name
    } // username and email are unnecessary 

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d'}) //is await needed?

    const response =  NextResponse.json({
        message: "Logged in successfully",
        success: true
    })

    response.cookies.set("token",token, {httpOnly:true})

    return response

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
