import { View, Text } from "react-native";
import { storeTask } from "../util/http";
import Button from "../components/UI/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
function ManageTask(props) {
  const navigation = useNavigation();
  async function getEmail() {
    try {
      const email = await AsyncStorage.getItem("email");
      return email;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  const currentemail = getEmail();
  const taskdata = {
    name: "Task 1",
    details: "Task 1 Details",
    priorty: "high",
    email: currentemail,
    done: false,
  };
  async function saveTask(task) {
    try {
      const task = await storeTask(taskdata);
      console.log(task);
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  }

  return (
    <View>
      <Text>Manage Tasks</Text>
      <Button title="Store Task" onPress={() => saveTask(taskdata)} />
    </View>
  );
}
export default ManageTask;
