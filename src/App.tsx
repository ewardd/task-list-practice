import './App.scss';
import { ContentHeader } from './components/ContentHeader/ContentHeader';
import { DataService } from './DataService';
import { FolderCreationContainer } from './components/NewFolderCreation.tsx/NewFolderCreation';
import { FolderItem } from './models/FolderItem';
import { FolderList } from './components/FolderList/FolderList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskCreationContainer } from './components/NewTaskCreation/NewTaskCreation';
import { TaskList } from './components/TaskList/TaskList';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import { useState } from 'react';

const App = observer(() => {
  const db = DataService.getInstance();
  const [selectedFolder, setSelectedFolder] = useState<number | undefined>();
  const onFolderSelect = (id: FolderItem['id']) => {
    setSelectedFolder(id);
  };
  const onFolderDelete = (id: FolderItem['id']) => {
    db.deleteFolder(id);
    setSelectedFolder(undefined);
  };
  const folder = db.getFolderById(selectedFolder);
  const handleAllTasksClick = () => {
    setSelectedFolder(undefined);
  };

  return (
    <div className={'App'}>
      <div className={'sidebar'}>
        <div className={'sidebar-header'}>
          <button onClick={handleAllTasksClick} className={'sidebar-header-button'}>
            <FontAwesomeIcon className={'sidebar-header-icon'} icon={faList} />
            Все задачи
          </button>
        </div>

        <div className={'sidebar-task-folder'}>
          <FolderList
            items={db.getFolderItemList()}
            onItemClick={onFolderSelect}
            onDeleteIconClick={onFolderDelete}
            selectedFolderId={selectedFolder}
          />
        </div>

        <div className={'sidebar-footer'}>
          <FolderCreationContainer />
        </div>
      </div>

      <div className={'content'}>
        <div className={'content-header'}>{folder ? <ContentHeader folder={folder} /> : 'Все задачи'}</div>

        <div className={'content-body'}>
          <TaskList items={db.taskListItems(selectedFolder)} />
        </div>

        <div className={'content-footer'}>{folder ? <TaskCreationContainer currentListId={folder.id} /> : null}</div>
      </div>
    </div>
  );
});

export default App;
