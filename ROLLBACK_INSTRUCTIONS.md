# Rollback Instructions

## If Validation System Breaks Something

### Quick Rollback
```bash
git checkout pre-validation-system
git checkout -b recovery-from-validation
```

### Identify What Broke
```bash
git diff pre-validation-system..HEAD
git log pre-validation-system..HEAD --oneline
```

### Selective Rollback
```bash
# Rollback specific file
git checkout pre-validation-system -- path/to/file.tsx

# Rollback scripts directory
git checkout pre-validation-system -- scripts/
```

**Last known good state:** Tagged as `pre-validation-system` on November 12, 2025
