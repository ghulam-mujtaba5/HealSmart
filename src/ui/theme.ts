export const colors = {
  primary: '#16a34a',
  secondary: '#2563eb',
  background: '#ffffff',
  surface: '#ffffff',
  text: '#0f172a',
  mutedText: '#64748b',
  border: '#e2e8f0',
  muted: '#f1f5f9',
  danger: '#ef4444',
  success: '#22c55e',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const shadows = {
  card: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
};

export const typography = {
  title: { fontSize: 20, fontWeight: '600', color: colors.text },
  subtitle: { fontSize: 14, color: colors.mutedText },
  body: { fontSize: 16, color: colors.text },
  label: { fontSize: 14, fontWeight: '500', color: colors.text },
};

export const theme = { colors, spacing, radii, shadows, typography };
