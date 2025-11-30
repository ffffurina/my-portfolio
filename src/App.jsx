import React, { useState, useEffect } from 'react';
import { 
  // 基础图标
  Book, Code, Globe, Mail, Github, FileText, ChevronRight, Moon, Sun, Download, Linkedin, GraduationCap, Award, Cpu, MapPin, Link as LinkIcon,
  // 兴趣图标
  Camera, Plane, Dumbbell, Languages, Music, Coffee, Terminal, PenTool
} from 'lucide-react';

/**
 * ====================================================================================
 * CONFIG & DATA
 * ====================================================================================
 */

const CONFIG = {
  // === 颜色配置 ===
  colors: {
    primary: "blue",     // 链接和高亮颜色
    sidebar: "slate",    // 侧边栏色调
  },

  social: {
    github: "https://github.com/ffffurina",
    email: "mailto:2300012961@stu.pku.edu.cn",
  }
};

const DATA = {
  profile: {
    name: { zh: "李宸鑫", en: "Chenxin Li" },
    role: { zh: "本科生 @ 北京大学", en: "Undergraduate @ PKU" },
    location: { zh: "中国 · 北京", en: "Beijing, China" },
    bio: {
      zh: "北京大学信息科学技术学院大三本科生。主要关注人工智能与社会科学的交叉领域，致力于探索具身智能、多智能体系统以及计算社会科学。",
      en: "Third-year undergraduate at School of EECS, Peking University. Focusing on the intersection of AI and Social Science, dedicated to exploring Embodied AI, Multi-agent Systems, and Computational Social Science."
    },
    // 本地头像: 放入 public/avatar.jpg
    avatar: "/avatar.jpg", 
    tags: ["Embodied AI", "MARL", "Comp Social Sci"]
  },

  education: [
    {
      school: { zh: "北京大学", en: "Peking University" },
      url: "https://eecs.pku.edu.cn/", 
      degree: { zh: "理学学士 - 信息与计算科学", en: "B.S. in Info & Comp Sci" },
      time: "2023 - Present",
      logo: "book"
    },
    {
      school: { zh: "郑州外国语学校", en: "Zhengzhou Foreign Language School" },
      url: "http://www.zzfls.com.cn/", 
      degree: { zh: "高中", en: "High School Diploma" },
      time: "2020 - 2023",
      logo: "graduation"
    }
  ],

  publications: [
    {
      title: "FALCO: Foundation Model Guided Active Learning for Cost-effective Off-Road Freespace Detection",
      authors: "Shuai Wang, Chenxin Li, et al.",
      venue: "Under Review at ICRA 2025",
      link: "#",
      tag: "Active Learning",
    },
  ],

  interests: [
    { name: { zh: "语言", en: "Languages" }, icon: "Languages", desc: "中(母语), 英(流利), 西/日(基础)" },
    { name: { zh: "摄影", en: "Photography" }, icon: "Camera", desc: "风光与街头" },
    { name: { zh: "旅行", en: "Traveling" }, icon: "Plane", desc: "文化探索" },
    { name: { zh: "体育", en: "Sports" }, icon: "Dumbbell", desc: "网球, 游泳" },
  ],

  notes: [
    {
      title: { zh: "CS231n: 卷积神经网络深度解析", en: "Deep Dive into CS231n: CNNs" },
      date: "2024-10-15",
      category: "Computer Vision",
      summary: { zh: "关于反向传播推导与ResNet架构的详细笔记。", en: "Detailed notes on backprop derivation and ResNet architecture." },
      link: "/notes/cs231n"
    },
    {
      title: { zh: "Reinforcement Learning: Policy Gradient", en: "RL: Policy Gradient Explained" },
      date: "2024-09-20",
      category: "Reinforcement Learning",
      summary: { zh: "Sutton书中第13章的推导与PyTorch实现。", en: "Derivation from Sutton's Chapter 13 and PyTorch implementation." },
      link: "/notes/rl-pg"
    },
     {
      title: { zh: "多智能体博弈论基础", en: "Basics of Multi-Agent Game Theory" },
      date: "2024-08-10",
      category: "MARL",
      summary: { zh: "纳什均衡存在性证明与相关算法综述。", en: "Proof of Nash Equilibrium existence and survey of algorithms." },
      link: "/notes/game-theory"
    }
  ]
};

// --- 图标组件 ---
const Icon = ({ name, className }) => {
  const icons = { Book, Code, Globe, Mail, Github, FileText, ChevronRight, Moon, Sun, Download, Linkedin, GraduationCap, Award, Cpu, Camera, Plane, Dumbbell, Languages, MapPin, LinkIcon };
  const LucideIcon = icons[name] || Code;
  return <LucideIcon className={className} />;
};

