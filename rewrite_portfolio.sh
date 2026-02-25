#!/bin/bash
set -e

# Set local config to ensure amend uses correct identity
git config user.name "MeghrajGoudThigulla"
git config user.email "meghraj.thigulla@outlook.com"

# Rebase from root to rewrite author of ALL commits
# GIT_SEQUENCE_EDITOR=: ensures it runs non-interactively
export GIT_SEQUENCE_EDITOR=:

echo "Starting rebase to update author identity..."
git rebase -r --root --exec "git commit --amend --no-edit --reset-author"

echo "Force pushing to origin..."
git push -f origin main
