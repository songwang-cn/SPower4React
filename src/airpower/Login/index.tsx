import './index.scss'
import { Input, Form, Button } from "antd"
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    function onLogin() {
        navigate('/')
    }

    return (
        <div className="airLogin">
            <div className="form">
                <Form labelCol={{ span: 6 }} labelAlign='right'>
                    <Form.Item label="租户编码"  >
                        <Input />
                    </Form.Item>
                    <Form.Item label="用户名">
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码">
                        <Input />
                    </Form.Item>
                </Form>
                <Button onClick={onLogin}>登录</Button>
            </div>
        </div>
    )
}

export default Login