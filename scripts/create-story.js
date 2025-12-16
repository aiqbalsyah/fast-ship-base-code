#!/usr/bin/env node

/**
 * Create Story Script
 *
 * Creates a new BMAD story file with proper structure.
 * Stories are used for planning and tracking development tasks.
 *
 * Usage:
 *   node scripts/create-story.js
 *   pnpm create:story
 */

import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n📝 BMAD Story Creator\n');
  console.log('This will create a new story file for development tasks.\n');

  // Prompt for story details
  const storyTitle = await question('Story title: ');
  const storyApp = await question('App/scope (e.g., api, web, mobile, shared): ');
  const storyOverview = await question('Brief overview: ');

  // Generate story ID from title
  const storyId = storyTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Determine story path based on app
  const storyDir = storyApp === 'shared' || !storyApp
    ? 'docs/stories'
    : `apps/${storyApp}/docs/stories`;

  const storyPath = path.join(process.cwd(), storyDir, `${storyId}.md`);

  // Create story directory if it doesn't exist
  await fs.mkdir(path.dirname(storyPath), { recursive: true });

  // Generate story content
  const storyContent = `---
id: ${storyId}
title: ${storyTitle}
app: ${storyApp || 'shared'}
status: draft
created: ${new Date().toISOString().split('T')[0]}
---

# ${storyTitle}

## Overview

${storyOverview || 'Brief description of what this story accomplishes.'}

## User Story

As a [user role],
I want to [action],
So that [benefit].

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Design

### Approach

Describe the technical approach here.

### Implementation Details

- **Files to create/modify**:
- **Dependencies**:
- **API endpoints** (if applicable):
- **Database changes** (if applicable):

## Tasks

- [ ] Task 1: Setup
- [ ] Task 2: Implementation
- [ ] Task 3: Testing
- [ ] Task 4: Documentation

## Testing

### Manual Testing

- [ ] Test case 1
- [ ] Test case 2

### Automated Testing

- [ ] Unit tests
- [ ] Integration tests

## Dependencies

List any prerequisite stories or external dependencies.

## Notes

Additional context, edge cases, or considerations.

## References

- Link to PRD
- Link to design
- Link to related stories
`;

  // Write story file
  await fs.writeFile(storyPath, storyContent, 'utf-8');

  console.log(`\n✅ Story created successfully!`);
  console.log(`📄 File: ${storyPath}`);
  console.log(`\nNext steps:`);
  console.log(`1. Edit the story file to add details`);
  console.log(`2. Run /bmad:bmm:workflows:dev-story ${storyPath} to start development`);
  console.log(`   Or use your project's story workflow\n`);

  rl.close();
}

main().catch(error => {
  console.error('Error creating story:', error);
  process.exit(1);
});
