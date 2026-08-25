import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CustomFieldDefinitionService } from '../custom-fields/custom-field-definition.service';

@Controller('v1/custom-fields')
export class CustomFieldsController {
  constructor(private readonly service: CustomFieldDefinitionService) {}

  @Get()
  async listCustomFields(@Query('target') target?: any) {
    return {
      status: 'success',
      data: [],
      meta: { target: target || 'ALL' },
    };
  }

  @Post()
  async createCustomField(@Body() body: any) {
    return {
      status: 'success',
      data: { id: `cf_${Date.now()}`, ...body, createdAt: new Date().toISOString() },
    };
  }

  @Post('validate')
  async validateFieldValues(@Body() body: { target: any; values: Record<string, unknown> }) {
    const result = this.service.validateCustomFieldValuesMap([], body.values || {});
    return {
      status: 'success',
      isValid: result.isValid,
      normalizedPayload: result.normalizedPayload,
      errors: result.errors,
    };
  }

  @Get(':id')
  async getCustomFieldById(@Param('id') id: string) {
    return {
      status: 'success',
      data: { id, name: 'Sample Field', key: 'sample_key', type: 'TEXT', target: 'CONTACT' },
    };
  }

  @Delete(':id')
  async deleteCustomField(@Param('id') id: string) {
    return {
      status: 'success',
      message: `Custom field ${id} deleted successfully`,
    };
  }
}
