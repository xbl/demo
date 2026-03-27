#!/bin/bash

# Pre-commit hook for SkillHub
# This script runs before each commit

echo "🔍 Running pre-commit checks..."

# Change to skill-hub directory
cd "$(git rev-parse --show-toplevel)/skill-hub" || exit 1

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run type check for client
echo "📝 Type checking client..."
cd client
npx vue-tsc --noEmit
CLIENT_RESULT=$?
cd ..

# Run type check for server
echo "📝 Type checking server..."
cd server
npx tsc --noEmit
SERVER_RESULT=$?
cd ..

# If any check failed, exit with error
if [ $CLIENT_RESULT -ne 0 ]; then
    echo "❌ Client type check failed!"
    exit 1
fi

if [ $SERVER_RESULT -ne 0 ]; then
    echo "❌ Server type check failed!"
    exit 1
fi

echo "✅ All pre-commit checks passed!"
exit 0
