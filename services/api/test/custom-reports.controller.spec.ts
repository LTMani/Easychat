import { Test, TestingModule } from '@nestjs/testing';
import { CustomReportsController } from '../src/modules/controllers/custom-reports.controller';
import { BiPivotEngineService } from '../src/modules/bi/bi-pivot-engine.service';

describe('CustomReportsController', () => {
  let controller: CustomReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomReportsController],
      providers: [BiPivotEngineService],
    }).compile();
    controller = module.get<CustomReportsController>(CustomReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list report definitions', async () => {
    const res = await controller.listReportDefinitions();
    expect(res.status).toBe('success');
    expect(res.data.length).toBeGreaterThanOrEqual(3);
  });
});
