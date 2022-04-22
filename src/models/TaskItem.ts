import { IApiTaskItem } from '../types/IApiTaskItem';
import { ITaskItem } from '../types/ITaskItem';
import { makeAutoObservable } from 'mobx';

export class TaskItem implements ITaskItem {
  public id: number;
  public listId: number;
  public text: string;
  public completed: boolean;

  protected constructor(data: ITaskItem) {
    makeAutoObservable(this);
    this.id = data.id;
    this.listId = data.listId;
    this.text = data.text;
    this.completed = data.completed;
  }
  public static fromApi = (task: IApiTaskItem): TaskItem => {
    return new TaskItem(task);
  };
  public toApi = (): IApiTaskItem => ({
    id: this.id,
    listId: this.listId,
    text: this.text,
    completed: this.completed,
  });
  public toggleCompleted = () => {
    this.completed = !this.completed;
  };
  public static create = () => {
    return new TaskItem({
      id: Math.round(Math.random() * 10000),
      listId: 1,
      text: '',
      completed: false,
    });
  };
  public setText = (text: string) => {
    this.text = text;
  };
  public setListId = (listId: number) => {
    this.listId = listId;
  };
}
