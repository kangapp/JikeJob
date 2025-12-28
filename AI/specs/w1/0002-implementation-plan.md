# 简易工单管理系统 (Simple Ticket Management System) 实现计划

本文档基于 `./specs/w1/0001-spec.md` 定义的需求，详细规划了简易工单管理系统的实现步骤。

## 阶段 1: 环境准备与项目初始化 (Phase 1: Setup)

### 1.1 项目结构规划
- 根目录 `/`
  - `backend/`: FastAPI 后端代码
  - `frontend/`: Vite + React 前端代码
  - `specs/`: 文档 (已存在)

### 1.2 数据库准备
- [ ] 确保本地 MySQL 服务已启动。mysql在docker环境下, 端口为 3306, 用户名 root, 密码 123456。
- [ ] 创建数据库 `ticket_system`。
  ```sql
  CREATE DATABASE ticket_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```

### 1.3 后端初始化 (`backend/`) 使用uv
- [ ] 创建 `backend` 目录。
- [ ] 初始化 Python 虚拟环境: `python3 -m venv venv`。
- [ ] 激活虚拟环境。
- [ ] 创建 `requirements.txt` 并添加依赖:
  - `fastapi`
  - `uvicorn[standard]`
  - `sqlalchemy`
  - `pymysql` (MySQL driver)
  - `pydantic`
  - `python-dotenv` (用于环境变量)
- [ ] 安装依赖: `pip install -r requirements.txt`。
- [ ] 创建基础文件结构:
  - `main.py`: 入口文件
  - `database.py`: 数据库连接配置
  - `models.py`: SQLAlchemy 模型
  - `schemas.py`: Pydantic 数据模型
  - `crud.py`: 数据库操作逻辑
  - `routers/`: 路由模块 (可选，初期可直接写在 main.py 或单文件中)

### 1.4 前端初始化 (`frontend/`)
- [ ] 创建 `frontend` 目录 (使用 Vite 初始化):
  - `npm create vite@latest frontend -- --template react-ts`
- [ ] 进入 `frontend` 目录并安装基础依赖: `npm install`。
- [ ] 初始化 Tailwind CSS:
  - `npx tailwindcss init -p`
  - 配置 `tailwind.config.js` 和 `index.css`。
- [ ] 初始化 Shadcn UI (如果使用 CLI):
  - `npx shadcn-ui@latest init` (配置 components.json)
  - 安装所需组件: `button`, `input`, `card`, `dialog`, `badge`, `select`, `textarea`, `sheet`.
- [ ] 安装 Axios: `npm install axios`.
- [ ] 安装图标库: `npm install lucide-react`.

## 阶段 2: 后端开发 (Phase 2: Backend Development)

### 2.1 数据库连接与模型定义
- [ ] 在 `database.py` 中配置 `SessionLocal` 和 `Base`。
- [ ] 在 `models.py` 中定义 `Ticket`, `Tag`, `TicketTag` 类，映射到数据库表结构。
- [ ] 编写初始化脚本或在 `main.py` 启动时自动建表 (`Base.metadata.create_all`).

### 2.2 Pydantic Schemas 定义
- [ ] 在 `schemas.py` 中定义数据传输对象 (DTO):
  - `TicketBase`, `TicketCreate`, `TicketUpdate`, `TicketResponse`
  - `TagBase`, `TagCreate`, `TagResponse`

### 2.3 CRUD 逻辑实现
- [ ] 在 `crud.py` 中实现:
  - `get_tickets(skip, limit, status, tag_id, search)`
  - `create_ticket(ticket)`
  - `get_ticket(ticket_id)`
  - `update_ticket(ticket_id, ticket_update)`
  - `delete_ticket(ticket_id)`
  - `get_tags()`
  - `create_tag(tag)`
  - `add_tag_to_ticket(ticket_id, tag_id)`
  - `remove_tag_from_ticket(ticket_id, tag_id)`

### 2.4 API 接口实现
- [ ] 在 `main.py` (或 routers) 中实现 RESTful API 端点:
  - `POST /api/tickets`
  - `GET /api/tickets`
  - `GET /api/tickets/{id}`
  - `PUT /api/tickets/{id}`
  - `DELETE /api/tickets/{id}`
  - `GET /api/tags`
  - `POST /api/tags`
  - `POST /api/tickets/{id}/tags`
  - `DELETE /api/tickets/{id}/tags/{tag_id}`
- [ ] 配置 CORS (允许前端 `localhost:5173` 访问)。

### 2.5 后端测试
- [ ] 使用 Swagger UI (`/docs`) 手动测试所有接口，确保数据读写正常。

## 阶段 3: 前端开发 (Phase 3: Frontend Development)

### 3.1 基础配置与组件封装
- [ ] 配置 `src/lib/utils.ts` (Shadcn 依赖)。
- [ ] 创建 `src/api/client.ts`: 封装 Axios 实例，配置 Base URL。
- [ ] 定义 TypeScript 接口: `Ticket`, `Tag` 等。

### 3.2 组件开发
- [ ] **TicketCard**: 展示单个工单信息 (标题, 描述, 状态, 标签)。包含操作按钮 (编辑, 删除, 完成)。
- [ ] **TagBadge**: 展示标签，支持点击筛选 (可选)。
- [ ] **CreateTicketDialog**: 创建工单的模态框表单。
- [ ] **EditTicketDialog**: 编辑工单的模态框表单 (可复用表单组件)。
- [ ] **SearchBar**: 搜索输入框。
- [ ] **FilterBar**: 状态筛选和标签筛选器。

### 3.3 页面逻辑实现 (App.tsx 或 Dashboard.tsx)
- [ ] **状态管理**: 使用 React `useState` / `useEffect` 或 `React Query` (推荐) 管理 tickets 和 tags 数据。
- [ ] **数据获取**: 页面加载时获取工单列表和标签列表。
- [ ] **交互逻辑**:
  - 实现创建工单后刷新列表。
  - 实现搜索和筛选逻辑 (调用后端 API 参数)。
  - 实现删除工单、更新状态的乐观更新或重新获取。
  - 实现标签的添加与移除交互。

## 阶段 4: 联调与优化 (Phase 4: Integration & Polish)

### 4.1 功能验证
- [ ] 完整流程测试: 创建 -> 打标签 -> 搜索 -> 筛选 -> 完成 -> 删除。
- [ ] 边界测试: 输入空标题，搜索不存在的内容，删除不存在的工单。

### 4.2 UI/UX 优化
- [ ] 优化加载状态 (Loading skeleton)。
- [ ] 优化空状态显示 (Empty state)。
- [ ] 确保移动端适配 (Responsive)。

### 4.3 清理与文档
- [ ] 删除未使用的代码。
- [ ] 更新 `README.md`，包含启动说明 (Backend & Frontend)。

## 5. 待办事项清单 (Checklist)

- [ ] Backend Setup & DB
- [ ] Backend Models & Schemas
- [ ] Backend API Implementation
- [ ] Frontend Setup & UI Libs
- [ ] Frontend API Integration
- [ ] Frontend Components & Pages
- [ ] Final Testing
