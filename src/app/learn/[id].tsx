// Course flow: lessons → post-test (80%) → evaluation → certificate → CE Broker report (simulated).
// The step shown comes from the course's progress, so leaving and coming back resumes in the right place.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, Callout, Card, Chip, Divider, EmptyState, Eyebrow, H1, H2, H3, Muted, Num, Row, Screen, SimulatedTag, Small } from '@/components/ui';
import { courseById, NURSE, PROVIDERS, type Course } from '@/data/catalog';
import { hasFullContent, MED_ERRORS_QUIZ, MED_ERRORS_SECTIONS, PASS_MARK } from '@/data/module';
import { countsToward } from '@/logic/engine';
import { fmtDate } from '@/lib/format';
import { useStore } from '@/store';
import { C, F, R, S } from '@/theme';

export default function Learn() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useStore();
  const c = courseById(String(id));
  const [reviewingTest, setReviewingTest] = useState(false);

  if (!c || c.kind !== 'module') {
    return (
      <Screen>
        <Button label="‹ All courses" kind="quiet" onPress={() => router.replace('/courses')} />
        <EmptyState title="Course not found" body="This course isn’t in the catalog." />
      </Screen>
    );
  }

  const cert = store.certs.find((x) => x.course === c.id);
  const p = store.progress[c.id] ?? { sections: [], passed: false };
  const full = hasFullContent(c.id);

  let body;
  if (cert) body = <Certificate course={c} certId={cert.id} />;
  else if (!full) body = <EmptyState title="Not started" body="Open the course to start it." action={<Button label="Open course" onPress={() => router.replace(`/courses/${c.id}` as Href)} />} />;
  else if (p.passed && !reviewingTest) body = <Evaluation course={c} />;
  else if (p.sections.length >= MED_ERRORS_SECTIONS.length || reviewingTest) body = <PostTest course={c} onReviewing={setReviewingTest} />;
  else body = <Lesson course={c} />;

  return (
    <Screen>
      <Button label="‹ Course overview" kind="quiet" onPress={() => router.replace(`/courses/${c.id}` as Href)} />
      {body}
    </Screen>
  );
}

/* ---------- F7: lesson reader ---------- */
function Lesson({ course }: { course: Course }) {
  const { progress, markSection } = useStore();
  const done = progress[course.id]?.sections ?? [];
  const firstOpen = MED_ERRORS_SECTIONS.findIndex((_, i) => !done.includes(i));
  const [i, setI] = useState(firstOpen < 0 ? 0 : firstOpen);
  const s = MED_ERRORS_SECTIONS[i];
  const last = i === MED_ERRORS_SECTIONS.length - 1;

  return (
    <Card>
      <Row style={{ justifyContent: 'space-between' }}>
        <Eyebrow>
          Section <Text style={styles.mono}>{i + 1}</Text> of <Text style={styles.mono}>{MED_ERRORS_SECTIONS.length}</Text> · <Text style={styles.mono}>{s.minutes} min</Text>
        </Eyebrow>
        <View style={{ flexDirection: 'row', gap: 4 }} accessible accessibilityLabel={`${done.length} of ${MED_ERRORS_SECTIONS.length} sections complete`}>
          {MED_ERRORS_SECTIONS.map((_, k) => (
            <View key={k} style={[styles.dash, (done.includes(k) || k === i) && { backgroundColor: C.ink }]} />
          ))}
        </View>
      </Row>
      <H1 style={{ fontSize: 24, lineHeight: 28 }}>{s.title}</H1>
      {s.paragraphs.map((t) => <Body key={t}>{t}</Body>)}
      {s.bullets?.map((t) => <Body key={t}>• {t}</Body>)}
      {s.onTheWard && (
        <View style={styles.case}>
          <H3>On the ward</H3>
          <Small>{s.onTheWard}</Small>
        </View>
      )}
      <Button
        label={last ? 'Finish and go to the test' : 'Mark complete and continue'}
        icon="→"
        onPress={() => {
          markSection(course.id, i);
          if (!last) setI(i + 1);
        }}
      />
      {i > 0 && <Button label="‹ Previous" kind="ghost" onPress={() => setI(i - 1)} />}
    </Card>
  );
}

