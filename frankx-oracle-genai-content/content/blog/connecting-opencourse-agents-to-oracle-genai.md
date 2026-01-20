# Connecting OpenCourse Coding Agents to Oracle GenAI: A Comprehensive Guide

## Introduction

The rise of AI-assisted coding has transformed software development. OpenCode, Roo Code, and Kilo Code represent the next generation of intelligent coding agents. But these agents need powerful AI backends to reach their full potential. Oracle GenAI Service and models like Grok Code-1 offer enterprise-grade AI capabilities that can supercharge your coding workflow.

This guide shows you how to connect these opencourse coding agents to Oracle's AI services for maximum productivity.

## The OpenCourse Coding Agent Landscape

### Understanding Your Options

| Agent | Key Features | Best For |
|-------|-------------|----------|
| **OpenCode** | VS Code extension, Claude-powered, file editing | Full IDE integration |
| **Roo Code** | Open-source Claude alternative, customizable | Teams wanting control |
| **Kilo Code** | Lightweight, fast, CLI-focused | Terminal-first developers |

All three agents support custom API endpoints, making them perfect candidates for Oracle GenAI integration.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Oracle Cloud Infrastructure                   │
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────┐  │
│  │  GenAI Service │  │ AI Agent      │  │ Agent Hub (optional) │  │
│  │  - Cohere     │  │ - Custom      │  │ - Orchestration     │  │
│  │  - Meta       │  │   agents      │  │ - Multi-agent       │  │
│  │  - OpenAI     │  │ - Tools       │  │                     │  │
│  └───────┬───────┘  └───────┬───────┘  └─────────────────────┘  │
│          │                  │                                   │
│          └──────────────────┼───────────────────────────────────┘
│                             │                                    
│                    REST API / SDK                               │
│                             │                                    
┌─────────────────────────────▼───────────────────────────────────┐
│                  Your Application / Agent                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   OpenCode  │  │  Roo Code   │  │       Kilo Code         │  │
│  │  (VS Code)  │  │  (Claude)   │  │      (CLI-focused)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Prerequisites

Before you begin, ensure you have:

1. **Oracle Cloud Infrastructure account** with GenAI Service enabled
2. **API keys or authentication credentials** for OCI
3. **One or more opencourse agents installed**:
   - OpenCode: VS Code Marketplace
   - Roo Code: GitHub releases
   - Kilo Code: npm or GitHub
4. **Node.js 18+** or **Python 3.9+** for SDK samples

## Setting Up Oracle GenAI Service

### Step 1: Create OCI Configuration

```bash
# Install OCI CLI
curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh | bash

# Configure authentication
oci setup config
```

Create a configuration file at `~/.oci/config`:

```ini
[DEFAULT]
user=ocid1.user.oc1..
tenancy=ocid1.tenancy.oc1..
region=us-phoenix-1
fingerprint=xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx
key_file=~/.oci/oci_api_key.pem
```

### Step 2: Generate API Signing Key

```bash
# Generate private key (keep secure!)
openssl genrsa -out oci_api_key.pem 2048

# Generate public key fingerprint
openssl rsa -in oci_api_key.pem -pubout -out oci_api_key_public.pem

# Upload public key to OCI Console
# Settings → User Settings → API Keys → Add Public Key
```

### Step 3: Test Connection

```python
# test_connection.py
import oci

config = oci.config.from_file("~/.oci/config", "DEFAULT")
identity = oci.identity.IdentityClient(config)
user = identity.get_user(config["user"])

print(f"Connected as: {user.data.name}")
print(f"Compartment: {config['tenancy']}")
```

## Connecting OpenCode to Oracle GenAI

### Method 1: Using OpenCode's MCP Server

OpenCode supports Model Context Protocol (MCP) servers:

```json
{
  "mcpServers": {
    "oracle-genai": {
      "command": "npx",
      "args": ["-y", "@oracle/mcp-server-genai"],
      "env": {
        "OCI_CONFIG_FILE": "~/.oci/config",
        "OCI_PROFILE": "DEFAULT",
        "OCI_REGION": "us-phoenix-1"
      }
    }
  }
}
```

### Method 2: Custom API Endpoint Configuration

OpenCode allows custom endpoint configuration:

