/* eslint-disable no-case-declarations */
import { IValidateRule } from '../interface/IValidateRule'
import { AirInputType } from '../enum/AirInputType'
import { AirNotification } from '../feedback/AirNotification'
import { AirEntity } from '../dto/AirEntity'
import { AirClassTransformerHelper } from './AirClassTransformerHelper'
import { AirValidator } from '../model/AirValidator'
import { AirAbstractService } from '../service/AirAbstractService'

/**
 * # 基础验证类
 * @author Hamm
 */
export class AirValidatorHelper {
  /**
   * # 验证是否手机号或座机号
   * @param phoneNumber 号码
   * @returns 验证结果
   */
  static isTelphoneOrMobilePhone(phoneNumber: string): boolean {
    return this.isMobilePhone(phoneNumber) || this.isTelphone(phoneNumber)
  }

  /**
   * # 验证是否邮箱
   * @param num 邮箱
   * @returns 验证结果
   */
  static isEmail(email: string): boolean {
    return /^[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){0,}@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){1,}$/.test(email)
  }

  /**
   * # 验证是否手机号里
   * @param num 号码
   * @returns 验证结果
   */
  static isMobilePhone(num: string): boolean {
    return /^(\+(\d{1,4})){0,1}1[3-9](\d{9})$/.test(num)
  }

  /**
   * # 验证是否座机号
   * @param num 号码
   * @returns 验证结果
   */
  static isTelphone(num: string): boolean {
    return /^(((0\d{2,3})-){0,1}((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4})){0,1})$/.test(num)
  }

  /**
   * # 已弃用
   * 建议使用 ```AirValidatorHelper.validate()``` 替代
   */
  static isNormalCode(str: string): boolean {
    return /^[@#%a-zA-Z0-9\u4e00-\u9fa5_\-\\/\\+]+$/.test(str)
  }

  /**
   * # 是否是纯汉字
   *
   * @param str 字符串
   * @returns 验证结果
   */
  static isChinese(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.CHINESE}]+$`).test(str)
    // return /^[\u4e00-\u9fa5]+$/.test(str)
  }

  /**
   * # 字符串是否只包含了字母
   * @param str 字符串
   * @returns 验证结果
   */
  static isOnlyLetter(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.LETTER}]+$`).test(str)
    // return /^[a-zA-Z]+$/.test(str)
  }

  /**
   * # 字符串是否只包含了数字
   * @param str 字符串
   * @returns 验证结果
   */
  static isOnlyNumberAndLetter(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.LETTER + AirInputType.NUMBER}]+$`).test(str)
    // return /^[0-9a-zA-Z]+$/.test(str)
  }

  /**
   * # 字符串是否是数字 正负整数小数和0
   * @param str 字符串
   * @returns 验证结果
   */
  static isNumber(str: string): boolean {
    return /^(-){0,1}[0-9]+((.)[0-9]+){0,1}$/.test(str)
  }

  /**
   * # 字符串是否是整数
   * @param str 字符串
   * @returns 验证结果
   */
  static isInteger(str: string): boolean {
    return /^(-){0,1}[0-9]+$/.test(str)
  }

  /**
   * # 字符串是否是自然整数小数
   * @param str 字符串
   * @returns 验证结果
   */
  static isNaturalNumber(str: string): boolean {
    return /^[0-9]+((.)[0-9]+){0,1}$/.test(str)
  }

  /**
   * # 字符串是否是自然整数数
   * @param str 字符串
   * @returns 验证结果
   */
  static isNaturalInteger(str: string): boolean {
    return /^[0-9]+$/.test(str)
  }

  /**
   * # 字符串是否是合法身份证
   * @param str 字符串
   * @returns 验证结果
   */
  static isChineseIdCard(str: string): boolean {
    if (str.length !== 18 && str.length !== 15) {
      return false
    }
    switch (str.length) {
      case 18:
        const year = parseInt(str.substring(6), 10)
        if (year > new Date().getFullYear() || year < 1900) {
          return false
        }
        const month = parseInt(str.substring(10, 12), 10)
        if (month > 12 || month < 1) {
          return false
        }
        const day = parseInt(str.substring(12, 14), 10)
        if (day > 31 || month < 1) {
          return false
        }
        const arr: Array<Array<unknown>> = [[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]]
        let sum = 0
        for (let i = 0; i < 17; i += 1) {
          sum += parseInt(str[i], 10) * parseInt(arr[0][i] as string, 10)
        }
        // eslint-disable-next-line eqeqeq
        if (arr[1][(sum % 11)] == str[17]) {
          return true
        }
        break
      case 15:
        // 15位省份证校验
        const reg = /^[1-9]\d{5}((\d{2}(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[13456789]|1[012])(0[1-9]|[12][0-9]|30))|(02(0[1-9]|1[0-9]|2[0-8]))))|(((0[48]|[2468][048]|[13579][26])|(00))0229))\d{2}[0-9Xx]$/
        if (reg.test(str)) {
          return true
        }
        break
      default:
    }

    return false
  }

  /**
   * # 是否满足如下的规则
   * @param str 被验证字符串
   * @param list 验证器
   */
  static validate(str: string, ...list: AirInputType[]) {
    let regString = ''
    for (let i = 0; i < list.length; i += 1) {
      regString += list[i]
    }
    try {
      return new RegExp(String.raw`^[${regString}]+$`).test(str)
    } catch (e) {
      AirNotification.error('开发者自己的正则都写错了...')
      return false
    }
  }

  /**
   * # 创建一个验证器
   * @param rule 验证规则
   * @returns
   */
  static create(rule: IValidateRule): IValidateRule {
    return rule
  }

  /**
   * # 创建验证器
   * @param service 接口服务对象
   * @param formRules [可选]表单验证规则
   */
  static createRules<T extends AirEntity, S extends AirAbstractService<T>>(form: T, service: S, formRules: IValidateRule = {}) {
    const entity = AirClassTransformerHelper.newInstance(service.entityClass)
    const formFieldList = entity.getFormFieldConfigList()
    for (let i = 0; i < formFieldList.length; i += 1) {
      const config = formFieldList[i]
      const fieldKey = config.key
      const fieldName = entity.getCustomFieldName(fieldKey)
      if (!formRules[fieldKey]) {
        formRules[fieldKey] = []
      }
      if (config.isRequired) {
        (formRules[fieldKey]).push(AirValidator.show(typeof config.isRequired === 'string' ? config.isRequired : `${fieldName}为必填项`).ifEmpty())
      }
      if (config.isRequiredNumber) {
        (formRules[fieldKey]).push(AirValidator.show(typeof config.isRequiredNumber === 'string' ? config.isRequiredNumber : `${fieldName}为必填项`).toNumber().ifEmpty())
      }
      if (config.minLength) {
        (formRules[fieldKey]).push(AirValidator.show(`${fieldName}长度至少${config.minLength}位`).ifLengthLessThan(config.minLength))
      }
      if (config.isNumber) {
        if (config.min) {
          (formRules[fieldKey]).push(AirValidator.show(`${fieldName}不能小于${config.min}`).ifLessThan(config.min))
        }
        if (config.max) {
          (formRules[fieldKey]).push(AirValidator.show(`${fieldName}不能超过${config.max}`).ifGreaterThan(config.max))
        }
      }
      if (config.isChinese) {
        (formRules[fieldKey]).push(AirValidator.show(typeof config.isChinese === 'string' ? config.isChinese : `${fieldName}只允许输入中文汉字`).ifNotChinese())
      }
      if (config.isTelPhone) {
        (formRules[fieldKey]).push(AirValidator.show(typeof config.isTelPhone === 'string' ? config.isTelPhone : `${fieldName}不是有效的座机电话`).ifNotTelPhone())
      }
      if (config.isMobilePhone) {
        (formRules[fieldKey]).push(AirValidator.show(typeof config.isMobilePhone === 'string' ? config.isMobilePhone : '不是有效的手机号码').ifNotMobilePhone())
      }
      if (config.isPhone) {
        (formRules[fieldKey]).push(AirValidator.show(typeof config.isPhone === 'string' ? config.isPhone : '不是有效的联系电话').ifNotPhone())
      }
      if (config.isEmail) {
        (formRules[fieldKey]).push(AirValidator.show(typeof config.isEmail === 'string' ? config.isEmail : '不是有效的邮箱地址').ifNotEmail())
      }
      if (config.regExp) {
        (formRules[fieldKey]).push(AirValidator.show(`${fieldName}不符合验证规则`).ifNotTest(config.regExp))
      }
      if (config.isUnique) {
        (formRules[fieldKey]).push(
          // eslint-disable-next-line @typescript-eslint/ban-types, no-loop-func
          AirValidator.show('').whenBlur().setCustomValidator(async (_: unknown, value: string, callback: Function) => {
            if (!value) {
              callback()
              return
            }
            try {
              const existId = await service.findExistId(fieldKey, value)
              if (!existId) {
                callback()
                return
              }
              // 查到了ID
              if ((form && existId === form.id)) {
                // 没有查询到ID 或者查到了ID但是当前修改的ID
                callback()
                return
              }
              callback(typeof config.isUnique === 'string' ? config.isUnique : '该条记录已存在, 请重新输入')
            } catch (e) {
              callback()
            }
          }),
        )
      }
    }
    return formRules
  }
}
