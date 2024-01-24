import { View, Text, FlatList, StyleSheet } from "react-native";
import TaskItem from "../components/Tasks/TaskItem";
import { fetchTasks } from "../util/http";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setTasksList } from "../store/redux/slices.js";
function AllTasks(props) {
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    async function getTasks() {
      try {
        setIsLoading(true);
        const tasks = await fetchTasks();
        setTasks(tasks);
        dispatch(setTasksList(tasks));
        print("AllTasks.js: tasks: ");
        console.log(tasks);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    getTasks();
  }, [navigation, isChanged]);
  if (isLoading) {
    return <LoadingOverlay message="Loading Tasks..." />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            SetTochange={setIsChanged}
            toChange={isChanged}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
    </View>
  );
}
export default AllTasks;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
