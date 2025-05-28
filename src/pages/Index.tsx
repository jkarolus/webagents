
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
    "publicationYear": "2023",
    "authors": "Sun, Haotian; Zhuang, Yuchen; Kong, Lingkai; Dai, Bo; Zhang, Chao",
    "title": "AdaPlanner: Adaptive Planning from Feedback with Language Models",
    "shorthand": "AdaPlanner",
    "multiLLM": "TRUE",
    "data_quartal": "2023-05",
    "inputModality": [
      "Text"
    ],
    "models": [
      "davinci",
      "GPT"
    ],
    "benchmarksUsed": [
      "MiniWoB++"
    ],
    "strategies": [
      "prompting",
      "reflection",
      "planning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2305.16653",
    "abstract": "",
    "date": "26.05.2023",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Verma, Gaurav; Kaur, Rachneet; Srishankar, Nishan; Zeng, Zhen; Balch, Tucker; Veloso, Manuela",
    "title": "AdaptAgent: Adapting Multimodal Web Agents with Few-Shot Learning from Human Demonstrations",
    "shorthand": "AdaptAgent",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT",
      "GLM"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "VisualWebArena"
    ],
    "strategies": [
      "in context learning",
      "learning",
      "human-in-the-loop"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2411.13451",
    "abstract": "State-of-the-art multimodal web agents, powered by Multimodal Large Language Models (MLLMs), can autonomously execute many web tasks by processing user instructions and interacting with graphical user interfaces (GUIs). Current strategies for building web agents rely on (i) the generalizability of underlying MLLMs and their steerability via prompting, and (ii) large-scale fine-tuning of MLLMs on web-related tasks. However, web agents still struggle to automate tasks on unseen websites and domains, limiting their applicability to enterprise-specific and proprietary platforms. Beyond generalization from large-scale pre-training and fine-tuning, we propose building agents for few-shot adaptability using human demonstrations. We introduce the AdaptAgent framework that enables both proprietary and open-weights multimodal web agents to adapt to new websites and domains using few human demonstrations (up to 2). Our experiments on two popular benchmarks -- Mind2Web & VisualWebArena -- show that using in-context demonstrations (for proprietary models) or meta-adaptation demonstrations (for meta-learned open-weights models) boosts task success rate by 3.36% to 7.21% over non-adapted state-of-the-art models, corresponding to a relative increase of 21.03% to 65.75%. Furthermore, our additional analyses (a) show the effectiveness of multimodal demonstrations over text-only ones, (b) shed light on the influence of different data selection strategies during meta-learning on the generalization of the agent, and (c) demonstrate the effect of number of few-shot examples on the web agent's success rate. Overall, our results unlock a complementary axis for developing widely applicable multimodal web agents beyond large-scale pre-training and fine-tuning, emphasizing few-shot adaptability.",
    "date": "20.11.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Pan, Jiayi; Zhang, Yichi; Tomlin, Nicholas; Zhou, Yifei; Levine, Sergey; Suhr, Alane",
    "title": "Autonomous Evaluation and Refinement of Digital Agents",
    "shorthand": "AER",
    "multiLLM": "FALSE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Mistral",
      "GPT",
      "Qwen"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "evaluation"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2404.06474",
    "abstract": "We show that domain-general automatic evaluators can significantly improve the performance of agents for web navigation and device control. We experiment with multiple evaluation models that trade off between inference cost, modularity of design, and accuracy. We validate the performance of these models in several popular benchmarks for digital agents, finding between 74.4 and 92.9% agreement with oracle evaluation metrics. Finally, we use these evaluators to improve the performance of existing agents via fine-tuning and inference-time guidance. Without any additional supervision, we improve state-of-the-art performance by 29% on the popular benchmark WebArena, and achieve around 75% relative improvement in device control settings.",
    "date": "07.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Abuelsaad, Tamer; Akkil, Deepak; Dey, Prasenjit; Jagmohan, Ashish; Vempaty, Aditya; Kokku, Ravi",
    "title": "Agent-E: From Autonomous Web Navigation to Foundational Design Principles in Agentic Systems",
    "shorthand": "Agent E",
    "multiLLM": "TRUE",
    "data_quartal": "2024-07",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "strategies": [
      "planning"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2407.13032",
    "abstract": "AI Agents are changing the way work gets done, both in consumer and enterprise domains. However, the design patterns and architectures to build highly capable agents or multi-agent systems are still developing, and the understanding of the implication of various design choices and algorithms is still evolving. In this paper, we present our work on building a novel web agent, Agent-E \\footnote{Our code is available at \\url{https://github.com/EmergenceAI/Agent-E}}. Agent-E introduces numerous architectural improvements over prior state-of-the-art web agents such as hierarchical architecture, flexible DOM distillation and denoising method, and the concept of \\textit{change observation} to guide the agent towards more accurate performance. We first present the results of an evaluation of Agent-E on WebVoyager benchmark dataset and show that Agent-E beats other SOTA text and multi-modal web agents on this benchmark in most categories by 10-30\\%. We then synthesize our learnings from the development of Agent-E into general design principles for developing agentic systems. These include the use of domain-specific primitive skills, the importance of distillation and de-noising of environmental observations, the advantages of a hierarchical architecture, and the role of agentic self-improvement to enhance agent efficiency and efficacy as the agent gathers experience.",
    "date": "17.07.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Putta, Pranav; Mills, Edmund; Garg, Naman; Motwani, Sumeet; Finn, Chelsea; Garg, Divyansh; Rafailov, Rafael",
    "title": "Agent Q: Advanced Reasoning and Learning for Autonomous AI Agents",
    "shorthand": "Agent Q",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "xLAM"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "optimization",
      "Online Search",
      "Tree Search"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2408.07199",
    "abstract": "Large Language Models (LLMs) have shown remarkable capabilities in natural language tasks requiring complex reasoning, yet their application in agentic, multi-step reasoning within interactive environments remains a difficult challenge. Traditional supervised pre-training on static datasets falls short in enabling autonomous agent capabilities needed to perform complex decision-making in dynamic settings like web navigation. Previous attempts to bridge this ga-through supervised fine-tuning on curated expert demonstrations-often suffer from compounding errors and limited exploration data, resulting in sub-optimal policy outcomes. To overcome these challenges, we propose a framework that combines guided Monte Carlo Tree Search (MCTS) search with a self-critique mechanism and iterative fine-tuning on agent interactions using an off-policy variant of the Direct Preference Optimization (DPO) algorithm. Our method allows LLM agents to learn effectively from both successful and unsuccessful trajectories, thereby improving their generalization in complex, multi-step reasoning tasks. We validate our approach in the WebShop environment-a simulated e-commerce platform where it consistently outperforms behavior cloning and reinforced fine-tuning baseline, and beats average human performance when equipped with the capability to do online search. In real-world booking scenarios, our methodology boosts Llama-3 70B model's zero-shot performance from 18.6% to 81.7% success rate (a 340% relative increase) after a single day of data collection and further to 95.4% with online search. We believe this represents a substantial leap forward in the capabilities of autonomous agents, paving the way for more sophisticated and reliable decision-making in real-world settings.",
    "date": "13.08.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Zharmagambetov, Arman; Guo, Chuan; Evtimov, Ivan; Pavlova, Maya; Salakhutdinov, Ruslan; Chaudhuri, Kamalika",
    "title": "AgentDAM: Privacy Leakage Evaluation for Autonomous Web Agents",
    "shorthand": "AgentDAM",
    "multiLLM": "FALSE",
    "data_quartal": "2025-03",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Claude",
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "AgentDAM"
    ],
    "strategies": [
      "prompting"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2503.09780",
    "abstract": "LLM-powered AI agents are an emerging frontier with tremendous potential to increase human productivity. However, empowering AI agents to take action on their user's behalf in day-to-day tasks involves giving them access to potentially sensitive and private information, which leads to a possible risk of inadvertent privacy leakage when the agent malfunctions. In this work, we propose one way to address that potential risk, by training AI agents to better satisfy the privacy principle of data minimization. For the purposes of this benchmark, by \"data minimization\" we mean instances where private information is shared only when it is necessary to fulfill a specific task-relevant purpose. We develop a benchmark called AgentDAM to evaluate how well existing and future AI agents can limit processing of potentially private information that we designate \"necessary\" to fulfill the task. Our benchmark simulates realistic web interaction scenarios and is adaptable to all existing web navigation agents. We use AgentDAM to evaluate how well AI agents built on top of GPT-4, Llama-3 and Claude can limit processing of potentially private information when unnecessary, and show that these agents are often prone to inadvertent use of unnecessary sensitive information. We finally propose a prompting-based approach that reduces this.",
    "date": "12.03.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Azam, Ruhana; Abuelsaad, Tamer; Vempaty, Aditya; Jagmohan, Ashish",
    "title": "Multimodal Auto Validation For Self-Refinement in Web Agents",
    "shorthand": "Agent-E_2",
    "multiLLM": "TRUE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "strategies": [
      "evaluation",
      "learning",
      "preprocessing"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2410.00689",
    "abstract": "As our world digitizes, web agents that can automate complex and monotonous tasks are becoming essential in streamlining workflows. This paper introduces an approach to improving web agent performance through multi-modal validation and self-refinement. We present a comprehensive study of different modalities (text, vision) and the effect of hierarchy for the automatic validation of web agents, building upon the state-of-the-art Agent-E web automation framework. We also introduce a self-refinement mechanism for web automation, using the developed auto-validator, that enables web agents to detect and self-correct workflow failures. Our results show significant gains on Agent-E's (a SOTA web agent) prior state-of-art performance, boosting task-completion rates from 76.2\\% to 81.24\\% on the subset of the WebVoyager benchmark. The approach presented in this paper paves the way for more reliable digital assistants in complex, real-world scenarios.",
    "date": "11.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Zeng, Aohan; Liu, Mingdao; Lu, Rui; Wang, Bowen; Liu, Xiao; Dong, Yuxiao; Tang, Jie",
    "title": "AgentTuning: Enabling Generalized Agent Abilities for LLMs",
    "shorthand": "AgentLM",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "MiniWoB++",
      "WebArena",
      "WebShop"
    ],
    "strategies": [
      "finetuning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-acl.181/",
    "abstract": "Open large language models (LLMs) with great performance in various tasks have significantly advanced the development of LLMs. However, they are far inferior to commercial models such as ChatGPT and GPT-4 when acting as agents to tackle complex tasks in the real world. These agent tasks employ LLMs as the central controller responsible for planning, memorization, and tool utilization, necessitating both fine-grained prompting methods and robust LLMs to achieve satisfactory performance. Though many prompting methods have been proposed to complete particular agent tasks, there is lack of research focusing on improving the agent capabilities of LLMs themselves without compromising their general abilities. In this work, we present AgentTuning, a simple and general method to enhance the agent abilities of LLMs while maintaining their general LLM capabilities. We construct AgentInstruct, a lightweight instruction-tuning dataset containing high-quality interaction trajectories. We employ a hybrid instruction-tuning strategy by combining AgentInstruct with open-source instructions from general domains. AgentTuning is used to instruction-tune the Llama 2 series, resulting in AgentLM. Our evaluations show that AgentTuning enables LLMs' agent capabilities without compromising general abilities. The AgentLM-70B is comparable to GPT-3.5-turbo on unseen agent tasks, demonstrating generalized agent capabilities. We open source the AgentInstruct and AgentLM-7B, 13B, and 70B models at https://anonymous.4open.science/r/AgentTuning, serving open and powerful alternatives to commercial LLMs for agent tasks.",
    "date": "01.08.2024",
    "venue": "ACL"
  },
  {
    "publicationYear": "2024",
    "authors": "Yang, Ke; Liu, Yao; Chaudhary, Sapana; Fakoor, Rasool; Chaudhari, Pratik; Karypis, George; Rangwala, Huzefa",
    "title": "AgentOccam: A Simple Yet Strong Baseline for LLM-Based Web Agents",
    "shorthand": "AgentOccam",
    "multiLLM": "FALSE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "other",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "learning",
      "planning"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2410.13825",
    "abstract": "Autonomy via agents using large language models (LLMs) for personalized, standardized tasks boosts human efficiency. Automating web tasks (like booking hotels within a budget) is increasingly sought after. Fulfilling practical needs, the web agent also serves as an important proof-of-concept example for various agent grounding scenarios, with its success promising advancements in many future applications. Prior research often handcrafts web agent strategies (e.g., prompting templates, multi-agent systems, search methods, etc.) and the corresponding in-context examples, which may not generalize well across all real-world scenarios. On the other hand, there has been limited study on the misalignment between a web agent's observation/action representation and the pre-training data of the LLM it's based on. This discrepancy is especially notable when LLMs are primarily trained for language completion rather than tasks involving embodied navigation actions and symbolic web elements. Our study enhances an LLM-based web agent by simply refining its observation and action space to better align with the LLM's capabilities. This approach enables our base agent to significantly outperform previous methods on a wide variety of web tasks. Specifically, on WebArena, a benchmark featuring general-purpose web interaction tasks, our agent AgentOccam surpasses the previous state-of-the-art and concurrent work by 9.8 (+29.4%) and 5.9 (+15.8%) absolute points respectively, and boosts the success rate by 26.6 points (+161%) over similar plain web agents with its observation and action space alignment. We achieve this without using in-context examples, new agent roles, online feedback or search strategies. AgentOccam's simple design highlights LLMs' impressive zero-shot performance on web tasks, and underlines the critical role of carefully tuning observation and action spaces for LLM-based agents.",
    "date": "17.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Zhang, Ruichen; Qiu, Mufan; Tan, Zhen; Zhang, Mohan; Lu, Vincent; Peng, Jie; Xu, Kaidi; Agudelo, Leandro Z.; Qian, Peter; Chen, Tianlong",
    "title": "Symbiotic Cooperation for Web Agents: Harnessing Complementary Strengths of Large and Small LLMs",
    "shorthand": "AgentSymbiotic",
    "multiLLM": "TRUE",
    "data_quartal": "2025-02",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "other",
      "Claude"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "learning",
      "distillation",
      "trajectories"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2502.07942",
    "abstract": "",
    "date": "11.02.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Xu, Yiheng; Lu, Dunjie; Shen, Zhennan; Wang, Junli; Wang, Zekun; Mao, Yuchen; Xiong, Caiming; Yu, Tao",
    "title": "AgentTrek: Agent Trajectory Synthesis via Guiding Replay with Web Tutorials",
    "shorthand": "AgentTrek",
    "multiLLM": "FALSE",
    "data_quartal": "2024-12",
    "inputModality": [
      "Visuals"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "strategies": [
      "evaluation",
      "preprocessing",
      "planning",
      "trajectories"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2412.09605",
    "abstract": "",
    "date": "12.12.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2023",
    "authors": "Lo, Robert; Sridhar, Abishek; Xu, Frank; Zhu, Hao; Zhou, Shuyan",
    "title": "Hierarchical Prompting Assists Large Language Model on Web Navigation",
    "shorthand": "ASH",
    "multiLLM": "FALSE",
    "data_quartal": "2023-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "davinci",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "prompting"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2023.findings-emnlp.685/",
    "abstract": "Large language models (LLMs) struggle on processing complicated observations in interactive decision making. To alleviate this issue, we propose a simple hierarchical prompting approach. Diverging from previous prompting approaches that always put the full observation (a web page) to the prompt, we propose to first construct an action-aware observation which is more condensed and relevant with a dedicated Summarizer prompt. The Actor prompt then predicts the next action based on the summarized history. While our method has broad applicability, we particularly demonstrate its efficacy in the complex domain of web navigation where a full observation often contains redundant and irrelevant information. Our approach outperforms the previous state-of-the-art prompting mechanism with the same LLM by 6.2% on task success rate, demonstrating its potential on interactive decision making tasks with long observation traces.",
    "date": "01.12.2023",
    "venue": "EMNLP"
  },
  {
    "publicationYear": "2024",
    "authors": "Fu, Yao; Kim, Dong-Ki; Kim, Jaekyeom; Sohn, Sungryull; Logeswaran, Lajanugen; Bae, Kyunghoon; Lee, Honglak",
    "title": "AutoGuide: Automated Generation and Selection of Context-Aware Guidelines for Large Language Model Agents",
    "shorthand": "AutoGuide",
    "multiLLM": "FALSE",
    "data_quartal": "2024-12",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena",
      "WebShop"
    ],
    "strategies": [
      "context",
      "preprocessing",
      "prompting"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2403.08978",
    "abstract": "Recent advances in large language models (LLMs) have empowered AI agents capable of performing various sequential decision-making tasks. However, effectively guiding LLMs to perform well in unfamiliar domains like web navigation, where they lack sufficient knowledge, has proven to be difficult with the demonstration-based in-context learning paradigm. In this paper, we introduce a novel framework, called AutoGuide, which addresses this limitation by automatically generating context-aware guidelines from offline experiences. Importantly, each context-aware guideline is expressed in concise natural language and follows a conditional structure, clearly describing the context where it is applicable. As a result, our guidelines facilitate the provision of relevant knowledge for the agent's current decision-making process, overcoming the limitations of the conventional demonstration-based learning paradigm. Our evaluation demonstrates that AutoGuide significantly outperforms competitive baselines in complex benchmark domains, including real-world web navigation.",
    "date": "03.12.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Kim, Jaekyeom; Kim, Dong-Ki; Logeswaran, Lajanugen; Sohn, Sungryull; Lee, Honglak",
    "title": "Auto-Intent: Automated Intent Discovery and Self-Exploration for Large Language Model Web Agents",
    "shorthand": "Auto-Intent",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "T5",
      "Mistral",
      "other",
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "strategies": [
      "in context learning",
      "exploration"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-emnlp.964/",
    "abstract": "In this paper, we introduce Auto-Intent, a method to adapt a pre-trained large language model (LLM) as an agent for a target domain without direct fine-tuning, where we empirically focus on web navigation tasks. Our approach first discovers the underlying intents from target domain demonstrations unsupervisedly, in a highly compact form (up to three words). With the extracted intents, we train our intent predictor to predict the next intent given the agent`s past observations and actions. In particular, we propose a self-exploration approach where top-k probable intent predictions are provided as a hint to the pre-trained LLM agent, which leads to enhanced decision-making capabilities. Auto-Intent substantially improves the performance of GPT-3.5, 4 and Llama-3.1-70B, 405B agents on the large-scale real-website navigation benchmarks from Mind2Web and online navigation tasks from WebArena with its cross-benchmark generalization from Mind2Web.",
    "date": "01.11.2024",
    "venue": "EMNLP"
  },
  {
    "publicationYear": "2024",
    "authors": "Chen, Minghao; Li, Yihang; Yang, Yanting; Yu, Shiyu; Lin, Binbin; He, Xiaofei",
    "title": "AutoManual: Constructing Instruction Manuals by LLM Agents via Interactive Environmental Learning",
    "shorthand": "AutoManual",
    "multiLLM": "TRUE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "MiniWoB++",
      "WebArena"
    ],
    "strategies": [
      "pipelines",
      "prompting",
      "memory"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2405.16247",
    "abstract": "Large Language Models (LLM) based agents have shown promise in autonomously completing tasks across various domains, e.g., robotics, games, and web navigation. However, these agents typically require elaborate design and expert prompts to solve tasks in specific domains, which limits their adaptability. We introduce AutoManual, a framework enabling LLM agents to autonomously build their understanding through interaction and adapt to new environments. AutoManual categorizes environmental knowledge into diverse rules and optimizes them in an online fashion by two agents: 1) The Planner codes actionable plans based on current rules for interacting with the environment. 2) The Builder updates the rules through a well-structured rule system that facilitates online rule management and essential detail retention. To mitigate hallucinations in managing rules, we introduce a *case-conditioned prompting* strategy for the Builder. Finally, the Formulator agent compiles these rules into a comprehensive manual. The self-generated manual can not only improve the adaptability but also guide the planning of smaller LLMs while being human-readable. Given only one simple demonstration, AutoManual significantly improves task success rates, achieving 97.4\\% with GPT-4-turbo and 86.2\\% with GPT-3.5-turbo on ALFWorld benchmark tasks. The code is available at https://github.com/minghchen/automanual.",
    "date": "10.11.2024",
    "venue": "NeurIPS"
  },
  {
    "publicationYear": "2024",
    "authors": "Lai, Hanyu; Liu, Xiao; Iong, Iat Long; Yao, Shuntian; Chen, Yuxuan; Shen, Pengbo; Yu, Hao; Zhang, Hanchen; Zhang, Xiaohan; Dong, Yuxiao; Tang, Jie",
    "title": "AutoWebGLM: A Large Language Model-based Web Navigating Agent",
    "shorthand": "AutoWebGLM",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GLM"
    ],
    "benchmarksUsed": [
      "AutoWebBench",
      "Mind2Web",
      "MiniWoB++",
      "WebArena"
    ],
    "strategies": [
      "learning",
      "reinforcement learning",
      "finetuning"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://dl.acm.org/doi/10.1145/3637528.3671620",
    "abstract": "Large language models (LLMs) have fueled many intelligent web agents, but most existing ones perform far from satisfying in real-world web navigation tasks due to three factors: (1) the complexity of HTML text data (2) versatility of actions on webpages, and (3) task difficulty due to the open-domain nature of the web. In light of these challenges, we develop the open AutoWebGLM based on ChatGLM3-6B. AutoWebGLM can serve as a powerful automated web navigation agent that outperform GPT-4. Inspired by human browsing patterns, we first design an HTML simplification algorithm to represent webpages with vital information preserved succinctly. We then employ a hybrid human-AI method to build web browsing data for curriculum training. Finally, we bootstrap the model by reinforcement learning and rejection sampling to further facilitate webpage comprehension, browser operations, and efficient task decomposition by itself. For comprehensive evaluation, we establish a bilingual benchmark---AutoWebBench---for real-world web navigation tasks. We evaluate AutoWebGLM across diverse web navigation benchmarks, demonstrating its potential to tackle challenging tasks in real environments. Related code, model, and data are released at https://github.com/THUDM/AutoWebGLM.",
    "date": "24.08.2024",
    "venue": "KDD"
  },
  {
    "publicationYear": "2024",
    "authors": "Wang, Zora Zhiruo; Mao, Jiayuan; Fried, Daniel; Neubig, Graham",
    "title": "Agent Workflow Memory",
    "shorthand": "AWM",
    "multiLLM": "FALSE",
    "data_quartal": "2024-09",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "strategies": [
      "action space refinement",
      "memory"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2409.07429",
    "abstract": "Despite the potential of language model-based agents to solve real-world tasks such as web navigation, current methods still struggle with long-horizon tasks with complex action trajectories. In contrast, humans can flexibly solve complex tasks by learning reusable task workflows from past experiences and using them to guide future actions. To build agents that can similarly benefit from this process, we introduce Agent Workflow Memory (AWM), a method for inducing commonly reused routines, i.e., workflows, and selectively providing workflows to the agent to guide subsequent generations. AWM flexibly applies to both offline and online scenarios, where agents induce workflows from training examples beforehand or from test queries on the fly. We experiment on two major web navigation benchmarks -- Mind2Web and WebArena -- that collectively cover 1000+ tasks from 200+ domains across travel, shopping, and social media, among others. AWM substantially improves the baseline results by 24.6% and 51.1% relative success rate on Mind2Web and WebArena while reducing the number of steps taken to solve WebArena tasks successfully. Furthermore, online AWM robustly generalizes in cross-task, website, and domain evaluations, surpassing baselines from 8.9 to 14.0 absolute points as train-test task distribution gaps widen.",
    "date": "11.09.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Song, Yixiao; Thai, Katherine; Pham, Chau Minh; Chang, Yapei; Nadaf, Mazin; Iyyer, Mohit",
    "title": "BEARCUBS: A benchmark for computer-using web agents",
    "shorthand": "BEARCUBS",
    "multiLLM": "FALSE",
    "data_quartal": "2025-03",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Convergence AI",
      "xAI",
      "DeepSeek",
      "GPT",
      "Anthropic"
    ],
    "benchmarksUsed": [
      "BEARCUBS"
    ],
    "strategies": [],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2503.07919",
    "abstract": "Modern web agents possess computer use abilities that allow them to interact with webpages by sending commands to a virtual keyboard and mouse. While such agents have considerable potential to assist human users with complex tasks, evaluating their capabilities in real-world settings poses a major challenge. To this end, we introduce BEARCUBS, a \"small but mighty\" benchmark of 111 information-seeking questions designed to evaluate a web agent's ability to search, browse, and identify factual information from the web. Unlike prior web agent benchmarks, solving BEARCUBS requires (1) accessing live web content rather than synthetic or simulated pages, which captures the unpredictability of real-world web interactions; and (2) performing a broad range of multimodal interactions (e.g., video understanding, 3D navigation) that cannot be bypassed via text-based workarounds. Each question in BEARCUBS has a corresponding short, unambiguous answer and a human-validated browsing trajectory, allowing for transparent evaluation of agent performance and strategies. A human study confirms that BEARCUBS questions are solvable but non-trivial (84.7% human accuracy), revealing search inefficiencies and domain knowledge gaps as common failure points. By contrast, state-of-the-art computer-using agents underperform, with the best-scoring system (OpenAI's Operator) reaching only 24.3% accuracy. These results highlight critical areas for improvement, including reliable source selection and more powerful multimodal capabilities. To facilitate future research, BEARCUBS will be updated periodically to replace invalid or contaminated questions, keeping the benchmark fresh for future generations of web agents.",
    "date": "10.03.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Song, Yueqi; Xu, Frank; Zhou, Shuyan; Neubig, Graham",
    "title": "Beyond Browsing: API-Based Web Agents",
    "shorthand": "Beyond Browsing",
    "multiLLM": "FALSE",
    "data_quartal": "2025-01",
    "inputModality": [
      "Text",
      "API-calls"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "api-based"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2410.16464",
    "abstract": "Web browsers are a portal to the internet, where much of human activity is undertaken. Thus, there has been significant research work in AI agents that interact with the internet through web browsing. However, there is also another interface designed specifically for machine interaction with online content: application programming interfaces (APIs). In this paper we ask -- what if we were to take tasks traditionally tackled by browsing agents, and give AI agents access to APIs? To do so, we propose two varieties of agents: (1) an API-calling agent that attempts to perform online tasks through APIs only, similar to traditional coding agents, and (2) a Hybrid Agent that can interact with online data through both web browsing and APIs. In experiments on WebArena, a widely-used and realistic benchmark for web navigation tasks, we find that API-based agents outperform web browsing agents. Hybrid Agents out-perform both others nearly uniformly across tasks, resulting in a more than 20.0% absolute improvement over web browsing alone, achieving a success rate of 35.8%, achiving the SOTA performance among task-agnostic agents. These results strongly suggest that when APIs are available, they present an attractive alternative to relying on web browsing alone.",
    "date": "30.01.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Chezelles, Thibault Le Sellier De; Gasse, Maxime; Drouin, Alexandre; Caccia, Massimo; Boisvert, L\u00e9o; Thakkar, Megh; Marty, Tom; Assouel, Rim; Shayegan, Sahar Omidi; Jang, Lawrence Keunho; L\u00f9, Xing Han; Yoran, Ori; Kong, Dehan; Xu, Frank F.; Reddy, Siva; Cappart, Quentin; Neubig, Graham; Salakhutdinov, Ruslan; Chapados, Nicolas; Lacoste, Alexandre",
    "title": "The BrowserGym Ecosystem for Web Agent Research",
    "shorthand": "BrowserGym",
    "multiLLM": "FALSE",
    "data_quartal": "2024-12",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Claude",
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "AssistantBench",
      "BrowserGym",
      "MiniWoB++",
      "VisualWebArena",
      "WebArena",
      "WebLinx",
      "WorkArena",
      "WorkArena++"
    ],
    "strategies": [
      "evaluation",
      "memory",
      "in context learning",
      "preprocessing",
      "prompting",
      "reflection"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2412.05467",
    "abstract": "The BrowserGym ecosystem addresses the growing need for efficient evaluation and benchmarking of web agents, particularly those leveraging automation and Large Language Models (LLMs) for web interaction tasks. Many existing benchmarks suffer from fragmentation and inconsistent evaluation methodologies, making it challenging to achieve reliable comparisons and reproducible results. BrowserGym aims to solve this by providing a unified, gym-like environment with well-defined observation and action spaces, facilitating standardized evaluation across diverse benchmarks. Combined with AgentLab, a complementary framework that aids in agent creation, testing, and analysis, BrowserGym offers flexibility for integrating new benchmarks while ensuring consistent evaluation and comprehensive experiment management. This standardized approach seeks to reduce the time and complexity of developing web agents, supporting more reliable comparisons and facilitating in-depth analysis of agent behaviors, and could result in more adaptable, capable agents, ultimately accelerating innovation in LLM-driven automation. As a supporting evidence, we conduct the first large-scale, multi-benchmark web agent experiment and compare the performance of 6 state-of-the-art LLMs across all benchmarks currently available in BrowserGym. Among other findings, our results highlight a large discrepancy between OpenAI and Anthropic's latests models, with Claude-3.5-Sonnet leading the way on almost all benchmarks, except on vision-related tasks where GPT-4o is superior. Despite these advancements, our results emphasize that building robust and efficient web agents remains a significant challenge, due to the inherent complexity of real-world web environments and the limitations of current models.",
    "date": "11.12.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Huq, Faria; Wang, Zora Zhiruo; Xu, Frank F.; Ou, Tianyue; Zhou, Shuyan; Bigham, Jeffrey P.; Neubig, Graham",
    "title": "CowPilot: A Framework for Autonomous and Human-Agent Collaborative Web Navigation",
    "shorthand": "CowPilot",
    "multiLLM": "FALSE",
    "data_quartal": "2025-02",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "human-in-the-loop"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2501.16609",
    "abstract": "",
    "date": "09.02.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Wang, Haoyu; Li, Tao; Deng, Zhiwei; Roth, Dan; Li, Yang",
    "title": "Devil`s Advocate: Anticipatory Reflection for LLM Agents",
    "shorthand": "DevilsAdvocate",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "reflection",
      "planning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-emnlp.53/",
    "abstract": "In this work, we introduce a novel approach that equips LLM agents with introspection, enhancing consistency and adaptability in solving complex tasks. Our approach prompts LLM agents to decompose a given task into manageable subtasks (i.e., to make a plan), and to continuously introspect upon the suitability and results of their actions. We implement a three-fold introspective intervention: 1) anticipatory reflection on potential failures and alternative remedy before action execution, 2) post-action alignment with subtask objectives and backtracking with remedy to ensure utmost effort in plan execution, and 3) comprehensive review upon plan completion for future strategy refinement. By deploying and experimenting with this methodology\u0097a zero-shot approach\u0097within WebArena for practical tasks in web environments, our agent demonstrates superior performance with a success rate of 23.5% over existing zero-shot methods by 3.5%. The experimental results suggest that our introspection-driven approach not only enhances the agent`s ability to navigate unanticipated challenges through a robust mechanism of plan execution, but also improves efficiency by reducing the number of trials and plan revisions by 45% needed to achieve a task.",
    "date": "01.11.2024",
    "venue": "EMNLP"
  },
  {
    "publicationYear": "2024",
    "authors": "Kil, Jihyung; Song, Chan Hee; Zheng, Boyuan; Deng, Xiang; Su, Yu; Chao, Wei-Lun",
    "title": "Dual-View Visual Contextualization for Web Navigation",
    "shorthand": "Dual-VCR",
    "multiLLM": "TRUE",
    "data_quartal": "2024-06",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "T5",
      "Pix2Struct",
      "BERT"
    ],
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "strategies": [
      "grounding"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://ieeexplore.ieee.org/document/10656291/",
    "abstract": "Automatic web navigation aims to build a web agent that can follow language instructions to execute complex and diverse tasks on real-world websites. Existing work primarily takes HTML documents as input, which define the contents and action spaces (i.e., actionable elements and operations) of webpages. Nevertheless, HTML documents may not provide a clear task-related context for each element, making it hard to select the right (sequence of) actions. In this paper, we propose to contextualize HTML elements through their \u0093dual views\u0094 in webpage screenshots: each HTML element has its corresponding bounding box and visual content in the screenshot. We build upon the insight-web developers tend to arrange task-related elements nearby on webpages to enhance user experiences-and propose to contextualize each element with its neighbor elements, using both tex-tual and visual features. The resulting representations of HTML elements are more informative for the agent to take action. We validate our method on the recently released Mind2Web dataset, which features diverse navigation domains and tasks on real-world websites. Our method consistently outperforms the baseline in all the scenarios, in-cluding cross-task, cross-website, and cross-domain ones.",
    "date": "01.06.2024",
    "venue": "CVPR"
  },
  {
    "publicationYear": "2025",
    "authors": "Liu, Xiaoqian; Wang, Ke; Li, Yongbin; Wu, Yuchuan; Ma, Wentao; Kong, Aobo; Huang, Fei; Jiao, Jianbin; Zhang, Junge",
    "title": "EPO: Explicit Policy Optimization for Strategic Reasoning in LLMs via Reinforcement Learning",
    "shorthand": "EPO",
    "multiLLM": "TRUE",
    "data_quartal": "2025-03",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "reinforcement learning",
      "planning",
      "policy optimization"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2502.12486",
    "abstract": "Large Language Models (LLMs) have shown impressive reasoning capabilities in well-defined problems with clear solutions, such as mathematics and coding. However, they still struggle with complex real-world scenarios like business negotiations, which require strategic reasoning-an ability to navigate dynamic environments and align long-term goals amidst uncertainty. Existing methods for strategic reasoning face challenges in adaptability, scalability, and transferring strategies to new contexts. To address these issues, we propose explicit policy optimization (EPO) for strategic reasoning, featuring an LLM that provides strategies in open-ended action space and can be plugged into arbitrary LLM agents to motivate goal-directed behavior. To improve adaptability and policy transferability, we train the strategic reasoning model via multi-turn reinforcement learning (RL) using process rewards and iterative self-play, without supervised fine-tuning (SFT) as a preliminary step. Experiments across social and physical domains demonstrate EPO's ability of long-term goal alignment through enhanced strategic reasoning, achieving state-of-the-art performance on social dialogue and web navigation tasks. Our findings reveal various collaborative reasoning mechanisms emergent in EPO and its effectiveness in generating novel strategies, underscoring its potential for strategic reasoning in real-world applications.",
    "date": "24.03.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Song, Yifan; Yin, Da; Yue, Xiang; Huang, Jie; Li, Sujian; Lin, Bill Yuchen",
    "title": "Trial and Error: Exploration-Based Trajectory Optimization of LLM Agents",
    "shorthand": "ETO",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Mistral",
      "Llama"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "learning",
      "optimization",
      "trajectories"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.acl-long.409/",
    "abstract": "Large Language Models (LLMs) have become integral components in various autonomous agent systems.In this study, we present an exploration-based trajectory optimization approach, referred to as ETO. This learning method is designed to enhance the performance of open LLM agents. Contrary to previous studies that exclusively train on successful expert trajectories, our method allows agents to learn from their exploration failures. This leads to improved performance through an iterative optimization framework. During the exploration phase, the agent interacts with the environment while completing given tasks, gathering failure trajectories to create contrastive trajectory pairs. In the subsequent training phase, the agent utilizes these trajectory preference pairs to update its policy using contrastive learning methods like DPO. This iterative cycle of exploration and training fosters continued improvement in the agents. Our experiments on three complex tasks demonstrate that ETO consistently surpasses baseline performance by a large margin. Furthermore, an examination of task-solving efficiency and potential in scenarios lacking expert trajectory underscores the effectiveness of our approach.",
    "date": "01.08.2024",
    "venue": "ACL"
  },
  {
    "publicationYear": "2024",
    "authors": "Zhao, Andrew; Huang, Daniel; Xu, Quentin; Lin, Matthieu; Liu, Yong-Jin; Huang, Gao",
    "title": "ExpeL: LLM Agents Are Experiential Learners",
    "shorthand": "ExpeL",
    "multiLLM": "FALSE",
    "data_quartal": "2024-03",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "in context learning",
      "learning",
      "training",
      "prompting"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "https://ojs.aaai.org/index.php/AAAI/article/view/29936",
    "abstract": "",
    "date": "24.03.2024",
    "venue": "AAAI"
  },
  {
    "publicationYear": "2025",
    "authors": "Pahuja, Vardaan; Lu, Yadong; Rosset, Corby; Gou, Boyu; Mitra, Arindam; Whitehead, Spencer; Su, Yu; Awadallah, Ahmed",
    "title": "Explorer: Scaling Exploration-driven Web Trajectory Synthesis for Multimodal Web Agents",
    "shorthand": "Explorer",
    "multiLLM": "FALSE",
    "data_quartal": "2025-02",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Phi-V",
      "Qwen"
    ],
    "benchmarksUsed": [
      "Mind2Web-live",
      "MiniWoB++",
      "Multimodal-Mind2Web"
    ],
    "strategies": [
      "evaluation",
      "training",
      "trajectories",
      "finetuning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2502.11357",
    "abstract": "",
    "date": "19.02.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Fereidouni, Moghis; Mosharrof, Adib; Siddique, A.b.",
    "title": "Grounded Language Agent for Product Search via Intelligent Web Interactions",
    "shorthand": "GLAINTEL",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "T5"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "policy optimization"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://aclanthology.org/2024.customnlp4u-1.7/",
    "abstract": "Recent research has focused on developing agents powered by large language models (LLMs) to accomplish complex high-level user intents. However, employing LLMs with billions of parameters (e.g., GPT-4) may incur substantial costs on top of handcrafting extensive prompts. To address this, we introduce a Grounded Language Agent for Intelligent Web Interactions, named GLAIN?. GLAIN? employs Flan-T5 as its backbone and is flexible in training in various settings: unsupervised learning, supervised learning, and unsupervised domain adaptation. Specifically, we tackle both the challenge of learning without human demonstrations and the opportunity to leverage human demonstrations effectively when those are available. Additionally, we explore unsupervised domain adaptation for cases where demonstrations are limited to a specific domain. Experimental evaluations across diverse setups demonstrate the effectiveness of GLAIN? in unsupervised settings, outperforming in-context learning-based approaches that employ larger models with up to 540 billion parameters. Surprisingly, behavioral cloning-based methods that straightforwardly use human demonstrations do not outperform unsupervised variants of GLAIN?. Additionally, we show that combining human demonstrations with reinforcement learning-based training yields results comparable to methods utilizing GPT-4. The code is available at: https://github.com/MultifacetedNLP/Web-Agents-Unsupervised",
    "date": "01.11.2024",
    "venue": "CustomNLP4U"
  },
  {
    "publicationYear": "2024",
    "authors": "Furuta, Hiroki; Matsuo, Yutaka; Faust, Aleksandra; Gur, Izzeddin",
    "title": "Exposing Limitations of Language Model Agents in Sequential-Task Compositions on the Web",
    "shorthand": "HTML-T5++",
    "multiLLM": "FALSE",
    "data_quartal": "2024-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "T5",
      "GPT"
    ],
    "benchmarksUsed": [
      "CompWoB",
      "MiniWoB"
    ],
    "strategies": [
      "prompting",
      "reflection",
      "planning",
      "finetuning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2311.18751",
    "abstract": "Language model agents (LMA) recently emerged as a promising paradigm on muti-step decision making tasks, often outperforming humans and other reinforcement learning agents. Despite the promise, their performance on real-world applications that often involve combinations of tasks is still underexplored. In this work, we introduce a new benchmark, called CompWoB \u0096 50 new compositional web automation tasks reflecting more realistic assumptions. We show that while existing prompted LMAs (gpt-3.5-turbo or gpt-4) achieve 94.0% average success rate on base tasks, their performance degrades to 24.9% success rate on compositional tasks. On the other hand, transferred LMAs (finetuned only on base tasks) show less generalization gap, dropping from 85.4% to 54.8%. By balancing data distribution across tasks, we train a new model, HTML-T5++, that surpasses human-level performance (95.2%) on MiniWoB, and achieves the best zero-shot performance on CompWoB (61.5%). While these highlight the promise of small-scale finetuned and transferred models for task compositionality, their performance further degrades under different instruction compositions changing combinational order. In contrast to the recent remarkable success of LMA, our benchmark and detailed analysis emphasize the necessity of building LMAs that are robust and generalizable to task compositionality for real-world deployment.",
    "date": "31.12.2024",
    "venue": "TMLR"
  },
  {
    "publicationYear": "2025",
    "authors": "Sarch, Gabriel; Jang, Lawrence; Tarr, Michael J.; Cohen, William W.; Marino, Kenneth; Fragkiadaki, Katerina",
    "title": "VLM Agents Generate Their Own Memories: Distilling Experience into Embodied Programs of Thought",
    "shorthand": "ICAL",
    "multiLLM": "FALSE",
    "data_quartal": "2025-01",
    "inputModality": [
      "Visuals"
    ],
    "models": [
      "GPT",
      "Qwen"
    ],
    "benchmarksUsed": [
      "VisualWebArena"
    ],
    "strategies": [
      "human-in-the-loop",
      "memory",
      "in context learning",
      "preprocessing",
      "rag",
      "finetuning"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2406.14596",
    "abstract": "Large-scale LLMs and VLMs excel at few-shot learning but require high-quality examples. We introduce In-Context Abstraction Learning (ICAL), which iteratively refines suboptimal trajectories into high-quality data with optimized actions and detailed reasoning. Given an inefficient demonstration, a VLM corrects actions and annotates causal relationships, object states, subgoals, and task-relevant visuals, forming \"programs of thought.\" With human feedback, these programs are improved as the agent executes them in a similar environment. The resulting examples, used as prompt context or fine-tuning data, significantly boost decision-making while reducing human feedback needs. ICAL surpasses state-of-the-art in TEACh (dialogue-based instruction following), VisualWebArena (multimodal web agents), and Ego4D (egocentric video action anticipation). In TEACh, combining fine-tuning and retrieval on ICAL examples outperforms raw human demonstrations and expert examples, achieving a 17.5% increase in goal-condition success. In VisualWebArena, retrieval-augmented GPT-4V with ICAL improves task success rate 1.6x over GPT-4V, while fine-tuning Qwen2-VL achieves a 2.8x improvement. In Ego4D, ICAL outperforms few-shot GPT-4V and remains competitive with supervised models. Overall, ICAL scales 2x better than raw human demonstrations and reduces manual prompt engineering.",
    "date": "20.01.2025",
    "venue": "NeurIPS"
  },
  {
    "publicationYear": "2024",
    "authors": "Reddy, Revanth Gangi; Mukherjee, Sagnik; Kim, Jeonghwan; Wang, Zhenhailong; Hakkani-Tur, Dilek; Ji, Heng",
    "title": "Infogent: An Agent-Based Framework for Web Information Aggregation",
    "shorthand": "Infogent",
    "multiLLM": "TRUE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "AssistantBench",
      "FRAMES"
    ],
    "strategies": [
      "human-in-the-loop",
      "preprocessing",
      "aggregation",
      "backtracking",
      "api-based"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2410.19054",
    "abstract": "Despite seemingly performant web agents on the task-completion benchmarks, most existing methods evaluate the agents based on a presupposition: the web navigation task consists of linear sequence of actions with an end state that marks task completion. In contrast, our work focuses on web navigation for information aggregation, wherein the agent must explore different websites to gather information for a complex query. We consider web information aggregation from two different perspectives: (i) Direct API-driven Access relies on a text-only view of the Web, leveraging external tools such as Google Search API to navigate the web and a scraper to extract website contents. (ii) Interactive Visual Access uses screenshots of the webpages and requires interaction with the browser to navigate and access information. Motivated by these diverse information access settings, we introduce Infogent, a novel modular framework for web information aggregation involving three distinct components: Navigator, Extractor and Aggregator. Experiments on different information access settings demonstrate Infogent beats an existing SOTA multi-agent search framework by 7% under Direct API-Driven Access on FRAMES, and improves over an existing information-seeking web agent by 4.3% under Interactive Visual Access on AssistantBench.",
    "date": "24.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Trabucco, Brandon; Sigurdsson, Gunnar; Piramuthu, Robinson; Salakhutdinov, Ruslan",
    "title": "Towards Internet-Scale Training For Agents",
    "shorthand": "InSTA",
    "multiLLM": "FALSE",
    "data_quartal": "2025-02",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WebLinx"
    ],
    "strategies": [
      "evaluation",
      "training"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2502.06776",
    "abstract": "The predominant approach for training web navigation agents gathers human demonstrations for a set of popular websites and hand-written tasks, but it is becoming clear that human data are an inefficient resource. We develop a pipeline to facilitate Internet-scale training for agents without laborious human annotations. In the first stage, an LLM generates tasks for 150k diverse websites. In the next stage, LLM agents complete tasks and produce trajectories. In the final stage, an LLM reviews the trajectories and judges their success. Language models are competitive with human annotators, detecting and filtering out harmful content with an accuracy of 97%, generating feasible tasks with an 89% rate, and judging successful trajectories with an 82.6% accuracy. Scaling the pipeline, agents based on Llama 3.1 70B solve 16.7% of tasks for 150k sites. Training on the data generated by our pipeline is competitive with training on human demonstrations. In data-limited settings derived from Mind2Web and WebLINX, we improve Step Accuracy by up to +89.5% and +122.1% respectively for agents trained on mixtures of data from our pipeline, and human data. When training agents with all available human data from these benchmarks, agents fail to generalize to diverse real sites, and adding our data improves their generalization by +149.0% for WebLINX and +156.3% for Mind2Web. Code will be available at: data-for-agents.github.io.",
    "date": "10.02.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Xiong, Weimin; Song, Yifan; Zhao, Xiutian; Wu, Wenhao; Wang, Xun; Wang, Ke; Li, Cheng; Peng, Wei; Li, Sujian",
    "title": "Watch Every Step! LLM Agent Learning via Iterative Step-level Process Refinement",
    "shorthand": "IPR",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Mistral",
      "Llama"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "reward",
      "optimization",
      "training",
      "finetuning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.emnlp-main.93/",
    "abstract": "Large language model agents have exhibited exceptional performance across a range of complex interactive tasks. Recent approaches have utilized tuning with expert trajectories to enhance agent performance, yet they primarily concentrate on outcome rewards, which may lead to errors or suboptimal actions due to the absence of process supervision signals. In this paper, we introduce the **I**terative step-level **P**rocess **R**efinement **(IPR)** framework, which provides detailed step-by-step guidance to enhance agent training. Specifically, we adopt the Monte Carlo method to estimate step-level rewards. During each iteration, the agent explores along the expert trajectory and generates new actions. These actions are then evaluated against the corresponding step of expert trajectory using step-level rewards. Such comparison helps identify discrepancies, yielding contrastive action pairs that serve as training data for the agent. Our experiments on three complex agent tasks demonstrate that our framework outperforms a variety of strong baselines. Moreover, our analytical finds highlight the effectiveness of IPR in augmenting action efficiency and its applicability to diverse models.",
    "date": "01.11.2024",
    "venue": "EMNLP"
  },
  {
    "publicationYear": "2024",
    "authors": "Ma, Kaixin; Zhang, Hongming; Wang, Hongwei; Pan, Xiaoman; Yu, Wenhao; Yu, Dong",
    "title": "LASER: LLM Agent with State-Space Exploration for Web Navigation",
    "shorthand": "LASER",
    "multiLLM": "FALSE",
    "data_quartal": "2024-02",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "prompting",
      "planning",
      "backtracking",
      "action space refinement",
      "exploration"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2309.08172",
    "abstract": "Large language models (LLMs) have been successfully adapted for interactive decision-making tasks like web navigation. While achieving decent performance, previous methods implicitly assume a forward-only execution mode for the model, where they only provide oracle trajectories as in-context examples to guide the model on how to reason in the environment. Consequently, the model could not handle more challenging scenarios not covered in the in-context examples, e.g., mistakes, leading to sub-optimal performance. To address this issue, we propose to model the interactive task as state space exploration, where the LLM agent transitions among a pre-defined set of states by performing actions to complete the task. This formulation enables flexible backtracking, allowing the model to recover from errors easily. We evaluate our proposed LLM Agent with State-Space ExploRation (LASER) on both the WebShop task and amazon.com. Experimental results show that LASER significantly outperforms previous methods and closes the gap with human performance on the web navigation task.",
    "date": "21.02.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Zhou, Andy; Yan, Kai; Shlapentokh-Rothman, Michal; Wang, Haohan; Wang, Yu-Xiong",
    "title": "Language Agent Tree Search Unifies Reasoning Acting and Planning in Language Models",
    "shorthand": "LATS",
    "multiLLM": "FALSE",
    "data_quartal": "2024-06",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "in context learning",
      "reflection",
      "memory",
      "Tree Search"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2310.04406",
    "abstract": "While language models (LMs) have shown potential across a range of decision-making tasks, their reliance on simple acting processes limits their broad deployment as autonomous agents. In this paper, we introduce Language Agent Tree Search (LATS) -- the first general framework that synergizes the capabilities of LMs in reasoning, acting, and planning. By leveraging the in-context learning ability of LMs, we integrate Monte Carlo Tree Search into LATS to enable LMs as agents, along with LM-powered value functions and self-reflections for proficient exploration and enhanced decision-making. A key feature of our approach is the incorporation of an environment for external feedback, which offers a more deliberate and adaptive problem-solving mechanism that surpasses the constraints of existing techniques. Our experimental evaluation across diverse domains, including programming, interactive question-answering (QA), web navigation, and math, validates the effectiveness and generality of LATS in decision-making while maintaining competitive or improved reasoning performance. Notably, LATS achieves state-of-the-art pass@1 accuracy (92.7%) for programming on HumanEval with GPT-4 and demonstrates gradient-free performance (average score of 75.9) comparable to gradient-based fine-tuning for web navigation on WebShop with GPT-3.5. Code can be found at https://github.com/lapisrocks/LanguageAgentTreeSearch",
    "date": "06.06.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2023",
    "authors": "Deng, Xiang; Gu, Yu; Zheng, Boyuan; Chen, Shijie; Stevens, Sam; Wang, Boshi; Sun, Huan; Su, Yu",
    "title": "Mind2Web: Towards a Generalist Agent for the Web",
    "shorthand": "MindAct",
    "multiLLM": "TRUE",
    "data_quartal": "2023-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "T5",
      "BERT"
    ],
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "strategies": [
      "decision making",
      "preprocessing"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://papers.nips.cc/paper_files/paper/2023/hash/5950bf290a1570ea401bf98882128160-Abstract-Datasets_and_Benchmarks.html",
    "abstract": "We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website. Existing datasets for web agents either use simulated websites or only cover a limited set of websites and tasks, thus not suitable for generalist web agents. With over 2,000 open-ended tasks collected from 137 websites spanning 31 domains and crowdsourced action sequences for the tasks, Mind2Web provides three necessary ingredients for building generalist web agents: 1) diverse domains, websites, and tasks, 2) use of real-world websites instead of simulated and simplified ones, and 3) a broad spectrum of user interaction patterns. Based on Mind2Web, we conduct an initial exploration of using large language models (LLMs) for building generalist web agents. While the raw HTML of real-world websites are often too large to be fed to LLMs, we show that first filtering it with a small LM significantly improves the effectiveness and efficiency of LLMs. Our solution demonstrates a decent level of performance, even on websites or entire domains the model has never seen before, but there is still a substantial room to improve towards truly generalizable agents. We open-source our dataset, model implementation, and trained models (https://osu-nlp-group.github.io/Mind2Web) to facilitate further research on building a generalist agent for the web.",
    "date": "01.12.2023",
    "venue": "NeurIPS"
  },
  {
    "publicationYear": "2024",
    "authors": "Bonatti, Rogerio; Zhao, Dan; Bonacci, Francesco; Dupont, Dillon; Abdali, Sara; Li, Yinheng; Lu, Yadong; Wagle, Justin; Koishida, Kazuhito; Bucker, Arthur; Jang, Lawrence; Hui, Zack",
    "title": "Windows Agent Arena: Evaluating Multi-Modal OS Agents at Scale",
    "shorthand": "Navi",
    "multiLLM": "FALSE",
    "data_quartal": "2024-09",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WindowsAgentArena"
    ],
    "strategies": [
      "exploration",
      "prompting"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2409.08264",
    "abstract": "Large language models (LLMs) show remarkable potential to act as computer agents, enhancing human productivity and software accessibility in multi-modal tasks that require planning and reasoning. However, measuring agent performance in realistic environments remains a challenge since: (i) most benchmarks are limited to specific modalities or domains (e.g. text-only, web navigation, Q&A, coding) and (ii) full benchmark evaluations are slow (on order of magnitude of days) given the multi-step sequential nature of tasks. To address these challenges, we introduce the Windows Agent Arena: a reproducible, general environment focusing exclusively on the Windows operating system (OS) where agents can operate freely within a real Windows OS and use the same wide range of applications, tools, and web browsers available to human users when solving tasks. We adapt the OSWorld framework (Xie et al., 2024) to create 150+ diverse Windows tasks across representative domains that require agent abilities in planning, screen understanding, and tool usage. Our benchmark is scalable and can be seamlessly parallelized in Azure for a full benchmark evaluation in as little as 20 minutes. To demonstrate Windows Agent Arena's capabilities, we also introduce a new multi-modal agent, Navi. Our agent achieves a success rate of 19.5% in the Windows domain, compared to 74.5% performance of an unassisted human. Navi also demonstrates strong performance on another popular web-based benchmark, Mind2Web. We offer extensive quantitative and qualitative analysis of Navi's performance, and provide insights into the opportunities for future research in agent development and data generation using Windows Agent Arena. Webpage: https://microsoft.github.io/WindowsAgentArena Code: https://github.com/microsoft/WindowsAgentArena",
    "date": "13.09.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Murty, Shikhar; Bahdanau, Dzmitry; Manning, Christopher D.",
    "title": "NNetscape Navigator: Complex Demonstrations for Web Agents Without a Demonstrator",
    "shorthand": "NNetscape Navigator",
    "multiLLM": "TRUE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama"
    ],
    "benchmarksUsed": [
      "WebArena",
      "WebVoyager"
    ],
    "strategies": [
      "preprocessing",
      "planning",
      "trajectories",
      "distillation",
      "training",
      "exploration"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "0",
    "overallFinal": "+",
    "doi": "https://openreview.net/pdf/a7da871c4a568909ab9cbab34b98749f1ac0d5ea.pdf",
    "abstract": "We introduce NNetscape Navigator (NNetnav), a method for training web agents entirely through synthetic demonstrations. These demonstrations are collected by first interacting with a browser to generate trajectory rollouts, which are then retroactively labeled into instructions using a language model. Most work on training browser agents has relied on expensive human supervision, and the limited previous work on such interaction-first synthetic data techniques has failed to provide effective search through the exponential space of exploration. In contrast, NNetnav exploits the hierarchical structure of language instructions to make this search more tractable: complex instructions are typically decomposable into simpler subtasks, allowing NNetnav to automatically prune interaction episodes when an intermediate trajectory cannot be annotated with a meaningful sub-task. We use NNetnav demonstrations from a language model for supervised fine-tuning of a smaller language model policy, and find improvements of 6 points on WebArena and over 20 points on MiniWoB++, two popular environments for web-agents. Notably, on WebArena, we observe that language model policies can be further enhanced when fine-tuned with NNetnav demonstrations derived from the same language model. Finally, we collect and release a dataset of over 6k NNetnav demonstrations on WebArena, spanning a diverse and complex set of instructions.",
    "date": "03.10.2024",
    "venue": "ICLR"
  },
  {
    "publicationYear": "2023",
    "authors": "Xie, Tianbao; Zhou, Fan; Cheng, Zhoujun; Shi, Peng; Weng, Luoxuan; Liu, Yitao; Hua, Toh Jing; Zhao, Junning; Liu, Qian; Liu, Che; Liu, Leo Z.; Xu, Yiheng; Su, Hongjin; Shin, Dongchan; Xiong, Caiming; Yu, Tao",
    "title": "OpenAgents: An Open Platform for Language Agents in the Wild",
    "shorthand": "OpenAgent",
    "multiLLM": "FALSE",
    "data_quartal": "2023-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "grounding",
      "preprocessing"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2310.10634",
    "abstract": "Language agents show potential in being capable of utilizing natural language for varied and intricate tasks in diverse environments, particularly when built upon large language models (LLMs). Current language agent frameworks aim to facilitate the construction of proof-of-concept language agents while neglecting the non-expert user access to agents and paying little attention to application-level designs. We present OpenAgents, an open platform for using and hosting language agents in the wild of everyday life. OpenAgents includes three agents: (1) Data Agent for data analysis with Python/SQL and data tools; (2) Plugins Agent with 200+ daily API tools; (3) Web Agent for autonomous web browsing. OpenAgents enables general users to interact with agent functionalities through a web user interface optimized for swift responses and common failures while offering developers and researchers a seamless deployment experience on local setups, providing a foundation for crafting innovative language agents and facilitating real-world evaluations. We elucidate the challenges and opportunities, aspiring to set a foundation for future research and development of real-world language agents.",
    "date": "16.10.2023",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Iong, Iat Long; Liu, Xiao; Chen, Yuxuan; Lai, Hanyu; Yao, Shuntian; Shen, Pengbo; Yu, Hao; Dong, Yuxiao; Tang, Jie",
    "title": "OpenWebAgent: An Open Toolkit to Enable Web Agents on Large Language Models",
    "shorthand": "OpenWebAgent",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [],
    "strategies": [],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.acl-demos.8/",
    "abstract": "We introduce OpenWebAgent, an open toolkit designed to optimize web automation by integrating both large language models (LLMs) and large multimodal models (LMMs). This toolkit focuses on enhancing human-computer interactions on the web, simplifying complex tasks through an advanced HTML parser, a rapid action generation module, and an intuitive user interface. At the core of OpenWebAgent is an innovative web agent framework that uses a modular design to allow developers to seamlessly integrate a variety of models and tools to process web information and automate tasks on the web. This enables the development of powerful, task-oriented web agents, significantly enhancing user experience and operational efficiency on the web. The OpenWebAgent framework, Chrome plugin, and demo video are available at https://github.com/THUDM/OpenWebAgent/.",
    "date": "01.08.2024",
    "venue": "ACL (Demos)"
  },
  {
    "publicationYear": "2024",
    "authors": "He, Hongliang; Yao, Wenlin; Ma, Kaixin; Yu, Wenhao; Zhang, Hongming; Fang, Tianqing; Lan, Zhenzhong; Yu, Dong",
    "title": [
      "OpenWebVoyager: Building Multimodal Web Agents via Iterative Real-World Exploration",
      "Feedback and Optimization"
    ],
    "shorthand": "OpenWebVoyager",
    "multiLLM": "FALSE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "idefics2"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WebVoyager"
    ],
    "strategies": [
      "learning",
      "pipelines",
      "preprocessing"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "http://arxiv.org/abs/2410.19609",
    "abstract": "The rapid development of large language and multimodal models has sparked significant interest in using proprietary models, such as GPT-4o, to develop autonomous agents capable of handling real-world scenarios like web navigation. Although recent open-source efforts have tried to equip agents with the ability to explore environments and continuously improve over time, they are building text-only agents in synthetic environments where the reward signals are clearly defined. Such agents struggle to generalize to realistic settings that require multimodal perception abilities and lack ground-truth signals. In this paper, we introduce an open-source framework designed to facilitate the development of multimodal web agent that can autonomously conduct real-world exploration and improve itself. We first train the base model with imitation learning to gain the basic abilities. We then let the agent explore the open web and collect feedback on its trajectories. After that, it further improves its policy by learning from well-performing trajectories judged by another general-purpose model. This exploration-feedback-optimization cycle can continue for several iterations. Experimental results show that our web agent successfully improves itself after each iteration, demonstrating strong performance across multiple test sets.",
    "date": "25.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Zhou, Yifei; Yang, Qianlan; Lin, Kaixiang; Bai, Min; Zhou, Xiong; Wang, Yu-Xiong; Levine, Sergey; Li, Erran",
    "title": "Proposer-Agent-Evaluator(PAE): Autonomous Skill Discovery For Foundation Model Internet Agents",
    "shorthand": "PAE",
    "multiLLM": "FALSE",
    "data_quartal": "2024-12",
    "inputModality": [
      "Visuals"
    ],
    "models": [
      "LLaVA",
      "Qwen"
    ],
    "benchmarksUsed": [
      "WebArena",
      "WebVoyager"
    ],
    "strategies": [
      "learning",
      "reinforcement learning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2412.13194",
    "abstract": "The vision of a broadly capable and goal-directed agent, such as an Internet-browsing agent in the digital world and a household humanoid in the physical world, has rapidly advanced, thanks to the generalization capability of foundation models. Such a generalist agent needs to have a large and diverse skill repertoire, such as finding directions between two travel locations and buying specific items from the Internet. If each skill needs to be specified manually through a fixed set of human-annotated instructions, the agent's skill repertoire will necessarily be limited due to the quantity and diversity of human-annotated instructions. In this work, we address this challenge by proposing Proposer-Agent-Evaluator, an effective learning system that enables foundation model agents to autonomously discover and practice skills in the wild. At the heart of PAE is a context-aware task proposer that autonomously proposes tasks for the agent to practice with context information of the environment such as user demos or even just the name of the website itself for Internet-browsing agents. Then, the agent policy attempts those tasks with thoughts and actual grounded operations in the real world with resulting trajectories evaluated by an autonomous VLM-based success evaluator. The success evaluation serves as the reward signal for the agent to refine its policies through RL. We validate PAE on challenging vision-based web navigation, using both real-world and self-hosted websites from WebVoyager and WebArena.To the best of our knowledge, this work represents the first effective learning system to apply autonomous task proposal with RL for agents that generalizes real-world human-annotated benchmarks with SOTA performances. Our open-source checkpoints and code can be found in https://yanqval.github.io/PAE/",
    "date": "17.12.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Erdogan, Lutfi Eren; Lee, Nicholas; Kim, Sehoon; Moon, Suhong; Furuta, Hiroki; Anumanchipalli, Gopala; Keutzer, Kurt; Gholami, Amir",
    "title": "Plan-and-Act: Improving Planning of Agents for Long-Horizon Tasks",
    "shorthand": "Plan&Act",
    "multiLLM": "TRUE",
    "data_quartal": "2025-03",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena-Lite"
    ],
    "strategies": [
      "grounding",
      "training",
      "planning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2503.09572",
    "abstract": "Large language models (LLMs) have shown remarkable advancements in enabling language agents to tackle simple tasks. However, applying them for complex, multi-step, long-horizon tasks remains a challenge. Recent work have found success by separating high-level planning from low-level execution, which enables the model to effectively balance high-level planning objectives and low-level execution details. However, generating accurate plans remains difficult since LLMs are not inherently trained for this task. To address this, we propose Plan-and-Act, a novel framework that incorporates explicit planning into LLM-based agents and introduces a scalable method to enhance plan generation through a novel synthetic data generation method. Plan-and-Act consists of a Planner model which generates structured, high-level plans to achieve user goals, and an Executor model that translates these plans into environment-specific actions. To train the Planner effectively, we introduce a synthetic data generation method that annotates ground-truth trajectories with feasible plans, augmented with diverse and extensive examples to enhance generalization. We evaluate Plan-and-Act using web navigation as a representative long-horizon planning environment, demonstrating a state-of the-art 54% success rate on the WebArena-Lite benchmark.",
    "date": "24.03.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Kim, Byoungjip; Jang, Youngsoo; Logeswaran, Lajanugen; Kim, Geon-Hyeong; Kim, Yu Jin; Lee, Honglak; Lee, Moontae",
    "title": "Prospector: Improving LLM Agents with Self-Asking and Trajectory Ranking",
    "shorthand": "Prospector",
    "multiLLM": "TRUE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "T5",
      "davinci"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "in context learning",
      "trajectories",
      "prompting",
      "finetuning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-emnlp.879/",
    "abstract": "Large language models (LLMs) have shown the ability to solve complex decision-making tasks beyond natural language processing tasks. LLM agents based on few-shot in-context learning (ICL) achieve surprisingly high performance without training. Despite their simplicity and generalizability, ICL-based agents are limited in their ability to incorporate feedback from an environment. In this paper, we introduce Prospector, an LLM agent that consists of two complementary LLMs, an Actor and a Critic. To elicit better instruction-aligned actions from the LLM agent, we propose AskAct prompting that performs an additional self-asking step such as goal and progress checking before generating an action. Furthermore, to implicitly incorporate the environment feedback, we propose Trajectory Ranking that orders generated trajectories by predicting the expected total reward. Prospector encourages the LLM Actor to generate diverse (creative) trajectories, and harnesses the LLM Critic to select the most rewarding trajectory. On representative decision-making benchmark environments such as ALFWorld and WebShop, we empirically demonstrate that Prospector can considerably increase the success rate of given tasks, while outperforming recent advancements such as ReAct and Reflexion.",
    "date": "01.11.2024",
    "venue": "EMNLP"
  },
  {
    "publicationYear": "2024",
    "authors": "Cai, Hongru; Li, Yongqi; Wang, Wenjie; Zhu, Fengbin; Shen, Xiaoyu; Li, Wenjie; Chua, Tat-Seng",
    "title": "Large Language Models Empowered Personalized Web Agents",
    "shorthand": "PUMA",
    "multiLLM": "FALSE",
    "data_quartal": "2024-10",
    "inputModality": [
      "API-calls"
    ],
    "models": [
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "PersonalWAB"
    ],
    "strategies": [
      "finetuning",
      "optimization",
      "memory",
      "api-based"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2410.17236",
    "abstract": "Web agents have emerged as a promising direction to automate Web task completion based on user instructions, significantly enhancing user experience. Recently, Web agents have evolved from traditional agents to Large Language Models (LLMs)-based Web agents. Despite their success, existing LLM-based Web agents overlook the importance of personalized data (e.g., user profiles and historical Web behaviors) in assisting the understanding of users' personalized instructions and executing customized actions. To overcome the limitation, we first formulate the task of LLM-empowered personalized Web agents, which integrate personalized data and user instructions to personalize instruction comprehension and action execution. To address the absence of a comprehensive evaluation benchmark, we construct a Personalized Web Agent Benchmark (PersonalWAB), featuring user instructions, personalized user data, Web functions, and two evaluation paradigms across three personalized Web tasks. Moreover, we propose a Personalized User Memory-enhanced Alignment (PUMA) framework to adapt LLMs to the personalized Web agent task. PUMA utilizes a memory bank with a task-specific retrieval strategy to filter relevant historical Web behaviors. Based on the behaviors, PUMA then aligns LLMs for personalized action execution through fine-tuning and direct preference optimization. Extensive experiments validate the superiority of PUMA over existing Web agents on PersonalWAB.",
    "date": "22.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Huang, Tenghao; Basu, Kinjal; Abdelaziz, Ibrahim; Kapanipathi, Pavan; May, Jonathan; Chen, Muhao",
    "title": [
      "R2D2: Remembering",
      "Reflecting and Dynamic Decision Making for Web Agents"
    ],
    "shorthand": "R2D2",
    "multiLLM": "TRUE",
    "data_quartal": "2025-01",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "MiniLM"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "decision making",
      "reflection",
      "memory",
      "Tree Search"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2501.12485",
    "abstract": "The proliferation of web agents necessitates advanced navigation and interaction strategies within complex web environments. Current models often struggle with efficient navigation and action execution due to limited visibility and understanding of web structures. Our proposed R2D2 framework addresses these challenges by integrating two paradigms: Remember and Reflect. The Remember paradigm utilizes a replay buffer that aids agents in reconstructing the web environment dynamically, thus enabling the formulation of a detailed ``map'' of previously visited pages. This helps in reducing navigational errors and optimizing the decision-making process during web interactions. Conversely, the Reflect paradigm allows agents to learn from past mistakes by providing a mechanism for error analysis and strategy refinement, enhancing overall task performance. We evaluate R2D2 using the WEBARENA benchmark, demonstrating significant improvements over existing methods, including a 50% reduction in navigation errors and a threefold increase in task completion rates. Our findings suggest that a combination of memory-enhanced navigation and reflective learning promisingly advances the capabilities of web agents, potentially benefiting various applications such as automated customer service and personal digital assistants.",
    "date": "21.01.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Kim, Minsoo; Bursztyn, Victor; Koh, Eunyee; Guo, Shunan; Hwang, Seung-won",
    "title": "RaDA: Retrieval-augmented Web Agent Planning with LLMs",
    "shorthand": "RaDA",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "CompWoB",
      "Mind2Web"
    ],
    "strategies": [
      "rag",
      "planning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-acl.802/",
    "abstract": "Agents powered by large language models (LLMs) inherit important limitations, such as the restricted context length, dependency on human-engineered exemplars (e.g., for task decomposition), and insufficient generalization. To address these challenges, we propose RaDA, a novel planning method for Web agents that does not require manual exemplars, efficiently leverages the LLMs' context, and enhances generalization. RaDA disentangles planning into two stages: for a new given task, during Retrieval-augmented Task Decomposition (RaD), it decomposes tasks into high-level subtasks; next, during Retrieval-augmented Action Generation (RaA), it traverses the trajectory obtained with RaD to iteratively synthesize actions based on dynamically retrieved exemplars. We compare RaDA with strong baselines covering a broad space of design choices, using both GPT-3.5 and GPT-4 as backbones; and we find consistent improvements over previous SOTA in two challenging benchmarks, CompWoB and Mind2Web, covering settings with different complexities. We show the contributions of RaDA via ablation studies and qualitative analysis; and we discuss the structural benefits of our more compositional design.",
    "date": "01.08.2024",
    "venue": "ACL"
  },
  {
    "publicationYear": "2023",
    "authors": "Kim, Geunwoo; Baldi, Pierre; McAleer, Stephen",
    "title": "Language Models can Solve Computer Tasks",
    "shorthand": "RCI",
    "multiLLM": "FALSE",
    "data_quartal": "2023-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "MiniWoB++"
    ],
    "strategies": [
      "prompting"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/7cc1005ec73cfbaac9fa21192b622507-Abstract-Conference.html",
    "abstract": "",
    "date": "01.12.2023",
    "venue": "NeurIPS"
  },
  {
    "publicationYear": "2023",
    "authors": "Yao, Shunyu; Zhao, Jeffrey; Yu, Dian; Du, Nan; Shafran, Izhak; Narasimhan, Karthik; Cao, Yuan",
    "title": "ReAct: Synergizing Reasoning and Acting in Language Models",
    "shorthand": "ReAct",
    "multiLLM": "FALSE",
    "data_quartal": "2023-03",
    "inputModality": [
      "Text"
    ],
    "models": [
      "PaLM2"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "prompting",
      "planning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2210.03629",
    "abstract": "",
    "date": "10.03.2023",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2021",
    "authors": "Xu, Nancy; Masling, Sam; Du, Michael; Campagna, Giovanni; Heck, Larry; Landay, James; Lam, Monica",
    "title": "Grounding Open-Domain Instructions to Automate Web Support Tasks",
    "shorthand": "RUSS",
    "multiLLM": "FALSE",
    "data_quartal": "2021-06",
    "inputModality": [
      "Text"
    ],
    "models": [
      "BERT"
    ],
    "benchmarksUsed": [
      "RUSSDataset"
    ],
    "strategies": [
      "grounding"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://aclanthology.org/2021.naacl-main.80/",
    "abstract": "Grounding natural language instructions on the web to perform previously unseen tasks enables accessibility and automation. We introduce a task and dataset to train AI agents from open-domain, step-by-step instructions originally written for people. We build RUSS (Rapid Universal Support Service) to tackle this problem. RUSS consists of two models: First, a BERT-LSTM with pointers parses instructions to WebLang, a domain-specific language we design for grounding natural language on the web. Then, a grounding model retrieves the unique IDs of any webpage elements requested in the WebLang. RUSS may interact with the user through a dialogue (e.g. ask for an address) or execute a web operation (e.g. click a button) inside the web runtime. To augment training, we synthesize natural language instructions mapped to WebLang. Our dataset consists of 80 different customer service problems from help websites, with a total of 741 step-by-step instructions and their corresponding actions. RUSS achieves 76.7% end-to-end accuracy predicting agent actions from single instructions. It outperforms state-of-the-art models that directly map instructions to actions without WebLang. Our user study shows that RUSS is preferred by actual users over web navigation.",
    "date": "01.06.2021",
    "venue": "NAACL"
  },
  {
    "publicationYear": "2025",
    "authors": "Tur, Ada Defne; Meade, Nicholas; L\u00f9, Xing Han; Zambrano, Alejandra; Patel, Arkil; Durmus, Esin; Gella, Spandana; Sta?czak, Karolina; Reddy, Siva",
    "title": "SafeArena: Evaluating the Safety of Autonomous Web Agents",
    "shorthand": "SafeArena",
    "multiLLM": "FALSE",
    "data_quartal": "2025-03",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Claude",
      "Llama",
      "GPT",
      "Qwen"
    ],
    "benchmarksUsed": [
      "SafeArena"
    ],
    "strategies": [
      "evaluation"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2503.04957",
    "abstract": "LLM-based agents are becoming increasingly proficient at solving web-based tasks. With this capability comes a greater risk of misuse for malicious purposes, such as posting misinformation in an online forum or selling illicit substances on a website. To evaluate these risks, we propose SafeArena, the first benchmark to focus on the deliberate misuse of web agents. SafeArena comprises 250 safe and 250 harmful tasks across four websites. We classify the harmful tasks into five harm categories -- misinformation, illegal activity, harassment, cybercrime, and social bias, designed to assess realistic misuses of web agents. We evaluate leading LLM-based web agents, including GPT-4o, Claude-3.5 Sonnet, Qwen-2-VL 72B, and Llama-3.2 90B, on our benchmark. To systematically assess their susceptibility to harmful tasks, we introduce the Agent Risk Assessment framework that categorizes agent behavior across four risk levels. We find agents are surprisingly compliant with malicious requests, with GPT-4o and Qwen-2 completing 34.7% and 27.3% of harmful requests, respectively. Our findings highlight the urgent need for safety alignment procedures for web agents. Our benchmark is available here: https://safearena.github.io",
    "date": "06.03.2025",
    "venue": "NAACL"
  },
  {
    "publicationYear": "2024",
    "authors": "Song, Yifan; Xiong, Weimin; Zhao, Xiutian; Zhu, Dawei; Wu, Wenhao; Wang, Ke; Li, Cheng; Peng, Wei; Li, Sujian",
    "title": "AgentBank: Towards Generalized LLM Agents via Fine-Tuning on 50000+ Interaction Trajectories",
    "shorthand": "SAMOYED",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama"
    ],
    "benchmarksUsed": [
      "AgentBank"
    ],
    "strategies": [
      "trajectories"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-emnlp.116/",
    "abstract": "Fine-tuning on agent-environment interaction trajectory data holds significant promise for surfacing generalized agent capabilities in open-source large language models (LLMs). In this work, we introduce AgentBank, by far the largest trajectory tuning data collection featuring more than 50k diverse high-quality interaction trajectories which comprises 16 tasks covering five distinct agent skill dimensions. Leveraging a novel annotation pipeline, we are able to scale the annotated trajectories and generate a trajectory dataset with minimized difficulty bias. Furthermore, we fine-tune LLMs on AgentBank to get a series of agent models, Samoyed. Our comparative experiments demonstrate the effectiveness of scaling the interaction trajectory data to acquire generalized agent capabilities. Additional studies also reveal some key observations regarding trajectory tuning and agent skill generalization.",
    "date": "01.11.2024",
    "venue": "EMNLP"
  },
  {
    "publicationYear": "2024",
    "authors": "Shen, Junhong; Jain, Atishay; Xiao, Zedian; Amlekar, Ishan; Hadji, Mouad; Podolny, Aaron; Talwalkar, Ameet",
    "title": "ScribeAgent: Towards Specialized Web Agents Using Production-Scale Workflow Data",
    "shorthand": "ScribeAgent",
    "multiLLM": "FALSE",
    "data_quartal": "2024-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "strategies": [
      "finetuning"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "http://arxiv.org/abs/2411.15004",
    "abstract": "Large Language Model (LLM) agents are rapidly improving to handle increasingly complex web-based tasks. Most of these agents rely on general-purpose, proprietary models like GPT-4 and focus on designing better prompts to improve their planning abilities. However, general-purpose LLMs are not specifically trained to understand specialized web contexts such as HTML, and they often struggle with long-horizon planning. We explore an alternative approach that fine-tunes open-source LLMs using production-scale workflow data collected from over 250 domains corresponding to 6 billion tokens. This simple yet effective approach shows substantial gains over prompting-based agents on existing benchmarks -- ScribeAgent achieves state-of-the-art direct generation performance on Mind2Web and improves the task success rate by 7.3% over the previous best text-only web agents on WebArena. We further perform detailed ablation studies on various fine-tuning design choices and provide insights into LLM selection, training recipes, context window optimization, and effect of dataset sizes.",
    "date": "05.12.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Zheng, Boyuan; Gou, Boyu; Kil, Jihyung; Sun, Huan; Su, Yu",
    "title": [
      "GPT-4V(ision) is a Generalist Web Agent",
      "if Grounded"
    ],
    "shorthand": "SeeAct",
    "multiLLM": "FALSE",
    "data_quartal": "2024-03",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "BLIP2",
      "LLaVA",
      "GPT"
    ],
    "benchmarksUsed": [
      "Multimodal-Mind2Web"
    ],
    "strategies": [
      "grounding"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2401.01614",
    "abstract": "The recent development on large multimodal models (LMMs), especially GPT-4V(ision) and Gemini, has been quickly expanding the capability boundaries of multimodal models beyond traditional tasks like image captioning and visual question answering. In this work, we explore the potential of LMMs like GPT-4V as a generalist web agent that can follow natural language instructions to complete tasks on any given website. We propose SEEACT, a generalist web agent that harnesses the power of LMMs for integrated visual understanding and acting on the web. We evaluate on the recent MIND2WEB benchmark. In addition to standard offline evaluation on cached websites, we enable a new online evaluation setting by developing a tool that allows running web agents on live websites. We show that GPT-4V presents a great potential for web agents -- it can successfully complete 51.1 of the tasks on live websites if we manually ground its textual plans into actions on the websites. This substantially outperforms text-only LLMs like GPT-4 or smaller models (FLAN-T5 and BLIP-2) specifically fine-tuned for web agents. However, grounding still remains a major challenge. Existing LMM grounding strategies like set-of-mark prompting turns out to be not effective for web agents, and the best grounding strategy we develop in this paper leverages both the HTML structure and visuals. Yet, there is still a substantial gap with oracle grounding, leaving ample room for further improvement. All code, data, and evaluation tools are available at https://github.com/OSU-NLP-Group/SeeAct.",
    "date": "12.03.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Yoran, Ori; Amouyal, Samuel Joseph; Malaviya, Chaitanya; Bogin, Ben; Press, Ofir; Berant, Jonathan",
    "title": "AssistantBench: Can Web Agents Solve Realistic and Time-Consuming Tasks?",
    "shorthand": "SeePlanAct",
    "multiLLM": "FALSE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "AssistantBench"
    ],
    "strategies": [
      "rag",
      "planning",
      "memory"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2407.15711",
    "abstract": "Language agents, built on top of language models (LMs), are systems that can interact with complex environments, such as the open web. In this work, we examine whether such agents can perform realistic and time-consuming tasks on the web, e.g., monitoring real-estate markets or locating relevant nearby businesses. We introduce AssistantBench, a challenging new benchmark consisting of 214 realistic tasks that can be automatically evaluated, covering different scenarios and domains. We find that AssistantBench exposes the limitations of current systems, including language models and retrieval-augmented language models, as no model reaches an accuracy of more than 26 points. While closed-book LMs perform well in terms of accuracy, they exhibit low precision and tend to hallucinate facts. State-of-the-art web agents reach a score of near zero. Additionally, we introduce SeePlanAct (SPA), a new web agent that significantly outperforms previous agents, and an ensemble of SPA and closed-book models reaches the best overall performance. Moreover, we analyze failures of current systems and highlight that open web navigation remains a major challenge.",
    "date": "21.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Sodhi, Paloma; Branavan, S. R. K.; Artzi, Yoav; McDonald, Ryan",
    "title": "SteP: Stacked LLM Policies for Web Actions",
    "shorthand": "SteP",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "davinci",
      "GPT"
    ],
    "benchmarksUsed": [
      "MiniWoB++",
      "WebArena"
    ],
    "strategies": [
      "markov",
      "planning",
      "policy optimization"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2310.03720",
    "abstract": "",
    "date": "08.08.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Zheng, Longtao; Wang, Rundong; Wang, Xinrun; An, Bo",
    "title": "Synapse: Trajectory-as-Exemplar Prompting with Memory for Computer Control",
    "shorthand": "Synapse",
    "multiLLM": "FALSE",
    "data_quartal": "2024-01",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "MiniWoB++"
    ],
    "strategies": [
      "in context learning",
      "preprocessing",
      "prompting",
      "memory"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2306.07863",
    "abstract": "",
    "date": "19.01.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Ou, Tianyue; Xu, Frank F.; Madaan, Aman; Liu, Jiarui; Lo, Robert; Sridhar, Abishek; Sengupta, Sudipta; Roth, Dan; Neubig, Graham; Zhou, Shuyan",
    "title": "Synatra: Turning Indirect Knowledge into Direct Demonstrations for Digital Agents at Scale",
    "shorthand": "Synatra",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "MiniWoB++",
      "WebArena"
    ],
    "strategies": [
      "preprocessing",
      "trajectories",
      "finetuning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "http://arxiv.org/abs/2409.15637",
    "abstract": "",
    "date": "27.11.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Zhou, Ruiwen; Yang, Yingxuan; Wen, Muning; Wen, Ying; Wang, Wenhao; Xi, Chunling; Xu, Guoqiang; Yu, Yong; Zhang, Weinan",
    "title": "TRAD: Enhancing LLM Agents with Step-Wise Thought Retrieval and Aligned Decision",
    "shorthand": "TRAD",
    "multiLLM": "FALSE",
    "data_quartal": "2024-03",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "strategies": [
      "decision making",
      "rag",
      "prompting"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2403.06221",
    "abstract": "Numerous large language model (LLM) agents have been built for different tasks like web navigation and online shopping due to LLM's wide knowledge and text-understanding ability. Among these works, many of them utilize in-context examples to achieve generalization without the need for fine-tuning, while few of them have considered the problem of how to select and effectively utilize these examples. Recently, methods based on trajectory-level retrieval with task meta-data and using trajectories as in-context examples have been proposed to improve the agent's overall performance in some sequential decision making tasks. However, these methods can be problematic due to plausible examples retrieved without task-specific state transition dynamics and long input with plenty of irrelevant context. In this paper, we propose a novel framework (TRAD) to address these issues. TRAD first conducts Thought Retrieval, achieving step-level demonstration selection via thought matching, leading to more helpful demonstrations and less irrelevant input noise. Then, TRAD introduces Aligned Decision, complementing retrieved demonstration steps with their previous or subsequent steps, which enables tolerance for imperfect thought and provides a choice for balance between more context and less noise. Extensive experiments on ALFWorld and Mind2Web benchmarks show that TRAD not only outperforms state-of-the-art models but also effectively helps in reducing noise and promoting generalization. Furthermore, TRAD has been deployed in real-world scenarios of a global business insurance company and improves the success rate of robotic process automation.",
    "date": "10.03.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Koh, Jing Yu; McAleer, Stephen; Fried, Daniel; Salakhutdinov, Ruslan",
    "title": "Tree Search for Language Model Agents",
    "shorthand": "TreeSearch",
    "multiLLM": "FALSE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "VisualWebArena",
      "WebArena"
    ],
    "strategies": [
      "reward",
      "prompting",
      "memory",
      "Tree Search"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2407.01476",
    "abstract": "Autonomous agents powered by language models (LMs) have demonstrated promise in their ability to perform decision-making tasks such as web automation. However, a key limitation remains: LMs, primarily optimized for natural language understanding and generation, struggle with multi-step reasoning, planning, and using environmental feedback when attempting to solve realistic computer tasks. Towards addressing this, we propose an inference-time search algorithm for LM agents to explicitly perform exploration and multi-step planning in interactive web environments. Our approach is a form of best-first tree search that operates within the actual environment space, and is complementary with most existing state-of-the-art agents. It is the first tree search algorithm for LM agents that shows effectiveness on realistic web tasks. On the challenging VisualWebArena benchmark, applying our search algorithm on top of a GPT-4o agent yields a 39.7% relative increase in success rate compared to the same baseline without search, setting a state-of-the-art success rate of 26.4%. On WebArena, search also yields a 28.0% relative improvement over a baseline agent, setting a competitive success rate of 19.2%. Our experiments highlight the effectiveness of search for web agents, and we demonstrate that performance scales with increased test-time compute. We conduct a thorough analysis of our results to highlight improvements from search, limitations, and promising directions for future work. Our code and models are publicly released at https://jykoh.com/search-agents.",
    "date": "12.10.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Liu, Junpeng; Ou, Tianyue; Song, Yifan; Qu, Yuxiao; Lam, Wai; Xiong, Chenyan; Chen, Wenhu; Neubig, Graham; Yue, Xiang",
    "title": "Harnessing Webpage UIs for Text-Rich Visual Understanding",
    "shorthand": "UIX",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Vicuna",
      "Llama",
      "Qwen"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "VisualWebBench"
    ],
    "strategies": [
      "grounding",
      "evaluation",
      "training"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "http://arxiv.org/abs/2410.13824",
    "abstract": "Text-rich visual understanding-the ability to process environments where dense textual content is integrated with visuals-is crucial for multimodal large language models (MLLMs) to interact effectively with structured environments. To enhance this capability, we propose synthesizing general multimodal instructions from webpage UIs using text-based large language models (LLMs). Despite lacking direct visual input, text-based LLMs are able to process structured text representations from webpage accessibility trees. These instructions are then paired with UI screenshots to train multimodal models. We introduce MultiUI, a dataset containing 7.3 million samples from 1 million websites, covering diverse multimodal tasks and UI layouts. Models trained on MultiUI not only excel in web UI tasks-achieving up to a 48% improvement on VisualWebBench and a 19.1% boost in element accuracy on a web agent dataset Mind2Web-but also generalize surprisingly well to non-web UI tasks and even to non-UI domains, such as document understanding, OCR, and chart interpretation. These results highlight the broad applicability of web UI data for advancing text-rich visual understanding across various scenarios.",
    "date": "06.11.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Liu, Xiao; Zhang, Tianjie; Gu, Yu; Iong, Iat Long; Xu, Yifan; Song, Xixuan; Zhang, Shudan; Lai, Hanyu; Liu, Xinyi; Zhao, Hanlin; Sun, Jiadai; Yang, Xinyue; Yang, Yu; Qi, Zehan; Yao, Shuntian; Sun, Xueqiao; Cheng, Siyi; Zheng, Qinkai; Yu, Hao; Zhang, Hanchen; Hong, Wenyi; Ding, Ming; Pan, Lihang; Gu, Xiaotao; Zeng, Aohan; Du, Zhengxiao; Song, Chan Hee; Su, Yu; Dong, Yuxiao; Tang, Jie",
    "title": "VisualAgentBench: Towards Large Multimodal Models as Visual Foundation Agents",
    "shorthand": "VisualAgentBench",
    "multiLLM": "FALSE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "CogVLM",
      "InternVL",
      "Qwen",
      "Gemini",
      "LLaVA",
      "Mistral",
      "Claude",
      "GPT",
      "GLM"
    ],
    "benchmarksUsed": [
      "WebArena-Lite"
    ],
    "strategies": [
      "training",
      "learning",
      "preprocessing",
      "finetuning"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2408.06327",
    "abstract": "Large Multimodal Models (LMMs) have ushered in a new era in artificial intelligence, merging capabilities in both language and vision to form highly capable Visual Foundation Agents. These agents are postulated to excel across a myriad of tasks, potentially approaching general artificial intelligence. However, existing benchmarks fail to sufficiently challenge or showcase the full potential of LMMs in complex, real-world environments. To address this gap, we introduce VisualAgentBench (VAB), a comprehensive and pioneering benchmark specifically designed to train and evaluate LMMs as visual foundation agents across diverse scenarios, including Embodied, Graphical User Interface, and Visual Design, with tasks formulated to probe the depth of LMMs\u0092 understanding and interaction capabilities. Through rigorous testing across nine proprietary LMM APIs and eight open models, we demonstrate the considerable yet still developing agent capabilities of these models. Additionally, VAB constructs a trajectory training set constructed through hybrid methods including Program-based Solvers, LMM Agent Bootstrapping, and Human Demonstrations, promoting substantial performance improvements in LMMs through behavior cloning. Our work not only aims to benchmark existing models but also provides a solid foundation for future development into visual foundation agents. Code, train & test data, and part of fine-tuned open LMMs are available at https://github.com/THUDM/VisualAgentBench.",
    "date": "12.08.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Zhou, Shuyan; Xu, Frank F.; Zhu, Hao; Zhou, Xuhui; Lo, Robert; Sridhar, Abishek; Cheng, Xianyi; Ou, Tianyue; Bisk, Yonatan; Fried, Daniel; Alon, Uri; Neubig, Graham",
    "title": "WebArena: A Realistic Web Environment for Building Autonomous Agents",
    "shorthand": "WebArena",
    "multiLLM": "FALSE",
    "data_quartal": "2024-04",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "PaLM2",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "planning"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2307.13854",
    "abstract": "With advances in generative AI, there is now potential for autonomous agents to manage daily tasks via natural language commands. However, current agents are primarily created and tested in simplified synthetic environments, leading to a disconnect with real-world scenarios. In this paper, we build an environment for language-guided agents that is highly realistic and reproducible. Specifically, we focus on agents that perform tasks on the web, and create an environment with fully functional websites from four common domains: e-commerce, social forum discussions, collaborative software development, and content management. Our environment is enriched with tools (e.g., a map) and external knowledge bases (e.g., user manuals) to encourage human-like task-solving. Building upon our environment, we release a set of benchmark tasks focusing on evaluating the functional correctness of task completions. The tasks in our benchmark are diverse, long-horizon, and designed to emulate tasks that humans routinely perform on the internet. We experiment with several baseline agents, integrating recent techniques such as reasoning before acting. The results demonstrate that solving complex tasks is challenging: our best GPT-4-based agent only achieves an end-to-end task success rate of 14.41%, significantly lower than the human performance of 78.24%. These results highlight the need for further development of robust agents, that current state-of-the-art large language models are far from perfect performance in these real-life tasks, and that WebArena can be used to measure such progress. Our code, data, environment reproduction resources, and video demonstrations are publicly available at https://webarena.dev/.",
    "date": "16.04.2024",
    "venue": "ICLR"
  },
  {
    "publicationYear": "2024",
    "authors": "Pan, Yichen; Kong, Dehan; Zhou, Sida; Cui, Cheng; Leng, Yifei; Jiang, Bing; Liu, Hangyu; Shang, Yanyi; Zhou, Shuyan; Wu, Tongshuang; Wu, Zhengyang",
    "title": "WebCanvas: Benchmarking Web Agents in Online Environments",
    "shorthand": "WebCanvas",
    "multiLLM": "FALSE",
    "data_quartal": "2024-07",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web-live"
    ],
    "strategies": [
      "memory"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2406.12373",
    "abstract": "For web agents to be practically useful, they must adapt to the continuously evolving web environment characterized by frequent updates to user interfaces and content. However, most existing benchmarks only capture the static aspects of the web. To bridge this gap, we introduce WebCanvas, an innovative online evaluation framework for web agents that effectively addresses the dynamic nature of web interactions. WebCanvas contains three main components to facilitate realistic assessments: (1) A novel evaluation metric which reliably capture critical intermediate actions or states necessary for task completions while disregarding noise caused by insignificant events or changed web-elements. (2) A benchmark dataset called Mind2Web-Live, a refined version of original Mind2Web static dataset containing 542 tasks with 2439 intermediate evaluation states; (3) Lightweight and generalizable annotation tools and testing pipelines that enables the community to collect and maintain the high-quality, up-to-date dataset. Building on WebCanvas, we open-source an agent framework with extensible modules for reasoning, providing a foundation for the community to conduct online inference and evaluations. Our best-performing agent achieves a task success rate of 23.1% and a task completion rate of 48.8% on the Mind2Web-Live test set. Additionally, we analyze the performance discrepancies across various websites, domains, and experimental environments. We encourage the community to contribute further insights on online agent evaluation, thereby advancing this field of research.",
    "date": "16.07.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Gu, Yu; Zheng, Boyuan; Gou, Boyu; Zhang, Kai; Chang, Cheng; Srivastava, Sanjari; Xie, Yanan; Qi, Peng; Sun, Huan; Su, Yu",
    "title": "Is Your LLM Secretly a World Model of the Internet? Model-Based Planning for Web Agents",
    "shorthand": "Webdreamer",
    "multiLLM": "FALSE",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web-live",
      "VisualWebArena"
    ],
    "strategies": [
      "simulation",
      "planning"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2411.06559",
    "abstract": "Language agents have demonstrated promising capabilities in automating web-based tasks, though their current reactive approaches still underperform largely compared to humans. While incorporating advanced planning algorithms, particularly tree search methods, could enhance these agents' performance, implementing tree search directly on live websites poses significant safety risks and practical constraints due to irreversible actions such as confirming a purchase. In this paper, we introduce a novel paradigm that augments language agents with model-based planning, pioneering the innovative use of large language models (LLMs) as world models in complex web environments. Our method, WebDreamer, builds on the key insight that LLMs inherently encode comprehensive knowledge about website structures and functionalities. Specifically, WebDreamer uses LLMs to simulate outcomes for each candidate action (e.g., \"what would happen if I click this button?\") using natural language descriptions, and then evaluates these imagined outcomes to determine the optimal action at each step. Empirical results on two representative web agent benchmarks with online interaction -- VisualWebArena and Mind2Web-live -- demonstrate that WebDreamer achieves substantial improvements over reactive baselines. By establishing the viability of LLMs as world models in web environments, this work lays the groundwork for a paradigm shift in automated web interaction. More broadly, our findings open exciting new avenues for future research into 1) optimizing LLMs specifically for world modeling in complex, dynamic environments, and 2) model-based speculative planning for language agents.",
    "date": "10.11.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Furuta, Hiroki; Lee, Kuang-Huei; Nachum, Ofir; Matsuo, Yutaka; Faust, Aleksandra; Gu, Shixiang Shane; Gur, Izzeddin",
    "title": "Multimodal Web Navigation with Instruction-Finetuned Foundation Models",
    "shorthand": "WEBGUM",
    "multiLLM": "FALSE",
    "data_quartal": "2024-02",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "T5",
      "ViT"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "MiniWoB++",
      "WebShop"
    ],
    "strategies": [
      "finetuning"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2305.11854",
    "abstract": "The progress of autonomous web navigation has been hindered by the dependence on billions of exploratory interactions via online reinforcement learning, and domain-specific model designs that make it difficult to leverage generalization from rich out-of-domain data. In this work, we study data-driven offline training for web agents with vision-language foundation models. We propose an instruction-following multimodal agent, WebGUM, that observes both webpage screenshots and HTML pages and outputs web navigation actions, such as click and type. WebGUM is trained by jointly finetuning an instruction-finetuned language model and a vision encoder with temporal and local perception on a large corpus of demonstrations. We empirically demonstrate this recipe improves the agent's ability of grounded multimodal perception, HTML comprehension, and multi-step reasoning, outperforming prior works by a significant margin. On the MiniWoB, we improve over the previous best offline methods by more than 45.8%, even outperforming online-finetuned SoTA, humans, and GPT-4-based agent. On the WebShop benchmark, our 3-billion-parameter model achieves superior performance to the existing SoTA, PaLM-540B. Furthermore, WebGUM exhibits strong positive transfer to the real-world planning tasks on the Mind2Web. We also collect 347K high-quality demonstrations using our trained models, 38 times larger than prior work, and make them available to promote future research in this direction.",
    "date": "25.02.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "L\u00f9, Xing Han; Kasner, Zden?k; Reddy, Siva",
    "title": "WebLINX: Real-World Website Navigation with Multi-Turn Dialogue",
    "shorthand": "WebLinx",
    "multiLLM": "FALSE",
    "data_quartal": "2024-09",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Fuyu",
      "T5",
      "Llama",
      "Pix2Struct",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebLinx"
    ],
    "strategies": [
      "evaluation"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2402.05930",
    "abstract": "We propose the problem of conversational web navigation, where a digital agent controls a web browser and follows user instructions to solve real-world tasks in a multi-turn dialogue fashion. To support this problem, we introduce WEBLINX - a large-scale benchmark of 100K interactions across 2300 expert demonstrations of conversational web navigation. Our benchmark covers a broad range of patterns on over 150 real-world websites and can be used to train and evaluate agents in diverse scenarios. Due to the magnitude of information present, Large Language Models (LLMs) cannot process entire web pages in real-time. To solve this bottleneck, we design a retrieval-inspired model that efficiently prunes HTML pages by ranking relevant elements. We use the selected elements, along with screenshots and action history, to assess a variety of models for their ability to replicate human behavior when navigating the web. Our experiments span from small text-only to proprietary multimodal LLMs. We find that smaller finetuned decoders surpass the best zero-shot LLMs (including GPT-4V), but also larger finetuned multimodal models which were explicitly pretrained on screenshots. However, all finetuned models struggle to generalize to unseen websites. Our findings highlight the need for large multimodal models that can generalize to novel settings. Our code, data and models are available for research: https://mcgill-nlp.github.io/weblinx",
    "date": "10.09.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2023",
    "authors": "Gur, Izzeddin; Nachum, Ofir; Miao, Yingjie; Safdari, Mustafa; Huang, Austin; Chowdhery, Aakanksha; Narang, Sharan; Fiedel, Noah; Faust, Aleksandra",
    "title": "Understanding HTML with Large Language Models",
    "shorthand": "WebN",
    "multiLLM": "FALSE",
    "data_quartal": "2023-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "LaMDa",
      "T5"
    ],
    "benchmarksUsed": [
      "MiniWoB"
    ],
    "strategies": [
      "evaluation",
      "preprocessing",
      "finetuning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2023.findings-emnlp.185/",
    "abstract": "Large language models (LLMs) have shown exceptional performance on a variety of natural language tasks. Yet, their capabilities for HTML understanding \u0096 i.e., parsing the raw HTML of a webpage, with applications to automation of web-based tasks, crawling, and browser-assisted retrieval \u0096 have not been fully explored. We contribute HTML understanding models (fine-tuned LLMs) and an in-depth analysis of their capabilities under three tasks: (i) Semantic Classification of HTML elements, (ii) Description Generation for HTML inputs, and (iii) Autonomous Web Navigation of HTML pages. While previous work has developed dedicated architectures and training procedures for HTML understanding, we show that LLMs pretrained on standard natural language corpora transfer remarkably well to HTML understanding tasks. For instance, when fine-tuned on data from the MiniWoB benchmark, LLMs successfully complete 50% more tasks using 192x less data compared to the previous best supervised model. We create and open-source a large-scale HTML dataset distilled and auto-labeled from CommonCrawl",
    "date": "01.12.2023",
    "venue": "EMNLP"
  },
  {
    "publicationYear": "2024",
    "authors": "Zhang, Yao; Ma, Zijian; Ma, Yunpu; Han, Zhen; Wu, Yu; Tresp, Volker",
    "title": "WebPilot: A Versatile and Autonomous Multi-Agent System for Web Task Execution with Strategic Exploration",
    "shorthand": "WebPilot",
    "multiLLM": "TRUE",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "other",
      "GPT"
    ],
    "benchmarksUsed": [
      "MiniWoB++",
      "WebArena"
    ],
    "strategies": [
      "simulation",
      "learning",
      "planning",
      "Tree Search",
      "reflection",
      "training"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2408.15978",
    "abstract": "LLM-based autonomous agents often fail to execute complex web tasks that require dynamic interaction due to the inherent uncertainty and complexity of these environments. Existing LLM-based web agents typically rely on rigid, expert-designed policies specific to certain states and actions, which lack the flexibility and generalizability needed to adapt to unseen tasks. In contrast, humans excel by exploring unknowns, continuously adapting strategies, and resolving ambiguities through exploration. To emulate human-like adaptability, web agents need strategic exploration and complex decision-making. Monte Carlo Tree Search (MCTS) is well-suited for this, but classical MCTS struggles with vast action spaces, unpredictable state transitions, and incomplete information in web tasks. In light of this, we develop WebPilot, a multi-agent system with a dual optimization strategy that improves MCTS to better handle complex web environments. Specifically, the Global Optimization phase involves generating a high-level plan by breaking down tasks into manageable subtasks and continuously refining this plan, thereby focusing the search process and mitigating the challenges posed by vast action spaces in classical MCTS. Subsequently, the Local Optimization phase executes each subtask using a tailored MCTS designed for complex environments, effectively addressing uncertainties and managing incomplete information. Experimental results on WebArena and MiniWoB++ demonstrate the effectiveness of WebPilot. Notably, on WebArena, WebPilot achieves SOTA performance with GPT-4, achieving a 93% relative increase in success rate over the concurrent tree search-based method. WebPilot marks a significant advancement in general autonomous agent capabilities, paving the way for more advanced and reliable decision-making in practical environments.",
    "date": "28.08.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Qi, Zehan; Liu, Xiao; Iong, Iat Long; Lai, Hanyu; Sun, Xueqiao; Zhao, Wenyi; Yang, Yu; Yang, Xinyue; Sun, Jiadai; Yao, Shuntian; Zhang, Tianjie; Xu, Wei; Tang, Jie; Dong, Yuxiao",
    "title": "WebRL: Training LLM Web Agents via Self-Evolving Online Curriculum Reinforcement Learning",
    "shorthand": "WebRL",
    "multiLLM": "FALSE",
    "data_quartal": "2025-01",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "GLM"
    ],
    "benchmarksUsed": [
      "WebArena-Lite"
    ],
    "strategies": [
      "learning",
      "reinforcement learning",
      "reward"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2411.02337",
    "abstract": "Large language models (LLMs) have shown remarkable potential as autonomous agents, particularly in web-based tasks. However, existing LLM web agents heavily rely on expensive proprietary LLM APIs, while open LLMs lack the necessary decision-making capabilities. This paper introduces WebRL, a self-evolving online curriculum reinforcement learning framework designed to train high-performance web agents using open LLMs. WebRL addresses three key challenges in building LLM web agents, including the scarcity of training tasks, sparse feedback signals, and policy distribution drift in online learning. Specifically, WebRL incorporates 1) a self-evolving curriculum that generates new tasks from unsuccessful attempts, 2) a robust outcome-supervised reward model (ORM), and 3) adaptive reinforcement learning strategies to ensure consistent improvements. We apply WebRL to transform open Llama-3.1 and GLM-4 models into proficient web agents. On WebArena-Lite, WebRL improves the success rate of Llama-3.1-8B from 4.8% to 42.4%, and from 6.1% to 43% for GLM-4-9B. These open models significantly surpass the performance of GPT-4-Turbo (17.6%) and GPT-4o (13.9%) and outperform previous state-of-the-art web agents trained on open LLMs (AutoWebGLM, 18.2%). Our findings demonstrate WebRL's effectiveness in bridging the gap between open and proprietary LLM-based web agents, paving the way for more accessible and powerful autonomous web interaction systems.",
    "date": "27.01.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2022",
    "authors": "Yao, Shunyu; Chen, Howard; Yang, John; Narasimhan, Karthik",
    "title": "WebShop: Towards Scalable Real-World Web Interaction with Grounded Language Agents",
    "shorthand": "WebShop",
    "multiLLM": "FALSE",
    "data_quartal": "2022-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "BERT"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "simulation",
      "evaluation",
      "reinforcement learning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "+",
    "overallFinal": "0",
    "doi": "https://papers.nips.cc/paper_files/paper/2022/hash/82ad13ec01f9fe44c01cb91814fd7b8c-Abstract-Conference.html",
    "abstract": "Most existing benchmarks for grounding language in interactive environments either lack realistic linguistic elements, or prove difficult to scale up due to substantial human involvement in the collection of data or feedback signals. We develop WebShop \u0096 a simulated e-commerce website environment with 1.18 million real-world products and 12,087 crowd-sourced text instructions. In this environment, an agent needs to navigate multiple types of webpages and issue diverse actions to find, customize, and purchase a product given an instruction. WebShop provides several challenges including understanding compositional instructions, query (re-)formulation, dealing with noisy text in webpages, and performing strategic exploration. We collect over 1,600 human trajectories to first validate the benchmark, then train and evaluate a diverse range of agents using reinforcement learning, imitation learning, and pre-trained image and language models. Our best model achieves a task success rate of 29%, which significantly outperforms rule heuristics but is far lower than expert human performance (59%). We also analyze agent and human trajectories and ablate various model components to provide insights for developing future agents with stronger language understanding and decision making abilities. Finally, we show our agent trained on WebShop exhibits non-trivial sim-to-real transfer when evaluated on amazon.com and ebay.com, indicating the potential value of our benchmark for developing practical web agents that can operate in the wild.",
    "date": "01.11.2022",
    "venue": "NeurIPS"
  },
  {
    "publicationYear": "2025",
    "authors": "Hu, Die; Ge, Jingguo; Tang, Weitao; Li, Guoyi; Li, Liangxiong; Wu, Bingzhen",
    "title": "WebSurfer: Enhancing LLM Agents with Web-Wise Feedback for Web Navigation",
    "shorthand": "WebSurfer",
    "multiLLM": "TRUE",
    "data_quartal": "2025-03",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "strategies": [
      "in context learning",
      "rag",
      "memory"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "https://ieeexplore.ieee.org/document/10889961/",
    "abstract": "As the Internet\u0092s complexity and information volume surge, the need for efficient web automation becomes critical. Traditional web agents struggle with redundant web content, which disrupts their understanding of the environment. They also face inefficiencies in multi-task scenarios due to handcrafted exemplars and encounter error accumulation in long-horizon tasks, exacerbated by web-specific complexities like nested structures and interactive elements. To address these issues, we introduce WebSurfer, a novel web agent designed to filter, learn, and adapt in complex environments. WebSurfer refines task-oriented states for clearer observations and employs an exemplar retrieval and ordering strategy to enhance LLMs\u0092 understanding and adaptability to current tasks. Notably,WebSurfer features a novel web-wise insight feedback mechanism that enables continuous adaptation and strategy refinement. Evaluations demonstrate that WebSurfer outperforms state-of-the-art (SOTA) methods on realistic tasks, achieving higher accuracy and enhancing longterm adaptability.",
    "date": "07.03.2025",
    "venue": "ICASSP"
  },
  {
    "publicationYear": "2024",
    "authors": "He, Hongliang; Yao, Wenlin; Ma, Kaixin; Yu, Wenhao; Dai, Yong; Zhang, Hongming; Lan, Zhenzhong; Yu, Dong",
    "title": "WebVoyager: Building an End-to-End Web Agent with Large Multimodal Models",
    "shorthand": "WebVoyager",
    "multiLLM": "TRUE",
    "data_quartal": "2024-06",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "strategies": [
      "evaluation"
    ],
    "modalitiesFinal": "-",
    "llmComplexityFinal": "-",
    "overallFinal": "-",
    "doi": "http://arxiv.org/abs/2401.13919",
    "abstract": "The rapid advancement of large language models (LLMs) has led to a new era marked by the development of autonomous applications in real-world scenarios, which drives innovation in creating advanced web agents. Existing web agents typically only handle one input modality and are evaluated only in simplified web simulators or static web snapshots, greatly limiting their applicability in real-world scenarios. To bridge this gap, we introduce WebVoyager, an innovative Large Multimodal Model (LMM) powered web agent that can complete user instructions end-to-end by interacting with real-world websites. Moreover, we establish a new benchmark by compiling real-world tasks from 15 popular websites and introduce an automatic evaluation protocol leveraging multimodal understanding abilities of GPT-4V to evaluate open-ended web agents. We show that WebVoyager achieves a 59.1% task success rate on our benchmark, significantly surpassing the performance of both GPT-4 (All Tools) and the WebVoyager (text-only) setups, underscoring the exceptional capability of WebVoyager. The proposed automatic evaluation metric achieves 85.3% agreement with human judgment, indicating its effectiveness in providing reliable and accurate assessments of web agents.",
    "date": "06.06.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2025",
    "authors": "Wu, Jialong; Yin, Wenbiao; Jiang, Yong; Wang, Zhenglin; Xi, Zekun; Fang, Runnan; Zhang, Linhai; He, Yulan; Zhou, Deyu; Xie, Pengjun; Huang, Fei",
    "title": "WebWalker: Benchmarking LLMs in Web Traversal",
    "shorthand": "WebWalker",
    "multiLLM": "TRUE",
    "data_quartal": "2025-01",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "Qwen"
    ],
    "benchmarksUsed": [
      "WebWalkerQA"
    ],
    "strategies": [
      "reflection",
      "rag",
      "planning"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2501.07572",
    "abstract": "Retrieval-augmented generation (RAG) demonstrates remarkable performance across tasks in open-domain question-answering. However, traditional search engines may retrieve shallow content, limiting the ability of LLMs to handle complex, multi-layered information. To address it, we introduce WebWalkerQA, a benchmark designed to assess the ability of LLMs to perform web traversal. It evaluates the capacity of LLMs to traverse a website's subpages to extract high-quality data systematically. We propose WebWalker, which is a multi-agent framework that mimics human-like web navigation through an explore-critic paradigm. Extensive experimental results show that WebWalkerQA is challenging and demonstrates the effectiveness of RAG combined with WebWalker, through the horizontal and vertical integration in real-world scenarios.",
    "date": "14.01.2025",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Tao, Heyi; T V, Sethuraman; Shlapentokh-Rothman, Michal; Gupta, Tanmay; Ji, Heng; Hoiem, Derek",
    "title": "WebWISE: Unlocking Web Interface Control for LLMs via Sequential Exploration",
    "shorthand": "WebWise",
    "multiLLM": "FALSE",
    "data_quartal": "2024-06",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "other",
      "GPT"
    ],
    "benchmarksUsed": [
      "MiniWoB++"
    ],
    "strategies": [
      "in context learning",
      "context",
      "preprocessing",
      "prompting",
      "planning"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "https://aclanthology.org/2024.findings-naacl.234/",
    "abstract": "This paper investigates using Large Language Models (LLMs) to automatically perform web software tasks using click, scroll, and text in- put operations. Previous approaches, such as reinforcement learning (RL) or imitation learning, are inefficient to train and task-specific. Our method uses filtered Document Object Model (DOM) elements as observations and performs tasks step-by-step, sequentially generating small programs based on the current observations. We use in-context learning, either benefiting from a single manually provided example, or an automatically generated example based on a successful zero-shot trial. We evaluate our proposed method on the MiniWob++ benchmark. With only one in-context example, our WebWISE method using gpt-3.5-turbo achieves similar or better performance than other methods that require many demonstrations or trials.",
    "date": "01.06.2024",
    "venue": "NAACL"
  },
  {
    "publicationYear": "2024",
    "authors": "Liu, Jiarun; Hao, Jia; Zhang, Chunhong; Hu, Zheng",
    "title": "WEPO: Web Element Preference Optimization for LLM-based Web Navigation",
    "shorthand": "WEPO",
    "multiLLM": "FALSE",
    "data_quartal": "2024-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Mistral",
      "Llama",
      "Gemma"
    ],
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "strategies": [
      "learning",
      "optimization"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "http://arxiv.org/abs/2412.10742",
    "abstract": "The rapid advancement of autonomous web navigation has significantly benefited from grounding pretrained Large Language Models (LLMs) as agents. However, current research has yet to fully leverage the redundancy of HTML elements for contrastive training. This paper introduces a novel approach to LLM-based web navigation tasks, called Web Element Preference Optimization (WEPO). WEPO utilizes unsupervised preference learning by sampling distance-based non-salient web elements as negative samples, optimizing maximum likelihood objective within Direct Preference Optimization (DPO). We evaluate WEPO on the Mind2Web benchmark and empirically demonstrate that WEPO aligns user high-level intent with output actions more effectively. The results show that our method achieved the state-of-the-art, with an improvement of 13.8% over WebAgent and 5.3% over the visual language model CogAgent baseline. Our findings underscore the potential of preference optimization to enhance web navigation and other web page based tasks, suggesting a promising direction for future research.",
    "date": "14.12.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Lutz, Michael; Bohra, Arth; Saroyan, Manvel; Harutyunyan, Artem; Campagna, Giovanni",
    "title": "WILBUR: Adaptive In-Context Learning for Robust and Accurate Web Agents",
    "shorthand": "WILBUR",
    "multiLLM": "TRUE",
    "data_quartal": "2024-04",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "strategies": [
      "learning",
      "rag",
      "preprocessing",
      "planning",
      "reflection"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "-",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2404.05902",
    "abstract": "In the realm of web agent research, achieving both generalization and accuracy remains a challenging problem. Due to high variance in website structure, existing approaches often fail. Moreover, existing fine-tuning and in-context learning techniques fail to generalize across multiple websites. We introduce Wilbur, an approach that uses a differentiable ranking model and a novel instruction synthesis technique to optimally populate a black-box large language model's prompt with task demonstrations from previous runs. To maximize end-to-end success rates, we also propose an intelligent backtracking mechanism that learns and recovers from its mistakes. Finally, we show that our ranking model can be trained on data from a generative auto-curriculum which samples representative goals from an LLM, runs the agent, and automatically evaluates it, with no manual annotation. Wilbur achieves state-of-the-art results on the WebVoyager benchmark, beating text-only models by 8% overall, and up to 36% on certain websites. On the same benchmark, Wilbur is within 5% of a strong multi-modal model despite only receiving textual inputs, and further analysis reveals a substantial number of failures are due to engineering challenges of operating the web.",
    "date": "08.04.2024",
    "venue": "arxiv"
  },
  {
    "publicationYear": "2024",
    "authors": "Chae, Hyungjoo; Kim, Namyoung; Ong, Kai Tzu-iunn; Gwak, Minju; Song, Gwanwoo; Kim, Jihoon; Kim, Sunghwan; Lee, Dongha; Yeo, Jinyoung",
    "title": "Web Agents with World Models: Learning and Leveraging Environment Dynamics in Web Navigation",
    "shorthand": "WMA",
    "multiLLM": "FALSE",
    "data_quartal": "2024-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "other",
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web",
      "WebArena"
    ],
    "strategies": [
      "simulation",
      "grounding"
    ],
    "modalitiesFinal": "0",
    "llmComplexityFinal": "0",
    "overallFinal": "0",
    "doi": "http://arxiv.org/abs/2410.13232",
    "abstract": "Large language models (LLMs) have recently gained much attention in building autonomous agents. However, the performance of current LLM-based web agents in long-horizon tasks is far from optimal, often yielding errors such as repeatedly buying a non-refundable flight ticket. By contrast, humans can avoid such an irreversible mistake, as we have an awareness of the potential outcomes (e.g., losing money) of our actions, also known as the \"world model\". Motivated by this, our study first starts with preliminary analyses, confirming the absence of world models in current LLMs (e.g., GPT-4o, Claude-3.5-Sonnet, etc.). Then, we present a World-model-augmented (WMA) web agent, which simulates the outcomes of its actions for better decision-making. To overcome the challenges in training LLMs as world models predicting next observations, such as repeated elements across observations and long HTML inputs, we propose a transition-focused observation abstraction, where the prediction objectives are free-form natural language descriptions exclusively highlighting important state differences between time steps. Experiments on WebArena and Mind2Web show that our world models improve agents' policy selection without training and demonstrate our agents' cost- and time-efficiency compared to recent tree-search-based agents.",
    "date": "17.10.2024",
    "venue": "ICLR"
  },
  {
    "publicationYear": "2023",
    "authors": "Li, Tao; Li, Gang; Deng, Zhiwei; Wang, Bryan; Li, Yang",
    "title": "A Zero-Shot Language Agent for Computer Control with Structured Reflection",
    "shorthand": "ZeroShotAgent",
    "multiLLM": "FALSE",
    "data_quartal": "2023-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "PaLM2"
    ],
    "benchmarksUsed": [
      "MiniWoB++"
    ],
    "strategies": [
      "reflection",
      "planning"
    ],
    "modalitiesFinal": "+",
    "llmComplexityFinal": "+",
    "overallFinal": "+",
    "doi": "https://aclanthology.org/2023.findings-emnlp.753/",
    "abstract": "Large language models (LLMs) have shown increasing capacity at planning and executing a high-level goal in a live computer environment (e.g. MiniWoB++). To perform a task, recent works often require a model to learn from trace examples of the task via either supervised learning or few/many-shot prompting. Without these trace examples, it remains a challenge how an agent can autonomously learn and improve its control on a computer, which limits the ability of an agent to perform a new task. We approach this problem with a zero-shot agent that requires no given expert traces. Our agent plans for executable actions on a partially observed environment, and iteratively progresses a task by identifying and learning from its mistakes via self-reflection and structured thought management. On the easy tasks of MiniWoB++, we show that our zero-shot agent often outperforms recent SoTAs, with more efficient reasoning. For tasks with more complexity, our reflective agent performs on par with prior best models, even though previous works had the advantages of accessing expert traces or additional screen information.",
    "date": "01.12.2023",
    "venue": "EMNLP"
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
