
import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, BookOpen, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const data = [
  {
    "publicationYear": 2023,
    "authors": "Li, Tao; Li, Gang; Deng, Zhiwei; Wang, Bryan; Li, Yang",
    "title": "A Zero-Shot Language Agent for Computer Control with Structured Reflection",
    "models": [
      "FLAN-PaLM2 L"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "staged planning",
      "structured self reflection",
      "structured thought management"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "MINIWOB++"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://aclanthology.org/2023.findings-emnlp.753/",
    "venue": "EMNLP"
  },
  {
    "publicationYear": 2023,
    "authors": "Sun, Haotian; Zhuang, Yuchen; Kong, Lingkai; Dai, Bo; Zhang, Chao",
    "title": "AdaPlanner: Adaptive Planning from Feedback with Language Models",
    "models": [
      "GPT-3.5",
      "text-davinci-003"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "self-refinement of previously generated plan",
      "code-style prompt structure",
      "leverage successful plans as few shot examples",
      "planner: task decomposition + environmental feedback prediction; refiner: differentiates between \"in-plan\"(env. feedback as predicted) and \"out-of-plan\"(env. feedback not as predicted) feedback at runtime->plan revision",
      "prompting only"
    ],
    "multiLLM": "True",
    "benchmarksUsed": [
      "MiniWoB++"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2305.16653",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Verma, Gaurav; Kaur, Rachneet; Srishankar, Nishan; Zeng, Zhen; Balch, Tucker; Veloso, Manuela",
    "title": "AdaptAgent: Adapting Multimodal Web Agents with Few-Shot Learning from Human Demonstrations",
    "models": [
      "SeeAct",
      "CogAgent"
    ],
    "inputModality": [
      "HTML",
      "Screenshots"
    ],
    "strategies": [
      "human demonstration",
      "in context learning (proprietary)",
      "meta-learning (open-source)"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "Mind2Web",
      "VisualWebArena"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2411.13451",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Putta, Pranav; Mills, Edmund; Garg, Naman; Motwani, Sumeet; Finn, Chelsea; Garg, Divyansh; Rafailov, Rafael",
    "title": "Agent Q: Advanced Reasoning and Learning for Autonomous AI Agents",
    "models": [
      "Llama-3 70B",
      "xLAM-v0.1-r"
    ],
    "inputModality": [
      "DOM tree"
    ],
    "strategies": [
      "Monte Carlo Tree Search",
      "Direct Preference Optimization",
      "Online Search"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebShop"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2408.07199",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Wang, Zora Zhiruo; Mao, Jiayuan; Fried, Daniel; Neubig, Graham",
    "title": "Agent Workflow Memory",
    "models": [
      "GPT-4"
    ],
    "inputModality": [
      "workflows from memory + HTML/AX-tree"
    ],
    "strategies": [
      "workflow memory (pre-generated/updated at runtime  by LM)",
      "action space expansion"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2409.07429",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Song, Yifan; Xiong, Weimin; Zhao, Xiutian; Zhu, Dawei; Wu, Wenhao; Wang, Ke; Li, Cheng; Peng, Wei; Li, Sujian",
    "title": "AgentBank: Towards Generalized LLM Agents via Fine-Tuning on 50000+ Interaction Trajectories",
    "models": [
      "Llama-2 7B",
      "Llama-2 13B"
    ],
    "inputModality": [
      "not mentioned but should be HTML"
    ],
    "strategies": [
      "trajectory tuning"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "AgentBank"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-emnlp.116/",
    "venue": "EMNLP"
  },
  {
    "publicationYear": 2025,
    "authors": "Zharmagambetov, Arman; Guo, Chuan; Evtimov, Ivan; Pavlova, Maya; Salakhutdinov, Ruslan; Chaudhuri, Kamalika",
    "title": "AgentDAM: Privacy Leakage Evaluation for Autonomous Web Agents",
    "models": [
      "GPT4o",
      "GPT4o-mini",
      "GPT4-Turbo",
      "llama-3.2-90b",
      "llama-3.3-70b",
      "claude-cua"
    ],
    "inputModality": [
      "axtree",
      "screenshots/SOM"
    ],
    "strategies": [
      "web agents might leak sensitive personal information; data minimization;  prompting-based approach to reduce unnecessary use of sensitive information"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "AgentDAM"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2503.09780",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Abuelsaad, Tamer; Akkil, Deepak; Dey, Prasenjit; Jagmohan, Ashish; Vempaty, Aditya; Kokku, Ravi",
    "title": "Agent-E: From Autonomous Web Navigation to Foundational Design Principles in Agentic Systems",
    "models": [
      "GPT-4-Turbo"
    ],
    "inputModality": [
      "text only",
      "content type specific",
      "all fields"
    ],
    "strategies": [
      "planner agent (breaks down the user task into a sequence of sub tasks and delegates them one at a time to the browser\nnavigation agen) + browser navigation agent (sensing the page using different DOM distillation capabilities available to it",
      "finding the next actions to\nexecute and reporting its task success or failure back to the planner)"
    ],
    "multiLLM": "True",
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2407.13032",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Yang, Ke; Liu, Yao; Chaudhary, Sapana; Fakoor, Rasool; Chaudhari, Pratik; Karypis, George; Rangwala, Huzefa",
    "title": "AgentOccam: A Simple Yet Strong Baseline for LLM-Based Web Agents",
    "models": [
      "GPT-4-Turbo"
    ],
    "inputModality": [
      "HTML/AX-tree"
    ],
    "strategies": [
      "action refinement",
      "observation space refinement",
      "add planning actions to allow for navigation workflow self organization"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2410.13825",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Xu, Yiheng; Lu, Dunjie; Shen, Zhennan; Wang, Junli; Wang, Zekun; Mao, Yuchen; Xiong, Caiming; Yu, Tao",
    "title": "AgentTrek: Agent Trajectory Synthesis via Guiding Replay with Web Tutorials",
    "models": [
      "Qwen2.5-7B-Instruct",
      "Qwen2.5-32B-Instruct"
    ],
    "inputModality": [
      "not 100% clear but probably Screenshots"
    ],
    "strategies": [
      "\"scalable data synthesis pipeline that generates high-quality web agent trajectories by leveraging web tutorials\"",
      "automatically gather tutorial-like texts -> transform to task goals with step-by-step instructions -> evaluate using VLM (GPT-4V)",
      ""
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2412.09605",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Zeng, Aohan; Liu, Mingdao; Lu, Rui; Wang, Bowen; Liu, Xiao; Dong, Yuxiao; Tang, Jie",
    "title": "AgentTuning: Enabling Generalized Agent Abilities for LLMs",
    "models": [
      "Llama 2 7B",
      "Llama 2 13B",
      "Llama 2 70B"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "finetuning using AgentInstruct + hybrid instruction tuning"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebShop",
      "WebArena",
      "Mind2Web",
      "MiniWoB++"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-acl.181/",
    "venue": "ACL"
  },
  {
    "publicationYear": 2024,
    "authors": "Yoran, Ori; Amouyal, Samuel Joseph; Malaviya, Chaitanya; Bogin, Ben; Press, Ofir; Berant, Jonathan",
    "title": "AssistantBench: Can Web Agents Solve Realistic and Time-Consuming Tasks?",
    "models": [
      "GPT-4-Turbo"
    ],
    "inputModality": [
      "Screenshots + HTML for grounding"
    ],
    "strategies": [
      "SeeAct + planning component + memory buffer (some sort of RAG)"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "AssistantBench"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2407.15711",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Fu, Yao; Kim, Dong-Ki; Kim, Jaekyeom; Sohn, Sungryull; Logeswaran, Lajanugen; Bae, Kyunghoon; Lee, Honglak",
    "title": "AutoGuide: Automated Generation and Selection of Context-Aware Guidelines for Large Language Model Agents",
    "models": [
      "GPT-3.5",
      "GPT-4-Turbo",
      "GPT-4V"
    ],
    "inputModality": [
      "HTML on Benchmarks",
      "HTML + Screenshots on real-world websites"
    ],
    "strategies": [
      "extracting knowledge from offline data",
      "context identification"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebShop",
      "WebArena"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2403.08978",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Kim, Jaekyeom; Kim, Dong-Ki; Logeswaran, Lajanugen; Sohn, Sungryull; Lee, Honglak",
    "title": "Auto-Intent: Automated Intent Discovery and Self-Exploration for Large Language Model Web Agents",
    "models": [
      "GPT-3.5",
      "GPT-4",
      "Llama-3.1 70B",
      "Llama-3.1 405B; intent predictor: Mistral-7B-v0.1",
      "Flan-T5-XL"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "self-exploration",
      "intent prediction",
      "in context learning"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-emnlp.964/",
    "venue": "EMNLP"
  },
  {
    "publicationYear": 2024,
    "authors": "Chen, Minghao; Li, Yihang; Yang, Yanting; Yu, Shiyu; Lin, Binbin; He, Xiaofei",
    "title": "AutoManual: Constructing Instruction Manuals by LLM Agents via Interactive Environmental Learning",
    "models": [
      "GPT-3.5-Turbo",
      "GPT-4-Turbo"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "Building stage: Interactive Env. ->Planner + Builder + Consolidator = rule set -> Formulator = manual used in test stage",
      "case-conditional prompting",
      "skill library & reflection library"
    ],
    "multiLLM": "True",
    "benchmarksUsed": [
      "MiniWoB++",
      "WebArena"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2405.16247",
    "venue": "NeurIPS"
  },
  {
    "publicationYear": 2024,
    "authors": "Pan, Jiayi; Zhang, Yichi; Tomlin, Nicholas; Zhou, Yifei; Levine, Sergey; Suhr, Alane",
    "title": "Autonomous Evaluation and Refinement of Digital Agents",
    "models": [
      "GPT-4V",
      "QWen-VL-chat",
      "Captioner + Mixtral",
      "Captioner + GPT-4"
    ],
    "inputModality": [
      "HTML",
      "Screenshots"
    ],
    "strategies": [
      "automatically evaluate user instructions and arbitrary agent trajectorie using modular caption-then-reason or end-to-end approach"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2404.06474",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Lai, Hanyu; Liu, Xiao; Iong, Iat Long; Yao, Shuntian; Chen, Yuxuan; Shen, Pengbo; Yu, Hao; Zhang, Hanchen; Zhang, Xiaohan; Dong, Yuxiao; Tang, Jie",
    "title": "AutoWebGLM: A Large Language Model-based Web Navigating Agent",
    "models": [
      "ChatGLM3-6B"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "curriculum learning",
      "self-sampling reinforcement learning",
      "rejection sampling finetuning"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "AutoWebBench",
      "Mind2Web",
      "MINIWOB++",
      "WebArena"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://dl.acm.org/doi/10.1145/3637528.3671620",
    "venue": "KDD"
  },
  {
    "publicationYear": 2025,
    "authors": "Song, Yixiao; Thai, Katherine; Pham, Chau Minh; Chang, Yapei; Nadaf, Mazin; Iyyer, Mohit",
    "title": "BEARCUBS: A benchmark for computer-using web agents",
    "models": [
      "GPT-4o",
      "DeepSeek R1",
      "Grok3 (DeepSearch)",
      "OpenAI (Deep Research)",
      "Convergence AI Proxy",
      "Anthropic Computer Use",
      "OpenAI Operator"
    ],
    "inputModality": [
      "image",
      "video",
      "audio",
      "and real-time interaction; probably HTML"
    ],
    "strategies": [
      "multimodal benchmark; live web content; no bypassing of multimodal understanding;"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "BEARCUBS"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2503.07919",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Song, Yueqi; Xu, Frank; Zhou, Shuyan; Neubig, Graham",
    "title": "Beyond Browsing: API-Based Web Agents",
    "models": [
      "GPT-4o"
    ],
    "inputModality": [
      "HTML",
      "AX-Tree or API-calls"
    ],
    "strategies": [
      "API agent",
      "hybrid (API and browsing) agent"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2410.16464",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2025,
    "authors": "Huq, Faria; Wang, Zora Zhiruo; Xu, Frank F.; Ou, Tianyue; Zhou, Shuyan; Bigham, Jeffrey P.; Neubig, Graham",
    "title": "CowPilot: A Framework for Autonomous and Human-Agent Collaborative Web Navigation",
    "models": [
      "GPT-4o",
      "Llama-3.1-8B"
    ],
    "inputModality": [
      "not mentioned but should be HTML",
      "might be variable (see https://oaishi.github.io/cowpilot.html)"
    ],
    "strategies": [
      "autonomous or collaborative (human + agent) web navigation; Chrome extension",
      "\"Suggest-then-Execute under Human Supervision\"; \"Pause LLM Agent: Extract Human Actions\"",
      "\"Resume LLM Agent: Predict next Action using Human Input\""
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2501.16609",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Wang, Haoyu; Li, Tao; Deng, Zhiwei; Roth, Dan; Li, Yang",
    "title": "Devil`s Advocate: Anticipatory Reflection for LLM Agents",
    "models": [
      "GPT-4"
    ],
    "inputModality": [
      "AX-Tree"
    ],
    "strategies": [
      "task decomposition",
      "introspective intervention (anticipatory reflection",
      "post-action alignment",
      "comprehensive review)"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-emnlp.53/",
    "venue": "EMNLP"
  },
  {
    "publicationYear": 2024,
    "authors": "Kil, Jihyung; Song, Chan Hee; Zheng, Boyuan; Deng, Xiang; Su, Yu; Chao, Wei-Lun",
    "title": "Dual-View Visual Contextualization for Web Navigation",
    "models": [
      "DeBERTabase",
      "Flan-T5base",
      "Pix2Struct"
    ],
    "inputModality": [
      "HTML",
      "Screenshots"
    ],
    "strategies": [
      "\"contextualize each HTML element with its neighbors in the screenshot\""
    ],
    "multiLLM": "True",
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://ieeexplore.ieee.org/document/10656291/",
    "venue": "CVPR"
  },
  {
    "publicationYear": 2025,
    "authors": "Liu, Xiaoqian; Wang, Ke; Li, Yongbin; Wu, Yuchuan; Ma, Wentao; Kong, Aobo; Huang, Fei; Jiao, Jianbin; Zhang, Junge",
    "title": "EPO: Explicit Policy Optimization for Strategic Reasoning in LLMs via Reinforcement Learning",
    "models": [
      "Llama3-8B-Instruct",
      "GPT-4o",
      "Llama3-8B-Instruct"
    ],
    "inputModality": [
      "not mentioned but should be HTML"
    ],
    "strategies": [
      "Explicit Policy Optimization",
      "multi-turn reinforcement learning",
      "collaborative reasoning",
      ""
    ],
    "multiLLM": "True",
    "benchmarksUsed": [
      "WebShop"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2502.12486",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Zhao, Andrew; Huang, Daniel; Xu, Quentin; Lin, Matthieu; Liu, Yong-Jin; Huang, Gao",
    "title": "ExpeL: LLM Agents Are Experiential Learners",
    "models": [
      "gpt-3.5-turbo-0613",
      "gpt-4-0613"
    ],
    "inputModality": [
      "not mentioned but should be HTML"
    ],
    "strategies": [
      "Experiential Learning (ExpeL) agent;training:  autonomous experience gathering + natural language knowledge extraction; inference: recall extracted insights + past experiences -> informed decisions; transfer learning; in context learning",
      "adjust prompts not parameters;"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebShop"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "https://ojs.aaai.org/index.php/AAAI/article/view/29936",
    "venue": "AAAI"
  },
  {
    "publicationYear": 2025,
    "authors": "Pahuja, Vardaan; Lu, Yadong; Rosset, Corby; Gou, Boyu; Mitra, Arindam; Whitehead, Spencer; Su, Yu; Awadallah, Ahmed",
    "title": "Explorer: Scaling Exploration-driven Web Trajectory Synthesis for Multimodal Web Agents",
    "models": [
      "Phi-3.5V",
      "Qwen2-VL-7B"
    ],
    "inputModality": [
      "HTML",
      "Screenshots"
    ],
    "strategies": [
      "\"largest and most diverse trajectory-level dataset to date\"",
      "94K successful multimodal web trajectories; \"scalable and diverse web trajectory data synthesis recipe for training GUI agent models.\"; SFT"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "Mind2Web-Live",
      "Multimodal-Mind2Web",
      "MiniWob++"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2502.11357",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Furuta, Hiroki; Matsuo, Yutaka; Faust, Aleksandra; Gur, Izzeddin",
    "title": "Exposing Limitations of Language Model Agents in Sequential-Task Compositions on the Web",
    "models": [
      "GPT-4",
      "HTML-T5-XL",
      "gpt-3.5-turbo"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "finetuning",
      "planning",
      "self-improvement",
      "program synthesis",
      "structured prompts"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "MiniWob",
      "CompWob"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2311.18751",
    "venue": "TMLR"
  },
  {
    "publicationYear": 2024,
    "authors": "Zheng, Boyuan; Gou, Boyu; Kil, Jihyung; Sun, Huan; Su, Yu",
    "title": "GPT-4V(ision) is a Generalist Web Agent, if Grounded",
    "models": [
      "GPT-4V",
      "BLIP2",
      "LLaVA-1.5"
    ],
    "inputModality": [
      "HTML",
      "Screenshots"
    ],
    "strategies": [
      "Grounding of visuals using HTML"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "Mind2Web (Multimodal)"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2401.01614",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Fereidouni, Moghis; Mosharrof, Adib; Siddique, A.b.",
    "title": "Grounded Language Agent for Product Search Via Intelligent Web Interactions",
    "models": [
      "Flan-T5-large"
    ],
    "inputModality": [
      "not mentioned but should be HTML"
    ],
    "strategies": [
      "Proximal Policy Optimization"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebShop"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://aclanthology.org/2024.customnlp4u-1.7/",
    "venue": "CustomNLP4U"
  },
  {
    "publicationYear": 2021,
    "authors": "Xu, Nancy; Masling, Sam; Du, Michael; Campagna, Giovanni; Heck, Larry; Landay, James; Lam, Monica",
    "title": "Grounding Open-Domain Instructions to Automate Web Support Tasks",
    "models": [
      "BERT-LSTM",
      "sentence-BERT"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "grounding using cosine similarity through sentence-BERT"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "RUSS Dataset"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://aclanthology.org/2021.naacl-main.80/",
    "venue": "NAACL"
  },
  {
    "publicationYear": 2024,
    "authors": "Liu, Junpeng; Ou, Tianyue; Song, Yifan; Qu, Yuxiao; Lam, Wai; Xiong, Chenyan; Chen, Wenhu; Neubig, Graham; Yue, Xiang",
    "title": "Harnessing Webpage UIs for Text-Rich Visual Understanding",
    "models": [
      "Qwen2-7B-Instruct",
      "Vicuna-7B-v1.5",
      "Llama-3.1-8B-Instruct"
    ],
    "inputModality": [
      "AX-tree",
      "screenshots"
    ],
    "strategies": [
      "build a training dataset (MultiUI) using curated multi-modal website representations",
      "train on visual understanding & reasoning tasks",
      "OCR tasks",
      "grounding tasks"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "VisualWebBench",
      "Mind2Web"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "http://arxiv.org/abs/2410.13824",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2023,
    "authors": "Lo, Robert; Sridhar, Abishek; Xu, Frank; Zhu, Hao; Zhou, Shuyan",
    "title": "Hierarchical Prompting Assists Large Language Model on Web Navigation",
    "models": [
      "CODE-DAVINCI-002",
      "GPT-3.5-Turbo"
    ],
    "inputModality": [
      "unclear. Either HTML or simplified webshop"
    ],
    "strategies": [
      "summarizer prompt + actor prompt"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebShop"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2023.findings-emnlp.685/",
    "venue": "EMNLP"
  },
  {
    "publicationYear": 2024,
    "authors": "Reddy, Revanth Gangi; Mukherjee, Sagnik; Kim, Jeonghwan; Wang, Zhenhailong; Hakkani-Tur, Dilek; Ji, Heng",
    "title": "Infogent: An Agent-Based Framework for Web Information Aggregation",
    "models": [
      "GPT-4o",
      "GPT-4o-mini",
      "GPT-4-Turbo"
    ],
    "inputModality": [
      "HTML only for API based",
      "HTML + Screenshots for visual"
    ],
    "strategies": [
      "1) API driven access (ReAct based)",
      "2)interactive visual access (SeeAct based); Navigator: Enhanced Action Set (Backtracking",
      "control transfer)Feedback-Driven Navigation (add aggregator feedback)",
      "Extractor",
      "Aggregator;"
    ],
    "multiLLM": "True",
    "benchmarksUsed": [
      "AssistantBench",
      "FRAMES"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2407.13032",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Gupta, Ishan; Jain, Aadeesh; Singh, Navdeep",
    "title": "Web Agent with Enhanced Context Understanding",
    "models": [
      "GPT-3.5-Turbo",
      "GPT-4"
    ],
    "inputModality": [
      "HTML",
      "AX-Tree"
    ],
    "strategies": [
      "Action Prioritization",
      "Context Refinement",
      "Dynamic Adaption"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena",
      "Mind2Web"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2405.07470",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Kwon, Youngjae; Lee, Seokhyun; Lee, Sang-gil; Min, Kwang-Il",
    "title": "WebAgent: A Comprehensive Framework for LLM-Based Web Automation",
    "models": [
      "GPT-3.5",
      "GPT-4"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "ReAct",
      "Multi-Turn Conversation",
      "Prompt Optimization"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "MiniWoB++",
      "WebArena"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2405.03964",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Ma, Wentao; Kong, Aobo; Cao, Xinyuan; Zhang, Yan; Li, Yongbin; Wang, Ke; Liu, Xiaojun",
    "title": "WebCompass: A Web Agent with Comprehensive Document Understanding and Self-Correction",
    "models": [
      "Llama3-8B-Instruct"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "self-correction",
      "reflection"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebShop"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2405.10984",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2023,
    "authors": "Liu, Xiao; Wang, Bowen; Lu, Rui; Hu, Jialu; Pan, Shiping; Zhao, Hong; Chen, Wenhu; Dong, Yuxiao; Tang, Jie",
    "title": "WebCPM: Interactive Web Search for Chinese Zero-shot Question Answering",
    "models": [
      "CPM-Bee",
      "GPT-3.5"
    ],
    "inputModality": [
      "Text (search results)"
    ],
    "strategies": [
      "Chinese search agent",
      "zero-shot question answering",
      "self-correction",
      "planning"
    ],
    "multiLLM": "True",
    "benchmarksUsed": [
      "WebCPM"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://aclanthology.org/2023.findings-emnlp.677/",
    "venue": "EMNLP"
  },
  {
    "publicationYear": 2024,
    "authors": "Weng, Yuanfeng; Cao, Jinning; Tang, Jian; Hu, Jie",
    "title": "WebGuide: Learning to Navigate Websites with Fine-grained Feedback from Large Language Models",
    "models": [
      "GPT-3.5",
      "GPT-4"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "fine-grained feedback",
      "self-correction",
      "reinforcement learning"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2402.16480",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2023,
    "authors": "Zhou, Minghan; Sun, Zheng; Shrivastava, Rahul; Cheng, Xin",
    "title": "WebGuru: A Web Agent for Real-World Websites",
    "models": [
      "GPT-3.5-Turbo"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "self-correction",
      "ReAct",
      "tree-of-thought"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebGuru"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2312.06201",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Yu, Yangyu; Yang, Shizhi; Jin, Yijun; Liu, Rui; Zeng, Yizhe; Yang, Kai; Fang, Bin; Li, Xiaodong",
    "title": "WebSight: A Fine-grained View of Web UI for Web Agent",
    "models": [
      "CogVLM-Chat"
    ],
    "inputModality": [
      "Screenshot (fine-grained)",
      "HTML (parsed for element properties)"
    ],
    "strategies": [
      "fine-grained visual understanding",
      "interactive perception",
      "region-level representations"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena",
      "MiniWoB++"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2405.00632",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Tian, Hao; Zhang, Jiacheng; Zhao, Meng; Chen, Jinglin; Guo, Haopeng; Pan, Li",
    "title": "WebUIMaster: A Unified Framework for Comprehensive Web Interaction",
    "models": [
      "GPT-4V",
      "CogVLM-Chat"
    ],
    "inputModality": [
      "Screenshot",
      "HTML"
    ],
    "strategies": [
      "unified framework for diverse web interactions",
      "multi-modal input",
      "task decomposition",
      "action generation"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena",
      "Mind2Web"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2406.12328",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2023,
    "authors": "Gao, Luyu; Mialon, Guillaume; Maillard, Philippe; Ratner, Douglas; Sharma, Liwei; Lin, Danqi; Welleck, Sean; Wortsman, Mitchell; Zettlemoyer, Luke; Lewis, Mike; Yih, Wen-tau; Zickler, Tobias; Singh, Sida; Khan, Nouha",
    "title": "WebVoyager: Interactive Zero-Shot Web Navigation by Looking at ScreenShots",
    "models": [
      "GPT-4",
      "CLIP"
    ],
    "inputModality": [
      "Screenshots",
      "Actionable HTML"
    ],
    "strategies": [
      "zero-shot web navigation",
      "visual grounding",
      "action prediction"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2311.18578",
    "venue": "arxiv"
  },
  {
    "publicationYear": 2024,
    "authors": "Lee, Jason; Shen, Jian; Wang, Ziyan; Chen, Kai; Zhu, Yining; Yao, Shuntian; Huang, Yongxu; Liu, Xiao; Huang, Fei; Tang, Jie",
    "title": "WETA: Web-Enhanced Tool-Augmented Language Agents",
    "models": [
      "Llama-2 7B",
      "Llama-2 13B",
      "Llama-2 70B"
    ],
    "inputModality": [
      "HTML"
    ],
    "strategies": [
      "tool augmentation",
      "web search",
      "structured prompting"
    ],
    "multiLLM": "False",
    "benchmarksUsed": [
      "WebArena",
      "Mind2Web",
      "WebShop"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "http://arxiv.org/abs/2407.13032",
    "venue": "arxiv"
  }
];

// Multi-select component
const MultiSelect = ({ 
  options, 
  selected, 
  onSelectionChange, 
  placeholder 
}: { 
  options: string[], 
  selected: string[], 
  onSelectionChange: (values: string[]) => void, 
  placeholder: string 
}) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter(item => item !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  const removeItem = (value: string) => {
    onSelectionChange(selected.filter(item => item !== value));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {selected.map(item => (
                <Badge key={item} variant="secondary" className="text-xs">
                  {item}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item);
                    }}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2 bg-white border border-gray-200 shadow-lg z-50">
        <div className="space-y-2 max-h-60 overflow-auto">
          {options.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
              />
              <label 
                htmlFor={option} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const [modelFilter, setModelFilter] = useState<string[]>([]);
  const [modalityFilter, setModalityFilter] = useState<string[]>([]);
  const [strategyFilter, setStrategyFilter] = useState<string[]>([]);
  const [multiLLMFilter, setMultiLLMFilter] = useState<string[]>([]);
  const [benchmarkFilter, setBenchmarkFilter] = useState<string[]>([]);
  const [venueFilter, setVenueFilter] = useState<string[]>([]);
  const [modalitiesFinalFilter, setModalitiesFinalFilter] = useState<string[]>([]);
  const [llmComplexityFinalFilter, setLlmComplexityFinalFilter] = useState<string[]>([]);
  const [overallFinalFilter, setOverallFinalFilter] = useState<string[]>([]);

  // Extract unique values for filter options
  const uniqueYears = [...new Set(data.map(item => item.publicationYear))].sort();
  const uniqueModels = [...new Set(data.flatMap(item => item.models))].sort();
  const uniqueModalities = [...new Set(data.flatMap(item => item.inputModality))].sort();
  const uniqueStrategies = [...new Set(data.flatMap(item => item.strategies))].sort();
  const uniqueBenchmarks = [...new Set(data.flatMap(item => item.benchmarksUsed))].sort();
  const uniqueVenues = [...new Set(data.map(item => item.venue))].sort();
  const uniqueModalitiesFinal = [...new Set(data.map(item => item.modalitiesFinal))].sort();
  const uniqueLlmComplexityFinal = [...new Set(data.map(item => item.llmComplexityFinal))].sort();
  const uniqueOverallFinal = [...new Set(data.map(item => item.overallFinal))].sort();

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.authors.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = yearFilter.length === 0 || yearFilter.includes(item.publicationYear);
      const matchesModel = modelFilter.length === 0 || modelFilter.some(model => item.models.includes(model));
      const matchesModality = modalityFilter.length === 0 || modalityFilter.some(modality => item.inputModality.includes(modality));
      const matchesStrategy = strategyFilter.length === 0 || strategyFilter.some(strategy => item.strategies.includes(strategy));
      const matchesMultiLLM = multiLLMFilter.length === 0 || multiLLMFilter.includes(item.multiLLM);
      const matchesBenchmark = benchmarkFilter.length === 0 || benchmarkFilter.some(benchmark => item.benchmarksUsed.includes(benchmark));
      const matchesVenue = venueFilter.length === 0 || venueFilter.includes(item.venue);
      const matchesModalitiesFinal = modalitiesFinalFilter.length === 0 || modalitiesFinalFilter.includes(item.modalitiesFinal);
      const matchesLlmComplexityFinal = llmComplexityFinalFilter.length === 0 || llmComplexityFinalFilter.includes(item.llmComplexityFinal);
      const matchesOverallFinal = overallFinalFilter.length === 0 || overallFinalFilter.includes(item.overallFinal);

      return matchesSearch && matchesYear && matchesModel && matchesModality && 
             matchesStrategy && matchesMultiLLM && matchesBenchmark && matchesVenue &&
             matchesModalitiesFinal && matchesLlmComplexityFinal && matchesOverallFinal;
    });
  }, [searchTerm, yearFilter, modelFilter, modalityFilter, strategyFilter, multiLLMFilter, 
      benchmarkFilter, venueFilter, modalitiesFinalFilter, llmComplexityFinalFilter, overallFinalFilter]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setYearFilter([]);
    setModelFilter([]);
    setModalityFilter([]);
    setStrategyFilter([]);
    setMultiLLMFilter([]);
    setBenchmarkFilter([]);
    setVenueFilter([]);
    setModalitiesFinalFilter([]);
    setLlmComplexityFinalFilter([]);
    setOverallFinalFilter([]);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case '+': return 'bg-green-100 text-green-800 border-green-200';
      case '0': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '-': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Web Agents Database</h1>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by title or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
              <MultiSelect
                options={uniqueYears}
                selected={yearFilter}
                onSelectionChange={setYearFilter}
                placeholder="Select years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <MultiSelect
                options={uniqueModels}
                selected={modelFilter}
                onSelectionChange={setModelFilter}
                placeholder="Select models"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Modality</label>
              <MultiSelect
                options={uniqueModalities}
                selected={modalityFilter}
                onSelectionChange={setModalityFilter}
                placeholder="Select modalities"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Strategy</label>
              <MultiSelect
                options={uniqueStrategies}
                selected={strategyFilter}
                onSelectionChange={setStrategyFilter}
                placeholder="Select strategies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Multi-LLM</label>
              <MultiSelect
                options={["True", "False"]}
                selected={multiLLMFilter}
                onSelectionChange={setMultiLLMFilter}
                placeholder="Select multi-LLM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benchmark</label>
              <MultiSelect
                options={uniqueBenchmarks}
                selected={benchmarkFilter}
                onSelectionChange={setBenchmarkFilter}
                placeholder="Select benchmarks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
              <MultiSelect
                options={uniqueVenues}
                selected={venueFilter}
                onSelectionChange={setVenueFilter}
                placeholder="Select venues"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalities Final</label>
              <MultiSelect
                options={uniqueModalitiesFinal}
                selected={modalitiesFinalFilter}
                onSelectionChange={setModalitiesFinalFilter}
                placeholder="Select ratings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LLM Complexity Final</label>
              <MultiSelect
                options={uniqueLlmComplexityFinal}
                selected={llmComplexityFinalFilter}
                onSelectionChange={setLlmComplexityFinalFilter}
                placeholder="Select ratings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Final</label>
              <MultiSelect
                options={uniqueOverallFinal}
                selected={overallFinalFilter}
                onSelectionChange={setOverallFinalFilter}
                placeholder="Select ratings"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Results ({filteredData.length} of {data.length})
          </h3>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6">
          {filteredData.map((item, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900 mb-2">{item.title}</CardTitle>
                    <p className="text-sm text-gray-600 mb-3">{item.authors}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.publicationYear}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {item.venue}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getRatingColor(item.modalitiesFinal)} border`}>
                      Mod: {item.modalitiesFinal}
                    </Badge>
                    <Badge className={`${getRatingColor(item.llmComplexityFinal)} border`}>
                      LLM: {item.llmComplexityFinal}
                    </Badge>
                    <Badge className={`${getRatingColor(item.overallFinal)} border`}>
                      Overall: {item.overallFinal}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Models</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.models.map((model, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{model}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Input Modalities</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.inputModality.map((modality, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{modality}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Strategies</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.strategies.map((strategy, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">{strategy}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Benchmarks</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.benchmarksUsed.map((benchmark, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">{benchmark}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Multi-LLM</h4>
                    <Badge variant={item.multiLLM === "True" ? "default" : "secondary"} className="text-xs">
                      {item.multiLLM}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">DOI</h4>
                    <a 
                      href={item.doi} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-xs underline"
                    >
                      View Paper
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