```typescript
// opencode.config.ts
export default {
  api: {
    baseUrl: "https://genai.oci.oraclecloud.com/v1",
    auth: {
      type: "oci",
      configFile: "~/.oci/config",
      profile: "DEFAULT"
    },
     models: [
      {
        id: "cohere.command-r-plus-08-2024",
        name: "Cohere Command R+ 08-2024",
        contextWindow: 128000,
        maxOutputTokens: 4096
      },
      {
        id: "meta.llama-3.3-70b-instruct",
        name: "Meta Llama 3.3 70B",
        contextWindow: 128000,
        maxOutputTokens: 4096
      }
    ],
    defaultModel: "cohere.command-r-plus-08-2024",
    temperature: 0.7,
    maxTokens: 4096
  },
  tools: {
    fileSystem: {
      enabled: true,
      allowedPaths: ["/project/src", "/project/tests"]
    },
    git: {
      enabled: true,
      requireClean: false
    },
    execute: {
      enabled: true,
      timeoutSeconds: 30,
      allowedCommands: ["npm", "python", "git"]
    }
  }
}
```

### Complete OpenCode Setup Example

```typescript
// .opencode/settings.json
{
  "completion": {
    "provider": "oracle-genai",
    "model": "cohere.command-r-plus-08-2024",
    "temperature": 0.2,
    "maxTokens": 2048,
    "systemPrompt": "You are an expert software engineer helping with code completion. " +
      "Provide concise, production-ready code suggestions. " +
      "Always consider error handling, type safety, and performance."
  },
  "chat": {
    "provider": "oracle-genai",
    "model": "meta.llama-3.3-70b-instruct",
    "temperature": 0.7
  },
  "autoComplete": {
    "enabled": true,
    "debounceMs": 300,
    "includeComments": true,
    "includeTests": false
  }
}
```

## Connecting Roo Code to Oracle GenAI

### Configuration via Environment Variables

```bash
# .env file
export OCI_CONFIG_FILE=~/.oci/config
export OCI_PROFILE=DEFAULT
export OCI_REGION=us-phoenix-1

# Roo Code settings
export ROO_CODE_PROVIDER=oracle-genai
export ROO_CODE_MODEL=cohere.command-r-plus-08-2024
export ROO_CODE_TEMPERATURE=0.3
export ROO_CODE_MAX_TOKENS=4096
```

### Roo Code Configuration File

```yaml
# roo-code.yaml
provider:
  name: oracle-genai
  config:
    oci_config: ~/.oci/config
    oci_profile: DEFAULT
    region: us-phoenix-1

models:
  completion:
    id: cohere.command-r-plus-08-2024
    temperature: 0.2
    max_tokens: 2048

  chat:
    id: meta.llama-3.3-70b-instruct
    temperature: 0.7
    max_tokens: 4096

  embedding:
    id: cohere.embed-v4.0
    dimensions: 1024

tools:
  file_system:
    root: ./src
    readonly: false

  git:
    enabled: true
    auto_commit: false

  terminal:
    enabled: true
    shell: bash

  http:
    enabled: true
    allowed_hosts:
      - "*.oraclecloud.com"
      - "api.github.com"
```

### Python SDK Integration

```python
# roo_oracle_genai.py
import os
from typing import Optional
from dataclasses import dataclass

import oci
from oci.generative_ai_inference import GenerativeAiInferenceClient
from oci.generative_ai_inference.models import (
    CohereChatRequest,
    GenericChatRequest,
    OnDemandServingMode,
)


@dataclass
class RooCodeOracleConfig:
    """Configuration for Oracle GenAI integration with Roo Code"""
    config_file: str = "~/.oci/config"
    profile: str = "DEFAULT"
    region: str = "us-phoenix-1"
    model: str = "cohere.command-r-plus-08-2024"


class OracleGenAIClient:
    def __init__(self, config: Optional[RooCodeOracleConfig] = None):
        self.config = config or RooCodeOracleConfig()
        self.client = self._create_client()

    def _create_client(self) -> GenerativeAiInferenceClient:
        """Initialize OCI GenAI client"""
        oci_config = oci.config.from_file(
            self.config.config_file,
            self.config.profile
        )
        return GenerativeAiInferenceClient(oci_config, region=self.config.region)

    def chat(
        self,
        message: str,
        context: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 2048
    ) -> str:
        """Send chat message to Oracle GenAI"""
        # Choose request type based on model provider
        if "cohere" in self.config.model:
            chat_request = CohereChatRequest(
                message=message,
                temperature=temperature,
            )
        else:
            chat_request = GenericChatRequest(
                message=message,
                temperature=temperature,
            )

        response = self.client.chat(
            chat_details=chat_request,
            compartment_id=self._get_compartment_id(),
            serving_mode=self._get_serving_mode()
        )

        return response.data.text

    def complete(self, code: str, prefix: str) -> str:
        """Get code completion"""
        prompt = f"""Given this code:
```
{code}
```

Complete the following line (provide only the continuation, no explanation):
{prefix}
"""
        return self.chat(prompt, temperature=0.2, max_tokens=512)

    def explain(self, code: str) -> str:
        """Explain code functionality"""
        prompt = f"""Explain this code in detail:
```
{code}
```

Include:
- What it does
- How it works
- Any potential issues
- Suggested improvements
"""
        return self.chat(prompt, temperature=0.5, max_tokens=1024)

    def _get_compartment_id(self) -> str:
        """Get OCI compartment ID from config"""
        oci_config = oci.config.from_file(
            self.config.config_file,
            self.config.profile
        )
        return oci_config["tenancy"]

    def _get_serving_mode(self) -> dict:
        """Configure model serving mode"""
        return {
            "model_id": self.config.model,
            "serving_type": "ON_DEMAND"
        }


# Example usage with Roo Code integration
def roo_code_integration_example():
    client = OracleGenAIClient()

    # Chat completion for Roo Code chat interface
    response = client.chat(
        "How do I implement a REST API in Python using FastAPI?"
    )
    print(f"Response: {response}")

    # Code completion for Roo Code inline suggestions
    completion = client.complete(
        code="def fibonacci(n):",
        prefix="    if n <= 1:"
    )
    print(f"Completion: {completion}")


if __name__ == "__main__":
    roo_code_integration_example()
```

