# Project Alpha - 简易工单管理系统 (Simple Ticket System)

Project Alpha 是一个全栈开发的工单管理系统，旨在提供高效、简洁的任务跟踪与协作体验。该项目采用了现代化的前后端分离架构，结合了 Apple 风格的极简 UI 设计，支持工单的创建、状态管理、标签分类及多维度筛选。

## 🛠 技术栈 (Tech Stack)

### 后端 (Backend)
- **框架**: [FastAPI](https://fastapi.tiangolo.com/) - 高性能、易于学习的 Python Web 框架。
- **数据库 ORM**: [SQLAlchemy](https://www.sqlalchemy.org/) - 强大的 Python SQL 工具包和对象关系映射器。
- **数据验证**: [Pydantic](https://docs.pydantic.dev/) - 基于 Python 类型提示的数据验证库。
- **数据库**: MySQL (通过 `pymysql` 驱动连接)。
- **服务器**: Uvicorn - 基于 uvloop 和 httptools 的 ASGI 服务器。

### 前端 (Frontend)
- **框架**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) - 快速的现代化前端构建工具。
- **语言**: TypeScript - 提供静态类型检查，增强代码健壮性。
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架。
- **UI 组件库**: [Shadcn UI](https://ui.shadcn.com/) - 基于 Radix UI 的可定制组件集合。
- **图标**: Lucide React - 风格统一的图标库。
- **HTTP 客户端**: Axios - 处理前后端数据交互。

## 🎨 代码风格与设计 (Code Style & Design)

- **UI 设计**: 深度模仿 Apple 官网设计语言。
  - **色彩**: 采用柔和的背景色 (`#f5f5f7`) 和深色文字 (`#1d1d1f`)。
  - **质感**: 大量使用圆角 (`rounded-2xl`)、细腻阴影 (`shadow-sm`) 和毛玻璃效果 (`backdrop-blur-xl`)。
  - **交互**: 按钮和卡片具有优雅的悬停反馈，操作栏默认隐藏，保持界面整洁。
- **代码规范**:
  - 后端遵循 RESTful API 设计原则，严格的类型注解。
  - 前端采用函数式组件和 Hooks (`useState`, `useEffect`)，模块化管理组件 (`components/`) 和 API (`api/`)。

## 🔗 前后端联动 (Architecture)

1.  **API 定义**: 后端通过 FastAPI 定义了标准的 RESTful 接口（如 `GET /api/tickets`, `POST /api/tickets`）。
2.  **数据交互**: 前端通过封装的 Axios 实例 (`src/api/client.ts`) 与后端通信，Base URL 指向 `http://localhost:8000/api`。
3.  **跨域处理**: 后端配置了 `CORSMiddleware`，允许前端开发服务器 (`http://localhost:5173`) 的跨域请求。
4.  **状态同步**: 前端操作（如删除工单）成功后，会自动重新获取列表数据，确保界面与数据库同步。

## ✨ 功能特性 (Features)

*   **工单管理**:
    *   创建、编辑、删除工单。
    *   支持富文本描述（目前为多行文本）。
    *   一键切换工单状态（进行中 / 已完成）。
*   **标签系统**:
    *   强大的标签管理：在编辑工单时可实时创建新标签或选择现有标签。
    *   标签支持自定义颜色（数据库层面支持，前端目前统一渲染）。
*   **搜索与筛选**:
    *   实时搜索：支持按标题关键词过滤。
    *   状态筛选：快速查看“进行中”或“已完成”的工单。
    *   标签筛选：点击任意工单上的标签，即可过滤出所有同类工单。
*   **响应式布局**: 完美适配桌面端和移动端设备。

## 🚀 快速开始 (Quick Start)

### 依赖准备
- Python 3.8+
- Node.js 18+
- MySQL Server (推荐 Docker 部署)

### 一键启动 (推荐)
在项目根目录 (`w1/project-alpha`) 执行：

```bash
# 1. 安装依赖
make install

# 2. 导入测试数据 (确保 MySQL 已启动且密码为 123456)
make seed

# 3. 启动开发环境 (前后端并发启动)
make dev
```

访问应用：`http://localhost:5173`

### 常用命令
- `make start-backend`: 单独启动后端 (Port 8000)
- `make start-frontend`: 单独启动前端 (Port 5173)
- `make stop`: 停止所有服务
- `make seed`: 重置数据库并导入 50+ 条中文测试数据

## 📉 不足与优化方向 (Limitations & Future Work)

### 技术层面
1.  **状态管理**: 目前主要依赖 React 本地 State (`useState`) 和 Props 透传。对于更复杂的场景，建议引入 `React Query` 或 `Zustand` 来管理服务端状态，实现缓存和自动重试。
2.  **数据库迁移**: 目前使用 `Base.metadata.create_all` 自动建表，缺乏版本控制。生产环境建议引入 `Alembic` 进行数据库迁移管理。
3.  **错误处理**: 前端错误处理较为简单（仅 `console.error`），缺乏统一的全局错误提示（如 Toast 通知）。
4.  **性能优化**: 工单列表目前是全量获取（虽然 API 支持分页），数据量大时需在前端实现分页或无限滚动。

### 功能层面
1.  **用户系统**: 目前系统是单用户的，缺乏登录、注册和权限控制功能。
2.  **富文本编辑器**: 描述字段仅支持纯文本，可升级为 Markdown 或富文本编辑器。
3.  **评论系统**: 工单缺乏评论互动功能，无法进行团队协作沟通。
4.  **附件上传**: 不支持图片或文件附件。
5.  **数据统计**: 缺乏仪表盘（Dashboard）来展示工单完成率、积压情况等统计数据。

---
*Created by Trae AI Pair Programmer*
