import { PrismaClient } from '@prisma/client';
import { ProductGroup, PaginationInfo } from '@/types/product';

const prisma = new PrismaClient();

export interface GetProductsOptions {
  page: number;
  pageSize: number;
  sort: string;
  minPrice: number;
  maxPrice: number;
  collectionParam: string;
}

export async function getProductsData({
  page, 
  pageSize, 
  sort, 
  minPrice, 
  maxPrice,
  collectionParam
}: GetProductsOptions) {
  try {
    let collectionIds: number[] = [];
    if (collectionParam) {
      collectionIds = collectionParam.split(',').map(id => parseInt(id));
    }
    
    let whereCondition: any = {
      products: {
        some: {
          product: {
            price_origin: {
              gte: minPrice,
              lte: maxPrice
            }
          }
        }
      }
    };
    
    if (collectionIds.length > 0) {
      whereCondition.group_collections = {
        some: {
          collection_id: {
            in: collectionIds
          }
        }
      };
    }
    
    let orderBy: any = {};

    switch (sort) {
      case 'priceAsc':
        orderBy = { id: 'asc' };
        break;
      case 'priceDesc':
        orderBy = { id: 'desc' };
        break;
      case 'latest':
      default:
        orderBy = { create_Date: 'desc' };
        break;
    }

    const skip = (page - 1) * pageSize;

    const groupProducts = await prisma.group_product.findMany({
      where: whereCondition,
      include: {
        group_collections: {
          include: {
            collection: true
          }
        },
        products: {
          include: {
            product: {
              include: {
                flash_sale: true
              }
            }
          },
          where: {
            product: {
              price_origin: {
                gte: minPrice,
                lte: maxPrice
              }
            }
          }
        },
        img_group_product: true
      },
      orderBy,
      skip,
      take: pageSize
    });
    
    const totalGroups = await prisma.group_product.count({
      where: whereCondition
    });

    const formattedGroups: ProductGroup[] = groupProducts.map(group => {
      const productsInPriceRange = group.products.map(p => p.product);
      const prices = productsInPriceRange.map(p => p!.price_origin);
      const minGroupPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const activeFlashSale = productsInPriceRange.find(p => 
        p.flash_sale && 
        p.flash_sale.status === 'active' && 
        p.flash_sale.quantity > 0 && 
        new Date(p.flash_sale.end_date) > new Date()
      );
      const hasDiscount = productsInPriceRange.some(p => p!.make_price !== null && p!.make_price < p!.price_origin);
      const imageUrl = group.img_group_product?.img_url_group?.[0] || null;
      const productData: ProductGroup = {
        id: group.id,
        uuid: group.uuid,
        name: group.group_name,
        subname: group.subname || "",
        image: imageUrl,
        collections: group.group_collections.map(gc => ({
          id: gc.collection.id,
          name: gc.collection.name
        })),
        price: minGroupPrice,
        originalPrice: minGroupPrice,
        hasDiscount
      };

      if (activeFlashSale && activeFlashSale.flash_sale) {
        return {
          ...productData,
          isFlashSale: true,
          flashSalePrice: activeFlashSale.flash_sale.flash_sale_price,
          discount: activeFlashSale.flash_sale.flash_sale_per,
          endDate: activeFlashSale.flash_sale.end_date,
          quantity: activeFlashSale.flash_sale.quantity,
          price: activeFlashSale.flash_sale.flash_sale_price,
          originalPrice: activeFlashSale.flash_sale.price_origin
        };
      }
      
      return productData;
    });

    const flashSaleCount = formattedGroups.filter(product => product.isFlashSale).length;

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
      pagination,
      flashSaleCount
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  } finally {
    await prisma.$disconnect();
  }
}