## Connecting Kilo Code to Oracle GenAI

### CLI Configuration

```bash
# ~/.kilocode/config.yaml
oracle_genai:
  enabled: true
  profile: DEFAULT
  region: us-phoenix-1
  model: cohere.command-r-plus-08-2024

  completion:
    temperature: 0.2
    max_tokens: 2048
    stop_sequences:
      - "\n\n"
      - "```"
      - "```"

  chat:
    temperature: 0.7
    max_tokens: 4096
    system_prompt: |
      You are Kilo Code, an AI coding assistant.
      Help developers write clean, efficient, production-ready code.
      Always explain your reasoning.

  context:
    enabled: true
    max_files: 10
    max_tokens: 64000
    file_extensions:
      - .py
      - .ts
      - .js
      - .go
      - .rs

  tools:
    execute:
      enabled: true
      timeout: 30
    git:
      enabled: true
    file:
      enabled: true
      write: true
```

### Node.js SDK Integration

```typescript
// kilo-code-oracle-genai.ts
import * as fs from 'fs';
import * as path from 'path';
import * as oci from 'oci-generativeai';

interface KiloCodeOracleConfig {
  configFile: string;
  profile: string;
  region: string;
  modelId: string;
  temperature?: number;
  maxTokens?: number;
}

interface CodeContext {
  files: string[];
  maxTokens: number;
}

export class KiloCodeOracleGenAI {
  private client: oci.GenerativeAiClient;
  private config: KiloCodeOracleConfig;
  private compartmentId: string;

  constructor(config: KiloCodeOracleConfig) {
    this.config = {
      temperature: 0.7,
      maxTokens: 2048,
      ...config
    };

    const ociConfig = oci.config.fromFile(config.configFile, config.profile);
    this.client = new oci.GenerativeAiClient({
      authenticationDetailsProvider: ociConfig
    });
    this.compartmentId = ociConfig.tenancy;
  }

  async completeCode(
    prefix: string,
    context: CodeContext
  ): Promise<string> {
    const contextPrompt = await this.buildContextPrompt(context);
    const prompt = `${contextPrompt}

Complete this code (provide only the continuation):
\`\`\`
${prefix}
\`\`\``;

    return this.generate(prompt, 0.2, 512);
  }

  async chat(message: string, history: Array<{role: string; content: string}>): Promise<string> {
    const conversationHistory = history
      .map(h => `${h.role}: ${h.content}`)
      .join('\n');

    const prompt = `Conversation history:
${conversationHistory}

User: ${message}

Assistant:`;

    return this.generate(prompt, this.config.temperature, this.config.maxTokens);
  }

  async explainCode(code: string): Promise<string> {
    const prompt = `Explain this code in detail:

\`\`\`${this.detectLanguage(code)}
${code}
\`\`\`

Provide a clear explanation of:
1. What the code does
2. How it works
3. Key functions/classes
4. Any potential improvements
5. Error handling considerations`;

    return this.generate(prompt, 0.5, 2048);
  }

  async generateTests(code: string, framework: string): Promise<string> {
    const prompt = `Generate comprehensive tests for this code using ${framework}:

\`\`\`${this.detectLanguage(code)}
${code}
\`\`\`

Include:
- Unit tests for all public functions
- Edge case handling
- Mock dependencies where needed
- Test organization following ${framework} best practices`;

    return this.generate(prompt, 0.3, 2048);
  }

