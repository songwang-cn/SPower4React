import { Expose } from 'class-transformer'
import { IFile } from '../interface/IFile'
import { AirEntity } from './AirEntity'

/**
 * # 文件实体类
 * @author Hamm
 */
export class AirFileEntity extends AirEntity implements IFile {
  @Expose() url!: string
}
