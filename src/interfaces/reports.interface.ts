export interface Report {
  id?: string;
  userId: string;
  userName?: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}
