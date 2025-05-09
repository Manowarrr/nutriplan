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
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          username: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          calories_per_100g: number;
          proteins_per_100g: number;
          fats_per_100g: number;
          carbs_per_100g: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          calories_per_100g: number;
          proteins_per_100g: number;
          fats_per_100g: number;
          carbs_per_100g: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          calories_per_100g?: number;
          proteins_per_100g?: number;
          fats_per_100g?: number;
          carbs_per_100g?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      dishes: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          total_weight_g: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          total_weight_g: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          total_weight_g?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      dish_products: {
        Row: {
          id: string;
          dish_id: string;
          product_id: string;
          weight_g: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          dish_id: string;
          product_id: string;
          weight_g: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          dish_id?: string;
          product_id?: string;
          weight_g?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      meal_plans: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      meal_slots: {
        Row: {
          id: string;
          meal_plan_id: string;
          slot_type: "breakfast" | "lunch" | "dinner" | "snack";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          meal_plan_id: string;
          slot_type: "breakfast" | "lunch" | "dinner" | "snack";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          meal_plan_id?: string;
          slot_type?: "breakfast" | "lunch" | "dinner" | "snack";
          created_at?: string;
          updated_at?: string;
        };
      };
      meal_slot_dishes: {
        Row: {
          id: string;
          meal_slot_id: string;
          dish_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          meal_slot_id: string;
          dish_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          meal_slot_id?: string;
          dish_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      nutritional_goals: {
        Row: {
          id: string;
          user_id: string;
          daily_calories: number | null;
          daily_proteins_g: number | null;
          daily_fats_g: number | null;
          daily_carbs_g: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          daily_calories?: number | null;
          daily_proteins_g?: number | null;
          daily_fats_g?: number | null;
          daily_carbs_g?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          daily_calories?: number | null;
          daily_proteins_g?: number | null;
          daily_fats_g?: number | null;
          daily_carbs_g?: number | null;
          created_at?: string;
          updated_at?: string;
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