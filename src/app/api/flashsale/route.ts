import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const flashSaleProducts = await prisma.flash_sale.findMany({
      where: {
        status: 'active',
        quantity: {
          gt: 0
        },
        end_date: {
          gt: new Date()
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
        end_date: 'asc',
      },
    });

    const formattedProducts = flashSaleProducts.map(item => {
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