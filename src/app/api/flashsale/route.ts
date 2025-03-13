import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ดึงข้อมูล FlashSale ที่ยังไม่หมดอายุและยังมีสินค้า
    const flashSaleProducts = await prisma.flash_sale.findMany({
      where: {
        status: 'active',
        quantity: {
          gt: 0 // มีจำนวนสินค้ามากกว่า 0
        },
        end_date: {
          gt: new Date() // วันที่สิ้นสุดยังไม่มาถึง
        }
      },
      include: {
        product: {
          include: {
            product_group: {
              include: {
                group: {
                  include: {
                    group_categories: {
                      include: {
                        category: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        end_date: 'asc', // เรียงตามเวลาที่ใกล้จะหมดอายุก่อน
      },
    });

    // แปลงข้อมูลให้เหมาะกับการใช้งานทางฝั่ง Frontend
    const formattedProducts = flashSaleProducts.map(item => {
      // รวบรวมหมวดหมู่ทั้งหมดของสินค้า
      const categories = item.product.product_group.flatMap(pg => 
        pg.group.group_categories.map(gc => ({
          id: gc.category.id,
          name: gc.category.name
        }))
      );
      
      return {
        id: item.id,
        sku: item.sku,
        title: item.product.name_sku || `สินค้า Flash Sale ${item.id}`,
        price: item.flash_sale_price,
        originalPrice: item.price_origin,
        discount: item.flash_sale_per,
        quantity: item.quantity,
        image: item.product.img_url || `/images/product-${item.id % 4 + 1}.png`,
        endDate: item.end_date,
        categories: categories
      };
    });

    return NextResponse.json({ 
      success: true, 
      data: formattedProducts 
    });
  } catch (error) {
    console.error('Error fetching flash sale products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flash sale products' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}