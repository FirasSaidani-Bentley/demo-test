---
description: Detects and resolves merge conflicts with full project context
---

# Resolve merge conflicts

Run git status to find files with merge conflicts.

For each conflicted file:
1. Read both versions (HEAD and the incoming branch)
2. Use git log to understand the intent of each side
3. Produce a resolution that:
   - Preserves both changes when compatible
   - Keeps the more recent logic when incompatible
   - Adds a one-line comment explaining any trade-off
4. Remove the conflict markers

After all conflicts are resolved, summarize in chat:
- Which files had conflicts
- How each was resolved
- Any decision the team should review

Do not run git add or git commit. Leave that to the user after review.
