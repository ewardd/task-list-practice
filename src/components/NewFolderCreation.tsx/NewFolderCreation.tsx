import './NewFolderCreation.scss';
import { FolderCreationPopup } from './FolderCreationPopup/FolderCreationPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
export const FolderCreationContainer = () => {
  const [show, setShow] = useState(false);
  const onClickHandler = () => {
    setShow(!show);
  };
  return (
    <div className={'content-footer'}>
      <button className={'content-footer-button'} onClick={onClickHandler}>
        <FontAwesomeIcon className={'content-footer-button-icon'} icon={faPlus} />
        Добавить папку
      </button>

      {show ? <FolderCreationPopup onClose={onClickHandler} /> : null}
    </div>
  );
};
