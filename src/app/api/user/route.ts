// import bcrypt from 'bcrypt';
// import getCurrentUser from "@/src/actions/getCurrentUser";
import {prisma} from "@/src/libs/prismadb";
// import { NextResponse } from "next/server";

import { NextResponse } from "next/server";

import { withAuth } from "@/src/utils/withAuth";
// import { catchAsync } from "@/src/utils/catchAsync";

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { email, name, password } = body;

//   const hashedPassword = await bcrypt.hash(password, 12);

//   const user = await prisma.user.create({
//     data: {
//       email,
//       name,
//       hashedPassword,
//     },
//   });

//   return NextResponse.json(user);
// }

export async function POST(request: Request) {

    try {
        const {email, name} = await request.json();
        // Create new user
        const user = await prisma.user.create({
           data: {
               email,
               name
           }
       });

       return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json(error.message)
    }
}

// export const GET = catchAsync(async (req: Request) => {
//     const users = await prisma.user.findMany();

//     return NextResponse.json({
//       success: true,
//       data: users
//     });
//   }
// );

// export const GET = withAuth(async (req: Request) => {
//     const users = await prisma.user.findMany();

//     return NextResponse.json({
//       success: true,
//       data: users
//     });
//   }
// );

export const GET = withAuth(async (req: Request) => {
    console.log(req.body);
    const users = await prisma.user.findMany();

    return NextResponse.json({
      success: true,
      data: users
    });
});