#!/bin/bash

# 定义颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}>>> 开始自动提交流程...${NC}"

# 添加所有变更
git add .

# 检查是否有暂存的变更
if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠️  没有检测到需要提交的变更。${NC}"
    exit 0
fi

# 提交
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto commit: $TIMESTAMP"
echo -e "${BLUE}>>> 正在提交: ${NC}$COMMIT_MSG"
git commit -m "$COMMIT_MSG" > /dev/null

# 推送
echo -e "${BLUE}>>> 正在推送到远程仓库...${NC}"
if git push; then
    echo -e "${GREEN}✅ 推送成功！${NC}"
else
    echo -e "${RED}❌ 推送失败，请检查网络或远程仓库配置。${NC}"
    # 虽然推送失败，但提交已完成，继续显示统计信息
fi

# 获取统计信息
echo -e "\n${CYAN}==================== 提交变更统计 ====================${NC}"
HASH=$(git rev-parse --short HEAD)
TIME=$(git log -1 --format=%cd --date=format:'%Y-%m-%d %H:%M:%S')
MSG=$(git log -1 --format=%s)

echo -e "🔖 ${YELLOW}提交哈希:${NC} $HASH"
echo -e "⏰ ${YELLOW}提交时间:${NC} $TIME"
echo -e "📝 ${YELLOW}提交信息:${NC} $MSG"
echo -e "${CYAN}------------------------------------------------------${NC}"

echo -e "${YELLOW}📂 文件变动详情:${NC}"
git show --name-status --format="" HEAD | while read status file; do
    case "$status" in
        A*) echo -e "  ${GREEN}[新增]${NC} $file" ;;
        M*) echo -e "  ${BLUE}[修改]${NC} $file" ;;
        D*) echo -e "  ${RED}[删除]${NC} $file" ;;
        R*) echo -e "  ${YELLOW}[重命名]${NC} $file" ;;
        *)  echo -e "  [${status}] $file" ;;
    esac
done

echo -e "${CYAN}------------------------------------------------------${NC}"

# 解析 shortstat
STATS=$(git show --shortstat --format="" HEAD)
# 提取数字 (Compatible with BSD/macOS grep)
FILES_NUM=$(echo "$STATS" | grep -o '[0-9]* file' | awk '{print $1}')
INSERT_NUM=$(echo "$STATS" | grep -o '[0-9]* insertion' | awk '{print $1}')
DELETE_NUM=$(echo "$STATS" | grep -o '[0-9]* deletion' | awk '{print $1}')

[ -z "$FILES_NUM" ] && FILES_NUM=0
[ -z "$INSERT_NUM" ] && INSERT_NUM=0
[ -z "$DELETE_NUM" ] && DELETE_NUM=0

echo -e "${YELLOW}📊 汇总统计:${NC}"
echo -e "  📄 影响文件数: ${FILES_NUM}"
echo -e "  ➕ 新增行数:   ${GREEN}${INSERT_NUM}${NC}"
echo -e "  ➖ 删除行数:   ${RED}${DELETE_NUM}${NC}"
echo -e "${CYAN}======================================================${NC}"
