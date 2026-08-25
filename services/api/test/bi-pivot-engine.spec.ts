import { Test, TestingModule } from '@nestjs/testing';
import { BiPivotEngineService } from '../src/modules/bi/bi-pivot-engine.service';

describe('BiPivotEngineService', () => {
  let service: BiPivotEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiPivotEngineService],
    }).compile();
    service = module.get<BiPivotEngineService>(BiPivotEngineService);
  });

  it('should aggregate SUM metric across multi-level dimensions', () => {
    const rows = [
      { country: 'US', stage: 'Won', value: 100 },
      { country: 'US', stage: 'Lost', value: 50 },
      { country: 'DE', stage: 'Won', value: 200 },
    ];

    const result = service.buildPivotTable({
      rows,
      rowDimensions: ['country', 'stage'],
      metricField: 'value',
      aggregationType: 'SUM',
    });

    expect(result.value).toBe(350);
    expect(result.count).toBe(3);
    expect(result.children?.['US'].value).toBe(150);
    expect(result.children?.['US'].children?.['Won'].value).toBe(100);
    expect(result.children?.['DE'].value).toBe(200);
  });

  it('should aggregate AVG metric accurately', () => {
    const rows = [
      { category: 'A', score: 10 },
      { category: 'A', score: 20 },
      { category: 'B', score: 30 },
    ];

    const result = service.buildPivotTable({
      rows,
      rowDimensions: ['category'],
      metricField: 'score',
      aggregationType: 'AVG',
    });

    expect(result.value).toBe(20);
    expect(result.children?.['A'].value).toBe(15);
    expect(result.children?.['B'].value).toBe(30);
  });
});
