import { Ticket, TicketStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (ticket: Ticket) => void;
  onTagClick: (tagId: number) => void;
}

export function TicketCard({ ticket, onEdit, onDelete, onToggleStatus, onTagClick }: TicketCardProps) {
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-all duration-300 group hover:border-primary/50">
      <CardHeader className="pb-3 pt-5 px-6">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className={`text-xl font-bold leading-tight text-foreground ${ticket.status === TicketStatus.CLOSED ? 'text-muted-foreground line-through' : ''}`}>
            {ticket.title}
          </CardTitle>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-accent"
                onClick={() => onToggleStatus(ticket)} 
                title={ticket.status === TicketStatus.OPEN ? "标记为完成" : "重新打开"}
            >
                {ticket.status === TicketStatus.OPEN ? <CheckCircle className="h-5 w-5 text-primary" /> : <XCircle className="h-5 w-5 text-muted-foreground" />}
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-accent"
                onClick={() => onEdit(ticket)}
                title="编辑"
            >
              <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onDelete(ticket.id)}
                title="删除"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className={`text-[15px] leading-relaxed mb-5 whitespace-pre-wrap ${ticket.status === TicketStatus.CLOSED ? 'text-muted-foreground' : 'text-muted-foreground/90'}`}>
            {ticket.description}
        </p>
        <div className="flex flex-wrap gap-2 items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${
                ticket.status === TicketStatus.OPEN 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-muted text-muted-foreground border-border'
            }`}>
                {ticket.status === TicketStatus.OPEN ? '进行中' : '已完成'}
            </span>
            {ticket.tags.map(tag => (
                <Badge 
                    key={tag.id} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-3 py-1 text-xs font-normal bg-secondary text-secondary-foreground border-0"
                    onClick={() => onTagClick(tag.id)}
                >
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: tag.color || '#9ca3af' }}></span>
                    {tag.name}
                </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
