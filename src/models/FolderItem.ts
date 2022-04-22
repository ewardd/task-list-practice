import { IApiColor } from '../types/IApiColor';
import { IApiFolderItem } from '../types/IApiFolderItem';
import { IFolderItem } from '../types/IFolderItem';
import { makeAutoObservable } from 'mobx';

export class FolderItem implements IFolderItem {
  public id: number;
  public name: string;
  public color: string;
  public colorId: number;
  public colorHex: string;

  protected constructor(data: IFolderItem) {
    makeAutoObservable(this);
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.colorId = data.colorId;
    this.colorHex = data.colorHex;
  }
  public setName = (name: string) => {
    this.name = name;
  };
  public setColor = (color: IApiColor) => {
    this.color = color.name;
    this.colorId = color.id;
    this.colorHex = color.hex;
  };
  public static create = () => {
    return new FolderItem({
      id: Math.round(Math.random() * 10000),
      name: '',
      color: 'grey',
      colorId: 1,
      colorHex: '#C9D1D3',
    });
  };
  public static fromApi = (folder: IApiFolderItem, color: IApiColor | undefined): FolderItem => {
    return new FolderItem({
      id: folder.id,
      name: folder.name,
      colorId: folder.colorId,
      color: color?.name || 'grey',
      colorHex: color?.hex || '#C9D1D3',
    });
  };

  public toApi = (): IApiFolderItem => ({
    id: this.id,
    name: this.name,
    colorId: this.colorId,
  });
}
