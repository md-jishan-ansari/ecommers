import { Image, User } from "@prisma/client";

export type ProductImage = Image;

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

// The SafeUser type is created using TypeScript utility types:

// Omit<User, "createdAt" | "updatedAt" | "emailVerified"> removes these three properties from the original User type
// Then using the & (intersection type), it adds them back with modified types:
// createdAt: string
// updatedAt: string
// emailVerified: string | null