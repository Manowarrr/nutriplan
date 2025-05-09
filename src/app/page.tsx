'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block text-primary">NutriPlan</span>
          <span className="block mt-2">Plan your meals with precision</span>
        </h1>
        
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          NutriPlan helps you create customized meal plans by building from individual products 
          to dishes to complete daily meal plans, with detailed nutritional tracking at each level.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <>
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">Browse Products</Button>
              </Link>
              <Link href="/meal-plans">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">My Meal Plans</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button size="lg" className="w-full sm:w-auto">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Create Account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Track Nutrition</h3>
          <p className="mt-2 text-muted-foreground">
            Get detailed nutritional information for your meals, including calories, proteins, fats, and carbohydrates.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Create Custom Dishes</h3>
          <p className="mt-2 text-muted-foreground">
            Build your own dishes from individual products and see the combined nutritional values automatically calculated.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Plan Your Week</h3>
          <p className="mt-2 text-muted-foreground">
            Organize dishes into meal plans for each day of the week, with breakfast, lunch, dinner, and snack slots.
          </p>
        </div>
      </div>
    </Container>
  );
}
