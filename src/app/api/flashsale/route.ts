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
    const categoryParam = searchParams.get('category');
    let categoryIds: number[] = [];
    if (categoryParam) {
      categoryIds = categoryParam.split(',').map(id => parseInt(id));
      console.log('Filtering by categories:', categoryIds);
    }
    const whereCondition: any = {
      products: {
        some: {
          product: {
            AND: [
              {
                flash_sale: {
                  isNot: null
                }
              },
              {
                flash_sale: {
                  status: 'active',
                  quantity: { gt: 0 },
                  end_date: { gt: new Date() },
                  flash_sale_price: {
                    gte: minPrice,
                    lte: maxPrice
                  }
                }
              }
            ]
          }
        }
      }
    };
    if (categoryIds.length > 0) {
      whereCondition.group_categories = {
        some: {
          category_id: {
            in: categoryIds
          }
        }
      };
    }
    const groupsWithFlashSale = await prisma.group_product.findMany({
      where: whereCondition,
      include: {
        img_group_product: true,
        group_categories: {
          include: {
            category: true
          }
        },
        products: {
          include: {
            product: {
              include: {
                flash_sale: true
              }
            }
          }
        }
      },
      skip,
      take: pageSize
    });
    const totalGroups = await prisma.group_product.count({
      where: whereCondition
    });
    const formattedGroups = groupsWithFlashSale.map(group => {
      const productsWithFlashSale = group.products
        .map(p => p.product)
        .filter(product => 
          product.flash_sale && 
          product.flash_sale.status === 'active' &&
          product.flash_sale.quantity > 0 &&
          new Date(product.flash_sale.end_date) > new Date() &&
          product.flash_sale.flash_sale_price >= minPrice &&
          product.flash_sale.flash_sale_price <= maxPrice
        );

      if (productsWithFlashSale.length === 0) {
        return null;
      }

      let sortedProducts = [...productsWithFlashSale];
      if (sortBy === 'priceAsc') {
        sortedProducts.sort((a, b) => a.flash_sale!.flash_sale_price - b.flash_sale!.flash_sale_price);
      } else if (sortBy === 'priceDesc') {
        sortedProducts.sort((a, b) => b.flash_sale!.flash_sale_price - a.flash_sale!.flash_sale_price);
      } else if (sortBy === 'discount') {
        sortedProducts.sort((a, b) => b.flash_sale!.flash_sale_per - a.flash_sale!.flash_sale_per);
      } else {
        sortedProducts.sort((a, b) => 
          new Date(a.flash_sale!.end_date).getTime() - new Date(b.flash_sale!.end_date).getTime()
        );
      }
      const productWithFlashSale = sortedProducts[0];
      const flashSale = productWithFlashSale.flash_sale;
      const imageUrl = group.img_group_product?.img_url_group?.[0] || null;
      return {
        id: group.id,
        uuid: group.uuid,
        title: group.group_name || productWithFlashSale.name_sku || `Group ${group.id}`,
        subname: group.subname || "",
        price: flashSale!.flash_sale_price,
        originalPrice: flashSale!.price_origin,
        discount: flashSale!.flash_sale_per,
        quantity: flashSale!.quantity,
        image: imageUrl,
        endDate: flashSale!.end_date,
        categories: group.group_categories.map(gc => ({
          id: gc.category.id,
          name: gc.category.name
        })),
        productSku: productWithFlashSale.sku,
        isFlashSale: true
      };
    }).filter(Boolean);
    const totalPages = Math.ceil(totalGroups / pageSize);
    const pagination = {
      page,
      pageSize,
      totalItems: totalGroups,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return NextResponse.json({ 
      success: true, 
      data: formattedGroups,
      pagination
    });
  } catch (error) {
    console.error('Error fetching flash sale groups:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flash sale groups', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}