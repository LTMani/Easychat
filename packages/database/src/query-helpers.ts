import { PrismaClient } from '@prisma/client';

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class DatabaseQueryHelper {
  constructor(private prisma: PrismaClient) {}

  /**
   * Helper method for tenant-isolated paginated queries
   */
  async paginate<T, K>(
    modelName: keyof PrismaClient,
    organizationId: string,
    params: PaginationParams = {},
    whereCondition: Record<string, any> = {},
    includeRelation: Record<string, any> | undefined = undefined
  ): Promise<PaginatedResult<T>> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20));
    const skip = (page - 1) * limit;

    const where = {
      organizationId,
      ...whereCondition,
    };

    const orderBy = params.sortBy
      ? { [params.sortBy]: params.sortOrder || 'desc' }
      : { createdAt: 'desc' };

    const modelDelegate = (this.prisma as any)[modelName];
    if (!modelDelegate) {
      throw new Error(`Prisma model ${String(modelName)} not found`);
    }

    const [total, data] = await Promise.all([
      modelDelegate.count({ where }),
      modelDelegate.findMany({
        where,
        take: limit,
        skip,
        orderBy,
        include: includeRelation,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  /**
   * Audit log writer helper
   */
  async recordAuditLog(
    organizationId: string | null,
    userId: string | null,
    action: string,
    entityType: string,
    entityId: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        organizationId,
        userId,
        action,
        entityType,
        entityId,
        metadata: metadata ? JSON.stringify(metadata) : null,
        ipAddress,
        userAgent,
      },
    });
  }

  /**
   * Security log helper
   */
  async recordSecurityLog(
    userId: string | null,
    event: string,
    ipAddress?: string,
    userAgent?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.prisma.securityLog.create({
      data: {
        userId,
        event,
        ipAddress,
        userAgent,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  }
}
