// Floating white bottom tab bar (web prototype's phone layout): Home, Courses, Certificates.
import { Tabs, type BottomTabBarProps } from 'expo-router/js-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F, R } from '@/theme';

const LABELS: Record<string, string> = { index: 'Home', courses: 'Courses', certificates: 'Certificates' };

function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bar} accessibilityRole="tablist">
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              onPress={() => {
                if (!focused) navigateToTab(route.key);
              }}
              style={[styles.tab, focused && styles.tabOn]}>
              <Text style={[styles.label, focused && styles.labelOn]}>{LABELS[route.name] ?? route.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(p) => <TabBar {...p} />} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: C.canvas } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="courses" />
      <Tabs.Screen name="certificates" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingHorizontal: 16 },
  bar: { flexDirection: 'row', backgroundColor: C.surface, borderRadius: R.pill, padding: 5, gap: 4, width: '100%', maxWidth: 420, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 6 },
  tab: { flex: 1, borderRadius: R.pill, paddingVertical: 12, alignItems: 'center' },
  tabOn: { backgroundColor: C.ink },
  label: { fontFamily: F.medium, fontSize: 13.5, color: C.ink2 },
  labelOn: { color: '#fff' },
});
