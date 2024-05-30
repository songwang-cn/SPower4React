import { Spin } from 'antd'
import './index.scss'

interface LoadingProps {
    tip?: string
    fullscreen?: boolean
}

const Loading: React.FC<LoadingProps> = ({ fullscreen = false, ...props }) => {
    return (
        <Spin fullscreen={fullscreen} tip={props.tip} />
    )
}

export default Loading