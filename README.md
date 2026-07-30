# ask-ai

A lightweight Bash CLI for AI API interactions.

**Year:** 2026  
**Author:** live-by-unix  
**GitHub:** https://github.com/live-by-unix/ask-ai

## Overview

`ask-ai` is a minimal, cross-platform Bash CLI tool for interacting with AI APIs. It supports OpenAI-style, Anthropic-style, and local Ollama APIs with a clean, portable implementation that depends only on bash, curl, and jq.

## Features

- **Lightweight:** Only requires bash, curl, and jq
- **Cross-platform:** Works on Linux, macOS, and Windows (via Git Bash)
- **Multiple API Support:** OpenAI, Anthropic, and Ollama
- **Piping Support:** Seamlessly integrate with Unix pipelines
- **JSON Output:** Option for structured JSON responses
- **Error Logging:** Automatic error log creation with UTC timestamps
- **Interactive Config Wizard:** Easy setup for different API types

## Installation

1. Clone the repository:
```bash
git clone https://github.com/live-by-unix/ask-ai.git
cd ask-ai
```

2. Ensure dependencies are installed:
```bash
# On Ubuntu/Debian
sudo apt-get install curl jq

# On macOS
brew install curl jq

# On Windows (Git Bash)
# Download curl and jq, add to PATH
```

3. Make the script executable:
```bash
chmod +x ask-ai
```

4. (Optional) Add to your PATH for global access:
```bash
sudo cp ask-ai /usr/local/bin/
# Or add to your PATH in ~/.bashrc or ~/.zshrc
export PATH="$PATH:/path/to/ask-ai"
```

5. (Optional) Create an alias for easier access:
```bash
# Add to ~/.bashrc or ~/.zshrc
alias ask-ai='/path/to/ask-ai/ask-ai'

# Or if copied to /usr/local/bin/
alias ask-ai='ask-ai'

# Reload your shell configuration
source ~/.bashrc  # or source ~/.zshrc
```

## Usage

### Configuration

Run the interactive configuration wizard:

```bash
./ask-ai config
```

The wizard will prompt you to select one of three request types:

1. **OpenAI-style** - Requires: model, temperature, max_tokens, api_key, endpoint
2. **Anthropic-style** - Requires: model, system_prompt, max_tokens, api_key, endpoint
3. **Ollama-local** - Requires: port, model (no API key needed)

### Chat Command

Send a chat request to the configured API:

```bash
./ask-ai chat <model-local-name>
```

**Options:**
- `--json` - Output structured JSON instead of Markdown

**Examples:**

Interactive chat:
```bash
./ask-ai chat gpt-4
```

Pipe input:
```bash
echo "Explain quantum computing" | ./ask-ai chat claude-3
```

Pipe to file:
```bash
cat prompt.md | ./ask-ai chat gpt-5.5 > response.md
```

JSON output:
```bash
./ask-ai chat gpt-4 --json
```

### Version

Print version information:

```bash
./ask-ai --version
# or
./ask-ai --v
```

### Help

Show usage information:

```bash
./ask-ai --help
# or
./ask-ai -h
```

## Piping Examples

### Config with Piped Input

Pipe a model name directly to the config wizard:

```bash
echo "claude-opus-4.8" | ./ask-ai config
```

This will pre-fill the model name field in the wizard.

### Chat with Piped Prompts

Pipe prompts from files or commands:

```bash
# From file
cat prompt.md | ./ask-ai chat gpt-4

# From command output
ls -la | ./ask-ai chat gpt-4

# Multi-line prompt
printf "Explain this code:\n$(cat script.sh)" | ./ask-ai chat claude-3

# Chain multiple commands
curl -s https://api.example.com/data | ./ask-ai chat gpt-4 > analysis.md
```

### JSON Output with Piping

Combine piping with JSON output for programmatic processing:

```bash
echo "Summarize this" | ./ask-ai chat gpt-4 --json | jq '.choices[0].message.content'
```

## Error Handling

`ask-ai` provides comprehensive error handling with specific exit codes:

- **Exit code 0:** Success
- **Exit code 1:** Configuration error (missing config, invalid JSON)
- **Exit code 2:** Network error (curl failure)
- **Exit code 3:** API error (non-200 HTTP response)

### Error Logs

When errors occur, `ask-ai` automatically creates detailed log files in the `ask-ai-logs/` directory with UTC timestamps:

```
ask-ai-logs/
└── ask-ai-error-2026-07-30T16:47:00Z.log
```

Each log entry includes:
- UTC timestamp
- Error type
- Detailed error message
- Context information

## Config File Location

Configuration is stored in:
```
~/.ask-ai/config.json
```

The config file is created automatically when you run the config wizard. It contains your API keys, endpoints, and model settings.

## Demo Website

A fully interactive demo website is included to showcase `ask-ai` features and provide a visual introduction to the tool.

**Features:**
- Interactive terminal simulation with typing animations
- Live command demonstrations
- Responsive design for all devices
- Copy-to-clipboard functionality for code examples
- Beautiful dark theme with modern UI

**To view the demo website:**

Simply open `index.html` in your web browser:

```bash
# Using a local server (recommended)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Or open directly
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

The demo website includes:
- Hero section with animated terminal
- Feature cards with hover effects
- Installation guide with copyable code blocks
- Usage examples with tabbed interface
- Interactive terminal where you can try commands
- Responsive navigation and footer

## Project Structure

```
ask-ai/
├── ask-ai              # Main executable script
├── README.md           # This file
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # Contribution guidelines
├── SECURITY.md         # Security policy and best practices
├── index.html          # Demo website
├── style.css           # Demo website styles
├── script.js           # Demo website JavaScript
├── docs/               # Detailed documentation
│   ├── config-options.md
│   ├── request-types.md
│   └── troubleshooting.md
└── ask-ai-logs/        # Auto-created error logs (on errors)
```

## Dependencies

- **bash:** Version 4.0 or higher
- **curl:** For HTTP requests
- **jq:** For JSON parsing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**live-by-unix**  
Year: 2026  
GitHub: https://github.com/live-by-unix/ask-ai

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Support

For detailed documentation, see the `docs/` folder:
- [Config Options](docs/config-options.md)
- [Request Types](docs/request-types.md)
- [Troubleshooting Guide](docs/troubleshooting.md)
