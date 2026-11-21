// Home: both licenses, missing topics, the shortest path and what needs attention.
import { router, type Href } from 'expo-router';
import type React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gauge } from '@/components/gauge';
import { Body, Button, Callout, Card, Chip, Divider, Eyebrow, H1, H2, H3, HatchBar, Muted, Num, Row, Screen, Small } from '@/components/ui';
import { NURSE, PROVIDERS } from '@/data/catalog';
import { CA, FL } from '@/data/rules';
import { caStatus, countsToward, daysUntil, flStatus, shortestPath } from '@/logic/engine';
import { daysLabel, fmtDate, fmtLongDay } from '@/lib/format';
import { useStore } from '@/store';
import { C, F, R, S } from '@/theme';

export default function Home() {
  const { certs } = useStore();
  const fl = flStatus(certs);
  const ca = caStatus(certs);
  const path = shortestPath(certs);
  const general = fl.reqs.find((r) => r.key === 'general')!;
  const blsDays = daysUntil(NURSE.blsExpires);
  const uploaded = certs.some((c) => c.src === 'upload');
  const next = path.courses[0];

  return (
    <Screen tabs>
      <Eyebrow>{fmtLongDay(new Date())}</Eyebrow>
      <H1>Good to see you, {NURSE.first}</H1>
      <Body>
        {fl.complete && ca.complete ? 'Both licenses are ready to renew. Nice work.' : 'Two renewals on track. Here’s the shortest way to finish both.'}
      </Body>

      {/* F2: license tiles */}
      <View style={styles.tiles}>
        <LicenseTile code="FL" name={FL.name} license={FL.license} expires={FL.expires} done={fl.done} total={fl.total} complete={fl.complete} tone="mint" />
        <LicenseTile code="CA" name={CA.name} license={CA.license} expires={CA.expires} done={ca.done} total={ca.total} complete={ca.complete} tone="lav" />
      </View>

      {/* F4: shortest path tile (black) */}
      <Card tone="dark" style={styles.pathTile}>
        <Eyebrow style={{ color: 'rgba(255,255,255,0.6)' }}>Shortest path · counts toward both licenses where possible</Eyebrow>
        {path.complete ? (
          <>
            <Text style={styles.pathBig}>Complete</Text>
            <Small style={{ color: 'rgba(255,255,255,0.75)' }}>Both licenses meet the requirements. Renew on the board websites before each deadline.</Small>
          </>
        ) : (
          <>
            <Row style={{ alignItems: 'baseline' }}>
              <Text style={styles.pathBig}>{path.courses.length}</Text>
              <Text style={styles.pathSmall}>courses · {path.hours} h</Text>
            </Row>
            <Row style={{ gap: S.lg }}>
              <Row style={{ gap: 6 }}>
                <View style={[styles.swatch, { backgroundColor: C.mint }]} />
                <Small style={{ color: 'rgba(255,255,255,0.75)' }}>Florida topics missing</Small>
                <Num style={{ color: '#fff' }}>{fl.missingTopics.length}</Num>
              </Row>
              <Row style={{ gap: 6 }}>
                <View style={[styles.swatch, { backgroundColor: C.lav }]} />
                <Small style={{ color: 'rgba(255,255,255,0.75)' }}>California left</Small>
                <Num style={{ color: '#fff' }}>{ca.left} h</Num>
              </Row>
            </Row>
            {path.uncovered.length > 0 && (
              <Small style={{ color: C.warnSoft }}>No Rounds course covers: {path.uncovered.join(', ')}.</Small>
            )}
            {next && (
              <Button
                label={`Start next: ${next.title}`}
                icon="→"
                kind="mint"
                onPress={() => router.push(`/courses/${next.id}` as Href)}
                style={{ alignSelf: 'stretch', marginTop: S.xs }}
              />
            )}
          </>
        )}
      </Card>

      {/* F3: right hours, wrong topics */}
      {fl.missingTopics.length > 0 && (
        <Callout tone="warn" title={fl.generalFull ? 'Enough Florida hours, but not the right ones' : 'Florida required topics missing'}>
          <Small>
            {fl.generalFull ? (
              <>
                Your general hours are full (<Text style={styles.mono}>{general.raw}</Text> done, <Text style={styles.mono}>{general.need}</Text> needed), but extra general hours don’t replace required topics.{' '}
              </>
            ) : (
              'General hours don’t replace required topics. '
            )}
            You still need{' '}
            <Text style={{ fontFamily: F.semibold, color: C.ink }}>{fl.missingTopics.map((r) => r.label).join(' and ')}</Text>.
          </Small>
        </Callout>
      )}

      {/* F4: courses in order */}
      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <H2>Your courses, in order</H2>
          {path.complete ? <Chip label="Complete" tone="ok" /> : <Chip label={`${path.courses.length} courses · ${path.hours} h`} tone="plain" />}
        </Row>
        <Muted>Required topics first, then the courses that close both gaps fastest.</Muted>
        {path.complete ? (
          <Callout tone="ok" title="Nothing left to do">Both licenses meet the requirements.</Callout>
        ) : (
          path.courses.map((c, i) => (
            <View key={c.id} style={styles.step}>
              <View style={styles.stepNum}><Num style={{ fontSize: 13 }}>{i + 1}</Num></View>
              <View style={{ flex: 1, gap: 6 }}>
                <H3>{c.title}</H3>
                <Muted>
                  <Text style={styles.mono}>{c.hours} h</Text> · {c.prov ? PROVIDERS[c.prov].name : ''} · self-paced
                </Muted>
                <Row style={{ flexWrap: 'wrap', gap: 6 }}>
                  {countsToward(c).map((t) => <Chip key={t.label} label={t.label} tone={t.state} />)}
                </Row>
                <Button
                  label="Open"
                  kind="ghost"
                  accessibilityLabel={`Open ${c.title}`}
                  onPress={() => router.push(`/courses/${c.id}` as Href)}
                  style={{ alignSelf: 'flex-start', paddingVertical: 9 }}
                />
              </View>
            </View>
          ))
        )}
      </Card>

      {/* F5: needs your attention */}
      <Card>
        <H2>Needs your attention</H2>
        {!uploaded && (
          <Alert tone="warn" title="A certificate from a conference is waiting" body="Add it so we can check which license it counts for." action="Add certificate" to="/certificates/add" />
        )}
        <Alert
          tone={blsDays < 90 ? 'bad' : 'warn'}
          title={
            blsDays < 0 ? 'BLS card expired' : blsDays === 0 ? 'BLS card expires today' : (
              <>BLS card expires in <Text style={styles.mono}>{daysLabel(blsDays)}</Text></>
            )
          }
          body={`Expires ${fmtDate(NURSE.blsExpires)}. Your employer requires a valid card to work shifts.`}
          action="Start renewal"
          to="/bls"
        />
        <Alert tone="info" title="Florida audits licensees at random" body="Keep certificates for each cycle. Your certificates are all in one place." action="Certificates" to="/certificates" />
      </Card>

      {/* F3: requirement cards */}
      <Card>
        <Row>
          <View style={[styles.badge, { backgroundColor: C.mint }]}><Text style={[styles.badgeText, { color: C.mintInk }]}>FL</Text></View>
          <View><H2>Florida requirements</H2><Muted>{FL.license}</Muted></View>
        </Row>
        {fl.reqs.map((r) => (
          <ReqRow key={r.key} label={r.label} note={r.note} have={r.raw} need={r.need} />
        ))}
        {FL.info.map((x) => <InfoRow key={x.label} label={x.label} note={x.note} />)}
        <Muted>Florida tracks completed hours in CE Broker, the state tracking system.</Muted>
      </Card>
      <Card>
        <Row>
          <View style={[styles.badge, { backgroundColor: C.lav }]}><Text style={[styles.badgeText, { color: C.lavInk }]}>CA</Text></View>
          <View><H2>California requirements</H2><Muted>{CA.license}</Muted></View>
        </Row>
        <ReqRow label="Contact hours from a CEP provider" note={CA.note} have={ca.done} need={ca.total} />
        {CA.info.map((x) => <InfoRow key={x.label} label={x.label} note={x.note} />)}
        <Muted>California has no tracking system: keep certificates in case of audit.</Muted>
      </Card>

      <Pressable accessibilityRole="link" onPress={() => router.push('/rules')}>
        <Card>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>Rules & sources</H3>
            <H3>↗</H3>
          </Row>
          <Muted>Where every Florida and California rule comes from</Muted>
        </Card>
      </Pressable>
    </Screen>
  );
}

