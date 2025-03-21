import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    const skip = (page - 1) * pageSize;
    const sortBy = searchParams.get('sort') || 'endDate';
  
    let minPrice = parseInt(searchParams.get('minPrice') || '0');
    let maxPrice = parseInt(searchParams.get('maxPrice') || '999999');
    let minQuantity = parseInt(searchParams.get('minQuantity') || '0');
    let maxQuantity = parseInt(searchParams.get('maxQuantity') || '9999');
    
    const categoryParam = searchParams.get('category');
    let categoryIds: number[] = [];
    if (categoryParam) {
      categoryIds = categoryParam.split(',').map(id => parseInt(id));
    }

    let whereCondition: any = {
      status: 'active',
      quantity: { 
        gt: 0,
        gte: minQuantity,
        lte: maxQuantity 
      },
      end_date: { gt: new Date() },
      flash_sale_price: {
        gte: minPrice,
        lte: maxPrice
      }
    };

    let orderBy: any = {};
    switch (sortBy) {
      case 'priceAsc':
        orderBy = { flash_sale_price: 'asc' };
        break;
      case 'priceDesc':
        orderBy = { flash_sale_price: 'desc' };
        break;
      case 'discount':
        orderBy = { flash_sale_per: 'desc' };
        break;
      case 'quantity':
        orderBy = { quantity: 'desc' };
        break;
      case 'endDate':
      default:
        orderBy = { end_date: 'asc' };
        break;
    }

    const flashSaleProducts = await prisma.flash_sale.findMany({
      where: whereCondition,
      include: {
        product: {
          include: {
            img_product: true,
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
      orderBy,
      skip,
      take: pageSize
    });

    const totalFlashSales = await prisma.flash_sale.count({
      where: whereCondition
    });

    const formattedProducts = flashSaleProducts.map(item => {
      const allCategories = item.product.product_group.flatMap(pg => 
        pg.group.group_categories.map(gc => ({
          id: gc.category.id,
          name: gc.category.name
        }))
      );

      if (categoryIds.length > 0 && !allCategories.some(cat => categoryIds.includes(cat.id))) {
        return null;
      }
      
      return {
        id: item.id,
        sku: item.sku,
        title: item.product.name_sku || `สินค้า Flash Sale ${item.id}`,
        price: item.flash_sale_price,
        originalPrice: item.price_origin,
        discount: item.flash_sale_per,
        quantity: item.quantity,
        image: item.product.img_product?.img_url_product || `/images/product-${item.id % 4 + 1}.png`,
        endDate: item.end_date,
        categories: allCategories
      };
    }).filter(Boolean); 

    const totalPages = Math.ceil(totalFlashSales / pageSize);
    const pagination = {
      page,
      pageSize,
      totalItems: totalFlashSales,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return NextResponse.json({ 
      success: true, 
      data: formattedProducts,
      pagination
    });
  } catch (error) {
    console.error('Error fetching flash sale products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flash sale products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}