  async refactorCode(
    code: string,
    goal: string
  ): Promise<string> {
    const prompt = `Refactor this code to: ${goal}

Original code:
\`\`\`${this.detectLanguage(code)}
${code}
\`\`\`

Provide the refactored code with explanations of changes made.`;

    return this.generate(prompt, 0.4, 4096);
  }

  private async buildContextPrompt(context: CodeContext): Promise<string> {
    const files = context.files
      .slice(0, context.maxFiles || 5)
      .map(file => this.readFile(file));

    const contextText = files
      .map((content, i) => `File ${i + 1} (${context.files[i]}):
${content}`)
      .join('\n\n---\n\n');

    return `Context from related files:
${contextText}

Based on the context above, `;
  }

  private readFile(filePath: string): string {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch {
      return `[Could not read: ${filePath}]`;
    }
  }

  private detectLanguage(code: string): string {
    if (code.includes('import ')) return 'typescript';
    if (code.includes('def ') || 'print(') return 'python';
    if (code.includes('function') || 'console.log') return 'javascript';
    if (code.includes('class ') && code.includes('{')) return 'java';
    return 'text';
  }

  private async generate(
    prompt: string,
    temperature: number,
    maxTokens: number
  ): Promise<string> {
    try {
      const response = await this.client.chat({
        chatDetails: {
          message: prompt,
          temperature,
          max_tokens: maxTokens,
        },
        compartmentId: this.compartmentId,
        servingMode: {
          modelId: this.config.modelId,
          servingType: 'ON_DEMAND' as const,
        },
      });

      return response.data.text || '';
    } catch (error) {
      console.error('Oracle GenAI API error:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}

// CLI integration example
async function main() {
  const client = new KiloCodeOracleGenAI({
    configFile: '~/.oci/config',
    profile: 'DEFAULT',
    region: 'us-phoenix-1',
    modelId: 'cohere.command-r-plus',
    temperature: 0.7,
    maxTokens: 2048
  });

  // Example: Generate completion
  const completion = await client.completeCode(
    'function calculateFibonacci(n) {',
    {
      files: ['src/math.ts'],
      maxTokens: 50000
    }
  );
  console.log(completion);
}

main().catch(console.error);
```

## Advanced: Grok Code-1 Integration

### What is Grok Code-1?

Grok Code-1 is xAI's coding-focused model optimized for:
- Code generation and completion
- Bug fixing and debugging
- Code explanation and documentation
- Multi-file project understanding

### Integration Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        Grok Code-1                             │
│                   (via API Gateway / xAI Cloud)                │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│                     API Gateway                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ Auth        │  │ Rate Limit  │  │ Request Transform       │ │
│  │ (API Key)   │  │ (100/min)   │  │ (Format conversion)     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│              OpenCourse Coding Agents                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   OpenCode   │  │   Roo Code   │  │       Kilo Code       │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### Grok Code-1 Configuration

```typescript
// grok-code-1-config.ts
interface GrokCode1Config {
  apiKey: string;
  baseUrl: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
}

export const grokCode1Config: GrokCode1Config = {
  apiKey: process.env.GROK_API_KEY || '',
  baseUrl: 'https://api.x.ai/v1',
  model: 'grok-code-1',
  temperature: 0.2,
  maxTokens: 4096,
  timeout: 60000
};
```

### Unified Agent Factory

```typescript
// agent-factory.ts
import { OracleGenAIClient } from './oracle-genai';
import { KiloCodeOracleGenAI } from './kilo-code-oracle-genai';
import { GrokCode1Client } from './grok-client';

type AgentType = 'opencode' | 'roocode' | 'kilocode';
type ProviderType = 'oracle' | 'grok';

interface AgentConfig {
  agentType: AgentType;
  provider: ProviderType;
  model: string;
  temperature: number;
}

export class UnifiedAgentFactory {
  private oracleClient: OracleGenAIClient;
  private grokClient: GrokCode1Client;

  constructor() {
    this.oracleClient = new OracleGenAIClient();
    this.grokClient = new GrokCode1Client();
  }

  createAgent(config: AgentConfig) {
    switch (config.provider) {
      case 'oracle':
        return this.createOracleAgent(config);
      case 'grok':
        return this.createGrokAgent(config);
      default:
        throw new Error(`Unknown provider: ${config.provider}`);
    }
  }

  private createOracleAgent(config: AgentConfig) {
    return {
      complete: (code: string, prefix: string) =>
        this.oracleClient.complete(code, prefix),
      chat: (message: string) =>
        this.oracleClient.chat(message),
      explain: (code: string) =>
        this.oracleClient.explain(code),
      provider: 'Oracle GenAI',
      model: config.model
    };
  }

  private createGrokAgent(config: AgentConfig) {
    return {
      complete: (code: string, prefix: string) =>
        this.grokClient.complete(code, prefix),
      chat: (message: string) =>
        this.grokClient.chat(message),
      explain: (code: string) =>
        this.grokClient.explain(code),
      provider: 'Grok Code-1',
      model: config.model
    };
  }
}

// Usage example
const factory = new UnifiedAgentFactory();

// Create Oracle-powered OpenCode agent
const opencodeOracleAgent = factory.createAgent({
  agentType: 'opencode',
  provider: 'oracle',
  model: 'cohere.command-r-plus-08-2024',
  temperature: 0.2
});

// Create Grok-powered Kilo Code agent
const kilocodeGrokAgent = factory.createAgent({
  agentType: 'kilocode',
  provider: 'grok',
  model: 'grok-code-1',
  temperature: 0.2
});
```

## Best Practices

### 1. Security

```bash
# Never commit API keys!
echo "*.key" >> .gitignore
echo "*.pem" >> .gitignore
echo ".env" >> .gitignore

# Use OCI Vault for secrets
oci vault secret create --config-file ~/.oci/config \
  --secret-name "genai-api-key" \
  --vault-id ocid1.vault.oc1..xxx
```

### 2. Cost Optimization

```typescript
// Use appropriate model tiers
const modelSelection = {
  simple_completion: 'cohere.command-r-08-2024',      // Cheaper, faster
  complex_reasoning: 'cohere.command-r-plus-08-2024', // More capable
  code_specific: 'meta.llama-3.3-70b-instruct'        // Best for code
};
```

### 3. Rate Limiting

```typescript
// Implement client-side rate limiting
class RateLimiter {
  private queue: Array<() => void> = [];
  private tokens = 100;
  private refillRate = 60; // per minute

  async acquire(): Promise<void> {
    if (this.tokens > 0) {
      this.tokens--;
      return;
    }

    return new Promise(resolve => {
      this.queue.push(resolve);
    });
  }

  refill() {
    this.tokens = Math.min(this.tokens + 1, this.refillRate);
    if (this.queue.length > 0 && this.tokens > 0) {
      this.queue.shift()?.();
    }
  }
}
```

### 4. Error Handling

```typescript
try {
  const response = await client.chat(message);
} catch (error) {
  if (error.statusCode === 429) {
    // Rate limited - wait and retry
    await sleep(60000);
    return retry();
  } else if (error.statusCode === 401) {
    // Auth error - check credentials
    throw new Error('Invalid OCI credentials');
  } else {
    // Other error - log and fallback
    console.error('GenAI API error:', error);
    return fallbackModel();
  }
}
```

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid OCI credentials | Run `oci setup config` and verify |
| 429 Too Many Requests | Rate limit exceeded | Implement backoff, reduce calls |
| 400 Bad Request | Invalid prompt | Check prompt format, length |
| Empty responses | Model timeout | Increase timeout, reduce context |
| Slow responses | Model loading | Use cache, warm-up requests |

## Next Steps

1. **Start Simple**: Connect one agent to Oracle GenAI
2. **Add Grok Code-1**: Expand with xAI integration
3. **Multi-Agent Setup**: Create specialized agents for different tasks
4. **Production Hardening**: Add monitoring, logging, cost tracking
5. **Custom Tools**: Build domain-specific tools for your stack

## Resources

- [Oracle GenAI Documentation](https://docs.oracle.com/en-us/iaas/generative-ai/)
- [OpenCode MCP Server](https://github.com/oracle/mcp-server-genai)
- [OCI Python SDK](https://docs.oracle.com/en-us/iaas/tools/python/2.125.0/)
- [OCI Node.js SDK](https://docs.oracle.com/en-us/iaas/tools/node/2.125.0/)

---

## Pricing Note

## Pricing Note

> **Oracle GenAI Pricing**: Oracle charges per CHARACTER, not per token. For on-demand inference:
> - Chat models: (prompt_length + response_length) in characters
> - Embedding models: input_length in characters
> - 10,000 characters = 10,000 transactions
> - See: https://docs.oracle.com/en-us/iaas/Content/generative-ai/pay-on-demand.htm

---

*This guide is part of the FrankX Oracle GenAI Content Strategy. For updates, see the [GitHub repository](https://github.com/frankx-ai-coe/oracle-genai-guides).*
