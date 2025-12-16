# EXAMPLE Database Choice

⚠️ **This is a PLACEHOLDER file. Delete it and document YOUR database decisions!**

---

## Database Selection

### Primary Database: PostgreSQL 15

**Purpose:** Transactional data, primary data store

**Rationale:**
- ✅ ACID compliance for data integrity
- ✅ Complex queries with JOIN support
- ✅ JSON/JSONB for flexible data
- ✅ Full-text search built-in
- ✅ Battle-tested and reliable
- ✅ Strong typing and constraints
- ✅ Excellent tooling ecosystem

**Hosting:** AWS RDS PostgreSQL

**Version:** 15.x (latest stable)

---

### Cache Layer: Redis 7

**Purpose:** Session storage, caching, real-time features

**Rationale:**
- ✅ In-memory speed for hot data
- ✅ Pub/Sub for real-time updates
- ✅ TTL for automatic expiration
- ✅ Simple key-value operations
- ✅ Support for lists, sets, sorted sets

**Hosting:** AWS ElastiCache for Redis

**Version:** 7.x

---

## Data Strategy

### Schema Design

**Approach:** Normalized relational schema with JSONB for flexible attributes

**Example tables:**
```sql
-- Core entities
users
products
orders
order_items

-- Relationship tables
user_roles
product_categories

-- Audit/history
audit_logs
```

### Migration Strategy

**Tool:** Prisma Migrate

**Process:**
1. Define schema in `schema.prisma`
2. Generate migration: `prisma migrate dev`
3. Apply to production: `prisma migrate deploy`

**Migration files:** Version controlled in `prisma/migrations/`

---

## Alternative Databases Considered

### MongoDB

**Why not chosen:**
- Need for complex joins
- Strong typing requirements
- Team expertise in SQL

**When to reconsider:**
- If schema becomes highly variable
- If document-oriented fits better

### MySQL

**Why not chosen:**
- PostgreSQL has better JSON support
- PostgreSQL full-text search superior
- Personal/team preference for PostgreSQL

**When to reconsider:**
- If MySQL-specific features needed
- If existing MySQL infrastructure

### Firebase Firestore

**Why not chosen:**
- Need for complex queries
- Vendor lock-in concerns
- Cost at scale

**When to reconsider:**
- Rapid prototyping phase
- Real-time requirements dominate
- Small scale with simple data model

---

## Database Architecture

### Connection Pooling

**Tool:** PgBouncer or Prisma connection pooling

**Configuration:**
- Pool size: 20 connections
- Idle timeout: 10 seconds
- Max lifetime: 3600 seconds

### Read Replicas

**Strategy:** Primary-replica setup

- **Primary:** All writes
- **Replicas:** Read-heavy queries (reports, analytics)

**When to implement:** When read load > 70% of capacity

### Backup Strategy

**Automated Backups:**
- Daily full backups (retained 30 days)
- Point-in-time recovery enabled
- Backup window: 2-4 AM UTC

**Backup location:** S3 with cross-region replication

---

## Performance Optimization

### Indexing Strategy

**Standard indexes:**
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

**Composite indexes:**
```sql
CREATE INDEX idx_orders_user_status
ON orders(user_id, status);
```

**Full-text indexes:**
```sql
CREATE INDEX idx_products_search
ON products USING GIN(to_tsvector('english', name || ' ' || description));
```

### Query Optimization

- Use `EXPLAIN ANALYZE` for slow queries
- Limit SELECT to needed columns
- Use pagination for large result sets
- Avoid N+1 queries with proper JOINs or batching

### Caching Strategy

**What to cache:**
- User sessions (Redis, TTL: 24h)
- Frequently accessed config (Redis, TTL: 1h)
- API responses for static data (Redis, TTL: 15m)

**Cache invalidation:**
- Time-based (TTL)
- Event-based (on data update)
- Manual purge (admin endpoint)

---

## Security

### Access Control

- Application uses dedicated database user
- Minimum required permissions (no DROP, ALTER in production)
- Separate users for migrations (elevated permissions)

### Encryption

- **At rest:** AWS RDS encryption enabled
- **In transit:** SSL/TLS required for all connections
- Connection string: `sslmode=require`

### Secrets Management

- Database credentials in AWS Secrets Manager
- Never commit connection strings to git
- Rotate credentials quarterly

---

## Monitoring & Alerts

### Metrics to Track

- **Performance:**
  - Query execution time (p50, p95, p99)
  - Connection pool usage
  - Cache hit ratio

- **Capacity:**
  - CPU usage
  - Memory usage
  - Storage usage
  - Connection count

- **Reliability:**
  - Error rate
  - Replication lag
  - Backup success/failure

### Alerting

```
Critical Alerts:
- CPU > 90% for 5 minutes
- Storage > 90%
- Replication lag > 1 minute
- Backup failure

Warning Alerts:
- CPU > 75% for 10 minutes
- Storage > 75%
- Slow query (> 1s) frequency increasing
```

---

## Development & Testing

### Local Development

**Tool:** Docker Compose

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

### Test Database

- Separate database for integration tests
- Reset between test runs
- Use transactions for test isolation

### Seeding

**Tool:** Prisma seed script

```bash
pnpm prisma db seed
```

Seeds development database with:
- Test users
- Sample products
- Example orders

---

## Scaling Plan

### Vertical Scaling (Short-term)
- Start: db.t3.medium (2 vCPU, 4 GB RAM)
- Scale to: db.r6g.xlarge (4 vCPU, 32 GB RAM)

### Horizontal Scaling (Long-term)
- Add read replicas for read-heavy queries
- Implement connection pooling
- Consider sharding by tenant_id if multi-tenant

### When to Scale
- CPU consistently > 70%
- Query latency increasing
- Connection pool exhaustion

---

## Cost Estimation

### AWS RDS PostgreSQL
- **Instance:** db.t3.medium = ~$70/month
- **Storage:** 100 GB SSD = ~$12/month
- **Backups:** Included up to 100 GB
- **Total:** ~$82/month (starting point)

### AWS ElastiCache Redis
- **Instance:** cache.t3.micro = ~$12/month
- **Total:** ~$12/month

**Estimated Total:** ~$94/month (will scale with usage)

---

## Summary

| Aspect | Choice | Rationale |
|--------|--------|-----------|
| Primary DB | PostgreSQL 15 | ACID, complex queries, JSON support |
| Cache | Redis 7 | Speed, pub/sub, simple operations |
| Hosting | AWS RDS/ElastiCache | Managed, reliable, scalable |
| ORM | Prisma | Type-safe, great DX, migrations |
| Backups | Automated daily | RDS built-in, 30-day retention |

---

**Replace this file with YOUR actual database decisions!**
