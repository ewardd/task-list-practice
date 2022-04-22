export interface IDataBase {
  lists: { id: number; name: string; colorId: number }[];
  tasks: { id: number; listId: number; text: string; completed: boolean }[];
  colors: { id: number; hex: string; name: string }[];
}
