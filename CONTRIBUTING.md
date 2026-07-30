# Contributing to ask-ai

Thank you for your interest in contributing to `ask-ai`! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## Getting Started

### Prerequisites

- Bash 4.0 or higher
- curl
- jq
- Basic understanding of shell scripting

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/ask-ai.git
cd ask-ai
```

3. Make the script executable:
```bash
chmod +x ask-ai
```

4. Create a test configuration:
```bash
./ask-ai config
```

## Development Guidelines

### Code Style

- Use 4-space indentation
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions focused and small
- Use `set -euo pipefail` for error handling

### Testing

Test your changes with different scenarios:
- All three request types (OpenAI, Anthropic, Ollama)
- Piping input
- JSON output flag
- Error conditions (invalid config, network errors)
- Cross-platform compatibility (Linux, macOS, Windows Git Bash)

### Security Considerations

- Never hardcode API keys or secrets
- Validate all user input
- Use secure file permissions for sensitive data
- Sanitize error messages to avoid leaking sensitive information
- Follow the guidelines in SECURITY.md

## Making Changes

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test thoroughly

3. Commit your changes with a clear message:
```bash
git commit -m "Add: brief description of your changes"
```

4. Push to your fork:
```bash
git push origin feature/your-feature-name
```

5. Create a pull request on GitHub

## Pull Request Guidelines

### Title

Use a clear, descriptive title:
- `Add: Support for new API provider`
- `Fix: Handle empty piped input correctly`
- `Docs: Update installation instructions`

### Description

Include:
- What changes you made
- Why you made them
- How you tested them
- Any relevant issues or documentation

### Checklist

- [ ] Code follows the project's style guidelines
- [ ] Changes are tested on multiple platforms
- [ ] Documentation is updated if needed
- [ ] No sensitive information is included
- [ ] Commit messages are clear and descriptive

## Reporting Bugs

When reporting bugs, include:
- OS and version
- Bash version
- Versions of curl and jq
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages and logs

## Suggesting Features

When suggesting features:
- Describe the use case
- Explain how it would benefit users
- Consider implementation complexity
- Check if it aligns with the project's lightweight philosophy

## Documentation

- Keep documentation up to date with code changes
- Use clear, concise language
- Include examples for new features
- Update the troubleshooting guide for known issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for questions or discussions about potential contributions.

## Author

**live-by-unix**  
Year: 2026  
GitHub: https://github.com/live-by-unix/ask-ai
