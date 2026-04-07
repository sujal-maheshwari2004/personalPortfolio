export const experience = [
  {
    company: "STARTHACK.IO",
    role: "AI Architect",
    type: "Freelance",
    location: "Dehradun · Hybrid",
    period: "Sept 2025 – Feb 2026",
    bullets: [
      "Parallel LangGraph agents for automated code evaluation — latency cut from 7 min to 30 sec.",
      "Real-time voice-to-voice interview system using GPT Real-Time APIs with dynamic persona switching.",
      "RAG pipeline with repo indexing + AST chunking — retrieval accuracy lifted from 62% to 86%.",
    ],
    tags: ["LangGraph", "RAG", "GPT-4o", "Azure"],
  },
  {
    company: "Basal AI",
    role: "AI Data Scientist Intern",
    type: "Remote",
    location: "Bengaluru · Remote",
    period: "May – Aug 2025",
    bullets: [
      "Fine-tuned GPT-4.1 via Azure AI Foundry — content turnaround from 3 days to 15 min at 96% accuracy.",
      "Parallelised Shopify scraper across 130K+ records — compile time from 5+ hrs to under 45 min.",
      "Teams-integrated agents (Power Automate + Copilot Studio) for analytics and automated reporting.",
      "CI/CD pipelines with GitHub Actions for AI inference service deployment.",
    ],
    tags: ["GPT-4.1", "Azure AI Foundry", "Power Automate", "GitHub Actions"],
  },
  {
    company: "Patent Work",
    role: "LLM Engineer",
    type: "App No: 202411035697",
    location: "Dehradun",
    period: "Apr – Jul 2024",
    bullets: [
      "NLP keyword-extraction chatbot using rule-based and statistical filtering on hospitality-domain data.",
      "Fine-tuned GPT-2 on proprietary corpora and implemented a RAG pipeline for document-grounded responses.",
    ],
    tags: ["NLP", "GPT-2", "RAG"],
  },
];

export const projects = [
  {
    name: "DriftGuard",
    category: "Agentic Infra · Memory Layer",
    accent: "green",
    description:
      "Semantic mistake-memory system for AI agents. Stores causal chains (action → feedback → outcome) in a knowledge graph and warns agents before they repeat past failures — via semantic similarity, not exact matching. Dual interface: MCP server + in-process guard API for LangGraph.",
    tags: ["MCP", "FastMCP", "NetworkX", "sentence-transformers", "spaCy", "pytest"],
    github: "https://github.com/sujal-maheshwari2004/DriftGuard",
  },
  {
    name: "Librarian Series",
    category: "Personal Research · LLM From Scratch",
    accent: "violet",
    description:
      "125M param causal LM built end-to-end: custom BPE tokenizer, GPT with RoPE + RMSNorm + SwiGLU, trained on WikiText-103 + TinyStories (6.19 perplexity). LoRA fine-tuned on DailyDialog. Ships with a config-driven SFT framework for task adaptation.",
    tags: ["PyTorch", "LoRA", "BPE", "HuggingFace", "SFT"],
    github: "https://github.com/sujal-maheshwari2004",
    hf: [
      { label: "base-130m", url: "https://huggingface.co/MaheshwariSujal/librarian-base-130m" },
      { label: "instruct-130m", url: "https://huggingface.co/MaheshwariSujal/Librarian-Instruct-130m" },
    ],
    models: [
      { name: "librarian-base-130m", detail: "6.19 ppl · 92k steps", live: true },
      { name: "Librarian-Instruct-130m", detail: "LoRA rank 8 · DailyDialog", live: true },
      { name: "librarian-sft", detail: "config-driven SFT framework", live: true },
      { name: "librarian-base-390m", detail: "~390M params", live: false },
    ],
  },
  {
    name: "Bot Street",
    category: "Simulation · HFT Environment",
    accent: "amber",
    description:
      "Full algorithmic trading simulator on Apache Kafka (KRaft). Price-time priority order book, circuit breakers, sentiment engine, 15+ quant indicators (RSI, MACD, Bollinger, OFI, VaR, CVaR), and an MCP server so LLM agents can trade live against bots.",
    tags: ["Kafka", "FastAPI", "MCP", "Rich", "Docker"],
    github: "https://github.com/sujal-maheshwari2004",
  },
  {
    name: "ToolStore",
    category: "Project · LLM Infra",
    accent: "blue",
    description:
      "Automatic MCP server builder. Plain-English tool description → semantic search + cross-encoder reranking → clone repo → AST security scan → single runnable MCP server. 100% build accuracy across 32,767 evaluated subsets.",
    tags: ["MCP", "ChromaDB", "sentence-transformers", "AST"],
    github: "https://github.com/sujal-maheshwari2004",
  },
  {
    name: "PeakPulse",
    category: "Project · AI Product",
    accent: "indigo",
    description:
      "Customer support intelligence for e-commerce. 3-node LangGraph pipeline — classify → route → resolve — with deterministic escalation and rule-based fallback at <5ms, $0 cost. Bulk endpoint handles 50 concurrent queries via asyncio.gather.",
    tags: ["LangGraph", "FastAPI", "GPT-4o-mini", "React", "Zustand"],
    github: "https://github.com/sujal-maheshwari2004",
  },
  {
    name: "NewsCheck",
    category: "Project · Pipelines",
    accent: "violet",
    description:
      "YouTube → yt-dlp audio → Whisper transcription → GPT-4 summary in 5 structured bullets. Magic-link JWT auth, per-user rate limiting, deployed on Azure VM behind FastAPI.",
    tags: ["Whisper", "FastAPI", "Docker", "Azure VM"],
    github: "https://github.com/sujal-maheshwari2004",
  },
];

export const stats = [
  { value: "96", unit: "%", label: "Latency cut", sub: "7 min → 30 sec" },
  { value: "86", unit: "%", label: "RAG accuracy", sub: "up from 62%" },
  { value: "125", unit: "M", label: "Params trained", sub: "from scratch" },
  { value: "130", unit: "+", label: "Students mentored", sub: "workshops & projects" },
];

export const stack = {
  "AI / LLM": ["LangChain", "LangGraph", "RAG", "Fine-tuning", "LoRA", "OpenAI API", "Whisper", "GPT-4o", "MCP", "FastMCP"],
  "ML / Data": ["PyTorch", "Scikit-learn", "ChromaDB", "sentence-transformers", "pandas", "NetworkX"],
  "Backend & Web": ["FastAPI", "Flask", "Node.js", "React", "REST APIs", "Kafka"],
  "Cloud & DevOps": ["Azure AI Foundry", "Azure VM", "Docker", "GitHub Actions", "Prometheus"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "ChromaDB"],
};

export const extra = [
  "Top performer · Smart India Hackathon 2024",
  "Patent #202411035697 · Hospitality Robot NLP",
  "Founder & Technical Lead · Graphic Geeks Club",
  "Mentored 130+ students via workshops & project guidance",
  "Exploring Agentic AI workflows with MCP",
];

export const links = {
  portfolio: "https://sujalmaheshwari.com",
  github: "https://github.com/sujal-maheshwari2004",
  linkedin: "https://linkedin.com/in/sujal-maheshwari",
  email: "mailto:sujalmaheshwari07@gmail.com",
  resume: "https://drive.google.com/file/d/1klFipYaA3P3XCyKrK61qYzWz9nH9m0vh/view?usp=drive_link",
  huggingface: "https://huggingface.co/MaheshwariSujal",
};
