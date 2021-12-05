import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(prevTasks => [...prevTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const taskNotCompleted = tasks.find(task => task.id === id)

    if (!taskNotCompleted) {
      return
    }

    const updatedTask = {
      ...taskNotCompleted,
      done: !taskNotCompleted.done,
    }

    const previousTasks = tasks.map(task => task)

    const updatedTasks = [
      ...previousTasks.filter(t => t.id !== updatedTask.id),
      updatedTask,
    ]

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
