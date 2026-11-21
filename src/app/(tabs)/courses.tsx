// Courses tab: the catalog, each course showing what it counts toward before you start.
import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Body, Card, Chip, EmptyState, Eyebrow, H1, H2, Muted, Row, Screen } from '@/components/ui';
import { COURSES, PROVIDERS } from '@/data/catalog';
import { completedCourseIds, countsToward } from '@/logic/engine';
import { useStore } from '@/store';
import { C, F } from '@/theme';

export default function CoursesTab() {
  const { certs } = useStore();
  const done = completedCourseIds(certs);

  return (
    <Screen tabs>
      <Eyebrow>Catalog</Eyebrow>
      <H1>Courses</H1>
      <Body>Every course shows which license and requirement it counts toward before you start, so no hours are wasted.</Body>
      {COURSES.length === 0 && <EmptyState title="No courses yet" body="The catalog is empty." />}
      {COURSES.map((c) => {
        const isDone = done.includes(c.id);
        const to = (c.kind === 'blended' ? '/bls' : `/courses/${c.id}`) as Href;
        return (
          <Pressable key={c.id} accessibilityRole="button" accessibilityLabel={`Open ${c.title}`} onPress={() => router.push(to)}>
            <Card>
              <Row style={{ justifyContent: 'space-between' }}>
                <Muted>{c.kind === 'blended' ? 'Blended · online + hands-on' : 'Self-paced module · post-test'}</Muted>
                {isDone ? <Chip label="Completed" tone="ok" /> : c.fl === 'dv' ? <Chip label="Not due" tone="plain" /> : null}
              </Row>
              <H2>{c.title}</H2>
              <Muted>{c.blurb}</Muted>
              <Row style={{ flexWrap: 'wrap', gap: 6 }}>
                {c.kind === 'blended' ? (
                  <Chip label="Employer credential · not license hours" tone="info" />
                ) : (
                  countsToward(c).map((t) => <Chip key={t.label} label={t.label} tone={t.state} />)
                )}
              </Row>
              <Row style={{ justifyContent: 'space-between' }}>
                <Muted>
                  {c.hours ? <Text style={styles.mono}>{c.hours} contact hours</Text> : 'Card valid 2 years'}
                  {c.prov ? ` · ${PROVIDERS[c.prov].name}` : ''}
                </Muted>
                <Text style={styles.open}>{isDone ? 'View' : 'Open'} →</Text>
              </Row>
            </Card>
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  mono: { fontFamily: F.mono },
  open: { fontFamily: F.semibold, fontSize: 14, color: C.ink },
});
