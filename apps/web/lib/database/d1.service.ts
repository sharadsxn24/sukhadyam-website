/**
 * D1 Database Service
 * Provides a typed interface to Cloudflare D1 database
 * Uses Cloudflare Workers types
 */

import type { D1Database, D1PreparedStatement, D1ExecResult, D1Result } from '@cloudflare/workers-types';

/**
 * Service to interact with Cloudflare D1 database
 * In production, this would be injected via Cloudflare Workers environment
 */
export class D1Service {
  constructor(private db: D1Database) {}

  /**
   * Execute a raw SQL query
   */
  async exec(query: string): Promise<D1ExecResult> {
    return this.db.exec(query);
  }

  /**
   * Prepare a statement for execution
   */
  prepare(query: string): D1PreparedStatement {
    return this.db.prepare(query);
  }

  /**
   * Execute a batch of statements
   */
  async batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]> {
    return this.db.batch<T>(statements);
  }

  /**
   * Get a single row
   */
  async first<T = unknown>(query: string, ...bindings: unknown[]): Promise<T | null> {
    const stmt = this.db.prepare(query);
    if (bindings.length > 0) {
      stmt.bind(...bindings);
    }
    return stmt.first<T>();
  }

  /**
   * Get all rows
   */
  async all<T = unknown>(query: string, ...bindings: unknown[]): Promise<T[]> {
    const stmt = this.db.prepare(query);
    if (bindings.length > 0) {
      stmt.bind(...bindings);
    }
    const result = await stmt.all<T>();
    return result.results || [];
  }

  /**
   * Execute an insert/update/delete
   */
  async run(query: string, ...bindings: unknown[]): Promise<D1Result> {
    const stmt = this.db.prepare(query);
    if (bindings.length > 0) {
      stmt.bind(...bindings);
    }
    return stmt.run();
  }
}
