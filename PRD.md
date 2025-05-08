## Section 1: General Information

### 1.1 Product Name and Description

**NutriPlan** - A comprehensive meal planning application that enables users to create customized meal plans by building from individual products to dishes to complete daily meal plans, with detailed nutritional tracking at each level.

### 1.2 Problem Statement

Many individuals struggle with consistent, nutritious meal planning due to difficulties tracking nutritional content, organizing recipes, and planning balanced meals across multiple days. NutriPlan solves this by providing a structured, hierarchical approach to meal planning with precise nutritional information at every level—from individual ingredients to complete daily meal plans—empowering users to make informed dietary choices and maintain healthier eating habits.

## Section 2: Functional Requirements

### 2.1 User Authentication

- Simple registration and login system with username/password

### 2.2 Product Management

- Add new products to database
    - Enter product name
    - Input nutritional values (calories, proteins, fats, carbohydrates) per 100 grams
- Edit existing products
    - Update nutritional information
    - Modify product details
- Delete products
- Search products
    - By name

### 2.3 Dish Creation

- Create new dishes from products
    - Add multiple products with quantities specified in grams
    - Calculate combined nutritional values automatically based on the actual gram quantity used
- Edit existing dishes
    - Add/remove ingredients
    - Adjust quantities in grams
- Delete dishes
- Search dishes
    - By name

### 2.4 Meal Plan Assembly

- Create daily meal plans
    - Add dishes to specific meal slots (breakfast, lunch, dinner, snacks)
    - View cumulative nutritional information
- Edit meal plans
    - Add/remove dishes
    - Move dishes between meal slots
- Delete meal plans

### 2.5 Nutritional Tracking

- Display detailed nutritional information
    - For individual products
    - For dishes
    - For complete meal plans
- Visual representation of nutritional data

### 2.6 Not in MVP

- Barcode scanning for quick product entry


## Section 3: Design and User Experience

### 3.1 List of Screens and Elements

#### Authentication Screens

- Login Screen
    - Username text input
    - Password text input (masked)
    - Login button
    - Register link/button
- Registration Screen
    - Username text input
    - Password text input (masked)
    - Confirm password text input (masked)
    - Register button
    - Back to login link/button

#### Main Navigation

- Top navigation bar
    - App logo/name
    - Products tab
    - Dishes tab
    - Meal Plans tab
    - User profile icon/menu

#### Products Screen

- Search bar for products
- Add new product button
- Products list
    - Product name
    - Basic nutritional summary (calories, protein)
    - Edit button
    - Delete button
- Product Detail Modal
    - Product name field
    - Nutritional values inputs (calories, proteins, fats, carbohydrates)
    - Save button
    - Cancel button

#### Dishes Screen

- Search bar for dishes
- Add new dish button
- Dishes list
    - Dish name
    - Basic nutritional summary (calories, protein)
    - Edit button
    - Delete button
- Dish Creation/Edit Modal
    - Dish name field
    - Product search and selection area
    - Product quantity input (in grams)
    - Add product button
    - Selected products list with quantities
    - Remove product button
    - Total nutritional values display (calculated)
    - Save button
    - Cancel button

#### Meal Plans Screen

- Create new meal plan button
- Meal plans list
    - Date/name of meal plan
    - Basic nutritional summary (total calories)
    - Edit button
    - Delete button
- Meal Plan Creation/Edit Screen
    - Date selector
    - Meal slots section (Breakfast, Lunch, Dinner, Snacks)
    - Add dish button for each meal slot
    - Dish search/selection modal
    - Selected dishes list per meal slot
    - Remove dish button
    - Nutritional summary per meal slot
    - Total daily nutritional summary
    - Save button
    - Cancel button

#### Nutritional Information Display

- Detailed nutrition panel (appears in Products, Dishes, and Meal Plans)
    - Calories value (absolute number)
    - Protein value with percentage bar (showing % of daily recommended intake)
    - Fats value with percentage bar (showing % of daily recommended intake)
    - Carbohydrates value with percentage bar (showing % of daily recommended intake)
    - Secondary view option showing macronutrient breakdown as % of total calories
    - Expandable detailed view for additional nutrients

#### User Settings Screen

- Profile section
    - Username display
    - Edit profile button
- Daily Nutritional Goals section
    - Calories target input
    - Protein target input (grams)
    - Fats target input (grams)
    - Carbohydrates target input (grams)
    - Option to use standard recommendations based on basic profile information (age, gender, weight, activity level)
    - Save button
    - Reset to defaults button

### 3.2 UI States

