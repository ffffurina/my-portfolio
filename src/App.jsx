import React, { useState, useEffect } from 'react';
import { Book, Code, Globe, Mail, Github, FileText, ChevronRight, Moon, Sun, Download, Linkedin, GraduationCap, Award, Cpu } from 'lucide-react';

/**
 * ====================================================================================
 * 用户配置区域 (USER CONFIGURATION)
 * 在此处修改所有的文本、图片链接和配色，无需修改下方的逻辑代码。
 * ====================================================================================
 */

const CONFIG = {
  // 网页的主题色 (Tailwind colors: blue, indigo, slate, teal, rose, violet, etc.)
  themeColor: 'indigo',
  
  // 背景设置
  background: {
    type: 'gradient', // 选项: 'gradient' (渐变), 'solid' (纯色), 'image' (图片)
    // 如果选 'image'，请在 url 填入图片链接，例如: 'https://images.unsplash.com/photo-1...'
    url: '', 
    // 如果选 'gradient'，这里定义渐变色
    gradientClass: 'bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
  },

  // 社交链接
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:yourname@pku.edu.cn",
    scholar: "https://scholar.google.com", // Google Scholar
  }
};

const DATA = {
  // === 个人信息 ===
  profile: {
    name: { zh: "陈 艾", en: "Alex Chen" },
    title: { 
      zh: "北京大学 · 人工智能系 · 本科生", 
      en: "Undergraduate in AI @ Peking University" 
    },
    bio: {
      zh: "我是一名致力于探索通用人工智能（AGI）的大三学生。主要研究兴趣包括大语言模型推理、多模态学习以及自然语言处理。热衷于通过代码和数学理解世界。",
      en: "I am a junior undergraduate dedicated to exploring AGI. My research interests include LLM Reasoning, Multimodal Learning, and NLP. Passionate about understanding the world through code and math."
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=c0aede", // 替换为你自己的照片URL
    tags: ["AI Researcher", "Full Stack", "Language Learner"]
  },

  // === 教育背景 ===
  education: [
    {
      school: { zh: "北京大学", en: "Peking University" },
      degree: { zh: "工学学士 - 智能科学与技术", en: "B.E. in Intelligence Science and Technology" },
      time: "2023 - Present",
      gpa: "3.8/4.0",
      logo: "graduation" // icon name
    },
    {
      school: { zh: "北京第四中学", en: "Beijing No.4 High School" },
      degree: { zh: "高中", en: "High School Diploma" },
      time: "2020 - 2023",
      gpa: "N/A",
      logo: "book"
    }
  ],

  // === 论文发表 (Publications) ===
  publications: [
    {
      title: "Optimizing Transformer Attention Mechanisms for Long Contexts",
      authors: "Alex Chen, Prof. Zhang, et al.",
      venue: "Submitted to NeurIPS 2025",
      link: "#",
      tag: "Deep Learning"
    },
    {
      title: "A Survey on Multimodal Sentiment Analysis in Low-Resource Languages",
      authors: "Alex Chen, Collaborator B",
      venue: "Undergraduate Research Project",
      link: "#",
      tag: "NLP"
    }
  ],

  // === 个人兴趣 ===
  interests: [
    { name: { zh: "语言学习", en: "Languages" }, icon: "Globe", desc: "Native Chinese, Fluent English, Basic Spanish" },
    { name: { zh: "摄影", en: "Photography" }, icon: "Camera", desc: "Capturing moments in Beijing" },
    { name: { zh: "编码", en: "Coding" }, icon: "Code", desc: "React, Python, PyTorch" },
  ],

  // === 学习笔记 (Learning Notes) ===
  notes: [
    {
      title: { zh: "CS231n: 卷积神经网络深度解析", en: "Deep Dive into CS231n: CNNs" },
      date: "2024-10-15",
      category: "Computer Vision",
      summary: { zh: "关于反向传播推导与ResNet架构的详细笔记。", en: "Detailed notes on backprop derivation and ResNet architecture." },
      link: "/notes/cs231n"
    },
    {
      title: { zh: "Reinforcement Learning: policy Gradient", en: "RL: Policy Gradient Explained" },
      date: "2024-09-20",
      category: "Reinforcement Learning",
      summary: { zh: "Sutton书中第13章的推导与PyTorch实现。", en: "Derivation from Sutton's Chapter 13 and PyTorch implementation." },
      link: "/notes/rl-pg"
    },
    {
      title: { zh: "西班牙语入门：动词变位总结", en: "Spanish 101: Verb Conjugation Summary" },
      date: "2024-08-05",
      category: "Language",
      summary: { zh: "一般现在时与过去时的规则变化表。", en: "Table of regular conjugations in present and past tenses." },
      link: "/notes/spanish-101"
    }
  ]
};

// --- 组件部分 (COMPONENTS) ---

const Icon = ({ name, className }) => {
  const icons = {
    Book, Code, Globe, Mail, Github, FileText, ChevronRight, Moon, Sun, Download, Linkedin, GraduationCap, Award, Cpu
  };
  const LucideIcon = icons[name] || Code;
  return <LucideIcon className={className} />;
};

export default function Portfolio() {
  const [lang, setLang] = useState('zh'); // 'zh' or 'en'
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'notes'

  // 简单的翻译辅助函数
  const t = (obj) => {
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'];
  };

  const toggleLang = () => setLang(l => l === 'zh' ? 'en' : 'zh');
  const toggleTheme = () => setDarkMode(!darkMode);

  // 根据配置获取背景Class
  const getBgClass = () => {
    if (CONFIG.background.type === 'gradient') return CONFIG.background.gradientClass;
    return 'bg-slate-50 dark:bg-slate-900';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''} ${getBgClass()} font-sans text-slate-800 dark:text-slate-100`}>
      {/* 如果是图片背景 */}
      {CONFIG.background.type === 'image' && (
        <div 
          className="fixed inset-0 z-0 opacity-10 bg-cover bg-center" 
          style={{ backgroundImage: `url(${CONFIG.background.url})` }} 
        />
      )}

      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
            {t(DATA.profile.name)}
          </div>
          <div className="flex gap-4 items-center">
            {/* 导航 Tab (Desktop) */}
            <div className="hidden sm:flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'notes' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                Notes
              </button>
            </div>

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

            <button onClick={toggleLang} className="text-sm font-semibold hover:text-indigo-500 w-8">
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button onClick={toggleTheme} className="hover:text-indigo-500">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 移动端 Tab 栏 (仅在小屏显示) */}
      <div className="sm:hidden px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="flex gap-2">
             <button 
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-2 text-center rounded-lg text-sm font-medium border ${activeTab === 'profile' ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300' : 'border-transparent text-slate-500'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 text-center rounded-lg text-sm font-medium border ${activeTab === 'notes' ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300' : 'border-transparent text-slate-500'}`}
              >
                Learning Notes
              </button>
          </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        
        {/* 内容区域切换 */}
        {activeTab === 'profile' ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* HERO SECTION */}
            <section className="flex flex-col-reverse sm:flex-row items-center gap-8 sm:gap-12">
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                  {lang === 'zh' ? '你好，我是' : 'Hi, I am'} <span className="text-indigo-600 dark:text-indigo-400">{t(DATA.profile.name)}</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium mb-6">
                  {t(DATA.profile.title)}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto sm:mx-0">
                  {t(DATA.profile.bio)}
                </p>
                
                <div className="flex justify-center sm:justify-start gap-4">
                  <a href={CONFIG.social.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    <Github size={22} />
                  </a>
                  <a href={CONFIG.social.email} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    <Mail size={22} />
                  </a>
                  <a href={CONFIG.social.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    <Linkedin size={22} />
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/30">
                    <Download size={16} />
                    {lang === 'zh' ? '下载简历' : 'Resume'}
                  </a>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img 
                  src={DATA.profile.avatar} 
                  alt="Profile" 
                  className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                />
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="text-indigo-500" />
                {lang === 'zh' ? '教育经历' : 'Education'}
              </h2>
              <div className="grid gap-4">
                {DATA.education.map((edu, idx) => (
                  <div key={idx} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t(edu.school)}</h3>
                      <span className="text-sm font-mono text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{edu.time}</span>
                    </div>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{t(edu.degree)}</p>
                    {edu.gpa && <p className="text-sm text-slate-500 mt-2">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* PUBLICATIONS */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="text-indigo-500" />
                {lang === 'zh' ? '发表论文' : 'Publications'}
              </h2>
              <div className="space-y-4">
                {DATA.publications.map((pub, idx) => (
                  <div key={idx} className="group relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors">
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <a href={pub.link} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {pub.title}
                      </a>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{pub.authors}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">{pub.venue}</span>
                      <span className="text-slate-400">{pub.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERESTS */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="text-indigo-500" />
                {lang === 'zh' ? '个人兴趣' : 'Interests'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DATA.interests.map((item, idx) => (
                  <div key={idx} className="bg-white/60 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 text-center hover:-translate-y-1 transition-transform duration-300">
                    <div className="mx-auto w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                      <Icon name={item.icon} size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t(item.name)}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        ) : (
          /* LEARNING NOTES TAB */
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">{lang === 'zh' ? '学习笔记' : 'Learning Notes'}</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                {lang === 'zh' 
                  ? '记录我在计算机科学、数学和语言学习过程中的思考与总结。' 
                  : 'A collection of my thoughts and summaries on CS, Math, and Languages.'}
              </p>
            </div>

            <div className="grid gap-6">
              {DATA.notes.map((note, idx) => (
                <a 
                  key={idx} 
                  href={note.link}
                  className="block group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-lg ring-1 ring-slate-900/5 dark:ring-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                      <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {note.category}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                         • {note.date}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                    {t(note.title)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                    {t(note.summary)}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                    {lang === 'zh' ? '阅读全文' : 'Read Note'} <ChevronRight size={16} className="ml-1" />
                  </div>
                </a>
              ))}
            </div>

            {/* 如果没有更多笔记 */}
            <div className="text-center py-10">
              <div className="inline-block p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-2">
                <Cpu size={24} />
              </div>
              <p className="text-slate-500 text-sm">More notes incoming...</p>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} {t(DATA.profile.name)}. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}