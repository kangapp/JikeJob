import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/api/client";
import { DashboardStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle2, Circle, Tag as TagIcon, Activity } from "lucide-react";

interface DashboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DashboardDialog({ open, onOpenChange }: DashboardDialogProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (open) {
      const fetchStats = async () => {
        try {
          const response = await api.get<DashboardStats>("/stats");
          setStats(response.data);
        } catch (error) {
          console.error("Failed to fetch stats", error);
        }
      };
      fetchStats();
    }
  }, [open]);

  if (!stats) return null;

  const completionRate = stats.total_tickets > 0 
    ? Math.round((stats.closed_tickets / stats.total_tickets) * 100) 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] rounded-lg p-8 border border-border shadow-2xl bg-card">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            数据仪表盘
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-background border border-border shadow-none rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">总工单</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.total_tickets}</div>
            </CardContent>
          </Card>
          <Card className="bg-background border border-border shadow-none rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">进行中</CardTitle>
              <Circle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.open_tickets}</div>
            </CardContent>
          </Card>
          <Card className="bg-background border border-border shadow-none rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">已完成</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{stats.closed_tickets}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Completion Rate */}
            <div className="bg-background p-6 rounded-lg border border-border shadow-none">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">完成率</h3>
                <div className="flex items-center justify-center py-4">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="hsl(var(--muted))"
                                strokeWidth="3"
                            />
                            <path
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="3"
                                strokeDasharray={`${completionRate}, 100`}
                                className="animate-[progress_1s_ease-out_forwards]"
                            />
                            <text x="18" y="20.35" className="text-xs font-bold fill-foreground" textAnchor="middle">{completionRate}%</text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Top Tags */}
            <div className="bg-background p-6 rounded-lg border border-border shadow-none">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <TagIcon className="h-4 w-4" /> 热门标签 Top 5
                </h3>
                <div className="space-y-3">
                    {stats.top_tags.map((tag, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color || '#9ca3af' }}></span>
                                <span className="text-sm text-foreground">{tag.name}</span>
                            </div>
                            <span className="text-sm font-medium text-foreground bg-muted px-2 py-0.5 rounded-md">{tag.count}</span>
                        </div>
                    ))}
                    {stats.top_tags.length === 0 && (
                        <div className="text-sm text-muted-foreground text-center py-4">暂无数据</div>
                    )}
                </div>
            </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
