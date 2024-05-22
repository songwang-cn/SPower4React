import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@/airpower/assets/css/global.scss'
import '@/airpower/assets/iconfont/iconfont.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import ThemeConfig from '@/config/theme.ts'


export class DialogHelper {

    /**
     * @param component 需要渲染的弹窗组件 Dialog
     */
    async build(component: React.FC, param: any): Promise<void> {

        const dom = document.createElement('div')

        return new Promise((resolve, reject) => {
            const props = {
                onCancel: () => {
                    document.body.removeChild(dom)
                    reject()
                },
                onConfirm: (res: any) => {
                    document.body.removeChild(dom)
                    resolve(res)
                },
            }
            ReactDOM.createRoot(dom).render(
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
    static async show(component: React.FC, param?: any) {
        return new this().build(component, param)
    }
}