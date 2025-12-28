export enum TicketStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string | null;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  tags: Tag[];
}

export interface TicketCreate {
  title: string;
  description?: string;
}

export interface TicketUpdate {
  title?: string;
  description?: string;
  status?: TicketStatus;
}

export interface TagStats {
  name: string;
  count: number;
  color: string;
}

export interface DashboardStats {
  total_tickets: number;
  open_tickets: number;
  closed_tickets: number;
  top_tags: TagStats[];
}
