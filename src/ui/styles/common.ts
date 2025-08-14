import { StyleSheet } from 'react-native';

export const common = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  listItem: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginVertical: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  pressed: { opacity: 0.96 },
});

export type CommonStyles = typeof common;
