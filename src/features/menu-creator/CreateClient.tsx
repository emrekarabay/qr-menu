'use client';

import { PageLayout } from '@/components/organisms/PageLayout';
import { MenuCreator } from '@/features/menu-creator/MenuCreator';

export function CreateClient() {
  return (
    <PageLayout>
      <div className="flex-1">
        <MenuCreator />
      </div>
    </PageLayout>
  );
}
