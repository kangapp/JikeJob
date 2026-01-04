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
      <DialogContent className="sm:max-w-[500px] rounded-lg p-8 border border-border shadow-2xl bg-card">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">创建新工单</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">工单标题</label>
            <Input 
              placeholder="请输入工单标题" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="h-12 rounded-md bg-background border-input focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-all ease-snappy text-base"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">描述</label>
            <Textarea 
              placeholder="详细描述问题或需求..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="min-h-[120px] rounded-md bg-background border-input focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-all ease-snappy text-base resize-none p-4"
            />
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-11 px-6 text-muted-foreground hover:bg-accent hover:text-foreground">
                取消
            </Button>
            <Button type="submit" className="h-11 px-8 font-bold shadow-none hover:brightness-110 transition-all ease-snappy">
                创建
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
