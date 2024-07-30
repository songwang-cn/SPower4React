// 引入 TS 反射库
import 'reflect-metadata'
// 引入 ES6 垫片
import 'es6-shim'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/airpower/assets/css/animation.scss'
import '@/airpower/assets/css/global.scss'
import '@/airpower/assets/iconfont/iconfont.css'
import '@/assets/css/theme.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
