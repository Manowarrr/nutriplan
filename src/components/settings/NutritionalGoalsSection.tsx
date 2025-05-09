'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const nutritionalGoalsSchema = z.object({
  daily_calories: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: 'Daily calories must be a number.',
    }),
  daily_proteins_g: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: 'Daily proteins must be a number.',
    }),
  daily_fats_g: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: 'Daily fats must be a number.',
    }),
  daily_carbs_g: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: 'Daily carbs must be a number.',
    }),
});

type NutritionalGoalsValues = z.infer<typeof nutritionalGoalsSchema>;

// Standard nutritional goals based on a 2000 calorie diet
const STANDARD_GOALS = {
  daily_calories: '2000',
  daily_proteins_g: '50',
  daily_fats_g: '70',
  daily_carbs_g: '260',
};

export function NutritionalGoalsSection() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default values are mocked since we don't have fetching functionality yet
  const defaultValues: NutritionalGoalsValues = {
    daily_calories: '',
    daily_proteins_g: '',
    daily_fats_g: '',
    daily_carbs_g: '',
  };

  const form = useForm<NutritionalGoalsValues>({
    resolver: zodResolver(nutritionalGoalsSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: NutritionalGoalsValues) {
    setIsSubmitting(true);
    
    // This is just UI, the actual update functionality will be implemented in the next task
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Nutritional goals submitted:', data);
      // Here we would normally call an API endpoint to update the goals
    }, 1000);
  }

  function applyStandardGoals() {
    form.reset(STANDARD_GOALS);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="daily_calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Calories</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2000" {...field} />
                </FormControl>
                <FormDescription>
                  Your target daily calorie intake.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="daily_proteins_g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Proteins (g)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="daily_fats_g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Fats (g)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 70" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="daily_carbs_g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Carbohydrates (g)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 260" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={applyStandardGoals}
          >
            Use Standard Recommendations
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 