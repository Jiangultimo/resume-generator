export type Language = 'en' | 'zh';

export interface Translations {
  // Navigation and UI
  title: string;
  skills: string;
  evaluation: string;
  experience: string;
  
  // Skills section
  skillsTitle: string;
  frontend: string;
  backend: string;
  engineering: string;
  infrastructure: string;
  
  // Evaluation section
  evaluationTitle: string;
  
  // Experience section
  experienceTitle: string;
  position: string;
  company: string;
  duration: string;
  
  // Mobile Menu
  menu: string;
  personalInfo: string;
  workExperience: string;
  skillsEvaluation: string;
  
  // Export PDF
  printResume: string;
  exporting: string;
  exportSuccess: string;
  exportFailed: string;
  
  // Common
  loading: string;
  error: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation and UI
    title: "What I've Done in the Past Years",
    skills: "Skills",
    evaluation: "Self-Evaluation",
    experience: "Work Experience",
    
    // Skills section
    skillsTitle: "Technical Skills",
    frontend: "Frontend: Proficient in HTML/CSS/JavaScript/TypeScript, familiar with React ecosystem (including but not limited to Next.js/Hooks/shadcn/ui) and Vue (Vue3/Nuxt) ecosystem",
    backend: "Backend: Skilled in Node.js (Express/Koa) and Python (Flask/FastAPI) development, familiar with Golang and Rust",
    engineering: "Engineering: Familiar with Linux/Shell scripting, experienced in DevOps practices, capable of independently setting up CI/CD pipelines",
    infrastructure: "Infrastructure: Experienced with Azure, Tencent Cloud and other cloud services, familiar with containerized deployment",
    
    // Evaluation section
    evaluationTitle: "Self-Evaluation",
    
    // Experience section
    experienceTitle: "Work Experience",
    position: "Position",
    company: "Company",
    duration: "Duration",
    
    // Mobile Menu
    menu: "Menu",
    personalInfo: "Personal Info",
    workExperience: "Work Experience",
    skillsEvaluation: "Skills & Evaluation",
    
    // Export PDF
    printResume: "Print Resume",
    exporting: "Exporting...",
    exportSuccess: "Export Success",
    exportFailed: "Export Failed",
    
    // Common
    loading: "Loading...",
    error: "Error occurred"
  },
  zh: {
    // Navigation and UI
    title: "过去几年我都干了什么",
    skills: "技能",
    evaluation: "自我评价",
    experience: "工作经历",
    
    // Skills section
    skillsTitle: "掌握技能",
    frontend: "前端: 熟悉HTML/CSS/JavaScript/TypeScript，熟悉React生态(包括但不限于Next.js/Hooks/shadcn/ui)与Vue(Vue3/Nuxt)生态",
    backend: "后端: 熟练使用Node.js(Express/Koa)与Python(Flask/FastAPI)进行开发，了解Golang与Rust",
    engineering: "工程化: 熟悉Linux/Shell脚本，具备DevOps实践经验，能独立搭建CI/CD流程",
    infrastructure: "基础设施: 有Azure、腾讯云等云服务使用经验，熟悉容器化部署",
    
    // Evaluation section
    evaluationTitle: "自我评价",
    
    // Experience section
    experienceTitle: "工作经历",
    position: "职位",
    company: "公司",
    duration: "时间",
    
    // Mobile Menu
    menu: "菜单",
    personalInfo: "个人信息",
    workExperience: "工作经验",
    skillsEvaluation: "技能评价",
    
    // Export PDF
    printResume: "打印简历",
    exporting: "导出中...",
    exportSuccess: "导出成功",
    exportFailed: "导出失败",
    
    // Common
    loading: "加载中...",
    error: "发生错误"
  }
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};