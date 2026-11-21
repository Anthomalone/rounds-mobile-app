// Placeholder: filled in by a later feature.
import { router } from 'expo-router';
import { Button, EmptyState, H1, Screen } from '@/components/ui';

export default function BLSrenewalScreen() {
  return (
    <Screen>
      <Button label="‹ Back" kind="quiet" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
      <H1>BLS renewal</H1>
      <EmptyState title="Coming in a later feature" />
    </Screen>
  );
}
