// Design tokens from rounds-handoff.md section 10 (same as the web prototype).
// Colour convention: mint = Florida, lavender = California, black = action or headline number.

export const C = {
  canvas: '#ECEEE9',
  surface: '#FFFFFF',
  surface2: '#F4F5F2',
  surface3: '#EEF0EB',
  ink: '#121412',
  ink2: '#4B504B',
  muted: '#8B908A',
  line: '#E4E7E1',
  line2: '#EEF0EB',
  mint: '#B8F2A6',
  mintInk: '#173F12',
  lav: '#CBC2FF',
  lavInk: '#2A2160',
  green: '#3CB54A',
  ok: '#23863A',
  okSoft: '#E3F6DC',
  warn: '#A86400',
  warnSoft: '#FBEFD5',
  bad: '#C2402B',
  badSoft: '#FBE4DF',
  info: '#4C3FB0',
  infoSoft: '#ECE9FF',
  hatch: 'rgba(18,20,18,0.16)',
};

export const F = {
  regular: 'Geist_400Regular',
  medium: 'Geist_500Medium',
  semibold: 'Geist_600SemiBold',
  bold: 'Geist_700Bold',
  mono: 'GeistMono_500Medium',
  monoSemibold: 'GeistMono_600SemiBold',
};

export const R = { card: 22, tile: 26, pill: 999 };
export const S = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };

export const stateColors = {
  FL: { bg: C.mint, ink: C.mintInk },
  CA: { bg: C.lav, ink: C.lavInk },
};
