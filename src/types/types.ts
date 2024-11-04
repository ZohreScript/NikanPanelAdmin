// src/types/types.ts
export interface MenuItem {
    id: string; 
    title: string;
    url: string; 
    subMenus?: MenuItem[]; 
  }

export interface WardItem {
  wardId: number;
  wardName: string;
  description: string;
  lastOnlineTime: string;
  id: number;
  createDate: string;
  updateDate: string;
}

export interface EventDetails {
  event_id: number;
  deviceNumber: number;
  bedNumber: number;
  rfid: number;
  serialNumber: string | null;
  rfiD_Name: string | null;
  date: string; 
  year: number;
  month: number;
  day: number;
  hours: number;
  minute: number;
  second: number;
  roomName: string;
  bedName: string;
  wardName: string;
  status: number;
  statusName: string;
  processid: number;
  processcode: string;
  is_in_Process: boolean;
  del: boolean;
  pos: number;
  sortby: number;
  mode: number;
  isSelected: boolean;
  iscalling: boolean;
}


export type WardEventDetail = {
  wardName: string;
  ring: number;
  staffRing: number;
  emergencyRing: number;
  averageOfAnswerinSecond: number;
  roomDetail: RoomDetail[];
};

export type RoomDetail = {
  roomName: string;
  ring: number;
  staffRing: number;
  emergencyRing: number;
  averageOfAnswerinSecond: number;
};
