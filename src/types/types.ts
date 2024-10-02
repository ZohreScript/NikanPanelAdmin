// src/types/types.ts
export interface MenuItem {
    id: string; 
    title: string;
    url: string; 
    subMenus?: MenuItem[]; 
  }
  