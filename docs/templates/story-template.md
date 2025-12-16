# Story Template

Use this template when creating new BMAD stories with `pnpm create:story`.

---

## Frontmatter

```yaml
---
id: story-id-kebab-case
title: Story Title
app: api | web | mobile | shared
status: draft | in-progress | completed
priority: high | medium | low
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

---

## Title

# Story Title

Brief one-liner describing what this story accomplishes.

---

## Overview

Detailed description of what this story is about. Provide context:
- Why this is needed
- What problem it solves
- How it fits into the larger system

---

## User Story

```
As a [user role],
I want to [action/feature],
So that [benefit/value].
```

**Example:**
```
As a registered user,
I want to reset my password via email,
So that I can regain access to my account if I forget my password.
```

---

## Acceptance Criteria

List specific, testable conditions that must be met:

- [ ] Criterion 1: Specific, measurable outcome
- [ ] Criterion 2: Edge case handled
- [ ] Criterion 3: Error state defined
- [ ] Criterion 4: Success state defined
- [ ] Criterion 5: Tests written and passing

**Tips:**
- Be specific and measurable
- Include happy path AND edge cases
- Define expected behavior for errors
- Reference UI states (loading, error, success)

---

## Technical Design

### Approach

Describe the technical approach at a high level.

### Files to Create/Modify

**New files:**
- `path/to/new-file.ts` - Purpose
- `path/to/another-file.ts` - Purpose

**Modified files:**
- `path/to/existing-file.ts` - What changes

### API Endpoints (if applicable)

**New endpoints:**
```
POST /api/resource
GET /api/resource/:id
PUT /api/resource/:id
DELETE /api/resource/:id
```

**Request/Response schemas:**
```typescript
// Request
interface CreateResourceRequest {
  field1: string;
  field2: number;
}

// Response
interface CreateResourceResponse {
  success: boolean;
  data: Resource;
}
```

### Database Changes (if applicable)

**New tables/collections:**
```sql
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  field1 VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Indexes:**
```sql
CREATE INDEX idx_resources_field1 ON resources(field1);
```

### Dependencies

- External library: `library-name` (version)
- Internal package: `@scope/package-name`
- API integration: Service name

---

## Implementation Tasks

Break down the work into specific tasks:

### Phase 1: Setup
- [ ] Install required dependencies
- [ ] Create file structure
- [ ] Set up configuration

### Phase 2: Core Implementation
- [ ] Implement main logic
- [ ] Add error handling
- [ ] Add logging

### Phase 3: Integration
- [ ] Integrate with existing code
- [ ] Update related components
- [ ] Handle side effects

### Phase 4: Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Manual testing checklist

### Phase 5: Documentation
- [ ] Update API documentation
- [ ] Update README if needed
- [ ] Add code comments for complex logic

---

## Testing

### Unit Tests

- [ ] Test: Happy path succeeds
- [ ] Test: Invalid input returns error
- [ ] Test: Edge case X handled
- [ ] Test: Edge case Y handled

### Integration Tests

- [ ] Test: End-to-end flow works
- [ ] Test: Integration with dependency X
- [ ] Test: Error scenarios

### Manual Testing Checklist

- [ ] Scenario 1: [Description]
  - Steps: ...
  - Expected: ...
- [ ] Scenario 2: [Description]
  - Steps: ...
  - Expected: ...

---

## Dependencies

### Prerequisite Stories

- Requires: `story-id-1` (status: completed)
- Requires: `story-id-2` (status: in-progress)

### Blocking Stories

- Blocks: `story-id-3` (cannot start until this is done)

### Related Stories

- Related: `story-id-4` (shares context/domain)

---

## Notes

### Edge Cases

- Edge case 1: How to handle
- Edge case 2: How to handle

### Performance Considerations

- Consider caching if...
- Optimize query for...
- Batch operations when...

### Security Considerations

- Validate input to prevent...
- Require authentication for...
- Rate limit to prevent...

### Future Enhancements

- Enhancement 1 (out of scope for this story)
- Enhancement 2 (potential follow-up)

---

## References

- PRD: Link to requirements
- Design: Link to Figma/design
- API Docs: Link to API documentation
- Related Issue: Link to GitHub issue
- Discussion: Link to discussion thread

---

## Progress Tracking

### Status Updates

**YYYY-MM-DD:**
- Started implementation
- Completed Phase 1 setup

**YYYY-MM-DD:**
- Completed core logic
- Tests written
- Ready for review

---

## Review Checklist

Before marking as complete:

- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Tested in all supported environments
- [ ] Performance acceptable
- [ ] Accessibility checked (if UI)
- [ ] Ready for deployment
