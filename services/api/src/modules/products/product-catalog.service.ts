import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  unitPrice: number;
  currency?: string;
}

@Injectable()
export class ProductCatalogService {
  private readonly logger = new Logger(ProductCatalogService.name);

  async createProduct(organizationId: string, dto: CreateProductDto) {
    const existing = await prisma.productCatalog.findFirst({
      where: { organizationId, sku: dto.sku },
    });

    if (existing) {
      throw new BadRequestException(`Product with SKU '${dto.sku}' already exists`);
    }

    this.logger.log(`Creating Product SKU '${dto.sku}' ($${dto.unitPrice}) for org ${organizationId}`);

    return prisma.productCatalog.create({
      data: {
        organizationId,
        name: dto.name,
        sku: dto.sku,
        description: dto.description,
        unitPrice: dto.unitPrice,
        currency: dto.currency || 'USD',
      },
    });
  }

  async getProducts(organizationId: string) {
    return prisma.productCatalog.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteProduct(organizationId: string, productId: string) {
    const product = await prisma.productCatalog.findFirst({
      where: { id: productId, organizationId },
    });

    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    return prisma.productCatalog.delete({
      where: { id: productId },
    });
  }
}
