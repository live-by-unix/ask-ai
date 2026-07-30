// Terminal Demo Animation
const demoCommands = [
    { command: './ask-ai --version', response: 'ask-ai v1.0.0\nYear: 2026\nAuthor: live-by-unix\nGitHub: https://github.com/live-by-unix/ask-ai' },
    { command: './ask-ai config', response: '=== ask-ai Configuration Wizard ===\n\nSelect request type:\n1) OpenAI-style\n2) Anthropic-style\n3) Ollama-local' },
    { command: 'echo "Hello" | ./ask-ai chat gpt-4', response: 'Hello! How can I help you today?' },
    { command: './ask-ai chat claude-3 --json', response: '{\n  "id": "msg_abc123",\n  "type": "message",\n  "role": "assistant",\n  "content": [\n    {\n      "type": "text",\n      "text": "Here\'s your response in JSON format."\n    }\n  ],\n  "model": "claude-3-opus-20240229",\n  "stop_reason": "end_turn"\n}' }
];

let currentDemoIndex = 0;
let demoCharIndex = 0;
let isTyping = false;

function typeDemoCommand() {
    const demoInput = document.getElementById('demo-input');
    const terminalDemo = document.getElementById('terminal-demo');
    
    if (currentDemoIndex >= demoCommands.length) {
        currentDemoIndex = 0;
    }
    
    const currentCommand = demoCommands[currentDemoIndex];
    
    if (!isTyping) {
        isTyping = true;
        demoCharIndex = 0;
    }
    
    if (demoCharIndex < currentCommand.command.length) {
        demoInput.textContent += currentCommand.command.charAt(demoCharIndex);
        demoCharIndex++;
        setTimeout(typeDemoCommand, 50);
    } else {
        setTimeout(() => {
            // Add response
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-response';
            responseLine.textContent = currentCommand.response;
            terminalDemo.insertBefore(responseLine, terminalDemo.lastElementChild);
            
            // Add new command line
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.innerHTML = '<span class="terminal-prompt">$</span><span class="terminal-input" id="demo-input"></span><span class="terminal-cursor"></span>';
            terminalDemo.replaceChild(newLine, terminalDemo.lastElementChild);
            
            currentDemoIndex++;
            isTyping = false;
            demoCharIndex = 0;
            
            setTimeout(typeDemoCommand, 1500);
        }, 500);
    }
}

// Start demo animation when page loads
setTimeout(typeDemoCommand, 2000);

// Copy to Clipboard
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const codeToCopy = btn.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(codeToCopy);
            btn.classList.add('copied');
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab content
        const tabId = 'tab-' + btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Interactive Terminal Demo
const userInput = document.getElementById('user-input');
const interactiveTerminal = document.getElementById('interactive-terminal');
const commandResponses = {
    './ask-ai --version': 'ask-ai v1.0.0\nYear: 2026\nAuthor: live-by-unix\nGitHub: https://github.com/live-by-unix/ask-ai',
    './ask-ai config': '=== ask-ai Configuration Wizard ===\n\nSelect request type:\n1) OpenAI-style\n2) Anthropic-style\n3) Ollama-local\n\nEnter choice (1-3):',
    'echo "Hello" | ./ask-ai chat gpt-4': 'Hello! I received your message. This is a demo response from the simulated terminal.',
    './ask-ai chat claude-3 --json': '{\n  "content": "This is a simulated JSON response for demo purposes.",\n  "model": "claude-3-opus-20240229",\n  "role": "assistant"\n}'
};

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = userInput.textContent.trim();
        
        if (command) {
            // Add command to terminal
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-text">${escapeHtml(command)}</span>`;
            
            const terminalOutput = interactiveTerminal.querySelector('.terminal-output');
            terminalOutput.insertBefore(commandLine, terminalOutput.lastElementChild);
            
            // Add response
            const response = commandResponses[command] || `Command not recognized in demo. Try: ${Object.keys(commandResponses).join(', ')}`;
            
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-response';
            responseLine.textContent = response;
            terminalOutput.insertBefore(responseLine, terminalOutput.lastElementChild);
            
            // Clear input
            userInput.textContent = '';
            
            // Scroll to bottom
            interactiveTerminal.querySelector('.terminal-body').scrollTop = interactiveTerminal.querySelector('.terminal-body').scrollHeight;
        }
    }
});

// Command suggestion buttons
document.querySelectorAll('.command-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const command = btn.getAttribute('data-command');
        userInput.textContent = command;
        userInput.focus();
    });
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(15, 23, 42, 0.98)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '1rem 2rem';
        navLinks.style.borderTop = '1px solid var(--border)';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Header Background on Scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Observe installation steps
document.querySelectorAll('.install-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(step);
});

// Keyboard shortcut for demo terminal
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus terminal input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        userInput.focus();
    }
});

// Add visual feedback for terminal input
userInput.addEventListener('focus', () => {
    interactiveTerminal.style.borderColor = 'var(--primary)';
});

userInput.addEventListener('blur', () => {
    interactiveTerminal.style.borderColor = 'var(--border)';
});

// Prevent default browser behavior for certain keys in terminal
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
    }
});

console.log('ask-ai Demo Website Loaded');
console.log('Interactive terminal: Try typing commands or clicking the suggestion buttons!');
