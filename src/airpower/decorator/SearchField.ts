
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { AirModel } from '../model/AirModel'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'

const SearchFieldKey = Symbol('SearchFieldKey')

const SearchFieldConfigKey = Symbol('SearchFieldConfigKey')
export const SearchField = <E extends AirModel>(searchFieldConfig?: ISearchFieldConfig) => (target: E, key: string) => {
    const list = Reflect.getOwnMetadata(SearchFieldKey, target) || []
    list.push(key)
    Reflect.defineMetadata(SearchFieldKey, list, target)
    Reflect.defineMetadata(SearchFieldConfigKey, searchFieldConfig, target, key)
}

export function getSearchFieldList<E extends AirModel>(target: E) {
    let list = Reflect.getOwnMetadata(SearchFieldKey, target) || []
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name !== AirModel.name) {
        list = list.concat(getSearchFieldList(superClass))
    }
    return list
}

export function getSearchFieldConfig<E extends AirModel>(target: E, fieldKey: string) {
    let config = Reflect.getOwnMetadata(SearchFieldConfigKey, target, fieldKey) || {}
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name !== AirModel.name) {
        config = Object.assign(getSearchFieldConfig(superClass, fieldKey), config)
    }
    return Object.assign(new AirSearchFieldConfig(), config)
}