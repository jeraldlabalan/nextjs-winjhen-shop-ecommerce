import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role, 
      phone, 
      address, 
      city, 
      state, 
      zipCode, 
      country 
    } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate role (only EMPLOYEE and RESELLER_CUSTOMER allowed)
    if (!["EMPLOYEE", "RESELLER_CUSTOMER"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Only EMPLOYEE and RESELLER_CUSTOMER are allowed" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        country,
        role: role as "EMPLOYEE" | "RESELLER_CUSTOMER",
        isActive: true,
        emailVerified: true // Admin-created accounts are pre-verified
      }
    });

    // Remove password from response
    const { password: _removedPassword, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "Account created successfully",
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create account error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
      );
  }
}
