import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { ProductCatalogService, CreateProductDto } from './product-catalog.service';

@Controller('v1/products')
@UseGuards(JwtAuthGuard, RbacGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductCatalogService) {}

  @Get()
  @RequirePermissions(Permission.DEAL_READ)
  async getProducts(@User('organizationId') orgId: string) {
    return this.productsService.getProducts(orgId);
  }

  @Post()
  @RequirePermissions(Permission.DEAL_CREATE)
  async createProduct(
    @User('organizationId') orgId: string,
    @Body() dto: CreateProductDto
  ) {
    return this.productsService.createProduct(orgId, dto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DEAL_DELETE)
  async deleteProduct(
    @User('organizationId') orgId: string,
    @Param('id') id: string
  ) {
    return this.productsService.deleteProduct(orgId, id);
  }
}
