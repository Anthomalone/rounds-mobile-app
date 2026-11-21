// Basic parts, in the web prototype's style: cards, pill buttons, chips, text, hatched bars.
import { type ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F, R, S } from '@/theme';

type TProps = { children: ReactNode; style?: StyleProp<TextStyle>; numberOfLines?: number };

export const H1 = ({ children, style }: TProps) => <Text accessibilityRole="header" style={[st.h1, style]}>{children}</Text>;
export const H2 = ({ children, style }: TProps) => <Text accessibilityRole="header" style={[st.h2, style]}>{children}</Text>;
export const H3 = ({ children, style, numberOfLines }: TProps) => <Text numberOfLines={numberOfLines} style={[st.h3, style]}>{children}</Text>;
export const Body = ({ children, style }: TProps) => <Text style={[st.body, style]}>{children}</Text>;
export const Small = ({ children, style }: TProps) => <Text style={[st.small, style]}>{children}</Text>;
export const Muted = ({ children, style }: TProps) => <Text style={[st.small, { color: C.muted }, style]}>{children}</Text>;
export const Eyebrow = ({ children, style }: TProps) => <Text style={[st.eyebrow, style]}>{children}</Text>;
/** Every number uses Geist Mono. */
export const Num = ({ children, style }: TProps) => <Text style={[st.num, style]}>{children}</Text>;

export function Screen({ children, scroll = true, tabs = false }: { children: ReactNode; scroll?: boolean; tabs?: boolean }) {
  const insets = useSafeAreaInsets();
  const pad = { paddingTop: insets.top + S.md, paddingBottom: (tabs ? 110 : 40) + insets.bottom };
  if (!scroll) return <View style={[st.screen, pad]}>{children}</View>;
  return (
    <ScrollView style={{ backgroundColor: C.canvas }} contentContainerStyle={[st.screen, pad]}>
      <View style={st.column}>{children}</View>
    </ScrollView>
  );
}

export function Card({ children, style, tone }: { children: ReactNode; style?: StyleProp<ViewStyle>; tone?: 'mint' | 'lav' | 'dark' | 'plain' }) {
  const bg = tone === 'mint' ? C.mint : tone === 'lav' ? C.lav : tone === 'dark' ? C.ink : C.surface;
  return <View style={[st.card, { backgroundColor: bg }, style]}>{children}</View>;
}

type BtnKind = 'primary' | 'ghost' | 'mint' | 'quiet' | 'light';
export function Button({ label, onPress, kind = 'primary', disabled, style, icon, accessibilityHint }: {
  label: string; onPress: () => void; kind?: BtnKind; disabled?: boolean; style?: StyleProp<ViewStyle>; icon?: string; accessibilityHint?: string;
}) {
  const bg = { primary: C.ink, ghost: C.surface, mint: C.mint, quiet: 'transparent', light: C.surface }[kind];
  const fg = { primary: '#fff', ghost: C.ink, mint: C.mintInk, quiet: C.ink2, light: C.ink }[kind];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        st.btn,
        { backgroundColor: bg, opacity: disabled ? 0.4 : pressed ? 0.8 : 1 },
        kind === 'ghost' && { borderWidth: 1, borderColor: C.line },
        kind === 'quiet' && { paddingHorizontal: 4, alignSelf: 'flex-start' },
        style,
      ]}>
      <Text style={[st.btnText, { color: fg }]}>{label}{icon ? `  ${icon}` : ''}</Text>
    </Pressable>
  );
}

export type ChipTone = 'FL' | 'CA' | 'ok' | 'warn' | 'bad' | 'info' | 'plain' | 'dark';
export function Chip({ label, tone = 'plain', dot }: { label: string; tone?: ChipTone; dot?: boolean }) {
  const map: Record<ChipTone, [string, string]> = {
    FL: [C.mint, C.mintInk], CA: [C.lav, C.lavInk], ok: [C.okSoft, C.ok], warn: [C.warnSoft, C.warn],
    bad: [C.badSoft, C.bad], info: [C.infoSoft, C.info], plain: [C.surface3, C.ink2], dark: [C.ink, '#fff'],
  };
  const [bg, fg] = map[tone];
  return (
    <View style={[st.chip, { backgroundColor: bg }]}>
      {dot && <View style={[st.dot, { backgroundColor: fg }]} />}
      <Text style={[st.chipText, { color: fg }]}>{label}</Text>
    </View>
  );
}

