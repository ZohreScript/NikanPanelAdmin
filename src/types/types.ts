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
  wardId: number; 
  status: number;
  statusName: string;
  centralID: string; 
  installedId: string; 
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

export interface EventAverage {
  ringCount: number;
  staffRingCount: number;
  emergencyRingCount: number;
  averageofRing: number;
  averagrOfEmergency: number;
  averageOfStaff: number;
  totalCount: number;
  averageTotal: number;
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
  eventAverage: EventAverage; 
}


export interface PatientInfo {
  no_pazir: string;
  id: number;
  name_b: string;
  bed_name: string;
  room_name: string;
  name_bakhsh: string;
  bast_date: string;
  name_p: string;
  name_bimari: string;
  sex: number;
  sen: number;
  isoleh: number;
  feed: string;
  room_no: string;
  p_morning: string;
  p_Evening: string;
  p_Night: string;
  toz_kardeks: string;
  movement_Status: string;
  blood_Ban: number;
  fracture_Type: number;
  braceelet: number;
  need_Wheelchair: boolean;
  time_j: string;
  bed_serial: number;
}

export interface PatientInfoResponse {
  total: number;
  pageNum: number;
  pageCount: number;
  totalPages: number;
  pageNumPages: number;
  pageCountPages: number;
  patientInfos: PatientInfo[];
}

export interface RegisterPatientResponse {
  resualt: boolean;
  msg: string | null;
  data: PatientInfo;  }





export interface Package {
  package: string;
  title: string;
}

export interface VersionSelectorRequest {
  fileName: string;
  versionName: string;
  appPackageName: string;
  actioneEnum: number;
  filePath: string;
}

export interface DownloadResponse {
  data: Package[];
}
export type UploadFileParams = {
  file: File;
  packageName: string;
};

export type UploadFileResponse = {
  resualt: boolean;
  msg: string;
  data: string;
};
