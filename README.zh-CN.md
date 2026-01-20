# 简历生成器

[English](./README.md)

一个基于 Next.js 的数据驱动在线简历生成器。通过简单的 TOML 配置文件，创建精美、响应式的个人简历。

[![在线演示](https://img.shields.io/badge/preview-online-brightgreen)](https://hi.sparkify.me)

## 特性

- **数据驱动**: 所有简历内容通过 TOML 文件配置，无需修改代码
- **双语支持**: 内置中英文切换，支持独立的配置文件
- **项目预览**: 集成 [Microlink](https://microlink.io/)，悬停链接时展示项目的富文本预览
- **响应式设计**: 在桌面端和移动端都有良好的展示效果
- **流畅动画**: 基于 Framer Motion 实现的细腻交互动画

### 开发环境功能

以下功能仅在本地开发环境中可用：

- **头像上传**: 支持点击上传头像图片
- **PDF 导出**: 一键导出简历为 PDF 文件（基于 Puppeteer）

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
```

### 2. 配置简历

```bash
# 创建中文简历配置
cp config/resume.example.toml config/resume.toml

# 创建英文简历配置（可选）
cp config/resume.example.toml config/en-resume.toml
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 预览你的简历。

## 配置说明

### 简历结构

编辑 `config/` 目录下的 TOML 文件：

- `resume.toml` - 中文版本
- `en-resume.toml` - 英文版本

```toml
[resume]
title = "我的简历"

# 个人信息，支持自定义图标
# 图标参考: https://lucide.dev/icons/
intros = [
    { label = "姓名", value = "你的名字", icon = "User" },
    { label = "邮箱", value = "email@example.com", icon = "Mail", link = "mailto:email@example.com" },
    { label = "GitHub", value = "username", icon = "Github", link = "https://github.com/username" },
]

[resume.skills]
title = "掌握技能"
data = [
    "技能1: 描述",
    "技能2: 描述",
]

[resume.experience]
title = "工作经历"

[[resume.experience.data]]
company = "公司名称"
position = "职位"
time = "2020 - 至今"
labels = ["React", "TypeScript", "Node.js"]
projects = [
    { content = "项目描述 {links.0}", links = [{ name = "演示", url = "https://example.com" }] },
]
```

### 项目链接预览

使用 Microlink 集成为项目链接展示富文本预览：

```toml
projects = [
    { content = "开发了一个 Web 应用 - {links.0}", links = [{ name = "查看项目", url = "https://your-project.com" }] }
]
```

当用户悬停在链接上时，会看到包含页面标题、描述和缩略图的预览卡片。

## PDF 导出

PDF 导出使用 Puppeteer 进行高质量渲染。此功能仅在开发模式下可用。

### 系统要求（Linux）

如果在 Linux 上运行，需要安装以下 Puppeteer 依赖：

```bash
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

更多详情请参考 [Puppeteer issue](https://github.com/puppeteer/puppeteer/issues/3443#issuecomment-433096772)。

## 技术栈

- **框架**: [Next.js](https://nextjs.org/) 16
- **样式**: [Tailwind CSS](https://tailwindcss.com/) 4
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **配置**: [TOML](https://toml.io/) via [@ltd/j-toml](https://github.com/nickyc975/j-toml)
- **链接预览**: [Microlink](https://microlink.io/)
- **PDF 生成**: [Puppeteer](https://pptr.dev/)

## 脚本命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint
```

## 许可证

[MIT](./LICENSE)
