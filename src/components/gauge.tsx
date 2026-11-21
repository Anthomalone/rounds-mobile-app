// Half-circle gauge: black arc = hours done, hatched arc = hours remaining.
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, Line, Path, Pattern, Rect } from 'react-native-svg';
import { C, F } from '@/theme';

const ARC = 'M22 112 A88 88 0 0 1 198 112';
const LENGTH = Math.PI * 88;

export function Gauge({ done, total, id, ink }: { done: number; total: number; id: string; ink: string }) {
  const pct = total ? Math.min(1, done / total) : 0;
  return (
    <View accessible accessibilityLabel={`${done} of ${total} hours`}>
    <View style={styles.wrap}>
      <Svg width="100%" height="100%" viewBox="0 0 220 124">
        <Defs>
          <Pattern id={`h-${id}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <Rect width="7" height="7" fill="rgba(255,255,255,0.35)" />
            <Line x1="0" y1="0" x2="0" y2="7" stroke={ink} strokeOpacity={0.45} strokeWidth="2" />
          </Pattern>
        </Defs>
        <Path d={ARC} fill="none" stroke={`url(#h-${id})`} strokeWidth="22" strokeLinecap="round" />
        {pct > 0 && (
          <Path d={ARC} fill="none" stroke={C.ink} strokeWidth="22" strokeLinecap="round" strokeDasharray={`${pct * LENGTH} ${LENGTH}`} />
        )}
      </Svg>
    </View>
      <View style={styles.label} pointerEvents="none">
        <Text style={styles.big}>{done}</Text>
        <Text style={[styles.of, { color: ink }]}>/{total} h</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', maxWidth: 190, aspectRatio: 220 / 124, alignSelf: 'center' },
  label: { flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginTop: -4 },
  big: { fontFamily: F.monoSemibold, fontSize: 30, color: C.ink, letterSpacing: -1 },
  of: { fontFamily: F.mono, fontSize: 14, marginLeft: 2 },
});
