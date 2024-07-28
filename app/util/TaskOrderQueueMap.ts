import {util} from "~/util";

export class TaskOrderQueueMap {
  readonly tasksMap = new Map<string, (() => any)[]>()

  dispatch(key: string, task: () => any) {
    this.dispatchAsync(key, task).catch(reason => console.error(util.createErrorMessage(reason)))
  }

  async dispatchAsync(key: string, task: () => any) {
    const tasks = this.tasksMap.get(key)
    if (tasks != undefined) {
      tasks.push(task)
      return
    }
    const newTasks = [task]
    this.tasksMap.set(key, newTasks)

    while (true) {
      const task = newTasks.pop()
      if (task == undefined) {
        this.tasksMap.delete(key)
        return
      }
      const result = task()
      if (result instanceof Promise) await result
    }
  }

}

export class TaskOrderQueue {
  constructor(
    readonly key: string,
    readonly taskOrderQueueMap: TaskOrderQueueMap) {
  }

  dispatch(task: () => any) {
    this.taskOrderQueueMap.dispatch(this.key, task)
  }

  async dispatchAsync(key: string, task: () => any) {
    await this.taskOrderQueueMap.dispatchAsync(this.key, task)
  }
}