/* ---------- F8: post-test ---------- */
function PostTest({ course, onReviewing }: { course: Course; onReviewing: (v: boolean) => void }) {
  const { markPassed } = useStore();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const score = MED_ERRORS_QUIZ.filter((q, k) => answers[k] === q.answer).length;
  const pct = Math.round((score / MED_ERRORS_QUIZ.length) * 100);
  const pass = score / MED_ERRORS_QUIZ.length >= PASS_MARK;
  const allAnswered = Object.keys(answers).length === MED_ERRORS_QUIZ.length;

  return (
    <Card>
      <Eyebrow>Post-test · pass mark 80% (4 of 5)</Eyebrow>
      <H2>{course.title}</H2>
      <Muted>Case-based questions. You can retake the test if you don’t pass.</Muted>
      {MED_ERRORS_QUIZ.map((q, k) => (
        <View key={k} style={{ gap: S.sm, marginTop: S.md }}>
          <View style={styles.scenario}><Small>{q.scenario}</Small></View>
          <H3>
            <Text style={styles.mono}>{k + 1}.</Text> {q.question}
          </H3>
          <View accessibilityRole="radiogroup" style={{ gap: 6 }}>
            {q.options.map((o, j) => {
              const picked = answers[k] === j;
              const right = checked && j === q.answer;
              const wrong = checked && picked && j !== q.answer;
              return (
                <Pressable
                  key={o}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: picked, disabled: checked }}
                  disabled={checked}
                  onPress={() => setAnswers({ ...answers, [k]: j })}
                  style={[styles.opt, picked && styles.optPicked, right && styles.optRight, wrong && styles.optWrong]}>
                  <View style={[styles.radio, picked && styles.radioOn]} />
                  <Text style={styles.optText}>{o}</Text>
                  {checked && picked && <Chip label={j === q.answer ? 'Your answer · correct' : 'Your answer'} tone={j === q.answer ? 'ok' : 'bad'} />}
                  {checked && !picked && j === q.answer && <Chip label="Correct answer" tone="ok" />}
                </Pressable>
              );
            })}
          </View>
          {checked && (
            <Callout tone={answers[k] === q.answer ? 'ok' : 'bad'}>{`${answers[k] === q.answer ? 'Correct. ' : 'Not quite. '}${q.why}`}</Callout>
          )}
        </View>
      ))}
      <Divider />
      {!checked ? (
        <>
          {!allAnswered && <Muted>Answer all 5 questions to submit.</Muted>}
          <Button
            label="Submit answers"
            disabled={!allAnswered}
            onPress={() => {
              setChecked(true);
              onReviewing(true);
              if (pass) markPassed(course.id);
            }}
          />
        </>
      ) : (
        <View style={{ gap: S.sm }}>
          <Row style={{ alignItems: 'baseline' }}>
            <Num style={{ fontSize: 40, color: pass ? C.ok : C.bad }}>{pct}%</Num>
            <H3 style={{ marginLeft: S.sm }}>{pass ? 'Passed' : 'Not passed yet'}</H3>
          </Row>
          <Muted>
            {pass
              ? 'One last step: a short evaluation, then your certificate is issued.'
              : 'You need 4 of 5. Review the feedback above and try again: no hours are added until you pass.'}
          </Muted>
          {pass ? (
            <Button label="Continue to evaluation" icon="→" onPress={() => onReviewing(false)} />
          ) : (
            <Button
              label="Retake test"
              onPress={() => {
                setAnswers({});
                setChecked(false);
              }}
            />
          )}
        </View>
      )}
    </Card>
  );
}

/* ---------- F9: evaluation ---------- */
const SCALE = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];
const EVAL_QS = ['The course met its stated learning outcomes.', 'The content will help me in my nursing practice.', 'The content was fair and free of commercial bias.'];

