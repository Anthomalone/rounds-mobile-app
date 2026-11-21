// Course detail: what the course counts toward, who accredits it, how the hours were calculated, and the syllabus.
import { Redirect, router, useLocalSearchParams, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Callout, Card, Chip, Divider, EmptyState, Eyebrow, H1, H2, H3, Muted, Row, Screen, Small } from '@/components/ui';
import { courseById, PROVIDERS } from '@/data/catalog';
import { AUTHORS, DEFAULT_AUTHOR, DISCLOSURES, GENERIC_OUTCOMES, GENERIC_SECTIONS, hasFullContent, MED_ERRORS_SECTIONS, NURSE_PLANNER, OUTCOMES } from '@/data/module';
import { FL } from '@/data/rules';
import { completedCourseIds, countsToward } from '@/logic/engine';
import { useStore } from '@/store';
import { C, F, S } from '@/theme';

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { certs, progress, completeCourse } = useStore();
  const c = courseById(String(id));
  const back = () => (router.canGoBack() ? router.back() : router.replace('/courses'));

  if (!c) {
    return (
      <Screen>
        <Button label="‹ All courses" kind="quiet" onPress={() => router.replace('/courses')} />
        <EmptyState title="Course not found" body="This course isn’t in the catalog." />
      </Screen>
    );
  }
  if (c.kind === 'blended') return <Redirect href="/bls" />;

  const P = PROVIDERS[c.prov!];
  const full = hasFullContent(c.id);
  const sections = full ? MED_ERRORS_SECTIONS.map((s) => ({ title: s.title, minutes: s.minutes })) : GENERIC_SECTIONS.map((t) => ({ title: t, minutes: 30 }));
  const p = progress[c.id] ?? { sections: [], passed: false };
  const isDone = completedCourseIds(certs).includes(c.id);
  const allSections = p.sections.length >= sections.length;
  const req = FL.reqs.find((r) => r.key === c.fl);
  const learn = `/learn/${c.id}` as Href;

  let primary: { label: string; onPress: () => void } | null = null;
  if (isDone) primary = { label: 'See certificate', onPress: () => router.push(learn) };
  else if (full) primary = { label: p.passed ? 'Fill in the evaluation' : allSections ? 'Take the post-test' : p.sections.length ? 'Continue' : 'Start course', onPress: () => router.push(learn) };
  else primary = { label: 'Complete module (demo shortcut)', onPress: () => { completeCourse(c.id); router.push(learn); } };

  return (
    <Screen>
      <Button label="‹ Back" kind="quiet" onPress={back} />
      <Eyebrow>Self-paced module · post-test</Eyebrow>
      <H1>{c.title}</H1>
      <Small>{c.blurb}</Small>
      <Row style={{ flexWrap: 'wrap', gap: 6 }}>
        {countsToward(c).map((t) => <Chip key={t.label} label={`Counts: ${t.label}`} tone={t.state} />)}
        {c.fl === 'dv' && <Chip label="Not due this cycle" tone="plain" />}
      </Row>

      <Card>
        <Fact k="Contact hours" v={`${c.hours}.0`} mono />
        <Fact k="Provider" v={P.name} />
        {P.ancc && <Fact k="Accreditation" v={P.ancc} />}
        <Fact k="Florida" v={P.fl} />
        <Fact k="California" v={P.ca ?? 'No California provider number'} />
      </Card>

      {primary && <Button label={primary.label} icon="→" onPress={primary.onPress} />}
      {!full && !isDone && (
        <Callout tone="info">
          This module follows the same flow as Prevention of Medical Errors (sections, then a case-based test). To keep the demo short, it completes in one tap.
        </Callout>
      )}
      {isDone && <Callout tone="ok" title="Completed">Certificate issued and hours counted.</Callout>}

      <Card>
        <H2>What you’ll cover</H2>
        <Muted>
          <Text style={styles.mono}>{Math.min(p.sections.length, sections.length)}/{sections.length}</Text> sections
        </Muted>
        {sections.map((s, i) => {
          const ok = p.sections.includes(i) || isDone;
          return (
            <Row key={s.title} style={styles.syl}>
              <View style={[styles.sn, ok && { backgroundColor: C.ink }]}>
                <Text style={[styles.snText, ok && { color: '#fff' }]}>{ok ? '✓' : i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <H3>{s.title}</H3>
                <Muted><Text style={styles.mono}>{s.minutes} min</Text></Muted>
              </View>
            </Row>
          );
        })}
        <Row style={styles.syl}>
          <View style={[styles.sn, (p.passed || isDone) && { backgroundColor: C.ink }]}>
            <Text style={[styles.snText, (p.passed || isDone) && { color: '#fff' }]}>{p.passed || isDone ? '✓' : allSections ? '5' : '🔒'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <H3>Post-test · 5 case questions</H3>
            <Muted>{isDone || p.passed ? 'Passed' : allSections ? 'Ready' : 'Locked until all sections are complete'}</Muted>
          </View>
        </Row>
      </Card>

      <Card>
        <H2>Learning outcomes</H2>
        <Muted>After this course, you will be able to:</Muted>
        {(OUTCOMES[c.id] ?? GENERIC_OUTCOMES).map((o) => <Small key={o}>• {o}</Small>)}
        <Divider />
        <Fact k="Author" v={AUTHORS[c.id] ?? DEFAULT_AUTHOR} />
        <Fact k="Nurse Planner" v={NURSE_PLANNER} />
        <Fact k="Contact hours" v={`${c.hours}.0, based on the average time to finish the sections and test (${c.minutes} min; 1 contact hour = 60 min)`} />
        <Fact k="To earn hours" v="Complete every section, score 80% or more on the post-test, and submit the evaluation" />
        <Fact k="Disclosures" v={DISCLOSURES} />
      </Card>

      <Card>
        <H2>Why this course</H2>
        <Small>
          {req && c.fl !== 'general' ? `Florida requires ${req.label} from a board-approved provider. ` : ''}
          {c.ca ? `${P.name} also holds a California provider number (CEP), so the same hours count toward your California renewal.` : 'No California provider number, so it counts for Florida only.'}
        </Small>
        <Divider />
        <H3>After you pass</H3>
        {['Short course evaluation', `Certificate issued by ${P.name}`, 'Reported to CE Broker for Florida (simulated in this demo)', 'Kept with your certificates for a California audit'].map((x) => (
          <Small key={x}>• {x}</Small>
        ))}
      </Card>
    </Screen>
  );
}

function Fact({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <View style={{ gap: 2, paddingVertical: 2 }}>
      <Muted>{k}</Muted>
      <Text style={[styles.factV, mono && styles.mono]}>{v}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mono: { fontFamily: F.mono },
  factV: { fontFamily: F.medium, fontSize: 14, color: C.ink, lineHeight: 20 },
  syl: { alignItems: 'flex-start', gap: S.md, paddingVertical: 6 },
  sn: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.surface3, alignItems: 'center', justifyContent: 'center' },
  snText: { fontFamily: F.mono, fontSize: 12, color: C.ink2 },
});
