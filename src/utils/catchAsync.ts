import { NextResponse } from "next/server";

export const catchAsync = (handler: (req: Request, ...args: any[]) => Promise<any>) => {
  return async (req: Request, ...args: any[]) => {
    try {

      return await handler(req, ...args);

    } catch (error: any) {
      console.error('Error:', error);
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Internal server error'
        },
        { status: error.status || 500 }
      );
    }
  };
};