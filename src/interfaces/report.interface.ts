export interface Report {
  id?: string;
  user_id: number;
  disaster_id: number;
  title: string;
  decription: string;
  image_link: string;
  created_at?: string;
  updated_at?: string;
}
