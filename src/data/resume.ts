// Single source of truth for the site. Edit this file to update content.

export const profile = {
  name: 'Sushank Sajwan',
  role: 'AI Engineer',
  headline: 'LLM Platforms · Agentic Systems · RAG',
  roles: ['AI Engineer', 'Tech Lead', 'Agentic Systems Builder', 'RAG Pipeline Architect'],
  location: 'Noida, India',
  email: 'sushanksajwan209@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sushanksajwan/',
  github: 'https://github.com/sushank-sajwan',
  resumeUrl: 'resume.pdf',
  summary:
    'AI Engineer with 8.5+ years building production-scale LLM platforms, multi-agent orchestration systems, and RAG pipelines. I deliver async, agentic backend systems on AWS — owning architecture end-to-end, from ingestion and retrieval through LLM serving and production hardening — while mentoring engineering teams.',
}

export const stats = [
  { value: '8.5+', label: 'Years building production systems' },
  { value: '6x', label: 'Latency reduction delivered' },
  { value: '50–68%', label: 'Throughput gains at scale' },
  { value: '1,000+', label: 'Agent workflows orchestrated daily' },
]

export type Project = {
  name: string
  tagline: string
  company: string
  metrics: string[]
  points: string[]
  tech: string[]
}

export type Job = {
  company: string
  location: string
  title: string
  period: string
  projects: Project[]
}

export const experience: Job[] = [
  {
    company: 'Xebia IT Architects India Pvt Ltd',
    location: 'Gurugram, India',
    title: 'Lead Consultant',
    period: 'Mar 2026 – Present',
    projects: [
      {
        name: 'Servicing Agent System',
        tagline: 'Automated query resolution platform',
        company: 'Xebia',
        metrics: ['~6,000 queries/day', '18s turnaround'],
        points: [
          'Designed a background resolution pipeline with LangGraph, FastAPI, PostgreSQL and Celery on AWS ECS, hitting an 18-second turnaround through targeted Redis caching.',
          'Built the workflow entry layer: Microsoft Presidio PII sanitization, intent/sentiment classification and LLM-based security gating to block malicious inputs.',
          'Designed an iterative retrieval + synthesis engine with a quality router enforcing compliance, faithfulness and contradiction checks before response assembly.',
        ],
        tech: ['LangGraph', 'FastAPI', 'PostgreSQL', 'Celery', 'AWS ECS', 'Redis', 'Presidio'],
      },
    ],
  },
  {
    company: 'Magic Softwares Private Limited',
    location: 'Noida, India',
    title: 'Lead Software Engineer',
    period: 'Jan 2024 – Mar 2026',
    projects: [
      {
        name: 'AXIS',
        tagline: 'Agent Exchange & Interoperability Service',
        company: 'Magic Softwares',
        metrics: ['+50–68% throughput', '1,000+ workflows/day', '25+ tool integrations'],
        points: [
          'Enterprise multi-agent orchestration platform with CrewAI & LangGraph and dynamic workflow branching.',
          'Provider-agnostic routing layer via LiteLLM for seamless switching across OpenAI, Claude and Gemini.',
          'Distributed job execution on AWS ECS using Celery with adaptive concurrency controls.',
          'HITL approval and revision workflows with audit history, rollback and real-time job tracking.',
          'Versioned orchestration APIs governing agent lifecycles, task graphs and execution states.',
        ],
        tech: ['CrewAI', 'LangGraph', 'LiteLLM', 'FastAPI', 'Celery', 'AWS ECS'],
      },
      {
        name: 'TextGen',
        tagline: 'Multi-model text generation platform',
        company: 'Magic Softwares',
        metrics: ['~5,000 requests/day', 'minutes → 30–40s'],
        points: [
          'Unified AI generation service integrating OpenAI, Claude (Bedrock) and Gemini (Vertex AI) with LangChain-based runtime model selection.',
          'Sync/async pipelines (Celery, AWS SQS, DynamoDB) with streaming response APIs.',
          'Enterprise RAG grounded on organization-specific data, plus schema validation, guardrails and cost monitoring.',
          'Backward-compatible API versioning (v1–v3) with FastAPI/Pydantic.',
        ],
        tech: ['AWS Bedrock', 'Vertex AI', 'LangChain', 'FastAPI', 'SQS', 'DynamoDB', 'RAG'],
      },
      {
        name: 'Alignment Service',
        tagline: 'AI educational standards alignment platform',
        company: 'Magic Softwares',
        metrics: ['30s → 2s search', '50,000+ objectives', '~80GB corpus'],
        points: [
          'Prompt-chaining pipelines to extract, normalize and classify learning objectives across frameworks.',
          'Hybrid semantic search (BM25 + vector KNN) on OpenSearch.',
          'Re-architected retrieval and scoring; closed-loop feedback reranking from positive/negative signals.',
          'Search and analytics REST APIs with LLM schema validation and centralized observability.',
        ],
        tech: ['OpenSearch', 'BM25 + KNN', 'FastAPI', 'Pydantic', 'Prompt chaining'],
      },
    ],
  },
  {
    company: 'Edugem Technologies Pvt. Ltd.',
    location: 'Ahmedabad, India',
    title: 'Senior Software Development Engineer',
    period: 'Mar 2022 – Dec 2023',
    projects: [
      {
        name: 'FileGuard',
        tagline: 'Email threat detection platform',
        company: 'Edugem',
        metrics: ['~70% faster incident response'],
        points: [
          'Architected an AWS-native security scanning platform with Python/Flask, ECS, SQS, SNS, SES and DynamoDB.',
          'Distributed pipelines for attachment sanitization, URL inspection and malware classification.',
          'Containerized CI/CD for safer releases; architecture reviews and mentoring.',
        ],
        tech: ['Python', 'Flask', 'AWS ECS', 'SQS', 'SNS', 'SES', 'DynamoDB'],
      },
    ],
  },
  {
    company: 'Knowlarity Communications Pvt. Ltd.',
    location: 'Gurgaon, India',
    title: 'Software Developer',
    period: 'May 2021 – Feb 2022',
    projects: [
      {
        name: 'Cloud Telephony Backend',
        tagline: 'Real-time call routing & billing',
        company: 'Knowlarity',
        metrics: ['~40% uptime increase'],
        points: [
          'High-throughput Python/Flask services for real-time call routing and billing integrations.',
          'Led incident root-cause analyses and optimized API concurrency.',
        ],
        tech: ['Python', 'Flask'],
      },
    ],
  },
  {
    company: 'Advanced Structures India Pvt. Ltd.',
    location: 'Bengaluru, India',
    title: 'Senior Software Development Engineer',
    period: 'Aug 2019 – May 2021',
    projects: [
      {
        name: 'xcPEP',
        tagline: 'Automotive benchmarking & analytics',
        company: 'Advanced Structures',
        metrics: ['~90% less manual validation', '50% faster turnaround'],
        points: [
          'Led Python/Django backend with large-scale ingestion pipelines for engineering datasets.',
          'Architected a smart imaging pipeline and automated benchmarking workflows.',
        ],
        tech: ['Python', 'Django'],
      },
    ],
  },
  {
    company: 'Wipro HR Services India Pvt. Ltd.',
    location: 'India',
    title: 'Associate Analyst',
    period: 'Jan 2018 – Jul 2019',
    projects: [
      {
        name: 'Enterprise QA Automation',
        tagline: 'Automated functional testing',
        company: 'Wipro',
        metrics: ['25% shorter QA cycles', '+40% release stability'],
        points: ['Automated functional test frameworks (Python/Django) and defect remediation.'],
        tech: ['Python', 'Django'],
      },
    ],
  },
]

