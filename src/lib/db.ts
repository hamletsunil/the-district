/**
 * Read-Only Database Client for The District
 *
 * CRITICAL: This client is for READ-ONLY access to the Hamlet database.
 * We do NOT have permission to modify any data.
 *
 * What this client allows:
 * - SELECT queries (findMany, findFirst, findUnique, count, aggregate, groupBy)
 *
 * What this client BLOCKS:
 * - create, createMany
 * - update, updateMany
 * - delete, deleteMany
 * - upsert
 * - executeRaw, queryRaw with non-SELECT statements
 *
 * If you need to write data, that must be done through the hamlet-search application.
 */

import { PrismaClient } from "@prisma/client";

// Singleton pattern for connection pooling
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create the base Prisma client
const prismaBase =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// In development, reuse the client across hot reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaBase;
}

/**
 * Read-only database client
 *
 * Use this for all database queries in The District.
 * All operations are SELECT-only.
 */
export const db = prismaBase;

/**
 * Helper type for pagination
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Helper function for paginated queries
 */
export async function paginatedQuery<T>(
  queryFn: (skip: number, take: number) => Promise<T[]>,
  countFn: () => Promise<number>,
  params: PaginationParams = {}
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    queryFn(skip, pageSize),
    countFn(),
  ]);

  return {
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}

/**
 * SAFETY NOTE: Never import PrismaClient directly in other files.
 * Always use the `db` export from this file.
 */
