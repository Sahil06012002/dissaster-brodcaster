export interface Disaster {
  id?: string;
  user_id: number;
  userName?: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}