export const featuredProjects = experience
  .flatMap((j) => j.projects)
  .filter((p) => ['Servicing Agent System', 'AXIS', 'TextGen', 'Alignment Service', 'FileGuard', 'xcPEP'].includes(p.name))

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'GenAI & LLM',
    items: ['AWS Bedrock', 'Vertex AI', 'LangGraph', 'LangChain', 'CrewAI', 'RAG', 'Hybrid search', 'Vector DBs', 'MCP servers', 'HITL', 'Reranking', 'Guardrails', 'LLM evals'],
  },
  {
    group: 'Backend & Distributed',
    items: ['Python', 'FastAPI', 'AsyncIO', 'Celery', 'Flask', 'Django', 'Event-driven', 'Task orchestration'],
  },
  { group: 'Data & Storage', items: ['OpenSearch', 'PostgreSQL', 'DynamoDB', 'Redis'] },
  { group: 'Cloud & DevOps', items: ['AWS ECS', 'SQS', 'SNS', 'SES', 'S3', 'Docker', 'CI/CD', 'Observability'] },
  { group: 'Leadership', items: ['Tech lead', 'Mentoring', 'Architecture reviews'] },
]

export const education = [
  { degree: 'Master of Computer Applications (MCA)', school: 'Uttarakhand Technical University, Dehradun', period: '2016–2018' },
  { degree: 'Bachelor of Computer Applications (BCA)', school: 'HNB Garhwal University, Srinagar', period: '2010–2013' },
]
