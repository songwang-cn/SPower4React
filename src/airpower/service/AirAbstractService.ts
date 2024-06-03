/* eslint-disable no-unused-vars */
import { ClassConstructor } from 'class-transformer'
import { Ref } from 'react'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirHttp } from '../model/AirHttp'
import { AirRequest } from '../dto/AirRequest'
import { AirEntity } from '../dto/AirEntity'
import { AirResponse } from '../dto/AirResponse'
import { AirValidatorHelper } from '../helper/AirValidatorHelper'
import { IValidateRule } from '../interface/IValidateRule'
import { AirModel } from '../model/AirModel'
import { AppConfig } from '@/config/AppConfig'

/**
 * # 💡 Service泛型基类
 * @author Hamm
 */
export abstract class AirAbstractService<E extends AirEntity> extends AirModel {
  /**
   * # 为父类Service提供转换的实体类
   */
  abstract entityClass: ClassConstructor<E>

  /**
   * # API目录地址
   */
  abstract baseUrl: string;

  /**
   * # Loading的ref对象
   */
  loading!: Ref<boolean>

  /**
   * # 获取一个Service实例
   * @param loading [可选]Loading的Ref对象
   */
  constructor(loading?: Ref<boolean>) {
    super()
    if (loading) {
      this.loading = loading
    }
  }

  /**
   * # 发起一个API网络请求
   * @param url 请求的API地址
   * @param customBaseUrl [可选]API地址前缀,无需```/```结尾
   */
  api(url: string, customBaseUrl?: string): AirHttp {
    if (customBaseUrl) {
      url = `${customBaseUrl}/${url}`
    } else {
      url = `${this.baseUrl}/${url}`
    }
    if (this.loading) {
      return new AirHttp(url).setLoading(this.loading)
    }
    return new AirHttp(url)
  }

  /**
   * # 查询分页数据
   * @param request 请求对象
   */
  async getPage(request: AirRequest<E>): Promise<AirResponse<E>> {
    const result = await this.api('page').post(request.toJson())
    const response = AirClassTransformerHelper.parse(result, AirResponse)
    response.items = response.items.map((item) => AirClassTransformerHelper.parse(item, this.entityClass))
    return response as AirResponse<E>
  }

  /**
   * # 查询所有数据
   * @param request 请求对象
   */
  async getAll(request: AirRequest<E>): Promise<E[]> {
    request.exclude('page')
    const result = await this.api('list').post(request.toJson())
    return AirClassTransformerHelper.parseArray(result, this.entityClass)
  }

  /**
   * # 查询树结构数据数组
   * @param request 请求对象
   */
  async getTreeList(request: AirRequest<E>): Promise<E[]> {
    const newRequest = request.copy().exclude('page')
    const result = await this.api('treeList').post(newRequest.toJson())
    return AirClassTransformerHelper.parseArray(result, this.entityClass)
  }

  /**
   * # 根据ID获取详情对象
   * @param id ID
   */
  async getDetail(id: number): Promise<E> {
    const result: Record<string, unknown> = await this.api('get').post(new AirEntity(id))
    return AirClassTransformerHelper.parse(result, this.entityClass)
  }

  /**
   * # 保存一条新的数据
   * @param data 保存的数据
   * @param message [可选]新增成功的消息提示内容
   * @param title [可选]新增成功的消息提示标题 默认 '新增成功'
   * @returns 保存成功后的主键ID
   */
  async saveData<E extends AirEntity>(data: E, message = '', title = '新增成功'): Promise<number> {
    const result: Record<string, unknown> = await this.api('save').post(data.toJson())
    if (message || title) {
      new AirNotification().setTitle(title)
        .setMessage(AppConfig.showHttpSuccessMsg ? message : '')
        .success()
    }
    return result.id as number
  }

  /**
   * # 修改一条数据
   * @param data 修改的数据实体
   * @param message [可选]修改成功的消息提示内容
   * @param title [可选]修改成功的消息提示标题 默认 '修改成功'
   */
  async updateData<E extends AirEntity>(data: E, message = '', title = '修改成功'): Promise<void> {
    await this.api('update').post(data.toJson())
    if (message || title) {
      new AirNotification().setTitle(title)
        .setMessage(AppConfig.showHttpSuccessMsg ? message : '')
        .success()
    }
  }

  /**
   * # 保存或更新一条数据
   * ---
   * ### 如果 ```data``` 中包含 ```id``` 则更新, 否则新增
   * @param data 数据实体
   * @param message [可选]修改成功的消息提示内容
   * @param title [可选]修改成功的消息提示标题 默认 '操作成功'
   */
  async saveOrUpdate<E extends AirEntity>(data: E, message?: string, title = '操作成功'): Promise<number> {
    if (data.id) {
      await this.updateData(data, message, title)
      return data.id
    }
    return this.saveData(data, message, title)
  }

  /**
   * # 根据ID删除一条数据
   * @param id 删除的数据ID
   * @param message [可选]删除成功的消息提示内容
   * @param title [可选]删除成功的消息提示标题 默认 '删除成功'
   */
  async deleteById(id: number, message?: string, title = '删除成功'): Promise<void> {
    await this.deleteByIds([id], message, title)
  }

  /**
   * # 根据ID数组批量删除数据
   * @param ids 删除的数据ID数组
   * @param message [可选]删除成功的消息提示内容
   * @param title [可选]删除成功的消息提示标题 默认 '删除成功'
   */
  async deleteByIds(ids: number[], message = '', title = '删除成功'): Promise<void> {
    await this.api('delete').withOutError()
      .post(ids.map((id) => (new AirEntity(id))))
      .then(() => {
        if (message || title) {
          new AirNotification().setTitle(title)
            .setMessage(AppConfig.showHttpSuccessMsg ? message : '')
            .success()
        }
      })
      .catch((err) => {
        // new AirAlert()
        //   .setTitle('删除失败')
        //   .setContent(err.message)
        //   .setConfirmText('确定')
        //   .error()
        new AirNotification().setTitle('删除失败').error(err.message)
      })
  }

  /**
   * # 创建一个Service实例
   * @param loading [可选]Loading的Ref对象
   */
  static create<T>(this: new () => T, loading?: Ref<boolean>): T {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    /**
     * 修复一个bug， assign合并两个对象 ，之前写的 loading， 所以通过 create静态方法创建的service 页面上 loading 无效果
     */
    return Object.assign(new this(), { loading }) as T
  }

  /**
   * # 获取指定类的baseUrl
   */
  static getBaseUrl<T>(this: new () => T): string {
    return (new this() as AirAbstractService<AirEntity>).baseUrl
  }

  /**
   * # 通过指定的key查询ID
   * @param key Key
   * @param value Value
   */
  async findExistId(key: string, value: string): Promise<number> {
    const airHttp = this.api(`findByKeyIsExist?key=${key}&value=${value}`).withOutError()
    try {
      const json = await airHttp.post()
      return json as number
    } catch (e) {
      throw new Error()
    }
  }

  /**
   * # 创建验证器
   * @param form 表单对象
   * @param moreRule [可选] 更多的验证规则
   */
  static createValidateRules<E extends AirEntity>(form: E, moreRule: IValidateRule = {}) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return AirValidatorHelper.createRules(form, this.newInstance(), moreRule)
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  /**
   * ! 内部使用 请勿调用
   * @deprecated
   */
  createValidateRules<E extends AirEntity>(form: E, moreRule: IValidateRule = {}) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return AirValidatorHelper.createRules(form, this, moreRule)
  }
}
