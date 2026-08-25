import { Test, TestingModule } from '@nestjs/testing';
import { MultiRegionHealthProberService } from '../src/modules/system/multi-region-health-prober.service';

describe('MultiRegionHealthProberService', () => {
  let service: MultiRegionHealthProberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultiRegionHealthProberService],
    }).compile();
    service = module.get<MultiRegionHealthProberService>(MultiRegionHealthProberService);
  });

  it('should probe US, EU, and APAC edge clusters and return p95 latencies', () => {
    const probes = service.probeAllRegions();
    expect(probes.length).toBe(3);
    expect(probes.every((p) => p.status === 'OPERATIONAL')).toBe(true);
    expect(probes[0].p95LatencyMs).toBeLessThan(50);
  });
});
