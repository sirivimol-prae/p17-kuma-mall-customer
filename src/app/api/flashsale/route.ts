// ปรับปรุง src/app/api/flashsale/route.ts
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
    }

    // 1. ค้นหา group_product ที่มีสินค้าที่มี flash_sale
    const groupsWithFlashSale = await prisma.group_product.findMany({
      where: {
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
        },
        ...(categoryIds.length > 0 ? {
          group_categories: {
            some: {
              category_id: {
                in: categoryIds
              }
            }
          }
        } : {})
      },
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

    // 2. นับจำนวนทั้งหมดสำหรับ pagination
    const totalGroups = await prisma.group_product.count({
      where: {
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
        },
        ...(categoryIds.length > 0 ? {
          group_categories: {
            some: {
              category_id: {
                in: categoryIds
              }
            }
          }
        } : {})
      }
    });

    // 3. แปลงข้อมูลให้ตรงตามที่ต้องการ
    const formattedGroups = groupsWithFlashSale.map(group => {
      // หาสินค้าที่มี flash_sale และตรงตามเงื่อนไข
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
        return null; // ข้าม group ที่ไม่มี flash sale ที่ตรงเงื่อนไข
      }

      // เรียงลำดับตามเงื่อนไข
      let sortedProducts = [...productsWithFlashSale];
      if (sortBy === 'priceAsc') {
        sortedProducts.sort((a, b) => a.flash_sale!.flash_sale_price - b.flash_sale!.flash_sale_price);
      } else if (sortBy === 'priceDesc') {
        sortedProducts.sort((a, b) => b.flash_sale!.flash_sale_price - a.flash_sale!.flash_sale_price);
      } else if (sortBy === 'discount') {
        sortedProducts.sort((a, b) => b.flash_sale!.flash_sale_per - a.flash_sale!.flash_sale_per);
      } else {
        // 'endDate' เป็นค่าเริ่มต้น
        sortedProducts.sort((a, b) => 
          new Date(a.flash_sale!.end_date).getTime() - new Date(b.flash_sale!.end_date).getTime()
        );
      }

      // เลือกสินค้าตัวแรกหลังเรียงลำดับ
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