import { AirEntity } from '../dto/AirEntity'

/**
 * # 文件标准格式接口
 * @author Hamm
 */
export interface IFile extends AirEntity {
  /**
   * # 文件的相对路径
   * 可以调用 ```AirFileHelper.getStaticFileUrl()``` 获取文件的真实地址
   */
  url: string

  /**
   * # 文件名称
   */
  fileName?: string

  /**
   * # 文件的大小
   * 可以调用 ```AirFileHelper.getFileSizeFriendly()``` 获取文件的可读大小
   */
  size?: number

  /**
   * # 文件的类型
   */
  fileType?: string
}
