# 大殷精品企业官网

一个简洁专业的商务风格企业官网，用于展示公司形象和产品。

## 技术栈

- **前端**: Angular 15
- **后端**: Spring Boot 2.7
- **数据库**: MySQL 8.0

## 功能特性

### 前台功能
- 首页展示（轮播图、企业文化、产品推荐、新闻动态）
- 公司介绍（公司简介、企业文化、荣誉资质）
- 产品展示（分类展示、多图滑动轮播、产品详情）
- 应用场景展示
- 新闻动态（列表展示、详情查看）
- 联系我们（在线留言功能）

### 后台管理功能
- 管理员登录
- 控制台数据统计
- 公司介绍管理
- 企业文化管理
- 荣誉资质管理
- 产品分类管理
- 产品管理（支持图片上传、多图管理）
- 应用场景管理
- 新闻动态管理
- 联系方式管理
- 留言管理

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Angular CLI >= 15.0.0
- JDK >= 1.8
- Maven >= 3.6.0
- MySQL >= 8.0

## 安装步骤

### 1. 数据库配置

1. 登录MySQL并创建数据库：
```sql
CREATE DATABASE dayin_es CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 导入数据库脚本：
```bash
mysql -u root -p dayin_es < database/dayin_es.sql
```

3. 修改后端配置文件 `backend/src/main/resources/application.properties`：
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dayin_es?useUnicode=true&characterEncoding=utf8mb4&useSSL=false&serverTimezone=Asia/Shanghai
spring.datasource.username=root
spring.datasource.password=你的数据库密码
```

### 2. 后端启动

1. 进入后端目录：
```bash
cd backend
```

2. 安装Maven依赖：
```bash
mvn clean install
```

3. 启动Spring Boot应用：
```bash
mvn spring-boot:run
```

后端服务将在 `http://localhost:8080` 启动

### 3. 前端启动

1. 进入前端目录：
```bash
cd frontend
```

2. 安装npm依赖：
```bash
npm install
```

3. 安装Angular CLI（如果未安装）：
```bash
npm install -g @angular/cli@15
```

4. 启动开发服务器：
```bash
ng serve --open
```

前端应用将在 `http://localhost:4200` 启动

## 默认账号

- 用户名：`admin`
- 密码：`admin123`

## 验证步骤

### 1. 验证后端API

启动后端后，可以通过以下URL验证API：

- 健康检查：`http://localhost:8080/api/public/company-info`
- 登录接口：`http://localhost:8080/api/auth/login`

### 2. 验证前台页面

启动前端后，访问 `http://localhost:4200` 验证以下页面：

1. **首页** - 检查是否正常显示轮播图、产品推荐、新闻列表
2. **公司介绍** - 检查公司简介、企业文化、荣誉资质
3. **产品展示** - 检查产品列表、分类筛选
4. **产品详情** - 点击产品进入详情页，检查多图滑动轮播功能
5. **新闻动态** - 检查新闻列表和详情页
6. **联系我们** - 测试在线留言功能

### 3. 验证后台管理

1. 访问 `http://localhost:4200/admin/login`
2. 使用默认账号登录
3. 验证以下功能：
   - 控制台统计数据
   - 产品管理（添加、编辑、删除、图片上传）
   - 公司介绍编辑
   - 新闻发布和管理
   - 留言查看和管理

## 项目结构

```
Dayin-ES/
├── backend/                    # 后端项目
│   ├── pom.xml                # Maven配置
│   └── src/
│       └── main/
│           ├── java/com/dayin/
│           │   ├── config/          # 配置类
│           │   ├── controller/      # 控制器
│           │   ├── dto/             # 数据传输对象
│           │   ├── entity/          # 实体类
│           │   ├── repository/      # 数据访问层
│           │   ├── security/        # 安全认证
│           │   └── service/         # 服务层
│           └── resources/
│               └── application.properties  # 应用配置
├── frontend/                   # 前端项目
│   ├── package.json           # npm配置
│   ├── angular.json           # Angular配置
│   └── src/
│       ├── app/
│       │   ├── components/    # 组件
│       │   │   ├── layout/    # 布局组件
│       │   │   ├── pages/     # 前台页面
│       │   │   └── admin/     # 后台管理
│       │   ├── guards/        # 路由守卫
│       │   └── services/      # 服务
│       └── styles.css         # 全局样式
└── database/                   # 数据库脚本
    └── dayin_es.sql           # 数据库初始化脚本
```

## API接口说明

### 公共接口（无需登录）
- `GET /api/public/company-info` - 获取公司信息
- `GET /api/public/corporate-culture` - 获取企业文化
- `GET /api/public/honors` - 获取荣誉资质
- `GET /api/public/product-categories` - 获取产品分类
- `GET /api/public/products` - 获取产品列表
- `GET /api/public/products/{id}` - 获取产品详情
- `GET /api/public/products/{id}/images` - 获取产品图片
- `GET /api/public/application-scenarios` - 获取应用场景
- `GET /api/public/news` - 获取新闻列表
- `GET /api/public/news/{id}` - 获取新闻详情
- `GET /api/public/contact-info` - 获取联系方式
- `POST /api/public/contact-message` - 提交留言

### 认证接口
- `POST /api/auth/login` - 管理员登录
- `GET /api/auth/me` - 获取当前用户信息

### 管理接口（需要登录）
- `POST /api/admin/upload` - 图片上传
- `GET/POST /api/admin/company-info` - 公司信息管理
- `GET/POST/PUT/DELETE /api/admin/corporate-culture` - 企业文化管理
- `GET/POST/PUT/DELETE /api/admin/honors` - 荣誉资质管理
- `GET/POST/PUT/DELETE /api/admin/product-categories` - 产品分类管理
- `GET/POST/PUT/DELETE /api/admin/products` - 产品管理
- `GET/POST /api/admin/products/{id}/images` - 产品图片管理
- `GET/POST/PUT/DELETE /api/admin/application-scenarios` - 应用场景管理
- `GET/POST/PUT/DELETE /api/admin/news` - 新闻管理
- `GET/POST /api/admin/contact-info` - 联系方式管理
- `GET /api/admin/contact-messages` - 留言列表
- `GET /api/admin/contact-messages/{id}` - 留言详情
- `DELETE /api/admin/contact-messages/{id}` - 删除留言

## 常见问题

### 1. 数据库连接失败
- 检查MySQL服务是否启动
- 确认数据库用户名和密码正确
- 确认数据库 `dayin_es` 已创建

### 2. 前端无法访问后端API
- 确认后端服务已在8080端口启动
- 检查CORS配置是否正确

### 3. 图片上传失败
- 确认 `uploads` 目录有写入权限
- 检查上传文件大小是否超过限制（默认10MB）

## 部署说明

### 后端打包
```bash
cd backend
mvn clean package
java -jar target/dayin-es-1.0.0.jar
```

### 前端打包
```bash
cd frontend
ng build --configuration production
```

打包后的文件位于 `frontend/dist/dayin-es` 目录，可以部署到任何静态文件服务器。

## 许可证

本项目仅供学习和商业使用。
