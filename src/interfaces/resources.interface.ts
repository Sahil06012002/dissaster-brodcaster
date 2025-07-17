export interface Resource {
  id?: string;
  name: string;
  resource_type: string;
  description?: string;
  location: string;
  coordinates?: string;
  contact_info?: any;
  available_quantity?: number;
  created_at?: string;
}
