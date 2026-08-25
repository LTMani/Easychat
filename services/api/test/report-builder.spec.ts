import { Test, TestingModule } from '@nestjs/testing';
import { ReportBuilderService } from '../src/modules/reports/report-builder.service';
import { ReportExporterService } from '../src/modules/reports/report-exporter.service';

describe('Reporting Engine Services', () => {
  let builderService: ReportBuilderService;
  let exporterService: ReportExporterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportBuilderService, ReportExporterService],
    }).compile();

    builderService = module.get<ReportBuilderService>(ReportBuilderService);
    exporterService = module.get<ReportExporterService>(ReportExporterService);
  });

  it('should define reporting services', () => {
    expect(builderService).toBeDefined();
    expect(exporterService).toBeDefined();
  });

  it('should format CSV export headers and rows correctly', () => {
    const title = 'Executive Sales Report';
    const data = [
      { label: 'Qualification', value: 12000, count: 4 },
      { label: 'Proposal Sent', value: 48000, count: 2 },
    ];

    const csv = exporterService.exportToCsv(title, data);

    expect(csv).toContain('Dimension Label,Metric Value,Count');
    expect(csv).toContain('"Qualification",12000,4');
    expect(csv).toContain('"Proposal Sent",48000,2');
  });
});
