'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSection } from './ProfileSection';
import { NutritionalGoalsSection } from './NutritionalGoalsSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/lib/contexts/AuthContext';

export function UserSettingsForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
          <CardDescription>You need to be logged in to view your settings.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="nutritional-goals">Nutritional Goals</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileSection />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="nutritional-goals">
        <Card>
          <CardHeader>
            <CardTitle>Nutritional Goals</CardTitle>
            <CardDescription>
              Set your daily nutritional targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NutritionalGoalsSection />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 