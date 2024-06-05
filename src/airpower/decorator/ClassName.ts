
/**
 * # 自定义类名元数据key
 */
const ClassNameKey = Symbol('ClassNameKey')

/**
 * # 为类标记一个可读名称
 * @param className 类的可读名称
 */
export const ClassName = (className: string) => (target: any) => {
  Reflect.defineMetadata(ClassNameKey, className, target)
}

/**
 * # 获取类的属性可读名称
 * @param target 目标类
 */
export function getClassName(target: any): string {
  return Reflect.getOwnMetadata(ClassNameKey, target) || target.name
}
