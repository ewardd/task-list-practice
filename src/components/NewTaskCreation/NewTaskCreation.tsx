import './NewTaskCreation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskCreationPopup } from './TaskCreationPopup/TaskCreationPopup';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
interface ITaskCreationContainerProps {
  currentListId: number;
}
export const TaskCreationContainer: React.FC<ITaskCreationContainerProps> = (props) => {
  const { currentListId } = props;
  const [show, setShow] = useState(false);
  const onClickHandler = () => {
    setShow(!show);
  };
  return (
    <div className={'content-footer'}>
      <button className={'content-footer-button'} onClick={onClickHandler}>
        <FontAwesomeIcon className={'content-footer-button-icon'} icon={faPlus} />
        Добавить задачу
      </button>
      {show ? <TaskCreationPopup onClose={onClickHandler} listId={currentListId} /> : null}
    </div>
  );
};
