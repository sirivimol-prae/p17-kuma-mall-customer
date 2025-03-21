import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: collections 
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collections' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}