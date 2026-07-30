# Request Types

This document explains the three request types supported by `ask-ai` and how they work.

## Overview

`ask-ai` supports three different API request types:

1. **OpenAI-style** - Compatible with OpenAI API and OpenAI-compatible endpoints
2. **Anthropic-style** - Compatible with Anthropic Claude API
3. **Ollama-local** - For local Ollama instances

Each type has different configuration requirements and API formats.

## OpenAI-style

### Description

The OpenAI-style request type is compatible with the OpenAI API and any OpenAI-compatible endpoints (such as Azure OpenAI, local LLM services, or other providers that follow the OpenAI API format).

### Configuration

Required fields:
- `model`: Model name (e.g., "gpt-4", "gpt-3.5-turbo")
- `temperature`: Sampling temperature (0.0 to 2.0, default 0.7)
- `max_tokens`: Maximum tokens in response (default 2048)
- `api_key`: Your API key
- `endpoint`: API endpoint URL

### Default Endpoint

```
https://api.openai.com/v1/chat/completions
```

### Request Format

The tool sends a POST request with the following JSON structure:

```json
{
  "model": "your-model",
  "temperature": 0.7,
  "max_tokens": 2048,
  "messages": [
    {
      "role": "user",
      "content": "your prompt"
    }
  ]
}
```

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <api_key>`

### Compatible Services

- OpenAI API
- Azure OpenAI Service
- Together AI
- Anyscale
- LocalAI
- Any OpenAI-compatible endpoint

### Example Usage

```bash
# Configure
ask-ai config
# Select option 1 (OpenAI-style)

# Chat
echo "Hello!" | ask-ai chat gpt-4
```

## Anthropic-style

### Description

The Anthropic-style request type is compatible with the Anthropic Claude API. It supports system prompts and uses Anthropic's specific API format.

### Configuration

Required fields:
- `model`: Model name (e.g., "claude-3-opus-20240229")
- `system_prompt`: Optional system prompt for the AI
- `max_tokens`: Maximum tokens in response (default 4096)
- `api_key`: Your Anthropic API key
- `endpoint`: API endpoint URL

### Default Endpoint

```
https://api.anthropic.com/v1/messages
```

### Request Format

The tool sends a POST request with the following JSON structure:

```json
{
  "model": "your-model",
  "max_tokens": 4096,
  "messages": [
    {
      "role": "user",
      "content": "your prompt"
    }
  ],
  "system": "your system prompt (if provided)"
}
```

### Headers

- `Content-Type: application/json`
- `x-api-key: <api_key>`
- `anthropic-version: 2023-06-01`

### Supported Models

- claude-3-opus-20240229
- claude-3-sonnet-20240229
- claude-3-haiku-20240307
- claude-2.1
- claude-2.0
- claude-instant-1.2

### Example Usage

```bash
# Configure
ask-ai config
# Select option 2 (Anthropic-style)

# Chat
echo "Explain quantum computing" | ask-ai chat claude-3-opus-20240229
```

## Ollama-local

### Description

The Ollama-local request type is for running AI models locally using Ollama. This requires no API key and runs entirely on your machine.

### Configuration

Required fields:
- `port`: Port where Ollama is running (default 11434)
- `model`: Model name (e.g., "llama2", "mistral")

### Default Endpoint

```
http://localhost:11434/api/chat
```

### Request Format

The tool sends a POST request with the following JSON structure:

```json
{
  "model": "your-model",
  "prompt": "your prompt",
  "stream": false
}
```

### Headers

- `Content-Type: application/json`

### Prerequisites

1. Install Ollama: https://ollama.ai
2. Start Ollama server:
   ```bash
   ollama serve
   ```
3. Pull a model:
   ```bash
   ollama pull llama2
   ```

### Available Models

Any model available through Ollama, including:
- llama2
- mistral
- codellama
- phi
- neural-chat
- starcoder
- And many more

### Example Usage

```bash
# Configure
ask-ai config
# Select option 3 (Ollama-local)

# Chat
echo "Write a Python function" | ask-ai chat llama2
```

## Choosing the Right Request Type

### Use OpenAI-style when:
- You have an OpenAI API key
- You're using an OpenAI-compatible service
- You need standard chat completion features

### Use Anthropic-style when:
- You have an Anthropic API key
- You need Claude's specific capabilities
- You want to use system prompts

### Use Ollama-local when:
- You want to run models locally
- You don't have an API key
- You need offline capabilities
- You want privacy (data doesn't leave your machine)

## Switching Between Request Types

To switch request types, simply re-run the configuration wizard:

```bash
ask-ai config
```

This will overwrite your existing configuration with the new request type settings.

## Custom Endpoints

All request types support custom endpoints. This is useful for:

- Using proxy servers
- Self-hosted API services
- Alternative API providers
- Testing with mock servers

Simply enter your custom endpoint URL during configuration or manually edit the config file.
