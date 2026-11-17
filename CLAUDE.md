# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**whosit** is a personal name parser library for Node.js that intelligently parses human names into their component parts (salutation, first, middle, last, suffix). It handles Western name order, lexical order (Last, First), complex international surnames, and various edge cases.

## Commands

### Testing
- `npm test` - Run all tests using Node.js built-in test runner
- `npm run coveralls` - Run tests with coverage reporting and send to Coveralls
- To run a single test file: `node --test test/test.js`

### Linting
- `npx eslint .` - Run ESLint on all files
- ESLint is configured with strict rules (single quotes, semicolons, brace style)

### CI/CD
The GitHub Actions workflow (`.github/workflows/test.yml`) runs on pull requests, pushes to `main`, and manual dispatch. It:
1. Installs dependencies
2. Runs ESLint
3. Runs tests with coverage on the Node version in its `env` (`NODE_VERSION`) and uploads to Coveralls
4. Sends Slack notifications on success/failure

## Architecture

### Core Module Structure
The library is a single module (`index.js`) with one main export:
- `parse(value)` - Returns object with: `{ salutation, first, middle, last, suffix }`

### Key Implementation Details

**Lookup Tables:**
- `salutations` - Recognizes titles (Mr., Dr., Professor, etc.)
- `suffixes` - Handles generational suffixes (Jr., Sr., III, etc.)
- `surnamePrefixes` - Identifies complex surname prefixes (van der, de la, Mac, Ó, etc.)

**Parsing Flow:**
1. Input validation and normalization
2. Lexical format detection and conversion (comma-separated to Western order)
3. Token extraction using regex
4. Sequential component identification based on position and lookup tables

### Test Structure
Tests are in `test/test.js` and cover:
- Western Order (First Last)
- Lexical Order (Last, First)
- Edge Cases (null, undefined, empty)
- Complex Surnames (international naming conventions)

## Important Notes

- **Zero runtime dependencies** - The library is completely standalone
- **ESLint flat config** is used (`eslint.config.js`)
- When modifying the parser, ensure all existing tests pass
- Tokens are whitespace-separated: `value.match(/\S+/g)`, after `lexicalToWestern` has turned "Last, First" into Western order
- Case-insensitive lookups are used for all name component recognition
- **YAML files** - Always alphabetize keys where possible for consistency and readability