function Evaluation({ course }: { course: Course }) {
  const { completeCourse } = useStore();
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [text, setText] = useState('');
  const ready = Object.keys(ratings).length === EVAL_QS.length;

  return (
    <Card>
      <Eyebrow>Last step · about 1 minute</Eyebrow>
      <H2>Course evaluation</H2>
      <Muted>Accredited providers ask for feedback after every course and use it to improve the content. Your certificate is issued as soon as you submit.</Muted>
      {EVAL_QS.map((q, k) => (
        <View key={q} style={{ gap: 6, marginTop: S.sm }}>
          <H3>
            <Text style={styles.mono}>{k + 1}.</Text> {q}
          </H3>
          <View accessibilityRole="radiogroup" style={styles.scaleRow}>
            {SCALE.map((s, j) => {
              const on = ratings[k] === j;
              return (
                <Pressable key={s} accessibilityRole="radio" accessibilityState={{ checked: on }} onPress={() => setRatings({ ...ratings, [k]: j })} style={[styles.scaleOpt, on && styles.scaleOn]}>
                  <Text style={[styles.scaleText, on && { color: '#fff' }]}>{s}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <H3 style={{ marginTop: S.sm }}>
        <Text style={styles.mono}>4.</Text> What will you change in your practice? <Text style={{ color: C.muted }}>(optional)</Text>
      </H3>
      <TextInput accessibilityLabel="What will you change in your practice" multiline value={text} onChangeText={setText} style={styles.input} />
      {!ready && <Muted>Rate all 3 statements to submit.</Muted>}
      <Button label="Submit and get certificate" icon="→" disabled={!ready} onPress={() => completeCourse(course.id)} />
    </Card>
  );
}

/* ---------- F9: certificate and CE Broker report (simulated) ---------- */
function Certificate({ course, certId }: { course: Course; certId: string }) {
  const { certs, markReported } = useStore();
  const cert = certs.find((x) => x.id === certId)!;
  const P = PROVIDERS[course.prov!];
  const reportsToCeBroker = !!course.fl;
  const certNumber = `RND-2026-${String(certs.indexOf(cert) + 1).padStart(5, '0')}`;
  const [pdfNote, setPdfNote] = useState(false);

  useEffect(() => {
    if (cert.reported) return;
    const t = setTimeout(() => markReported(cert.id), 2000); // Simulated CE Broker report.
    return () => clearTimeout(t);
  }, [cert.id, cert.reported, markReported]);

  return (
    <>
      <Card style={styles.cert}>
        <View style={styles.ribbon}><Text style={styles.ribbonText}>SAMPLE</Text></View>
        <Eyebrow>Certificate of completion · {P.name}</Eyebrow>
        <H1 style={{ fontSize: 24, lineHeight: 28 }}>{course.title}</H1>
        <Small>
          awarded to <Text style={{ fontFamily: F.semibold, color: C.ink }}>{NURSE.name}</Text> · FL license {NURSE.flLicenseMasked}
        </Small>
        <Divider />
        <Kv k="Contact hours" v={`${course.hours}.0`} />
        <Kv k="Completed" v={fmtDate(cert.date)} />
        <Kv k="Accredited provider" v={P.name} plain />
        <Kv k="Certificate ID" v={certNumber} />
        <Muted style={{ fontSize: 11.5, lineHeight: 17 }}>
          {P.name} is accredited as a provider of nursing continuing professional development by the American Nurses Credentialing Center’s Commission on Accreditation (sample statement). Provider approved by the California Board of Registered Nursing, Provider #18245, for {course.hours}.0 contact hours (sample). Florida Board of Nursing provider #50-31088 (sample).
        </Muted>
        <Divider />
        <Text style={styles.sig}>Lena Ortiz, DNP, RN</Text>
        <Muted>Nurse Planner, {P.name} (sample)</Muted>
      </Card>

      <Card>
        <H2>What happens next</H2>
        <Step done title="Post-test passed and evaluation submitted" body="Both are required for contact hours" />
        <Step done title="Certificate issued" body="Added to your certificates" />
        {reportsToCeBroker && (
          <Step
            done={!!cert.reported}
            busy={!cert.reported}
            title={cert.reported ? 'Reported to CE Broker by Rounds' : 'Sending to CE Broker…'}
            body={cert.reported ? 'As the approved provider, Rounds reported it. Florida now shows these hours.' : 'Sending completion for Florida…'}
            tag
          />
        )}
        <Step done={!!cert.reported || !reportsToCeBroker} title="Counted toward your renewals" body={countsToward(course).map((t) => t.label).join(' · ')} />
        <Button label="See updated progress" onPress={() => router.replace('/')} />
        <Button label="Download PDF (demo)" kind="ghost" onPress={() => setPdfNote(true)} />
        {pdfNote && <Callout tone="info">Simulated: the demo doesn’t create a PDF.</Callout>}
      </Card>
    </>
  );
}

function Kv({ k, v, plain }: { k: string; v: string; plain?: boolean }) {
  return (
    <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Muted>{k}</Muted>
      <Text style={[styles.kv, !plain && styles.mono]}>{v}</Text>
    </Row>
  );
}

function Step({ done, busy, title, body, tag }: { done: boolean; busy?: boolean; title: string; body: string; tag?: boolean }) {
  return (
    <Row style={{ alignItems: 'flex-start', gap: S.md, paddingVertical: 4 }}>
      <View style={[styles.tdot, done && { backgroundColor: C.ink }]}>
        {busy ? <ActivityIndicator size="small" color={C.ink} /> : <Text style={{ color: done ? '#fff' : C.muted, fontSize: 11 }}>{done ? '✓' : '·'}</Text>}
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <H3>{title}</H3>
        <Muted>{body}</Muted>
        {tag && <SimulatedTag what="CE Broker report · simulated" />}
      </View>
    </Row>
  );
}

const styles = StyleSheet.create({
  mono: { fontFamily: F.mono },
  dash: { width: 18, height: 4, borderRadius: 2, backgroundColor: C.surface3 },
  case: { backgroundColor: C.surface2, borderRadius: 16, padding: S.md, gap: 4, borderLeftWidth: 3, borderLeftColor: C.ink },
  scenario: { backgroundColor: C.surface2, borderRadius: 12, padding: S.md },
  opt: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: S.sm, borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: S.md },
  optPicked: { borderColor: C.ink },
  optRight: { borderColor: C.ok, backgroundColor: C.okSoft },
  optWrong: { borderColor: C.bad, backgroundColor: C.badSoft },
  optText: { fontFamily: F.regular, fontSize: 14, color: C.ink, flexShrink: 1, flexGrow: 1, flexBasis: '60%' },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: C.muted },
  radioOn: { borderColor: C.ink, borderWidth: 6 },
  scaleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  scaleOpt: { borderWidth: 1, borderColor: C.line, borderRadius: R.pill, paddingVertical: 8, paddingHorizontal: 12 },
  scaleOn: { backgroundColor: C.ink, borderColor: C.ink },
  scaleText: { fontFamily: F.medium, fontSize: 13, color: C.ink2 },
  input: { minHeight: 90, borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: S.md, fontFamily: F.regular, fontSize: 14, color: C.ink, textAlignVertical: 'top' },
  cert: { borderWidth: 1, borderColor: C.line, overflow: 'hidden' },
  ribbon: { position: 'absolute', top: 14, right: -34, backgroundColor: C.ink, paddingVertical: 4, paddingHorizontal: 40, transform: [{ rotate: '35deg' }] },
  ribbonText: { color: '#fff', fontFamily: F.monoSemibold, fontSize: 10, letterSpacing: 1.5 },
  kv: { fontFamily: F.medium, fontSize: 14, color: C.ink, flexShrink: 1, textAlign: 'right', marginLeft: S.md },
  sig: { fontFamily: F.medium, fontSize: 16, fontStyle: 'italic', color: C.ink },
  tdot: { width: 24, height: 24, borderRadius: 12, backgroundColor: C.surface3, alignItems: 'center', justifyContent: 'center' },
});
