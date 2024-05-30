import { makeAutoObservable } from 'mobx'
class Store {
    accessToken = '没有token'

    user = {
        userName: 'songwang',
    }
    constructor() {
        /**
         * 使当前对象变为可观察，
         *  makeAutoObservable 对象成员 自动可观察
         *  makeObservable 需要手动添加可观察的 对象成员
         */
        makeAutoObservable(this)
    }

    updateAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }


    updateCurrentUser(user: any) {
        this.user = user
    }
}

const AppStore = new Store()

export { AppStore }