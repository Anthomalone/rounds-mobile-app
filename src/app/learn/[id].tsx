// Placeholder: Lane A builds the course flow here.
import { router } from 'expo-router';
import { Button, EmptyState, H1, Screen } from '@/components/ui';

export default function LearnScreen() {
  return (
    <Screen>
      <Button label="‹ Back" kind="quiet" onPress={() => (router.canGoBack() ? router.back() : router.replace('/courses'))} />
      <H1>Course</H1>
      <EmptyState title="Coming in Lane A" />
    </Screen>
  );
}
