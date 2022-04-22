import './FolderList.scss';
import { FolderItem } from '../../models/FolderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface IFolderListProps {
  items: FolderItem[];
  onItemClick: (id: FolderItem['id']) => void;
  onDeleteIconClick: (id: FolderItem['id']) => void;
  selectedFolderId: FolderItem['id'] | undefined;
}
export const FolderList: React.FC<IFolderListProps> = (props) => {
  const { items, onItemClick, onDeleteIconClick, selectedFolderId } = props;

  return (
    <>
      {items.map((item) => {
        return (
          <button
            onClick={() => onItemClick(item.id)}
            key={item.id}
            className={`folder-list-item${item.id === selectedFolderId ? ' active' : ''}`}
          >
            <div className={'folder-list-item-select-button'}>
              <FontAwesomeIcon
                className={'folder-list-item-select-button-icon'}
                style={{ color: item.color }}
                icon={faCircle}
              />
              <div className={'folder-list-item-select-button-name'}>{item.name}</div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteIconClick(item.id);
              }}
              className={'folder-list-item-delete-button'}
            >
              <FontAwesomeIcon className={'folder-list-button-delete'} icon={faXmark} />{' '}
            </button>
          </button>
        );
      })}
    </>
  );
};
