# Security Policy

## Supported Versions

Currently, only the latest version of `ask-ai` is supported.

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please report it responsibly.

### How to Report

**Do not** open a public issue. Instead, send an email to the project maintainer or use GitHub's private vulnerability reporting feature.

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

### Response Time

Security reports will be acknowledged within 48 hours, and a fix will be released as soon as possible.

## Security Best Practices

### For Users

#### API Key Storage

- **Never** commit your config file to version control
- Add `~/.ask-ai/` to your `.gitignore`
- Set restrictive permissions on your config file:
  ```bash
  chmod 600 ~/.ask-ai/config.json
  ```
- Rotate API keys if they may have been compromised
- Use environment-specific API keys when possible

#### File Permissions

The config file should only be readable by you:
```bash
chmod 600 ~/.ask-ai/config.json
```

The config directory should also be restricted:
```bash
chmod 700 ~/.ask-ai
```

#### Error Logs

- Error logs may contain sensitive information
- Review logs before sharing
- Delete old logs regularly:
  ```bash
  rm ask-ai-logs/*.log
  ```
- Add `ask-ai-logs/` to `.gitignore`

#### Network Security

- Use HTTPS endpoints only
- Verify API provider URLs before configuration
- Be cautious with custom endpoints
- Consider using a VPN on public networks

#### System Security

- Keep your system updated
- Use a firewall
- Run `ask-ai` with appropriate user privileges
- Don't run as root unless necessary

### For Developers

#### Sensitive Data

- Never hardcode API keys, passwords, or secrets
- Never log sensitive information
- Sanitize error messages to avoid data leakage
- Use secure methods for handling secrets

#### Input Validation

- Validate all user input
- Sanitize file paths
- Check for command injection vulnerabilities
- Validate JSON structure before parsing

#### File Operations

- Use secure file permissions (600 for config files)
- Validate file paths before operations
- Avoid race conditions
- Use atomic operations when possible

#### Dependencies

- Keep dependencies updated
- Use trusted sources for dependencies
- Verify checksums when downloading
- Monitor for security advisories

## Known Security Considerations

### Config File

The config file stores API keys in plain text. This is a known limitation for a lightweight Bash script. Users should:
- Set appropriate file permissions
- Use system-level encryption if available
- Consider using a secrets manager for production use

### Error Logs

Error logs may contain:
- API endpoints
- Partial error responses
- File paths

Review logs before sharing and delete regularly.

### Network Traffic

API requests are sent over HTTPS, but:
- DNS queries are visible
- Request sizes may reveal information
- Consider using a VPN for sensitive operations

## Security Features

### Current Implementations

- Config file permission warnings
- HTTPS-only API endpoints
- Input validation
- Error message sanitization
- No logging of sensitive data in normal operation

### Future Improvements

- Support for environment variables
- Integration with system keychains
- Encrypted config file option
- API key rotation support

## Compliance

This project is designed to be lightweight and portable. It does not include enterprise security features. For production use, consider:
- Using a dedicated secrets manager
- Implementing additional authentication
- Using enterprise-grade API clients
- Conducting regular security audits

## Disclosure Policy

- Security vulnerabilities will be disclosed after a fix is available
- Credits will be given to reporters
- CVEs will be requested for significant vulnerabilities
- Security advisories will be published with releases

## Contact

For security-related questions or to report vulnerabilities:
- GitHub: https://github.com/live-by-unix/ask-ai/security/advisories
- Email: (to be configured by maintainer)

## Author

**live-by-unix**  
Year: 2026  
GitHub: https://github.com/live-by-unix/ask-ai