function LicenseTile(p: { code: string; name: string; license: string; expires: string; done: number; total: number; complete: boolean; tone: 'mint' | 'lav' }) {
  const ink = p.tone === 'mint' ? C.mintInk : C.lavInk;
  const days = daysUntil(p.expires);
  return (
    <Card tone={p.tone} style={styles.tile}>
      <Row>
        <View style={styles.disc}><Text style={[styles.discText, { color: ink }]}>{p.code}</Text></View>
        <View style={{ flex: 1 }}>
          <H3 style={{ color: ink }}>{p.name}</H3>
          <Text style={[styles.tileSub, { color: ink }]} numberOfLines={2}>{p.license}</Text>
        </View>
      </Row>
      <Gauge done={p.done} total={p.total} id={p.code} ink={ink} />
      <View style={{ gap: 4 }}>
        <Text style={[styles.tileSub, { color: ink }]}>Renew by</Text>
        <Num style={{ fontSize: 13, color: ink }}>{fmtDate(p.expires)}</Num>
        <View style={styles.pillDark}><Num style={{ color: '#fff', fontSize: 12 }}>{days < 0 ? 'Expired' : p.complete ? `Ready · ${daysLabel(days)}` : daysLabel(days)}</Num></View>
      </View>
    </Card>
  );
}

