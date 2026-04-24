# GCBlog - 个人博客与导航网站

## 项目简介

基于微服务架构的个人博客与导航网站系统，采用六边形架构设计，实现高内聚、低耦合。

## 技术栈

### 后端
- **框架**: Spring Boot 3.2.0 + Spring Cloud 2023.0.0
- **服务注册与发现**: Nacos
- **API网关**: Spring Cloud Gateway
- **持久层**: MyBatis-Flex
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **认证**: JWT

### 前端
- **框架**: Vue 3 + Vite
- **UI组件**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **HTTP客户端**: Axios

## 项目结构

```
gc-project/
├── gcblog-boot/              # 后端项目
│   ├── framework/            # 框架核心模块
│   ├── gateway-service/      # API网关
│   ├── auth-service/         # 认证授权服务
│   ├── user-service/         # 用户服务
│   ├── gcblog-blog/          # 博客服务
│   └── gcblog-navigation/    # 导航服务
│
└── gcblog-vue/               # 前端项目
    ├── src/
    │   ├── api/              # API接口
    │   ├── views/            # 页面组件
    │   ├── components/       # 公共组件
    │   ├── layouts/          # 布局组件
    │   ├── router/           # 路由配置
    │   ├── store/            # 状态管理
    │   └── utils/            # 工具函数
    └── public/               # 静态资源
```

## 架构设计

### 六边形架构分层

每个微服务采用六边形架构（端口适配器架构）：

- **adapter**: 适配器层
  - **in**: 入站适配器（Controller）
  - **out**: 出站适配器（Repository实现、Mapper、Cache）
- **application**: 应用层（DTO、VO、应用服务）
- **domain**: 领域层（Model、Repository接口、领域服务）
- **infrastructure**: 基础设施层（配置）

### 微服务划分

- **gateway-service**: API网关，统一入口，路由转发
- **auth-service**: 认证授权，JWT生成与验证
- **user-service**: 用户管理，角色权限
- **gcblog-blog**: 博客服务，文章、分类、标签、评论
- **gcblog-navigation**: 导航服务，导航链接、分类

## 快速开始

### 环境要求

- JDK 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8.0+
- Redis 6.0+
- Nacos 2.2+

### 后端启动

1. 启动Nacos服务器
2. 启动MySQL和Redis
3. 创建数据库
4. 启动各微服务

```bash
cd gcblog-boot
mvn clean install
# 启动网关
cd gateway-service
mvn spring-boot:run
```

### 前端启动

```bash
cd gcblog-vue
npm install
npm run dev
```

访问 http://localhost:3000

## 开发规范

### 代码规范
- 遵循阿里巴巴Java开发手册
- 使用Lombok简化代码
- 统一异常处理
- 统一响应格式

### 提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具链相关

## License

MIT License
