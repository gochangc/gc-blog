# GCBlog Frontend

基于 Next.js 16 + Magic UI + GSAP 构建的现代化博客前端，深色主题设计。

## 技术栈

| 分类 | 选型 |
|------|------|
| 框架 | Next.js 16 (App Router) + React 19 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS v4 + 深色主题 |
| UI 组件 | shadcn/ui + Magic UI |
| 动画 | GSAP 3.15 + motion/react |
| 状态管理 | Zustand |
| Markdown | @uiw/react-md-editor + react-markdown |
| 包管理 | pnpm |

## Magic UI 组件

项目集成了 15+ Magic UI 动画组件：

| 组件 | 用途 |
|------|------|
| BlurFade | 渐显入场动画 |
| ShimmerButton | 闪光 CTA 按钮 |
| AuroraText | 极光渐变文字 |
| MagicCard | 鼠标跟随渐变卡片 |
| BorderBeam | 光边框扫描动画 |
| Particles | 背景粒子效果 |
| FlickeringGrid | 闪烁网格背景 |
| NumberTicker | 数字滚动动画 |
| Marquee | 无限滚动列表 |
| AnimatedGradientText | 渐变动画文字 |
| AnimatedShinyText | 闪光文字 |
| ScrollProgress | 滚动进度条 |
| AnimatedList | 列表交错动画 |
| BentoGrid | 网格布局 |
| TextReveal | 文字逐行揭示 |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

访问 http://localhost:3000

## 环境变量

创建 `.env.local`：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

## 页面结构

```
/                        # 首页（Hero + 统计 + 最新文章 + 技术栈）
/blog                    # 博客列表
/blog/[id]               # 文章详情 + 评论
/navigation              # 导航页
/login                   # 登录页
/admin/articles          # 文章管理
/admin/categories        # 分类管理
/admin/tags              # 标签管理
/admin/nav-links         # 导航链接管理
/admin/nav-categories    # 导航分类管理
/admin/users             # 用户管理
```

## 设计系统

- **主色**: `#3b82f6`（蓝色）
- **背景**: `#0f172a`（深蓝黑）
- **前景**: `#f8fafc`（近白）
- **效果**: Glass 毛玻璃、Gradient 渐变、Glow 辉光
- **动画**: 交错入场、滚动驱动、鼠标跟随、粒子背景
