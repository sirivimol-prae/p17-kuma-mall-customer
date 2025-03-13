import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ดึงข้อมูลหมวดหมู่จำกัดจำนวน 10 รายการ
    const categories = await prisma.category.findMany({
      take: 10, // จำกัดจำนวนไม่เกิน 10 รายการ
      orderBy: {
        create_Date: 'desc', // เรียงตามวันที่สร้างล่าสุด
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: categories 
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}