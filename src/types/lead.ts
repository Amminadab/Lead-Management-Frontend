export enum LeadStatus {
  NEW = "New",
  ENGAGED = "Engaged",
  PROPOSAL_SENT = "Proposal Sent",
  CLOSED_WON = "Closed-Won",
  CLOSED_LOST = "Closed-Lost",
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  status: LeadStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}
