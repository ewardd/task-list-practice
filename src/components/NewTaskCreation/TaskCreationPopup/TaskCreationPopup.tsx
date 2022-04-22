import { DataService } from '../../../DataService';
import { TaskItem } from '../../../models/TaskItem';
import { observer } from 'mobx-react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';
interface ITaskCreationPopupProps {
  onClose: () => void;
  listId: number;
}
export const TaskCreationPopup: React.FC<ITaskCreationPopupProps> = observer((props) => {
  const { listId, onClose } = props;
  const db = DataService.getInstance();
  const [newTask, setNewTask] = useState(TaskItem.create());
  const onCreate = () => {
    newTask.listId = listId;
    db.addTask(newTask);
    setNewTask(TaskItem.create());
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newTask.setText(e.target.value);
  };
  const ref = useRef(null);
  useOnClickOutside(ref, onClose);
  return (
    <div className={'item-creation-popup'} ref={ref}>
      <input onChange={onInputChange} type={'text'} value={newTask.text}></input>
      <div className={'item-creation-popup-color-picker'}></div>
      <button onClick={onCreate} className={'item-creation-popup-confirm'}>
        Добавить
      </button>
    </div>
  );
});
