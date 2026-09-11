# AI Templates (aitmpl.com) - Master Component Index

Comprehensive catalog of all **1,800+** installed components from [aitmpl.com](https://aitmpl.com/) (Claude Code Templates marketplace).

## Overview Summary
- **Skills**: 874 skills (Installed in `.claude/skills/`, `.agents/skills/`, and globally in `~/.gemini/config/skills/`)
- **Agents**: 425 subagents (Installed in `.claude/agents/` and `.agents/agents/`)
- **Commands**: 285 slash commands (Installed in `.claude/commands/`)
- **MCP Servers**: 103 configured servers in `.mcp.json`
- **Plugins**: 34 featured marketplace packages + 255 official plugins

---

## 1. Skills (874 Total)

### Category: `ai-maestro` (6 skills)

| Skill Name | Description |
| :--- | :--- |
| `agent-management` | Create, manage, and orchestrate AI agents using the AI Maestro CLI. Use when the user asks to "create agent", "list agents", "delete agent", "hibernat... |
| `agent-messaging` | Send and receive cryptographically signed messages between AI agents using the Agent Messaging Protocol (AMP). Use when the user asks to "send a messa... |
| `docs-search` | Search auto-generated codebase documentation for function signatures, API docs, class definitions, and code comments. Use when the user asks to "searc... |
| `graph-query` | Query the code graph database to understand component relationships, dependencies, and change impact. Use when the user asks to "find callers", "check... |
| `memory-search` | Search conversation history and semantic memory to recall previous discussions, decisions, and context. Use when the user asks to "search memory", "wh... |
| `planning` | Create and manage persistent markdown planning files for structured task execution. Use when the user asks to "create a plan", "track progress", "star... |

### Category: `ai-research` (130 skills)

| Skill Name | Description |
| :--- | :--- |
| `agent-evaluation` | Testing and benchmarking LLM agents including behavioral testing, capability assessment, reliability metrics, and production monitoring—where even top... |
| `agent-manager-skill` | Manage multiple local CLI agents via tmux sessions (start/stop/monitor/assign) with cron-friendly scheduling. |
| `agent-memory-mcp` | A hybrid memory system that provides persistent, searchable knowledge management for AI agents (Architecture, Patterns, Decisions). |
| `agent-memory-systems` | Memory is the cornerstone of intelligent agents. Without it, every interaction starts from zero. This skill covers the architecture of agent memory: s... |
| `agent-tool-builder` | Tools are how AI agents interact with the world. A well-designed tool is the difference between an agent that works and one that hallucinates, fails s... |
| `agents-autogpt` | Autonomous AI agent platform for building and deploying continuous agents. Use when creating visual workflow agents, deploying persistent autonomous a... |
| `agents-crewai` | Multi-agent orchestration framework for autonomous AI collaboration. Use when building teams of specialized agents working together on complex tasks, ... |
| `agents-langchain` | Framework for building LLM-powered applications with agents, chains, and RAG. Supports multiple providers (OpenAI, Anthropic, Google), 500+ integratio... |
| `agents-llamaindex` | Data framework for building LLM applications with RAG. Specializes in document ingestion (300+ connectors), indexing, and querying. Features vector in... |
| `ai-agents-architect` | Expert in designing and building autonomous AI agents. Masters tool use, memory systems, planning strategies, and multi-agent orchestration. Use when:... |
| `autonomous-agent-patterns` | Design patterns for building autonomous coding agents. Covers tool integration, permission systems, browser automation, and human-in-the-loop workflow... |
| `autonomous-agents` | Autonomous agents are AI systems that can independently decompose goals, plan actions, execute tools, and self-correct without constant human guidance... |
| `behavioral-modes` | AI operational modes (brainstorm, implement, debug, review, teach, ship, orchestrate). Use to adapt behavior based on task type. |
| `claude-code-guide` | Master guide for using Claude Code effectively. Includes configuration templates, prompting strategies "Thinking" keywords, debugging techniques, and ... |
| `computer-use-agents` | Build AI agents that interact with computers like humans do - viewing screens, moving cursors, clicking buttons, and typing text. Covers Anthropic's C... |
| `context-window-management` | Strategies for managing LLM context windows including summarization, trimming, routing, and avoiding context rot Use when: context window, token limit... |
| `context7-auto-research` | Automatically fetch latest library/framework documentation for Claude Code via Context7 API |
| `conversation-memory` | Persistent memory systems for LLM conversations including short-term, long-term, and entity-based memory Use when: conversation memory, remember, memo... |
| `crewai` | Expert in CrewAI - the leading role-based multi-agent framework used by 60% of Fortune 500 companies. Covers agent design with roles and goals, task d... |
| `data-engineer` | Build scalable data pipelines, modern data warehouses, and real-time streaming architectures. Implements Apache Spark, dbt, Airflow, and cloud-native ... |
| `data-processing-nemo-curator` | GPU-accelerated data curation for LLM training. Supports text/image/video/audio. Features fuzzy deduplication (16× faster), quality filtering (30+ heu... |
| `data-processing-ray-data` | Scalable data processing for ML workloads. Streaming execution across CPU/GPU, supports Parquet/CSV/JSON/images. Integrates with Ray Train, PyTorch, T... |
| `data-scientist` | Expert data scientist for advanced analytics, machine learning, and statistical modeling. Handles complex data analysis, predictive modeling, and busi... |
| `datadog-cli` | Datadog CLI for searching logs, querying metrics, tracing requests, and managing dashboards. Use this when debugging production issues or working with... |
| `deep-research-notebooklm` | Deep research skill powered by NotebookLM MCP. Conducts structured multi-source research (market analysis, competitive intel, trend analysis, prospect... |
| `deep-research` | Run autonomous research tasks that plan, search, read, and synthesize information into comprehensive reports. |
| `dispatching-parallel-agents` | Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies |
| `distributed-training-accelerate` | Simplest distributed training API. 4 lines to add distributed support to any PyTorch script. Unified API for DeepSpeed/FSDP/Megatron/DDP. Automatic de... |
| `distributed-training-deepspeed` | Expert guidance for distributed training with DeepSpeed - ZeRO optimization stages, pipeline parallelism, FP16/BF16/FP8, 1-bit Adam, sparse attention |
| `distributed-training-megatron-core` | Trains large language models (2B-462B parameters) using NVIDIA Megatron-Core with advanced parallelism strategies. Use when training models >1B parame... |
| `distributed-training-pytorch-fsdp` | Expert guidance for Fully Sharded Data Parallel training with PyTorch FSDP - parameter sharding, mixed precision, CPU offloading, FSDP2 |
| `distributed-training-pytorch-lightning` | High-level PyTorch framework with Trainer class, automatic distributed training (DDP/FSDP/DeepSpeed), callbacks system, and minimal boilerplate. Scale... |
| `distributed-training-ray-train` | Distributed training orchestration across clusters. Scales PyTorch/TensorFlow/HuggingFace from laptop to 1000s of nodes. Built-in hyperparameter tunin... |
| `emerging-techniques-knowledge-distillation` | Compress large language models using knowledge distillation from teacher to student models. Use when deploying smaller models with retained performanc... |
| `emerging-techniques-long-context` | Extend context windows of transformer models using RoPE, YaRN, ALiBi, and position interpolation techniques. Use when processing long documents (32k-1... |
| `emerging-techniques-model-merging` | Merge multiple fine-tuned models using mergekit to combine capabilities without retraining. Use when creating specialized models by blending domain-sp... |
| `emerging-techniques-model-pruning` | Reduce LLM size and accelerate inference using pruning techniques like Wanda and SparseGPT. Use when compressing models without retraining, achieving ... |
| `emerging-techniques-moe-training` | Train Mixture of Experts (MoE) models using DeepSpeed or HuggingFace. Use when training large-scale models with limited compute (5× cost reduction vs ... |
| `emerging-techniques-speculative-decoding` | Accelerate LLM inference using speculative decoding, Medusa multiple heads, and lookahead decoding techniques. Use when optimizing inference speed (1.... |
| `evaluation-bigcode-evaluation-harness` | Evaluates code generation models across HumanEval, MBPP, MultiPL-E, and 15+ benchmarks with pass@k metrics. Use when benchmarking code models, compari... |
| `evaluation-lm-evaluation-harness` | Evaluates LLMs across 60+ academic benchmarks (MMLU, HumanEval, GSM8K, TruthfulQA, HellaSwag). Use when benchmarking model quality, comparing models, ... |
| `evaluation-nemo-evaluator` | Evaluates LLMs across 100+ benchmarks from 18+ harnesses (MMLU, HumanEval, GSM8K, safety, VLM) with multi-backend execution. Use when needing scalable... |
| `fine-tuning-axolotl` | Expert guidance for fine-tuning LLMs with Axolotl - YAML configs, 100+ models, LoRA/QLoRA, DPO/KTO/ORPO/GRPO, multimodal support |
| `fine-tuning-llama-factory` | Expert guidance for fine-tuning LLMs with LLaMA-Factory - WebUI no-code, 100+ models, 2/3/4/5/6/8-bit QLoRA, multimodal support |
| `fine-tuning-peft` | Parameter-efficient fine-tuning for LLMs using LoRA, QLoRA, and 25+ methods. Use when fine-tuning large models (7B-70B) with limited GPU memory, when ... |
| `fine-tuning-unsloth` | Expert guidance for fast fine-tuning with Unsloth - 2-5x faster training, 50-80% less memory, LoRA/QLoRA optimization |
| `gemini-api-agent-platform` | Guides the usage of the Gemini API on Agent Platform with the Google Gen AI SDK for enterprise AI applications. Covers SDK usage (Python, JS/TS, Go, J... |
| `gemini` | Use when the user asks to run Gemini CLI for code review, plan review, or big context (>200k) processing. Ideal for comprehensive analysis requiring l... |
| `gepetto` | Creates detailed, sectionized implementation plans through research, stakeholder interviews, and multi-LLM review. Use when planning features that nee... |
| `inference-serving-llama-cpp` | Runs LLM inference on CPU, Apple Silicon, and consumer GPUs without NVIDIA hardware. Use for edge deployment, M1/M2/M3 Macs, AMD/Intel GPUs, or when C... |
| `inference-serving-sglang` | Fast structured generation and serving for LLMs with RadixAttention prefix caching. Use for JSON/regex outputs, constrained decoding, agentic workflow... |
| `inference-serving-tensorrt-llm` | Optimizes LLM inference with NVIDIA TensorRT for maximum throughput and lowest latency. Use for production deployment on NVIDIA GPUs (A100/H100), when... |
| `inference-serving-vllm` | Serves LLMs with high throughput using vLLM's PagedAttention and continuous batching. Use when deploying production LLM APIs, optimizing inference lat... |
| `infrastructure-lambda-labs` | Reserved and on-demand GPU cloud instances for ML training and inference. Use when you need dedicated GPU instances with simple SSH access, persistent... |
| `infrastructure-modal` | Serverless GPU cloud platform for running ML workloads. Use when you need on-demand GPU access without infrastructure management, deploying ML models ... |
| `infrastructure-skypilot` | Multi-cloud orchestration for ML workloads with automatic cost optimization. Use when you need to run training or batch jobs across multiple clouds, l... |
| `jira` | Use when the user mentions Jira issues (e.g., "PROJ-123"), asks about tickets, wants to create/view/update issues, check sprint status, or manage thei... |
| `langfuse` | Expert in Langfuse - the open-source LLM observability platform. Covers tracing, prompt management, evaluation, datasets, and integration with LangCha... |
| `langgraph` | Expert in LangGraph - the production-grade framework for building stateful, multi-actor AI applications. Covers graph construction, state management, ... |
| `llm-app-patterns` | Production-ready patterns for building LLM applications. Covers RAG pipelines, agent architectures, prompt IDEs, and LLMOps monitoring. Use when desig... |
| `llm-evaluation` | Master comprehensive evaluation strategies for LLM applications, from automated metrics to human evaluation and A/B testing. |
| `llm-ops` | LLM Operations -- RAG, embeddings, vector databases, fine-tuning, prompt engineering avancado, custos de LLM, evals de qualidade e arquiteturas de IA ... |
| `loki-mode` | Multi-agent autonomous startup system for Claude Code. Triggers on "Loki Mode". Orchestrates 100+ specialized agents across engineering, QA, DevOps, s... |
| `mechanistic-interpretability-nnsight` | Provides guidance for interpreting and manipulating neural network internals using nnsight with optional NDIF remote execution. Use when needing to ru... |
| `mechanistic-interpretability-pyvene` | Provides guidance for performing causal interventions on PyTorch models using pyvene's declarative intervention framework. Use when conducting causal ... |
| `mechanistic-interpretability-saelens` | Provides guidance for training and analyzing Sparse Autoencoders (SAEs) using SAELens to decompose neural network activations into interpretable featu... |
| `mechanistic-interpretability-transformer-lens` | Provides guidance for mechanistic interpretability research using TransformerLens to inspect and manipulate transformer internals via HookPoints and a... |
| `ml-engineer` | Build production ML systems with PyTorch 2.x, TensorFlow, and modern ML frameworks. Implements model serving, feature engineering, A/B testing, and mo... |
| `ml-paper-writing` | Write publication-ready ML/AI papers for NeurIPS, ICML, ICLR, ACL, AAAI, COLM. Use when drafting papers from research repos, structuring arguments, ve... |
| `mlops-mlflow` | Track ML experiments, manage model registry with versioning, deploy models to production, and reproduce experiments with MLflow - framework-agnostic M... |
| `mlops-tensorboard` | Visualize training metrics, debug models with histograms, compare experiments, visualize model graphs, and profile performance with TensorBoard - Goog... |
| `mlops-weights-and-biases` | Track ML experiments with automatic logging, visualize training in real-time, optimize hyperparameters with sweeps, and manage model registry with W&B... |
| `model-architecture-litgpt` | Implements and trains LLMs using Lightning AI's LitGPT with 20+ pretrained architectures (Llama, Gemma, Phi, Qwen, Mistral). Use when need clean model... |
| `model-architecture-mamba` | State-space model with O(n) complexity vs Transformers' O(n²). 5× faster inference, million-token sequences, no KV cache. Selective SSM with hardware-... |
| `model-architecture-nanogpt` | Educational GPT implementation in ~300 lines. Reproduces GPT-2 (124M) on OpenWebText. Clean, hackable code for learning transformers. By Andrej Karpat... |
| `model-architecture-rwkv` | RNN+Transformer hybrid with O(n) inference. Linear time, infinite context, no KV cache. Train like GPT (parallel), infer like RNN (sequential). Linux ... |
| `model-architecture-torchtitan` | Provides PyTorch-native distributed LLM pretraining using torchtitan with 4D parallelism (FSDP2, TP, PP, CP). Use when pretraining Llama 3.1, DeepSeek... |
| `multimodal-audiocraft` | PyTorch library for audio generation including text-to-music (MusicGen) and text-to-sound (AudioGen). Use when you need to generate music from text de... |
| `multimodal-blip-2` | Vision-language pre-training framework bridging frozen image encoders and LLMs. Use when you need image captioning, visual question answering, image-t... |
| `multimodal-clip` | OpenAI's model connecting vision and language. Enables zero-shot image classification, image-text matching, and cross-modal retrieval. Trained on 400M... |
| `multimodal-llava` | Large Language and Vision Assistant. Enables visual instruction tuning and image-based conversations. Combines CLIP vision encoder with Vicuna/LLaMA l... |
| `multimodal-segment-anything` | Foundation model for image segmentation with zero-shot transfer. Use when you need to segment any object in images using points, boxes, or masks as pr... |
| `multimodal-stable-diffusion` | State-of-the-art text-to-image generation with Stable Diffusion models via HuggingFace Diffusers. Use when generating images from text prompts, perfor... |
| `multimodal-whisper` | OpenAI's general-purpose speech recognition model. Supports 99 languages, transcription, translation to English, and language identification. Six mode... |
| `observability-langsmith` | LLM observability platform for tracing, evaluation, and monitoring. Use when debugging LLM applications, evaluating model outputs against datasets, mo... |
| `observability-phoenix` | Open-source AI observability platform for LLM tracing, evaluation, and monitoring. Use when debugging LLM applications with detailed traces, running e... |
| `openai-docs` | Use when the user asks how to build with OpenAI products or APIs and needs up-to-date official documentation with citations (for example: Codex, Respo... |
| `optimization-awq` | Activation-aware weight quantization for 4-bit LLM compression with 3x speedup and minimal accuracy loss. Use when deploying large models (7B-70B) on ... |
| `optimization-bitsandbytes` | Quantizes LLMs to 8-bit or 4-bit for 50-75% memory reduction with minimal accuracy loss. Use when GPU memory is limited, need to fit larger models, or... |
| `optimization-flash-attention` | Optimizes transformer attention with Flash Attention for 2-4x speedup and 10-20x memory reduction. Use when training/running transformers with long se... |
| `optimization-gguf` | GGUF format and llama.cpp quantization for efficient CPU/GPU inference. Use when deploying models on consumer hardware, Apple Silicon, or when needing... |
| `optimization-gptq` | Post-training 4-bit quantization for LLMs with minimal accuracy loss. Use for deploying large models (70B, 405B) on consumer GPUs, when you need 4× me... |
| `optimization-hqq` | Half-Quadratic Quantization for LLMs without calibration data. Use when quantizing models to 4/3/2-bit precision without needing calibration datasets,... |
| `parallel-agents` | Multi-agent orchestration patterns. Use when multiple independent tasks can run with different domain expertise or when comprehensive analysis require... |
| `perplexity` | Web search and research using Perplexity AI. Use when user says "search", "find", "look up", "ask", "research", or "what's the latest" for generic que... |
| `post-training-grpo-rl-training` | Expert guidance for GRPO/RL fine-tuning with TRL for reasoning and task-specific model training |
| `post-training-miles` | Provides guidance for enterprise-grade RL training using miles, a production-ready fork of slime. Use when training large MoE models with FP8/INT4, ne... |
| `post-training-openrlhf` | High-performance RLHF framework with Ray+vLLM acceleration. Use for PPO, GRPO, RLOO, DPO training of large models (7B-70B+). Built on Ray, vLLM, ZeRO-... |
| `post-training-simpo` | Simple Preference Optimization for LLM alignment. Reference-free alternative to DPO with better performance (+6.4 points on AlpacaEval 2.0). No refere... |
| `post-training-slime` | Provides guidance for LLM post-training with RL using slime, a Megatron+SGLang framework. Use when training GLM models, implementing custom data gener... |
| `post-training-torchforge` | Provides guidance for PyTorch-native agentic RL using torchforge, Meta's library separating infra from algorithms. Use when you want clean RL abstract... |
| `post-training-trl-fine-tuning` | Fine-tune LLMs using reinforcement learning with TRL - SFT for instruction tuning, DPO for preference alignment, PPO/GRPO for reward optimization, and... |
| `post-training-verl` | Provides guidance for training LLMs with reinforcement learning using verl (Volcano Engine RL). Use when implementing RLHF, GRPO, PPO, or other RL alg... |
| `prompt-caching` | Caching strategies for LLM prompts including Anthropic prompt caching, response caching, and CAG (Cache Augmented Generation) Use when: prompt caching... |
| `prompt-engineer` | Expert in designing effective prompts for LLM-powered applications. Masters prompt structure, context management, output formatting, and prompt evalua... |
| `prompt-engineering-dspy` | Build complex AI systems with declarative programming, optimize prompts automatically, create modular RAG systems and agents with DSPy - Stanford NLP'... |
| `prompt-engineering-guidance` | Control LLM output with regex and grammars, guarantee valid JSON/XML/code generation, enforce structured formats, and build multi-step workflows with ... |
| `prompt-engineering-instructor` | Extract structured data from LLM responses with Pydantic validation, retry failed extractions automatically, parse complex JSON with type safety, and ... |
| `prompt-engineering-outlines` | Guarantee valid JSON/XML/code structure during generation, use Pydantic models for type-safe outputs, support local models (Transformers, vLLM), and m... |
| `prompt-engineering-patterns` | Master advanced prompt engineering techniques to maximize LLM performance, reliability, and controllability. |
| `prompt-engineering` | Expert guide on prompt engineering patterns, best practices, and optimization techniques. Use when user wants to improve prompts, learn prompting stra... |
| `prompt-library` | Curated collection of high-quality prompts for various use cases. Includes role-based prompts, task-specific templates, and prompt refinement techniqu... |
| `pydantic-ai` | Build production-ready AI agents with PydanticAI — type-safe tool use, structured outputs, dependency injection, and multi-model support. |
| `qa-test-planner` | Generate comprehensive test plans, manual test cases, regression test suites, and bug reports for QA engineers. Includes Figma MCP integration for des... |
| `rag-chroma` | Open-source embedding database for AI applications. Store embeddings and metadata, perform vector and full-text search, filter by metadata. Simple 4-f... |
| `rag-engineer` | Expert in building Retrieval-Augmented Generation systems. Masters embedding models, vector databases, chunking strategies, and retrieval optimization... |
| `rag-faiss` | Facebook's library for efficient similarity search and clustering of dense vectors. Supports billions of vectors, GPU acceleration, and various index ... |
| `rag-implementation` | Retrieval-Augmented Generation patterns including chunking, embeddings, vector stores, and retrieval optimization Use when: rag, retrieval augmented, ... |
| `rag-pinecone` | Managed vector database for production AI applications. Fully managed, auto-scaling, with hybrid search (dense + sparse), metadata filtering, and name... |
| `rag-qdrant` | High-performance vector similarity search engine for RAG and semantic search. Use when building production RAG systems requiring fast nearest neighbor... |
| `rag-sentence-transformers` | Framework for state-of-the-art sentence, text, and image embeddings. Provides 5000+ pre-trained models for semantic similarity, clustering, and retrie... |
| `research-engineer` | An uncompromising Academic Research Engineer. Operates with absolute scientific rigor, objective criticism, and zero flair. Focuses on theoretical cor... |
| `safety-alignment-constitutional-ai` | Anthropic's method for training harmless AI through self-improvement. Two-phase approach - supervised learning with self-critique/revision, then RLAIF... |
| `safety-alignment-llamaguard` | Meta's 7-8B specialized moderation model for LLM input/output filtering. 6 safety categories - violence/hate, sexual content, weapons, substances, sel... |
| `safety-alignment-nemo-guardrails` | NVIDIA's runtime safety framework for LLM applications. Features jailbreak detection, input/output validation, fact-checking, hallucination detection,... |
| `subagent-driven-development` | Use when executing implementation plans with independent tasks in the current session |
| `tokenization-huggingface-tokenizers` | Fast tokenizers optimized for research and production. Rust-based implementation tokenizes 1GB in <20 seconds. Supports BPE, WordPiece, and Unigram al... |
| `tokenization-sentencepiece` | Language-independent tokenizer treating text as raw Unicode. Supports BPE and Unigram algorithms. Fast (50k sentences/sec), lightweight (6MB memory), ... |
| `voice-agents` | Voice agents represent the frontier of AI interaction - humans speaking naturally with AI systems. The challenge isn't just speech recognition and syn... |
| `voice-ai-development` | Expert in building voice AI applications - from real-time voice agents to voice-enabled apps. Covers OpenAI Realtime API, Vapi for voice agents, Deepg... |

### Category: `analytics` (1 skills)

| Skill Name | Description |
| :--- | :--- |
| `google-analytics` | Analyze Google Analytics data, review website performance metrics, identify traffic patterns, and suggest data-driven improvements. Use when the user ... |

### Category: `business-marketing` (48 skills)

| Skill Name | Description |
| :--- | :--- |
| `ab-test-setup` | When the user wants to plan, design, or implement an A/B test or experiment. Also use when the user mentions "A/B test," "split test," "experiment," "... |
| `agile-product-owner` | Agile product ownership toolkit for Senior Product Owner including INVEST-compliant user story generation, sprint planning, backlog management, and ve... |
| `ai-product` | Every product will be AI-powered. The question is whether you'll build it right or ship a demo that falls apart in production.  This skill covers LLM ... |
| `ai-wrapper-product` | Expert in building products that wrap AI APIs (OpenAI, Anthropic, etc.) into focused tools people will pay for. Not just 'ChatGPT but different' - pro... |
| `analytics-tracking` | When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions "set up tracking," "GA4," "Google... |
| `app-builder` | Main application building orchestrator. Creates full-stack applications from natural language requests. Determines project type, selects tech stack, c... |
| `app-store-optimization` | Complete App Store Optimization (ASO) toolkit for researching, optimizing, and tracking mobile app performance on Apple App Store and Google Play Stor... |
| `brand-guidelines-anthropic` | Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when b... |
| `brand-guidelines-community` | Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when b... |
| `ceo-advisor` | Executive leadership guidance for strategic decision-making, organizational development, and stakeholder management. Includes strategy analyzer, finan... |
| `competitive-ads-extractor` | Extracts and analyzes competitors' ads from ad libraries (Facebook, LinkedIn, etc.) to understand what messaging, problems, and creative approaches ar... |
| `competitor-alternatives` | When the user wants to create competitor comparison or alternative pages for SEO and sales enablement. Also use when the user mentions 'alternative pa... |
| `content-creator` | Create SEO-optimized marketing content with consistent brand voice. Includes brand voice analyzer, SEO optimizer, content frameworks, and social media... |
| `content-research-writer` | Assists in writing high-quality content by conducting research, adding citations, improving hooks, iterating on outlines, and providing real-time feed... |
| `copy-editing` | When the user wants to edit, review, or improve existing marketing copy. Also use when the user mentions 'edit this copy,' 'review my copy,' 'copy fee... |
| `copywriting` | When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, landing pages, pricing pages, feature pages, about... |
| `cto-advisor` | Technical leadership guidance for engineering teams, architecture decisions, and technology strategy. Includes tech debt analyzer, team scaling calcul... |
| `email-sequence` | When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email program. Also use when the user m... |
| `email-systems` | Email has the highest ROI of any marketing channel. $36 for every $1 spent. Yet most startups treat it as an afterthought - bulk blasts, no personaliz... |
| `form-cro` | When the user wants to optimize any form that is NOT signup/registration — including lead capture forms, contact forms, demo request forms, applicatio... |
| `free-tool-strategy` | When the user wants to plan, evaluate, or build a free tool for marketing purposes — lead generation, SEO value, or brand awareness. Also use when the... |
| `launch-strategy` | When the user wants to plan a product launch, feature announcement, or release strategy. Also use when the user mentions 'launch,' 'Product Hunt,' 'fe... |
| `lead-research-assistant` | Identifies high-quality leads for your product or service by analyzing your business, searching for target companies, and providing actionable contact... |
| `marketing-demand-acquisition` | Multi-channel demand generation, paid media optimization, SEO strategy, and partnership programs for Series A+ startups. Includes CAC calculator, chan... |
| `marketing-ideas` | When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. Also use when the user asks for 'marketing ideas,'... |
| `marketing-psychology` | When the user wants to apply psychological principles, mental models, or behavioral science to marketing. Also use when the user mentions 'psychology,... |
| `marketing-strategy-pmm` | Product marketing, positioning, GTM strategy, and competitive intelligence. Includes ICP definition, April Dunford positioning methodology, launch pla... |
| `micro-saas-launcher` | Expert in launching small, focused SaaS products fast - the indie hacker approach to building profitable software. Covers idea validation, MVP develop... |
| `onboarding-cro` | When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value. Also use when the user mentions "onbo... |
| `page-cro` | When the user wants to optimize, improve, or increase conversions on any marketing page — including homepage, landing pages, pricing pages, feature pa... |
| `paid-ads` | When the user wants help with paid advertising campaigns on Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/X, or other ad platforms. Also us... |
| `paywall-upgrade-cro` | When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates. Also use when the user mentions "paywall,... |
| `popup-cro` | When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes. Also use when the user mentions "ex... |
| `pricing-strategy` | When the user wants help with pricing decisions, packaging, or monetization strategy. Also use when the user mentions 'pricing,' 'pricing tiers,' 'fre... |
| `product-decision-agent` | 中文产品决策 Agent。用于中国大陆互联网产品、运营、增长、商业化、数据、项目推进和组织协作场景：产品规划、需求分析、PRD、需求优先级、排期、版本规划、Roadmap、MVP、灰度、上线、迭代、增长停滞、拉新、投放、渠道、裂变、CAC、LTV、ROI、留存、转化、DAU/MAU、GMV、漏斗、社... |
| `product-manager-toolkit` | Comprehensive toolkit for product managers including RICE prioritization, customer interview analysis, PRD templates, discovery frameworks, and go-to-... |
| `product-strategist` | Strategic product leadership toolkit for Head of Product including OKR cascade generation, market analysis, vision setting, and team scaling. Use for ... |
| `programmatic-seo` | When the user wants to create SEO-driven pages at scale using templates and data. Also use when the user mentions "programmatic SEO," "template pages,... |
| `referral-program` | When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy. Also use when the user mentions ... |
| `schema-markup` | When the user wants to add, fix, or optimize schema markup and structured data on their site. Also use when the user mentions "schema markup," "struct... |
| `seo-audit` | When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions "SEO audit," "technical SEO," "why am I no... |
| `seo-fundamentals` | SEO fundamentals, E-E-A-T, Core Web Vitals, and Google algorithm principles. |
| `seo-optimizer` | Search Engine Optimization specialist for content strategy, technical SEO, keyword research, and ranking improvements. Use when optimizing website con... |
| `seoagent` | Persistent SEO workflow for Claude Code — run a technical SEO audit, build a hub-and-spoke keyword strategy, write page-type-aware content briefs, and... |
| `signup-flow-cro` | When the user wants to optimize signup, registration, account creation, or trial activation flows. Also use when the user mentions "signup conversions... |
| `social-content` | When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram, TikTok, Facebook, or other platf... |
| `viral-generator-builder` | Expert in building shareable generator tools that go viral - name generators, quiz makers, avatar creators, personality tests, and calculator tools. C... |
| `x-twitter-scraper` | Use when the user wants to integrate with the X (Twitter) API via Xquik to search tweets, look up user profiles, extract followers, run giveaway draws... |

### Category: `career` (21 skills)

| Skill Name | Description |
| :--- | :--- |
| `academic-cv-builder` | Format CVs for academic positions, including publications, grants, teaching, and research experience. Use when the user mentions academic CV, faculty ... |
| `career-changer-translator` | Translate skills from one industry to another and identify transferable skills for career pivots. Use when the user mentions changing careers, switchi... |
| `cover-letter-generator` | Create personalized, compelling cover letters from a resume and job description. Use when the user asks for a cover letter, application letter, or mot... |
| `creative-portfolio-resume` | Balance visual design with ATS compatibility for creative roles. Use when the user is in design, art, writing, marketing creative, or any visual/creat... |
| `executive-resume-writer` | Create C-suite and VP-level resumes emphasizing strategic leadership, P&L ownership, and board-level impact. Use when the user mentions executive, C-s... |
| `interview-prep-generator` | Generate STAR stories, practice questions, and talking points from a resume. Use when the user mentions interview prep, behavioral questions, STAR met... |
| `job-description-analyzer` | Analyze job postings, calculate match scores, identify gaps, and create an application strategy. Use when the user shares a job description or asks to... |
| `linkedin-profile-optimizer` | Optimize a LinkedIn profile for searchability, recruiter visibility, and engagement. Use when the user mentions LinkedIn profile, headline, About sect... |
| `offer-comparison-analyzer` | Compare multiple job offers side-by-side with total compensation analysis. Use when the user has multiple offers and wants to compare salary, equity, ... |
| `portfolio-case-study-writer` | Transform resume bullets into detailed portfolio case studies with context, action, and outcome. Use when the user mentions portfolio, case study, pro... |
| `reference-list-builder` | Format professional references properly and prepare reference materials. Use when the user mentions references, reference list, references page, or pr... |
| `resume-ats-optimizer` | Optimize resumes for Applicant Tracking Systems, check ATS compatibility, and analyze keyword match. Use when the user mentions ATS, applicant trackin... |
| `resume-bullet-writer` | Transform weak resume bullets into achievement-focused statements with metrics and impact. Use when the user wants to rewrite bullets, strengthen acco... |
| `resume-formatter` | Ensure ATS-friendly formatting and create clean, scannable layouts. Use when the user mentions resume format, layout, template, design, or fixing form... |
| `resume-quantifier` | Find opportunities to add metrics and estimate numbers when exact data is unavailable. Use when the user wants to quantify achievements, add numbers, ... |
| `resume-section-builder` | Create targeted resume sections optimized for different experience levels and roles. Use when the user wants to build or rewrite specific sections lik... |
| `resume-tailor` | Customize resume for specific job postings while maintaining truthfulness. Use when the user wants to tailor, customize, or target their resume for a ... |
| `resume-version-manager` | Track different resume versions, maintain a master resume, and manage tailored variants. Use when the user mentions managing multiple resume versions,... |
| `salary-negotiation-prep` | Research market rates, build negotiation strategy, and create counter-offer scripts. Use when the user mentions salary negotiation, counter offer, com... |
| `tech-resume-optimizer` | Optimize resumes for software engineering, product management, and technical roles. Use when the user mentions software engineer, developer, PM, data ... |
| `workorai` | WorkorAI talent marketplace skill: candidate job search and employer hiring with white-box match explanations via the WorkorAI MCP server (https://wor... |

### Category: `creative-design` (33 skills)

| Skill Name | Description |
| :--- | :--- |
| `3d-web-experience` | Expert in building 3D experiences for the web - Three.js, React Three Fiber, Spline, WebGL, and interactive 3D scenes. Covers product configurators, 3... |
| `accessibility-auditor` | Web accessibility specialist for WCAG compliance, ARIA implementation, and inclusive design. Use when auditing websites for accessibility issues, impl... |
| `algorithmic-art` | Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code... |
| `c4-architecture` | Generate architecture documentation using C4 model Mermaid diagrams. Use when asked to create architecture diagrams, document system architecture, vis... |
| `canvas-design` | Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece... |
| `claude-d3js-skill` | Creating interactive data visualisations using d3.js. This skill should be used when creating custom charts, graphs, network diagrams, geographic visu... |
| `develop-web-game` | Use when Codex is building or iterating on a web game (HTML/JS) and needs a reliable development + testing loop: implement small changes, run a Playwr... |
| `diagrammer` | Render clean blueprint-style SVG diagrams from JSON specs. Use when users ask to draw, sketch, or diagram a request flow, neural net, transformer bloc... |
| `draw-io` | draw.io diagram creation, editing, and review. Use for .drawio XML editing, PNG conversion, layout adjustment, and AWS icon usage. |
| `excalidraw` | Use when working with *.excalidraw or *.excalidraw.json files, user mentions diagrams/flowcharts, or requests architecture visualization - delegates a... |
| `executing-marketing-campaigns` | Plans, creates, and optimizes marketing campaigns including content strategy, social media, email, and analytics. Helps develop go-to-market strategie... |
| `figma-implement-design` | Translate Figma nodes into production-ready code with 1:1 visual fidelity using the Figma MCP workflow (design context, screenshots, assets, and proje... |
| `figma` | Use the Figma MCP server to fetch design context, screenshots, variables, and assets from Figma, and to translate Figma nodes into production code. Tr... |
| `frontend-design` | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, a... |
| `game-development` | Game development orchestrator. Routes to platform-specific skills based on project needs. |
| `imagegen` | Use when the user asks to generate or edit images via the OpenAI Image API (for example: generate image, edit/inpaint/mask, background removal or repl... |
| `interactive-portfolio` | Expert in building portfolios that actually land jobs and clients - not just showing work, but creating memorable experiences. Covers developer portfo... |
| `luma-imagegen` | Use when the user asks to generate images via the Luma AI API (Dream Machine / Photon); collects a prompt and options interactively, then calls the AP... |
| `marp-slide` | Create professional Marp presentation slides with 7 beautiful themes (default, minimal, colorful, dark, gradient, tech, business). Use when users requ... |
| `meme-factory` | Generate memes using the memegen.link API. Use when users request memes, want to add humor to content, or need visual aids for social media. Supports ... |
| `mermaid-diagrams` | Comprehensive guide for creating software diagrams using Mermaid syntax. Use when users need to create, visualize, or document software through diagra... |
| `mobile-design` | Mobile-first design thinking and decision-making for iOS and Android apps. Touch interaction, performance patterns, platform conventions. Teaches prin... |
| `patentfig` | Generate patent-office-compliant figures via the PatentFig AI API — patent line art from text (PNG or SVG), vectorize drawings to SVG/DXF/vector PDF, ... |
| `premium-web-design` | >   Create premium, Awwwards-quality website designs as React (.jsx) components that look like they were built by a top-tier   agency charging $50k+ p... |
| `remotion-best-practices` | Best practices for Remotion - Video creation in React |
| `scroll-experience` | Expert in building immersive scroll-driven experiences - parallax storytelling, scroll animations, interactive narratives, and cinematic web experienc... |
| `slack-gif-creator` | Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, validation tools, and animation concepts. Use when users... |
| `tailwind-patterns` | Tailwind CSS v4 principles. CSS-first configuration, container queries, modern patterns, design token architecture. |
| `theme-factory` | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with... |
| `ui-design-system` | UI design system toolkit for Senior UI Designer including design token generation, component documentation, responsive design calculations, and develo... |
| `ui-ux-pro-max` | UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 9 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter,... |
| `ux-researcher-designer` | UX research and design toolkit for Senior UX Designer/Researcher including data-driven persona generation, journey mapping, usability testing framewor... |
| `web-design-guidelines` | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "chec... |

### Category: `database` (13 skills)

| Skill Name | Description |
| :--- | :--- |
| `alloydb-basics` | Manages clusters, instances, and backups for AlloyDB for PostgreSQL, and integrates with AlloyDB MCP tools for automated database operations including... |
| `bigquery-basics` | Manages datasets, tables, and jobs in BigQuery, and integrates with BigQuery ML and Gemini for advanced data analytics and AI-driven insights. Use for... |
| `cloud-sql-basics` | Creates and manages Cloud SQL instances for MySQL, PostgreSQL, and SQL Server. Handles backups, high availability, and secure connectivity for relatio... |
| `database-architect` | Expert database architect specializing in data layer design from scratch, technology selection, schema modeling, and scalable database architectures. |
| `database-migration` | Master database schema and data migrations across ORMs (Sequelize, TypeORM, Prisma), including rollback strategies and zero-downtime deployments. |
| `database-optimizer` | Expert database optimizer specializing in modern performance tuning, query optimization, and scalable architectures. |
| `neon-instagres` | Instantly provision production-ready Postgres databases with Neon Instagres. Use when setting up databases, when users mention PostgreSQL/Postgres, da... |
| `postgres-schema-design` | Comprehensive PostgreSQL-specific table design reference covering data types, indexing, constraints, performance patterns, and advanced features |
| `postgresql-optimization` | PostgreSQL database optimization workflow for query tuning, indexing strategies, performance analysis, and production database management. |
| `postgresql` | Design a PostgreSQL-specific schema. Covers best-practices, data types, indexing, constraints, performance patterns, and advanced features |
| `sql-pro` | Master modern SQL with cloud-native databases, OLTP/OLAP optimization, and advanced query techniques. Expert in performance tuning, data modeling, and... |
| `supabase-postgres-best-practices` | Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema des... |
| `using-neon` | Guides and best practices for working with Neon Serverless Postgres. Covers getting started, local development with Neon, choosing a connection method... |

### Category: `development` (228 skills)

| Skill Name | Description |
| :--- | :--- |
| `accessibility` | Audit and improve web accessibility following WCAG 2.1 guidelines. Use when asked to "improve accessibility", "a11y audit", "WCAG compliance", "screen... |
| `agent-development` | This skill should be used when the user asks to "create an agent", "add an agent", "write a subagent", "agent frontmatter", "when to use description",... |
| `agent-md-refactor` | Refactor bloated AGENTS.md, CLAUDE.md, or similar agent instruction files to follow progressive disclosure principles. Splits monolithic files into or... |
| `agirails-agent-payments` | AI agent payment infrastructure — ACTP escrow, x402 instant payments, USDC settlement on Base L2. Interactive onboarding: asks your preferences, gener... |
| `algolia-search` | Expert patterns for Algolia search implementation, indexing strategies, React InstantSearch, and relevance tuning Use when: adding search to, algolia,... |
| `android-cicd` | Automated Android CI/CD pipeline to Google Play — supports TWA, React Native, Flutter, and native Android. Run npx android-cicd to set up keystore gen... |
| `angular` | Modern Angular (v20+) expert with deep knowledge of Signals, Standalone Components, Zoneless applications, SSR/Hydration, and reactive patterns. |
| `api-design-principles` | Master REST and GraphQL API design principles to build intuitive, scalable, and maintainable APIs that delight developers and stand the test of time. |
| `api-documentation-generator` | Generate comprehensive, developer-friendly API documentation from code, including endpoints, parameters, examples, and best practices |
| `api-integration-specialist` | Expert in integrating third-party APIs with proper authentication, error handling, rate limiting, and retry logic. Use when integrating REST APIs, Gra... |
| `api-patterns` | API design principles and decision-making. REST vs GraphQL vs tRPC selection, response formats, versioning, pagination. |
| `architecture-decision-records` | Comprehensive patterns for creating, maintaining, and managing Architecture Decision Records (ADRs) that capture the context and rationale behind sign... |
| `architecture-patterns` | Master proven backend architecture patterns including Clean Architecture, Hexagonal Architecture, and Domain-Driven Design to build maintainable, test... |
| `architecture` | Architectural decision-making framework. Requirements analysis, trade-off evaluation, ADR documentation. Use when making architecture decisions or ana... |
| `artifacts-builder` | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui... |
| `async-python-patterns` | Comprehensive guidance for implementing asynchronous Python applications using asyncio, concurrent programming patterns, and async/await for building ... |
| `avalonia-layout-zafiro` | Guidelines for modern Avalonia UI layout using Zafiro.Avalonia, emphasizing shared styles, generic components, and avoiding XAML redundancy. |
| `avalonia-viewmodels-zafiro` | Optimal ViewModel and Wizard creation patterns for Avalonia using Zafiro and ReactiveUI. |
| `avalonia-zafiro-development` | Mandatory skills, conventions, and behavioral rules for Avalonia UI development using the Zafiro toolkit. |
| `aws-serverless` | Specialized skill for building production-ready serverless applications on AWS. Covers Lambda functions, API Gateway, DynamoDB, SQS/SNS event-driven p... |
| `azure-functions` | Expert patterns for Azure Functions development including isolated worker model, Durable Functions orchestration, cold start optimization, and product... |
| `backend-architect` | Expert backend architect specializing in scalable API design, microservices architecture, and distributed systems. |
| `backend-dev-guidelines` | Comprehensive backend development guide for Node.js/Express/TypeScript microservices. Use when creating routes, controllers, services, repositories, m... |
| `bash-linux` | Bash/Linux terminal patterns. Critical commands, piping, error handling, scripting. Use when working on macOS or Linux systems. |
| `bash-pro` | Master of defensive Bash scripting for production automation, CI/CD    pipelines, and system utilities. Expert in safe, portable, and testable shell  ... |
| `best-practices` | Apply modern web development best practices for security, compatibility, and code quality. Use when asked to "apply best practices", "security audit",... |
| `bleu` | Use this skill whenever a developer wants to turn an idea into a complete, production-ready, end-to-end system plan BEFORE writing any code. Trigger o... |
| `brainstorming` | You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent... |
| `brightdata-local-search` | Set up and run local web searches using Bright Data SERP API with the unfancy-search pipeline (query expansion, SERP retrieval, RRF reranking). |
| `bullmq-specialist` | BullMQ expert for Redis-backed job queues, background processing, and reliable async execution in Node.js/TypeScript applications. Use when: bullmq, b... |
| `bun-development` | Modern JavaScript/TypeScript development with Bun runtime. Covers package management, bundling, testing, and migration from Node.js. Use when working ... |
| `c-pro` | Write efficient C code with proper memory management, pointer |
| `cc-skill-backend-patterns` | Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes. |
| `cc-skill-clickhouse-io` | ClickHouse database patterns, query optimization, analytics, and data engineering best practices for high-performance analytical workloads. |
| `cc-skill-coding-standards` | Universal coding standards, best practices, and patterns for TypeScript, JavaScript, React, and Node.js development. |
| `cc-skill-continuous-learning` | Development skill from everything-claude-code |
| `cc-skill-frontend-patterns` | Frontend development patterns for React, Next.js, state management, performance optimization, and UI best practices. |
| `cc-skill-project-guidelines-example` | Project Guidelines Skill (Example) |
| `cc-skill-security-review` | Use this skill when adding authentication, handling user input, working with secrets, creating API endpoints, or implementing payment/sensitive featur... |
| `cc-skill-strategic-compact` | Development skill from everything-claude-code |
| `changelog-generator` | Automatically creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits in... |
| `claude-api` | Build, debug, and optimize Claude API / Anthropic SDK apps. Apps built with this skill should include prompt caching. Also handles migrating existing ... |
| `claude-opus-4-5-migration` | Migrate prompts and code from Claude Sonnet 4.0, Sonnet 4.5, or Opus 4.1 to Opus 4.5. Use when the user wants to update their codebase, prompts, or AP... |
| `clean-code` | Pragmatic coding standards - concise, direct, no over-engineering, no unnecessary comments |
| `clerk-auth` | Expert patterns for Clerk auth implementation, middleware, organizations, webhooks, and user sync Use when: adding authentication, clerk auth, user au... |
| `cloud-architect` | Expert cloud architect specializing in AWS/Azure/GCP multi-cloud infrastructure design, advanced IaC (Terraform/OpenTofu/CDK), FinOps cost optimizatio... |
| `cloud-devops` | Cloud infrastructure and DevOps workflow covering AWS, Azure, GCP, Kubernetes, Terraform, CI/CD, monitoring, and cloud-native development. |
| `cloud-run-basics` | Manages Cloud Run services, jobs, and worker pools. Use when you need to deploy applications responding to HTTP requests (services), run event-trigger... |
| `cloudflare-deploy` | Deploy applications and infrastructure to Cloudflare using Workers, Pages, and related platform services. Use when the user asks to deploy, host, publ... |
| `cocoindex` | Comprehensive toolkit for developing with the CocoIndex library. Use when users need to create data transformation pipelines (flows), write custom fun... |
| `code-review-checklist` | Comprehensive checklist for conducting thorough code reviews covering functionality, security, performance, and maintainability |
| `code-reviewer` | Comprehensive code review skill for TypeScript, JavaScript, Python, Swift, Kotlin, Go. Includes automated code analysis, best practice checking, secur... |
| `codex-review` | Professional code review with auto CHANGELOG generation, integrated with Codex AI |
| `codex` | Use when the user asks to run Codex CLI (codex exec, codex resume) or references OpenAI Codex for code analysis, refactoring, or automated editing. Us... |
| `command-creator` | This skill should be used when creating a Claude Code slash command. Use when users ask to "create a command", "make a slash command", "add a command"... |
| `command-development` | This skill should be used when the user asks to "create a slash command", "add a command", "write a custom command", "define command arguments", "use ... |
| `context-architecture` | Audit a codebase and bind every claim it makes about itself to a mechanism that fails when the claim   stops being true, so it is legible to people an... |
| `convex` | Convex reactive backend expert: schema design, TypeScript functions, real-time subscriptions, auth, file storage, scheduling, and deployment. |
| `core-components` | Core component library and design system patterns. Use when building UI, using design tokens, or working with the component library. |
| `core-web-vitals` | Optimize Core Web Vitals (LCP, INP, CLS) for better page experience and search ranking. Use when asked to "improve Core Web Vitals", "fix LCP", "reduc... |
| `cpp-pro` | Write idiomatic C++ code with modern features, RAII, smart pointers, and STL algorithms. Handles templates, move semantics, and performance optimizati... |
| `create-plan` | Create a concise plan. Use when a user explicitly asks for a plan related to a coding task. |
| `csharp-pro` | Write modern C# code with advanced features like records, pattern matching, and async/await. Optimizes .NET applications, implements enterprise patter... |
| `database-design` | Database design principles and decision-making. Schema design, indexing strategy, ORM selection, serverless databases. |
| `database-schema-designer` | Design robust, scalable database schemas for SQL and NoSQL databases. Provides normalization guidelines, indexing strategies, migration patterns, cons... |
| `dependency-updater` | Smart dependency management for any language. Auto-detects project type, applies safe updates automatically, prompts for major versions, diagnoses and... |
| `deployment-procedures` | Production deployment principles and decision-making. Safe deployment workflows, rollback strategies, and verification. Teaches thinking, not scripts. |
| `design-system-starter` | Create and evolve design systems with design tokens, component architecture, accessibility guidelines, and documentation templates. Ensures consistent... |
| `developer-growth-analysis` | Analyzes your recent Claude Code chat history to identify coding patterns, development gaps, and areas for improvement, curates relevant learning reso... |
| `devops-iac-engineer` | Implements infrastructure as code using Terraform, Kubernetes, and cloud platforms. Designs scalable architectures, CI/CD pipelines, and observability... |
| `dispatching-parallel-agents` | Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies |
| `django-pro` | Master Django 5.x with async views, DRF, Celery, and Django Channels. Build scalable web applications with proper architecture, testing, and deploymen... |
| `docker-expert` | Docker containerization expert with deep knowledge of multi-stage builds, image optimization, container security, Docker Compose orchestration, and pr... |
| `domain-driven-design` | Plan and route Domain-Driven Design work from strategic modeling to tactical implementation and evented architecture patterns. |
| `dotnet-backend` | Build ASP.NET Core 8+ backend services with EF Core, auth, background jobs, and production API patterns. |
| `e2e-testing-patterns` | Build reliable, fast, and maintainable end-to-end test suites that provide confidence to ship code quickly and catch regressions before users do. |
| `elixir-pro` | Write idiomatic Elixir code with OTP patterns, supervision trees, and Phoenix LiveView. Masters concurrency, fault tolerance, and distributed systems. |
| `environment-setup-guide` | Guide developers through setting up development environments with proper tools, dependencies, and configurations |
| `error-resolver` | Systematic error diagnosis and resolution using first-principle analysis. Use when encountering any error message, stack trace, or unexpected behavior... |
| `eval-genius` | Decide whether an AI/LLM/agent/retrieval system needs an eval, where it fits in the   dev process, which one to run, and how to read the result; then ... |
| `event-sourcing-architect` | Expert in event sourcing, CQRS, and event-driven architecture patterns. Masters event store design, projection building, saga orchestration, and event... |
| `executing-plans` | Use when you have a written implementation plan to execute in a separate session with review checkpoints |
| `fastapi-pro` | Build high-performance async APIs with FastAPI, SQLAlchemy 2.0, and Pydantic V2. Master microservices, WebSockets, and modern Python async patterns. |
| `fastmcp-server` | Complete guide for building MCP servers with FastMCP 3.0 - tools, resources, authentication, providers, middleware, and deployment. Use when creating ... |
| `feature-design-assistant` | Turn ideas into fully formed designs and specs through natural collaborative dialogue. Use when planning new features, designing architecture, or maki... |
| `finishing-a-development-branch` | Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by prese... |
| `firebase-basics` | Sets up and develops projects using Firebase products and services, especially for mobile or web apps. Covers Firebase CLI setup, project configuratio... |
| `firebase` | Firebase gives you a complete backend in minutes - auth, database, storage, functions, hosting. But the ease of setup hides real complexity. Security ... |
| `flutter-expert` | Master Flutter development with Dart 3, advanced widgets, and multi-platform deployment. |
| `frontend-dev-guidelines` | Frontend development guidelines for React/TypeScript applications. Modern patterns including Suspense, lazy loading, useSuspenseQuery, file organizati... |
| `gcp-cloud-run` | Specialized skill for building production-ready serverless applications on GCP. Covers Cloud Run services (containerized), Cloud Run Functions (event-... |
| `gh-address-comments` | Help address review/issue comments on the open GitHub PR for the current branch using gh CLI; verify gh auth first and prompt the user to authenticate... |
| `gh-fix-ci` | Inspect GitHub PR checks with gh, pull failing GitHub Actions logs, summarize failure context, then create a fix plan and implement after user approva... |
| `git-commit-helper` | Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes. |
| `git-pushing` | Stage, commit, and push git changes with conventional commit messages. Use when user wants to commit and push changes, mentions pushing to remote, or ... |
| `github-actions-creator` | Use when the user wants to create, generate, or set up a GitHub Actions workflow. Handles CI/CD pipelines, testing, deployment, linting, security scan... |
| `github-workflow-automation` | Automate GitHub workflows with AI assistance. Includes PR reviews, issue triage, CI/CD integration, and Git operations. Use when automating GitHub wor... |
| `gke-basics` | Plans, creates, and configures production-ready Google Kubernetes Engine (GKE) clusters using the golden path Autopilot configuration. Covers networki... |
| `golang-pro` | Master Go 1.21+ with modern patterns, advanced concurrency, performance optimization, and production-ready microservices. |
| `google-cloud-networking-observability` | Investigates Google Cloud networking issues by analyzing logs, metrics, and diagnostics. Use when investigating VPC Flow Logs, NAT, firewall, or threa... |
| `google-cloud-onboarding` | Guides developers through their first steps on Google Cloud, covering account creation, billing setup, project management, CLI installation, and deplo... |
| `google-cloud-waf-cost-optimization` | Generates cost optimization guidance for Google Cloud workloads based on the Google Cloud Well-Architected Framework (WAF). Use to evaluate a workload... |
| `google-cloud-waf-reliability` | Generates reliability-focused guidance for Google Cloud workloads based on the Google Cloud Well-Architected Framework. Use to evaluate a workload, id... |
| `grafana-dashboards` | Create and manage production-ready Grafana dashboards for comprehensive system observability. |
| `graphql-architect` | Master modern GraphQL with federation, performance optimization, and enterprise security. Build scalable schemas, implement advanced caching, and desi... |
| `graphql` | GraphQL gives clients exactly the data they need - no more, no less. One endpoint, typed schema, introspection. But the flexibility that makes it powe... |
| `haskell-pro` | Expert Haskell engineer specializing in advanced type systems, pure |
| `helm-chart-scaffolding` | Comprehensive guidance for creating, organizing, and managing Helm charts for packaging and deploying Kubernetes applications. |
| `heygen-best-practices` | Best practices for HeyGen - AI avatar video creation API |
| `hook-development` | This skill should be used when the user asks to "create a hook", "add a PreToolUse/PostToolUse/Stop hook", "validate tool use", "implement prompt-base... |
| `hubspot-integration` | Expert patterns for HubSpot CRM integration including OAuth authentication, CRM objects, associations, batch operations, webhooks, and custom objects.... |
| `i18n-localization` | Internationalization and localization patterns. Detecting hardcoded strings, managing translations, locale files, RTL support. |
| `incident-responder` | Expert SRE incident responder specializing in rapid problem resolution, modern observability, and comprehensive incident management. |
| `internet-court` | The trust layer for agent-to-agent commerce — natural-language mandates, delegated permissions (ERC-7710), x402 payments, escrow, and dispute resoluti... |
| `it-operations` | Manages IT infrastructure, monitoring, incident response, and service reliability. Provides frameworks for ITIL service management, observability stra... |
| `java-pro` | Master Java 21+ with modern features like virtual threads, pattern matching, and Spring Boot 3.x. Expert in the latest Java ecosystem including GraalV... |
| `javascript-mastery` | Comprehensive JavaScript reference covering 33+ essential concepts every developer should know. From fundamentals like primitives and closures to adva... |
| `javascript-pro` | Master modern JavaScript with ES6+, async patterns, and Node.js APIs. Handles promises, event loops, and browser/Node compatibility. |
| `javascript-testing-patterns` | Comprehensive guide for implementing robust testing strategies in JavaScript/TypeScript applications using modern testing frameworks and best practice... |
| `jupyter-notebook` | Use when the user asks to create, scaffold, or edit Jupyter notebooks (`.ipynb`) for experiments, explorations, or tutorials; prefer the bundled templ... |
| `k6-load-testing` | Comprehensive k6 load testing skill for API, browser, and scalability testing. Write realistic load scenarios, analyze results, and integrate with CI/... |
| `kotlin-coroutines-expert` | Expert patterns for Kotlin Coroutines and Flow, covering structured concurrency, error handling, and testing. |
| `kubernetes-architect` | Expert Kubernetes architect specializing in cloud-native infrastructure, advanced GitOps workflows (ArgoCD/Flux), and enterprise container orchestrati... |
| `laravel-expert` | Senior Laravel Engineer role for production-grade, maintainable, and idiomatic Laravel solutions. Focuses on clean architecture, security, performance... |
| `lint-and-validate` | Automatic quality control, linting, and static analysis procedures. Use after every code modification to ensure syntax correctness and project standar... |
| `linux-shell-scripting` | This skill should be used when the user asks to "create bash scripts", "automate Linux tasks", "monitor system resources", "backup files", "manage use... |
| `manifest` | Install and configure the Manifest observability plugin for your agents. Use when setting up telemetry, configuring API keys or endpoints, troubleshoo... |
| `mcp-builder` | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. ... |
| `mcp-integration` | This skill should be used when the user asks to "add MCP server", "integrate MCP", "configure MCP in plugin", "use .mcp.json", "set up Model Context P... |
| `mermaid-diagram-specialist` | Mermaid diagram specialist for creating flowcharts, sequence diagrams, ERDs,   and architecture visualizations |
| `microservices-patterns` | Master microservices architecture patterns including service boundaries, inter-service communication, data management, and resilience patterns for bui... |
| `monorepo-architect` | Expert in monorepo architecture, build systems, and dependency management at scale. Masters Nx, Turborepo, Bazel, and Lerna for efficient multi-projec... |
| `moodle-external-api-development` | Create custom external web service APIs for Moodle LMS. Use when implementing web services for course management, user tracking, quiz operations, or c... |
| `move-code-quality` | Analyzes Move language packages against the official Move Book Code Quality Checklist. Use this skill when reviewing Move code, checking Move 2024 Edi... |
| `mui` | Material-UI v7 component library patterns including sx prop styling, theme integration, responsive design, and MUI-specific hooks. Use when working wi... |
| `neon-postgres` | Expert patterns for Neon serverless Postgres, branching, connection pooling, and Prisma/Drizzle integration Use when: neon database, serverless postgr... |
| `nestjs-expert` | Nest.js framework expert specializing in module architecture, dependency injection, middleware, guards, interceptors, testing with Jest/Supertest, Typ... |
| `netlify-deploy` | Deploy web projects to Netlify using the Netlify CLI (`npx netlify`). Use when the user asks to deploy, host, publish, or link a site/repo on Netlify,... |
| `nextjs-best-practices` | Next.js App Router principles. Server Components, data fetching, routing patterns. |
| `nextjs-supabase-auth` | Expert integration of Supabase Auth with Next.js App Router Use when: supabase auth next, authentication next.js, login supabase, auth middleware, pro... |
| `nodejs-backend-patterns` | Comprehensive guidance for building scalable, maintainable, and production-ready Node.js backend applications with modern frameworks, architectural pa... |
| `nodejs-best-practices` | Node.js development principles and decision-making. Framework selection, async patterns, security, and architecture. Teaches thinking, not copying. |
| `nosql-expert` | Expert guidance for distributed NoSQL databases (Cassandra, DynamoDB). Focuses on mental models, query-first modeling, single-table design, and avoidi... |
| `observability-engineer` | Build production-ready monitoring, logging, and tracing systems. Implements comprehensive observability strategies, SLI/SLO management, and incident r... |
| `openapi-to-typescript` | Converts OpenAPI 3.0 JSON/YAML to TypeScript interfaces and type guards. This skill should be used when the user asks to generate types from OpenAPI, ... |
| `performance-profiling` | Performance profiling principles. Measurement, analysis, and optimization techniques. |
| `performance` | Optimize web performance for faster loading and better user experience. Use when asked to "speed up my site", "optimize performance", "reduce load tim... |
| `php-pro` | Write idiomatic PHP code with generators, iterators, SPL data    structures, and modern OOP features. Use PROACTIVELY for high-performance PHP    appl... |
| `plaid-fintech` | Expert patterns for Plaid API integration including Link token flows, transactions sync, identity verification, Auth for ACH, balance checks, webhook ... |
| `playwright-e2e-builder` | Plan and build comprehensive Playwright E2E test suites with Page Object Model, authentication state persistence, custom fixtures, visual regression, ... |
| `playwright-java` | Scaffold, write, debug, and enhance enterprise-grade Playwright E2E tests in Java using Page Object Model, JUnit 5, Allure reporting, and parallel exe... |
| `playwright` | Use when the task requires automating a real browser from the terminal (navigation, form filling, snapshots, screenshots, data extraction, UI-flow deb... |
| `plugin-forge` | Create and manage Claude Code plugins with proper structure, manifests, and marketplace integration. Use when creating plugins for a marketplace, addi... |
| `plugin-settings` | This skill should be used when the user asks about "plugin settings", "store plugin configuration", "user-configurable plugin", ".local.md files", "pl... |
| `plugin-structure` | This skill should be used when the user asks to "create a plugin", "scaffold a plugin", "understand plugin structure", "organize plugin components", "... |
| `postgres-best-practices` | Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema des... |
| `powershell-windows` | PowerShell Windows patterns. Critical pitfalls, operator syntax, error handling. |
| `prisma-expert` | Prisma ORM expert for schema design, migrations, query optimization, relations modeling, and database operations. Use PROACTIVELY for Prisma schema is... |
| `production-code-audit` | Autonomously deep-scan entire codebase line-by-line, understand architecture and patterns, then systematically transform it to production-grade, corpo... |
| `prometheus-configuration` | Complete guide to Prometheus setup, metric collection, scrape configuration, and recording rules. |
| `python-patterns` | Python development principles and decision-making. Framework selection, async patterns, type hints, project structure. Teaches thinking, not copying. |
| `python-pro` | Master Python 3.12+ with modern features, async programming, performance optimization, and production-ready practices. Expert in the latest Python eco... |
| `python-testing-patterns` | Implement comprehensive testing strategies with pytest, fixtures, mocking, and test-driven development. Use when writing Python tests, setting up test... |
| `react-best-practices` | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React... |
| `react-dev` | This skill should be used when building React components with TypeScript, typing hooks, handling events, or when React TypeScript, React 19, Server Co... |
| `react-patterns` | Modern React patterns and principles. Hooks, composition, performance, TypeScript best practices. |
| `react-ui-patterns` | Modern React UI patterns for loading states, error handling, and data fetching. Use when building UI components, handling async data, or managing UI s... |
| `react-useeffect` | React useEffect best practices from official docs. Use when writing/reviewing useEffect, useState for derived values, data fetching, or state synchron... |
| `receiving-code-review` | Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires ... |
| `render-deploy` | Deploy applications to Render by analyzing codebases, generating render.yaml Blueprints, and providing Dashboard deeplinks. Use when the user wants to... |
| `requesting-code-review` | Use when completing tasks, implementing major features, or before merging to verify work meets requirements |
| `ruby-pro` | Write idiomatic Ruby code with metaprogramming, Rails patterns, and performance optimization. Specializes in Ruby on Rails, gem development, and testi... |
| `rust-cli-builder` | Plan and build production-ready Rust CLI tools using clap for argument parsing, with subcommands, config file support, colored output, and proper erro... |
| `rust-pro` | Master Rust 1.75+ with modern async patterns, advanced type system features, and production-ready systems programming. |
| `saas-multi-tenant` | Design and implement multi-tenant SaaS architectures with row-level security, tenant-scoped queries, shared-schema isolation, and safe cross-tenant ad... |
| `salesforce-development` | Expert patterns for Salesforce platform development including Lightning Web Components (LWC), Apex triggers and classes, REST/Bulk APIs, Connected App... |
| `scala-pro` | Master enterprise-grade Scala development with functional programming, distributed systems, and big data processing. Expert in Apache Pekko, Akka, Spa... |
| `screenshot-feature-extractor` | Analyze product screenshots to extract feature lists and generate development task checklists. Use when: (1) Analyzing competitor product screenshots ... |
| `security-compliance` | Guides security professionals in implementing defense-in-depth security architectures, achieving compliance with industry frameworks (SOC2, ISO27001, ... |
| `senior-architect` | Comprehensive software architecture skill for designing scalable, maintainable systems using ReactJS, NextJS, NodeJS, Express, React Native, Swift, Ko... |
| `senior-backend` | Comprehensive backend development skill for building scalable backend systems using NodeJS, Express, Go, Python, Postgres, GraphQL, REST APIs. Include... |
| `senior-computer-vision` | World-class computer vision skill for image/video processing, object detection, segmentation, and visual AI systems. Expertise in PyTorch, OpenCV, YOL... |
| `senior-data-engineer` | World-class data engineering skill for building scalable data pipelines, ETL/ELT systems, and data infrastructure. Expertise in Python, SQL, Spark, Ai... |
| `senior-data-scientist` | World-class data science skill for statistical modeling, experimentation, causal inference, and advanced analytics. Expertise in Python (NumPy, Pandas... |
| `senior-devops` | Comprehensive DevOps skill for CI/CD, infrastructure automation, containerization, and cloud platforms (AWS, GCP, Azure). Includes pipeline setup, inf... |
| `senior-frontend` | Comprehensive frontend development skill for building modern, performant web applications using ReactJS, NextJS, TypeScript, Tailwind CSS. Includes co... |
| `senior-fullstack` | Comprehensive fullstack development skill for building complete web applications with React, Next.js, Node.js, GraphQL, and PostgreSQL. Includes proje... |
| `senior-ml-engineer` | World-class ML engineering skill for productionizing ML models, MLOps, and building scalable ML systems. Expertise in PyTorch, TensorFlow, model deplo... |
| `senior-prompt-engineer` | World-class prompt engineering skill for LLM optimization, prompt patterns, structured outputs, and AI product development. Expertise in Claude, GPT-4... |
| `senior-qa` | Comprehensive QA and testing skill for quality assurance, test automation, and testing strategies for ReactJS, NextJS, NodeJS applications. Includes t... |
| `senior-secops` | Comprehensive SecOps skill for application security, vulnerability management, compliance, and secure development practices. Includes security scannin... |
| `senior-security` | Comprehensive security engineering skill for application security, penetration testing, security architecture, and compliance auditing. Includes secur... |
| `seo` | Optimize for search engine visibility and ranking. Use when asked to "improve SEO", "optimize for search", "fix meta tags", "add structured data", "si... |
| `server-management` | Server management principles and decision-making. Process management, monitoring strategy, and scaling decisions. Teaches thinking, not commands. |
| `skill-creation-guide` | Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude... |
| `skill-creator` | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or opt... |
| `skill-development` | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or opt... |
| `skill-installer` | Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a cur... |
| `software-architecture` | Guide for quality focused software architecture. This skill should be used when users want to write code, design architecture, analyze code, in any ca... |
| `stripe-integration` | Get paid from day one. Payments, subscriptions, billing portal, webhooks, metered billing, Stripe Connect. The complete guide to implementing Stripe c... |
| `subagent-driven-development` | Use when executing implementation plans with independent tasks in the current session |
| `swarmvault` | Use SwarmVault when the user needs a local-first knowledge vault that writes durable markdown, graph, search, dashboard, review, and MCP artifacts to ... |
| `swift-concurrency-expert` | Review and fix Swift concurrency issues such as actor isolation and Sendable violations. |
| `systematic-debugging` | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes |
| `task-execution-engine` | Execute implementation tasks from design documents using markdown checkboxes. Use when (1) implementing features from feature-design-assistant output,... |
| `tdd-orchestrator` | Master TDD orchestrator specializing in red-green-refactor discipline, multi-agent workflow coordination, and comprehensive test-driven development pr... |
| `tdd-workflow` | Test-Driven Development workflow principles. RED-GREEN-REFACTOR cycle. |
| `telegram-bot-builder` | This skill should be used when the user asks to "create a Telegram bot", "build a Telegram chatbot", "set up a Telegram webhook", "add inline keyboard... |
| `terraform-specialist` | Expert Terraform/OpenTofu specialist mastering advanced IaC automation, state management, and enterprise infrastructure patterns. |
| `test-detect` | Auto-detect testing framework and run relevant tests. Identifies Jest, Vitest, Playwright, Cypress, pytest, Go test, and others. Can run all tests, sp... |
| `test-driven-development` | Use when implementing any feature or bugfix, before writing implementation code |
| `test-fixing` | Run tests and systematically fix all failing tests using smart error grouping. Use when user asks to fix failing tests, mentions test failures, runs t... |
| `testing-patterns` | Jest testing patterns, factory functions, mocking strategies, and TDD workflow. Use when writing unit tests, creating test factories, or following TDD... |
| `typescript-expert` | TypeScript and JavaScript expert with deep knowledge of type-level   programming, performance optimization, monorepo management, migration   strategie... |
| `typescript-pro` | Master TypeScript with advanced types, generics, and strict type safety. Handles complex type systems, decorators, and enterprise-grade patterns. |
| `using-git-worktrees` | Use when starting feature work that needs isolation from current workspace or before executing implementation plans - creates isolated git worktrees w... |
| `using-superpowers` | Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying ... |
| `vercel-deploy` | Deploy applications and websites to Vercel. Use when the user requests deployment actions like "deploy my app", "deploy and give me the link", "push t... |
| `vercel-deployment` | Expert knowledge for deploying to Vercel with Next.js Use when: vercel, deploy, deployment, hosting, production. |
| `verification-before-completion` | Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming... |
| `web-artifacts-builder` | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui... |
| `web-quality-audit` | Comprehensive web quality audit covering performance, accessibility, SEO, and best practices. Use when asked to "audit my site", "review web quality",... |
| `web-to-markdown` | Use ONLY when the user explicitly says: 'use the skill web-to-markdown ...' (or 'use a skill web-to-markdown ...'). Converts webpage URLs to clean Mar... |
| `webapp-testing` | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, ca... |
| `worktree-guide` | Interactive guide for parallel development with Ghostty, git worktrees, and Lazygit. Use when setting up multi-task workflows or learning the worktree... |
| `writing-plans` | Use when you have a spec or requirements for a multi-step task, before touching code |
| `writing-skills` | Use when creating new skills, editing existing skills, or verifying skills work before deployment |
| `zapier-workflows` | Manage and trigger pre-built Zapier workflows and MCP tool orchestration. Use when user mentions workflows, Zaps, automations, daily digest, research,... |

### Category: `document-processing` (18 skills)

| Skill Name | Description |
| :--- | :--- |
| `doc` | Use when the task involves reading, creating, or editing `.docx` documents, especially when formatting or layout fidelity matters; prefer `python-docx... |
| `documentation-templates` | Documentation templates and structure guidelines. README, API docs, code comments, and AI-friendly documentation. |
| `docx-official` | Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any mention of 'Word doc',... |
| `docx` | Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any mention of 'Word doc',... |
| `json-canvas` | Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas files, creating visual canvases,... |
| `obsidian-bases` | Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. Use when working with .base files, creating database-like v... |
| `obsidian-markdown` | Create and edit Obsidian Flavored Markdown with wikilinks, embeds, callouts, properties, and other Obsidian-specific syntax. Use when working with .md... |
| `pdf-anthropic` | Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging ... |
| `pdf-fill-studio` | Fill any PDF locally and place each value precisely in a visual editor. Use when the user wants to fill out a PDF form, enter data into a PDF, complet... |
| `pdf-official` | Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging ... |
| `pdf-processing-pro` | Production-ready PDF processing with forms, tables, OCR, validation, and batch operations. Use when working with complex PDF workflows in production e... |
| `pdf-processing` | Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging ... |
| `pdf` | Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging ... |
| `pptx-official` | Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes: creating slide decks, pitch decks, or presenta... |
| `pptx` | Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes: creating slide decks, pitch decks, or presenta... |
| `spreadsheet` | Use when tasks involve creating, editing, analyzing, or formatting spreadsheets (`.xlsx`, `.csv`, `.tsv`) using Python (`openpyxl`, `pandas`), especia... |
| `xlsx-official` | Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user wants to: open, read, edit, or fix an ex... |
| `xlsx` | Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user wants to: open, read, edit, or fix an ex... |

### Category: `doordash` (5 skills)

| Skill Name | Description |
| :--- | :--- |
| `doordash-allergy-shield` | Persistent dietary safety layer for DoorDash CLI (dd-cli) ordering. Stores a personal/household dietary profile (allergens with severity tiers, diets,... |
| `doordash-group-orders` | Group food ordering through the DoorDash CLI (dd-cli) from a persistent team roster. One request (\"lunch for the team\") fans out into a single merge... |
| `doordash-order-ledger` | Accountability layer for agent-driven DoorDash ordering. Works with the doordash-audit-log hook (which appends every dd-cli invocation to an append-on... |
| `doordash-order-playbooks` | Named, context-bound saved DoorDash orders ("post-gym", "late-night deploy") recalled through the DoorDash CLI (dd-cli) with a mandatory cart-diff bef... |
| `doordash-spend-guard` | Hard spending policy for agent-driven DoorDash ordering through the DoorDash CLI (dd-cli). Per-order ceiling, daily/weekly/monthly caps, cooldown betw... |

### Category: `enterprise-communication` (33 skills)

| Skill Name | Description |
| :--- | :--- |
| `backend-to-frontend-handoff-docs` | Create API handoff documentation for frontend developers. Use when backend work is complete and needs to be documented for frontend integration, or us... |
| `brand-guidelines` | Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when b... |
| `capa-officer` | Senior CAPA Officer specialist for managing Corrective and Preventive Actions within Quality Management Systems. Provides CAPA process management, roo... |
| `daily-meeting-update` | Interactive daily standup/meeting update generator. Use when user says 'daily', 'standup', 'scrum update', 'status update', 'what did I do yesterday',... |
| `data-privacy-compliance` | Data privacy and regulatory compliance specialist for GDPR, CCPA, HIPAA, and international data protection laws. Use when implementing privacy control... |
| `difficult-workplace-conversations` | Structured approach to workplace conflicts, performance discussions, and challenging feedback using preparation-delivery-followup framework. Use when ... |
| `discord-bot-architect` | Specialized skill for building production-ready Discord bots. Covers Discord.js (JavaScript) and Pycord (Python), gateway intents, slash commands, int... |
| `email-composer` | Draft professional emails for various contexts including business, technical, and customer communication. Use when the user needs help writing emails ... |
| `excel-analysis` | Analyze Excel spreadsheets, create pivot tables, generate charts, and perform data analysis. Use when analyzing Excel files, spreadsheets, tabular dat... |
| `fda-consultant-specialist` | Senior FDA consultant and specialist for medical device companies including HIPAA compliance and requirement management. Provides FDA pathway expertis... |
| `feedback-mastery` | Navigate difficult conversations and deliver constructive feedback using structured frameworks. Covers the Preparation-Delivery-Follow-up model and Si... |
| `frontend-to-backend-requirements` | Document frontend data needs for backend developers. Use when frontend needs to communicate API requirements to backend, or user says 'backend require... |
| `gdpr-dsgvo-expert` | Senior GDPR/DSGVO expert and internal/external auditor for data protection compliance. Provides EU GDPR and German DSGVO expertise, privacy impact ass... |
| `information-security-manager-iso27001` | Senior Information Security Manager specializing in ISO 27001 and ISO 27002 implementation for HealthTech and MedTech companies. Provides ISMS impleme... |
| `internal-comms-anthropic` | A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill... |
| `internal-comms-community` | A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill... |
| `internal-comms` | A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill... |
| `isms-audit-expert` | Senior ISMS Audit Expert for internal and external information security management system auditing. Provides ISO 27001 audit expertise, security audit... |
| `mdr-745-specialist` | EU MDR 2017/745 regulation specialist and consultant for medical device requirement management. Provides comprehensive MDR compliance expertise, gap a... |
| `professional-communication` | Guide technical communication for software developers. Covers email structure, team messaging etiquette, meeting agendas, and adapting messages for te... |
| `qms-audit-expert` | Senior QMS Audit Expert for internal and external quality management system auditing. Provides ISO 13485 audit expertise, audit program management, no... |
| `quality-documentation-manager` | Senior Quality Documentation Manager for comprehensive documentation control and regulatory document review. Provides document management system desig... |
| `quality-manager-qmr` | Senior Quality Manager Responsible Person (QMR) for HealthTech and MedTech companies. Provides overall quality system responsibility, regulatory compl... |
| `quality-manager-qms-iso13485` | ISO 13485 Quality Management System specialist for medical device companies. Provides QMS implementation, maintenance, process optimization, and compl... |
| `regulatory-affairs-head` | Senior Regulatory Affairs Manager expertise for HealthTech and MedTech companies. Provides strategic regulatory guidance, submission management, regul... |
| `risk-management-specialist` | Senior Risk Management specialist for medical device companies implementing ISO 14971 risk management throughout product lifecycle. Provides risk anal... |
| `session-handoff` | Creates comprehensive handoff documents for seamless AI agent session transfers. Triggered when: (1) user requests handoff/memory/context save, (2) co... |
| `slack-bot-builder` | Build Slack apps using the Bolt framework across Python, JavaScript, and Java. Covers Block Kit for rich UIs, interactive components, slash commands, ... |
| `slack-gif-creator` | Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, validation tools, and animation concepts. Use when users... |
| `telegram-bot-builder` | Expert in building Telegram bots that solve real problems - from simple automation to complex AI-powered bots. Covers bot architecture, the Telegram B... |
| `telegram-mini-app` | Expert in building Telegram Mini Apps (TWA) - web apps that run inside Telegram with native-like experience. Covers the TON ecosystem, Telegram Web Ap... |
| `twilio-communications` | Build communication features with Twilio: SMS messaging, voice calls, WhatsApp Business API, and user verification (2FA). Covers the full spectrum fro... |
| `writing-clearly-and-concisely` | Use when writing prose humans will read—documentation, commit messages, error messages, explanations, reports, or UI text. Applies Strunk's timeless r... |

### Category: `git` (3 skills)

| Skill Name | Description |
| :--- | :--- |
| `commit-smart` | Analyze staged/unstaged changes and create semantic conventional commits with context about WHY, not just WHAT. Auto-detects commit type and scope fro... |
| `git-context-controller` | Git Context Controller (GCC) - Manages agent memory as a versioned file system under .GCC/. This skill should be used when working on multi-step proje... |
| `star-history-chart` | Add a self-hosted "Stargazers over time" chart to any GitHub repo's README. GitHub now restricts the stargazers endpoint to a repo's own admins/collab... |

### Category: `marketing` (1 skills)

| Skill Name | Description |
| :--- | :--- |
| `x-twitter-scraper` | X API & Twitter scraper skill for AI coding agents. Builds integrations with the Xquik REST API, MCP server & webhooks: tweet search, user lookup, fol... |

### Category: `media` (5 skills)

| Skill Name | Description |
| :--- | :--- |
| `image-enhancer` | Improves the quality of images, especially screenshots, by enhancing resolution, sharpness, and clarity. Perfect for preparing images for presentation... |
| `screenshot` | Use when the user explicitly asks for a desktop or system screenshot (full screen, specific app or window, or a pixel region), or when tool-specific c... |
| `speech` | Use when the user asks for text-to-speech narration or voiceover, accessibility reads, audio prompts, or batch speech generation. OpenAI remains the d... |
| `transcribe` | Transcribe audio files to text with optional diarization and known-speaker hints. Use when a user asks to transcribe speech from audio/video, extract ... |
| `video-downloader` | Downloads videos from YouTube and other platforms for offline viewing, editing, or archival. Handles various formats and quality options. |

### Category: `open-banking-io` (1 skills)

| Skill Name | Description |
| :--- | :--- |
| `open-banking-io` | Read bank account balances and transactions from EU/UK banks via the open-banking.io PSD2 API. Use when the user wants to check balances, list recent ... |

### Category: `operations` (6 skills)

| Skill Name | Description |
| :--- | :--- |
| `abc-xyz-segmentation` | Segment a SKU portfolio on value (ABC) and demand variability (XYZ), produce the 9-box with a planning policy per cell, and reallocate planner attenti... |
| `forecast-accuracy-review` | Evaluate demand-forecast quality honestly - WMAPE, bias and Forecast Value Added against a naive benchmark over a rolling-origin backtest. Use when th... |
| `otif-analysis` | Audit delivery performance from order-level data - compute the OTIF metric ladder (tolerant to strict), find where lateness concentrates, and quantify... |
| `root-cause-pareto` | Build a decision-grade Pareto for downtime, defects, complaints or delays - with unit-of-measure discipline, category hygiene, exposure normalization ... |
| `safety-stock-review` | Size or audit safety stock with assumption checks - the z*sigma*sqrt(LT) formula plus an empirical stress test of what it actually delivers (cycle ser... |
| `weekly-ops-report` | Turn raw operational data into a weekly management report that answers exactly three questions - what changed, where is it concentrated, what needs a ... |

### Category: `pocketbase` (6 skills)

| Skill Name | Description |
| :--- | :--- |
| `pb-api-rules` | API rules and filter expressions for PocketBase access control. Use when setting permissions, writing filter expressions, configuring who can access w... |
| `pb-collections` | Collection and schema design for PocketBase. Use when creating collections, designing schemas, adding fields, setting up relations, or choosing betwee... |
| `pb-deploy` | Production deployment for PocketBase. Use when deploying PocketBase to a server, setting up Docker, configuring systemd, reverse proxy (nginx/Caddy), ... |
| `pb-hooks` | Server-side JavaScript hooks for PocketBase (pb_hooks). Use when writing custom routes, event hooks, cron jobs, sending emails, making HTTP requests, ... |
| `pb-migrations` | Schema migrations and versioning for PocketBase. Use when creating migrations, managing schema versions, syncing collections between environments, usi... |
| `pb-sdk` | JavaScript SDK usage for PocketBase client applications. Use when calling PocketBase from frontend or Node.js, authenticating users, subscribing to re... |

### Category: `productivity` (48 skills)

| Skill Name | Description |
| :--- | :--- |
| `address-github-comments` | Use when you need to address review or issue comments on an open GitHub Pull Request using the gh CLI. |
| `avoid-ai-writing` | Audit and rewrite content to remove AI writing patterns ("AI-isms"). Use this skill when asked to "remove AI-isms," "clean up AI writing," "edit writi... |
| `brainstorming` | You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent... |
| `claude-code-sessions` | Search, analyze, and manage Claude Code session history. Use when the user wants to find past sessions, check token usage, review tool breakdowns, res... |
| `code-review-excellence` | Transform code reviews from gatekeeping to knowledge sharing through constructive feedback, systematic analysis, and collaborative improvement. |
| `code-simplifier` | Simplifies and refines code for clarity, consistency, and maintainability while preserving all functionality. Use when asked to "simplify code", "clea... |
| `commit-work` | Create high-quality git commits: review/stage intended changes, split into logical commits, and write clear commit messages (including Conventional Co... |
| `concise-planning` | Use when a user asks for a plan for a coding task, to generate a clear, actionable, and atomic checklist. |
| `crafting-effective-readmes` | Use when writing or improving README files. Not all READMEs are the same — provides templates and guidance matched to your audience and project type. |
| `deadline-prep` | Generate a structured demo outline from your session's change log and git history. Reads .claude/critical_log_changes.csv and git log to produce prese... |
| `debugger` | Debugging specialist for errors, test failures, and unexpected    behavior. Use proactively when encountering any issues.     |
| `debugging-strategies` | Transform debugging from frustrating guesswork into systematic problem-solving with proven strategies, powerful tools, and methodical approaches. |
| `devil` | >   Reviews a product document (PRD, spec, design brief) BEFORE implementation to surface   holes — undefined edge cases, missing states, policy gaps ... |
| `doc-chaser-lite` | Free lite skill — drafts one friendly (level-1) client document-request email for a single tax client from a short brief plus the practice profile. A ... |
| `doc-coauthoring` | Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, deci... |
| `executing-plans` | Use when you have a written implementation plan to execute in a separate session with review checkpoints |
| `file-organizer` | Intelligently organizes files and folders by understanding context, finding duplicates, and suggesting better organizational structures. Use when user... |
| `game-changing-features` | Find 10x product opportunities and high-leverage improvements. Use when user wants strategic product thinking, mentions '10x', wants to find high-impa... |
| `humanizer` | -   Remove signs of AI-generated writing from text. Use when editing or reviewing   text to make it sound more natural and human-written. Based on Wik... |
| `invoice-organizer` | Automatically organizes invoices and receipts for tax preparation by reading messy files, extracting key information, renaming them consistently, and ... |
| `kaizen` | Guide for continuous improvement, error proofing, and standardization. Use this skill when the user wants to improve code quality, refactor, or discus... |
| `linear` | Manage issues, projects & team workflows in Linear. Use when the user wants to read, create or updates tickets in Linear. |
| `mac-storage-cleaner` | Safely reclaim disk space on a Mac — the trustworthy, transparent, reversible alternative to CleanMyMac and similar tools. Use whenever the user says ... |
| `meeting-insights-analyzer` | Analyzes meeting transcripts and recordings to uncover behavioral patterns, communication insights, and actionable feedback. Identifies when you avoid... |
| `naming-analyzer` | Suggest better variable, function, and class names based on context and conventions. |
| `notebooklm` | Use this skill to query your Google NotebookLM notebooks directly from Claude Code for source-grounded, citation-backed answers from Gemini. Browser a... |
| `notion-knowledge-capture` | Capture conversations and decisions into structured Notion pages; use when turning chats/notes into wiki entries, how-tos, decisions, or FAQs with pro... |
| `notion-meeting-intelligence` | Prepare meeting materials with Notion context and Codex research; use when gathering context, drafting agendas/pre-reads, and tailoring materials to a... |
| `notion-research-documentation` | Research across Notion and synthesize into structured documentation; use when gathering info from multiple Notion sources to produce briefs, compariso... |
| `notion-spec-to-implementation` | Turn Notion specs into implementation plans, tasks, and progress tracking; use when implementing PRDs/feature specs and creating Notion plans + tasks ... |
| `notion-template-business` | Expert in building and selling Notion templates as a business - not just making templates, but building a sustainable digital product business. Covers... |
| `nowait` | Implements the NOWAIT technique for efficient reasoning in R1-style LLMs. Use when optimizing inference of reasoning models (QwQ, DeepSeek-R1, Phi4-Re... |
| `obsidian-clipper-template-creator` | Guide for creating templates for the Obsidian Web Clipper. Use when you want to create a new clipping template, understand available variables, or for... |
| `performance-optimizer` | Identifies and fixes performance bottlenecks in code, databases, and APIs. Measures before and after to prove improvements. |
| `personal-tool-builder` | Expert in building custom tools that solve your own problems first. The best products often start as personal tools - scratch your own itch, build for... |
| `plan-writing` | Structured task planning with clear breakdowns, dependencies, and verification criteria. Use when implementing features, refactoring, or any multi-ste... |
| `planning-with-files` | Implements Manus-style file-based planning for complex tasks. Creates task_plan.md, findings.md, and progress.md. Use when starting complex multi-step... |
| `raffle-winner-picker` | Picks random winners from lists, spreadsheets, or Google Sheets for giveaways, raffles, and contests. Ensures fair, unbiased selection with transparen... |
| `reducing-entropy` | Manual-only skill for minimizing total codebase size. Only activate when explicitly requested by user. Measures success by final code amount, not effo... |
| `requirements-clarity` | Clarify ambiguous requirements through focused dialogue before implementation. Use when requirements are unclear, features are complex (>2 days), or i... |
| `ship-learn-next` | Transform learning content (like YouTube transcripts, articles, tutorials) into actionable implementation plans using the Ship-Learn-Next framework. U... |
| `skill-creator` | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or opt... |
| `skill-developer` | Create and manage Claude Code skills following Anthropic best practices. Use when creating new skills, modifying skill-rules.json, understanding trigg... |
| `skill-judge` | Evaluate Agent Skill design quality against official specifications and best practices. Use when reviewing, auditing, or improving SKILL.md files and ... |
| `think-tank` | Run a Virtual Think Tank — a structured multi-persona debate — before planning or making architectural/design/strategic decisions. Use this skill when... |
| `writing-plans` | Use when you have a spec or requirements for a multi-step task, before touching code |
| `writing-rules` | This skill should be used when the user asks to "create a hookify rule", "write a hook rule", "configure hookify", "add a hookify rule", or needs guid... |
| `writing-skills` | Use when creating new skills, editing existing skills, or verifying skills work before deployment |

### Category: `railway` (11 skills)

| Skill Name | Description |
| :--- | :--- |
| `deploy` | Deploy code to Railway using "railway up". Use when user wants to push code, says "railway up", "deploy", "ship", or "push". For initial setup or crea... |
| `deployment` | Manage Railway deployments - view logs, redeploy, restart, or remove deployments. Use for deployment lifecycle (remove, stop, redeploy, restart), depl... |
| `domain` | Add, view, or remove domains for Railway services. Use when user wants to add a domain, generate a railway domain, check current domains, get the URL ... |
| `environment` | Query, stage, and apply configuration changes for Railway environments. Use for ANY variable or env var operations, service configuration (source, bui... |
| `metrics` | Query resource usage metrics for Railway services. Use when user asks about resource usage, CPU, memory, network, disk, or service performance like "h... |
| `new` | Create Railway projects, services, and databases with proper configuration. Use when user says "setup", "deploy to railway", "initialize", "create pro... |
| `projects` | List, switch, and configure Railway projects. Use when user wants to list all projects, switch projects, rename a project, enable/disable PR deploys, ... |
| `railway-docs` | Fetch up-to-date Railway documentation to answer questions accurately. Use when user asks about Railway features, how Railway works, or shares a docs.... |
| `service` | Check service status, rename services, change service icons, link services, or create services with Docker images. For creating services with local co... |
| `status` | Check current Railway project status for this directory. Use when user asks "railway status", "is it running", "what's deployed", "deployment status",... |
| `templates` | Search and deploy services from Railway's template marketplace. Use when user wants to add a service from a template, find templates for a specific us... |

### Category: `scientific` (135 skills)

| Skill Name | Description |
| :--- | :--- |
| `adaptyv` | Cloud laboratory platform for automated protein testing and validation. Use when designing proteins and needing experimental validation including bind... |
| `aeon` | This skill should be used for time series machine learning tasks including classification, regression, clustering, forecasting, anomaly detection, seg... |
| `alphafold-database` | Access AlphaFold's 200M+ AI-predicted protein structures. Retrieve structures by UniProt ID, download PDB/mmCIF files, analyze confidence metrics (pLD... |
| `anndata` | This skill should be used when working with annotated data matrices in Python, particularly for single-cell genomics analysis, managing experimental m... |
| `arboreto` | Infer gene regulatory networks (GRNs) from gene expression data using scalable algorithms (GRNBoost2, GENIE3). Use when analyzing transcriptomics data... |
| `astropy` | Comprehensive Python library for astronomy and astrophysics. This skill should be used when working with astronomical data including celestial coordin... |
| `benchling-integration` | Benchling R&D platform integration. Access registry (DNA, proteins), inventory, ELN entries, workflows via API, build Benchling Apps, query Data Wareh... |
| `biomni` | Autonomous biomedical AI agent framework for executing complex research tasks across genomics, drug discovery, molecular biology, and clinical analysi... |
| `biopython` | Primary Python toolkit for molecular biology. Preferred for Python-based PubMed/NCBI queries (Bio.Entrez), sequence manipulation, file parsing (FASTA,... |
| `biorxiv-database` | Efficient database search tool for bioRxiv preprint server. Use this skill when searching for life sciences preprints by keywords, authors, date range... |
| `bioservices` | Primary Python tool for 40+ bioinformatics services. Preferred for multi-database workflows: UniProt, KEGG, ChEMBL, PubChem, Reactome, QuickGO. Unifie... |
| `brenda-database` | Access BRENDA enzyme database via SOAP API. Retrieve kinetic parameters (Km, kcat), reaction equations, organism data, and substrate-specific enzyme i... |
| `cellxgene-census` | Query CZ CELLxGENE Census (61M+ cells). Filter by cell type/tissue/disease, retrieve expression data, integrate with scanpy/PyTorch, for population-sc... |
| `chembl-database` | Query ChEMBL's bioactive molecules and drug discovery data. Search compounds by structure/properties, retrieve bioactivity data (IC50, Ki), find inhib... |
| `cirq` | Quantum computing framework for building, simulating, optimizing, and executing quantum circuits. Use this skill when working with quantum algorithms,... |
| `citation-management` | Comprehensive citation management for academic research. Search Google Scholar and PubMed for papers, extract accurate metadata, validate citations, a... |
| `clinical-decision-support` | Generate professional clinical decision support (CDS) documents for pharmaceutical and clinical research settings, including patient cohort analyses (... |
| `clinical-reports` | Write comprehensive clinical reports including case reports (CARE guidelines), diagnostic reports (radiology/pathology/lab), clinical trial reports (I... |
| `clinicaltrials-database` | Query ClinicalTrials.gov via API v2. Search trials by condition, drug, location, status, or phase. Retrieve trial details by NCT ID, export data, for ... |
| `clinpgx-database` | Access ClinPGx pharmacogenomics data (successor to PharmGKB). Query gene-drug interactions, CPIC guidelines, allele functions, for precision medicine ... |
| `clinvar-database` | Query NCBI ClinVar for variant clinical significance. Search by gene/position, interpret pathogenicity classifications, access via E-utilities API or ... |
| `cobrapy` | Constraint-based metabolic modeling (COBRA). FBA, FVA, gene knockouts, flux sampling, SBML models, for systems biology and metabolic engineering analy... |
| `cosmic-database` | Access COSMIC cancer mutation database. Query somatic mutations, Cancer Gene Census, mutational signatures, gene fusions, for cancer research and prec... |
| `dask` | Parallel/distributed computing. Scale pandas/NumPy beyond memory, parallel DataFrames/Arrays, multi-file processing, task graphs, for larger-than-RAM ... |
| `datacommons-client` | Work with Data Commons, a platform providing programmatic access to public statistical data from global sources. Use this skill when working with demo... |
| `datamol` | Pythonic wrapper around RDKit with simplified interface and sensible defaults. Preferred for standard drug discovery: SMILES parsing, standardization,... |
| `deepchem` | Molecular machine learning toolkit. Property prediction (ADMET, toxicity), GNNs (GCN, MPNN), MoleculeNet benchmarks, pretrained models, featurization,... |
| `deeptools` | NGS analysis toolkit. BAM to bigWig conversion, QC (correlation, PCA, fingerprints), heatmaps/profiles (TSS, peaks), for ChIP-seq, RNA-seq, ATAC-seq v... |
| `denario` | Multiagent AI system for scientific research assistance that automates research workflows from data analysis to publication. This skill should be used... |
| `diffdock` | Diffusion-based molecular docking. Predict protein-ligand binding poses from PDB/SMILES, confidence scores, virtual screening, for structure-based dru... |
| `dnanexus-integration` | DNAnexus cloud genomics platform. Build apps/applets, manage data (upload/download), dxpy Python SDK, run workflows, FASTQ/BAM/VCF, for genomics pipel... |
| `drugbank-database` | Access and analyze comprehensive drug information from the DrugBank database including drug properties, interactions, targets, pathways, chemical stru... |
| `ena-database` | Access European Nucleotide Archive via API/FTP. Retrieve DNA/RNA sequences, raw reads (FASTQ), genome assemblies by accession, for genomics and bioinf... |
| `ensembl-database` | Query Ensembl genome database REST API for 250+ species. Gene lookups, sequence retrieval, variant analysis, comparative genomics, orthologs, VEP pred... |
| `esm` | Comprehensive toolkit for protein language models including ESM3 (generative multimodal protein design across sequence, structure, and function) and E... |
| `etetoolkit` | Phylogenetic tree toolkit (ETE). Tree manipulation (Newick/NHX), evolutionary event detection, orthology/paralogy, NCBI taxonomy, visualization (PDF/S... |
| `exploratory-data-analysis` | Perform comprehensive exploratory data analysis on scientific data files across 200+ file formats. This skill should be used when analyzing any scient... |
| `fda-database` | Query openFDA API for drugs, devices, adverse events, recalls, regulatory submissions (510k, PMA), substance identification (UNII), for FDA regulatory... |
| `flowio` | Parse FCS (Flow Cytometry Standard) files v2.0-3.1. Extract events as NumPy arrays, read metadata/channels, convert to CSV/DataFrame, for flow cytomet... |
| `fluidsim` | Framework for computational fluid dynamics simulations using Python. Use when running fluid dynamics simulations including Navier-Stokes equations (2D... |
| `gene-database` | Query NCBI Gene via E-utilities/Datasets API. Search by symbol/ID, retrieve gene info (RefSeqs, GO, locations, phenotypes), batch lookups, for gene an... |
| `generate-image` | Generate or edit images using AI models (FLUX, Gemini). Use for general-purpose image generation including photos, illustrations, artwork, visual asse... |
| `geniml` | This skill should be used when working with genomic interval data (BED files) for machine learning tasks. Use for training region embeddings (Region2V... |
| `geo-database` | Access NCBI GEO for gene expression/genomics data. Search/download microarray and RNA-seq datasets (GSE, GSM, GPL), retrieve SOFT/Matrix files, for tr... |
| `geopandas` | Python library for working with geospatial vector data including shapefiles, GeoJSON, and GeoPackage files. Use when working with geographic data for ... |
| `get-available-resources` | This skill should be used at the start of any computationally intensive scientific task to detect and report available system resources (CPU cores, GP... |
| `gget` | CLI/Python toolkit for rapid bioinformatics queries. Preferred for quick BLAST searches. Access to 20+ databases: gene info (Ensembl/UniProt), AlphaFo... |
| `gtars` | High-performance toolkit for genomic interval analysis in Rust with Python bindings. Use when working with genomic regions, BED files, coverage tracks... |
| `gwas-database` | Query NHGRI-EBI GWAS Catalog for SNP-trait associations. Search variants by rs ID, disease/trait, gene, retrieve p-values and summary statistics, for ... |
| `histolab` | Digital pathology image processing toolkit for whole slide images (WSI). Use this skill when working with histopathology slides, processing H&E or IHC... |
| `hmdb-database` | Access Human Metabolome Database (220K+ metabolites). Search by name/ID/structure, retrieve chemical properties, biomarker data, NMR/MS spectra, pathw... |
| `hypogenic` | Automated hypothesis generation and testing using large language models. Use this skill when generating scientific hypotheses from datasets, combining... |
| `hypothesis-generation` | Generate testable hypotheses. Formulate from observations, design experiments, explore competing explanations, develop predictions, propose mechanisms... |
| `kegg-database` | Direct REST API access to KEGG (academic use only). Pathway analysis, gene-pathway mapping, metabolic pathways, drug interactions, ID conversion. For ... |
| `labarchive-integration` | Electronic lab notebook API integration. Access notebooks, manage entries/attachments, backup notebooks, integrate with Protocols.io/Jupyter/REDCap, f... |
| `lamindb` | This skill should be used when working with LaminDB, an open-source data framework for biology that makes data queryable, traceable, reproducible, and... |
| `latchbio-integration` | Latch platform for bioinformatics workflows. Build pipelines with Latch SDK, @workflow/@task decorators, deploy serverless workflows, LatchFile/LatchD... |
| `latex-posters` | Create professional research posters in LaTeX using beamerposter, tikzposter, or baposter. Support for conference presentations, academic posters, and... |
| `literature-review` | Conduct comprehensive, systematic literature reviews using multiple academic databases (PubMed, arXiv, bioRxiv, Semantic Scholar, etc.). This skill sh... |
| `market-research-reports` | Generate comprehensive market research reports (50+ pages) in the style of top consulting firms (McKinsey, BCG, Gartner). Features professional LaTeX ... |
| `markitdown` | Convert files and office documents to Markdown. Supports PDF, DOCX, PPTX, XLSX, images (with OCR), audio (with transcription), HTML, CSV, JSON, XML, Z... |
| `matchms` | Mass spectrometry analysis. Process mzML/MGF/MSP, spectral similarity (cosine, modified cosine), metadata harmonization, compound ID, for metabolomics... |
| `matplotlib` | Foundational plotting library. Create line plots, scatter, bar, histograms, heatmaps, 3D, subplots, export PNG/PDF/SVG, for scientific visualization a... |
| `medchem` | Medicinal chemistry filters. Apply drug-likeness rules (Lipinski, Veber), PAINS filters, structural alerts, complexity metrics, for compound prioritiz... |
| `metabolomics-workbench-database` | Access NIH Metabolomics Workbench via REST API (4,200+ studies). Query metabolites, RefMet nomenclature, MS/NMR data, m/z searches, study metadata, fo... |
| `modal` | Run Python code in the cloud with serverless containers, GPUs, and autoscaling. Use when deploying ML models, running batch processing jobs, schedulin... |
| `molfeat` | Molecular featurization for ML (100+ featurizers). ECFP, MACCS, descriptors, pretrained models (ChemBERTa), convert SMILES to features, for QSAR and m... |
| `networkx` | Comprehensive toolkit for creating, analyzing, and visualizing complex networks and graphs in Python. Use when working with network/graph data structu... |
| `neurokit2` | Comprehensive biosignal processing toolkit for analyzing physiological data including ECG, EEG, EDA, RSP, PPG, EMG, and EOG signals. Use this skill wh... |
| `neuropixels-analysis` | Neuropixels neural recording analysis. Load SpikeGLX/OpenEphys data, preprocess, motion correction, Kilosort4 spike sorting, quality metrics, Allen/IB... |
| `omero-integration` | Microscopy data management platform. Access images via Python, retrieve datasets, analyze pixels, manage ROIs/annotations, batch processing, for high-... |
| `openalex-database` | Query and analyze scholarly literature using the OpenAlex database. This skill should be used when searching for academic papers, analyzing research t... |
| `opentargets-database` | Query Open Targets Platform for target-disease associations, drug target discovery, tractability/safety data, genetics/omics evidence, known drugs, fo... |
| `opentrons-integration` | Lab automation platform for Flex/OT-2 robots. Write Protocol API v2 protocols, liquid handling, hardware modules (heater-shaker, thermocycler), labwar... |
| `paper-2-web` | This skill should be used when converting academic papers into promotional and presentation formats including interactive websites (Paper2Web), presen... |
| `pathml` | Computational pathology toolkit for analyzing whole-slide images (WSI) and multiparametric imaging data. Use this skill when working with histopatholo... |
| `pdb-database` | Access RCSB PDB for 3D protein/nucleic acid structures. Search by text/sequence/structure, download coordinates (PDB/mmCIF), retrieve metadata, for st... |
| `peer-review` | Systematic peer review toolkit. Evaluate methodology, statistics, design, reproducibility, ethics, figure integrity, reporting standards, for manuscri... |
| `pennylane` | Cross-platform Python library for quantum computing, quantum machine learning, and quantum chemistry. Enables building and training quantum circuits w... |
| `perplexity-search` | Perform AI-powered web searches with real-time information using Perplexity models via LiteLLM and OpenRouter. This skill should be used when conducti... |
| `plotly` | Interactive scientific and statistical data visualization library for Python. Use when creating charts, plots, or visualizations including scatter plo... |
| `polars` | Fast DataFrame library (Apache Arrow). Select, filter, group_by, joins, lazy evaluation, CSV/Parquet I/O, expression API, for high-performance data an... |
| `pptx-posters` | Create professional research posters in LaTeX using beamerposter, tikzposter, or baposter. Support for conference presentations, academic posters, and... |
| `protocolsio-integration` | Integration with protocols.io API for managing scientific protocols. This skill should be used when working with protocols.io to search, create, updat... |
| `pubchem-database` | Query PubChem via PUG-REST API/PubChemPy (110M+ compounds). Search by name/CID/SMILES, retrieve properties, similarity/substructure searches, bioactiv... |
| `pubmed-database` | Direct REST API access to PubMed. Advanced Boolean/MeSH queries, E-utilities API, batch processing, citation management. For Python workflows, prefer ... |
| `pufferlib` | This skill should be used when working with reinforcement learning tasks including high-performance RL training, custom environment development, vecto... |
| `pydeseq2` | Differential gene expression analysis (Python DESeq2). Identify DE genes from bulk RNA-seq counts, Wald tests, FDR correction, volcano/MA plots, for R... |
| `pydicom` | Python library for working with DICOM (Digital Imaging and Communications in Medicine) files. Use this skill when reading, writing, or modifying medic... |
| `pyhealth` | Comprehensive healthcare AI toolkit for developing, testing, and deploying machine learning models with clinical data. This skill should be used when ... |
| `pylabrobot` | Laboratory automation toolkit for controlling liquid handlers, plate readers, pumps, heater shakers, incubators, centrifuges, and analytical equipment... |
| `pymatgen` | Materials science toolkit. Crystal structures (CIF, POSCAR), phase diagrams, band structure, DOS, Materials Project integration, format conversion, fo... |
| `pymc` | Bayesian modeling with PyMC. Build hierarchical models, MCMC (NUTS), variational inference, LOO/WAIC comparison, posterior checks, for probabilistic p... |
| `pymoo` | Multi-objective optimization framework. NSGA-II, NSGA-III, MOEA/D, Pareto fronts, constraint handling, benchmarks (ZDT, DTLZ), for engineering design ... |
| `pyopenms` | Python interface to OpenMS for mass spectrometry data analysis. Use for LC-MS/MS proteomics and metabolomics workflows including file handling (mzML, ... |
| `pysam` | Genomic file toolkit. Read/write SAM/BAM/CRAM alignments, VCF/BCF variants, FASTA/FASTQ sequences, extract regions, calculate coverage, for NGS data p... |
| `pytdc` | Therapeutics Data Commons. AI-ready drug discovery datasets (ADME, toxicity, DTI), benchmarks, scaffold splits, molecular oracles, for therapeutic ML ... |
| `pytorch-lightning` | Deep learning framework (PyTorch Lightning). Organize PyTorch code into LightningModules, configure Trainers for multi-GPU/TPU, implement data pipelin... |
| `qiskit` | Comprehensive quantum computing toolkit for building, optimizing, and executing quantum circuits. Use when working with quantum algorithms, simulation... |
| `qutip` | Quantum mechanics simulations and analysis using QuTiP (Quantum Toolbox in Python). Use when working with quantum systems including: (1) quantum state... |
| `rdkit` | Cheminformatics toolkit for fine-grained molecular control. SMILES/SDF parsing, descriptors (MW, LogP, TPSA), fingerprints, substructure search, 2D/3D... |
| `reactome-database` | Query Reactome REST API for pathway analysis, enrichment, gene-pathway mapping, disease pathways, molecular interactions, expression analysis, for sys... |
| `research-grants` | Write competitive research proposals for NSF, NIH, DOE, and DARPA. Agency-specific formatting, review criteria, budget preparation, broader impacts, s... |
| `research-lookup` | Look up current research information using Perplexity's Sonar Pro Search or Sonar Reasoning Pro models through OpenRouter. Automatically selects the b... |
| `scanpy` | Single-cell RNA-seq analysis. Load .h5ad/10X data, QC, normalization, PCA/UMAP/t-SNE, Leiden clustering, marker genes, cell type annotation, trajector... |
| `scholar-evaluation` | Apply the ScholarEval framework to systematically evaluate scholarly and research work. This skill provides structured evaluation methodology based on... |
| `scientific-brainstorming` | Research ideation partner. Generate hypotheses, explore interdisciplinary connections, challenge assumptions, develop methodologies, identify research... |
| `scientific-critical-thinking` | Evaluate research rigor. Assess methodology, experimental design, statistical validity, biases, confounding, evidence quality (GRADE, Cochrane ROB), f... |
| `scientific-schematics` | Create publication-quality scientific diagrams using Nano Banana Pro AI with smart iterative refinement. Uses Gemini 3 Pro for quality review. Only re... |
| `scientific-slides` | Build slide decks and presentations for research talks. Use this for making PowerPoint slides, conference presentations, seminar talks, research prese... |
| `scientific-visualization` | Create publication figures with matplotlib/seaborn/plotly. Multi-panel layouts, error bars, significance markers, colorblind-safe, export PDF/EPS/TIFF... |
| `scientific-writing` | Core skill for the deep research and writing tool. Write scientific manuscripts in full paragraphs (never bullet points). Use two-stage process: (1) c... |
| `scikit-bio` | Biological data toolkit. Sequence analysis, alignments, phylogenetic trees, diversity metrics (alpha/beta, UniFrac), ordination (PCoA), PERMANOVA, FAS... |
| `scikit-learn` | Machine learning in Python with scikit-learn. Use when working with supervised learning (classification, regression), unsupervised learning (clusterin... |
| `scikit-survival` | Comprehensive toolkit for survival analysis and time-to-event modeling in Python using scikit-survival. Use this skill when working with censored surv... |
| `scvi-tools` | This skill should be used when working with single-cell omics data analysis using scvi-tools, including scRNA-seq, scATAC-seq, CITE-seq, spatial trans... |
| `seaborn` | Statistical visualization. Scatter, box, violin, heatmaps, pair plots, regression, correlation matrices, KDE, faceted plots, for exploratory analysis ... |
| `shap` | Model interpretability and explainability using SHAP (SHapley Additive exPlanations). Use this skill when explaining machine learning model prediction... |
| `simpy` | Process-based discrete-event simulation framework in Python. Use this skill when building simulations of systems with processes, queues, resources, an... |
| `stable-baselines3` | Use this skill for reinforcement learning tasks including training RL agents (PPO, SAC, DQN, TD3, DDPG, A2C, etc.), creating custom Gym environments, ... |
| `statistical-analysis` | Statistical analysis toolkit. Hypothesis tests (t-test, ANOVA, chi-square), regression, correlation, Bayesian stats, power analysis, assumption checks... |
| `statsmodels` | Statistical modeling toolkit. OLS, GLM, logistic, ARIMA, time series, hypothesis tests, diagnostics, AIC/BIC, for rigorous statistical inference and e... |
| `string-database` | Query STRING API for protein-protein interactions (59M proteins, 20B interactions). Network analysis, GO/KEGG enrichment, interaction discovery, 5000+... |
| `sympy` | Use this skill when working with symbolic mathematics in Python. This skill should be used for symbolic computation tasks including solving equations ... |
| `torchdrug` | Graph-based drug discovery toolkit. Molecular property prediction (ADMET), protein modeling, knowledge graph reasoning, molecular generation, retrosyn... |
| `torch_geometric` | Graph Neural Networks (PyG). Node/graph classification, link prediction, GCN, GAT, GraphSAGE, heterogeneous graphs, molecular property prediction, for... |
| `transformers` | This skill should be used when working with pre-trained transformer models for natural language processing, computer vision, audio, or multimodal task... |
| `treatment-plans` | Generate concise (3-4 page), focused medical treatment plans in LaTeX/PDF format for all clinical specialties. Supports general medical treatment, reh... |
| `umap-learn` | UMAP dimensionality reduction. Fast nonlinear manifold learning for 2D/3D visualization, clustering preprocessing (HDBSCAN), supervised/parametric UMA... |
| `uniprot-database` | Direct REST API access to UniProt. Protein searches, FASTA retrieval, ID mapping, Swiss-Prot/TrEMBL. For Python workflows with multiple databases, pre... |
| `uspto-database` | Access USPTO APIs for patent/trademark searches, examination history (PEDS), assignments, citations, office actions, TSDR, for IP analysis and prior a... |
| `vaex` | Use this skill for processing and analyzing large tabular datasets (billions of rows) that exceed available RAM. Vaex excels at out-of-core DataFrame ... |
| `venue-templates` | Access comprehensive LaTeX templates, formatting requirements, and submission guidelines for major scientific publication venues (Nature, Science, PLO... |
| `zarr-python` | Chunked N-D arrays for cloud storage. Compressed arrays, parallel I/O, S3/GCS integration, NumPy/Dask/Xarray compatible, for large-scale scientific co... |
| `zinc-database` | Access ZINC (230M+ purchasable compounds). Search by ZINC ID/SMILES, similarity searches, 3D-ready structures for docking, analog discovery, for virtu... |

### Category: `security` (47 skills)

| Skill Name | Description |
| :--- | :--- |
| `active-directory-attacks` | This skill should be used when the user asks to "attack Active Directory", "exploit AD", "Kerberoasting", "DCSync", "pass-the-hash", "BloodHound enume... |
| `api-fuzzing-bug-bounty` | This skill should be used when the user asks to "test API security", "fuzz APIs", "find IDOR vulnerabilities", "test REST API", "test GraphQL", "API p... |
| `api-security-best-practices` | Implement secure API design patterns including authentication, authorization, input validation, rate limiting, and protection against common API vulne... |
| `api-security-testing` | API security testing workflow for REST and GraphQL APIs covering authentication, authorization, rate limiting, input validation, and security best pra... |
| `aws-penetration-testing` | This skill should be used when the user asks to "pentest AWS", "test AWS security", "enumerate IAM", "exploit cloud infrastructure", "AWS privilege es... |
| `broken-authentication` | This skill should be used when the user asks to "test for broken authentication vulnerabilities", "assess session management security", "perform crede... |
| `burp-suite-testing` | This skill should be used when the user asks to "intercept HTTP traffic", "modify web requests", "use Burp Suite for testing", "perform web vulnerabil... |
| `cloud-penetration-testing` | This skill should be used when the user asks to "perform cloud penetration testing", "assess Azure or AWS or GCP security", "enumerate cloud resources... |
| `cra-vulnerability-obligations` | >   Use when a user asks what the EU Cyber Resilience Act (CRA) means for their   product, whether and when they must report a vulnerability or incide... |
| `ethical-hacking-methodology` | This skill should be used when the user asks to "learn ethical hacking", "understand penetration testing lifecycle", "perform reconnaissance", "conduc... |
| `file-path-traversal` | This skill should be used when the user asks to "test for directory traversal", "exploit path traversal vulnerabilities", "read arbitrary files throug... |
| `file-uploads` | Expert at handling file uploads and cloud storage. Covers S3, Cloudflare R2, presigned URLs, multipart uploads, and image optimization. Knows how to h... |
| `google-cloud-auth` | Provides expert guidance on authenticating and authorizing to Google Cloud services and APIs, covering human users, service identities, Application De... |
| `google-cloud-waf-security` | Generates security-focused guidance for Google Cloud workloads based on the Google Cloud Well-Architected Framework (WAF). Use to evaluate a workload,... |
| `html-injection-testing` | This skill should be used when the user asks to "test for HTML injection", "inject HTML into web pages", "perform HTML injection attacks", "deface web... |
| `idor-testing` | This skill should be used when the user asks to "test for insecure direct object references," "find IDOR vulnerabilities," "exploit broken access cont... |
| `incident-reporting-navigator` | >   Use when a security incident, data breach, or actively exploited   vulnerability raises the question "who must we notify, where, and by   when?" S... |
| `linux-privilege-escalation` | This skill should be used when the user asks to "escalate privileges on Linux", "find privesc vectors on Linux systems", "exploit sudo misconfiguratio... |
| `metasploit-framework` | This skill should be used when the user asks to "use Metasploit for penetration testing", "exploit vulnerabilities with msfconsole", "create payloads ... |
| `pentest-checklist` | This skill should be used when the user asks to "plan a penetration test", "create a security assessment checklist", "prepare for penetration testing"... |
| `pentest-commands` | This skill should be used when the user asks to "run pentest commands", "scan with nmap", "use metasploit exploits", "crack passwords with hydra or jo... |
| `privilege-escalation-methods` | This skill should be used when the user asks to "escalate privileges", "get root access", "become administrator", "privesc techniques", "abuse sudo", ... |
| `red-team-tactics` | Red team tactics principles based on MITRE ATT&CK. Attack phases, detection evasion, reporting. |
| `red-team-tools` | This skill should be used when the user asks to "follow red team methodology", "perform bug bounty hunting", "automate reconnaissance", "hunt for XSS ... |
| `regulatory-threat-model` | >   Use when an application or system — including one built quickly with AI   coding agents — needs a security review with regulatory grounding: a   S... |
| `sast-configuration` | Static Application Security Testing (SAST) tool setup, configuration, and custom rule creation for comprehensive security scanning across multiple pro... |
| `scanning-tools` | This skill should be used when the user asks to "perform vulnerability scanning", "scan networks for open ports", "assess web application security", "... |
| `secrets-management` | Secure secrets management practices for CI/CD pipelines using Vault, AWS Secrets Manager, and other tools. |
| `security-audit` | Comprehensive security auditing workflow covering web application testing, API security, penetration testing, vulnerability scanning, and security har... |
| `security-best-practices` | Perform language and framework specific security best-practice reviews and suggest improvements. Trigger only when the user explicitly requests securi... |
| `security-ownership-map` | Analyze git repositories to build a security ownership topology (people-to-file), compute bus factor and sensitive-code ownership, and export CSV/JSON... |
| `security-threat-model` | Repository-grounded threat modeling that enumerates trust boundaries, assets, attacker capabilities, abuse paths, and mitigations, and writes a concis... |
| `shodan-reconnaissance` | This skill should be used when the user asks to "search for exposed devices on the internet," "perform Shodan reconnaissance," "find vulnerable servic... |
| `smtp-penetration-testing` | This skill should be used when the user asks to "perform SMTP penetration testing", "enumerate email users", "test for open mail relays", "grab SMTP b... |
| `sql-injection-testing` | This skill should be used when the user asks to "test for SQL injection vulnerabilities", "perform SQLi attacks", "bypass authentication using SQL inj... |
| `sqlmap-database-pentesting` | This skill should be used when the user asks to "automate SQL injection testing," "enumerate database structure," "extract database credentials using ... |
| `ssh-penetration-testing` | This skill should be used when the user asks to "pentest SSH services", "enumerate SSH configurations", "brute force SSH credentials", "exploit SSH vu... |
| `supply-chain-guard` | Detect and remediate software supply chain attacks in npm, PyPI, crates.io, GitHub Actions, and CI/CD pipelines by scanning for known compromised pack... |
| `threat-modeling-expert` | Expert in threat modeling methodologies, security architecture review, and risk assessment. Masters STRIDE, PASTA, attack trees, and security requirem... |
| `top-web-vulnerabilities` | This skill should be used when the user asks to "identify web application vulnerabilities", "explain common security flaws", "understand vulnerability... |
| `vulnerability-scanner` | Advanced vulnerability analysis principles. OWASP 2025, Supply Chain Security, attack surface mapping, risk prioritization. |
| `web-security-testing` | Web application security testing workflow for OWASP Top 10 vulnerabilities including injection, XSS, authentication flaws, and access control issues. |
| `webapp-testing` | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, ca... |
| `windows-privilege-escalation` | This skill should be used when the user asks to "escalate privileges on Windows," "find Windows privesc vectors," "enumerate Windows for privilege esc... |
| `wireshark-analysis` | This skill should be used when the user asks to "analyze network traffic with Wireshark", "capture packets for troubleshooting", "filter PCAP files", ... |
| `wordpress-penetration-testing` | This skill should be used when the user asks to "pentest WordPress sites", "scan WordPress for vulnerabilities", "enumerate WordPress users, themes, o... |
| `xss-html-injection` | This skill should be used when the user asks to "test for XSS vulnerabilities", "perform cross-site scripting attacks", "identify HTML injection flaws... |

### Category: `sentry` (6 skills)

| Skill Name | Description |
| :--- | :--- |
| `code-review` | Perform code reviews following Sentry engineering practices. Use when reviewing pull requests, examining code changes, or providing feedback on code q... |
| `commit` | Create commit messages following Sentry conventions. Use when committing code changes, writing commit messages, or formatting git history. Follows con... |
| `create-pr` | Create pull requests following Sentry conventions. Use when opening PRs, writing PR descriptions, or preparing changes for review. Follows Sentry's co... |
| `deslop` | Remove AI-generated code slop from a branch. Use when cleaning up AI-generated code, removing unnecessary comments, defensive checks, or type casts. C... |
| `find-bugs` | Find bugs, security vulnerabilities, and code quality issues in local branch changes. Use when asked to review changes, find bugs, security review, or... |
| `iterate-pr` | Iterate on a PR until CI passes. Use when you need to fix CI failures, address review feedback, or continuously push fixes until all checks are green.... |

### Category: `sports` (1 skills)

| Skill Name | Description |
| :--- | :--- |
| `footballbin-predictions` | Get AI-powered match predictions for Premier League and Champions League including scores, next goal, and corners. |

### Category: `utilities` (12 skills)

| Skill Name | Description |
| :--- | :--- |
| `browser-automation` | Browser automation powers web testing, scraping, and AI agent interactions. The difference between a flaky script and a reliable system comes down to ... |
| `browser-extension-builder` | Expert in building browser extensions that solve real problems - Chrome, Firefox, and cross-browser extensions. Covers extension architecture, manifes... |
| `busybox-on-windows` | How to use a Win32 build of BusyBox to run many of the standard UNIX command line tools on Windows. |
| `cf-crawl` | Crawl entire websites using Cloudflare Browser Rendering /crawl API. Initiates async crawl jobs, polls for completion, and saves results as markdown f... |
| `domain-name-brainstormer` | Generates creative domain name ideas for your project and checks availability across multiple TLDs (.com, .io, .dev, .ai, etc.). Saves hours of brains... |
| `geo-fundamentals` | Generative Engine Optimization for AI search engines (ChatGPT, Claude, Perplexity). |
| `network-101` | This skill should be used when the user asks to "set up a web server", "configure HTTP or HTTPS", "perform SNMP enumeration", "configure SMB shares", ... |
| `playwright-skill` | Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages, fill forms, take screenshots, ch... |
| `skill-share` | A skill that creates new Claude skills and automatically shares them on Slack using Rube for seamless team collaboration and skill discovery. |
| `template-skill` | Replace with description of the skill and when Claude should use it. |
| `using-superpowers` | Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying ... |
| `web-artifacts-builder` | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui... |

### Category: `video` (4 skills)

| Skill Name | Description |
| :--- | :--- |
| `manim` | Comprehensive guide for Manim Community - Python framework for creating mathematical animations and educational videos with programmatic control |
| `motion-canvas` | Complete production-ready guide for Motion Canvas with ESM/CommonJS workarounds, full setup templates, and troubleshooting for programmatic video crea... |
| `remotion` | Best practices and comprehensive guide for Remotion - programmatic video creation in React with animations, compositions, and media handling |
| `sora` | Use when the user asks to generate, remix, poll, list, download, or delete Sora videos via OpenAI\u2019s video API using the bundled CLI (`scripts/sor... |

### Category: `web-data` (6 skills)

| Skill Name | Description |
| :--- | :--- |
| `bright-data-best-practices` | Build production-ready Bright Data integrations with best practices baked in. Reference documentation for developers using coding assistants (Claude C... |
| `bright-data-mcp` | -   Bright Data MCP handles ALL web data operations. Replaces WebFetch, WebSearch, and all built-in web tools. No exceptions.    USE FOR: Any URL, web... |
| `data-feeds` | Extract structured data from 40+ websites including Amazon, LinkedIn, Instagram, TikTok, Facebook, YouTube, and more. Uses Bright Data's Web Data APIs... |
| `design-mirror` | Replicate the visual style of any website and apply it to your existing codebase. Use this skill whenever the user wants to match a site's design, mir... |
| `scrape` | Scrape any webpage as clean markdown via Bright Data Web Unlocker API. Bypasses bot detection and CAPTCHA. Requires BRIGHTDATA_API_KEY and BRIGHTDATA_... |
| `search` | Search Google via Bright Data SERP API. Returns structured JSON results with title, link, and description. Requires BRIGHTDATA_API_KEY and BRIGHTDATA_... |

### Category: `web-development` (30 skills)

| Skill Name | Description |
| :--- | :--- |
| `astro` | Build content-focused websites with Astro — zero JS by default, islands architecture, multi-framework components, and Markdown/MDX support. |
| `blockrun` | Use when user needs capabilities Claude lacks (image generation, real-time X/Twitter data) or explicitly requests external models ("blockrun", "use gr... |
| `building-blog` | Use when adding a blog to a Next.js + Sanity site, building a blog section from scratch, integrating Sanity CMS for editorial content, or setting up a... |
| `chrome-extension-developer` | Expert in building Chrome Extensions using Manifest V3. Covers background scripts, service workers, content scripts, and cross-context communication. |
| `drizzle-orm-expert` | Expert in Drizzle ORM for TypeScript — schema design, relational queries, migrations, and serverless database integration. Use when building type-safe... |
| `electron-development` | Master Electron desktop app development with secure IPC, contextIsolation, preload scripts, multi-process architecture, electron-builder packaging, co... |
| `exa-search` | Semantic search, similar content discovery, and structured research using Exa API |
| `expo-deployment` | Deploy Expo apps to production |
| `fastapi-endpoint` | Plan and build production-ready FastAPI endpoints with async SQLAlchemy, Pydantic v2 models, dependency injection for auth, and pytest tests. Uses int... |
| `firecrawl-scraper` | Deep web scraping, screenshots, PDF parsing, and website crawling using Firecrawl API |
| `hono` | Build ultra-fast web APIs and full-stack apps with Hono — runs on Cloudflare Workers, Deno, Bun, Node.js, and any WinterCG-compatible runtime. |
| `nextjs-app-router-patterns` | Comprehensive patterns for Next.js 14+ App Router architecture, Server Components, and modern full-stack React development. |
| `progressive-web-app` | Build Progressive Web Apps (PWAs) with offline support, installability, and caching strategies. Trigger whenever the user mentions PWA, service worker... |
| `react-best-practices` | Comprehensive React and Next.js performance optimization guide with 40+ rules for eliminating waterfalls, optimizing bundles, and improving rendering.... |
| `react-component-performance` | Diagnose slow React components and suggest targeted performance fixes. |
| `react-native-architecture` | Production-ready patterns for React Native development with Expo, including navigation, state management, native modules, and offline-first architectu... |
| `react-state-management` | Master modern React state management with Redux Toolkit, Zustand, Jotai, and React Query. Use when setting up global state, managing server state, or ... |
| `roier-seo` | Technical SEO auditor and fixer. Runs Lighthouse/PageSpeed audits on websites or local dev servers, analyzes SEO/performance/accessibility scores, and... |
| `segment-cdp` | Expert patterns for Segment Customer Data Platform including Analytics.js, server-side tracking, tracking plans with Protocols, identity resolution, d... |
| `shadcn` | Manages shadcn/ui components and projects, providing context, documentation, and usage patterns for building modern design systems. |
| `shopify-apps` | Expert patterns for Shopify app development including Remix/React Router apps, embedded apps with App Bridge, webhook handling, GraphQL Admin API, Pol... |
| `shopify-development` | -   Build Shopify apps, extensions, themes using GraphQL Admin API, Shopify CLI, Polaris UI, and Liquid. |
| `sveltekit` | Build full-stack web applications with SvelteKit — file-based routing, SSR, SSG, API routes, and form actions in one framework. |
| `tailwind-design-system` | Build production-ready design systems with Tailwind CSS, including design tokens, component variants, responsive patterns, and accessibility. |
| `tanstack-query-expert` | Expert in TanStack Query (React Query) — asynchronous state management. Covers data fetching, stale time configuration, mutations, optimistic updates,... |
| `tavily-web` | Web search, content extraction, crawling, and research capabilities using Tavily API |
| `upstash-qstash` | Upstash QStash expert for serverless message queues, scheduled jobs, and reliable HTTP-based task delivery without managing infrastructure. Use when: ... |
| `web-performance-optimization` | Optimize website and web application performance including loading speed, Core Web Vitals, bundle size, caching strategies, and runtime performance |
| `zod-validation-expert` | Expert in Zod — TypeScript-first schema validation. Covers parsing, custom errors, refinements, type inference, and integration with React Hook Form, ... |
| `zustand-store-ts` | Create Zustand stores following established patterns with proper TypeScript types and middleware. |

### Category: `workflow-automation` (16 skills)

| Skill Name | Description |
| :--- | :--- |
| `dependabot-review` | Review and manage Dependabot PRs. Categorizes by risk, checks CI status, auto-merges safe updates, and reports issues. Use when the user says "review ... |
| `github-actions-templates` | Production-ready GitHub Actions workflow patterns for testing, building, and deploying applications. |
| `github-automation` | Automate GitHub repositories, issues, pull requests, branches, CI/CD, and permissions via Rube MCP (Composio). Manage code workflows, review PRs, sear... |
| `github-workflow-automation` | Automate GitHub workflows with AI assistance. Includes PR reviews, issue triage, CI/CD integration, and Git operations. Use when automating GitHub wor... |
| `gitops-workflow` | Complete guide to implementing GitOps workflows with ArgoCD and Flux for automated Kubernetes deployments. |
| `inngest` | Inngest expert for serverless-first background jobs, event-driven workflows, and durable execution without managing queues or workers. Use when: innge... |
| `jira-automation` | Automate Jira tasks via Rube MCP (Composio): issues, projects, sprints, boards, comments, users. Always search tools first for current schemas. |
| `linear-automation` | Automate Linear tasks via Rube MCP (Composio): issues, projects, cycles, teams, labels. Always search tools first for current schemas. |
| `n8n-workflow-patterns` | Proven architectural patterns for building n8n workflows. |
| `planning-with-files` | Transforms workflow to use Manus-style persistent markdown files for planning, progress tracking, and knowledge storage. Use when starting complex tas... |
| `rote` | Compile a proven agent skill (a SKILL.md plus references) into a deterministic pipeline that runs without an LLM in the loop, then serve it back to Cl... |
| `slack-automation` | Automate Slack workspace operations including messaging, search, channel management, and reaction workflows through Composio's Slack toolkit. |
| `trigger-dev` | Trigger.dev expert for background jobs, AI workflows, and reliable async execution with excellent developer experience and TypeScript-first design. Us... |
| `workflow-automation` | Workflow automation is the infrastructure that makes AI agents reliable. Without durable execution, a network hiccup during a 10-step payment flow mea... |
| `yeet` | Use only when the user explicitly asks to stage, commit, push, and open a GitHub pull request in one flow using the GitHub CLI (`gh`). |
| `zapier-make-patterns` | No-code automation democratizes workflow building. Zapier and Make (formerly Integromat) let non-developers automate business processes without writin... |

---

## 2. Agents (425 Total)

### Category: `accessibility` (1 agents)

| Agent Name | Description |
| :--- | :--- |
| `accessibility-tester` | Use this agent when conducting comprehensive accessibility audits, WCAG 2.2 compliance assessments, or evaluating UI components and full codebases for... |

### Category: `ai-specialists` (8 agents)

| Agent Name | Description |
| :--- | :--- |
| `ai-ethics-advisor` | AI ethics and responsible AI development specialist. Use when reviewing an AI system for bias, fairness violations, or regulatory compliance gaps; whe... |
| `hackathon-ai-strategist` | Use when a team needs strategic guidance at any stage of a hackathon — from initial ideation through pitch delivery. Specifically:\n\n<example>\nConte... |
| `llm-architect` | Use when designing LLM systems for production, implementing fine-tuning or RAG architectures, optimizing inference serving infrastructure, or managing... |
| `llms-maintainer` | LLMs.txt roadmap file generator and maintainer for AI Engine Optimization (AEO). Use PROACTIVELY after build completion, content/routing changes, or w... |
| `model-evaluator` | AI model evaluation and benchmarking specialist. Use when selecting the right model for a specific task, designing evaluation benchmarks from scratch,... |
| `prompt-engineer` | Use this agent when you need to design, optimize, test, or evaluate prompts for Claude (or other LLMs) in production systems. Specifically:\n\n<exampl... |
| `search-specialist` | Expert web researcher using advanced search techniques, multi-source synthesis, and iterative retrieval. Masters search operators, domain filtering, c... |
| `task-decomposition-expert` | Use this agent when you need to break down a complex, multi-step goal into an actionable work breakdown structure with dependencies, parallelism oppor... |

### Category: `api-graphql` (8 agents)

| Agent Name | Description |
| :--- | :--- |
| `api-architect` | Expert API architect for designing and implementing REST and GraphQL APIs with production-grade resilience, security, and versioning. Use this agent w... |
| `api-designer` | Use this agent when designing new APIs, creating API specifications, or refactoring existing API architecture for scalability and developer experience... |
| `graphql-architect` | Use this agent when designing or evolving GraphQL schemas across microservices, implementing federation architectures, or optimizing query performance... |
| `graphql-performance-optimizer` | GraphQL performance analysis and optimization specialist. Use PROACTIVELY for query performance issues, N+1 problems, caching strategies, and producti... |
| `graphql-security-specialist` | GraphQL API security and authorization specialist. Use PROACTIVELY for GraphQL security audits, authorization implementation, query validation, and pr... |
| `octopus-deploy-release-notes-mcp` | Generate release notes for a release in Octopus Deploy. The tools for this MCP server provide access to the Octopus Deploy APIs. |
| `shopify-expert` | Use this agent when building or customizing Shopify themes, developing Shopify apps, working with Liquid templating, or integrating Shopify APIs (Admi... |
| `Thinking-Beast-Mode` | A transcendent coding agent with quantum cognitive architecture, adversarial intelligence, and unrestricted creative freedom. |

### Category: `blockchain-web3` (4 agents)

| Agent Name | Description |
| :--- | :--- |
| `blockchain-developer` | Use this agent when building smart contracts, DApps, and blockchain protocols that require expertise in Solidity, gas optimization, security auditing,... |
| `smart-contract-auditor` | Use this agent when conducting security audits of smart contracts. Specializes in vulnerability detection, attack vector analysis, and comprehensive s... |
| `smart-contract-specialist` | Use this agent for smart contract architecture and design-pattern advisory work — choosing proxy/upgrade patterns, designing storage layouts, defining... |
| `web3-integration-specialist` | Use this agent when building Web3 frontend applications and wallet integrations. Specializes in blockchain connectivity, wallet interactions (RainbowK... |

### Category: `business-marketing` (21 agents)

| Agent Name | Description |
| :--- | :--- |
| `business-analyst` | Use when analyzing business processes, gathering requirements from stakeholders, or identifying process improvement opportunities to drive operational... |
| `communication-excellence-coach` | Use PROACTIVELY when reviewing email or message drafts, calibrating tone for an audience, practicing a difficult conversation via roleplay, or reviewi... |
| `competitive-analyst` | Use when you need to analyze direct and indirect competitors, benchmark against market leaders, or develop strategies to strengthen competitive positi... |
| `content-marketer` | Use this agent when you need to develop comprehensive content strategies, create SEO-optimized marketing content, or execute multi-channel content cam... |
| `customer-success-manager` | Use this agent when you need to assess customer health, develop retention strategies, identify upsell opportunities, or maximize customer lifetime val... |
| `customer-support` | Customer support and documentation specialist. Use PROACTIVELY for support ticket responses, FAQ creation, troubleshooting guides, help documentation,... |
| `legal-advisor` | Use PROACTIVELY for privacy policies, terms of service, GDPR/CCPA compliance, legal notices, and regulatory documentation. Expert in technology law an... |
| `market-researcher` | Use this agent when you need to analyze markets, understand consumer behavior, assess competitive landscapes, and size opportunities to inform busines... |
| `marketing-attribution-analyst` | Use when you need to model multi-touch attribution, measure marketing mix impact, validate channel performance with incrementality testing, or optimiz... |
| `payment-integration` | Payment systems integration specialist. Use PROACTIVELY for Stripe, PayPal, and payment processor implementations, checkout flows, subscription billin... |
| `product-manager` | Use this agent when you need to make product strategy decisions, prioritize features, or define roadmap plans based on user needs and business goals. ... |
| `product-strategist` | Product strategy and roadmap planning specialist. Use PROACTIVELY for product positioning, market analysis, feature prioritization, go-to-market strat... |
| `project-manager` | Use this agent when you need to establish project plans, track execution progress, manage risks, control budget/schedule, and coordinate stakeholders ... |
| `sales-automator` | Sales automation and outreach specialist. Use PROACTIVELY for cold email campaigns, follow-up sequences, proposal templates, case studies, sales scrip... |
| `sales-engineer` | Use this agent when you need to conduct technical pre-sales activities including solution architecture, proof-of-concept development, and technical de... |
| `salesforce-expert` | Use this agent for expert Salesforce Platform guidance, including Apex Enterprise Patterns, LWC development, integrations, Aura-to-LWC migration, and ... |
| `scrum-master` | Use when teams need facilitation, process optimization, velocity improvement, or agile ceremony management—especially for sprint planning, retrospecti... |
| `seo-specialist` | Use this agent PROACTIVELY when you need comprehensive SEO optimization — technical audits, keyword strategy, content optimization, structured data, o... |
| `trading-risk-manager` | Trading and portfolio risk management specialist for retail/discretionary traders and investors. Use PROACTIVELY for position sizing, R-multiple analy... |
| `trend-analyst` | Use when analyzing emerging patterns, predicting industry shifts, or developing future scenarios to inform strategic planning and competitive position... |
| `ux-researcher` | Use this agent when you need to conduct user research, analyze user behavior, or generate actionable insights to validate design decisions and uncover... |

### Category: `data-ai` (40 agents)

| Agent Name | Description |
| :--- | :--- |
| `adr-generator` | Use when you need to formalize a technical or architectural decision as a structured Architectural Decision Record (ADR), or when a team has debated a... |
| `ai-engineer` | Use this agent as the generalist entry point for end-to-end AI systems spanning both classical ML (model selection, training pipelines, production ser... |
| `amplitude-experiment-implementation` | This custom agent uses Amplitude's MCP tools to deploy new experiments inside of Amplitude, enabling seamless variant testing capabilities and rollout... |
| `blueprint-mode-codex` | Executes structured workflows with strict correctness and maintainability. Enforces a minimal tool usage policy, never assumes facts, prioritizes repr... |
| `blueprint-mode` | Executes structured workflows (Debug, Express, Main, Loop) with strict correctness and maintainability. Enforces an improved tool usage policy, never ... |
| `clojure-interactive-programming` | Expert Clojure pair programmer with REPL-first methodology, architectural oversight, and interactive problem-solving. Enforces quality standards, prev... |
| `code-tour` | Expert agent for creating and maintaining VSCode CodeTour files with comprehensive schema support and best practices |
| `computer-vision-engineer` | Use this agent for image/video analysis systems requiring classical or trainable CV models: object detection, face recognition, OCR/document analysis,... |
| `data-analyst` | Use when you need to extract insights from business data, create dashboards and reports, or perform statistical analysis to support decision-making. S... |
| `data-engineer` | Use PROACTIVELY when you need to design, build, or optimize data pipelines, dbt transformation models, ETL/ELT processes, and data infrastructure span... |
| `data-scientist` | Use this agent when you need to analyze data patterns, build predictive models, or extract statistical insights from datasets. Invoke this agent for e... |
| `demonstrate-understanding` | Validate user understanding of code, design patterns, and implementation details through guided questioning. |
| `dotnet-maui` | Support development of .NET MAUI cross-platform apps with controls, XAML, handlers, and performance best practices. |
| `hlbpa` | Your perfect AI chat mode for high-level architectural documentation and review. Perfect for targeted updates after a story or researching that legacy... |
| `machine-learning-engineer` | Use this agent when you need to deploy, optimize, or serve machine learning models at scale in production environments. Specifically:\\n\\n<example>\\... |
| `microsoft-agent-framework-dotnet` | Create, update, refactor, explain or work with code using the .NET version of Microsoft Agent Framework. |
| `ml-engineer` | Use this agent when building production ML systems end-to-end - training pipelines, initial model serving/deployment, and automated retraining - cover... |
| `mlops-engineer` | Use this agent when you need to design and implement ML infrastructure, set up CI/CD for machine learning models, establish model versioning systems, ... |
| `monday-bug-fixer` | Elite bug-fixing agent that enriches task context from Monday.com platform data. Gathers related items, docs, comments, epics, and requirements to del... |
| `ms-sql-dba` | Work with Microsoft SQL Server databases using the MS SQL extension. |
| `neon-migration-specialist` | Safe Postgres migrations with zero-downtime using Neon's branching workflow. Test schema changes in isolated database branches, validate thoroughly, t... |
| `neon-optimization-analyzer` | Identify and fix slow Postgres queries automatically using Neon's branching workflow. Analyzes execution plans, tests optimizations in isolated databa... |
| `nlp-engineer` | Use when building production NLP systems, implementing text processing pipelines, developing language models, or solving domain-specific NLP tasks lik... |
| `postgresql-dba` | Work with PostgreSQL databases using the PostgreSQL extension. |
| `power-bi-data-modeling-expert` | Expert Power BI data modeling guidance using star schema principles, relationship design, and Microsoft best practices for optimal model performance a... |
| `power-bi-dax-expert` | Expert Power BI DAX guidance using Microsoft best practices for performance, readability, and maintainability of DAX formulas and calculations. |
| `power-platform-expert` | Power Platform expert providing guidance on Code Apps, canvas apps, Dataverse, connectors, and Power Platform best practices |
| `prd` | Generate a comprehensive Product Requirements Document (PRD) in Markdown, detailing user stories, acceptance criteria, technical considerations, and m... |
| `prompt-builder` | Expert prompt engineering and validation system for creating high-quality prompts - Brought to you by microsoft/edge-ai |
| `prompt-engineer` | A specialized chat mode for analyzing and improving prompts. Every user input is treated as a prompt to be improved. It evaluates the prompt against a... |
| `quant-analyst` | Quantitative finance and algorithmic trading specialist. Use PROACTIVELY for financial modeling, trading strategy development, backtesting, risk analy... |
| `se-product-manager-advisor` | Product management guidance for creating GitHub issues, aligning business value with user needs, and making data-driven product decisions |
| `se-system-architecture-reviewer` | System architecture review specialist with Well-Architected frameworks, design validation, and scalability analysis for AI and distributed systems |
| `semantic-kernel-dotnet` | Create, update, refactor, explain or work with code using the .NET version of Semantic Kernel. |
| `simple-app-idea-generator` | Brainstorm and develop new application ideas through fun, interactive questioning until ready for specification creation. |
| `software-engineer-agent-v1` | Expert-level software engineering agent. Deliver production-ready, maintainable code. Execute systematically and specification-driven. Document compre... |
| `task-planner` | Task planner for creating actionable implementation plans - Brought to you by microsoft/edge-ai |
| `task-researcher` | Task research specialist for comprehensive project analysis - Brought to you by microsoft/edge-ai |
| `tdd-green` | Implement minimal code to satisfy GitHub issue requirements and make failing tests pass without over-engineering. |
| `tdd-red` | Guide test-first development by writing failing tests that describe desired behaviour from GitHub issue context before implementation exists. |

### Category: `database` (11 agents)

| Agent Name | Description |
| :--- | :--- |
| `database-admin` | Database administration specialist for PostgreSQL, MySQL, MongoDB, and Redis operations, backups, replication, and monitoring. Use PROACTIVELY for dat... |
| `database-administrator` | Use this agent when optimizing database performance, implementing high-availability architectures, setting up disaster recovery, or managing database ... |
| `database-architect` | Database architecture and design specialist. Use PROACTIVELY for database design decisions, data modeling, scalability planning, microservices data pa... |
| `database-optimization` | Database performance optimization and query tuning specialist. Use PROACTIVELY for slow queries, indexing strategies, execution plan analysis, and dat... |
| `database-optimizer` | Use this agent when you need to analyze slow queries, optimize database performance across multiple systems, or implement indexing strategies to impro... |
| `neon-auth-specialist` | Neon Auth implementation specialist. Use PROACTIVELY for Stack Auth integration, user management setup, authentication flows, and security best practi... |
| `neon-database-architect` | Neon database architecture specialist. Use PROACTIVELY for database schema design, Drizzle ORM integration, query optimization, and serverless perform... |
| `neon-expert` | General Neon Serverless Postgres consultant. Use PROACTIVELY for initial Neon setup, general database questions, and coordinating with specialized age... |
| `nosql-specialist` | NoSQL database specialist for MongoDB, Redis, Cassandra, and document/key-value stores. Use PROACTIVELY for schema design, data modeling, performance ... |
| `postgres-pro` | Use when you need to optimize PostgreSQL performance, design high-availability replication, or troubleshoot database issues at scale. Invoke this agen... |
| `supabase-schema-architect` | Supabase database schema design specialist. Use PROACTIVELY for database schema design, migration planning, and RLS policy architecture. |

### Category: `deep-research-team` (17 agents)

| Agent Name | Description |
| :--- | :--- |
| `academic-researcher` | Academic research specialist for scholarly sources, peer-reviewed papers, and academic literature. Use PROACTIVELY for research paper analysis, litera... |
| `agent-overview` |  |
| `competitive-intelligence-analyst` | Competitive intelligence and market research specialist. Use PROACTIVELY for competitor analysis, market positioning research, industry trend analysis... |
| `data-analyst` | Use this agent when you need quantitative analysis, statistical insights, or data-driven research. This includes analyzing numerical data, identifying... |
| `data-researcher` | Use this agent when you need to discover, collect, and validate data from multiple sources to fuel analysis and decision-making. Invoke this agent for... |
| `fact-checker` | Fact verification and source validation specialist. Use PROACTIVELY for claim verification, source credibility assessment, misinformation detection, c... |
| `multi-source-searcher` | Use when you need to find specific information across multiple sources using advanced search strategies, query optimization, and targeted information ... |
| `nia-oracle` | Expert research agent specialized in leveraging Nia's knowledge tools. Use PROACTIVELY for discovering repos/docs, deep technical research, remote cod... |
| `query-clarifier` | Use this agent when you need to analyze research queries for clarity and determine if user clarification is needed before proceeding with research. Th... |
| `report-generator` | Use this agent when you need to transform synthesized research findings into a comprehensive, well-structured final report. This agent excels at creat... |
| `research-analyst` | Use this agent when you need comprehensive research across multiple sources with synthesis of findings into actionable insights, trend identification,... |
| `research-brief-generator` | Use this agent when you need to transform a user's research query into a structured, actionable research brief that will guide subsequent research act... |
| `research-coordinator` | Use this agent when you need to strategically plan and coordinate complex research tasks across multiple specialist researchers. This agent analyzes r... |
| `research-orchestrator` | Use this agent when you need to coordinate a comprehensive research project that requires multiple specialized agents working in sequence. This agent ... |
| `research-synthesizer` | Use this agent when you need to consolidate and synthesize findings from multiple research sources or specialist researchers into a unified, comprehen... |
| `search-specialist` | Use when you need to find specific information across multiple sources using advanced search strategies, query optimization, and targeted information ... |
| `technical-researcher` | Use this agent when you need to analyze code repositories, technical documentation, implementation details, or evaluate technical solutions. This incl... |

### Category: `development-team` (17 agents)

| Agent Name | Description |
| :--- | :--- |
| `backend-architect` | Backend system architecture and API design specialist. Use PROACTIVELY for greenfield service design, monolith decomposition, API paradigm selection (... |
| `backend-developer` | Use this agent when building server-side APIs, microservices, and backend systems that require robust architecture, scalability planning, and producti... |
| `cli-ui-designer` | CLI interface design specialist. Use PROACTIVELY to create terminal-inspired user interfaces with modern web technologies. Expert in CLI aesthetics, t... |
| `code-architect` | Designs feature architectures by analyzing existing codebase patterns and conventions, then providing comprehensive implementation blueprints with spe... |
| `code-explorer` | Deeply analyzes existing codebase features by tracing execution paths, mapping architecture layers, understanding patterns and abstractions, and docum... |
| `devops-engineer` | DevOps and infrastructure specialist for CI/CD, deployment automation, and cloud operations. Use PROACTIVELY for pipeline setup, infrastructure provis... |
| `electron-pro` | Use this agent when building Electron desktop applications that require native OS integration, cross-platform distribution, security hardening, and pe... |
| `frontend-developer` | Use when building complete frontend applications across React, Vue, and Angular frameworks requiring multi-framework expertise and full-stack integrat... |
| `fullstack-developer` | Use this agent when you need to build complete features spanning database, API, and frontend layers together as a cohesive unit. Specifically:\\n\\n<e... |
| `ios-developer` | Native iOS development specialist with Swift and SwiftUI. Use PROACTIVELY for iOS applications, UIKit/SwiftUI components, Core Data integration, app l... |
| `mobile-app-developer` | Use this agent when developing iOS and Android mobile applications with focus on native or cross-platform implementation, performance optimization, an... |
| `mobile-developer` | Use this agent when building cross-platform mobile applications requiring native performance optimization, platform-specific features, and offline-fir... |
| `sdd-spec-writer` |  |
| `test-generator` | Analyzes code changes and generates comprehensive test cases by understanding existing test patterns, edge cases, and testing conventions in the codeb... |
| `test-runner` | Executes tests, analyzes results, identifies failures, diagnoses root causes, and provides actionable fixes for failing tests |
| `ui-designer` | Use this agent when designing visual interfaces, creating design systems, building component libraries, or refining user-facing aesthetics requiring e... |
| `ui-ux-designer` | Use proactively when reviewing UI/UX design, evaluating visual interfaces, auditing web components for usability issues, checking accessibility compli... |

### Category: `development-tools` (35 agents)

| Agent Name | Description |
| :--- | :--- |
| `accessibility-tester` | Use this agent when you need comprehensive accessibility testing, WCAG compliance verification, or assessment of assistive technology support. Specifi... |
| `architect-reviewer` | Use this agent when you need to evaluate system design decisions, architectural patterns, and technology choices at the macro level. Specifically:\\n\... |
| `ascii-ui-mockup-generator` | Specialist in creating ASCII mockups for UI concepts, generating multiple visualization options for layouts, forms, dashboards, and interfaces before ... |
| `build-engineer` | Use this agent when you need to optimize build performance, reduce compilation times, or scale build systems across growing teams. Specifically:\\n\\n... |
| `chaos-engineer` | Use this agent when you need to design and execute controlled failure experiments, validate system resilience before incidents occur, or conduct game ... |
| `cli-developer` | Use this agent when building command-line tools and terminal applications that require intuitive command design, cross-platform compatibility, and opt... |
| `code-reviewer` | Use this agent when you need to conduct comprehensive code reviews focusing on code quality, security vulnerabilities, and best practices. Specificall... |
| `code-simplifier` | Simplifies and refines code for clarity, consistency, and maintainability while preserving all functionality. Focuses on recently modified code unless... |
| `codebase-explorer` | -   Deep-dive analysis of unfamiliar codebases. Generates a structured mental model of any project — tech stack, architecture, patterns, entry points,... |
| `codebase-pattern-finder` | Specialist for finding code patterns and examples in the codebase, providing concrete implementations that can serve as templates for new work |
| `command-expert` | CLI command development specialist for the claude-code-templates system. Use PROACTIVELY for command design, argument parsing, task automation, and CL... |
| `context-manager` | Context management specialist for multi-agent workflows and long-running tasks. Use PROACTIVELY for complex projects, session coordination, and when c... |
| `debugger` | Use this agent when you need to diagnose and fix bugs, identify root causes of failures, or analyze error logs and stack traces to resolve issues. Spe... |
| `dependency-manager` | Use this agent when you need to audit dependencies for vulnerabilities, resolve version conflicts, optimize bundle sizes, or implement automated depen... |
| `dx-optimizer` | Use this agent when optimizing the complete developer workflow including build times, feedback loops, testing efficiency, and developer satisfaction m... |
| `error-detective` | Use this agent when you need to diagnose why errors are occurring in your system, correlate errors across services, identify root causes, and prevent ... |
| `flutter-go-reviewer` | -   Use this agent when you need to review code changes in a pull request or after writing/modifying code. The agent performs comprehensive code revie... |
| `general-purpose` | Default agent for handling complex, multi-step tasks with automatic delegation capabilities |
| `laravel-expert-agent` | Expert Laravel development assistant specializing in modern Laravel 12+ applications with Eloquent, Artisan, testing, and best practices |
| `launchdarkly-flag-cleanup` | A specialized GitHub Copilot agent that uses the LaunchDarkly MCP server to safely automate feature flag cleanup workflows. This agent determines remo... |
| `mcp-expert` | Model Context Protocol (MCP) integration specialist for the cli-tool components system. Use PROACTIVELY for MCP server configurations, protocol specif... |
| `pagerduty-incident-responder` | Responds to PagerDuty incidents by analyzing incident context, identifying recent code changes, and suggesting fixes via GitHub PRs. |
| `performance-engineer` | Use this agent when you need to identify and eliminate performance bottlenecks in applications, databases, or infrastructure systems, and when baselin... |
| `performance-profiler` | Performance analysis and optimization specialist. Use PROACTIVELY for performance bottlenecks, memory leaks, load testing, optimization strategies, an... |
| `playwright-tester` | Testing mode for Playwright tests |
| `qa-expert` | Use this agent when you need comprehensive quality assurance strategy, test planning across the entire development cycle, or quality metrics analysis ... |
| `refactoring-specialist` | Use when you need to transform poorly structured, complex, or duplicated code into clean, maintainable systems while preserving all existing behavior.... |
| `rootly-incident-responder` | -   Experienced SRE specialist for production incident response using Rootly incident management platform.    INVOKE THIS SKILL when:   - User asks to... |
| `slack-expert` | Use this agent when developing Slack applications, implementing Slack API integrations, or reviewing Slack bot code for security and best practices. S... |
| `technical-debt-manager` | Expert technical debt analyst for code health, maintainability, and strategic refactoring planning. Use PROACTIVELY when codebase shows complexity gro... |
| `test-automator` | Use this agent when you need to build, implement, or enhance automated test frameworks, create test scripts, or integrate testing into CI/CD pipelines... |
| `test-engineer` | Test automation and quality assurance specialist. Use PROACTIVELY for test strategy, test automation, coverage analysis, CI/CD testing, and quality en... |
| `thinking-beast-mode` | Use this agent for long-running, autonomous multi-step engineering tasks that must be driven to full completion without handing control back early — e... |
| `tooling-engineer` | Use this agent when you need to build or enhance developer tools including CLIs, code generators, build tools, and IDE extensions. Specifically:\\n\\n... |
| `unused-code-cleaner` | Detects and removes unused code (imports, functions, classes) across multiple languages. Use PROACTIVELY after refactoring, when removing features, or... |

### Category: `devops-infrastructure` (40 agents)

| Agent Name | Description |
| :--- | :--- |
| `apify-integration-expert` | Expert agent for integrating Apify Actors into codebases. Handles Actor selection, workflow design, implementation across JavaScript/TypeScript and Py... |
| `arm-migration` | Arm Cloud Migration Assistant accelerates moving x86 workloads to Arm infrastructure. It scans the repository for architecture assumptions, portabilit... |
| `azure-iac-exporter` | Export existing Azure resources to Infrastructure as Code templates via Azure Resource Graph analysis, Azure Resource Manager API calls, and azure-iac... |
| `azure-iac-generator` | Central hub for generating Infrastructure as Code (Bicep, ARM, Terraform, Pulumi) with format-specific validation and best practices. Use this skill w... |
| `azure-infra-engineer` | Use when designing, deploying, or managing Azure infrastructure with focus on network architecture, Entra ID integration, PowerShell automation, and B... |
| `azure-logic-apps-expert` | Expert guidance for Azure Logic Apps development focusing on workflow design, integration patterns, and JSON-based Workflow Definition Language. |
| `azure-principal-architect` | Provide expert Azure Principal Architect guidance using Azure Well-Architected Framework principles and Microsoft best practices. |
| `azure-saas-architect` | Provide expert Azure SaaS Architect guidance focusing on multitenant applications using Azure Well-Architected SaaS principles and Microsoft best prac... |
| `azure-verified-modules-bicep` | Create, update, or review Azure IaC in Bicep using Azure Verified Modules (AVM). |
| `azure-verified-modules-terraform` | Create, update, or review Azure IaC in Terraform using Azure Verified Modules (AVM). |
| `bicep-implement` | Act as an Azure Bicep Infrastructure as Code coding specialist that creates Bicep templates. |
| `bicep-plan` | Act as implementation planner for your Azure Bicep Infrastructure as Code task. |
| `cloud-architect` | Use this agent when you need to design, evaluate, or optimize cloud infrastructure architecture at scale. Invoke when designing multi-cloud strategies... |
| `deployment-engineer` | Use this agent when designing, building, or optimizing CI/CD pipelines and deployment automation strategies. Specifically:\\n\\n<example>\\nContext: A... |
| `devops-engineer` | Use this agent when building or optimizing infrastructure automation, CI/CD pipelines, containerization strategies, and deployment workflows to accele... |
| `devops-expert` | DevOps specialist following the infinity loop principle (Plan → Code → Build → Test → Release → Deploy → Operate → Monitor) with focus on automation, ... |
| `devops-incident-responder` | Use when actively responding to production incidents, diagnosing critical service failures, or conducting incident postmortems to implement permanent ... |
| `devops-troubleshooter` | Production troubleshooting and incident response specialist. Use PROACTIVELY for debugging issues, log analysis, deployment failures, monitoring setup... |
| `incident-responder` | Use this agent when an active security breach, service outage, or operational incident requires immediate response, evidence preservation, and coordin... |
| `kubernetes-specialist` | Use this agent when you need to design, deploy, configure, or troubleshoot Kubernetes clusters and workloads in production environments. Specifically:... |
| `kusto-assistant` | Expert KQL assistant for live Azure Data Explorer analysis via Azure MCP server |
| `m365-admin` | Use when automating Microsoft 365 administrative tasks including Exchange Online mailbox provisioning, Teams collaboration management, SharePoint site... |
| `microservices-architect` | Use when designing distributed system architecture, decomposing monolithic applications into independent microservices, or establishing communication ... |
| `microsoft-study-mode` | Activate your personal Microsoft/Azure tutor - learn through guided discovery, not just answers. |
| `monitoring-specialist` | Monitoring and observability infrastructure specialist. Use PROACTIVELY for metrics collection, alerting systems, log aggregation, distributed tracing... |
| `neo4j-docker-client-generator` | AI agent that generates simple, high-quality Python Neo4j client libraries from GitHub issues with proper best practices |
| `network-engineer` | Use this agent when designing, optimizing, or troubleshooting cloud and hybrid network infrastructures, or when addressing network security, performan... |
| `octopus-deploy-release-notes-mcp` | Generates markdown release notes for an Octopus Deploy release by combining Octopus release/build-information data with commit details (message, autho... |
| `platform-engineer` | Use when building or improving internal developer platforms (IDPs), designing self-service infrastructure, or optimizing developer workflows to reduce... |
| `se-gitops-ci-specialist` | DevOps specialist for CI/CD pipelines, deployment debugging, and GitOps workflows focused on making deployments boring and reliable |
| `security-engineer` | Security infrastructure and compliance specialist. Use PROACTIVELY for security architecture, compliance frameworks, vulnerability management, securit... |
| `sre-engineer` | Use this agent when you need to establish or improve system reliability through SLO definition, error budget management, and automation. Invoke when i... |
| `terraform-azure-implement` | Act as an Azure Terraform Infrastructure as Code coding specialist that creates and reviews Terraform for Azure resources. |
| `terraform-azure-planning` | Act as implementation planner for your Azure Terraform Infrastructure as Code task. |
| `terraform-engineer` | Use when building, refactoring, or scaling infrastructure as code using Terraform with focus on multi-cloud deployments, module architecture, and ente... |
| `terraform-iac-reviewer` | Terraform-focused agent that reviews and creates safer IaC changes with emphasis on state safety, least privilege, module patterns, drift detection, a... |
| `terraform-specialist` | Terraform and Infrastructure as Code specialist. Use PROACTIVELY for Terraform modules, state management, IaC best practices, provider configurations,... |
| `terragrunt-expert` | Expert Terragrunt specialist mastering infrastructure orchestration, DRY configurations, and multi-environment deployments. Masters stacks, units, dep... |
| `vercel-deployment-specialist` | Expert in Vercel platform features, edge functions, middleware, and deployment strategies. Use PROACTIVELY for Vercel deployments, performance optimiz... |
| `windows-infra-admin` | Use when managing Windows Server infrastructure, Active Directory, DNS, DHCP, and Group Policy configurations, especially for enterprise-scale deploym... |

### Category: `documentation` (11 agents)

| Agent Name | Description |
| :--- | :--- |
| `api-documenter` | Use this agent when creating or improving API documentation, writing OpenAPI specifications, building interactive documentation portals, or generating... |
| `arch` | Expert in modern architecture design patterns, NFR requirements, and creating comprehensive architectural diagrams and documentation |
| `changelog-generator` | Changelog and release notes specialist. Use PROACTIVELY for generating changelogs from git history, creating release notes, and maintaining version do... |
| `context7` | Expert in latest library versions, best practices, and correct syntax using up-to-date documentation |
| `diagram-architect` | Create technical diagrams in multiple formats (ASCII, Mermaid, PlantUML, Draw.io). Use PROACTIVELY for architecture visualization, ERD generation, flo... |
| `documentation-engineer` | Use this agent when you need to create, architect, or overhaul comprehensive documentation systems including API docs, tutorials, guides, and develope... |
| `docusaurus-expert` | Docusaurus documentation specialist. Use PROACTIVELY when working with Docusaurus documentation for site configuration, content management, theming, b... |
| `microsoft_learn_contributor` | Microsoft Learn Contributor chatmode for editing and writing Microsoft Learn documentation following Microsoft Writing Style Guide and authoring best ... |
| `se-technical-writer` | Technical writing specialist for creating developer documentation, technical blogs, tutorials, and educational content |
| `tech-debt-remediation-plan` | Generate technical debt remediation plans for code, tests, and documentation. |
| `technical-writer` | Use this agent when you need to create, improve, or maintain technical documentation including API references, user guides, SDK documentation, and get... |

### Category: `expert-advisors` (52 agents)

| Agent Name | Description |
| :--- | :--- |
| `4.1-Beast` | GPT 4.1 as a top-notch coding agent. |
| `address-comments` | Address PR comments |
| `agent-expert` | --   Use this agent when creating specialized Claude Code agents for the claude-code-templates components system. Specializes in agent design, prompt ... |
| `agent-installer` | Use this agent when the user wants to discover, browse, or install Claude Code agents from the awesome-claude-code-subagents repository. Specifically:... |
| `agent-organizer` | Use when assembling and optimizing multi-agent teams to execute complex projects that require careful task decomposition, agent capability matching, a... |
| `architect-review` | Use this agent to review code for architectural consistency and patterns. Specializes in SOLID principles, proper layering, and maintainability. Examp... |
| `atlassian-requirements-to-jira` | Transform requirements documents into structured Jira epics and user stories with intelligent duplicate detection, change management, and user-approve... |
| `context-manager` | Use for managing shared state, information retrieval, and data synchronization when multiple agents need coordinated access to context and metadata. S... |
| `critical-thinking` | Challenge assumptions and encourage critical thinking to ensure the best possible solution and outcomes. |
| `custom-agent-foundry` | Expert at designing and creating VS Code custom agents with optimal configurations |
| `debug` | Debug your application to find and fix a bug |
| `declarative-agents-architect` | Specialized agent |
| `dependency-manager` | Use this agent to manage project dependencies. Specializes in dependency analysis, vulnerability scanning, and license compliance. Examples: <example>... |
| `documentation-expert` | Use this agent to create, improve, and maintain project documentation. Specializes in technical writing, documentation standards, and generating docum... |
| `dotnet-upgrade` | Perform janitorial tasks on C#/.NET code including cleanup, modernization, and tech debt remediation. |
| `droid` | Use this agent for installation guidance, usage examples, and automation patterns for the Droid CLI (Factory AI), with emphasis on droid exec for CI/C... |
| `drupal-expert` | Expert assistant for Drupal development, architecture, and best practices using PHP 8.3+ and modern Drupal patterns |
| `error-coordinator` | Use this agent when distributed system errors occur and need coordinated handling across multiple components, or when you need to implement comprehens... |
| `expert-dotnet-software-engineer` | Provide expert .NET software engineering guidance using modern software design patterns. |
| `gilfoyle` | Code review and analysis with the sardonic wit and technical elitism of Bertram Gilfoyle from Silicon Valley. Prepare for brutal honesty about your co... |
| `gpt-5-beast-mode` | Beast Mode 2.0: A powerful autonomous agent tuned specifically for GPT-5 that can solve complex problems by using tools, conducting research, and iter... |
| `implementation-plan` | Generate an implementation plan for new features or refactoring existing code. |
| `it-ops-orchestrator` | Use for orchestrating complex IT operations tasks that span multiple domains (PowerShell automation, .NET development, infrastructure management, Azur... |
| `janitor` | Perform janitorial tasks on any codebase including cleanup, simplification, and tech debt remediation. |
| `knowledge-synthesizer` | Use when you need to extract actionable patterns from agent interactions, synthesize insights across multiple workflows, and enable organizational lea... |
| `kotlin-mcp-expert` | Expert assistant for building Model Context Protocol (MCP) servers in Kotlin using the official SDK. |
| `legal-advisor` | Use this agent when you need to draft contracts, review compliance requirements, develop IP protection strategies, or assess legal risks for technolog... |
| `mcp-m365-agent-expert` | Expert assistant for building MCP-based declarative agents for Microsoft 365 Copilot with Model Context Protocol integration |
| `mentor` | Help mentor the engineer by providing guidance and support. |
| `meta-agentic-project-scaffold` | Meta agentic project creation assistant to help users create and manage project workflows effectively. |
| `modernization` | Human-in-the-loop modernization assistant for analyzing, documenting, and planning complete project modernization with architectural recommendations. |
| `multi-agent-coordinator` | Use when coordinating multiple concurrent agents that need to communicate, share state, synchronize work, and handle distributed failures across a sys... |
| `performance-monitor` | Use when establishing observability infrastructure to track system metrics, detect performance anomalies, and optimize resource usage across multi-age... |
| `php-mcp-expert` | Expert assistant for PHP MCP server development using the official PHP SDK with attribute-based discovery |
| `pimcore-expert` | Expert Pimcore development assistant specializing in CMS, DAM, PIM, and E-Commerce solutions with Symfony integration |
| `plan` | Strategic planning and architecture assistant focused on thoughtful analysis before implementation. Helps developers understand codebases, clarify req... |
| `planner` | Generate an implementation plan for new features or refactoring existing code. |
| `power-bi-performance-expert` | Expert Power BI performance optimization guidance for troubleshooting, monitoring, and improving the performance of Power BI models, reports, and quer... |
| `power-bi-visualization-expert` | Expert Power BI report design and visualization guidance using Microsoft best practices for creating effective, performant, and user-friendly reports ... |
| `power-platform-mcp-integration-expert` | Expert in Power Platform custom connector development with MCP integration for Copilot Studio - comprehensive knowledge of schemas, protocols, and int... |
| `principal-software-engineer` | Provide principal-level software engineering guidance with focus on engineering excellence, technical leadership, and pragmatic implementation. |
| `refine-issue` | Refine the requirement or issue with Acceptance Criteria, Technical Considerations, Edge Cases, and NFRs |
| `research-technical-spike` | Systematically research and validate technical spike documents through exhaustive investigation and controlled experimentation. |
| `se-ux-ui-designer` | Jobs-to-be-Done analysis, user journey mapping, and UX research artifacts for Figma and design workflows |
| `specification` | Generate or update specification documents for new or existing functionality. |
| `swift-mcp-expert` | Expert assistance for building Model Context Protocol servers in Swift using modern concurrency features and the official MCP Swift SDK. |
| `task-distributor` | Use when distributing tasks across multiple agents or workers, managing queues, and balancing workloads to maximize throughput while respecting priori... |
| `Ultimate-Transparent-Thinking-Beast-Mode` | Ultimate Transparent Thinking Beast Mode |
| `voidbeast-gpt41enhanced` | 4.1 voidBeast_GPT41Enhanced 1.0 : a advanced autonomous developer agent, designed for elite full-stack development with enhanced multi-mode capabiliti... |
| `wg-code-alchemist` | Ask WG Code Alchemist to transform your code with Clean Code principles and SOLID design |
| `WinFormsExpert` | Support development of .NET (OOP) WinForms Designer compatible Apps. |
| `workflow-orchestrator` | Use this agent when you need to design, implement, or optimize complex business process workflows with multiple states, error handling, and transactio... |

### Category: `ffmpeg-clip-team` (8 agents)

| Agent Name | Description |
| :--- | :--- |
| `audio-mixer` | Multi-track audio mixing and mastering specialist. Use PROACTIVELY for complex audio arrangements, track balancing, spatial audio, sound design, and p... |
| `audio-quality-controller` | Audio quality enhancement and analysis specialist. Use PROACTIVELY for loudness normalization, noise reduction, audio standardization, and broadcast-r... |
| `podcast-content-analyzer` | Podcast content analysis specialist. Use PROACTIVELY for identifying viral moments, creating chapter markers, extracting SEO keywords, and scoring eng... |
| `podcast-metadata-specialist` | Podcast metadata and show notes specialist. Use PROACTIVELY for SEO-optimized titles, chapter markers, platform-specific descriptions, and comprehensi... |
| `podcast-transcriber` | Audio transcription specialist. Use PROACTIVELY for extracting accurate transcripts from media files with speaker identification, timestamps, and stru... |
| `social-media-clip-creator` | Social media video clip optimization specialist. Use PROACTIVELY for creating platform-specific clips with proper aspect ratios, subtitles, thumbnails... |
| `timestamp-precision-specialist` | Frame-accurate timestamp extraction specialist. Use PROACTIVELY for precise cut points, speech boundary detection, silence analysis, and professional ... |
| `video-editor` | Video editing and production specialist. Use PROACTIVELY for video cuts, transitions, effects, color correction, multi-track editing, and professional... |

### Category: `finance` (5 agents)

| Agent Name | Description |
| :--- | :--- |
| `bettoredge-value-finder` | Find +EV betting opportunities on BettorEdge prediction markets with edge calculation, Kelly criterion sizing, and bankroll management |
| `fintech-engineer` | Use when building payment systems, financial integrations, or compliance-heavy financial applications that require secure transaction processing, regu... |
| `payment-integration` | Use this agent when implementing payment systems, integrating payment gateways, or handling financial transactions that require PCI compliance, fraud ... |
| `quant-analyst` | Use this agent when you need to develop quantitative trading strategies, build financial models with rigorous mathematical foundations, or conduct adv... |
| `risk-manager` | Use this agent when you need to identify, quantify, and mitigate enterprise-level risks across financial, operational, regulatory, and strategic domai... |

### Category: `game-development` (5 agents)

| Agent Name | Description |
| :--- | :--- |
| `3d-artist` | 3D art and asset creation specialist for game development. Use PROACTIVELY for 3D modeling, texturing, animation, asset optimization, and technical ar... |
| `game-designer` | Game design specialist focusing on mechanics, balancing, player psychology, and system design. Use PROACTIVELY for gameplay mechanics, progression sys... |
| `game-developer` | Use this agent when implementing game systems, optimizing graphics rendering, building multiplayer networking, or developing gameplay mechanics for ga... |
| `unity-game-developer` | Expert Unity game developer specializing in C# scripting, 3D graphics, mobile optimization, and complete game development workflows. Handles Unity phy... |
| `unreal-engine-developer` | Expert Unreal Engine developer specializing in C++ programming, Blueprint visual scripting, and AAA game development. Handles Unreal's rendering pipel... |

### Category: `git` (3 agents)

| Agent Name | Description |
| :--- | :--- |
| `commit-guardian` |  |
| `git-flow-manager` | Git Flow workflow manager. Use PROACTIVELY for Git Flow operations including branch creation, merging, validation, release management, and pull reques... |
| `git-workflow-manager` | Use this agent when you need to design, establish, or optimize Git workflows, branching strategies, and merge management for a project or team. Specif... |

### Category: `mcp-dev-team` (8 agents)

| Agent Name | Description |
| :--- | :--- |
| `mcp-deployment-orchestrator` | MCP server deployment and operations specialist. Use PROACTIVELY for containerization, Kubernetes deployments, autoscaling, monitoring, security harde... |
| `mcp-developer` | Use this agent when you need to build, debug, or optimize Model Context Protocol (MCP) servers and clients that connect AI systems to external tools a... |
| `mcp-integration-engineer` | MCP server integration and orchestration specialist. Use PROACTIVELY for client-server integration, multi-server orchestration, workflow automation, a... |
| `mcp-protocol-specialist` | MCP protocol specification and standards specialist. Use PROACTIVELY for protocol design, specification compliance, transport implementation, and main... |
| `mcp-registry-navigator` | MCP registry discovery and integration specialist. Use PROACTIVELY for finding servers, evaluating capabilities, generating configurations, and publis... |
| `mcp-security-auditor` | MCP server security specialist. Use PROACTIVELY for security reviews, OAuth implementation, RBAC design, compliance frameworks, and vulnerability asse... |
| `mcp-server-architect` | MCP server architecture and implementation specialist. Use PROACTIVELY for designing servers, implementing transport layers, tool definitions, complet... |
| `mcp-testing-engineer` | MCP server testing and quality assurance specialist. Use PROACTIVELY for protocol compliance, security testing, performance evaluation, and debugging ... |

### Category: `modernization` (3 agents)

| Agent Name | Description |
| :--- | :--- |
| `architecture-modernizer` | Software architecture modernization specialist. Use PROACTIVELY for monolith decomposition, microservices design, event-driven architecture, and scala... |
| `cloud-migration-specialist` | Cloud migration and infrastructure modernization specialist. Use PROACTIVELY for on-premise to cloud migrations, containerization, serverless adoption... |
| `legacy-modernizer` | Use this agent when modernizing legacy systems that need incremental migration strategies, technical debt reduction, and risk mitigation while maintai... |

### Category: `obsidian-ops-team` (7 agents)

| Agent Name | Description |
| :--- | :--- |
| `connection-agent` | Obsidian vault connection specialist. Use PROACTIVELY for analyzing and suggesting links between related content, identifying orphaned notes, and crea... |
| `content-curator` | Obsidian content curation and quality specialist. Use PROACTIVELY for identifying outdated content, suggesting content improvements, consolidating sim... |
| `metadata-agent` | Obsidian metadata management specialist. Use PROACTIVELY for frontmatter standardization, metadata addition, and ensuring consistent file metadata acr... |
| `moc-agent` | Obsidian Map of Content specialist. Use PROACTIVELY when a vault needs new MOCs created, existing MOCs updated, orphaned assets organized, or the over... |
| `review-agent` | Obsidian vault quality assurance specialist. Use PROACTIVELY for cross-checking enhancement work, validating consistency, and ensuring quality across ... |
| `tag-agent` | Obsidian tag taxonomy specialist. Use PROACTIVELY for normalizing and hierarchically organizing tag taxonomy, consolidating duplicates, and maintainin... |
| `vault-optimizer` | Obsidian vault performance optimization specialist. Use PROACTIVELY for analyzing vault performance, optimizing file sizes, managing large attachments... |

### Category: `ocr-extraction-team` (7 agents)

| Agent Name | Description |
| :--- | :--- |
| `document-structure-analyzer` | Document structure analysis specialist. Use PROACTIVELY for identifying document layouts, analyzing content hierarchy, and mapping visual elements to ... |
| `markdown-syntax-formatter` | Markdown formatting specialist. Use PROACTIVELY for converting text to proper markdown syntax, fixing formatting issues, and ensuring consistent docum... |
| `ocr-grammar-fixer` | OCR text correction specialist. Use PROACTIVELY for cleaning up and correcting OCR-processed text, fixing character recognition errors, and ensuring p... |
| `ocr-preprocessing-optimizer` | OCR preprocessing and image optimization specialist. Use PROACTIVELY for image enhancement, noise reduction, skew correction, and optimizing image qua... |
| `ocr-quality-assurance` | OCR pipeline validation specialist. Use PROACTIVELY for final review and validation of OCR-corrected text against original sources, ensuring accuracy ... |
| `text-comparison-validator` | Text comparison and validation specialist. Use PROACTIVELY for comparing extracted text with existing files, detecting discrepancies, and ensuring acc... |
| `visual-analysis-ocr` | Visual analysis and OCR specialist. Use PROACTIVELY for extracting and analyzing text content from images while preserving formatting, structure, and ... |

### Category: `performance-testing` (5 agents)

| Agent Name | Description |
| :--- | :--- |
| `load-testing-specialist` | Load testing and stress testing specialist. Use PROACTIVELY for creating comprehensive load test scenarios, analyzing performance under stress, and id... |
| `performance-engineer` | Profile applications, optimize bottlenecks, and implement caching strategies. Handles load testing, CDN setup, and query optimization. Use PROACTIVELY... |
| `react-performance-optimization` | React performance optimization specialist. Use PROACTIVELY for identifying and fixing performance bottlenecks, bundle optimization, rendering optimiza... |
| `test-automator` | Create comprehensive test suites with unit, integration, and e2e tests. Sets up CI pipelines, mocking strategies, and test data. Use PROACTIVELY for t... |
| `web-vitals-optimizer` | Core Web Vitals optimization specialist. Use PROACTIVELY for improving LCP, FID, CLS, and other web performance metrics to enhance user experience and... |

### Category: `podcast-creator-team` (11 agents)

| Agent Name | Description |
| :--- | :--- |
| `academic-research-synthesizer` | Academic research synthesis specialist. Use PROACTIVELY for comprehensive research on academic topics, literature reviews, technical investigations, a... |
| `comprehensive-researcher` | Comprehensive research specialist. Use PROACTIVELY for in-depth research on any topic, requiring multiple sources, cross-verification, and structured ... |
| `episode-orchestrator` | Episode workflow orchestrator. Use PROACTIVELY for managing episode-based workflows that coordinate multiple specialized agents in sequence, with payl... |
| `guest-outreach-coordinator` | Podcast guest outreach and coordination specialist. Use PROACTIVELY for guest research, outreach templates, interview scheduling, pre-interview prepar... |
| `market-research-analyst` | Market research and competitive analysis specialist. Use PROACTIVELY for comprehensive market intelligence, industry trends, competitive analysis, and... |
| `podcast-editor` | Podcast editing and post-production specialist. Use PROACTIVELY for audio editing guidance, show notes creation, chapter markers, timestamp management... |
| `podcast-trend-scout` | Podcast trend analysis specialist. Use PROACTIVELY for identifying emerging tech topics, breaking developments, and timely content suggestions for pod... |
| `project-supervisor-orchestrator` | Project workflow orchestrator. Use PROACTIVELY for managing complex multi-step workflows that coordinate multiple specialized agents in sequence with ... |
| `seo-podcast-optimizer` | SEO podcast optimization specialist. Use PROACTIVELY for creating SEO-friendly titles, meta descriptions, and identifying relevant keywords for podcas... |
| `social-media-copywriter` | Social media content creation specialist. Use PROACTIVELY for creating Twitter threads, LinkedIn posts, and Instagram captions from podcast episode in... |
| `twitter-ai-influencer-manager` | Twitter AI influencer engagement specialist. Use PROACTIVELY for interacting with AI thought leaders, posting AI-focused tweets, analyzing influencer ... |

### Category: `programming-languages` (50 agents)

| Agent Name | Description |
| :--- | :--- |
| `angular-architect` | Use when architecting enterprise Angular 15+ applications with complex state management, optimizing RxJS patterns, designing micro-frontend systems, o... |
| `c-pro` | Write efficient C code with proper memory management, pointer arithmetic, and system calls. Handles embedded systems, kernel modules, and performance-... |
| `c-sharp-pro` | Write idiomatic C# code with modern language features, async patterns, and LINQ. Masters .NET ecosystem, Entity Framework Core, and ASP.NET Core. Use ... |
| `cpp-pro` | Use this agent when building high-performance C++ systems requiring modern C++20/23 features, template metaprogramming, or zero-overhead abstractions ... |
| `csharp-developer` | Use this agent when building ASP.NET Core web APIs, cloud-native .NET solutions, or modern C# applications requiring async patterns, dependency inject... |
| `csharp-dotnet-janitor` | Perform janitorial tasks on C#/.NET code including cleanup, modernization, and tech debt remediation. |
| `csharp-mcp-expert` | Expert assistant for developing Model Context Protocol (MCP) servers in C# |
| `CSharpExpert` | An agent designed to assist with software development tasks for .NET projects. |
| `diffblue-cover` | Expert agent for creating unit tests for java applications using Diffblue Cover. |
| `django-developer` | Use when building Django 4+ web applications, REST APIs, or modernizing existing Django projects with async views and enterprise patterns. Specificall... |
| `dotnet-core-expert` | Use when building .NET Core applications requiring cloud-native architecture, high-performance microservices, modern C# patterns, or cross-platform de... |
| `dotnet-framework-4.8-expert` | Use this agent when working on legacy .NET Framework 4.8 enterprise applications that require maintenance, modernization, or integration with Windows-... |
| `elixir-expert` | Use this agent when you need to build fault-tolerant, concurrent systems leveraging OTP patterns, GenServer architectures, and Phoenix framework for r... |
| `embedded-systems` | Use when developing firmware for resource-constrained microcontrollers, implementing RTOS-based applications, or optimizing real-time systems where ha... |
| `expert-cpp-software-engineer` | Provide expert C++ software engineering guidance using modern C++ and industry best practices. |
| `flutter-expert` | Use when building cross-platform mobile applications with Flutter 3+ that require custom UI implementation, complex state management, native platform ... |
| `go-mcp-expert` | Expert assistant for building Model Context Protocol (MCP) servers in Go using the official SDK. |
| `golang-pro` | Use when building Go applications requiring concurrent programming, high-performance systems, microservices, or cloud-native architectures where idiom... |
| `iot-engineer` | Use when designing and deploying IoT solutions requiring expertise in device management, edge computing, cloud integration, and handling challenges li... |
| `java-architect` | Use this agent when designing enterprise Java architectures, migrating Spring Boot applications, or establishing microservices patterns for scalable c... |
| `javascript-pro` | Use this agent when you need to build, optimize, or refactor modern JavaScript code for browser, Node.js, or full-stack applications requiring ES2025 ... |
| `kotlin-specialist` | Use when building Kotlin applications requiring advanced coroutine patterns, multiplatform code sharing, or Android/server-side development with funct... |
| `laravel-specialist` | Use when building Laravel 10+ applications, architecting Eloquent models with complex relationships, implementing queue systems for async processing, ... |
| `microsoft-agent-framework-python` | Create, update, refactor, explain or work with code using the Python version of Microsoft Agent Framework. |
| `mongodb-performance-advisor` | Analyze MongoDB database performance, offer query and index optimization insights and provide actionable recommendations to improve overall usage of t... |
| `nextjs-developer` | Use this agent when building production Next.js 14+ applications that require full-stack development with App Router, server components, and advanced ... |
| `php-pro` | Use this agent when working with PHP 8.3+ projects that require strict typing, modern language features, and enterprise framework expertise (Laravel o... |
| `powershell-5.1-expert` | Use when automating Windows infrastructure tasks requiring PowerShell 5.1 scripts with RSAT modules for Active Directory, DNS, DHCP, GPO management, o... |
| `powershell-7-expert` | Use when building cross-platform cloud automation scripts, Azure infrastructure orchestration, or CI/CD pipelines requiring PowerShell 7+ with modern ... |
| `powershell-module-architect` | Use this agent when architecting and refactoring PowerShell modules, designing profile systems, or creating cross-version compatible automation librar... |
| `powershell-ui-architect` | Use when designing or building desktop graphical interfaces (WinForms, WPF, Metro-style dashboards) or terminal user interfaces (TUIs) for PowerShell ... |
| `python-mcp-expert` | Expert assistant for developing Model Context Protocol (MCP) servers in Python |
| `python-pro` | Use this agent when you need to build type-safe, production-ready Python code for web APIs, system utilities, or complex applications requiring modern... |
| `rails-expert` | Use when building or modernizing Rails applications requiring full-stack development, Hotwire reactivity, real-time features, or Rails-idiomatic patte... |
| `react-specialist` | Use when optimizing existing React applications for performance, implementing advanced React 19+ features, or solving complex state management and arc... |
| `README` |  |
| `ruby-mcp-expert` | Expert assistance for building Model Context Protocol servers in Ruby using the official MCP Ruby SDK gem with Rails integration. |
| `rust-engineer` | Use when building Rust systems where memory safety, ownership patterns, zero-cost abstractions, and performance optimization are critical for systems ... |
| `rust-gpt-4.1-beast-mode` | Rust GPT-4.1 Coding Beast Mode for VS Code |
| `rust-mcp-expert` | Expert assistant for Rust MCP server development using the rmcp SDK with tokio async runtime |
| `rust-pro` | Write idiomatic Rust with ownership patterns, lifetimes, and trait implementations. Masters async/await, safe concurrency, and zero-cost abstractions.... |
| `semantic-kernel-python` | Create, update, refactor, explain or work with code using the Python version of Semantic Kernel. |
| `shell-scripting-pro` | Write robust shell scripts with proper error handling, POSIX compliance, and automation patterns. Masters bash/zsh features, process management, and s... |
| `spring-boot-engineer` | Use this agent when building enterprise Spring Boot 3+ applications requiring microservices architecture, cloud-native deployment, or reactive program... |
| `sql-pro` | Use this agent when you need to optimize complex SQL queries, design efficient database schemas, or solve performance issues across PostgreSQL, MySQL,... |
| `swift-expert` | Use this agent when building native iOS, macOS, or server-side Swift applications requiring advanced concurrency patterns, protocol-oriented architect... |
| `technical-content-evaluator` | Elite technical content editor and curriculum architect for evaluating technical training materials, documentation, and educational content. Reviews f... |
| `typescript-mcp-expert` | Expert assistant for developing Model Context Protocol (MCP) servers in TypeScript |
| `typescript-pro` | Use when implementing TypeScript code requiring advanced type system patterns, complex generics, type-level programming, or end-to-end type safety acr... |
| `vue-expert` | Use this agent when building Vue 3 applications that require Composition API mastery, reactivity optimization, or Nuxt 3 development with enterprise-s... |

### Category: `realtime` (2 agents)

| Agent Name | Description |
| :--- | :--- |
| `supabase-realtime-optimizer` | Supabase realtime performance specialist. Use PROACTIVELY to optimize realtime subscriptions, debug connection issues, and improve realtime applicatio... |
| `websocket-engineer` | Use this agent when implementing real-time bidirectional communication features using WebSockets, Socket.IO, or similar technologies at scale. Specifi... |

### Category: `security` (25 agents)

| Agent Name | Description |
| :--- | :--- |
| `ad-security-reviewer` | Use this agent when you need to audit Active Directory security posture, evaluate privilege escalation risks, review identity delegation patterns, or ... |
| `ai-agent-audit-specialist` | Use this agent when you need to design, validate, or harden forensic audit trails for AI coding agents (Claude Code, Cursor, Codex CLI, Aider) operati... |
| `api-security-audit` | API security audit specialist. Use PROACTIVELY for REST API security audits, authentication vulnerabilities, authorization flaws, injection attacks, a... |
| `comet-opik` | Unified Comet Opik agent for instrumenting LLM apps, managing prompts/projects, auditing prompts, and investigating traces/metrics via the latest Opik... |
| `compliance-auditor` | Use this agent when you need to achieve regulatory compliance, implement compliance controls, or prepare for audits across frameworks like GDPR, HIPAA... |
| `compliance-specialist` | Security compliance and regulatory framework specialist. Use PROACTIVELY for compliance assessments, regulatory requirements, audit preparation, and g... |
| `dynatrace-expert` | The Dynatrace Expert Agent integrates observability and security capabilities directly into GitHub workflows, enabling development teams to investigat... |
| `elasticsearch-observability` | Our expert AI assistant for debugging code (O11y), optimizing vector search (RAG), and remediating security threats using live Elastic data. |
| `github-actions-expert` | GitHub Actions specialist focused on secure CI/CD workflows, action pinning, OIDC authentication, permissions least privilege, and supply-chain securi... |
| `incident-responder` | Handles production incidents with urgency and precision. Use IMMEDIATELY when production issues occur. Coordinates debugging, implements fixes, and do... |
| `jfrog-sec` | The dedicated Application Security agent for automated security remediation. Verifies package and version compliance, and suggests vulnerability fixes... |
| `llm-redteam-specialist` | Use this agent when you need to red-team a Large Language Model deployment — jailbreak probes, prompt injection harness design, output-safety evaluati... |
| `penetration-tester` | Use this agent when you need to conduct authorized security penetration tests to identify real vulnerabilities through active exploitation and validat... |
| `platform-sre-kubernetes` | SRE-focused Kubernetes specialist prioritizing reliability, safe rollouts/rollbacks, security defaults, and operational verification for production-gr... |
| `powershell-security-hardening` | Use this agent when you need to harden PowerShell automation, secure remoting configuration, enforce least-privilege design, or align scripts with ent... |
| `read-only-auditor` | Use this agent when you need a security audit that is guaranteed to make no changes to the codebase. This agent has hooks in its frontmatter that bloc... |
| `repo-publication-auditor` | Use this agent before a repository becomes public — a first release, an internal project being open-sourced, or a private repo about to be flipped. It... |
| `se-security-reviewer` | Security-focused code review specialist with OWASP Top 10, Zero Trust, LLM security, and enterprise security standards |
| `security-auditor` | Use this agent when conducting comprehensive security audits, compliance assessments, or risk evaluations across systems, infrastructure, and processe... |
| `security-engineer` | Use this agent when implementing comprehensive security solutions across infrastructure, building automated security controls into CI/CD pipelines, or... |
| `stackhawk-security-onboarding` | Automatically set up StackHawk security testing for your repository with generated configuration and GitHub Actions workflow |
| `supply-chain-security` |  |
| `tdd-refactor` | Improve code quality, apply security best practices, and enhance design whilst maintaining green tests and GitHub issue compliance. |
| `terraform` | Terraform infrastructure specialist with automated HCP Terraform workflows. Leverages Terraform MCP server for registry integration, workspace managem... |
| `wg-code-sentinel` | Ask WG Code Sentinel to review your code for security issues. |

### Category: `ui-analysis` (5 agents)

| Agent Name | Description |
| :--- | :--- |
| `screenshot-business-analyzer` | Extracts business logic, functional modules, and data entities from UI screenshots |
| `screenshot-interaction-analyzer` | Analyzes user interaction flows, clickable elements, and state transitions from UI screenshots |
| `screenshot-reviewer` | Reviews synthesized task lists for completeness, consistency, and quality |
| `screenshot-synthesizer` | Synthesizes analysis results from multiple agents into a unified feature list and task breakdown |
| `screenshot-ui-analyzer` | Analyzes visual components, layout structure, and design patterns from UI screenshots |

### Category: `web-tools` (16 agents)

| Agent Name | Description |
| :--- | :--- |
| `accessibility` | Expert assistant for web accessibility (WCAG 2.1/2.2), inclusive UX, and a11y testing |
| `aem-frontend-specialist` | Expert assistant for developing AEM components using HTL, Tailwind CSS, and Figma-to-code workflows with design system integration |
| `electron-angular-native` | Code Review Mode tailored for Electron app with Node.js backend (main), Angular frontend (render), and native integration layer (e.g., AppleScript, sh... |
| `expert-nextjs-developer` | Expert Next.js 16 developer specializing in App Router, Server Components, Cache Components, Turbopack, and modern React patterns with TypeScript |
| `expert-react-frontend-engineer` | Expert React 19.2 frontend engineer specializing in modern hooks, Server Components, Actions, TypeScript, and performance optimization |
| `java-mcp-expert` | Expert assistance for building Model Context Protocol servers in Java using reactive streams, the official MCP Java SDK, and Spring Boot integration. |
| `lingodotdev-i18n` | Expert at implementing internationalization (i18n) in web applications using a systematic, checklist-driven approach. |
| `nextjs-architecture-expert` | Master of Next.js best practices, App Router, Server Components, and performance optimization. Use PROACTIVELY for Next.js architecture decisions, mig... |
| `react-performance-optimizer` | Specialist in React performance patterns, bundle optimization, and Core Web Vitals. Use PROACTIVELY for React app performance tuning, rendering optimi... |
| `se-responsible-ai-code` | Responsible AI specialist ensuring AI works for everyone through bias prevention, accessibility compliance, ethical development, and inclusive design |
| `search-ai-optimization-expert` | Expert guidance for modern search optimization: SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) with AI-ready content ... |
| `seo-analyzer` | SEO analysis and optimization specialist. Use PROACTIVELY for technical SEO audits, meta tag optimization, performance analysis, and search engine opt... |
| `url-context-validator` | URL validation and contextual analysis specialist. Use PROACTIVELY for validating links not just for functionality but also for contextual appropriate... |
| `url-link-extractor` | URL and link extraction specialist. Use PROACTIVELY for finding, extracting, and cataloging all URLs and links within website codebases, including int... |
| `web-accessibility-checker` | Web accessibility compliance specialist. Use PROACTIVELY for WCAG compliance audits, accessibility testing, screen reader compatibility, and inclusive... |
| `wordpress-master` | Use this agent when you need to architect, optimize, or troubleshoot WordPress implementations ranging from custom theme/plugin development to enterpr... |

---

## 3. Commands (285 Total)

### Category: `automation` (5 commands)

| Command | Description |
| :--- | :--- |
| `/act` | Execute GitHub Actions locally using act |
| `/ci-pipeline` | Manage and automate CI/CD pipeline configuration with GitHub Actions, multi-environment support, and deployment strategies |
| `/husky` | Run comprehensive CI checks and fix issues until repository is in working state |
| `/szamlazz` | Issue, cancel, and fetch Hungarian invoices via the szamlazz.hu Agent API — with NAV taxpayer lookup and automatic partner cache |
| `/workflow-orchestrator` | Orchestrate complex automation workflows with task dependencies, scheduling, and cross-platform execution |

### Category: `azure` (2 commands)

| Command | Description |
| :--- | :--- |
| `/appinsights-instrumentation` | Instrument a webapp to send useful telemetry data to Azure App Insights |
| `/azure-role-selector` | When user is asking for guidance for which role to assign to an identity given desired permissions, this agent helps them understand the role that wil... |

### Category: `database` (9 commands)

| Command | Description |
| :--- | :--- |
| `/snowflake-semanticview` | Create, alter, and validate Snowflake semantic views using Snowflake CLI (snow). Use when asked to build or troubleshoot semantic views/semantic layer... |
| `/supabase-backup-manager` | Manage Supabase database backups with automated scheduling and recovery procedures |
| `/supabase-data-explorer` | Explore and analyze Supabase database data with intelligent querying and visualization |
| `/supabase-migration-assistant` | Generate and manage Supabase database migrations with automated testing and validation |
| `/supabase-performance-optimizer` | Optimize Supabase database performance with intelligent analysis and recommendations |
| `/supabase-realtime-monitor` | Monitor and optimize Supabase realtime connections with performance analysis and debugging |
| `/supabase-schema-sync` | Synchronize database schema with Supabase using MCP integration |
| `/supabase-security-audit` | Conduct comprehensive Supabase security audit with RLS analysis and vulnerability assessment |
| `/supabase-type-generator` | Generate TypeScript types from Supabase schema with automatic synchronization and validation |

### Category: `deployment` (11 commands)

| Command | Description |
| :--- | :--- |
| `/add-changelog` | Generate and maintain project changelog with Keep a Changelog format |
| `/blue-green-deployment` | Implement blue-green deployment strategy with zero-downtime switching, health validation, and automatic rollback |
| `/changelog-demo-command` | Demonstrate changelog automation features with real examples and validation |
| `/ci-setup` | Setup comprehensive CI/CD pipeline with automated testing, building, and deployment |
| `/containerize-application` | Containerize application with optimized Docker configuration, security, and multi-stage builds |
| `/deployment-monitoring` | Comprehensive deployment monitoring with observability, alerting, health checks, and performance tracking |
| `/hotfix-deploy` | Deploy critical hotfixes with emergency procedures, validation, and rollback capabilities |
| `/prepare-release` | Prepare and validate release packages with comprehensive testing, documentation, and automation |
| `/rollback-deploy` | Rollback deployment to previous version with safety checks, database considerations, and monitoring |
| `/setup-automated-releases` | Setup automated release workflows with semantic versioning, conventional commits, and comprehensive automation |
| `/setup-kubernetes-deployment` | Configure comprehensive Kubernetes deployment with manifests, security, scaling, and production best practices |

### Category: `design` (1 commands)

| Command | Description |
| :--- | :--- |
| `/web-design-reviewer` | This skill enables visual inspection of websites running locally or remotely to identify and fix design issues. Triggers on requests like "review webs... |

### Category: `documentation` (10 commands)

| Command | Description |
| :--- | :--- |
| `/create-architecture-documentation` | Generate comprehensive architecture documentation with diagrams, ADRs, and interactive visualization |
| `/create-onboarding-guide` | Create comprehensive developer onboarding guide with environment setup, workflows, and interactive tutorials |
| `/doc-api` | Generate comprehensive API documentation from code with interactive examples and testing capabilities |
| `/docs-maintenance` | Use PROACTIVELY to implement comprehensive documentation maintenance systems with quality assurance, validation, and automated updates |
| `/generate-api-documentation` | Auto-generate API reference documentation with multiple output formats and automated deployment |
| `/interactive-documentation` | Use PROACTIVELY to create interactive documentation platforms with live examples, code playgrounds, and user engagement features |
| `/load-llms-txt` | Load and process external documentation context from llms.txt files or custom sources |
| `/migration-guide` | Create comprehensive migration guides with step-by-step procedures, validation, and rollback strategies |
| `/troubleshooting-guide` | Generate systematic troubleshooting documentation with diagnostic procedures, common issues, and automated solutions |
| `/update-docs` | Systematically update project documentation with implementation status, API changes, and synchronized content |

### Category: `doordash` (5 commands)

| Command | Description |
| :--- | :--- |
| `/doordash-budget` | View DoorDash spend vs caps, edit the dd-guard spending policy interactively, and reconcile the intent ledger against real order history |
| `/doordash-lunch` | Team lunch orchestration via DoorDash CLI - build a group round, emit checkout with split table, track payer rotation |
| `/doordash-playbook` | Manage saved DoorDash order playbooks (list, add from order history, remove, inspect) stored in ~/.claude/dd-cli/playbooks.json |
| `/doordash-profile` | Manage the dietary profile (allergens with severity tiers, diets, dislikes) used by doordash-allergy-shield to vet DoorDash carts |
| `/doordash-report` | Spend and activity report for agent-driven DoorDash ordering - reconciles the audit log against real order history and renders totals, per-restaurant ... |

### Category: `game-development` (5 commands)

| Command | Description |
| :--- | :--- |
| `/game-analytics-integration` | Use PROACTIVELY to implement game analytics systems with player behavior tracking, performance monitoring, and business intelligence integration |
| `/game-asset-pipeline` | Use PROACTIVELY to build automated game asset processing pipelines with optimization, validation, and multi-platform delivery systems |
| `/game-performance-profiler` | Use PROACTIVELY to analyze game performance bottlenecks and generate optimization recommendations across multiple platforms |
| `/game-testing-framework` | Use PROACTIVELY to implement comprehensive game testing frameworks with automated validation, performance testing, and multi-platform verification |
| `/unity-project-setup` | Use PROACTIVELY to set up professional Unity game development projects with industry-standard structure, essential packages, and platform-optimized co... |

### Category: `git` (5 commands)

| Command | Description |
| :--- | :--- |
| `/feature` | Create a new Git Flow feature branch from develop with proper naming and tracking |
| `/finish` | Complete and merge current Git Flow branch (feature/release/hotfix) with proper cleanup and tagging |
| `/flow-status` | Display comprehensive Git Flow status including branch type, sync status, changes, and merge targets |
| `/hotfix` | Create a new Git Flow hotfix branch from main for emergency production fixes |
| `/release` | Create a new Git Flow release branch from develop with version bumping and changelog generation |

### Category: `git-workflow` (14 commands)

| Command | Description |
| :--- | :--- |
| `/branch-cleanup` | Use PROACTIVELY to clean up merged branches, stale remotes, and organize branch structure |
| `/commit` | Create well-formatted commits with conventional commit format and emoji |
| `/create-pr` |  |
| `/create-pull-request` |  |
| `/create-worktrees` |  |
| `/fix-github-issue` |  |
| `/gemini-review` | Transform Gemini Code Assist PR reviews into prioritized TodoLists with automated execution |
| `/git-bisect-helper` | Use PROACTIVELY to guide automated git bisect sessions for finding regression commits with smart test execution |
| `/pr-review` |  |
| `/update-branch-name` |  |
| `/worktree-check` | Check current worktree status, branch, and assigned task |
| `/worktree-cleanup` | Clean up merged worktrees and their branches |
| `/worktree-deliver` | Commit, push, and create PR from the current worktree |
| `/worktree-init` | Create parallel worktrees for multi-task development with Ghostty panels |

### Category: `google-workspace` (47 commands)

| Command | Description |
| :--- | :--- |
| `/gws-admin-reports` | Google Workspace Admin SDK: Audit logs and usage reports. |
| `/gws-admin` | Google Workspace Admin SDK: Manage users, groups, and devices. |
| `/gws-alertcenter` | Google Workspace Alert Center: Manage Workspace security alerts. |
| `/gws-apps-script-push` | Google Apps Script: Upload local files to an Apps Script project. |
| `/gws-apps-script` | Google Apps Script: Manage and execute Apps Script projects. |
| `/gws-calendar-agenda` | Google Calendar: Show upcoming events across all calendars. |
| `/gws-calendar-insert` | Google Calendar: Create a new event. |
| `/gws-calendar` | Google Calendar: Manage calendars and events. |
| `/gws-chat-send` | Google Chat: Send a message to a space. |
| `/gws-chat` | Google Chat: Manage Chat spaces and messages. |
| `/gws-classroom` | Google Classroom: Manage classes, rosters, and coursework. |
| `/gws-cloudidentity` | Google Cloud Identity: Manage identity groups and memberships. |
| `/gws-docs-write` | Google Docs: Append text to a document. |
| `/gws-docs` | Read and write Google Docs. |
| `/gws-drive-upload` | Google Drive: Upload a file with automatic metadata. |
| `/gws-drive` | Google Drive: Manage files, folders, and shared drives. |
| `/gws-events-renew` | Google Workspace Events: Renew/reactivate Workspace Events subscriptions. |
| `/gws-events-subscribe` | Google Workspace Events: Subscribe to Workspace events and stream them as NDJSON. |
| `/gws-events` | Subscribe to Google Workspace events. |
| `/gws-forms` | Read and write Google Forms. |
| `/gws-gmail-send` | Gmail: Send an email. |
| `/gws-gmail-triage` | Gmail: Show unread inbox summary (sender, subject, date). |
| `/gws-gmail-watch` | Gmail: Watch for new emails and stream them as NDJSON. |
| `/gws-gmail` | Gmail: Send, read, and manage email. |
| `/gws-groupssettings` | Manage Google Groups settings. |
| `/gws-keep` | Manage Google Keep notes. |
| `/gws-licensing` | Google Workspace Enterprise License Manager: Manage product licenses. |
| `/gws-meet` | Manage Google Meet conferences. |
| `/gws-modelarmor-create-template` | Google Model Armor: Create a new Model Armor template. |
| `/gws-modelarmor-sanitize-prompt` | Google Model Armor: Sanitize a user prompt through a Model Armor template. |
| `/gws-modelarmor-sanitize-response` | Google Model Armor: Sanitize a model response through a Model Armor template. |
| `/gws-modelarmor` | Google Model Armor: Filter user-generated content for safety. |
| `/gws-people` | Google People: Manage contacts and profiles. |
| `/gws-reseller` | Google Workspace Reseller: Manage Workspace subscriptions. |
| `/gws-shared` | gws CLI: Shared patterns for authentication, global flags, and output formatting. |
| `/gws-sheets-append` | Google Sheets: Append a row to a spreadsheet. |
| `/gws-sheets-read` | Google Sheets: Read values from a spreadsheet. |
| `/gws-sheets` | Google Sheets: Read and write spreadsheets. |
| `/gws-slides` | Google Slides: Read and write presentations. |
| `/gws-tasks` | Google Tasks: Manage task lists and tasks. |
| `/gws-vault` | Google Vault: Manage eDiscovery holds and exports. |
| `/gws-workflow-email-to-task` | Google Workflow: Convert a Gmail message into a Google Tasks entry. |
| `/gws-workflow-file-announce` | Google Workflow: Announce a Drive file in a Chat space. |
| `/gws-workflow-meeting-prep` | Google Workflow: Prepare for your next meeting: agenda, attendees, and linked docs. |
| `/gws-workflow-standup-report` | Google Workflow: Today's meetings + open tasks as a standup summary. |
| `/gws-workflow-weekly-digest` | Google Workflow: Weekly summary: this week's meetings + unread email count. |
| `/gws-workflow` | Google Workflow: Cross-service productivity workflows. |

### Category: `marketing` (5 commands)

| Command | Description |
| :--- | :--- |
| `/publisher-all` | Generate content for ALL platforms at once (X, LinkedIn, Medium, Dev.to) |
| `/publisher-devto` | Generate Dev.to RSS feed from all blog posts for automatic syndication |
| `/publisher-linkedin` | Generate LinkedIn posts from blog content with automatic media attachment via LinkedIn API |
| `/publisher-medium` | Convert blog posts to Medium-ready HTML format with image upload markers |
| `/publisher-x` | Generate copy-pastable X/Twitter threads from blog posts, articles, PDFs, or URLs with 3 format options |

### Category: `nextjs-vercel` (10 commands)

| Command | Description |
| :--- | :--- |
| `/nextjs-api-tester` | Test and validate Next.js API routes with comprehensive test scenarios |
| `/nextjs-bundle-analyzer` | Analyze and optimize Next.js bundle size with detailed recommendations |
| `/nextjs-component-generator` | Generate optimized React components for Next.js with TypeScript and best practices |
| `/nextjs-middleware-creator` | Create optimized Next.js middleware with authentication, rate limiting, and routing logic |
| `/nextjs-migration-helper` | Comprehensive Next.js migration assistant for Pages Router to App Router, JavaScript to TypeScript, and modern patterns |
| `/nextjs-performance-audit` | Comprehensive Next.js performance audit with actionable optimization recommendations |
| `/nextjs-scaffold` | Create a new Next.js application with best practices and optimal configuration |
| `/vercel-deploy-optimize` | Optimize and deploy Next.js application to Vercel with performance monitoring |
| `/vercel-edge-function` | Generate optimized Vercel Edge Functions with geolocation, authentication, and data transformation |
| `/vercel-env-sync` | Synchronize environment variables between local development and Vercel deployments |

### Category: `orchestration` (15 commands)

| Command | Description |
| :--- | :--- |
| `/archive` |  |
| `/commit` |  |
| `/feature-analyzer` | Turn ideas into fully formed designs and specs through natural collaborative dialogue. Use before implementing new features or making significant chan... |
| `/feature-dev` | Guided feature development with codebase understanding and architecture focus |
| `/feature-pipeline` | Execute implementation tasks from a design document. Tasks are tracked as markdown checkboxes directly in the design file. |
| `/find` | security vulnerability" /task-find agent:dev-frontend /task-find blocks:TASK-001 ```  ### Date Ranges ``` /task-find --created "2024-03-10..2024-03-15... |
| `/log` |  |
| `/move` |  |
| `/optimize` |  |
| `/remove` |  |
| `/report` |  |
| `/resume` |  |
| `/start` |  |
| `/status` |  |
| `/sync` |  |

### Category: `performance` (10 commands)

| Command | Description |
| :--- | :--- |
| `/add-performance-monitoring` | Setup comprehensive application performance monitoring with metrics, alerting, and observability |
| `/implement-caching-strategy` | Design and implement comprehensive caching solutions for improved performance and scalability |
| `/optimize-api-performance` | Comprehensive API performance optimization with response time reduction, throughput improvement, and scalability enhancements |
| `/optimize-build` |  |
| `/optimize-bundle-size` | Reduce and optimize bundle sizes through analysis, configuration, and code splitting strategies |
| `/optimize-database-performance` | Optimize database queries, indexing, and performance for improved response times and scalability |
| `/optimize-memory-usage` | Comprehensive memory usage optimization with leak detection, garbage collection tuning, and memory profiling |
| `/performance-audit` | Comprehensive performance audit with metrics, bottleneck identification, and optimization recommendations |
| `/setup-cdn-optimization` | Configure CDN for optimal content delivery, caching, and global performance optimization |
| `/system-behavior-simulator` |  |

### Category: `project-management` (20 commands)

| Command | Description |
| :--- | :--- |
| `/add-package` | Add and configure new package to workspace with proper structure and dependencies |
| `/add-to-changelog` | Add entry to project changelog following Keep a Changelog format |
| `/create-feature` | Scaffold new feature with boilerplate code, tests, and documentation |
| `/create-jtbd` | Create Jobs-to-be-Done (JTBD) analysis for product features |
| `/create-prd` | Create Product Requirements Document (PRD) for new features |
| `/create-prp` | Create comprehensive Product Requirement Prompt (PRP) with research and validation |
| `/github-issues` | Create, update, and manage GitHub issues using MCP tools. Use this skill when users want to create bug reports, feature requests, or task issues, upda... |
| `/init-project` | Initialize new project with essential structure, configuration, and development environment setup |
| `/milestone-tracker` | Track and analyze project milestone progress with predictive analytics |
| `/nuget-manager` | Manage NuGet packages in .NET projects/solutions. Use this skill when adding, removing, or updating NuGet package versions. It enforces using `dotnet`... |
| `/pac-configure` | Initialize Product as Code (PAC) project structure with templates and configuration |
| `/pac-create-epic` | Create new PAC epic following Product as Code specification |
| `/pac-create-ticket` | Create new PAC ticket within an epic following Product as Code specification |
| `/pac-update-status` | Update PAC ticket status and track progress in Product as Code workflow |
| `/pac-validate` | Validate Product as Code project structure and files for PAC specification compliance |
| `/project-health-check` | Analyze overall project health and generate comprehensive metrics report |
| `/project-timeline-simulator` | Simulate project outcomes with variable modeling, risk assessment, and resource optimization |
| `/project-to-linear` | Sync project structure and requirements to Linear workspace with comprehensive task breakdown |
| `/release` | Prepare and execute project release with version management and changelog updates |
| `/todo` | Manage project todos in todos.md file |

### Category: `security` (6 commands)

| Command | Description |
| :--- | :--- |
| `/add-authentication-system` | Implement secure user authentication system with chosen method and security best practices |
| `/dependency-audit` | Audit dependencies for security vulnerabilities, license compliance, and update recommendations |
| `/penetration-test` | Perform penetration testing and vulnerability assessment on application |
| `/secrets-scanner` | Scan codebase for exposed secrets, credentials, and sensitive information |
| `/security-audit` | Perform comprehensive security assessment and vulnerability analysis |
| `/security-hardening` | Harden application security configuration with comprehensive security controls |

### Category: `setup` (15 commands)

| Command | Description |
| :--- | :--- |
| `/create-database-migrations` | Create and manage database migrations with proper versioning and rollback support |
| `/design-database-schema` | Design optimized database schemas with proper relationships, constraints, and performance considerations |
| `/design-rest-api` | Design RESTful API architecture with comprehensive endpoints, authentication, and documentation |
| `/implement-graphql-api` | Implement GraphQL API with comprehensive schema, resolvers, and real-time subscriptions |
| `/migrate-to-typescript` | Migrate JavaScript project to TypeScript with proper typing and tooling setup |
| `/setup-ci-cd-pipeline` | Setup comprehensive CI/CD pipeline with automated testing, deployment, and monitoring |
| `/setup-development-environment` | Setup comprehensive development environment with tools, configurations, and workflows |
| `/setup-docker-containers` | Setup Docker containerization with multi-stage builds and development workflows |
| `/setup-formatting` | Configure comprehensive code formatting tools with consistent style enforcement |
| `/setup-linting` | Configure comprehensive code linting and quality analysis tools with automated enforcement |
| `/setup-monitoring-observability` | Setup comprehensive monitoring and observability with metrics, logging, tracing, and alerting |
| `/setup-monorepo` | Configure monorepo project structure with comprehensive workspace management and build orchestration |
| `/setup-rate-limiting` | Implement comprehensive API rate limiting with advanced algorithms and user-specific policies |
| `/update-dependencies` | Update and modernize project dependencies with comprehensive testing and compatibility checks |
| `/vercel-analytics` | Set up Vercel Analytics and Speed Insights for React/Vite projects |

### Category: `simulation` (10 commands)

| Command | Description |
| :--- | :--- |
| `/business-scenario-explorer` | Explore multiple business timeline scenarios with comprehensive risk analysis and strategic optimization |
| `/constraint-modeler` | Model system constraints with validation, dependency mapping, and optimization strategies |
| `/decision-tree-explorer` | Explore complex decision branches with probability analysis, expected value calculation, and optimization |
| `/digital-twin-creator` | Create calibrated digital twins with real-world validation, scenario testing, and decision optimization |
| `/future-scenario-generator` | Generate comprehensive future scenarios with plausibility scoring, trend integration, and strategic implications |
| `/market-response-modeler` | Model comprehensive market and customer responses with segment analysis, behavioral prediction, and optimization |
| `/monte-carlo-simulator` | Run Monte Carlo simulations with probability distributions, confidence intervals, and statistical analysis |
| `/simulation-calibrator` | Calibrate simulation accuracy with systematic validation, bias detection, and continuous improvement |
| `/system-dynamics-modeler` | Model complex system dynamics with feedback loops, delays, and emergent behavior analysis |
| `/timeline-compressor` | Compress real-world timelines into rapid simulation cycles with accelerated learning and decision optimization |

### Category: `svelte` (16 commands)

| Command | Description |
| :--- | :--- |
| `/svelte-a11y` |  |
| `/svelte-component` | Create new Svelte components with best practices, TypeScript support, and testing |
| `/svelte-debug` |  |
| `/svelte-migrate` |  |
| `/svelte-optimize` |  |
| `/svelte-scaffold` |  |
| `/svelte-storybook-migrate` |  |
| `/svelte-storybook-mock` |  |
| `/svelte-storybook-setup` |  |
| `/svelte-storybook-story` | { |
| `/svelte-storybook-troubleshoot` |  |
| `/svelte-storybook` |  |
| `/svelte-test-coverage` |  |
| `/svelte-test-fix` |  |
| `/svelte-test-setup` |  |
| `/svelte-test` |  |

### Category: `sync` (14 commands)

| Command | Description |
| :--- | :--- |
| `/bidirectional-sync` | Enable comprehensive bidirectional GitHub-Linear synchronization with conflict resolution |
| `/bulk-import-issues` | Bulk import GitHub issues to Linear with comprehensive progress tracking and error handling |
| `/cross-reference-manager` | Manage cross-platform reference links between GitHub and Linear with integrity checking |
| `/issue-to-linear-task` | Convert individual GitHub issues to Linear tasks with comprehensive data preservation |
| `/linear-task-to-issue` | Convert Linear tasks to GitHub issues with relationship preservation and metadata mapping |
| `/sync-automation-setup` | Setup comprehensive automated synchronization workflows with monitoring and CI/CD integration |
| `/sync-conflict-resolver` | Resolve synchronization conflicts with intelligent strategies and automated resolution |
| `/sync-health-monitor` | Monitor and diagnose GitHub-Linear sync health with performance analytics and automated troubleshooting |
| `/sync-issues-to-linear` | Sync GitHub issues to Linear workspace with comprehensive field mapping and rate limit management |
| `/sync-linear-to-issues` | Sync Linear tasks to GitHub issues with state mapping and attachment handling |
| `/sync-migration-assistant` | Comprehensive migration assistant for large-scale GitHub-Linear data transitions with validation and rollback |
| `/sync-pr-to-task` | Link GitHub pull requests to Linear tasks with automated state synchronization and workflow integration |
| `/sync-status` | Monitor GitHub-Linear sync health status with performance metrics and diagnostics |
| `/task-from-pr` | Create Linear tasks from GitHub pull requests with intelligent content extraction and task sizing |

### Category: `team` (14 commands)

| Command | Description |
| :--- | :--- |
| `/architecture-review` | Comprehensive architecture review with design patterns analysis and improvement recommendations |
| `/decision-quality-analyzer` | Analyze team decision quality with bias detection, scenario testing, and process improvement recommendations |
| `/dependency-mapper` | Map project and task dependencies with critical path analysis and circular dependency detection |
| `/estimate-assistant` | Generate accurate task estimates using historical data, complexity analysis, and team velocity metrics |
| `/issue-triage` | Intelligent issue triage with automatic categorization, prioritization, and team assignment |
| `/memory-spring-cleaning` | Clean and organize project memory files with implementation synchronization and pattern updates |
| `/migration-assistant` | Comprehensive system migration assistance with planning, analysis, execution, and rollback capabilities |
| `/retrospective-analyzer` | Analyze team retrospectives with quantitative metrics and actionable insights generation |
| `/session-learning-capture` | Capture and document session learnings with automatic knowledge integration and memory updates |
| `/sprint-planning` | Plan and organize sprint workflows with Linear integration and capacity analysis |
| `/standup-report` | Generate comprehensive daily standup reports with team activity analysis and progress tracking |
| `/team-knowledge-mapper` | Map team knowledge and expertise with skill gap analysis and learning path recommendations |
| `/team-velocity-tracker` | Track and analyze team velocity with predictive forecasting and performance optimization recommendations |
| `/team-workload-balancer` | Analyze and optimize team workload distribution with skill matching and capacity planning |

### Category: `testing` (15 commands)

| Command | Description |
| :--- | :--- |
| `/add-mutation-testing` | Setup comprehensive mutation testing with framework selection and CI integration |
| `/add-property-based-testing` | Implement property-based testing with framework selection and invariant identification |
| `/e2e-setup` | Configure comprehensive end-to-end testing suite with framework selection and CI integration |
| `/generate-test-cases` | Generate comprehensive test cases with automatic analysis and coverage optimization |
| `/generate-tests` | Generate a complete test file for a specified source file or component. Use when the user explicitly asks to write, create, or generate tests for a sp... |
| `/setup-comprehensive-testing` | Setup complete testing infrastructure with framework configuration and CI integration |
| `/setup-load-testing` | Configure comprehensive load testing with performance metrics and bottleneck identification |
| `/setup-visual-testing` | Setup comprehensive visual regression testing with cross-browser and responsive testing |
| `/test-automation-orchestrator` | Orchestrate comprehensive test automation with intelligent execution and optimization |
| `/test-changelog-automation` | Automate changelog testing workflow with CI integration and validation |
| `/test-coverage` | Analyze and improve test coverage with comprehensive reporting and gap identification |
| `/test-quality-analyzer` | Analyze test suite quality with comprehensive metrics and improvement recommendations |
| `/testing_plan_integration` | Create comprehensive integration testing plan with inline tests and refactoring recommendations |
| `/webapp-testing` | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, ca... |
| `/write-tests` | Write comprehensive unit and integration tests with proper mocking and coverage |

### Category: `utilities` (21 commands)

| Command | Description |
| :--- | :--- |
| `/all-tools` |  |
| `/architecture-scenario-explorer` |  |
| `/check-file` |  |
| `/clean-branches` |  |
| `/clean` |  |
| `/cleanup-cache` | Clean system caches (npm, Homebrew, Yarn, browsers, Python/ML) to free disk space |
| `/code-permutation-tester` |  |
| `/code-review` | Comprehensive code quality review with security, performance, and architecture analysis |
| `/code-to-task` | , |
| `/context-prime` |  |
| `/debug-error` |  |
| `/directory-deep-dive` |  |
| `/explain-code` |  |
| `/fix-issue` | Fixes #$ARGUMENTS"     - Provide a clear description of the changes and testing performed     - Add appropriate labels and reviewers  12. **Follow-up*... |
| `/generate-linear-worklog` |  |
| `/git-status` |  |
| `/initref` |  |
| `/prime` |  |
| `/refactor-code` |  |
| `/screenshot-analyzer` | Analyze product screenshots to extract features and generate development task lists. |
| `/ultra-think` | Multi-framework structured analysis: surfaces hidden assumptions, generates competing solutions, stress-tests each with adversarial reasoning, and del... |

---

## 4. MCP Servers (103 Total)

Configured in `.mcp.json`:

| Server Name | Command | Description |
| :--- | :--- | :--- |
| `5dive` | `npx` | Model Context Protocol (stdio) server for 5dive. Exposes the 5dive agent-fleet CLI (tasks, agents, digest) as MCP tools. |
| `@microsoft/clarity-mcp-server` | `npx` | @microsoft/clarity-mcp-server MCP Server |
| `DeepGraph Next.js MCP` | `npx` | Deep code analysis and visualization for Next.js projects. Understand component relationships, dependencies, and archite |
| `DeepGraph React MCP` | `npx` | Analyze React component hierarchies, state flows, and dependencies. Visualize your React application architecture. |
| `DeepGraph TypeScript MCP` | `npx` | Comprehensive TypeScript code analysis with type mapping, interface relationships, and module dependency tracking. |
| `DeepGraph Vue MCP` | `npx` | Analyze Vue.js applications including component composition, reactive data flow, and template-script relationships. |
| `DevBox` | `npx` | This server enables natural language interactions for developer-focused operations like managing Dev Boxes, configuratio |
| `Figma Dev Mode MCP` | `npx` | The Dev Mode MCP server brings Figma directly into your workflow by providing important design information and context t |
| `LaunchDarkly` | `npx` | Official LaunchDarkly MCP Server for feature flag management and experimentation. Enables AI agents to interact with Lau |
| `MongoDB` | `npx` | A Model Context Protocol server to connect to MongoDB databases and MongoDB Atlas Clusters. |
| `Neon` | `npx` | MCP server for interacting with Neon Management API and databases |
| `Railway` | `npx` | Railway MCP server provides seamless integration with Railway's deployment platform, enabling Claude to manage projects, |
| `TestSprite` | `npx` | TestSprite’s MCP reads your intent, tests your code, and tells you what to fix. |
| `agentplat-docs` | `npx` | Read-only AgentPlat documentation MCP for Agent Rooms, Agent Mesh, governed multi-agent runtimes, inference control, tru |
| `aks` | `<path of binary aks-mcp>` | The AKS-MCP is a Model Context Protocol (MCP) server that enables AI assistants to interact with Azure Kubernetes Servic |
| `alpaca-trading` | `uvx` | Trading platform MCP server enabling stock, ETF, crypto, and options trading via Alpaca's API. Supports market data, por |
| `alphai` | `npx` | Pre-analyzed financial news via REST API and MCP. Per-ticker impact, category, and a 1-10 relevance score on every story |
| `android-mcp` | `uvx` | MCP Server for interacting with Android devices. Control, inspect, and automate Android devices via ADB through Claude. |
| `apify` | `npx` | Extract data from social media, search engines, maps, and e-commerce sites using Apify's ready-made scrapers and actors  |
| `arxiv-mcp-server` | `uvx` | Search, download, and analyze academic papers from arXiv. Supports full-text search, paper retrieval, and local storage  |
| `automatalabs-playwright-server` | `npx` | A Model Context Protocol server that provides browser automation capabilities using Playwright |
| `bitbucket` | `npx` | A Node.js/TypeScript Model Context Protocol (MCP) server for Atlassian Bitbucket Cloud. Enables AI systems (e.g., LLMs l |
| `brightdata` | `npx` | Bright Data MCP server providing 60+ tools for web search, scraping, structured data extraction, and browser automation  |
| `browser-server` | `browser-use-mcp-server` | An MCP server that enables AI agents to control web browsers using browser-use. |
| `browseract` | `npx` | BrowserAct cloud browser automation for structured data extraction from Amazon, YouTube, Google Maps, Google News, Reddi |
| `browserbase` | `npx` | This server provides cloud browser automation capabilities using Browserbase and Stagehand. It enables LLMs to interact  |
| `browsermcp` | `npx` | With Browser MCP, you can use MCP to automate your browser so that AI applications can navigate the web, fill out forms, |
| `chrome-devtools` | `npx` | A Model Context Protocol server for interacting with Chrome DevTools, enabling browser automation, debugging, and perfor |
| `circleci-mcp-server` | `npx` | Integrate CircleCI build and deployment pipeline management with your Claude Code workflow. Monitor builds, trigger depl |
| `codacy` | `npx` | MCP Server for the Codacy API, enabling access to repositories, files, quality, coverage, security and more. |
| `context7` | `npx` | Context7 by Upstash pulls up-to-date, version-specific documentation and code examples straight from the source and inje |
| `datalikers` | `npx` | DataLikers hosted MCP — 50+ Instagram & TikTok data tools: user search by demographics (gender, age, country, city), eng |
| `dbhub` | `npx` | Zero-dependency, token-efficient database MCP server supporting PostgreSQL, MySQL, MariaDB, SQL Server, and SQLite conne |
| `devplan` | `npx` | devplan MCP Server |
| `dimhour` | `npx` | Search ~19,000 scored places to eat and drink across 20 cities worldwide, with booking links. |
| `dynatrace-mcp-server` | `npx` | Manage and interact with the Dynatrace Platform for real-time observability and monitoring. |
| `elasticsearch-mcp-server` | `docker` | MCP server for connecting to Elasticsearch data and indices. Supports search queries, mappings, ES-QL, and shard informa |
| `elevenlabs` | `uvx` | Official ElevenLabs MCP for text-to-speech, voice cloning, audio processing, and transcription. Generate AI voices, desi |
| `executeautomation-playwright-server` | `npx` | A Model Context Protocol server that provides browser automation capabilities using Playwright. This server enables LLMs |
| `explorium` | `npx` | Explorium MCP — live B2B company and contact data (150M+ businesses, 800M+ professionals, 4,000+ signals, 50+ data sourc |
| `fb-ads-mcp-server` | `python` | This project provides an MCP server acting as an interface to the Meta Ads, enabling programmatic access to Meta Ads dat |
| `fetch` | `npx` | Web content fetching and data extraction capabilities. Access external APIs, scrape web content, and integrate external  |
| `filesystem` | `npx` | Secure filesystem access for Claude Code with configurable directory permissions and file operations. |
| `firecrawl-mcp` | `npx` | A Model Context Protocol (MCP) server implementation that integrates with Firecrawl for web scraping capabilities. |
| `firefly` | `npx` | Connect to Firefly AI services for advanced AI-powered development assistance, code analysis, and intelligent suggestion |
| `flatten` | `npx` | Flatten Claude Code sessions: moves bulky tool output into a sidecar file and keeps every prompt and event verbatim, so  |
| `footballbin-predictions` | `npx` | AI-powered football match predictions for Premier League and Champions League. Returns half-time scores, full-time score |
| `github` | `npx` | Direct GitHub API integration for repository management, issue tracking, pull requests, and collaborative development wo |
| `github-official` | `docker` | GitHub's official MCP Server. Interact with GitHub repositories, issues, pull requests, and more directly from Claude. |
| `google-ads` | `/full/path/to/your/project/.venv/bin/python` | A FastMCP-powered Model Context Protocol server for Google Ads API integration with automatic OAuth 2.0 authentication |
| `google-workspace` | `uvx` | Control Gmail, Google Calendar, Docs, Sheets, Slides, Chat, Forms, Tasks, Search, and Drive with AI via Google Workspace |
| `grafana` | `mcp-grafana` | A Model Context Protocol server for interacting with Grafana dashboards and monitoring. Supports both self-hosted Grafan |
| `hikerapi` | `npx` | HikerAPI MCP — Instagram data API with 105+ read-only tools auto-generated from the OpenAPI spec: profiles, posts, reels |
| `huggingface` | `npx` | Access Hugging Face models, datasets, Spaces, papers, collections via MCP. |
| `humanpen` | `npx` | Document-level AI humanizer — rewrite a whole .docx/.pptx, selected passages, or Turnitin/iThenticate-flagged text in pl |
| `imagesorcery-mcp` | `imagesorcery-mcp` | An MCP server providing tools for image processing operations |
| `ios-simulator` | `npx` | Control iOS Simulator directly from Claude Code. Launch apps, take screenshots, manage device states, and streamline mob |
| `jfrog` | `npx` | JFrog MCP Server: providing your agents with direct access to JFrog Platform services. |
| `jina-ai` | `npx` | Official Jina AI MCP Server for web reading, search, grounding, and fact-checking capabilities powered by Jina AI APIs. |
| `jupyter` | `uvx` | Model Context Protocol server for Jupyter notebooks. Execute code, manage notebooks, and interact with Jupyter kernels d |
| `just-mcp` | `/path/to/just-mcp` | Execute Just commands and task runners seamlessly from Claude Code. Manage project tasks, run build scripts, and automat |
| `lamatok` | `npx` | LamaTok MCP — TikTok data API tools auto-generated from the OpenAPI spec: users, videos, hashtags, comments, followers/f |
| `leetcode` | `mcp-server-leetcode` | A Model Context Protocol (MCP) server for LeetCode that enables AI assistants to access LeetCode problems, user informat |
| `livetennisapi` | `npx` | Real-time and historical tennis data for LLM agents — live scores, match state (server, break point, retirement/walkover |
| `local-mcp` | `npx` | Connect Claude Code to 160+ native macOS apps — Mail, Calendar, Contacts, Messages, Notes, Reminders, Finder, Safari, Te |
| `logfire` | `uvx` | Provides access to OpenTelemetry traces and metrics through Logfire. |
| `markitdown` | `docker` | Convert various file formats (PDF, Word, Excel, images, audio) to Markdown. |
| `mcp-server-box` | `uv` | The Box MCP Server is a Python project that integrates with the Box API to perform various operations such as file searc |
| `mcp-server-nia` | `pipx` | mcp-server-nia MCP Server |
| `memex` | `npx` | Developer context continuity for AI coding agents. Watches your git repos and builds a temporal knowledge graph of modul |
| `memory` | `npx` | Persistent memory and context management for Claude Code sessions. Store and recall information across conversations and |
| `mermaid` | `npx` | Generate Mermaid diagrams and charts dynamically with AI. Create flowcharts, sequence diagrams, class diagrams, and more |
| `monday-api-mcp` | `npx` | Enable AI agents to operate reliably within real workflows. This MCP is monday.com's open framework for connecting agent |
| `mongodb-official` | `npx` | Official MongoDB MCP Server by MongoDB. Connect to MongoDB databases and Atlas clusters for querying, aggregation, and c |
| `mysql` | `uvx` | Connect to MySQL databases for direct data access, queries, and database management within Claude Code workflows. |
| `n8n-mcp` | `npx` | Build and manage n8n workflows directly from Claude. Includes a pre-built database with all n8n node documentation for w |
| `nable` | `uvx` | Local-first FinOps server for cloud and AI spend. Answers cost questions across AWS, Azure, GCP, Kubernetes and 15+ SaaS |
| `nika` | `nika` | Read-only oracle for Nika AI workflows (.nika.yaml): validate a workflow, get findings explained with fix guidance, brow |
| `notionApi` | `npx` | Official MCP server for Notion API |
| `orcareplay` | `npx` | Record, replay and fork debugger for coding agents. Exposes recorded runs to Claude Code: list runs, read a run's timeli |
| `playwright-server` | `npx` | A Model Context Protocol (MCP) server that provides browser automation capabilities using Playwright. This server enable |
| `postgres-documentation` | `npx` | PostgreSQL documentation and skills for writing better Postgres code |
| `postgresql` | `npx` | Connect to PostgreSQL databases for advanced data operations, complex queries, and enterprise database management. |
| `posthell` | `npx` | posthell - social media scheduler for AI agents. Shape rough notes into posts in your voice, queue drafts for human appr |
| `postman-api-http-server` | `npx` | Postman's MCP server connects AI agents, assistants, and chatbots directly to your APIs on Postman. Use natural language |
| `pulumi` | `npx` | The Pulumi Model Context Protocol (MCP) server enables advanced Infrastructure as Code development capabilities for conn |
| `redis` | `uvx` | Official Redis MCP Server providing natural language interface for Redis databases. Query, manage, and interact with Red |
| `scavio` | `npx` | Real-time structured web data across 32 platforms with one API key: Google search, YouTube, Amazon, Walmart, eBay, Targe |
| `searxng` | `npx` | MCP Server for SearXNG, a privacy-respecting metasearch engine. Perform web searches across multiple search engines with |
| `sentry` | `npx` | This service implements the Model Context Protocol (MCP) for interacting with Sentry, focused on human-in-the-loop codin |
| `serena` | `/abs/path/to/uv` | Semantic code retrieval & editing tools for coding agents. |
| `sicex` | `npx` | Sicex MCP — global trade intelligence: search and analyze customs import/export records and maritime shipment data acros |
| `stripe` | `npx` | Let your AI agents interact with the Stripe API by using our MCP server. |
| `supabase` | `npx` | Connect your Claude Code to Supabase using MCP |
| `terraform` | `docker` | The Terraform MCP Server is a Model Context Protocol (MCP) server that provides seamless integration with Terraform Regi |
| `tinyfish` | `npx` | TinyFish Web Agent - Web browsing and data extraction via MCP with real-time progress streaming, async tasks, and stealt |
| `trace-mcp` | `npx` | Framework-aware code intelligence — semantic navigation, impact analysis, and refactoring across 87 framework integratio |
| `trello` | `pnpx` | trello MCP Server |
| `web-reader` | `npx` | Web Reader MCP Server - Z.AI implementation based on the Model Context Protocol (MCP). Provides Claude Code, Cline, and  |
| `web-search-prime` | `npx` | Web Search MCP Server - Z.AI search capability implementation based on the Model Context Protocol (MCP), providing power |
| `webflow` | `npx mcp-remote https://mcp.webflow.com/sse` | Enable AI agents to interact with Webflow APIs. |
| `zai-mcp-server` | `npx` | Vision MCP Server - Z.AI capability implementation based on the Model Context Protocol (MCP), providing powerful Z.AI GL |
| `zread` | `npx` | Zread MCP Server - Z.AI implementation based on the Model Context Protocol (MCP). Powered by zread.ai, it provides Claud |

---

## 5. Featured Marketplace Plugins (34 Total)

| Plugin | Author | Type | Description |
| :--- | :--- | :--- | :--- |
| `Ecc` | affaan-m | plugin | The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencod |
| `Claude Mem` | thedotmack | plugin | Persistent Context Across Sessions for Every Agent –  Captures everything your agent does during sessions, compresses it with AI, and injects relevant |
| `Claude Plugins Official` | anthropics | marketplace | Official, Anthropic-managed directory of high quality Claude Code Plugins. |
| `Claude Hud` | jarrodwatts | plugin | A Claude Code plugin that shows what's happening - context usage, active tools, running agents, and todo progress |
| `Compound Engineering Plugin` | EveryInc | plugin | Official Compound Engineering plugin for Claude Code, Codex, Cursor, and more |
| `Knowledge Work Plugins` | anthropics | marketplace | Open source repository of plugins primarily intended for knowledge workers to use in Claude Cowork |
| `Claude Skills` | alirezarezvani | marketplace | 345 Claude Code skills & agent skills & plugins (30+ Agents, 70+ custom commands, 330+ skills, customizable references, scripts)for Claude Code, Codex |
| `Claude Octopus` | nyldn | marketplace | Surface AI blindspots before you ship. Put up to 8 AI models on every research, design or coding task. |
| `Buildwithclaude` | davepoon | marketplace | A single hub to find Claude Skills, Agents, Commands, Hooks, Plugins, and Marketplace collections to extend Claude Code, Claude Desktop, Agent SDK and |
| `Playwright Skill` | lackeyjb | plugin | Claude Code Skill for browser automation with Playwright. Model-invoked - Claude autonomously writes and executes custom automation for testing and va |
| `Claude Code Plugins Plus Skills` | jeremylongshore | marketplace | 425 plugins, 2,810 skills, 200 agents for Claude Code. Open-source marketplace at tonsofskills.com with the ccpi CLI package manager. |
| `Pg Aiguide` | timescale | plugin | MCP server and Claude plugin for Postgres skills and documentation. Helps AI coding tools generate better PostgreSQL code. |
| `Claude Workflow V2` | CloudAI-X | plugin | Universal Claude Code workflow plugin with agents, skills, hooks, and commands |
| `Superpowers Marketplace` | obra | marketplace | Curated Claude Code plugin marketplace |
| `N Skills` | numman-ali | marketplace | Curated plugin marketplace for AI agents - works with Claude Code, Codex, and openskills |
| `Agentsys` | agent-sh | marketplace | AI writes code. This automates everything else · 24 plugins · 49 agents · 44 skills · for Claude Code, OpenCode, Codex, Cursor, Kiro. |
| `Awesome Claude Code Plugins` | ccplugins | marketplace | Awesome Claude Code plugins — a curated list of slash commands, subagents, MCP servers, and hooks for Claude Code |
| `Plugins For Claude Natives` | team-attention | marketplace | Claude Code plugins for power users |
| `Claude Forge` | sangrokjung | plugin | Supercharge Claude Code with 11 AI agents, 36 commands & 15 skills — the claude-code plugin framework inspired by oh-my-zsh. 6-layer security hooks in |
| `Ralph Wiggum Marketer` | muratcankoylan | plugin | A Claude Code Plugin that provides an autonomous AI copywriter. |
| `Claude Notifications Go` | 777genius | plugin | 🔔 Cross-platform smart notifications plugin for Claude Code. 6 types. Click-to-focus. 1 line installation. Instant. Analyze context. Zero dependencie |
| `Agent Skills` | hashicorp | marketplace | A collection of Agent skills and Claude Code plugins for HashiCorp products. |
| `Claude Review Loop` | hamelsmu | plugin | Claude Code plugin: automated code review loop with Codex |
| `Cc Marketplace` | ananddtyagi | marketplace | Marketplace repo for Claude Code Plugins |
| `Flow Next` | gmickel | plugin | Repeatable agentic engineering. The workflow layer that turns AI coding agents into a disciplined factory: durable specs, fresh-context workers, adver |
| `Claude Equity Research` | quant-sentiment-ai | plugin | 🔌 Claude Code Plugin for institutional-grade equity research.   Install with /plugin marketplace add. Generates professional   buy/sell recommendatio |
| `Cartographer` | kingbootoshi | plugin | Claude Code plugin that maps and documents codebases of any size using parallel AI subagents |
| `Adversarial Spec` | zscole | plugin | A Claude Code plugin that iteratively refines product specifications by debating between multiple LLMs until all models reach consensus. |
| `Claude Code Lsps` | Piebald-AI | marketplace | Claude Code Plugin Marketplace with LSP servers |
| `Pinion Os` | chu2bard | plugin | Client SDK, Claude plugin and skill framework for the Pinion protocol. x402 micropayments on Base. |
| `Skills` | Airtable | plugin | Official Airtable plugins for AI agents. |
| `ML Research` | krasserm | plugin | Native Claude Code port of Hugging Face's ml-intern: autonomous ML engineering on the Hugging Face ecosystem, with research-first fine-tuning (SFT/DPO |
| `Best Claude Skills` | Nyanbalaji28 | marketplace | Hand-picked best Claude Code skills — curated by AugmentClaude |
| `Cohesivity Plugin` | cohesivity-org | plugin | cohesivity.ai offers free agent native backend services. Annonymous account (no-signup) to get started through MCP or API. Hosting, postgres, email, s |
