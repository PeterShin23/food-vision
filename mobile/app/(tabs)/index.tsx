import { RecipeListItem } from '@/components/ui/recipeItem';
import { mockHistory } from '@/constants/mockdata';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  const onOpenCameraPress = () => {
    router.push({
      pathname: "/imageSelection"
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex w-full h-full items-center">
        <TouchableOpacity style={styles.openCamera} onPress={onOpenCameraPress}>
          <MaterialIcons name="ramen-dining" size={24} color="black" />        
        </TouchableOpacity>
        <FlatList
          data={mockHistory}
          renderItem={(data) => <RecipeListItem data={data.item} />}
        />
      </SafeAreaView>   
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // https://dev.to/aneeqakhan/how-to-create-a-floating-button-in-react-native-a-step-by-step-guide-30f5
  openCamera: {
    backgroundColor: "#e91e63",
    width: 60,
    height:60,
    borderRadius: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    zIndex: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
})