import { ADialog, AGroup } from '@/airpower/component'
import { useSassVar } from '@/hook/useSass'
import { ColorPicker, Form, Slider } from 'antd'
import { useState } from 'react'

export default (props: any) => {
  const [themeForm, changeThemeForm] = useState({
    colorPrimary: useSassVar('--color-primary'),
    borderRadius: useSassVar('--border-radius'),
  })

  function onSure() {
    props.onConfirm(themeForm)
  }

  return (
    <ADialog title="主题配置" onCancel={props.onCancel} onConfirm={onSure}>
      <Form labelCol={{ span: 5 }}>
        <AGroup columns={2} hideTitle>
          <Form.Item label="主题色">
            <ColorPicker
              defaultValue={themeForm.colorPrimary}
              onChange={color =>
                changeThemeForm({
                  ...themeForm,
                  colorPrimary: color.toHexString(),
                })
              }
            />
          </Form.Item>
          <Form.Item label="圆角">
            <Slider
              defaultValue={Number(themeForm.borderRadius.split('px')[0])}
              onChange={percent =>
                changeThemeForm({
                  ...themeForm,
                  borderRadius: percent + 'px',
                })
              }
            />
          </Form.Item>
        </AGroup>
      </Form>
    </ADialog>
  )
}
