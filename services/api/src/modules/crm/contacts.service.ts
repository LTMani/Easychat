import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateContactDto, CreateCompanyDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class ContactsService {
  async getContacts(orgId: string): Promise<ApiResponse> {
    const contacts = await prisma.contact.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      include: { company: true },
    });

    return {
      success: true,
      data: contacts,
    };
  }

  async createContact(orgId: string, dto: CreateContactDto): Promise<ApiResponse> {
    const contact = await prisma.contact.create({
      data: {
        organizationId: orgId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        jobTitle: dto.jobTitle,
        companyId: dto.companyId,
        tags: dto.tags || [],
      },
      include: { company: true },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        action: 'CONTACT_CREATED',
        entityType: 'Contact',
        entityId: contact.id,
      },
    });

    return {
      success: true,
      message: 'Contact created successfully',
      data: contact,
    };
  }

  async getCompanies(orgId: string): Promise<ApiResponse> {
    const companies = await prisma.company.findMany({
      where: { organizationId: orgId },
      orderBy: { name: 'asc' },
      include: { contacts: true, deals: true },
    });

    return {
      success: true,
      data: companies,
    };
  }

  async createCompany(orgId: string, dto: CreateCompanyDto): Promise<ApiResponse> {
    const company = await prisma.company.create({
      data: {
        organizationId: orgId,
        name: dto.name,
        domain: dto.domain,
        industry: dto.industry,
        employeeCount: dto.employeeCount,
        annualRevenue: dto.annualRevenue,
        website: dto.website,
      },
    });

    return {
      success: true,
      message: 'Company created successfully',
      data: company,
    };
  }
}
