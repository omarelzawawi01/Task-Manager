import { View, Text, StyleSheet, Pressable } from "react-native";
import GlobalStyles from "../../constants/styles";
import Button from "../UI/Button";
import { updateTask } from "../../util/http";
import { useState } from "react";
import { editTask } from "../../store/redux/slices";
import LoadingOverlay from "../UI/LoadingOverlay";

function TaskItem(props) {
  const [Loading, setLoading] = useState(false);
  async function onitemPress(task) {
    console.log("Pressed");
    props.task.done = true;
    console.log("Taskitem.js: props.task: ");
    let task1 = {
      name: props.task.name,
      details: props.task.details,
      done: !props.task.done,
      priorty: props.task.priorty,
    }
    console.log("Taskitem.js: props.task.id: ", props.task.id);
    console.log("Taskitem.js: props.task.done: ", props.task.done);
    console.log("Taskitem.js: task1: ");
    console.log(task1);
    try {
      setLoading(true);
      const id= await updateTask(props.task.id, task1);
      console.log("TaskItem.js: id: ", id);
      editTask(props.task,task1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } 
    // props.SetTochange(!props.toChange);
  }
  if(Loading){
    return <LoadingOverlay message="Updating Task..." />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.TaskItem}>
        <View style={styles.NameAndStatus}>
          <Text style={styles.TaskName}>{props.task.name}</Text>
          <Button
            onPress={() => onitemPress(props.task)}
            text={props.task.done}
          >
            <Text
              style={props.task.done ? styles.StatusDone : styles.StatusNotDone}
            >
              {props.task.done ? "Done" : "Not Done"}
            </Text>
          </Button>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ fontSize: 16 }}>Priority: </Text>
          <Text
            style={[
              styles.Priority,
              props.task.priorty === "high" && styles.high,
              props.task.priorty === "medium" && styles.medium,
              props.task.priorty === "low" && styles.low,
            ]}
          >
            {props.task.priorty}
          </Text>
        </View>
        <Text style={styles.Details}>{props.task.details}</Text>
      </View>
    </View>
  );
}
export default TaskItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  TaskName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  TaskItem: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    backgroundColor: GlobalStyles.colors.primary400,
    padding: 10,
    margin: 10,
    width: 340,
  },
  NameAndStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    alignItems: "center",
    width: "100%",
  },
  StatusDone: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.error50,
  },
  StatusNotDone: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.accent500,
  },
  Priority: {
    fontSize: 16,
    fontWeight: "bold",
  },
  high: {
    color: "red",
  },
  medium: {
    color: "green",
  },
  low: {
    color: "white",
  },
  Details: {
    fontSize: 14,
    color: GlobalStyles.colors.primary50,
  },
});
