import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ticket, TicketUpdate, Tag } from "@/types";
import { TagManager } from "./TagManager";

interface EditTicketDialogProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, data: TicketUpdate) => void;
  allTags: Tag[];
  onAddTag: (ticketId: number, tagName: string) => void;
  onRemoveTag: (ticketId: number, tagId: number) => void;
}

export function EditTicketDialog({ ticket, open, onOpenChange, onSubmit, allTags, onAddTag, onRemoveTag }: EditTicketDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description || "");
    }
  }, [ticket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticket) {
      onSubmit(ticket.id, { title, description });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-0 shadow-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">编辑工单</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">工单标题</label>
            <Input 
              placeholder="工单标题" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">描述</label>
            <Textarea 
              placeholder="描述" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="min-h-[120px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base resize-none p-4"
            />
          </div>
          
          {ticket && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">标签管理</label>
                <TagManager 
                    currentTags={ticket.tags} 
                    allTags={allTags}
                    onAddTag={(tagName) => onAddTag(ticket.id, tagName)}
                    onRemoveTag={(tagId) => onRemoveTag(ticket.id, tagId)}
                />
              </div>
          )}

          <DialogFooter className="mt-6">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-full h-11 px-6 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                取消
            </Button>
            <Button type="submit" className="rounded-full h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30">
                保存更改
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
