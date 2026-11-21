import { EmptyState, H1, Screen } from '@/components/ui';

export default function CoursesTab() {
  return (
    <Screen tabs>
      <H1>Courses</H1>
      <EmptyState title="Coming in the next feature" />
    </Screen>
  );
}
