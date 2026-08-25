import { ContactsService } from '../modules/crm/contacts.service';
import { LeadsService } from '../modules/crm/leads.service';
import { DealsService } from '../modules/crm/deals.service';

describe('CRM Services Unit Tests', () => {
  let contactsService: ContactsService;
  let leadsService: LeadsService;
  let dealsService: DealsService;

  beforeEach(() => {
    contactsService = new ContactsService();
    leadsService = new LeadsService();
    dealsService = new DealsService();
  });

  it('should instantiate all CRM services correctly', () => {
    expect(contactsService).toBeDefined();
    expect(leadsService).toBeDefined();
    expect(dealsService).toBeDefined();
  });
});
