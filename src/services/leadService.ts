import axios from "axios";
import { Lead, LeadFormData, ApiResponse } from "@/types/lead";

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all leads
export const getLeads = async (): Promise<Lead[]> => {
  try {
    const response = await api.get<ApiResponse<Lead[]>>("/leads");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

// Create a new lead
export const createLead = async (leadData: LeadFormData): Promise<Lead> => {
  try {
    const response = await api.post<ApiResponse<Lead>>("/leads", leadData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || "Failed to create lead");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
};
