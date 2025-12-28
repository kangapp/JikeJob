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
    <Card className="w-full border-0 shadow-sm rounded-2xl bg-white hover:shadow-md transition-all duration-300 group">
      <CardHeader className="pb-3 pt-5 px-6">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className={`text-xl font-semibold leading-tight text-gray-900 ${ticket.status === TicketStatus.CLOSED ? 'text-gray-400' : ''}`}>
            {ticket.title}
          </CardTitle>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-gray-100"
                onClick={() => onToggleStatus(ticket)} 
                title={ticket.status === TicketStatus.OPEN ? "标记为完成" : "重新打开"}
            >
                {ticket.status === TicketStatus.OPEN ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-orange-500" />}
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-gray-100"
                onClick={() => onEdit(ticket)}
                title="编辑"
            >
              <Pencil className="h-4 w-4 text-gray-600" />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
                onClick={() => onDelete(ticket.id)}
                title="删除"
            >
              <Trash2 className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className={`text-[15px] leading-relaxed mb-5 whitespace-pre-wrap ${ticket.status === TicketStatus.CLOSED ? 'text-gray-300 line-through' : 'text-gray-600'}`}>
            {ticket.description}
        </p>
        <div className="flex flex-wrap gap-2 items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                ticket.status === TicketStatus.OPEN 
                ? 'bg-blue-50 text-blue-700 border-blue-100' 
                : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}>
                {ticket.status === TicketStatus.OPEN ? '进行中' : '已完成'}
            </span>
            {ticket.tags.map(tag => (
                <Badge 
                    key={tag.id} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-gray-200 transition-colors px-3 py-1 text-xs font-normal text-gray-700 bg-gray-100 border-0"
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
