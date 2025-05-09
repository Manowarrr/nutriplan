-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name VARCHAR(100) NOT NULL,
  calories_per_100g DECIMAL(8,2) NOT NULL,
  proteins_per_100g DECIMAL(8,2) NOT NULL,
  fats_per_100g DECIMAL(8,2) NOT NULL,
  carbs_per_100g DECIMAL(8,2) NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name VARCHAR(100) NOT NULL,
  total_weight_g DECIMAL(8,2) NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the dish_products table
CREATE TABLE IF NOT EXISTS dish_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dish_id UUID REFERENCES dishes(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  weight_g DECIMAL(8,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the meal_plans table
CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the meal_slots table
CREATE TABLE IF NOT EXISTS meal_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE NOT NULL,
  slot_type VARCHAR(20) NOT NULL CHECK (slot_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the meal_slot_dishes table
CREATE TABLE IF NOT EXISTS meal_slot_dishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_slot_id UUID REFERENCES meal_slots(id) ON DELETE CASCADE NOT NULL,
  dish_id UUID REFERENCES dishes(id) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Create the nutritional_goals table
CREATE TABLE IF NOT EXISTS nutritional_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  daily_calories DECIMAL(8,2),
  daily_proteins_g DECIMAL(8,2),
  daily_fats_g DECIMAL(8,2),
  daily_carbs_g DECIMAL(8,2),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Set up Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dish_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_slot_dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutritional_goals ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Users can view their own products or public products"
  ON products FOR SELECT
  USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users can insert their own products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
  ON products FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
  ON products FOR DELETE
  USING (auth.uid() = user_id);

-- Dishes policies
CREATE POLICY "Users can view their own dishes or public dishes"
  ON dishes FOR SELECT
  USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users can insert their own dishes"
  ON dishes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dishes"
  ON dishes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dishes"
  ON dishes FOR DELETE
  USING (auth.uid() = user_id);

-- Dish products policies
CREATE POLICY "Users can view dish products for their own dishes"
  ON dish_products FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM dishes WHERE dishes.id = dish_products.dish_id 
    AND (dishes.user_id = auth.uid() OR dishes.is_public = TRUE)
  ));

CREATE POLICY "Users can insert dish products for their own dishes"
  ON dish_products FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM dishes WHERE dishes.id = dish_products.dish_id 
    AND dishes.user_id = auth.uid()
  ));

CREATE POLICY "Users can update dish products for their own dishes"
  ON dish_products FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM dishes WHERE dishes.id = dish_products.dish_id 
    AND dishes.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete dish products for their own dishes"
  ON dish_products FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM dishes WHERE dishes.id = dish_products.dish_id 
    AND dishes.user_id = auth.uid()
  ));

-- Meal plans policies
CREATE POLICY "Users can view their own meal plans"
  ON meal_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meal plans"
  ON meal_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meal plans"
  ON meal_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meal plans"
  ON meal_plans FOR DELETE
  USING (auth.uid() = user_id);

-- Meal slots policies
CREATE POLICY "Users can view meal slots for their own meal plans"
  ON meal_slots FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM meal_plans WHERE meal_plans.id = meal_slots.meal_plan_id 
    AND meal_plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert meal slots for their own meal plans"
  ON meal_slots FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM meal_plans WHERE meal_plans.id = meal_slots.meal_plan_id 
    AND meal_plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can update meal slots for their own meal plans"
  ON meal_slots FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM meal_plans WHERE meal_plans.id = meal_slots.meal_plan_id 
    AND meal_plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete meal slots for their own meal plans"
  ON meal_slots FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM meal_plans WHERE meal_plans.id = meal_slots.meal_plan_id 
    AND meal_plans.user_id = auth.uid()
  ));

-- Meal slot dishes policies
CREATE POLICY "Users can view meal slot dishes for their own meal slots"
  ON meal_slot_dishes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM meal_slots 
    JOIN meal_plans ON meal_plans.id = meal_slots.meal_plan_id
    WHERE meal_slots.id = meal_slot_dishes.meal_slot_id 
    AND meal_plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert meal slot dishes for their own meal slots"
  ON meal_slot_dishes FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM meal_slots 
    JOIN meal_plans ON meal_plans.id = meal_slots.meal_plan_id
    WHERE meal_slots.id = meal_slot_dishes.meal_slot_id 
    AND meal_plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can update meal slot dishes for their own meal slots"
  ON meal_slot_dishes FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM meal_slots 
    JOIN meal_plans ON meal_plans.id = meal_slots.meal_plan_id
    WHERE meal_slots.id = meal_slot_dishes.meal_slot_id 
    AND meal_plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete meal slot dishes for their own meal slots"
  ON meal_slot_dishes FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM meal_slots 
    JOIN meal_plans ON meal_plans.id = meal_slots.meal_plan_id
    WHERE meal_slots.id = meal_slot_dishes.meal_slot_id 
    AND meal_plans.user_id = auth.uid()
  ));

-- Nutritional goals policies
CREATE POLICY "Users can view their own nutritional goals"
  ON nutritional_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nutritional goals"
  ON nutritional_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutritional goals"
  ON nutritional_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nutritional goals"
  ON nutritional_goals FOR DELETE
  USING (auth.uid() = user_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_dishes_updated_at
BEFORE UPDATE ON dishes
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_dish_products_updated_at
BEFORE UPDATE ON dish_products
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_meal_plans_updated_at
BEFORE UPDATE ON meal_plans
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_meal_slots_updated_at
BEFORE UPDATE ON meal_slots
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_meal_slot_dishes_updated_at
BEFORE UPDATE ON meal_slot_dishes
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_nutritional_goals_updated_at
BEFORE UPDATE ON nutritional_goals
FOR EACH ROW EXECUTE FUNCTION update_modified_column(); 