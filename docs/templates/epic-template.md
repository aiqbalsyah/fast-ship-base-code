# Epic Template

Use this template for grouping related stories into larger features or initiatives.

---

## Frontmatter

```yaml
---
id: epic-id-kebab-case
title: Epic Title
type: feature | improvement | refactor | infrastructure
status: planning | in-progress | completed
priority: high | medium | low
owner: Team/Person Name
created: YYYY-MM-DD
target_date: YYYY-MM-DD
---
```

---

## Title

# Epic Title

One sentence describing the epic's goal.

---

## Overview

### What

Describe what this epic aims to accomplish. Be specific about the scope.

### Why

Explain the business value, user impact, or technical necessity.

### Success Criteria

How will we know this epic is successful?

- Metric 1: Target value
- Metric 2: Target value
- User outcome: Specific improvement

---

## Goals & Objectives

### Primary Goals

1. **Goal 1:** Description
   - Sub-goal A
   - Sub-goal B

2. **Goal 2:** Description
   - Sub-goal A
   - Sub-goal B

### Secondary Goals (Nice to Have)

- Optional goal 1
- Optional goal 2

---

## User Impact

### Target Users

- User persona 1: How they benefit
- User persona 2: How they benefit

### User Journey Changes

**Before:**
1. Current step 1
2. Current step 2 (pain point)
3. Current step 3

**After:**
1. Improved step 1
2. Pain point resolved
3. New value added

---

## Stories

List all stories that comprise this epic:

### Core Stories (Must Have)

- [ ] [Story 1 Title](link-to-story-1.md) - Status: Draft
- [ ] [Story 2 Title](link-to-story-2.md) - Status: In Progress
- [ ] [Story 3 Title](link-to-story-3.md) - Status: Completed

### Extended Stories (Nice to Have)

- [ ] [Story 4 Title](link-to-story-4.md) - Status: Backlog
- [ ] [Story 5 Title](link-to-story-5.md) - Status: Backlog

### Story Dependencies

```
Story 1 → Story 2 → Story 3
                  ↓
              Story 4
```

---

## Technical Approach

### Architecture Changes

Describe any architectural changes or new patterns introduced.

### Technology Stack

List new technologies, libraries, or tools introduced by this epic.

- Technology 1: Purpose
- Technology 2: Purpose

### Data Model Changes

Describe database schema changes, new tables, or migrations.

### API Changes

List new or modified API endpoints.

---

## Scope

### In Scope

✅ Feature A
✅ Feature B
✅ Integration with System X

### Out of Scope

❌ Feature C (defer to v2)
❌ Integration with System Y (future epic)
❌ Performance optimization (separate epic)

---

## Dependencies

### Internal Dependencies

- Epic/Story: Dependency description
- Team: What we need from them

### External Dependencies

- Third-party service: What we need
- Vendor: Timeline/deliverable

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|---------|-------------|-------------------|
| Risk 1 | High | Medium | Mitigation plan |
| Risk 2 | Medium | Low | Mitigation plan |
| Risk 3 | Low | High | Mitigation plan |

---

## Timeline

### Milestones

- **Week 1-2:** Milestone 1
  - Story 1
  - Story 2

- **Week 3-4:** Milestone 2
  - Story 3
  - Story 4

- **Week 5:** Testing & Polish
  - Integration testing
  - Bug fixes
  - Documentation

- **Week 6:** Launch
  - Deploy to production
  - Monitor metrics
  - Gather feedback

### Critical Path

Identify stories on the critical path that could delay the entire epic.

---

## Testing Strategy

### Test Coverage

- Unit tests: Target XX% coverage
- Integration tests: Key flows covered
- E2E tests: Critical user journeys

### Testing Phases

1. **Development Testing:** Per-story testing
2. **Integration Testing:** Cross-story integration
3. **User Acceptance Testing:** With stakeholders
4. **Performance Testing:** Load and stress tests
5. **Security Testing:** Vulnerability scan

---

## Launch Plan

### Pre-Launch Checklist

- [ ] All core stories completed
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Stakeholder approval
- [ ] Deployment plan reviewed
- [ ] Rollback plan ready
- [ ] Monitoring configured
- [ ] Team trained

### Launch Steps

1. Deploy to staging
2. Smoke test
3. Deploy to production
4. Monitor metrics
5. Communicate to users
6. Gather feedback

### Rollback Plan

If issues arise:
1. Revert to previous version
2. Investigate root cause
3. Fix and re-deploy

---

## Success Metrics

### Key Performance Indicators (KPIs)

- KPI 1: Baseline → Target
- KPI 2: Baseline → Target
- KPI 3: Baseline → Target

### Measurement Period

Track metrics for X weeks/months post-launch.

### Success Threshold

- ✅ Success: KPI targets met
- ⚠️  Partial: Some targets met
- ❌ Failure: Targets not met → investigate and iterate

---

## Resources

### Team

- Product Manager: Name
- Tech Lead: Name
- Developers: Names
- Designer: Name
- QA: Name

### Documentation

- PRD: Link
- Design: Link to Figma
- Architecture: Link to doc
- API Specs: Link

### Meetings

- Kickoff: Date
- Weekly sync: Day/Time
- Demo: Date
- Retrospective: Date

---

## Progress Tracking

### Status Updates

**YYYY-MM-DD:**
- Progress summary
- Completed stories
- Blockers
- Next steps

**YYYY-MM-DD:**
- Progress summary
- ...

---

## Retrospective (Post-Launch)

### What Went Well

- Success 1
- Success 2

### What Could Be Improved

- Issue 1: Lesson learned
- Issue 2: Lesson learned

### Action Items

- [ ] Action 1: Owner
- [ ] Action 2: Owner

---

## Related Epics

- Previous Epic: Link
- Follow-up Epic: Link
- Parallel Epic: Link
