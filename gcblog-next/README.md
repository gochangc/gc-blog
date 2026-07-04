# GCBlog Frontend

基于 Next.js 16 + Tailwind CSS + shadcn/ui 构建的清新浅色风格博客前端。

## 技术栈

| 分类 | 选型 |
|------|------|
| 框架 | Next.js 16 (App Router) + React 19 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS v4 + 浅色主题 |
| UI 组件 | shadcn/ui |
| 动画 | GSAP 3.15 + ScrollTrigger + motion/react |
| 状态管理 | Zustand |
| Markdown | @uiw/react-md-editor + react-markdown |
| 包管理 | pnpm |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
NEXT_TELEMETRY_DISABLED=1 pnpm dev

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
/                        # 首页（打字机 Hero + 三栏文章列表 + 热度排行 + 滚动动画）
/blog                    # 博客列表
/blog/[id]               # 文章详情 + 评论
/navigation              # 导航页（分类卡片 + 交错入场动画）
/login                   # 登录页（仅评论时需要）
/admin/articles          # 文章管理
/admin/categories        # 分类管理
/admin/tags              # 标签管理
/admin/nav-links         # 导航链接管理
/admin/nav-categories    # 导航分类管理
/admin/users             # 用户管理
```

## 设计系统

- **主色**: `#3b82f6`（蓝色）
- **背景**: `#f8fafc`（浅灰蓝）
- **前景**: `#1e293b`（深 slate）
- **效果**: 毛玻璃导航、柔和阴影、清爽卡片
- **风格**: 经典博客布局，打字机效果 Hero，三栏文章列表
