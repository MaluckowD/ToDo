
export interface IEvent {
    id: number; // Или просто number/string, если уверены
    event_date: string | Date;
    event_title: string;
    event_theme: string;
    task_id: string; // Или просто number/string, если уверены
  }
  
