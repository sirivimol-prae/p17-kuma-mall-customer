import { PrismaClient } from '@prisma/client';
import { FlashSaleProduct, PaginationInfo } from '@/types/product';

const prisma = new PrismaClient();

export interface GetFlashSaleOptions {
  page: number;
  pageSize: number;
  sort: string;
  minPrice: number;
  maxPrice: number;
  categoryParam: string;
}

export async function getFlashSaleData({
  page, 
  pageSize, 
  sort, 
  minPrice, 
  maxPrice,
  categoryParam
}: GetFlashSaleOptions) {
  try {
    let categoryIds: number[] = [];
    if (categoryParam) {
      categoryIds = categoryParam.split(',').map(id => parseInt(id));
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
    
    const skip = (page - 1) * pageSize;

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

    const formattedGroups: FlashSaleProduct[] = [];
    
    for (const group of groupsWithFlashSale) {
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
        continue;
      }

      let sortedProducts = [...productsWithFlashSale];

      switch (sort) {
        case 'priceAsc':
          sortedProducts.sort((a, b) => a.flash_sale!.flash_sale_price - b.flash_sale!.flash_sale_price);
          break;
        case 'priceDesc':
          sortedProducts.sort((a, b) => b.flash_sale!.flash_sale_price - a.flash_sale!.flash_sale_price);
          break;
        case 'discount':
          sortedProducts.sort((a, b) => b.flash_sale!.flash_sale_per - a.flash_sale!.flash_sale_per);
          break;
        case 'endDate':
        default:
          sortedProducts.sort((a, b) => 
            new Date(a.flash_sale!.end_date).getTime() - new Date(b.flash_sale!.end_date).getTime()
          );
          break;
      }
      
      const productWithFlashSale = sortedProducts[0];
      const flashSale = productWithFlashSale.flash_sale!;
      const imageUrl = group.img_group_product?.img_url_group?.[0] || null;
      
      formattedGroups.push({
        id: group.id,
        uuid: group.uuid,
        title: group.group_name || productWithFlashSale.name_sku || `Group ${group.id}`,
        subname: group.subname || "",
        price: flashSale.flash_sale_price,
        originalPrice: flashSale.price_origin,
        discount: flashSale.flash_sale_per,
        quantity: flashSale.quantity,
        image: imageUrl,
        endDate: flashSale.end_date,
        categories: group.group_categories.map(gc => ({
          id: gc.category.id,
          name: gc.category.name
        })),
        productSku: productWithFlashSale.sku,
        isFlashSale: true
      });
    }
    
    switch (sort) {
      case 'priceAsc':
        formattedGroups.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        formattedGroups.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        formattedGroups.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'endDate':
      default:
        formattedGroups.sort((a, b) => {
          const dateA = a.endDate ? new Date(a.endDate).getTime() : Number.MAX_SAFE_INTEGER;
          const dateB = b.endDate ? new Date(b.endDate).getTime() : Number.MAX_SAFE_INTEGER;
          return dateA - dateB;
        });
        break;
    }
    
    const totalPages = Math.ceil(totalGroups / pageSize);
    const pagination: PaginationInfo = {
      page,
      pageSize,
      totalItems: totalGroups,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return { 
      products: formattedGroups,
      pagination
    };
  } catch (error) {
    console.error('Error fetching flash sale groups:', error);
    throw new Error('Failed to fetch flash sale groups');
  } finally {
    await prisma.$disconnect();
  }
}