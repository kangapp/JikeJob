import { useState, useEffect } from 'react';
import { api } from '@/api/client';
import { Ticket, Tag, TicketCreate, TicketUpdate, TicketStatus } from '@/types';
import { TicketCard } from '@/components/TicketCard';
import { CreateTicketDialog } from '@/components/CreateTicketDialog';
import { EditTicketDialog } from '@/components/EditTicketDialog';
import { DashboardDialog } from '@/components/DashboardDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, X, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<number | null>(null);
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const fetchTickets = async () => {
    try {
      const params: any = {};
      if (search) params.search = search;
      if (statusFilter !== "all") params.status = statusFilter;
      if (tagFilter) params.tag_id = tagFilter;
      
      const response = await api.get<Ticket[]>('/tickets', { params });
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api.get<Tag[]>('/tags');
      setTags(response.data);
    } catch (error) {
      console.error("Failed to fetch tags", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [search, statusFilter, tagFilter]);

  const handleCreate = async (data: TicketCreate) => {
    try {
      await api.post('/tickets', data);
      fetchTickets();
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  const handleEdit = async (id: number, data: TicketUpdate) => {
    try {
      await api.put(`/tickets/${id}`, data);
      fetchTickets();
    } catch (error) {
      console.error("Failed to update ticket", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("确定要删除此工单吗？")) {
      try {
        await api.delete(`/tickets/${id}`);
        fetchTickets();
      } catch (error) {
        console.error("Failed to delete ticket", error);
      }
    }
  };

  const handleToggleStatus = async (ticket: Ticket) => {
    const newStatus = ticket.status === TicketStatus.OPEN ? TicketStatus.CLOSED : TicketStatus.OPEN;
    await handleEdit(ticket.id, { status: newStatus });
  };

  const handleAddTag = async (ticketId: number, tagName: string) => {
    try {
      await api.post(`/tickets/${ticketId}/tags`, { tag_name: tagName });
      fetchTickets();
      fetchTags(); 
      
      if (editingTicket && editingTicket.id === ticketId) {
         const response = await api.get<Ticket>(`/tickets/${ticketId}`);
         setEditingTicket(response.data);
      }
    } catch (error) {
      console.error("Failed to add tag", error);
    }
  };

  const handleRemoveTag = async (ticketId: number, tagId: number) => {
    try {
      await api.delete(`/tickets/${ticketId}/tags/${tagId}`);
      fetchTickets();
      
      if (editingTicket && editingTicket.id === ticketId) {
         const response = await api.get<Ticket>(`/tickets/${ticketId}`);
         setEditingTicket(response.data);
      }
    } catch (error) {
      console.error("Failed to remove tag", error);
    }
  };

  const openEditDialog = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Sticky Header with Blur */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight text-foreground">工单管理</div>
            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDashboardOpen(true)}
                    className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                >
                    <BarChart3 className="mr-2 h-4 w-4" /> 仪表盘
                </Button>
                <Button 
                    onClick={() => setIsCreateOpen(true)} 
                    className="h-9 px-4 text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:brightness-110"
                >
                    <Plus className="mr-2 h-4 w-4" /> 新建工单
                </Button>
            </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl shadow-sm border border-border">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索工单..."
              className="pl-10 h-10 rounded-lg bg-background border-border focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[160px] h-10 rounded-lg border-border bg-background text-sm font-medium text-foreground">
                <div className="flex items-center gap-2">
                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder="状态" />
                </div>
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border bg-popover text-popover-foreground shadow-lg">
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="open">进行中</SelectItem>
                <SelectItem value="closed">已完成</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tag Filter Indicator */}
        {tagFilter && (
             <div className="flex items-center gap-3 px-2">
                <span className="text-sm font-medium text-muted-foreground">当前标签筛选：</span>
                <Badge 
                    variant="secondary" 
                    className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 rounded-md border-0 text-sm font-normal flex items-center gap-1 transition-colors" 
                    onClick={() => setTagFilter(null)}
                >
                    {tags.find(t => t.id === tagFilter)?.name} 
                    <X className="h-3 w-3" />
                </Badge>
             </div>
        )}

        {/* Ticket List */}
        <div className="grid grid-cols-1 gap-5">
          {tickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={openEditDialog}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onTagClick={setTagFilter}
            />
          ))}
          {tickets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mb-4 border border-border">
                  <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">暂无工单</p>
              <p className="text-sm text-muted-foreground mt-1">尝试调整搜索条件或创建一个新工单。</p>
            </div>
          )}
        </div>

        <CreateTicketDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onSubmit={handleCreate}
        />

        <EditTicketDialog
          ticket={editingTicket}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSubmit={handleEdit}
          allTags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />

        <DashboardDialog 
            open={isDashboardOpen} 
            onOpenChange={setIsDashboardOpen} 
        />
      </div>
    </div>
  );
}

export default App;