#### Loading States

- List loading: Skeleton loaders for product/dish/meal plan lists
- Detail loading: Pulsing placeholder for nutritional information
- Action loading: Button spinner for save/delete actions

#### Empty States

- Empty products list: Illustration with "No products yet" message and "Add your first product" button
- Empty dishes list: Illustration with "No dishes yet" message and "Create your first dish" button
- Empty meal plan: Illustration with "No meal plans yet" message and "Create your first meal plan" button
- Empty meal slot: "Add dishes to this meal" message with plus icon

#### Error States

- Form validation errors: Red text below respective field with specific error message
- Action failure: Toast notification with error message and retry option
- Search with no results: "No results found" message with suggestions

#### Active/Inactive States

- Buttons: Distinct color and shadow for active state, desaturated for disabled
- Navigation tabs: Bold and underlined when active
- Form fields: Highlighted border when focused
- List items: Subtle background change on hover

### 3.3 Visual Style

#### Color Palette

- Primary: #4CAF50 (green)
- Secondary: #2196F3 (blue)
- Background: #FFFFFF (white)
- Surface: #F5F5F5 (light gray)
- Text primary: #212121 (dark gray)
- Text secondary: #757575 (medium gray)
- Success: #43A047 (green)
- Error: #E53935 (red)
- Warning: #FFB300 (amber)
- Protein: #8D6E63 (brown)
- Fats: #FFA000 (amber)
- Carbohydrates: #7CB342 (light green)

#### Typography

- Font Family: 'Roboto', sans-serif
- Headings:
    - H1: 24px, 700 weight
    - H2: 20px, 700 weight
    - H3: 18px, 600 weight
    - H4: 16px, 600 weight
- Body:
    - Regular: 14px, 400 weight
    - Small: 12px, 400 weight
- Buttons: 14px, 500 weight, uppercase
- Input labels: 12px, 500 weight

#### Grid System

- Base unit: 8px
- Margin: 16px
- Padding: 16px
- Container max-width: 1200px
- Column structure: 12-column grid
- Breakpoints:
    - Mobile: 0-599px
    - Tablet: 600-959px
    - Desktop: 960px+

#### Styling Constants

- Border radius: 4px
- Card elevation: 2px shadow (0 2px 4px rgba(0,0,0,0.1))
- Interactive element elevation: 4px shadow (0 4px 8px rgba(0,0,0,0.1))
- Transition timing: 0.2s ease-out

#### Accessibility Considerations

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Focus indicators: 2px solid #2196F3 border
- Touch targets: Minimum 44px × 44px for mobile
- Screen reader friendly labels for all interactive elements
- Keyboard navigation support throughout the application

### 3.4 Components and Patterns

#### Components

- Buttons
    - Primary button (filled)
    - Secondary button (outlined)
    - Icon button
    - Text button
- Input fields
    - Text input
    - Number input with unit label
    - Search field with clear button
- Cards
    - List item card
    - Detail card
    - Summary card
- Modals
    - Form modal
    - Confirmation modal
- Tabs
    - Main navigation tabs
- Dropdowns
    - Selection dropdown
    - Menu dropdown
- Chips
    - Ingredient chip with quantity
    - Meal type chip
- Progress bars
    - Nutritional value indicator
- Alerts
    - Success toast
    - Error toast
    - Warning toast

#### Patterns

- List-detail pattern for browsing and editing
- Progressive disclosure for complex information
- Form validation with inline feedback
- Swipe to delete on mobile
- Pull to refresh on lists
- Bottom sheets for mobile actions
- Floating action button for primary actions on mobile

### 3.5 Animations and Micro-interactions

#### Transition Effects

- Page transitions: 300ms fade-in/out
- Modal enter: 250ms scale-up with fade
- Modal exit: 200ms fade-out
- List item enter: 150ms slide-in from bottom
- List item exit: 150ms fade-out with slight scale-down

#### Loading Animations

- Circular spinner: 1.5s rotation cycle
- Skeleton loaders: 1s pulse animation (opacity 0.5 to 0.8)
- Progress bars: 300ms fill animation when values change

#### Feedback Animations

- Button press: 100ms scale-down to 0.95
- Success action: 300ms checkmark animation with green background pulse
- Error action: 300ms horizontal shake (3px left-right)
- Value change: 200ms highlight pulse in relevant color

#### Micro-interactions

- Input field focus: 150ms border transition
- Toggle switches: 200ms slide with color change
- Dropdown expansion: 200ms height animation
- Hover states: 100ms color/shadow transitions
- Nutritional bars: 400ms animated fill when viewing new item
- Add ingredient: 200ms slide-in animation for new item
- Remove ingredient: 150ms fade-out animation

