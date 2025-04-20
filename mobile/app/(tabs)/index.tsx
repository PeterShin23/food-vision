import { Image, StyleSheet, Platform, View, Text, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex w-full items-center">
      <Text className="text-white p-16">
          This is my home
        </Text>     
      </SafeAreaView>   
    </SafeAreaProvider>
  );
}
