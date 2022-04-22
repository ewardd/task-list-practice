import './ContentHeader.scss';
import { DataService } from '../../DataService';
import { FolderItem } from '../../models/FolderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
interface ContentHeaderProps {
  folder: FolderItem;
}
export const ContentHeader: React.FC<ContentHeaderProps> = observer((props) => {
  const db = DataService.getInstance();
  const { folder } = props;
  const [disabled, setDisabled] = useState(false);
  const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !folder.name) return;
    db.updateFolder(folder);
  };
  return (
    <div className={'content-header'}>
      <input
        className={'content-header-input'}
        type="text"
        value={folder.name}
        onChange={(e) => folder.setName(e.target.value)}
        onKeyUp={enterPress}
        disabled={disabled}
        style={{ color: folder.colorHex }}
      />
      <button className={'content-header-button'}>
        <FontAwesomeIcon
          className={'content-header-button-icon'}
          icon={faPen}
          onClick={() => setDisabled((currentDisabled) => !currentDisabled)}
        />
      </button>
    </div>
  );
});
