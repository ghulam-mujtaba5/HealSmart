import { StyleSheet } from 'react-native';

export const lightColors = {
  primary: '#16a34a',
  secondary: '#2563eb',
  background: '#ffffff',
  surface: '#ffffff',
  text: '#0f172a',
  mutedText: '#64748b',
  border: '#e2e8f0',
  muted: '#f1f5f9',
};

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.muted,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    color: lightColors.text,
  },
  searchAction: {
    color: lightColors.primary,
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
    backgroundColor: lightColors.surface,
    padding: 24,
    marginVertical: 6,
  },
  tileIconWrap: {
    height: 48,
    width: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.muted,
    marginBottom: 12,
  },
  tileLabel: {
    color: '#334155',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: lightColors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: lightColors.surface,
    padding: 12,
    marginBottom: 8,
  },
  rowLabel: {
    color: '#334155',
  },
});
