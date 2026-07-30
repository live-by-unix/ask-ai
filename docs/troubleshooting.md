# Troubleshooting Guide

This document provides solutions to common issues you may encounter while using `ask-ai`.

## Common Issues

### "Missing required dependencies: curl jq"

**Problem:** The script cannot find curl or jq.

**Solution:** Install the missing dependencies.

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install curl jq
```

**macOS:**
```bash
brew install curl jq
```

**Windows (Git Bash):**
1. Download curl from https://curl.se/windows/
2. Download jq from https://jqlang.github.io/jq/
3. Add both to your PATH

### "Config file not found at ~/.ask-ai/config.json"

**Problem:** You haven't configured `ask-ai` yet.

**Solution:** Run the configuration wizard:
```bash
ask-ai config
```

### "Invalid JSON in config file"

**Problem:** The config file contains malformed JSON.

**Solution:** Validate and fix the config file:
```bash
# Check if JSON is valid
jq empty ~/.ask-ai/config.json

# If invalid, reconfigure
ask-ai config
```

Or manually edit the file:
```bash
nano ~/.ask-ai/config.json
```

### "Network request failed"

**Problem:** Cannot connect to the API endpoint.

**Possible causes:**
- No internet connection
- Wrong endpoint URL
- Firewall blocking the request
- API service is down

**Solutions:**

1. Check internet connection:
```bash
ping google.com
```

2. Verify endpoint URL in config:
```bash
cat ~/.ask-ai/config.json | jq '.endpoint'
```

3. Test with curl directly:
```bash
curl -I https://api.openai.com
```

4. Check firewall settings

### "API returned HTTP 401"

**Problem:** Invalid or missing API key.

**Solution:**

1. Verify your API key is correct
2. Reconfigure with the correct key:
```bash
ask-ai config
```

3. Check if the API key has expired or been revoked

### "API returned HTTP 429"

**Problem:** Rate limit exceeded.

**Solution:**

1. Wait a few minutes before trying again
2. Check your API usage limits
3. Consider upgrading your API plan

### "API returned HTTP 500"

**Problem:** Internal server error on the API side.

**Solution:**

1. Try again later
2. Check the API provider's status page
3. Report the issue to the API provider

### "No content in API response"

**Problem:** The API returned a response but no content was found.

**Solution:**

1. Check the full response with `--json` flag:
```bash
ask-ai chat gpt-4 --json
```

2. Verify the model name is correct
3. Check if the model is available in your region

## Ollama-specific Issues

### "Network request failed" with Ollama

**Problem:** Cannot connect to local Ollama instance.

**Solutions:**

1. Ensure Ollama is running:
```bash
ollama serve
```

2. Check the port in your config:
```bash
cat ~/.ask-ai/config.json | jq '.port'
```

3. Verify Ollama is listening on the correct port:
```bash
curl http://localhost:11434/api/tags
```

4. Check if the model is installed:
```bash
ollama list
```

### "No content in API response" with Ollama

**Problem:** Ollama returned empty response.

**Solutions:**

1. Pull the model if not installed:
```bash
ollama pull llama2
```

2. Check Ollama logs for errors

3. Try a different model

## Piping Issues

### Piped input not working

**Problem:** Piped content is not being sent to the AI.

**Solution:**

1. Ensure you're using the correct syntax:
```bash
echo "test" | ask-ai chat gpt-4
```

2. Check that the piped content is not empty:
```bash
echo "test" | cat
```

3. For multi-line input, use printf:
```bash
printf "line1\nline2\nline3" | ask-ai chat gpt-4
```

### Config wizard not accepting piped input

**Problem:** Piped model name is not being used.

**Solution:**

1. Ensure the pipe is before the command:
```bash
echo "gpt-4" | ask-ai config  # Correct
ask-ai config | echo "gpt-4"   # Incorrect
```

2. The piped input only pre-fills the model field, other fields still need manual input

## Permission Issues

### "Permission denied" when running script

**Problem:** The script is not executable.

**Solution:**
```bash
chmod +x ask-ai
```

### Cannot write to config directory

**Problem:** No permission to write to `~/.ask-ai/`.

**Solution:**

1. Create the directory manually:
```bash
mkdir -p ~/.ask-ai
```

2. Check directory permissions:
```bash
ls -la ~/.ask-ai
```

3. Ensure your user owns the directory:
```bash
chown $USER:$USER ~/.ask-ai
```

## Error Logs

### Finding error logs

**Problem:** You need to find the error log file.

**Solution:**

Error logs are created in the `ask-ai-logs/` directory:
```bash
ls -la ask-ai-logs/
```

Log files are named with UTC timestamps:
```
ask-ai-error-2026-07-30T16:47:00Z.log
```

### Reading error logs

**Solution:**
```bash
cat ask-ai-logs/ask-ai-error-*.log
```

Or view the most recent log:
```bash
ls -t ask-ai-logs/ | head -1 | xargs cat
```

## Performance Issues

### Slow response times

**Possible causes:**
- Slow internet connection
- API server latency
- Large max_tokens setting
- Complex prompts

**Solutions:**

1. Reduce max_tokens in config
2. Simplify your prompt
3. Try a different model
4. Check your internet speed

### Script hangs

**Problem:** The script appears to hang without output.

**Solution:**

1. Press Ctrl+C to interrupt
2. Check if the API is responding
3. Try with a simpler prompt
4. Check error logs for details

## Windows-specific Issues

### Script not recognized on Windows

**Problem:** Running `ask-ai` doesn't work on Windows.

**Solution:**

1. Use Git Bash, not Command Prompt or PowerShell
2. Ensure the script has Unix line endings (LF, not CRLF)
3. Make the script executable in Git Bash:
```bash
chmod +x ask-ai
```

### Path issues on Windows

**Problem:** Cannot find the script even after adding to PATH.

**Solution:**

1. Use the full path:
```bash
./ask-ai
```

2. Add to Git Bash PATH in `~/.bashrc`:
```bash
export PATH="$PATH:/c/path/to/ask-ai"
```

## Getting Help

If you're still experiencing issues:

1. Check the error logs in `ask-ai-logs/`
2. Review this troubleshooting guide
3. Check the GitHub repository: https://github.com/live-by-unix/ask-ai
4. Open an issue on GitHub with:
   - Your OS and version
   - The exact command you ran
   - The error message
   - The relevant error log

## Debug Mode

To enable more verbose output, you can modify the script to add `set -x` at the beginning, but this is not recommended for normal use as it may expose sensitive information like API keys.
