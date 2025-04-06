export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          age: number | null;
          gender: string | null;
          nationality: string | null;
          education_level: string | null;
          household_composition: string | null;
          economic_activity: boolean | null;
          dental_insurance: boolean | null;
          oral_health_interest: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          age?: number | null;
          gender?: string | null;
          nationality?: string | null;
          education_level?: string | null;
          household_composition?: string | null;
          economic_activity?: boolean | null;
          dental_insurance?: boolean | null;
          oral_health_interest?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          age?: number | null;
          gender?: string | null;
          nationality?: string | null;
          education_level?: string | null;
          household_composition?: string | null;
          economic_activity?: boolean | null;
          dental_insurance?: boolean | null;
          oral_health_interest?: string | null;
          created_at?: string;
        };
      };
      questionnaire_submissions: {
        Row: {
          id: string;
          profile_id: string;
          completed: boolean;
          submitted_at: string;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          completed?: boolean;
          submitted_at: string;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          completed?: boolean;
          submitted_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
