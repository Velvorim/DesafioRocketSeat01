import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    //console.log(newTask.id)
    const foundTask = tasks.map(task => ({ ...task }))

    const foundTitle = foundTask.find(item => item.title === newTask.title)

    if (foundTitle)
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')


    setTasks(oldTask => [...oldTask, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({ ...task }))

    const foundItem = updatedTask.find(item => item.id === id)

    if (!foundItem)
      return

    foundItem.done = !foundItem.done;
    setTasks(updatedTask);
  }

  function handleRemoveTask(id: number) {

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [
        {
          text: "Não"
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);

            setTasks(updatedTasks);
          }
        }
      ]
    )




  }

  function handleEditTask({taskId, taskNewTitle} : EditTaskArgs){
    const alterTask = tasks.map(task => ({ ...task }))

    const alterItem = alterTask.find(item => item.id === taskId)

    if (!alterItem)
      return

      alterItem.title = taskNewTitle;
    setTasks(alterTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})