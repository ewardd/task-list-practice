import './FolderCreationPopup.scss';
import { DataService } from '../../../DataService';
import { FolderItem } from '../../../models/FolderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';

interface IFolderCreationPopupProps {
  onClose: () => void;
}
export const FolderCreationPopup: React.FC<IFolderCreationPopupProps> = observer((props) => {
  const { onClose } = props;
  const db = DataService.getInstance();
  const [newFolder] = useState(FolderItem.create());
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newFolder.setName(e.target.value);
  };
  const onCreate = () => {
    db.addFolder(newFolder);
  };
  const ref = useRef(null);
  useOnClickOutside(ref, onClose);
  return (
    <div className={'folder-creation-popup'} ref={ref}>
      <button onClick={onClose} className={'folder-creation-popup-close'}>
        <FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
      </button>
      <input onChange={onInputChange} type={'text'} value={newFolder.name}></input>
      <div className={'folder-creation-popup-color-picker'}>
        {db.getColorList().map((color) => {
          return (
            <FontAwesomeIcon
              className={newFolder.colorId === color.id ? 'active' : undefined}
              key={color.id}
              onClick={() => newFolder.setColor(color)}
              icon={faCircle}
              color={color.hex}
            ></FontAwesomeIcon>
          );
        })}
      </div>
      <button onClick={onCreate} disabled={!newFolder.name} className={'folder-creation-popup-confirm'}>
        Добавить
      </button>
    </div>
  );
});
