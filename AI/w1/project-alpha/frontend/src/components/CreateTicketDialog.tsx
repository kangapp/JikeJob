import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TicketCreate } from "@/types";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TicketCreate) => void;
}

export function CreateTicketDialog({ open, onOpenChange, onSubmit }: CreateTicketDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-0 shadow-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">创建新工单</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">工单标题</label>
            <Input 
              placeholder="请输入工单标题" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">描述</label>
            <Textarea 
              placeholder="详细描述问题或需求..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="min-h-[120px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base resize-none p-4"
            />
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-full h-11 px-6 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                取消
            </Button>
            <Button type="submit" className="rounded-full h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30">
                创建
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
