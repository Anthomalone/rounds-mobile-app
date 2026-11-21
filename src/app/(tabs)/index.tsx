import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { Body, Card, Eyebrow, H1, H3, Muted, Row, Screen } from '@/components/ui';
import { NURSE } from '@/data/catalog';

export default function Home() {
  return (
    <Screen tabs>
      <Eyebrow>Good to see you</Eyebrow>
      <H1>Hi {NURSE.first}</H1>
      <Body>License progress and your shortest path arrive in the next features.</Body>
      <Link href="/rules" asChild>
        <Pressable accessibilityRole="link">
          <Card>
            <Row style={{ justifyContent: 'space-between' }}>
              <H3>Rules & sources</H3>
              <H3>↗</H3>
            </Row>
            <Muted>Where every Florida and California rule comes from</Muted>
          </Card>
        </Pressable>
      </Link>
    </Screen>
  );
}
