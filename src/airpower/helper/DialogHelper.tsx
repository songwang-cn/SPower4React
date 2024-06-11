import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@/airpower/assets/css/global.scss'
import '@/airpower/assets/iconfont/iconfont.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import ThemeConfig from '@/config/theme.ts'


export const useDialog = () => {

    /**
     * @param component 需要渲染的弹窗组件 Dialog
     */
    const build = (component: React.FC, param: any): Promise<void> => {

        const dom = document.createElement('div')

        return new Promise((resolve, reject) => {

            const root = ReactDOM.createRoot(dom)

            const props = {
                onCancel: () => {
                    root.unmount()
                    document.body.removeChild(dom)
                    reject()
                },
                onConfirm: (res: any) => {
                    root.unmount()
                    document.body.removeChild(dom)
                    resolve(res)
                },
            }

            root.render(
                <StrictMode {...props}>
                    <ConfigProvider locale={zhCN} theme={ThemeConfig}>
                        {
                            component({
                                param,
                                onCancel: props.onCancel,
                                onConfirm: props.onConfirm
                            })
                        }
                    </ConfigProvider>
                </StrictMode >
            )

            document.body.appendChild(dom)
        })
    }

    /**
    * @param component 需要渲染的弹窗组件 Dialog
    */
    const open = (component: React.FC, param?: any) => {
        return build(component, param)
    }

    return { open }
}