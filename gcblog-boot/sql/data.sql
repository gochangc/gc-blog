-- ============================================================
-- GCBlog 基础数据初始化脚本
-- 项目：GCBlog Spring Cloud 微服务
-- 说明：插入各服务的初始数据，使用 INSERT IGNORE 避免重复执行报错
-- ============================================================

-- ************************************************************
-- 1. 用户服务基础数据：gcblog_user
-- ************************************************************
USE gcblog_user;

-- ----------------------------
-- 管理员用户（密码：admin123，BCrypt 加密）
-- ----------------------------
INSERT IGNORE INTO tb_user (id, username, password, nickname, email, status)
VALUES (1, 'admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', '超级管理员', 'admin@gcblog.com', 1);

-- ----------------------------
-- 测试用户（密码：test123，BCrypt 加密）
-- ----------------------------
INSERT IGNORE INTO tb_user (id, username, password, nickname, email, status)
VALUES (2, 'test', '$2a$10$EKsGPRVQXyMKCVRr7IsQW.FSqM/ySdg3P4yLJi3bH8BGV7Bk/A4YS', '测试用户', 'test@gcblog.com', 1);

-- ----------------------------
-- 角色数据
-- ----------------------------
INSERT IGNORE INTO tb_role (id, role_name, role_key, description, status)
VALUES (1, '超级管理员', 'ROLE_ADMIN', '拥有系统所有权限', 1);

INSERT IGNORE INTO tb_role (id, role_name, role_key, description, status)
VALUES (2, '普通用户', 'ROLE_USER', '普通注册用户，拥有基本操作权限', 1);

-- ----------------------------
-- 权限数据
-- ----------------------------
INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (1, '文章管理', 'blog:article:*', '博客文章的增删改查全部权限', 1);

INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (2, '分类管理', 'blog:category:*', '博客分类的增删改查全部权限', 1);

INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (3, '标签管理', 'blog:tag:*', '博客标签的增删改查全部权限', 1);

INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (4, '评论管理', 'blog:comment:*', '博客评论的增删改查全部权限', 1);

INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (5, '导航分类管理', 'nav:category:*', '导航分类的增删改查全部权限', 1);

INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (6, '导航链接管理', 'nav:link:*', '导航链接的增删改查全部权限', 1);

INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (7, '用户管理', 'system:user:*', '系统用户的增删改查全部权限', 1);

INSERT IGNORE INTO tb_permission (id, perm_name, perm_key, description, status)
VALUES (8, '角色管理', 'system:role:*', '系统角色的增删改查全部权限', 1);

-- ----------------------------
-- 用户-角色关联
-- admin -> ROLE_ADMIN
-- test  -> ROLE_USER
-- ----------------------------
INSERT IGNORE INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT IGNORE INTO tb_user_role (user_id, role_id) VALUES (2, 2);

-- ----------------------------
-- 角色-权限关联
-- ROLE_ADMIN 拥有全部 8 项权限
-- ROLE_USER  拥有 blog:comment:*（评论权限）
-- ----------------------------
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 1);
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 2);
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 3);
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 4);
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 5);
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 6);
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 7);
INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (1, 8);

INSERT IGNORE INTO tb_role_permission (role_id, permission_id) VALUES (2, 4);


-- ************************************************************
-- 2. 博客服务基础数据：gcblog_blog
-- ************************************************************
USE gcblog_blog;

-- ----------------------------
-- 默认文章分类
-- ----------------------------
INSERT IGNORE INTO tb_category (id, name, slug, description, sort_order, status)
VALUES (1, '技术分享', 'tech', '技术相关文章分享', 1, 1);

INSERT IGNORE INTO tb_category (id, name, slug, description, sort_order, status)
VALUES (2, '生活随笔', 'life', '日常生活随笔记录', 2, 1);

INSERT IGNORE INTO tb_category (id, name, slug, description, sort_order, status)
VALUES (3, '项目实战', 'project', '项目开发实战经验', 3, 1);

-- ----------------------------
-- 默认标签
-- ----------------------------
INSERT IGNORE INTO tb_tag (id, name, slug, color)
VALUES (1, 'Java', 'java', '#F89820');

INSERT IGNORE INTO tb_tag (id, name, slug, color)
VALUES (2, 'Spring Boot', 'spring-boot', '#6DB33F');

INSERT IGNORE INTO tb_tag (id, name, slug, color)
VALUES (3, 'MySQL', 'mysql', '#4479A1');

INSERT IGNORE INTO tb_tag (id, name, slug, color)
VALUES (4, 'Vue', 'vue', '#4FC08D');

INSERT IGNORE INTO tb_tag (id, name, slug, color)
VALUES (5, 'Docker', 'docker', '#2496ED');


-- ************************************************************
-- 3. 导航服务基础数据：gcblog_navigation
-- ************************************************************
USE gcblog_navigation;

-- ----------------------------
-- 默认导航分类
-- ----------------------------
INSERT IGNORE INTO tb_nav_category (id, name, icon, description, sort_order, status)
VALUES (1, '开发工具', 'icon-tools', '常用开发工具集合', 1, 1);

INSERT IGNORE INTO tb_nav_category (id, name, icon, description, sort_order, status)
VALUES (2, '在线文档', 'icon-doc', '技术文档与参考手册', 2, 1);

INSERT IGNORE INTO tb_nav_category (id, name, icon, description, sort_order, status)
VALUES (3, '学习资源', 'icon-book', '学习教程与课程资源', 3, 1);