## Section 4: Application Architecture

### 4.1 Technology Stack

#### Frontend Technologies

- Framework: Next.js (React framework with built-in SSR and routing)
- State Management: React Context API with SWR for data fetching
- UI Component Library: Tailwind CSS with shadcn/ui components for the design system
- Form Handling: React Hook Form with Zod validation
- Data Visualization: Chart.js for nutritional data visualization
- Type Safety: TypeScript for enhanced developer experience

#### Backend Technologies

- API Routes: Next.js API routes for serverless functions
- Database: Supabase (PostgreSQL) for data storage and management
- Authentication: Supabase Auth with JWT tokens
- Storage: Supabase Storage for future image uploads
- Real-time: Supabase Realtime for potential collaborative features

#### Database System

- Supabase PostgreSQL with Row Level Security for data protection
- Supabase Functions for database triggers and complex operations


### 4.2 Database Structure

#### Users Table (managed by Supabase Auth)

- id UUID PRIMARY KEY (automatically generated by Supabase Auth)
- email VARCHAR(255) UNIQUE NOT NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL

#### User_Profiles Table

- id UUID PRIMARY KEY REFERENCES auth.users(id)
- username VARCHAR(50) UNIQUE NOT NULL
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

#### Products Table

- id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
- user_id UUID REFERENCES auth.users(id) NOT NULL
- name VARCHAR(100) NOT NULL
- calories_per_100g DECIMAL(8,2) NOT NULL
- proteins_per_100g DECIMAL(8,2) NOT NULL
- fats_per_100g DECIMAL(8,2) NOT NULL
- carbs_per_100g DECIMAL(8,2) NOT NULL
- is_public BOOLEAN DEFAULT FALSE
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

#### Dishes Table

- id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
- user_id UUID REFERENCES auth.users(id) NOT NULL
- name VARCHAR(100) NOT NULL
- total_weight_g DECIMAL(8,2) NOT NULL
- is_public BOOLEAN DEFAULT FALSE
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

#### Dish_Products Table

- id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
- dish_id UUID REFERENCES Dishes(id) ON DELETE CASCADE NOT NULL
- product_id UUID REFERENCES Products(id) NOT NULL
- weight_g DECIMAL(8,2) NOT NULL
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

#### Meal_Plans Table

- id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
- user_id UUID REFERENCES auth.users(id) NOT NULL
- date DATE NOT NULL
- name VARCHAR(100)
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

#### Meal_Slots Table

- id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
- meal_plan_id UUID REFERENCES Meal_Plans(id) ON DELETE CASCADE NOT NULL
- slot_type VARCHAR(20) NOT NULL CHECK (slot_type IN ('breakfast', 'lunch', 'dinner', 'snack'))
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

#### Meal_Slot_Dishes Table

- id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
- meal_slot_id UUID REFERENCES Meal_Slots(id) ON DELETE CASCADE NOT NULL
- dish_id UUID REFERENCES Dishes(id) NOT NULL
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

#### Nutritional_Goals Table

- id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
- user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL
- daily_calories DECIMAL(8,2)
- daily_proteins_g DECIMAL(8,2)
- daily_fats_g DECIMAL(8,2)
- daily_carbs_g DECIMAL(8,2)
- created_at TIMESTAMP NOT NULL DEFAULT now()
- updated_at TIMESTAMP NOT NULL DEFAULT now()

### 4.3 System Components

#### Product Management Module

- Next.js API routes for product CRUD operations
- Client-side SWR data fetching with optimistic UI updates
- Server-side validation of nutritional data
- Search functionality with Postgres full-text search
- Supabase RLS policies ensuring users can only access their own products

#### Dish Management Module

- React components for dish creation and editing
- Real-time nutritional calculation as ingredients are added
- Supabase joins for efficient dish-product relationship management
- Client-side caching of frequently accessed dishes

#### Meal Planning Module

- Calendar-based interface for planning multiple days
- Drag-and-drop functionality for meal organization
- Backend calculations for daily nutritional totals
- Vercel Edge Functions for optimized read operations

#### Nutritional Analysis Engine

- Server-side calculation of nutritional values
- Client-side visualization with Chart.js
- Comparative analysis against user goals
- Cached calculations for improved performance

#### Data Access Layer

- Supabase JavaScript client for database operations
- Type-safe database queries with generated types
- Optimized query patterns for common operations
- Database functions for complex calculations
