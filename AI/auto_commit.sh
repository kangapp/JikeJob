#!/bin/bash

# Ensure we are in a git repository context
# (git commands usually find the root automatically if we are inside the tree)

echo ">>> Adding all changes..."
git add .

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
echo ">>> Committing with message: Auto commit: $TIMESTAMP"
git commit -m "Auto commit: $TIMESTAMP"

echo ">>> Commit Statistics:"
git show --stat HEAD
