# Configuration Options

This document provides detailed information about the configuration options available in `ask-ai`.

## Setting Up Aliases

For easier access to `ask-ai`, you can create shell aliases. This allows you to run the command from anywhere without typing the full path.

### Bash

Add to your `~/.bashrc`:
```bash
# If script is in a specific directory
alias ask-ai='/path/to/ask-ai/ask-ai'

# If copied to /usr/local/bin/
alias ask-ai='ask-ai'

# Reload configuration
source ~/.bashrc
```

### Zsh

Add to your `~/.zshrc`:
```bash
# If script is in a specific directory
alias ask-ai='/path/to/ask-ai/ask-ai'

# If copied to /usr/local/bin/
alias ask-ai='ask-ai'

# Reload configuration
source ~/.zshrc
```

### Fish

Add to your `~/.config/fish/config.fish`:
```bash
# If script is in a specific directory
alias ask-ai='/path/to/ask-ai/ask-ai'

# If copied to /usr/local/bin/
alias ask-ai='ask-ai'

# Reload configuration
source ~/.config/fish/config.fish
```

### Testing Your Alias

After setting up the alias, test it:
```bash
ask-ai --version
```

## Config File Location

The configuration file is stored at:
```
~/.ask-ai/config.json
```

This file is created automatically when you run the config wizard for the first time.

## Config File Structure

The config file is a JSON file that contains all your API settings. The structure varies depending on the request type you selected during configuration.

### OpenAI-style Config

```json
{
  "request_type": "openai",
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 2048,
  "api_key": "your-api-key-here",
  "endpoint": "https://api.openai.com/v1/chat/completions"
}
```

**Fields:**
- `request_type`: Always "openai" for this type
- `model`: Default model name (can be overridden in chat command)
- `temperature`: Sampling temperature (0.0 to 2.0)
- `max_tokens`: Maximum tokens in response
- `api_key`: Your OpenAI API key
- `endpoint`: API endpoint URL

### Anthropic-style Config

```json
{
  "request_type": "anthropic",
  "model": "claude-3-opus-20240229",
  "system_prompt": "You are a helpful assistant.",
  "max_tokens": 4096,
  "api_key": "your-api-key-here",
  "endpoint": "https://api.anthropic.com/v1/messages"
}
```

**Fields:**
- `request_type`: Always "anthropic" for this type
- `model`: Default model name (can be overridden in chat command)
- `system_prompt`: Optional system prompt for the AI
- `max_tokens`: Maximum tokens in response
- `api_key`: Your Anthropic API key
- `endpoint`: API endpoint URL

### Ollama-local Config

```json
{
  "request_type": "ollama",
  "port": 11434,
  "model": "llama2"
}
```

**Fields:**
- `request_type`: Always "ollama" for this type
- `port`: Port where Ollama is running (default: 11434)
- `model`: Default model name (can be overridden in chat command)

## Configuration Wizard

Run the wizard with:
```bash
ask-ai config
```

The wizard will guide you through selecting a request type and entering the required fields.

### Piping Input to Config

You can pipe input to pre-fill certain fields:

```bash
echo "claude-opus-4.8" | ask-ai config
```

This will pre-fill the model name field in the wizard.

## Manual Configuration

You can also manually edit the config file:

```bash
nano ~/.ask-ai/config.json
# or
vim ~/.ask-ai/config.json
```

Make sure the JSON is valid. You can validate it with:
```bash
jq empty ~/.ask-ai/config.json
```

## Environment Variables

Currently, `ask-ai` does not support environment variables. All configuration must be stored in the config file.

## Security Considerations

- The config file contains sensitive API keys stored in plain text
- The script automatically sets secure permissions (600) when creating the config
- On multi-user systems, verify file permissions are restrictive:
  ```bash
  ls -la ~/.ask-ai/config.json
  # Should show: -rw------- (600)
  ```
- If permissions are insecure, the script will warn you on each run
- Never commit the config file to version control
- Add `~/.ask-ai/` to your `.gitignore` if working in the config directory
- Consider using a secrets manager for production environments
- Rotate API keys if they may have been compromised
- Review error logs before sharing as they may contain sensitive information

### Automatic Security Features

The script includes several automatic security features:

1. **Secure File Permissions**: Config files are automatically set to 600 (read/write by owner only)
2. **Secure Directory Permissions**: The config directory is set to 700 (access by owner only)
3. **Permission Warnings**: The script warns if config file permissions are not 600
4. **Error Sanitization**: API keys are automatically redacted from error logs
5. **Secure Log Files**: Error logs are created with 600 permissions

### Manual Security Verification

To verify your security settings:

```bash
# Check config file permissions
stat ~/.ask-ai/config.json

# Check config directory permissions
stat ~/.ask-ai

# Check logs directory permissions
stat ./ask-ai-logs
```

### Recommended Security Practices

1. **File Permissions**:
   ```bash
   chmod 600 ~/.ask-ai/config.json
   chmod 700 ~/.ask-ai
   chmod 700 ./ask-ai-logs
   ```

2. **Git Protection**:
   ```bash
   echo "~/.ask-ai/" >> ~/.gitignore
   echo "ask-ai-logs/" >> .gitignore
   ```

3. **Regular Key Rotation**: Rotate API keys periodically, especially if:
   - You suspect a compromise
   - A team member leaves
   - You're moving to a new machine

4. **Environment Isolation**: Use different API keys for different environments (dev, staging, production)

## Reconfiguring

To change your configuration, simply run the wizard again:
```bash
ask-ai config
```

This will overwrite your existing config file with the new settings.

## Resetting Configuration

To completely reset your configuration:
```bash
rm ~/.ask-ai/config.json
```

Then run the wizard again to set up fresh configuration.
