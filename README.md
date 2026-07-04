# GCBlog - 个人博客与导航网站

## 项目简介

基于微服务架构的个人博客与导航网站系统，后端采用六边形架构设计，前端使用 Next.js + Tailwind CSS 打造清新浅色风格的经典博客界面。

## 技术栈

### 后端
- **框架**: Spring Boot 3.2.0 + Spring Cloud 2023.0.0
- **服务注册与发现**: Nacos
- **API 网关**: Spring Cloud Gateway
- **持久层**: MyBatis-Flex
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **认证**: JWT（Access Token + Refresh Token）
- **架构**: 六边形架构（端口适配器模式）

### 前端
- **框架**: Next.js 16 (App Router) + React 19 + TypeScript 5
- **样式**: Tailwind CSS v4 + 浅色主题
- **UI 组件**: shadcn/ui
- **动画**: GSAP 3.15 + ScrollTrigger
- **状态管理**: Zustand
- **Markdown**: @uiw/react-md-editor + react-markdown + rehype-highlight
- **包管理**: pnpm

### 基础设施
- **容器化**: Docker + Docker Compose
- **服务**: MySQL 8.4 + Redis 8.8 + Nacos v3.2

## 项目结构

```
gc-project/
├── gcblog-boot/              # 后端微服务
│   ├── framework/            # 框架核心模块（通用工具、异常处理、Redis、JWT）
│   ├── gateway-service/      # API 网关（路由转发、鉴权过滤、限流）
│   ├── auth-service/         # 认证授权服务（登录、Token 管理）
│   ├── user-service/         # 用户服务（用户、角色、权限 CRUD）
│   ├── gcblog-blog/          # 博客服务（文章、分类、标签、评论）
│   └── gcblog-navigation/    # 导航服务（导航链接、分类）
│
├── gcblog-next/              # 前端项目（Next.js）
│   ├── src/
│   │   ├── app/              # Next.js App Router 路由
│   │   │   ├── (public)/     # 前台页面（博客、导航、登录）
│   │   │   └── admin/        # 后台管理（文章、分类、标签、导航、用户）
│   │   ├── components/       # 可复用组件
│   │   │   ├── ui/           # shadcn/ui 组件
│   │   │   ├── layout/       # 布局组件（Header/Footer/Sidebar）
│   │   │   ├── blog/         # 博客业务组件
│   │   │   ├── home/         # 首页组件
│   │   │   └── navigation/   # 导航组件
│   │   ├── lib/              # 公共工具库（API 封装、类型定义、工具函数）
│   │   ├── stores/           # Zustand 状态管理
│   │   ├── hooks/            # 自定义 Hooks
│   │   └── middleware.ts     # 路由中间件（鉴权守卫）
│   └── public/               # 静态资源
│
└── docker/                   # Docker 配置
```

## 架构设计

### 后端六边形架构

每个微服务遵循六边形架构分层：

- **adapter/in**: 入站适配器（Controller）— 接收外部请求
- **adapter/out**: 出站适配器（Repository 实现、Mapper、Cache）— 对接外部系统
- **application**: 应用层（DTO、VO、应用服务）— 用例编排
- **domain**: 领域层（Model、Repository 接口、领域服务）— 纯业务逻辑
- **infrastructure**: 基础设施层（配置类）

### 前端页面架构

| 页面 | 路由 | 特性 |
|------|------|------|
| 首页 | `/` | 打字机 Hero + 三栏布局（个人信息 / 文章列表 / 热度排行），滚动入场动画 |
| 文章详情 | `/blog/[id]` | Markdown 渲染 + 评论区（登录后可评论） |
| 导航页 | `/navigation` | 分类分组 + NavCard 链接卡片，交错入场动画 |
| 登录 | `/login` | 简洁登录表单（仅评论时需要） |
| 后台管理 | `/admin/*` | 文章、分类、标签、导航、用户 CRUD |

### UI 设计系统

- **色彩**: 主色 `#3b82f6`，背景 `#f8fafc`，前景 `#1e293b`
- **效果**: 毛玻璃导航、柔和阴影、清爽卡片
- **风格**: 经典博客布局，打字机效果 Hero，三栏文章列表
- **主题**: 浅色优先

## 快速开始

### 环境要求

- JDK 17+
- Maven 3.8+
- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

### 后端启动

```bash
# 启动基础设施（MySQL + Redis + Nacos）
cd docker && docker-compose up -d

# 构建并启动微服务
cd gcblog-boot
mvn clean install
cd gateway-service && mvn spring-boot:run
```

### 前端启动

```bash
cd gcblog-next
pnpm install
NEXT_TELEMETRY_DISABLED=1 pnpm dev
```

访问 http://localhost:3000

## 开发规范

### 代码规范
- 遵循阿里巴巴 Java 开发手册
- 使用 Lombok 简化代码
- 统一异常处理 + 统一响应格式
- 所有代码注释使用中文
- 高内聚、低耦合设计原则

### 提交规范
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链相关

## License

MIT License