function ReqRow({ label, note, have, need }: { label: string; note: string; have: number; need: number }) {
  const ok = have >= need;
  return (
    <View style={styles.req}>
      <View style={[styles.ico, ok ? { backgroundColor: C.ink } : { borderWidth: 1.5, borderColor: C.line }]}>
        {ok && <Text style={{ color: '#fff', fontSize: 11 }}>✓</Text>}
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[styles.reqLabel, !ok && { color: C.ink }]}>{label}</Text>
        <Muted>{note}</Muted>
        {need > 2 && <HatchBar done={Math.min(have, need)} total={need} />}
      </View>
      <Num style={{ fontSize: 13, color: ok ? C.ink : C.muted }}>
        {have}/{need} h
      </Num>
    </View>
  );
}

function InfoRow({ label, note }: { label: string; note: string }) {
  return (
    <View style={styles.req}>
      <View style={[styles.ico, { backgroundColor: C.surface3 }]}><Text style={{ color: C.muted, fontSize: 11 }}>–</Text></View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[styles.reqLabel, { color: C.muted }]}>{label}</Text>
        <Muted>{note}</Muted>
      </View>
    </View>
  );
}

function Alert({ tone, title, body, action, to }: { tone: 'warn' | 'bad' | 'info'; title: React.ReactNode; body: string; action: string; to: Href }) {
  const dot = { warn: C.warn, bad: C.bad, info: C.info }[tone];
  return (
    <>
      <Divider />
      <Pressable accessibilityRole="button" accessibilityHint={action} onPress={() => router.push(to)} style={styles.alert}>
        <View style={[styles.alertDot, { backgroundColor: dot }]} />
        <View style={{ flex: 1, gap: 2 }}>
          <H3>{title}</H3>
          <Muted>{body}</Muted>
          <Text style={styles.link}>{action} →</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  tiles: { flexDirection: 'row', gap: S.md },
  tile: { flex: 1, borderRadius: R.tile, padding: 14, gap: S.md },
  disc: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.55)', alignItems: 'center', justifyContent: 'center' },
  discText: { fontFamily: F.monoSemibold, fontSize: 11 },
  tileSub: { fontFamily: F.regular, fontSize: 11.5, opacity: 0.8 },
  pillDark: { alignSelf: 'flex-start', backgroundColor: C.ink, borderRadius: R.pill, paddingHorizontal: 10, paddingVertical: 4, marginTop: 2 },
  pathTile: { borderRadius: R.tile, padding: S.xl, gap: S.md },
  pathBig: { fontFamily: F.monoSemibold, fontSize: 44, color: '#fff', letterSpacing: -2 },
  pathSmall: { fontFamily: F.mono, fontSize: 15, color: 'rgba(255,255,255,0.75)', marginLeft: 8 },
  swatch: { width: 8, height: 8, borderRadius: 4 },
  step: { flexDirection: 'row', gap: S.md, paddingTop: S.md, borderTopWidth: 1, borderTopColor: C.line2 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.surface3, alignItems: 'center', justifyContent: 'center' },
  badge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontFamily: F.monoSemibold, fontSize: 12 },
  req: { flexDirection: 'row', gap: S.md, alignItems: 'flex-start', paddingVertical: 6 },
  ico: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  reqLabel: { fontFamily: F.medium, fontSize: 14, color: C.ink },
  alert: { flexDirection: 'row', gap: S.md, alignItems: 'flex-start' },
  alertDot: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  link: { fontFamily: F.semibold, fontSize: 13, color: C.ink, marginTop: 4 },
  mono: { fontFamily: F.mono },
});
