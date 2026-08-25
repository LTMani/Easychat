import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import MainDashboardPage from './(dashboard)/page';

export default function RootPage() {
  return (
    <AppSidebar>
      <MainDashboardPage />
    </AppSidebar>
  );
}
