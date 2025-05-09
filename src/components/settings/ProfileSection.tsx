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

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(50, { message: 'Username must not be longer than 50 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileSection() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default values are mocked since we don't have fetching functionality yet
  const defaultValues: Partial<ProfileFormValues> = {
    username: '',
    email: user?.email || '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    
    // This is just UI, the actual update functionality will be implemented in the next task
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Profile data submitted:', data);
      // Here we would normally call an API endpoint to update the profile
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email" 
                  {...field} 
                  disabled 
                  value={user?.email || ''} 
                />
              </FormControl>
              <FormDescription>
                Email is managed by your account settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 