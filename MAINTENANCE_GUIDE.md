# 网站维护指南

这份文档用于日常维护个人主页。你可以直接复制到 Notion，也可以把它保存在仓库根目录随时查阅。

## 1. 当前仓库信息

- 仓库位置：`d:\MyResearchSpace\PersonalPage\my-portfolio`
- 本地开发命令：`npm run dev`
- 构建命令：`npm run build`
- 部署命令：`npm run deploy`
- 主页仓库名：`my-portfolio`
- GitHub Pages 地址通常是：`https://ffffurina.github.io/my-portfolio/`
- 博客地址：`https://ffffurina.github.io/academic-blog/`

## 2. 常用文件位置

- 主页面内容：`src/App.jsx`
- 全局样式和字体：`src/index.css`
- Vite 配置：`vite.config.js`
- 依赖和部署脚本：`package.json`
- 头像等静态资源：`public/avatar.jpg`

## 3. 最常修改的内容

### 3.1 修改个人简介、学校、标签、论文、兴趣

都在 `src/App.jsx` 顶部的 `CONFIG` 和 `DATA` 里。

- `CONFIG.social.github`：GitHub 链接
- `CONFIG.social.email`：邮箱链接
- `CONFIG.blogUrl`：顶端的 Blog 按钮跳转地址
- `DATA.profile`：姓名、简介、地点、头像、标签
- `DATA.education`：教育经历
- `DATA.publications`：论文或项目
- `DATA.interests`：兴趣爱好

### 3.2 修改头像

头像文件放在 `public/avatar.jpg`。

- 替换图片时，直接用同名文件覆盖 `public/avatar.jpg`
- 代码里使用的是 `import.meta.env.BASE_URL + 'avatar.jpg'`，这样本地和 GitHub Pages 都能正常加载

### 3.3 修改字体和字号

- 全站字体：`src/index.css` 里的 `font-family`
- 某一段文字的字号：`src/App.jsx` 里的 Tailwind 类名，例如 `text-xs`、`text-sm`、`text-base`、`text-xl`、`text-2xl`

常用字号对照：

- `text-xs`：很小，适合标签、时间
- `text-sm`：小号正文
- `text-base`：标准正文
- `text-lg`：稍大正文
- `text-xl`：标题
- `text-2xl`：大标题

### 3.4 修改背景和配色

在 `src/App.jsx` 顶部的 `CONFIG` 里修改。

- 背景图：把 `CONFIG.background.type` 改成 `image`
- 背景色：调整 `gradientClass`
- 主题色：调整 `themeColor` 或直接改 Tailwind 类名

### 3.5 修改博客入口

如果你想改顶端 Blog 跳转地址，只改这一项：

```jsx
CONFIG.blogUrl = "https://ffffurina.github.io/academic-blog/"
```

如果以后博客地址换了，只要改这里，不需要改页面其他地方。

## 4. 日常修改流程

### 场景 A：改一段文字

1. 打开 `src/App.jsx`
2. 找到 `DATA.profile` 或对应数组
3. 改文字
4. 保存文件
5. 运行本地预览检查效果：

```powershell
cd d:\MyResearchSpace\PersonalPage\my-portfolio
npm run dev
```

6. 确认没问题后部署：

```powershell
npm run deploy
```

### 场景 B：新增一条论文

1. 打开 `src/App.jsx`
2. 找到 `DATA.publications`
3. 复制一个现有对象，改成新论文内容
4. 保存
5. 运行 `npm run dev` 检查样式
6. 运行 `npm run deploy` 发布

示例结构：

```jsx
{
  title: "你的论文标题",
  authors: "你的名字, 合作者",
  venue: "会议或期刊名称",
  link: "https://...",
  tag: "NLP"
}
```

### 场景 C：新增一条笔记

1. 打开 `src/App.jsx`
2. 找到 `DATA.notes`
3. 复制一条笔记对象
4. 修改 `title`、`date`、`category`、`summary`、`link`
5. 保存并预览

示例结构：

```jsx
{
  title: { zh: "中文标题", en: "English Title" },
  date: "2026-06-22",
  category: "Computer Vision",
  summary: { zh: "中文摘要", en: "English summary" },
  link: "/notes/new-note"
}
```

### 场景 D：修改 Blog 按钮跳转地址

1. 打开 `src/App.jsx`
2. 找到 `CONFIG.blogUrl`
3. 改成新的博客链接
4. 保存并部署

## 5. 本地开发与上线命令

### 本地预览

```powershell
cd d:\MyResearchSpace\PersonalPage\my-portfolio
npm run dev
```

### 打包检查

```powershell
cd d:\MyResearchSpace\PersonalPage\my-portfolio
npm run build
```

### 部署到 GitHub Pages

```powershell
cd d:\MyResearchSpace\PersonalPage\my-portfolio
npm run deploy
```

## 6. Git 提交流程

如果你希望保留源码历史，建议每次改完后都提交一次。

```powershell
cd d:\MyResearchSpace\PersonalPage\my-portfolio
git add .
git commit -m "更新主页内容"
git push
```

## 7. 什么时候需要部署

需要部署的情况：

- 改了 `src/App.jsx`
- 改了 `src/index.css`
- 换了头像或其他静态资源
- 改了 `vite.config.js`
- 改了 `package.json`

不需要部署的情况：

- 只是在本地预览，没有正式发布

## 8. 常见问题

### 8.1 图片不显示

- 确认图片放在 `public/avatar.jpg`
- 确认文件名大小写完全一致
- 确认代码里用的是 `import.meta.env.BASE_URL + 'avatar.jpg'`

### 8.2 线上页面没更新

- 确认已经运行 `npm run deploy`
- 等待几分钟再刷新
- 检查 GitHub Pages 设置是否仍指向正确分支

### 8.3 本地命令报错

- 先确认当前目录是 `d:\MyResearchSpace\PersonalPage\my-portfolio`
- 再执行 `npm run dev` / `npm run build` / `npm run deploy`

### 8.4 想改字体但不知道在哪

- 改全站字体：`src/index.css`
- 改局部字号：`src/App.jsx` 中的 `text-*` 类名

## 9. 推荐维护习惯

- 每次改完先本地预览
- 确认没有问题后再部署
- 重要修改后顺手 `git commit`
- 头像、图片、笔记链接统一放在 `public` 或 `DATA` 里，避免散落到多个地方

## 10. 简化版操作口诀

```text
改内容 -> npm run dev 预览 -> npm run build 检查 -> npm run deploy 上线 -> git push 备份
```
