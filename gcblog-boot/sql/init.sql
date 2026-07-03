-- ============================================================
-- GCBlog 数据库初始化脚本（建库建表）
-- 项目：GCBlog Spring Cloud 微服务
-- 说明：创建 4 个服务数据库及全部表结构
-- 字符集：utf8mb4，排序规则：utf8mb4_0900_ai_ci
-- ============================================================

-- ************************************************************
-- 1. 认证服务数据库：gcblog_auth
-- ************************************************************
DROP DATABASE IF EXISTS gcblog_auth;
CREATE DATABASE gcblog_auth
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE gcblog_auth;

-- ----------------------------
-- Token 记录表
-- ----------------------------
DROP TABLE IF EXISTS tb_token;
CREATE TABLE tb_token (
    id                  BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    user_id             BIGINT          NOT NULL        COMMENT '用户ID',
    access_token        VARCHAR(512)    NOT NULL        COMMENT '访问令牌',
    refresh_token       VARCHAR(512)    NOT NULL        COMMENT '刷新令牌',
    access_expire_time  DATETIME        NOT NULL        COMMENT 'accessToken 过期时间',
    refresh_expire_time DATETIME        NOT NULL        COMMENT 'refreshToken 过期时间',
    is_revoked          TINYINT(1)      DEFAULT 0       COMMENT '是否已吊销（0正常，1已吊销）',
    create_time         DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time         DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_access_token (access_token),
    UNIQUE KEY uk_refresh_token (refresh_token),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Token 记录表';

-- ----------------------------
-- 登录记录表
-- ----------------------------
DROP TABLE IF EXISTS tb_login_record;
CREATE TABLE tb_login_record (
    id              BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    user_id         BIGINT          NOT NULL        COMMENT '用户ID',
    login_ip        VARCHAR(64)                     COMMENT '登录IP',
    login_location  VARCHAR(256)                    COMMENT '登录地点',
    browser         VARCHAR(128)                    COMMENT '浏览器',
    os              VARCHAR(128)                    COMMENT '操作系统',
    status          TINYINT         DEFAULT 1       COMMENT '登录状态（1成功，0失败）',
    message         VARCHAR(512)                    COMMENT '提示消息',
    login_time      DATETIME        DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
    PRIMARY KEY (id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='登录记录表';


-- ************************************************************
-- 2. 用户服务数据库：gcblog_user
-- ************************************************************
DROP DATABASE IF EXISTS gcblog_user;
CREATE DATABASE gcblog_user
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE gcblog_user;

-- ----------------------------
-- 用户表
-- ----------------------------
DROP TABLE IF EXISTS tb_user;
CREATE TABLE tb_user (
    id              BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    username        VARCHAR(64)     NOT NULL        COMMENT '用户名',
    password        VARCHAR(256)    NOT NULL        COMMENT '密码（BCrypt 加密）',
    nickname        VARCHAR(64)                     COMMENT '昵称',
    email           VARCHAR(128)                    COMMENT '邮箱',
    avatar          VARCHAR(512)                    COMMENT '头像URL',
    status          TINYINT         DEFAULT 1       COMMENT '状态（1正常，0禁用）',
    last_login_time DATETIME                        COMMENT '最后登录时间',
    create_time     DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time     DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted         TINYINT(1)      DEFAULT 0       COMMENT '逻辑删除标记（0正常，1已删除）',
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';

-- ----------------------------
-- 角色表
-- ----------------------------
DROP TABLE IF EXISTS tb_role;
CREATE TABLE tb_role (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    role_name   VARCHAR(64)     NOT NULL        COMMENT '角色名称',
    role_key    VARCHAR(64)     NOT NULL        COMMENT '角色标识（如 ROLE_ADMIN）',
    description VARCHAR(256)                    COMMENT '描述',
    status      TINYINT         DEFAULT 1       COMMENT '状态（1正常，0禁用）',
    create_time DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_role_key (role_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='角色表';

-- ----------------------------
-- 权限表
-- ----------------------------
DROP TABLE IF EXISTS tb_permission;
CREATE TABLE tb_permission (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    perm_name   VARCHAR(128)    NOT NULL        COMMENT '权限名称',
    perm_key    VARCHAR(128)    NOT NULL        COMMENT '权限标识（如 blog:article:publish）',
    description VARCHAR(256)                    COMMENT '描述',
    status      TINYINT         DEFAULT 1       COMMENT '状态（1正常，0禁用）',
    create_time DATETIME        DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_perm_key (perm_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='权限表';

-- ----------------------------
-- 用户-角色关联表
-- ----------------------------
DROP TABLE IF EXISTS tb_user_role;
CREATE TABLE tb_user_role (
    id          BIGINT      AUTO_INCREMENT  COMMENT '主键ID',
    user_id     BIGINT      NOT NULL        COMMENT '用户ID',
    role_id     BIGINT      NOT NULL        COMMENT '角色ID',
    create_time DATETIME    DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_role (user_id, role_id),
    INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户-角色关联表';

-- ----------------------------
-- 角色-权限关联表
-- ----------------------------
DROP TABLE IF EXISTS tb_role_permission;
CREATE TABLE tb_role_permission (
    id              BIGINT      AUTO_INCREMENT  COMMENT '主键ID',
    role_id         BIGINT      NOT NULL        COMMENT '角色ID',
    permission_id   BIGINT      NOT NULL        COMMENT '权限ID',
    create_time     DATETIME    DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_role_permission (role_id, permission_id),
    INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='角色-权限关联表';


-- ************************************************************
-- 3. 博客服务数据库：gcblog_blog
-- ************************************************************
DROP DATABASE IF EXISTS gcblog_blog;
CREATE DATABASE gcblog_blog
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE gcblog_blog;

-- ----------------------------
-- 文章分类表
-- ----------------------------
DROP TABLE IF EXISTS tb_category;
CREATE TABLE tb_category (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    name        VARCHAR(64)     NOT NULL        COMMENT '分类名',
    slug        VARCHAR(128)    NOT NULL        COMMENT 'URL 友好标识',
    description VARCHAR(512)                    COMMENT '描述',
    sort_order  INT             DEFAULT 0       COMMENT '排序权重',
    status      TINYINT         DEFAULT 1       COMMENT '状态（1正常，0禁用）',
    create_time DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章分类表';

-- ----------------------------
-- 标签表
-- ----------------------------
DROP TABLE IF EXISTS tb_tag;
CREATE TABLE tb_tag (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    name        VARCHAR(64)     NOT NULL        COMMENT '标签名',
    slug        VARCHAR(128)    NOT NULL        COMMENT 'URL 友好标识',
    color       VARCHAR(32)                     COMMENT '标签颜色HEX值',
    create_time DATETIME        DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_name (name),
    UNIQUE KEY uk_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='标签表';

-- ----------------------------
-- 文章表
-- ----------------------------
DROP TABLE IF EXISTS tb_article;
CREATE TABLE tb_article (
    id              BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    title           VARCHAR(256)    NOT NULL        COMMENT '标题',
    content         TEXT            NOT NULL        COMMENT '内容（Markdown 格式）',
    summary         VARCHAR(512)                    COMMENT '摘要',
    cover_image     VARCHAR(512)                    COMMENT '封面图URL',
    category_id     BIGINT                          COMMENT '分类ID',
    author_id       BIGINT          NOT NULL        COMMENT '作者ID',
    status          TINYINT         DEFAULT 0       COMMENT '状态（0草稿，1已发布，2置顶）',
    is_original     TINYINT(1)      DEFAULT 1       COMMENT '是否原创（1原创，0转载）',
    source_url      VARCHAR(512)                    COMMENT '转载来源URL',
    view_count      INT             DEFAULT 0       COMMENT '浏览量',
    like_count      INT             DEFAULT 0       COMMENT '点赞量',
    comment_count   INT             DEFAULT 0       COMMENT '评论量',
    is_top          TINYINT(1)      DEFAULT 0       COMMENT '是否置顶',
    publish_time    DATETIME                        COMMENT '发布时间',
    create_time     DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time     DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted         TINYINT(1)      DEFAULT 0       COMMENT '逻辑删除标记（0正常，1已删除）',
    PRIMARY KEY (id),
    INDEX idx_category_id (category_id),
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    INDEX idx_publish_time (publish_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章表';

-- ----------------------------
-- 文章-标签关联表
-- ----------------------------
DROP TABLE IF EXISTS tb_article_tag;
CREATE TABLE tb_article_tag (
    id          BIGINT      AUTO_INCREMENT  COMMENT '主键ID',
    article_id  BIGINT      NOT NULL        COMMENT '文章ID',
    tag_id      BIGINT      NOT NULL        COMMENT '标签ID',
    PRIMARY KEY (id),
    UNIQUE KEY uk_article_tag (article_id, tag_id),
    INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章-标签关联表';

-- ----------------------------
-- 评论表
-- ----------------------------
DROP TABLE IF EXISTS tb_comment;
CREATE TABLE tb_comment (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    article_id  BIGINT          NOT NULL        COMMENT '文章ID',
    user_id     BIGINT          NOT NULL        COMMENT '评论用户ID',
    parent_id   BIGINT          DEFAULT 0       COMMENT '父评论ID（0为顶层评论）',
    content     VARCHAR(1024)   NOT NULL        COMMENT '评论内容',
    status      TINYINT         DEFAULT 1       COMMENT '状态（1正常，0隐藏）',
    create_time DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted     TINYINT(1)      DEFAULT 0       COMMENT '逻辑删除标记（0正常，1已删除）',
    PRIMARY KEY (id),
    INDEX idx_article_id (article_id),
    INDEX idx_user_id (user_id),
    INDEX idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='评论表';


-- ************************************************************
-- 4. 导航服务数据库：gcblog_navigation
-- ************************************************************
DROP DATABASE IF EXISTS gcblog_navigation;
CREATE DATABASE gcblog_navigation
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE gcblog_navigation;

-- ----------------------------
-- 导航分类表
-- ----------------------------
DROP TABLE IF EXISTS tb_nav_category;
CREATE TABLE tb_nav_category (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    name        VARCHAR(64)     NOT NULL        COMMENT '分类名',
    icon        VARCHAR(128)                    COMMENT '分类图标',
    description VARCHAR(512)                    COMMENT '描述',
    sort_order  INT             DEFAULT 0       COMMENT '排序权重',
    status      TINYINT         DEFAULT 1       COMMENT '状态（1正常，0禁用）',
    create_time DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='导航分类表';

-- ----------------------------
-- 导航链接表
-- ----------------------------
DROP TABLE IF EXISTS tb_nav_link;
CREATE TABLE tb_nav_link (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    category_id BIGINT          NOT NULL        COMMENT '分类ID',
    name        VARCHAR(128)    NOT NULL        COMMENT '链接名称',
    url         VARCHAR(1024)   NOT NULL        COMMENT '链接地址',
    icon        VARCHAR(512)                    COMMENT '链接图标URL',
    description VARCHAR(512)                    COMMENT '描述',
    sort_order  INT             DEFAULT 0       COMMENT '排序权重',
    status      TINYINT         DEFAULT 1       COMMENT '状态（1正常，0禁用）',
    click_count INT             DEFAULT 0       COMMENT '点击次数',
    create_time DATETIME        DEFAULT CURRENT_TIMESTAMP                       COMMENT '创建时间',
    update_time DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    INDEX idx_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='导航链接表';

-- ----------------------------
-- 访问记录表
-- ----------------------------
DROP TABLE IF EXISTS tb_visit_record;
CREATE TABLE tb_visit_record (
    id          BIGINT          AUTO_INCREMENT  COMMENT '主键ID',
    link_id     BIGINT          NOT NULL        COMMENT '链接ID',
    visitor_ip  VARCHAR(64)                     COMMENT '访问者IP',
    user_agent  VARCHAR(512)                    COMMENT 'User-Agent',
    visit_time  DATETIME        DEFAULT CURRENT_TIMESTAMP COMMENT '访问时间',
    PRIMARY KEY (id),
    INDEX idx_link_id (link_id),
    INDEX idx_visit_time (visit_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='访问记录表';
