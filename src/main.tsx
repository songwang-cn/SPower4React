// 引入 TS 反射库
import 'reflect-metadata'
// 引入 ES6 垫片
import 'es6-shim'

import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/airpower/assets/css/animation.scss'
import '@/airpower/assets/css/global.scss'
import '@/airpower/assets/iconfont/iconfont.css'
import '@/assets/css/theme.scss'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import ThemeConfig from '@/config/theme.ts'
import AppStore from './store/index.ts'

const StoreContext = createContext(AppStore)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={ThemeConfig}>
      <StoreContext.Provider value={AppStore}>
        <App />
      </StoreContext.Provider>
    </ConfigProvider>
  </React.StrictMode>,
)

setTimeout(() => {
  AppStore.updateAccessToken('7897897897987')
  console.log('updateAccessToken')
}, 5000)
