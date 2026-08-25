import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCatalogController } from '../src/modules/controllers/products-catalog.controller';

describe('ProductsCatalogController', () => {
  let controller: ProductsCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsCatalogController],
    }).compile();
    controller = module.get<ProductsCatalogController>(ProductsCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list products in catalog', async () => {
    const res = await controller.listProducts();
    expect(res.status).toBe('success');
    expect(res.data.length).toBeGreaterThanOrEqual(3);
  });
});
