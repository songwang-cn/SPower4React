import { observable, action } from 'mobx'

class Store {
    @observable accessToken = '123'

    @observable user = {}

    @action
    updateAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }
}

const AppStore = new Store()

export default AppStore