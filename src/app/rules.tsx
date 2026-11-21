// Rules & sources: every rule the app uses, with its official source and the date it was checked.
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, Text } from 'react-native';
import { Button, Callout, Card, Chip, Eyebrow, H1, H2, Muted, Row, Screen, Small, st } from '@/components/ui';
import { NOT_CLAIMED, RULE_SOURCES, RULES_CHECKED_LABEL } from '@/data/rules';
import { C } from '@/theme';

export default function Rules() {
  return (
    <Screen>
      <Button label="‹ Back" kind="quiet" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
      <Eyebrow>Real rules, simplified for the demo</Eyebrow>
      <H1>Rules & sources</H1>
      <Row style={{ flexWrap: 'wrap' }}>
        <Chip label={`Checked ${RULES_CHECKED_LABEL}`} tone="dark" />
      </Row>
      {RULE_SOURCES.length === 0 ? (
        <Callout tone="warn" title="No rules loaded">Rules could not be shown. Restart the app.</Callout>
      ) : (
        RULE_SOURCES.map((r) => (
          <Card key={r.id}>
            <Row style={{ flexWrap: 'wrap' }}>
              {r.state === 'FL' && <Chip label="Florida" tone="FL" />}
              {r.state === 'CA' && <Chip label="California" tone="CA" />}
              {r.state === 'All' && <Chip label="All licenses" tone="plain" />}
            </Row>
            <H2>{r.title}</H2>
            <Small>{r.summary}</Small>
            {r.sources.map((s) => (
              <Pressable key={s.url} accessibilityRole="link" accessibilityHint="Opens the official page" onPress={() => WebBrowser.openBrowserAsync(s.url)}>
                <Text style={[st.small, { color: C.info, textDecorationLine: 'underline' }]}>Source: {s.label} ↗</Text>
              </Pressable>
            ))}
            <Muted>Checked {RULES_CHECKED_LABEL}</Muted>
          </Card>
        ))
      )}
      <Callout tone="info">{NOT_CLAIMED}</Callout>
    </Screen>
  );
}
