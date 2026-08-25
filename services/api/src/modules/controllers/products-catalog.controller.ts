import { Controller, Get, Post, Patch, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';

@Controller('v1/products')
export class ProductsCatalogController {
  @Get()
  async listProducts() {
    return {
      status: 'success',
      data: [
        { id: 'p1', name: 'EasyChat Starter Plan', sku: 'ECH-STR-001', price: 49, currency: 'USD', isActive: true },
        { id: 'p2', name: 'EasyChat Professional Plan', sku: 'ECH-PRO-001', price: 99, currency: 'USD', isActive: true },
        { id: 'p3', name: 'EasyChat Enterprise Annual', sku: 'ECH-ENT-ANN', price: 2988, currency: 'USD', isActive: true },
      ],
    };
  }

  @Post()
  async createProduct(@Body() body: { name: string; sku: string; price: number; currency?: string }) {
    if (!body.name || !body.sku || body.price === undefined) {
      throw new BadRequestException('name, sku, and price are required');
    }

    return {
      status: 'success',
      data: {
        id: `prod_${Date.now()}`,
        ...body,
        currency: body.currency || 'USD',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    };
  }
}
