import { ADialog } from '@/airpower/component'
import { useSassVar } from '@/hook/useSass'
import { ColorPicker, Form } from 'antd'
import { useState } from 'react'

export default (props: any) => {
  const [themeForm, changeThemeForm] = useState({
    colorPrimary: useSassVar('--color-primary'),
  })

  function onSure() {
    props.onConfirm(themeForm)
  }

  return (
    <ADialog title="主题配置" onCancel={props.onCancel} onConfirm={onSure}>
      <Form labelCol={{ span: 5 }}>
        <Form.Item label="主题色">
          <ColorPicker
            defaultValue={themeForm.colorPrimary}
            onChange={color =>
              changeThemeForm({ colorPrimary: color.toHexString() })
            }
          />
        </Form.Item>
      </Form>
    </ADialog>
  )
}
