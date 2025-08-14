import { StyleSheet } from 'react-native';

export const darkColors = {
  primary: '#22c55e',
  secondary: '#60a5fa',
  background: '#0b1220',
  surface: '#0f172a',
  text: '#e5e7eb',
  mutedText: '#94a3b8',
  border: '#1f2937',
  muted: '#111827',
};

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    color: darkColors.text,
  },
  searchAction: {
    color: darkColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tileRow: {
    flexDirection: 'row',
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: darkColors.surface,
    padding: 24,
    marginVertical: 6,
  },
  tileIconWrap: {
    height: 48,
    width: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    marginBottom: 12,
  },
  tileLabel: {
    color: '#cbd5e1',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: darkColors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: darkColors.surface,
    padding: 12,
    marginBottom: 8,
  },
  rowLabel: {
    color: '#cbd5e1',
  },
});
