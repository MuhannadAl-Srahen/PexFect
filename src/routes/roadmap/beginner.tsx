import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/layouts/PageLayout';
import PathDetails from '@/services/roadmap/components/PathDetails';

export const Route = createFileRoute('/roadmap/beginner')({
  component: () => (
    <PageLayout>
      <PathDetails pathId="beginner" />
    </PageLayout>
  ),
});
