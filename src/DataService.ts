import { FolderItem } from './models/FolderItem';
import { TaskItem } from './models/TaskItem';
import { makeAutoObservable } from 'mobx';
import dbjson from './db.json';

export class DataService {
  private static instance: DataService | null = null;
  public static getInstance = (): DataService => {
    if (DataService.instance === null) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  };
  public db;
  public constructor() {
    makeAutoObservable(this);
    this.db = dbjson;
  }
  public getFolderItemList = (): FolderItem[] =>
    this.db.lists.map((list) => {
      const color = this.db.colors.find((color) => {
        return color.id === list.colorId;
      });
      return FolderItem.fromApi(list, color);
    });
  public taskListItems = (id: FolderItem['id'] | undefined): TaskItem[] => {
    const folderIdList = this.db.lists.map((list) => {
      return list.id;
    });

    return this.db.tasks
      .filter((task) => (id !== undefined ? task.listId === id : folderIdList.includes(task.listId)))
      .map(TaskItem.fromApi);
  };
  public getFolderById = (id: FolderItem['id'] | undefined): FolderItem | undefined => {
    if (id === undefined) return undefined;

    const list = this.db.lists.find((l) => id === l.id);
    if (!list) return undefined;

    const color = this.db.colors.find((color) => color.id === list.colorId);
    return FolderItem.fromApi(list, color);
  };

  public getColorList = () => {
    return this.db.colors;
  };
  public addFolder = (newFolder: FolderItem) => {
    this.db.lists.push(newFolder.toApi());
  };
  public addTask = (newTask: TaskItem) => {
    this.db.tasks.push(newTask.toApi());
  };
  public deleteFolder = (id: FolderItem['id']) => {
    this.db.lists = this.db.lists.filter((list) => list.id !== id);
  };
  public deleteTask = (id: TaskItem['id']) => {
    this.db.tasks = this.db.tasks.filter((task) => task.id !== id);
  };
  public updateTask = (newTask: TaskItem) => {
    const newDbTasks = this.db.tasks.map((task) => {
      if (task.id === newTask.id) {
        return newTask.toApi();
      }
      return task;
    });
    this.db.tasks = newDbTasks;
  };
  public updateFolder = (folder: FolderItem): void => {
    const newDbFolders = this.db.lists.map((f) => {
      if (f.id === folder.id) {
        return folder.toApi();
      }
      return f;
    });
    this.db.lists = newDbFolders;
  };
}
