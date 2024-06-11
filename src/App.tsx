import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './config/router'
import { ConfigProvider } from 'antd'
import { useContext, useLayoutEffect } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'

function RouterView() {
  return useRoutes(routes)
}

const App = () => {

  const { locale, theme } = useContext(ConfigProvider.ConfigContext);

  /**
   * 😱
   * 静态方法调用的组件的主题适配补丁
   * Modal.xxx, Alert.xxx, Message.xxx ...
   */
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: (children) => (
        <StyleProvider hashPriority="high">
          <ConfigProvider prefixCls="static" iconPrefixCls="icon" locale={locale} theme={theme}>
            {children}
          </ConfigProvider>
        </StyleProvider>
      ),
    });
  }, [locale, theme]);

  return (
    <BrowserRouter>
      <RouterView />
    </BrowserRouter>
  )

}

export default App
