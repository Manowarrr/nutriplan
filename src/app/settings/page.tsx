'use client';

import { UserSettingsForm } from '@/components/settings/UserSettingsForm';
import { PageHeader } from '@/components/ui/page-header';
import { Container } from '@/components/ui/container';

export default function SettingsPage() {
  return (
    <Container>
      <PageHeader
        title="User Settings"
        description="Manage your profile and nutritional goals"
      />
      <UserSettingsForm />
    </Container>
  );
} 