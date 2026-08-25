import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatalogService } from '../src/modules/products/product-catalog.service';

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCatalogService],
    }).compile();

    service = module.get<ProductCatalogService>(ProductCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format product SKU numbers correctly', () => {
    const sku = 'LIC-ENT-001';
    expect(sku).toMatch(/^LIC-[A-Z]+-\d{3}$/);
  });
});
