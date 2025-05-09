# Supabase Setup for NutriPlan

This directory contains the database schema and setup instructions for the NutriPlan application using Supabase.

## Prerequisites

1. Create a [Supabase](https://supabase.com/) account if you don't have one
2. Create a new Supabase project for NutriPlan

## Setup Steps

### 1. Enable Email Authentication

1. Go to Authentication → Providers
2. Enable "Email" provider
3. Configure your settings (confirm email, security settings)

### 2. Set up Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `schema.sql` in this directory
3. Paste it into the SQL Editor
4. Run the query to create all tables and security policies

### 3. Set Environment Variables

Create a `.env.local` file in the root directory of the NutriPlan project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_url` and `your_supabase_anon_key` with the actual values from your Supabase project settings page.

### 4. Verify Setup

1. Check the Tables section in Supabase to ensure all tables were created
2. Verify that Row Level Security (RLS) is enabled on all tables
3. Test user registration and login functionality

## Database Structure

The database consists of the following tables:

- `user_profiles`: Stores user profile information
- `products`: Stores nutritional products (ingredients)
- `dishes`: Stores user-created dishes
- `dish_products`: Stores the relationship between dishes and products
- `meal_plans`: Stores daily meal plans
- `meal_slots`: Stores meal slots (breakfast, lunch, dinner, snack)
- `meal_slot_dishes`: Stores the relationship between meal slots and dishes
- `nutritional_goals`: Stores user's nutritional goals

## Security

The setup includes Row Level Security (RLS) policies that ensure:

1. Users can only access their own data
2. Public products and dishes can be viewed by all users
3. Only authenticated users can create, update, or delete data
4. Nested resources (like dish_products) are protected by their parent's ownership 