export const Row = ({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) => <View style={[st.row, style]}>{children}</View>;
export const Divider = () => <View style={st.divider} />;

/** Progress bar: solid part done, hatched part remaining (135° stripes). */
export function HatchBar({ done, total, color = C.ink, height = 8 }: { done: number; total: number; color?: string; height?: number }) {
  const pct = total ? Math.max(0, Math.min(1, done / total)) : 0;
  const stripes = Array.from({ length: 60 });
  return (
    <View style={[st.bar, { height }]} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: done }}>
      <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', flexDirection: 'row' }]}>
        {stripes.map((_, i) => (
          <View key={i} style={{ width: 1.5, marginRight: 4.5, height: height * 3, backgroundColor: C.hatch, transform: [{ rotate: '45deg' }, { translateY: -height }] }} />
        ))}
      </View>
      <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: color, borderRadius: R.pill }} />
    </View>
  );
}

export function Callout({ tone = 'info', title, children }: { tone?: 'info' | 'ok' | 'warn' | 'bad'; title?: string; children?: ReactNode }) {
  const map = { info: [C.infoSoft, C.info], ok: [C.okSoft, C.ok], warn: [C.warnSoft, C.warn], bad: [C.badSoft, C.bad] } as const;
  const [bg, fg] = map[tone];
  return (
    <View style={[st.callout, { backgroundColor: bg }]}>
      {title && <Text style={[st.h3, { color: fg }]}>{title}</Text>}
      {typeof children === 'string' ? <Text style={[st.small, { color: C.ink2 }]}>{children}</Text> : children}
    </View>
  );
}

/** Visible label for anything simulated (design brief rule 4). */
export const SimulatedTag = ({ what = 'Simulated' }: { what?: string }) => <Chip label={what} tone="info" dot />;

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <Row style={{ gap: S.sm, paddingVertical: S.lg }}>
      <ActivityIndicator color={C.ink} />
      <Muted>{label}</Muted>
    </Row>
  );
}

export function EmptyState({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <Card style={{ alignItems: 'center', paddingVertical: S.xxl }}>
      <H2 style={{ textAlign: 'center' }}>{title}</H2>
      {body && <Muted style={{ textAlign: 'center', marginTop: S.xs }}>{body}</Muted>}
      {action && <View style={{ marginTop: S.md }}>{action}</View>}
    </Card>
  );
}

export function ErrorState({ body, onRetry }: { body: string; onRetry?: () => void }) {
  return (
    <Callout tone="bad" title="Something went wrong">
      <Text style={[st.small, { color: C.ink2 }]}>{body}</Text>
      {onRetry && <Button label="Try again" kind="ghost" onPress={onRetry} style={{ marginTop: S.sm, alignSelf: 'flex-start' }} />}
    </Callout>
  );
}

export const st = StyleSheet.create({
  screen: { flexGrow: 1, backgroundColor: C.canvas, paddingHorizontal: S.lg },
  column: { width: '100%', maxWidth: 560, alignSelf: 'center', gap: S.md },
  h1: { fontFamily: F.medium, fontSize: 28, lineHeight: 32, letterSpacing: -0.9, color: C.ink },
  h2: { fontFamily: F.semibold, fontSize: 17, lineHeight: 22, letterSpacing: -0.25, color: C.ink },
  h3: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: C.ink },
  body: { fontFamily: F.regular, fontSize: 15, lineHeight: 23, color: C.ink2 },
  small: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: C.ink2 },
  eyebrow: { fontFamily: F.medium, fontSize: 11.5, letterSpacing: 0.6, textTransform: 'uppercase', color: C.muted },
  num: { fontFamily: F.mono, color: C.ink, letterSpacing: -0.3 },
  card: { borderRadius: R.card, padding: S.lg, gap: S.sm },
  btn: { borderRadius: R.pill, paddingVertical: 13, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontFamily: F.semibold, fontSize: 15 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: R.pill, paddingVertical: 4, paddingHorizontal: 10, alignSelf: 'flex-start' },
  chipText: { fontFamily: F.medium, fontSize: 12 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  row: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  divider: { height: 1, backgroundColor: C.line, marginVertical: S.sm },
  bar: { width: '100%', borderRadius: R.pill, backgroundColor: C.surface3, overflow: 'hidden' },
  callout: { borderRadius: 16, padding: S.md, gap: 4 },
});