export default function Portfolio() {
  const [lang, setLang] = useState('zh');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const t = (obj) => (typeof obj === 'string' ? obj : obj[lang] || obj['en']);
  const toggleLang = () => setLang(l => l === 'zh' ? 'en' : 'zh');
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-300' : 'bg-white text-slate-700'} font-sans flex flex-col md:flex-row`}>
      
      {/* =======================
          左侧侧边栏 (Sidebar) 
          ======================= */}
      <aside className={`w-full md:w-64 md:h-screen md:sticky md:top-0 flex flex-col shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 z-20`}>
        
        {/* 头像与基础信息区域 */}
        <div className="p-6 md:p-8 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative mb-5 group cursor-pointer">
             <img 
              src={DATA.profile.avatar} 
              alt="Avatar" 
              className="relative w-28 h-28 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
            />
          </div>
          
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
            {t(DATA.profile.name)}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            {t(DATA.profile.role)}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-5">
            <MapPin size={10} />
            <span>{t(DATA.profile.location)}</span>
          </div>

          {/* 社交链接 (Sidebar) */}
          <div className="flex gap-4 mb-6">
            <a href={CONFIG.social.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github size={18} />
            </a>
            <a href={CONFIG.social.email} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* 导航菜单 (Sidebar Navigation) */}
        <nav className="flex-1 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 
              ${activeTab === 'profile' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}
          >
            <Book size={16} />
            {lang === 'zh' ? '简介' : 'Profile'}
          </button>
          
          <button 
            onClick={() => setActiveTab('notes')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 
              ${activeTab === 'notes' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}
          >
            <Code size={16} />
            {lang === 'zh' ? '笔记' : 'Notes'}
          </button>
        </nav>

        {/* 底部设置 (Sidebar Footer) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <button onClick={toggleTheme} className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
             {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={toggleLang} className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-2 py-1 transition-colors">
             {lang === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      </aside>

      {/* =======================
          右侧主要内容区 (Main) 
          ======================= */}
      <main className="flex-1 min-w-0 bg-white dark:bg-slate-900 md:bg-transparent overflow-y-auto">
        {/* 调整核心：max-w-7xl (更宽) + py-8 (更紧凑的顶部) 
        */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          
          {activeTab === 'profile' ? (
            <div className="space-y-10 animate-in fade-in duration-300">
              
              {/* Bio Section */}
              <section>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
                   {lang === 'zh' ? '个人简介' : 'Biography'}
                </h2>
                {/* 调整核心：text-sm (更小的字号) + text-justify (两端对齐) */}
                <p className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm text-justify max-w-4xl">
                  {t(DATA.profile.bio)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DATA.profile.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs border border-slate-200 dark:border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Education Section */}
                <section>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                     {lang === 'zh' ? '教育经历' : 'Education'}
                  </h2>
                  <div className="space-y-4">
                    {DATA.education.map((edu, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="mt-0.5 text-slate-400 shrink-0">
                           <Icon name={edu.logo} size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              <a href={edu.url} target="_blank" rel="noreferrer" className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline decoration-slate-300 underline-offset-2 transition-all">
                                {t(edu.school)}
                              </a>
                            </h3>
                            <span className="text-xs text-slate-400 font-mono tabular-nums">{edu.time}</span>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{t(edu.degree)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Interests Section */}
                <section>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                     {lang === 'zh' ? '兴趣爱好' : 'Interests'}
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                     {DATA.interests.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 p-2 rounded border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-100 dark:hover:border-slate-700 transition-colors">
                           <div className="text-slate-400">
                              <Icon name={item.icon} size={16} />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{t(item.name)}</div>
                              <div className="text-[10px] text-slate-500">{item.desc}</div>
                           </div>
                        </div>
                     ))}
                  </div>
                </section>
              </div>

              {/* Publications Section */}
              <section>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                   {lang === 'zh' ? '论文发表' : 'Publications'}
                </h2>
                <div className="space-y-3">
                  {DATA.publications.map((pub, idx) => (
                    <div key={idx} className="group">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                        <a href={pub.link}>{pub.title}</a>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{pub.authors}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-slate-500 italic bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{pub.venue}</span>
                        <span className="text-[10px] text-slate-400 border border-slate-200 dark:border-slate-700 px-1 rounded">{pub.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          ) : (
            /* NOTES CONTENT */
            <div className="animate-in fade-in duration-300">
              <header className="mb-8 flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{lang === 'zh' ? '学习笔记' : 'Learning Notes'}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    {lang === 'zh' ? 'Obsidian 归档与复习' : 'Archived from Obsidian'}
                  </p>
                </div>
                {/* 模拟的 Obsidan 图标提示 */}
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <FileText size={14} />
                  <span>Markdown Supported</span>
                </div>
              </header>

              {/* 调整核心：grid-cols-2 (两列布局) + gap-4 (紧凑)
                  在宽屏下显示两列笔记，填充满屏幕
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {DATA.notes.map((note, idx) => (
                   <a key={idx} href={note.link} className="flex flex-col p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-sm bg-white dark:bg-slate-900/50 transition-all group h-full">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border border-blue-100 dark:border-blue-900/30 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/10">
                          {note.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{note.date}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors mb-1.5 line-clamp-1">
                         {t(note.title)}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
                        {t(note.summary)}
                      </p>
                      
                      {/* Read More Link */}
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-medium text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lang === 'zh' ? '阅读' : 'Read'} <ChevronRight size={12} className="ml-1" />
                      </div>
                   </a>
                 ))}
              </div>
            </div>
          )}

          <footer className="mt-16 py-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-300 md:hidden">
            <p>© {new Date().getFullYear()} {t(DATA.profile.name)}</p>
          </footer>
        </div>
      </main>
    </div>
  );
}