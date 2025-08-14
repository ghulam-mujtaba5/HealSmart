import { Platform, ToastAndroid, Alert } from 'react-native';

export function useFeedback() {
  const toast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  return { toast };
}
