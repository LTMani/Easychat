import { RegisterSchema, LoginSchema, CreateConversationSchema } from '../src/dto';
import { ConversationType } from '../src/enums';

describe('Shared DTO Zod Schemas Validation', () => {
  it('should validate valid user registration payload', () => {
    const valid = {
      email: 'test@easychat.io',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      organizationName: 'Acme Corp',
    };
    const result = RegisterSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalid = {
      email: 'not-an-email',
      password: 'short',
      firstName: '',
      lastName: '',
      organizationName: '',
    };
    const result = RegisterSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should validate conversation creation payload', () => {
    const valid = {
      type: ConversationType.DIRECT,
      title: 'Sales Inquiry',
      participantUserIds: ['123e4567-e89b-12d3-a456-426614174000'],
    };
    const result = CreateConversationSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});
