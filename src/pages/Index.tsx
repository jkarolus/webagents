
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
    "publicationYear": "2021",
    "authors": "Xu, Nancy and Masling, Sam and Du, Michael and Campagna, Giovanni and Heck, Larry and Landay, James and Lam, Monica",
    "title": "Grounding Open-Domain Instructions to Automate Web Support Tasks",
    "shorthand": "RUSS",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2022",
    "authors": "Yao, Shunyu and Chen, Howard and Yang, John and Narasimhan, Karthik",
    "title": "Webshop: Towards scalable real-world web interaction with grounded language agents",
    "shorthand": "WebShop",
    "multiLLM": "False",
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
      "evaluation",
      "reinforcement learning",
      "simulation"
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Yao, Shunyu and Zhao, Jeffrey and Yu, Dian and Du, Nan and Shafran, Izhak and Narasimhan, Karthik and Cao, Yuan",
    "title": "React: Synergizing reasoning and acting in language models",
    "shorthand": "ReAct",
    "multiLLM": "False",
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
      "planning",
      "prompting"
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Sun, Haotian and Zhuang, Yuchen and Kong, Lingkai and Dai, Bo and Zhang, Chao",
    "title": "Adaplanner: Adaptive planning from feedback with language models",
    "shorthand": "AdaPlanner",
    "multiLLM": "True",
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
      "planning",
      "prompting",
      "reflection"
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Tianbao Xie and Fan Zhou and Zhoujun Cheng and Peng Shi and Luoxuan Weng and Yitao Liu and Toh Jing Hua and Junning Zhao and Qian Liu and Che Liu and Zeyu Liu and Yiheng Xu and Hongjin SU and Dongchan Shin and Caiming Xiong and Tao Yu",
    "title": "OpenAgents: An Open Platform for Language Agents in the Wild",
    "shorthand": "OpenAgent",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Gur, Izzeddin and Nachum, Ofir and Miao, Yingjie and Safdari, Mustafa and Huang, Austin and Chowdhery, Aakanksha and Narang, Sharan and Fiedel, Noah and Faust, Aleksandra",
    "title": "Understanding {HTML} with Large Language Models",
    "shorthand": "WebN",
    "multiLLM": "False",
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
      "finetuning",
      "preprocessing"
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Li, Tao and Li, Gang and Deng, Zhiwei and Wang, Bryan and Li, Yang",
    "title": "A Zero-Shot Language Agent for Computer Control with Structured Reflection",
    "shorthand": "ZeroShotAgent",
    "multiLLM": "False",
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
      "planning",
      "reflection"
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Lo, Robert and Sridhar, Abishek and Xu, Frank F and Zhu, Hao and Zhou, Shuyan",
    "title": "Hierarchical prompting assists large language model on web navigation",
    "shorthand": "ASH",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Kim, Geunwoo and Baldi, Pierre and McAleer, Stephen",
    "title": "Language models can solve computer tasks",
    "shorthand": "RCI",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2023",
    "authors": "Deng, Xiang and Gu, Yu and Zheng, Boyuan and Chen, Shijie and Stevens, Sam and Wang, Boshi and Sun, Huan and Su, Yu",
    "title": "Mind2web: Towards a generalist agent for the web",
    "shorthand": "MindAct",
    "multiLLM": "True",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zheng, Longtao and Wang, Rundong and Wang, Xinrun and An, Bo",
    "title": "Synapse: Trajectory-as-Exemplar Prompting with Memory for Computer Control",
    "shorthand": "Synapse",
    "multiLLM": "False",
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
      "memory",
      "preprocessing",
      "prompting"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Ma, Kaixin and Zhang, Hongming and Wang, Hongwei and Pan, Xiaoman and Yu, Dong",
    "title": "Laser: Llm agent with state-space exploration for web navigation",
    "shorthand": "LASER",
    "multiLLM": "False",
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
      "action space refinement",
      "backtracking",
      "exploration",
      "planning",
      "prompting"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Furuta, Hiroki and Lee, Kuang-Huei and Nachum, Ofir and Matsuo, Yutaka and Faust, Aleksandra and Gu, Shixiang Shane and Gur, Izzeddin",
    "title": "Multimodal web navigation with instruction-finetuned foundation models",
    "shorthand": "WEBGUM",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zheng, Boyuan and Gou, Boyu and Kil, Jihyung and Sun, Huan and Su, Yu",
    "title": "GPT-4V(ision) is a generalist web agent, if grounded",
    "shorthand": "SeeAct",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zhou, Ruiwen and Yang, Yingxuan and Wen, Muning and Wen, Ying and Wang, Wenhao and Xi, Chunling and Xu, Guoqiang and Yu, Yong and Zhang, Weinan",
    "title": "TRAD: Enhancing LLM Agents with Step-Wise Thought Retrieval and Aligned Decision",
    "shorthand": "TRAD",
    "multiLLM": "False",
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
      "prompting",
      "rag"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zhao, Andrew and Huang, Daniel and Xu, Quentin and Lin, Matthieu and Liu, Yong-Jin and Huang, Gao",
    "title": "Expel: Llm agents are experiential learners",
    "shorthand": "ExpeL",
    "multiLLM": "False",
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
      "prompting",
      "training"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Lutz, Michael and Bohra, Arth and Saroyan, Manvel and Harutyunyan, Artem and Campagna, Giovanni",
    "title": "Wilbur: Adaptive in-context learning for robust and accurate web agents",
    "shorthand": "WILBUR",
    "multiLLM": "True",
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
      "planning",
      "preprocessing",
      "rag",
      "reflection"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zhou, Shuyan and Xu, Frank F and Zhu, Hao and Zhou, Xuhui and Lo, Robert and Sridhar, Abishek and Cheng, Xianyi and Bisk, Yonatan and Fried, Daniel and Alon, Uri and others",
    "title": "WebArena: A Realistic Web Environment for Building Autonomous Agents",
    "shorthand": "WebArena",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Kil, Jihyung and Song, Chan Hee and Zheng, Boyuan and Deng, Xiang and Su, Yu and Chao, Wei-Lun",
    "title": "Dual-view visual contextualization for web navigation",
    "shorthand": "Dual-VCR",
    "multiLLM": "True",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "He, Hongliang and Yao, Wenlin and Ma, Kaixin and Yu, Wenhao and Dai, Yong and Zhang, Hongming and Lan, Zhenzhong and Yu, Dong",
    "title": "WebVoyager: Building an end-to-end web agent with large multimodal models",
    "shorthand": "WebVoyager",
    "multiLLM": "True",
    "data_quartal": "2024-06",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager",
      "GAIA"
    ],
    "strategies": [
      "evaluation"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zhou, Andy and Yan, Kai and Shlapentokh-Rothman, Michal and Wang, Haohan and Wang, Yu-Xiong",
    "title": "Language agent tree search unifies reasoning, acting, and planning in language models",
    "shorthand": "LATS",
    "multiLLM": "False",
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
      "memory",
      "reflection",
      "tree search"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Tao, Heyi and Sethuraman, TV and Shlapentokh-Rothman, Michal and Gupta, Tanmay and Ji, Heng and Hoiem, Derek",
    "title": "WebWISE: Unlocking web interface control for LLMs via sequential exploration",
    "shorthand": "WebWise",
    "multiLLM": "False",
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
      "context",
      "in context learning",
      "planning",
      "preprocessing",
      "prompting"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Abuelsaad, Tamer and Akkil, Deepak and Dey, Prasenjit and Jagmohan, Ashish and Vempaty, Aditya and Kokku, Ravi",
    "title": "Agent-e: From autonomous web navigation to foundational design principles in agentic systems",
    "shorthand": "Agent E",
    "multiLLM": "True",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Pan, Yichen and Kong, Dehan and Zhou, Sida and Cui, Cheng and Leng, Yifei and Jiang, Bing and Liu, Hangyu and Shang, Yanyi and Zhou, Shuyan and Wu, Tongshuang and others",
    "title": "Webcanvas: Benchmarking web agents in online environments",
    "shorthand": "WebCanvas",
    "multiLLM": "False",
    "data_quartal": "2024-07",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web-Live"
    ],
    "strategies": [
      "memory"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Iong, Iat Long and Liu, Xiao and Chen, Yuxuan and Lai, Hanyu and Yao, Shuntian and Shen, Pengbo and Yu, Hao and Dong, Yuxiao and Tang, Jie",
    "title": "Openwebagent: An open toolkit to enable web agents on large language models",
    "shorthand": "OpenWebAgent",
    "multiLLM": "False",
    "data_quartal": "2024-08",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [],
    "strategies": []
  },
  {
    "publicationYear": "2024",
    "authors": "Zeng, Aohan and Liu, Mingdao and Lu, Rui and Wang, Bowen and Liu, Xiao and Dong, Yuxiao and Tang, Jie",
    "title": "{A}gent{T}uning: Enabling Generalized Agent Abilities for {LLM}s",
    "shorthand": "AgentLM",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Putta, Pranav and Mills, Edmund and Garg, Naman and Motwani, Sumeet and Finn, Chelsea and Garg, Divyansh and Rafailov, Rafael",
    "title": "Agent q: Advanced reasoning and learning for autonomous ai agents",
    "shorthand": "Agent Q",
    "multiLLM": "False",
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
      "online search",
      "optimization",
      "tree search"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Xiao Liu and Tianjie Zhang and Yu Gu and Iat Long Iong and Song XiXuan and Yifan Xu and Shudan Zhang and Hanyu Lai and Jiadai Sun and Xinyue Yang and Yu Yang and Zehan Qi and Shuntian Yao and Xueqiao Sun and Siyi Cheng and Qinkai Zheng and Hao Yu and Hanchen Zhang and Wenyi Hong and Ming Ding and Lihang Pan and Xiaotao Gu and Aohan Zeng and Zhengxiao Du and Chan Hee Song and Yu Su and Yuxiao Dong and Jie Tang",
    "title": "VisualAgentBench: Towards Large Multimodal Models as Visual Foundation Agents",
    "shorthand": "VisualAgentBench",
    "multiLLM": "False",
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
      "finetuning",
      "learning",
      "preprocessing",
      "training"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Lai, Hanyu and Liu, Xiao and Iong, Iat Long and Yao, Shuntian and Chen, Yuxuan and Shen, Pengbo and Yu, Hao and Zhang, Hanchen and Zhang, Xiaohan and Dong, Yuxiao and others",
    "title": "AutoWebGLM: A Large Language Model-based Web Navigating Agent",
    "shorthand": "AutoWebGLM",
    "multiLLM": "False",
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
      "finetuning",
      "learning",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Kim, Minsoo and Bursztyn, Victor and Koh, Eunyee and Guo, Shunan and Hwang, Seung-won",
    "title": "Rada: Retrieval-augmented web agent planning with llms",
    "shorthand": "RaDA",
    "multiLLM": "False",
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
      "planning",
      "rag"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Song, Yifan and Yin, Da and Yue, Xiang and Huang, Jie and Li, Sujian and Lin, Bill Yuchen",
    "title": "Trial and error: Exploration-based trajectory optimization of LLM agents",
    "shorthand": "ETO",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zhang, Yao and Ma, Zijian and Ma, Yunpu and Han, Zhen and Wu, Yu and Tresp, Volker",
    "title": "Webpilot: A versatile and autonomous multi-agent system for web task execution with strategic exploration",
    "shorthand": "WebPilot",
    "multiLLM": "True",
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
      "learning",
      "planning",
      "reflection",
      "simulation",
      "training",
      "tree search"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Paloma Sodhi and S.R.K Branavan and Yoav Artzi and Ryan McDonald",
    "title": "SteP: Stacked {LLM} Policies for Web Actions",
    "shorthand": "SteP",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Bonatti, Rogerio and Zhao, Dan and Bonacci, Francesco and Dupont, Dillon and Abdali, Sara and Li, Yinheng and Lu, Yadong and Wagle, Justin and Koishida, Kazuhito and Bucker, Arthur and others",
    "title": "Windows agent arena: Evaluating multi-modal os agents at scale",
    "shorthand": "Navi",
    "multiLLM": "False",
    "data_quartal": "2024-09",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "strategies": [
      "exploration",
      "prompting"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Zora Zhiruo Wang and Jiayuan Mao and Daniel Fried and Graham Neubig",
    "title": "Agent Workflow Memory",
    "shorthand": "AWM",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "L\\`{u}, Xing Han and Kasner, Zden\\v{e}k and Reddy, Siva",
    "title": "WEBLINX: real-world website navigation with multi-turn dialogue",
    "shorthand": "WebLinx",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Hyungjoo Chae and Namyoung Kim and Kai Tzu-iunn Ong and Minju Gwak and Gwanwoo Song and Jihoon Kim and Sunghwan Kim and Dongha Lee and Jinyoung Yeo",
    "title": "Web Agents with World Models: Learning and Leveraging Environment Dynamics in Web Navigation",
    "shorthand": "WMA",
    "multiLLM": "False",
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
      "grounding",
      "simulation"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Jiayi Pan and Yichi Zhang and Nicholas Tomlin and Yifei Zhou and Sergey Levine and Alane Suhr",
    "title": "Autonomous Evaluation and Refinement of Digital Agents",
    "shorthand": "AER",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Yoran, Ori and Amouyal, Samuel Joseph and Malaviya, Chaitanya and Bogin, Ben and Press, Ofir and Berant, Jonathan",
    "title": "{A}ssistant{B}ench: Can Web Agents Solve Realistic and Time-Consuming Tasks?",
    "shorthand": "SeePlanAct",
    "multiLLM": "False",
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
      "memory",
      "planning",
      "rag"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Azam, Ruhana and Abuelsaad, Tamer and Vempaty, Aditya and Jagmohan, Ashish",
    "title": "Multimodal Auto Validation For Self-Refinement in Web Agents",
    "shorthand": "Agent-E\\_2",
    "multiLLM": "True",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Murty, Shikhar and Bahdanau, Dzmitry and Manning, Christopher D",
    "title": "Nnetscape navigator: Complex demonstrations for web agents without a demonstrator",
    "shorthand": "NNetscape Navigator",
    "multiLLM": "True",
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
      "distillation",
      "exploration",
      "planning",
      "preprocessing",
      "training",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Gangi Reddy, Revanth and Mukherjee, Sagnik and Kim, Jeonghwan and Wang, Zhenhailong and Hakkani-T{\\\"u}r, Dilek and Ji, Heng",
    "title": "Infogent: An Agent-Based Framework for Web Information Aggregation",
    "shorthand": "Infogent",
    "multiLLM": "True",
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
      "aggregation",
      "api-based",
      "backtracking",
      "human-in-the-loop",
      "preprocessing"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "He, Hongliang and Yao, Wenlin and Ma, Kaixin and Yu, Wenhao and Dai, Yong and Zhang, Hongming and Lan, Zhenzhong and Yu, Dong",
    "title": "{W}eb{V}oyager: Building an End-to-End Web Agent with Large Multimodal Models",
    "shorthand": "OpenWebVoyager",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Cai, Hongru and Li, Yongqi and Wang, Wenjie and Zhu, Fengbin and Shen, Xiaoyu and Li, Wenjie and Chua, Tat-Seng",
    "title": "Large language models empowered personalized web agents",
    "shorthand": "PUMA",
    "multiLLM": "False",
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
      "api-based",
      "finetuning",
      "memory",
      "optimization"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Yang, Ke and Liu, Yao and Chaudhary, Sapana and Fakoor, Rasool and Chaudhari, Pratik and Karypis, George and Rangwala, Huzefa",
    "title": "Agentoccam: A simple yet strong baseline for llm-based web agents",
    "shorthand": "AgentOccam",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Jing Yu Koh and Stephen Marcus McAleer and Daniel Fried and Ruslan Salakhutdinov",
    "title": "Tree Search for Language Model Agents",
    "shorthand": "TreeSearch",
    "multiLLM": "False",
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
      "memory",
      "prompting",
      "reward",
      "tree search"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Junpeng Liu and Tianyue Ou and Yifan Song and Yuxiao Qu and Wai Lam and Chenyan Xiong and Wenhu Chen and Graham Neubig and Xiang Yue",
    "title": "Harnessing Webpage {UI}s for Text-Rich Visual Understanding",
    "shorthand": "UIX",
    "multiLLM": "False",
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
      "evaluation",
      "grounding",
      "training"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Wang, Haoyu and Li, Tao and Deng, Zhiwei and Roth, Dan and Li, Yang",
    "title": "Devil{'}s Advocate: Anticipatory Reflection for {LLM} Agents",
    "shorthand": "DevilsAdvocate",
    "multiLLM": "False",
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
      "planning",
      "reflection"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Kim, Byoungjip and Jang, Youngsoo and Logeswaran, Lajanugen and Kim, Geon-Hyeong and Kim, Yu Jin and Lee, Honglak and Lee, Moontae",
    "title": "Prospector: Improving LLM agents with self-asking and trajectory ranking",
    "shorthand": "Prospector",
    "multiLLM": "True",
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
      "finetuning",
      "in context learning",
      "prompting",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Chen, Minghao and Li, Yihang and Yang, Yanting and Yu, Shiyu and Lin, Binbin and He, Xiaofei",
    "title": "AutoManual: Constructing Instruction Manuals by LLM Agents via Interactive Environmental Learning",
    "shorthand": "AutoManual",
    "multiLLM": "True",
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
      "memory",
      "pipelines",
      "prompting"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Gu, Yu and Zheng, Boyuan and Gou, Boyu and Zhang, Kai and Chang, Cheng and Srivastava, Sanjari and Xie, Yanan and Qi, Peng and Sun, Huan and Su, Yu",
    "title": "Is your llm secretly a world model of the internet? model-based planning for web agents",
    "shorthand": "Webdreamer",
    "multiLLM": "False",
    "data_quartal": "2024-11",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "Mind2Web-Live",
      "VisualWebArena"
    ],
    "strategies": [
      "planning",
      "simulation"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Xiong, Weimin and Song, Yifan and Zhao, Xiutian and Wu, Wenhao and Wang, Xun and Wang, Ke and Li, Cheng and Peng, Wei and Li, Sujian",
    "title": "Watch Every Step! {LLM} Agent Learning via Iterative Step-level Process Refinement",
    "shorthand": "IPR",
    "multiLLM": "False",
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
      "finetuning",
      "optimization",
      "reward",
      "training"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Kim, Jaekyeom and Kim, Dong-Ki and Logeswaran, Lajanugen and Sohn, Sungryull and Lee, Honglak",
    "title": "Auto-Intent: Automated Intent Discovery and Self-Exploration for Large Language Model Web Agents",
    "shorthand": "Auto-Intent",
    "multiLLM": "False",
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
      "exploration",
      "in context learning"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Song, Yifan and Xiong, Weimin and Zhao, Xiutian and Zhu, Dawei and Wu, Wenhao and Wang, Ke and Li, Cheng and Peng, Wei and Li, Sujian",
    "title": "{A}gent{B}ank: Towards Generalized {LLM} Agents via Fine-Tuning on 50000+ Interaction Trajectories",
    "shorthand": "SAMOYED",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Verma, Gaurav and Kaur, Rachneet and Srishankar, Nishan and Zeng, Zhen and Balch, Tucker and Veloso, Manuela",
    "title": "{A}dapt{A}gent: Adapting Multimodal Web Agents with Few-Shot Learning from Human Demonstrations",
    "shorthand": "AdaptAgent",
    "multiLLM": "False",
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
      "human-in-the-loop",
      "in context learning",
      "learning"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Tianyue Ou and Frank F. Xu and Aman Madaan and Jiarui Liu and Robert Lo and Abishek Sridhar and Sudipta Sengupta and Dan Roth and Graham Neubig and Shuyan Zhou",
    "title": "Synatra: Turning Indirect Knowledge into Direct Demonstrations for Digital Agents at Scale",
    "shorthand": "Synatra",
    "multiLLM": "False",
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
      "finetuning",
      "preprocessing",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Fereidouni, Moghis and Mosharrof, Adib and Siddique, AB",
    "title": "Grounded Language Agent for Product Search via Intelligent Web Interactions",
    "shorthand": "GLAINTEL",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Liu, Jiarun and Hao, Jia and Zhang, Chunhong and Hu, Zheng",
    "title": "WEPO: web element preference optimization for LLM-based web navigation",
    "shorthand": "WEPO",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Fu, Yao and Kim, Dong-Ki and Kim, Jaekyeom and Sohn, Sungryull and Logeswaran, Lajanugen and Bae, Kyunghoon and Lee, Honglak",
    "title": "Autoguide: Automated generation and selection of context-aware guidelines for large language model agents",
    "shorthand": "AutoGuide",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Colin Raffel and Noam Shazeer and Adam Roberts and Katherine Lee and Sharan Narang and Michael Matena and Yanqi Zhou and Wei Li and Peter J. Liu",
    "title": "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer",
    "shorthand": "HTML-T5++",
    "multiLLM": "False",
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
      "finetuning",
      "planning",
      "prompting",
      "reflection"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Thibault Le Sellier de Chezelles and Maxime Gasse and Alexandre Lacoste and Massimo Caccia and Alexandre Drouin and L{\\'e}o Boisvert and Megh Thakkar and Tom Marty and Rim Assouel and Sahar Omidi Shayegan and Lawrence Keunho Jang and Xing Han L{\\`u} and Ori Yoran and Dehan Kong and Frank F. Xu and Siva Reddy and Graham Neubig and Quentin Cappart and Russ Salakhutdinov and Nicolas Chapados",
    "title": "The BrowserGym Ecosystem for Web Agent Research",
    "shorthand": "BrowserGym",
    "multiLLM": "False",
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
      "in context learning",
      "memory",
      "preprocessing",
      "prompting",
      "reflection"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Shen, Junhong and Jain, Atishay and Xiao, Zedian and Amlekar, Ishan and Hadji, Mouad and Podolny, Aaron and Talwalkar, Ameet",
    "title": "ScribeAgent: Towards Specialized Web Agents Using Production-Scale Workflow Data",
    "shorthand": "ScribeAgent",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Yiheng Xu and Dunjie Lu and Zhennan Shen and Junli Wang and Zekun Wang and Yuchen Mao and Caiming Xiong and Tao Yu",
    "title": "AgentTrek: Agent Trajectory Synthesis via Guiding Replay with Web Tutorials",
    "shorthand": "AgentTrek",
    "multiLLM": "False",
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
      "planning",
      "preprocessing",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2024",
    "authors": "Yifei Zhou and Qianlan Yang and Kaixiang Lin and Min Bai and Xiong Zhou and Yu-Xiong Wang and Sergey Levine and Li Erran Li",
    "title": "Proposer-Agent-Evaluator ({PAE}): Autonomous Skill Discovery For Foundation Model Internet Agents",
    "shorthand": "PAE",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Song, Yueqi and Xu, Frank and Zhou, Shuyan and Neubig, Graham",
    "title": "Beyond Browsing: {API}-Based Web Agents",
    "shorthand": "Beyond Browsing",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zehan Qi and Xiao Liu and Iat Long Iong and Hanyu Lai and Xueqiao Sun and Jiadai Sun and Xinyue Yang and Yu Yang and Shuntian Yao and Wei Xu and Jie Tang and Yuxiao Dong",
    "title": "Web{RL}: Training {LLM} Web Agents via Self-Evolving Online Curriculum Reinforcement Learning",
    "shorthand": "WebRL",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Sarch, Gabriel and Jang, Lawrence and Tarr, Michael and Cohen, William W and Marino, Kenneth and Fragkiadaki, Katerina",
    "title": "Vlm agents generate their own memories: Distilling experience into embodied programs of thought",
    "shorthand": "ICAL",
    "multiLLM": "False",
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
      "finetuning",
      "human-in-the-loop",
      "in context learning",
      "memory",
      "preprocessing",
      "rag"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Li, Xiaoxi and Dong, Guanting and Jin, Jiajie and Zhang, Yuyao and Zhou, Yujia and Zhu, Yutao and Zhang, Peitian and Dou, Zhicheng",
    "title": "Search-o1: Agentic Search-Enhanced Large Reasoning Models",
    "shorthand": "Search-o1",
    "multiLLM": "False",
    "data_quartal": "2025-01",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen-QwQ"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "pipelines",
      "rag",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Luo, Haohao and Kuang, Jiayi and Liu, Wei and Shen, Ying and Luan, Jian and Deng, Yang",
    "title": "Browsing Like Human: A Multimodal Web Agent with Experiential Fast-and-Slow Thinking",
    "shorthand": "WebExperT",
    "multiLLM": "True",
    "data_quartal": "2025-01",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "InternVL"
    ],
    "benchmarksUsed": [
      "Mind2Web"
    ],
    "strategies": [
      "planning",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Huq, Faria and Wang, Zora Zhiruo and Xu, Frank F. and Ou, Tianyue and Zhou, Shuyan and Bigham, Jeffrey P. and Neubig, Graham",
    "title": "{C}ow{P}ilot: A Framework for Autonomous and Human-Agent Collaborative Web Navigation",
    "shorthand": "CowPilot",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zhang, Ruichen and Qiu, Mufan and Tan, Zhen and Zhang, Mohan and Lu, Vincent and Peng, Jie and Xu, Kaidi and Agudelo, Leandro Z and Qian, Peter and Chen, Tianlong",
    "title": "Symbiotic Cooperation for Web Agents: Harnessing Complementary Strengths of Large and Small LLMs",
    "shorthand": "AgentSymbiotic",
    "multiLLM": "True",
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
      "distillation",
      "learning",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "",
    "title": "",
    "shorthand": "Explorer",
    "multiLLM": "False",
    "data_quartal": "2025-02",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Phi",
      "Qwen"
    ],
    "benchmarksUsed": [
      "Mind2Web-Live",
      "MiniWoB++",
      "Multimodal-Mind2Web"
    ],
    "strategies": [
      "evaluation",
      "finetuning",
      "training",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Wang, Jialin and Duan, Zhihua",
    "title": "Learn by {{Interaction}}: {{Advancing Agentic AI}} for {{Web Automation}} with {{LangGraph}}",
    "shorthand": "LangGraph-WebAgent",
    "multiLLM": "False",
    "data_quartal": "2025-02",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "action space refinement",
      "online search",
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Ada Defne Tur and Nicholas Meade and Xing Han L{\\`u} and Alejandra Zambrano and Arkil Patel and Esin DURMUS and Spandana Gella and Karolina Stanczak and Siva Reddy",
    "title": "SafeArena: Evaluating the Safety of Autonomous Web Agents",
    "shorthand": "SafeArena",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Hu, Die and Ge, Jingguo and Tang, Weitao and Li, Guoyi and Li, Liangxiong and Wu, Bingzhen",
    "title": "WebSurfer: Enhancing LLM Agents with Web-Wise Feedback for Web Navigation",
    "shorthand": "WebSurfer",
    "multiLLM": "True",
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
      "memory",
      "rag"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Erdogan, Lutfi Eren and Lee, Nicholas and Kim, Sehoon and Moon, Suhong and Furuta, Hiroki and Anumanchipalli, Gopala and Keutzer, Kurt and Gholami, Amir",
    "title": "Plan-and-act: Improving planning of agents for long-horizon tasks",
    "shorthand": "PlanandAct",
    "multiLLM": "True",
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
      "planning",
      "training"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Liu, Xiaoqian and Wang, Ke and Li, Yongbin and Wu, Yuchuan and Ma, Wentao and Kong, Aobo and Huang, Fei and Jiao, Jianbin and Zhang, Junge",
    "title": "{EPO}: Explicit Policy Optimization for Strategic Reasoning in {LLM}s via Reinforcement Learning",
    "shorthand": "EPO",
    "multiLLM": "False",
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
      "planning",
      "policy optimization",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Yixiao Song and Katherine Thai and Chau Minh Pham and Yapei Chang and Mazin Nadaf and Mohit Iyyer",
    "title": "{BEARCUBS}: A benchmark for computer-using web agents",
    "shorthand": "BEARCUBS",
    "multiLLM": "False",
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
    "strategies": [
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Arman Zharmagambetov and Chuan Guo and Ivan Evtimov and Maya Pavlova and Ruslan Salakhutdinov and Kamalika Chaudhuri",
    "title": "Agent{DAM}: Privacy Leakage Evaluation for Autonomous Web Agents",
    "shorthand": "AgentDAM",
    "multiLLM": "False",
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
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zheng, Boyuan and Fatemi, Michael Y. and Jin, Xiaolong and Wang, Zora Zhiruo and Gandhi, Apurva and Song, Yueqi and Gu, Yu and Srinivasa, Jayanth and Liu, Gaowen and Neubig, Graham and Su, Yu",
    "title": "SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills",
    "shorthand": "SkillWeaver",
    "multiLLM": "True",
    "data_quartal": "2025-04",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena",
      "Online-Mind2Web"
    ],
    "strategies": [
      "api-based",
      "exploration",
      "other",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Brandon Trabucco and Gunnar Sigurdsson and Robinson Piramuthu and Ruslan Salakhutdinov",
    "title": "InSTA: Towards Internet-Scale Training For Agents",
    "shorthand": "InSTA",
    "multiLLM": "True",
    "data_quartal": "2025-05",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "LLaMA",
      "Qwen",
      "GPT",
      "Gemini"
    ],
    "benchmarksUsed": [
      "WebVoyager",
      "WebLinx",
      "Mind2Web",
      "WebArena"
    ],
    "strategies": [
      "exploration",
      "pipelines"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zheng, Yuxiang and Fu, Dayuan and Hu, Xiangkun and Cai, Xiaojie and Ye, Lyumanshan and Lu, Pengrui and Liu, Pengfei",
    "title": "{D}eep{R}esearcher: Scaling Deep Research via Reinforcement Learning in Real-world Environments",
    "shorthand": "DeepResearcher",
    "multiLLM": "False",
    "data_quartal": "2025-04",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "online search",
      "policy optimization",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Tianyi Ma and Yiyue Qian and Zheyuan Zhang and Zehong Wang and Xiaoye Qian and Feifan Bai and Yifan Ding and Xuwei Luo and Shinan Zhang and Keerthiram Murugesan and Chuxu Zhang and Yanfang Ye",
    "title": "AutoData: A Multi-Agent System for Open Web Data Collection",
    "shorthand": "AutoData",
    "multiLLM": "True",
    "data_quartal": "2025-05",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "Llama"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "optimization",
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Yu, Tao and Zhang, Zhengbo and Lyu, Zhiheng and Gong, Junhao and Yi, Hongzhu and Wang, Xinming and Zhou, Yuxuan and Yang, Jiabing and Nie, Ping and Huang, Yan and Chen, Wenhu",
    "title": "BrowserAgent: Building Web Agents with Human-Inspired Web Browsing Actions",
    "shorthand": "RAGEN",
    "multiLLM": "False",
    "data_quartal": "2025-05",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "WebShop"
    ],
    "strategies": [
      "policy optimization",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Jiahao Qiu and Xuan Qi and Tongcheng Zhang and Xinzhe Juan and Jiacheng Guo and Yifu Lu and Yimin Wang and Zixin Yao and Qihan Ren and Xun Jiang and Xing Zhou and Dongrui Liu and Ling Yang and Yue Wu and Kaixuan Huang and Shilong Liu and Hongru Wang and Mengdi Wang",
    "title": "Alita: Generalist Agent Enabling Scalable Agentic Reasoning with Minimal Predefinition and Maximal Self-Evolution",
    "shorthand": "ALITA",
    "multiLLM": "True",
    "data_quartal": "2025-05",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Claude Sonnet",
      "GPT"
    ],
    "benchmarksUsed": [
      "GAIA"
    ],
    "strategies": [
      "other",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Viraj Prabhu and Yutong Dai and Matthew Fernandez and Krithika Ramakrishnan and Jing Gu and Yanqi Luo and silvio savarese and Caiming Xiong and Junnan Li and Zeyuan Chen and Ran Xu",
    "title": "{WALT}: Web Agents that Learn Tools",
    "shorthand": "WALT",
    "multiLLM": "True",
    "data_quartal": "2025-05",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "Claude Sonnet",
      "Gemini"
    ],
    "benchmarksUsed": [
      "WebArena",
      "GAIA",
      "Mind2Web"
    ],
    "strategies": [
      "action space refinement",
      "other",
      "planning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Wu, Jialong and Li, Baixuan and Fang, Runnan and Yin, Wenbiao and Zhang, Liwen and Tao, Zhengwei and Zhang, Dingchu and Xi, Zekun and Fu, Gang and Jiang, Yong and others",
    "title": "Webdancer: Towards autonomous information seeking agency",
    "shorthand": "WebDancer",
    "multiLLM": "True",
    "data_quartal": "2025-05",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen",
      "GPT"
    ],
    "benchmarksUsed": [
      "GAIA",
      "WebWalkerQA",
      "BrowseComp-en",
      "BrowseComp-zh"
    ],
    "strategies": [
      "online search",
      "reflection",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Ruhana Azam and Aditya Vempaty and Ashish Jagmohan",
    "title": "Reflection-Based Memory For Web navigation Agents",
    "shorthand": "ReAP",
    "multiLLM": "False",
    "data_quartal": "2025-06",
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
      "memory",
      "prompting",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Yuchen Zhuang and Di Jin and Jiaao Chen and Wenqi Shi and Hanrui Wang and Chao Zhang",
    "title": "WorkForceAgent-R1: Incentivizing Reasoning Capability in LLM-based Web Agents via Reinforcement Learning",
    "shorthand": "WorkForceAgent-R1",
    "multiLLM": "False",
    "data_quartal": "2025-06",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen",
      "Llama"
    ],
    "benchmarksUsed": [
      "WorkArena"
    ],
    "strategies": [
      "finetuning",
      "planning",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Mathieu Andreux and Breno Baldas Skuk and Hamza Benchekroun and Emilien Biré and Antoine Bonnet and Riaz Bordie and Nathan Bout and Matthias Brunel and Pierre-Louis Cedoz and Antoine Chassang and Mickaël Chen and Alexandra D. Constantinou and Antoine d'Andigné and Hubert de La Jonquière and Aurélien Delfosse and Ludovic Denoyer and Alexis Deprez and Augustin Derupti and Michael Eickenberg and Mathïs Federico and Charles Kantor and Xavier Koegler and Yann Labbé and Matthew C. H. Lee and Erwan Le Jumeau de Kergaradec and Amir Mahla and Avshalom Manevich and Adrien Maret and Charles Masson and Rafaël Maurin and Arturo Mena and Philippe Modard and Axel Moyal and Axel Nguyen Kerbel and Julien Revelle and Mats L. Richter and María Santos and Laurent Sifre and Maxime Theillard and Marc Thibault and Louis Thiry and Léo Tronchon and Nicolas Usunier and Tony Wu",
    "title": "Surfer-H Meets Holo1: Cost-Efficient Web Agent Powered by Open Weights",
    "shorthand": "SurferH",
    "multiLLM": "True",
    "data_quartal": "2025-06",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Holo",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager",
      "WebClick",
      "GroundUI-Web"
    ],
    "strategies": [
      "grounding",
      "pipelines",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Li, Kuan and Zhang, Zhongwang and Yin, Huifeng and Zhang, Liwen and Ou, Litu and Wu, Jialong and Yin, Wenbiao and Li, Baixuan and Tao, Zhengwei and Wang, Xinyu and others",
    "title": "Websailor: Navigating super-human reasoning for web agent",
    "shorthand": "WebSailor",
    "multiLLM": "True",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "BrowseComp-en",
      "GAIA"
    ],
    "strategies": [
      "exploration",
      "reflection",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Huang, Tenghao and Basu, Kinjal and Abdelaziz, Ibrahim and Kapanipathi, Pavan and May, Jonathan and Chen, Muhao",
    "title": "R2D2: Remembering, Replaying and Dynamic Decision Making with a Reflective Agentic Memory",
    "shorthand": "R2D2",
    "multiLLM": "False",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "reflection",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Trisanth Srinivasan and Santosh Patapati",
    "title": "WebNav: An Intelligent Agent for Voice-Controlled Web Navigation",
    "shorthand": "WebNav",
    "multiLLM": "True",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Gemini"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "grounding",
      "other",
      "pipelines"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Pahuja, Vardaan and Lu, Yadong and Rosset, Corby and Gou, Boyu and Mitra, Arindam and Whitehead, Spencer and Su, Yu and Hassan, Ahmed",
    "title": "Explorer: Scaling exploration-driven web trajectory synthesis for multimodal web agents",
    "shorthand": "Explorer",
    "multiLLM": "False",
    "data_quartal": "2025-07",
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
      "other",
      "planning",
      "simulation"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Marreed, Sami and Oved, Alon and Yaeli, Avi and Shlomov, Segev and Levy, Ido and Akrabi, Offer and Sela, Aviad and Adi, Asaf and Mashkif, Nir",
    "title": "Towards Enterprise-Ready Computer Using Generalist Agent",
    "shorthand": "CUGA",
    "multiLLM": "True",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Unspecified (open + frontier LLMs)"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "context",
      "pipelines",
      "planning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Wang, Sierra and Mitchell, John and Piech, Chris",
    "title": "AI Web Agents Can Effectively Guide Lesson Design and Predict Student Outcomes",
    "shorthand": "AI-WebAgents",
    "multiLLM": "False",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT",
      "o1"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "decision making",
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Bohra, Arth and Saroyan, Manvel and Melkozerov, Danil and Karufanyan, Vahe and Maher, Gabriel and Weinberger, Pascal and Harutyunyan, Artem and Campagna, Giovanni",
    "title": "WebLists: Extracting Structured Information from Complex Interactive Websites Using Executable LLM Agents",
    "shorthand": "BardeenAgent",
    "multiLLM": "True",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "Gemini"
    ],
    "benchmarksUsed": [
      "WebLists"
    ],
    "strategies": [
      "backtracking",
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zhengwei Tao and Jialong Wu and Wenbiao Yin and Pu Wu and Junkai Zhang and Baixuan Li and Haiyang SHEN and Kuan Li and Liwen Zhang and Xinyu Wang and Wentao Zhang and Yong Jiang and Pengjun Xie and Fei Huang and Jingren Zhou",
    "title": "WebShaper: Agentically Data Synthesizing via Information-Seeking Formalization",
    "shorthand": "WebShaper",
    "multiLLM": "False",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen",
      "Qwen-QwQ"
    ],
    "benchmarksUsed": [
      "GAIA",
      "WebWalkerQA"
    ],
    "strategies": [
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Chevrot, Antoine and Vernotte, Alexandre and Falleri, Jean-R{\\'e}my and Blanc, Xavier and Legeard, Bruno and Cretin, Aymeric",
    "title": "Are Autonomous Web Agents Good Testers?",
    "shorthand": "ATA-PinATA",
    "multiLLM": "False",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT",
      "Claude Sonnet",
      "Gemini"
    ],
    "benchmarksUsed": [
      "ATA benchmark"
    ],
    "strategies": [
      "evaluation",
      "memory",
      "other",
      "planning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "",
    "title": "",
    "shorthand": "ATA-SeeAct",
    "multiLLM": "False",
    "data_quartal": "2025-07",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "Claude Sonnet",
      "Gemini"
    ],
    "benchmarksUsed": [
      "ATA benchmark"
    ],
    "strategies": [
      "decision making",
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Yuhan Guo and Guocong and Aiwen Sun and Hongliang He and Xinyu Yang and Yue Lu and Yingji Zhang and Xuntao Guo and Dong Zhang and Jianzhuang Liu and Jiang Duan and Yijia Xiao and Liangjian Wen and Haiming Xu and Yong Dai",
    "title": "Web-CogReasoner: Towards Knowledge-Induced Cognitive Reasoning for Web Agents",
    "shorthand": "WebCogReasoner",
    "multiLLM": "False",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "Web-CogBench",
      "VisualWebBench",
      "WebVoyager",
      "Multimodal-Mind2Web"
    ],
    "strategies": [
      "decision making",
      "learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Jin, Bowen and Zeng, Hansi and Yue, Zhenrui and Yoon, Jinsung and Arik, Sercan and Wang, Dong and Zamani, Hamed and Han, Jiawei",
    "title": "Search-r1: Training llms to reason and leverage search engines with reinforcement learning",
    "shorthand": "Search-R1",
    "multiLLM": "True",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "policy optimization",
      "reward",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Liu, Jiarun and Zhang, Chunhong and Hu, Zheng",
    "title": "Cognitive Duality for Adaptive Web Agents",
    "shorthand": "CogniWeb",
    "multiLLM": "True",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT",
      "Phi",
      "Gemma"
    ],
    "benchmarksUsed": [
      "WebArena"
    ],
    "strategies": [
      "decision making",
      "memory"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "",
    "title": "",
    "shorthand": "WebWalker",
    "multiLLM": "False",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "Qwen-Plus",
      "Qwen"
    ],
    "benchmarksUsed": [
      "WebWalkerQA"
    ],
    "strategies": [
      "decision making",
      "exploration"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Jiejun Tan and Zhicheng Dou and Yan Yu and Jiehan Cheng and Qiang Ju and Jian Xie and Ji-Rong Wen",
    "title": "HierSearch: A Hierarchical Enterprise Deep Search Framework Integrating Local and Web Searches",
    "shorthand": "HierSearch",
    "multiLLM": "False",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "other",
      "planning",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Pang, Xianghe and Tang, Shuo and Ye, Rui and Du, Yuwen and Du, Yaxin and Chen, Siheng",
    "title": "BrowseMaster: Towards Scalable Web Browsing via Tool-Augmented Programmatic Agent Pair",
    "shorthand": "BrowseMaster",
    "multiLLM": "True",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "DeepSeek",
      "GPT"
    ],
    "benchmarksUsed": [
      "BrowseComp-en",
      "BrowseComp-zh",
      "GAIA",
      "WebWalkerQA"
    ],
    "strategies": [
      "exploration",
      "online search",
      "planning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Li, Weizhen and Lin, Jianbo and Jiang, Zhuosong and Cao, Jingyi and Liu, Xinpeng and Zhang, Jiayu and Huang, Zhenqiang and Chen, Qianben and Sun, Weichen and Wang, Qiexiang and others",
    "title": "Chain-of-Agents: End-to-End Agent Foundation Models via Multi-Agent Distillation and Agentic Reinforcement Learning",
    "shorthand": "AFM",
    "multiLLM": "True",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "GAIA",
      "BrowseComp-en",
      "WebWalker"
    ],
    "strategies": [
      "evaluation",
      "planning",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Fang, Tianqing and Zhang, Hongming and Zhang, Zhisong and Ma, Kaixin and Yu, Wenhao and Mi, Haitao and Yu, Dong",
    "title": "{W}eb{E}volver: Enhancing Web Agent Self-Improvement with Co-evolving World Model",
    "shorthand": "WebEvolver",
    "multiLLM": "True",
    "data_quartal": "2025-08",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager",
      "Mind2Web-Live",
      "GAIA-web"
    ],
    "strategies": [
      "reflection",
      "simulation",
      "trajectories",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Tanvir Bhathal and Asanshay Gupta",
    "title": "WebSight: A Vision-First Architecture for Robust Web Agents",
    "shorthand": "WebSight",
    "multiLLM": "True",
    "data_quartal": "2025-08",
    "inputModality": [
      "Visuals"
    ],
    "models": [
      "WebSight-7B"
    ],
    "benchmarksUsed": [
      "Showdown Clicks",
      "WebVoyager"
    ],
    "strategies": [
      "memory",
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Xinyu Geng and Peng Xia and Zhen Zhang and Xinyu Wang and Qiuchen Wang and Ruixue Ding and Chenxi Wang and Jialong Wu and Kuan Li and Yida Zhao and Huifeng Yin and Yong Jiang and Pengjun Xie and Fei Huang and Huaxiu Yao and Yi R. Fung and Jingren Zhou",
    "title": "WebWatcher: Breaking New Frontiers of Vision-Language Deep Research Agent",
    "shorthand": "WebWatcher",
    "multiLLM": "True",
    "data_quartal": "2025-09",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Qwen",
      "GPT",
      "Gemini",
      "Claude"
    ],
    "benchmarksUsed": [
      "BrowseComp-VL"
    ],
    "strategies": [
      "other",
      "pipelines"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Mei, Lang and Yang, Zhihan and Yu, Xiaohan and Zhang, Huanyao and Chen, Chong",
    "title": "Ai-searchplanner: Modular agentic search via pareto-optimal multi-objective reinforcement learning",
    "shorthand": "SearchPlanner",
    "multiLLM": "False",
    "data_quartal": "2025-09",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "WebShaper",
      "WebWalker"
    ],
    "strategies": [
      "optimization",
      "planning",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Li, Kuan and Zhang, Zhongwang and Yin, Huifeng and Zhang, Liwen and Ou, Litu and Wu, Jialong and Yin, Wenbiao and Li, Baixuan and Tao, Zhengwei and Wang, Xinyu and others",
    "title": "Websailor: Navigating super-human reasoning for web agent",
    "shorthand": "WebSailor-V2",
    "multiLLM": "False",
    "data_quartal": "2025-09",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "BrowseComp-en",
      "GAIA"
    ],
    "strategies": [
      "other",
      "rag",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Hu, Minda and Fang, Tianqing and Zhang, Jianshu and Ma, Jun-Yu and Zhang, Zhisong and Zhou, Jingyan and Zhang, Hongming and Mi, Haitao and Yu, Dong and King, Irwin",
    "title": "{W}eb{C}o{T}: Enhancing Web Agent Reasoning by Reconstructing Chain-of-Thought in Reflection, Branching, and Rollback",
    "shorthand": "WebCoT",
    "multiLLM": "False",
    "data_quartal": "2025-09",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Llama"
    ],
    "benchmarksUsed": [
      "WebVoyager",
      "Mind2Web-Live"
    ],
    "strategies": [
      "backtracking",
      "reflection",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "He, Kaiwen and Wang, Zhiwei and Zhuang, Chenyi and Gu, Jinjie",
    "title": "Recon-Act: A Self-Evolving Multi-Agent Browser-Use System via Web Reconnaissance, Tool Generation, and Task Execution",
    "shorthand": "Recon-Act",
    "multiLLM": "True",
    "data_quartal": "2025-09",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "VisualWebArena"
    ],
    "strategies": [
      "other",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Gongrui Zhang and Jialiang Zhu and Ruiqi Yang and Kai Qiu and Miaosen Zhang and Zhirong Wu and Qi Dai and Bei Liu and Chong Luo and Zhengyuan Yang and Linjie Li and Lijuan Wang and Weizhu Chen and Yuan Zhang and Xin Li and Zhaoyi Liu and Xin Geng and Baining Guo",
    "title": "InfoAgent: Advancing Autonomous Information-Seeking Agents",
    "shorthand": "InfoAgent",
    "multiLLM": "False",
    "data_quartal": "2025-09",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "BrowseComp-en",
      "BrowseComp-zh",
      "WebWalkerQA"
    ],
    "strategies": [
      "other",
      "reflection",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zhisong Zhang and Tianqing Fang and Kaixin Ma and Wenhao Yu and Hongming Zhang and Haitao Mi and Dong Yu",
    "title": "WebRollback: Enhancing Web Agents with Explicit Rollback Mechanisms",
    "shorthand": "WebRollback",
    "multiLLM": "False",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "LLaMA",
      "Qwen"
    ],
    "benchmarksUsed": [
      "Mind2Web-Live",
      "WebVoyager"
    ],
    "strategies": [
      "backtracking",
      "decision making"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Imene Kerboua and Sahar Omidi Shayegan and Megh Thakkar and Xing Han Lù and Léo Boisvert and Massimo Caccia and Jérémy Espinas and Alexandre Aussem and Véronique Eglin and Alexandre Lacoste",
    "title": "FocusAgent: Simple Yet Effective Ways of Trimming the Large Context of Web Agents",
    "shorthand": "FocusAgent",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "WorkArena L1",
      "WebArena"
    ],
    "strategies": [
      "other",
      "preprocessing",
      "rag"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zijian Li and Xin Guan and Bo Zhang and Shen Huang and Houquan Zhou and Shaopeng Lai and Ming Yan and Yong Jiang and Pengjun Xie and Fei Huang and Jun Zhang and Jingren Zhou",
    "title": "WebWeaver: Structuring Web-Scale Evidence with Dynamic Outlines for Open-Ended Deep Research",
    "shorthand": "WebWeaver",
    "multiLLM": "False",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Claude Sonnet"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "memory",
      "online search",
      "planning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Jingbo Yang and Bairu Hou and Wei Wei and Shiyu Chang and Yujia Bao",
    "title": "WebDART: Dynamic Decomposition and Re-planning for Complex Web Tasks",
    "shorthand": "WebDART",
    "multiLLM": "False",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "GLM"
    ],
    "benchmarksUsed": [
      "WebChoreArena",
      "WebArena"
    ],
    "strategies": [
      "pipelines",
      "planning",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Wei, Zhepei and Yao, Wenlin and Liu, Yao and Zhang, Weizhi and Lu, Qin and Qiu, Liang and Yu, Changlong and Xu, Puyang and Zhang, Chao and Yin, Bing and Yun, Hyokun and Li, Lihong",
    "title": "{W}eb{A}gent-R1: Training Web Agents via End-to-End Multi-Turn Reinforcement Learning",
    "shorthand": "WebAgent-R1",
    "multiLLM": "False",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen",
      "Llama"
    ],
    "benchmarksUsed": [
      "WebArena-Lite"
    ],
    "strategies": [
      "context",
      "planning",
      "reinforcement learning",
      "trajectories"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Junteng Liu and Yunji Li and Chi Zhang and Jingyang Li and Aili Chen and Ke Ji and Weiyu Cheng and Zijia Wu and Chengyu Du and Qidi Xu and Jiayuan Song and Zhengmao Zhu and Wenhu Chen and Pengyu Zhao and Junxian He",
    "title": "WebExplorer: Explore and Evolve for Training Long-Horizon Web Agents",
    "shorthand": "WebExplorer",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "WebExplorer 8B"
    ],
    "benchmarksUsed": [
      "BrowseComp-en",
      "BrowseComp-zh",
      "WebArena"
    ],
    "strategies": [
      "api-based",
      "context",
      "decision making"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Xinxing Ren and Caelum Forder and Qianbo Zang and Ahsen Tahir and Roman J. Georgio and Suman Deb and Peter Carroll and Önder Gürcan and Zekun Guo",
    "title": "Anemoi: A Semi-Centralized Multi-agent System Based on Agent-to-Agent Communication MCP server from Coral Protocol",
    "shorthand": "Anemoi",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "GAIA"
    ],
    "strategies": [
      "other",
      "planning",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Xiaoxi Li and Jiajie Jin and Guanting Dong and Hongjin Qian and Yongkang Wu and Ji-Rong Wen and Yutao Zhu and Zhicheng Dou",
    "title": "WebThinker: Empowering Large Reasoning Models with Deep Research Capability",
    "shorthand": "WebThinker",
    "multiLLM": "False",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen-QwQ",
      "DeepSeek"
    ],
    "benchmarksUsed": [
      "GAIA",
      "WebWalkerQA"
    ],
    "strategies": [
      "other",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Tao Li and Jinlong Hu and Yang Wang and Junfeng Liu and Xuejun Liu",
    "title": "WebRouter: Query-specific Router via Variational Information Bottleneck for Cost-sensitive Web Agent",
    "shorthand": "WebRouter",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "Gemini",
      "Claude"
    ],
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "strategies": [
      "other",
      "planning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Lu, Rui and Hou, Zhenyu and Wang, Zihan and Zhang, Hanchen and Liu, Xiao and Li, Yujiang and Feng, Shi and Tang, Jie and Dong, Yuxiao",
    "title": "DeepDive: Advancing Deep Search Agents with Knowledge Graphs and Multi-Turn Reinforcement Learning",
    "shorthand": "DeepDive",
    "multiLLM": "False",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen-QwQ",
      "GLM"
    ],
    "benchmarksUsed": [
      "BrowseComp-en",
      "BrowseComp-zh"
    ],
    "strategies": [
      "other",
      "reinforcement learning",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Yu, Tao and Zhang, Zhengbo and Lyu, Zhiheng and Gong, Junhao and Yi, Hongzhu and Wang, Xinming and Zhou, Yuxuan and Yang, Jiabing and Nie, Ping and Huang, Yan and Chen, Wenhu",
    "title": "BrowserAgent: Building Web Agents with Human-Inspired Web Browsing Actions",
    "shorthand": "BrowserAgent",
    "multiLLM": "False",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "finetuning",
      "memory",
      "online search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Xixi Wu and Kuan Li and Yida Zhao and Liwen Zhang and Litu Ou and Huifeng Yin and Zhongwang Zhang and Xinmiao Yu and Dingchu Zhang and Yong Jiang and Pengjun Xie and Fei Huang and Minhao Cheng and Shuai Wang and Hong Cheng and Jingren Zhou",
    "title": "ReSum: Unlocking Long-Horizon Search Intelligence via Context Summarization",
    "shorthand": "ReSum",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [
      "GAIA",
      "BrowseComp-zh",
      "BrowseComp-en"
    ],
    "strategies": [
      "context",
      "exploration",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "He, Shiqi and Cui, Yue and Ma, Xinyu and Li, Yaliang and Ding, Bolin and Chowdhury, Mosharaf",
    "title": "Branch-and-Browse: Efficient and Controllable Web Exploration with Tree-Structured Reasoning and Action Memory",
    "shorthand": "Branch-and-Browse",
    "multiLLM": "False",
    "data_quartal": "2025-10",
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
      "backtracking",
      "decision making",
      "memory"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Howard Yen and Ashwin Paranjape and Mengzhou Xia and Thejas Venkatesh and Jack Hessel and Danqi Chen and Yuhao Zhang",
    "title": "Lost in the Maze: Overcoming Context Limitations in Long-Horizon Agentic Search",
    "shorthand": "SLIM",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "o3"
    ],
    "benchmarksUsed": [
      "BrowseComp-en"
    ],
    "strategies": [
      "context",
      "preprocessing",
      "tree search"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Mathieu Andreux and Märt Bakler and Yanael Barbier and Hamza Benchekroun and Emilien Biré and Antoine Bonnet and Riaz Bordie and Nathan Bout and Matthias Brunel and Aleix Cambray and Pierre-Louis Cedoz and Antoine Chassang and Gautier Cloix and Ethan Connelly and Alexandra Constantinou and Ramzi De Coster and Hubert de la Jonquiere and Aurélien Delfosse and Maxime Delpit and Alexis Deprez and Augustin Derupti and Mathieu Diaz and Shannon D'Souza and Julie Dujardin and Abai Edmund and Michael Eickenberg and Armand Fatalot and Wissem Felissi and Isaac Herring and Xavier Koegler and Erwan Le Jumeau de Kergaradec and Aurélien Lac and Maxime Langevin and Corentin Lauverjat and Antonio Loison and Avshalom Manevich and Axel Moyal and Axel Nguyen Kerbel and Marinela Parovic and Julien Revelle and Guillaume Richard and Mats Richter and Ronan Riochet and María Santos and Romain Savidan and Laurent Sifre and Maxime Theillard and Marc Thibault and Ivan Valentini and Tony Wu and Laura Yie and Kai Yuan and Jevgenij Zubovskij",
    "title": "Surfer 2: The Next Generation of Cross-Platform Computer Use Agents",
    "shorthand": "Surfer 2",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Visuals"
    ],
    "models": [
      "Holo",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager",
      "WebArena",
      "OSWorld",
      "AndroidWorld"
    ],
    "strategies": [
      "context",
      "decision making",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Mingkai Deng and Jinyu Hou and Zhiting Hu and Eric Xing",
    "title": "SimuRA: A World-Model-Driven Simulative Reasoning Architecture for General Goal-Oriented Agents",
    "shorthand": "SIMURA",
    "multiLLM": "True",
    "data_quartal": "2025-10",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT"
    ],
    "benchmarksUsed": [
      "FlightQA",
      "WebArena"
    ],
    "strategies": [
      "decision making",
      "planning",
      "simulation"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Dheeraj Vattikonda and Santhoshi Ravichandran and Emiliano Penaloza and Hadi Nekoei and Thibault Le Sellier de Chezelles and Megh Thakkar and Nicolas Gontier and Miguel Mu{\\~n}oz-M{\\'a}rmol and Sahar Omidi Shayegan and Stefania Raimondo and Xue Liu and Alexandre Drouin and Alexandre Pich{\\'e} and Alexandre Lacoste and Massimo Caccia",
    "title": "How to Train Your {LLM} Web Agent: A Statistical Diagnosis",
    "shorthand": "TrainLLM",
    "multiLLM": "True",
    "data_quartal": "2025-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "LLaMA",
      "Qwen"
    ],
    "benchmarksUsed": [
      "MiniWoB++",
      "WorkArena"
    ],
    "strategies": [
      "finetuning",
      "optimization",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Zhang, Ding-Chu and Zhao, Yida and Wu, Jialong and Zhang, Liwen and Li, Baixuan and Yin, Wenbiao and Jiang, Yong and Li, Yu-Feng and Tu, Kewei and Xie, Pengjun and Huang, Fei",
    "title": "{E}volve{S}earch: An Iterative Self-Evolving Search Agent",
    "shorthand": "EvolveSearch",
    "multiLLM": "True",
    "data_quartal": "2025-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Qwen"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "online search",
      "policy optimization",
      "reinforcement learning"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Akshara Prabhakar and Roshan Ram and Zixiang Chen and Silvio Savarese and Frank Wang and Caiming Xiong and Huan Wang and Weiran Yao",
    "title": "Enterprise Deep Research: Steerable Multi-Agent Deep Research for Enterprise Analytics",
    "shorthand": "EDR",
    "multiLLM": "False",
    "data_quartal": "2025-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Gemini"
    ],
    "benchmarksUsed": [],
    "strategies": [
      "decision making",
      "online search",
      "reflection"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Ma, Tianyi and Tang, Tianyi and Lyu, Yueming and Yin, Haiyan and Ong, Yew-Soon and Tsang, Ivor",
    "title": "PrivAgentFlow: Agentic Workflow for Distributed Privacy Control in Web Agents",
    "shorthand": "PrivAgentFlow",
    "multiLLM": "True",
    "data_quartal": "2025-11",
    "inputModality": [
      "Text"
    ],
    "models": [
      "GPT",
      "LLaMA",
      "Qwen"
    ],
    "benchmarksUsed": [
      "AgentDAM (shopping subset)"
    ],
    "strategies": [
      "api-based",
      "other"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Liu, Genglin and Geng, Shijie and Li, Sha and Cui, Hejie and Zhang, Sarah and Liu, Xin and Liu, Tianyi",
    "title": "WebCoach: Self-Evolving Web Agents with Cross-Session Memory Guidance",
    "shorthand": "WebCoach",
    "multiLLM": "True",
    "data_quartal": "2025-11",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "Qwen-VL",
      "Skywork",
      "GPT"
    ],
    "benchmarksUsed": [
      "WebVoyager"
    ],
    "strategies": [
      "human-in-the-loop",
      "memory",
      "rag"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Tan, Jinzhe and Benyekhlef, Karim",
    "title": "LegalWebAgent: Empowering Access to Justice via LLM-Based Web Agents",
    "shorthand": "LegalWebAgent",
    "multiLLM": "False",
    "data_quartal": "2025-11",
    "inputModality": [
      "Text",
      "Visuals"
    ],
    "models": [
      "GPT",
      "Claude Sonnet",
      "DeepSeek"
    ],
    "benchmarksUsed": [
      "LegalWebAgent benchmark"
    ],
    "strategies": [
      "decision making",
      "grounding",
      "pipelines"
    ]
  },
  {
    "publicationYear": "2025",
    "authors": "Cheng, Jiali and Kumar, Anjishnu and Lal, Roshan and Rajasekaran, Rishi and Ramezani, Hani and Khan, Omar Zia and Rokhlenko, Oleg and Chiu-Webster, Sunny and Hua, Gang and Amiri, Hadi",
    "title": "WebATLAS: An LLM Agent with Experience-Driven Memory and Action Simulation",
    "shorthand": "WebATLAS",
    "multiLLM": "True",
    "data_quartal": "2025-12",
    "inputModality": [
      "Text"
    ],
    "models": [
      "Claude Sonnet",
      "LLM-agnostic"
    ],
    "benchmarksUsed": [
      "WebArena-Lite"
    ],
    "strategies": [
      "memory",
      "planning",
      "reinforcement learning",
      "simulation"
    ]
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

  // Extract unique values for filter options
  const uniqueYears = [...new Set(data.map(item => item.publicationYear))].sort();
  const uniqueModels = [...new Set(data.flatMap(item => item.models))].sort();
  const uniqueModalities = [...new Set(data.flatMap(item => item.inputModality))].sort();
  const uniqueStrategies = [...new Set(data.flatMap(item => item.strategies))].sort();
  const uniqueBenchmarks = [...new Set(data.flatMap(item => item.benchmarksUsed))].sort();
  const uniqueVenues = [...new Set(data.map(item => item.venue))].sort();

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
      return matchesSearch && matchesYear && matchesModel && matchesModality && 
             matchesStrategy && matchesMultiLLM && matchesBenchmark && matchesVenue;
    });
  }, [searchTerm, yearFilter, modelFilter, modalityFilter, strategyFilter, multiLLMFilter, 
      benchmarkFilter, venueFilter]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setYearFilter([]);
    setModelFilter([]);
    setModalityFilter([]);
    setStrategyFilter([]);
    setMultiLLMFilter([]);
    setBenchmarkFilter([]);
    setVenueFilter([]);
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
