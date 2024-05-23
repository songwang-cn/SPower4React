import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/airpower/assets/css/animation.scss'
import '@/airpower/assets/css/global.scss'
import '@/airpower/assets/css/theme.scss'
import '@/airpower/assets/iconfont/iconfont.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import ThemeConfig from '@/config/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={ThemeConfig}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
