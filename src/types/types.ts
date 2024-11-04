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

export interface BedEvent {
  event_id: number;
  deviceNumber: number;
  bedNumber: number;
  rfid: number;
  serialNumber: string;
  rfiD_Name: string;
  date: string;
  year: number;
  mount: number;
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

export interface RoomDetail {
  roomName: string;
  ring: number;
  staffRing: number;
  emergencyRing: number;
  averageOfAnswerinSecond: number;
}

export interface WardEventsDetail {
  wardName: string;
  ring: number;
  staffRing: number;
  emergencyRing: number;
  averageOfAnswerinSecond: number;
  roomDetail: RoomDetail[];
}

export interface ResponseData {
  total: number;
  pageNum: number;
  pageCount: number;
  totalPages: number;
  pageNumPages: number;
  pageCountPages: number;
  bedEvents: BedEvent[];
  wardEventsDetailes: WardEventsDetail[];
}
