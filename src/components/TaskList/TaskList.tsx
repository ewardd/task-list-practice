import './TaskList.scss';
import { DataService } from '../../DataService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskItem } from '../../models/TaskItem';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface ITaskListProps {
  items: TaskItem[];
}

export const TaskList: React.FC<ITaskListProps> = (props) => {
  const db = DataService.getInstance();
  const { items } = props;
  const toggleCheckbox = (item: TaskItem) => {
    item.toggleCompleted();
    db.updateTask(item);
  };

  return (
    <>
      {items.map((item) => {
        return (
          <div className={'task-list-item'} key={item.id}>
            <input
              onChange={() => {
                toggleCheckbox(item);
              }}
              type="checkbox"
              className={'task-list-item-checkbox'}
              checked={item.completed}
            ></input>
            <div className={'task-list-item-text'}>{item.text}</div>
            <button onClick={() => db.deleteTask(item.id)} className={'task-list-item-delete-button'}>
              <FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
            </button>
          </div>
        );
      })}
    </>
  );
};
