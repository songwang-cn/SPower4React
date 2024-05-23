
import { lazy, Suspense } from 'react'
import { IRouter } from '../interface/IRouter'

const modules = import.meta.glob('../../view/**/*.tsx')

const LazyLoad = (url?: string) => {
    if (!url) return
    const Module = lazy(modules[`../../view${url}.tsx`] as unknown as any)
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