import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useAppStyles } from '../ui/styles';
import ListRow from '../ui/components/ListRow';
import { ThemeContext } from '../ui/styles/ThemeContext';

export default function ProfileScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const { palette, isDark } = useAppStyles();
  const { override, setOverride } = React.useContext(ThemeContext);
  const darkMode = override ? override === 'dark' : isDark;

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      <Text style={{ marginBottom: 16, fontSize: 22, fontWeight: '700', color: palette.text }}>Profile & Settings</Text>

      <View style={[s.card, { backgroundColor: palette.surface }]}>
        <Text style={{ color: palette.text, fontWeight: '600' }}>John Doe</Text>
        <Text style={{ color: palette.mutedText }}>john.doe@example.com</Text>
      </View>

      <View style={{ marginTop: 8 }}>
        <ListRow
          leadingIcon="bell"
          title="Push Notifications"
          subtitle="Receive reminders and important updates"
          trailing={<Switch value={notifications} onValueChange={setNotifications} />}
        />
        <ListRow
          leadingIcon="theme-light-dark"
          title="Dark Mode"
          subtitle="Use a dark appearance"
          trailing={<Switch value={darkMode} onValueChange={(v) => setOverride(v ? 'dark' : 'light')} />}
        />
        <ListRow
          leadingIcon="lock-check"
          title="Privacy"
          subtitle="Manage data and permissions"
          onPress={() => {}}
        />
      </View>

      <View style={[s.card, { backgroundColor: palette.surface, marginTop: 12 }]}>
        <Text style={{ marginBottom: 8, color: palette.mutedText }}>App</Text>
        <Text style={{ color: palette.mutedText }}>Version 1.0.0</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 16 },
});
