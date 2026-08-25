import { Customer360Service } from '../modules/customer360/customer360.service';

describe('Customer360Service Unit Tests', () => {
  let service: Customer360Service;

  beforeEach(() => {
    service = new Customer360Service();
  });

  it('should instantiate Customer360Service cleanly', () => {
    expect(service).toBeDefined();
  });
});
