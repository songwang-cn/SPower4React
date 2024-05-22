
import { lazy, Suspense } from 'react'
import { IRouter } from '../interface/IRouter'

const modules = import.meta.glob('../../view/**/*.tsx')

console.log('modules', modules)

console.log('../../view/device/list.tsx', modules['../../view/device/list.tsx'])

const LazyLoad = (url?: string) => {
    if (!url) return
    const Module = lazy(() => new Promise((resolve) => import(/* @vite-ignore */ `../../view${url}.tsx`).then(_ => resolve(_))))
    return (
        <Suspense>
            <Module />
        </Suspense>
    )
}

export class RouterHelper {

    routes: IRouter[] = []

    static initRoute(menuList: IRouter[]) {
        menuList.map(route => {
            if (route.children && route.children.length) {
                this.initRoute(route.children)
            } else {
                route.element = LazyLoad(route.component)
            }
        })
        return menuList
    }

}