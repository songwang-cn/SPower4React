import { APanel } from "@/airpower/component"

const Home = () => {
    return (
        <APanel title="首页">
            <p>当前：{import.meta.env.VITE_APP_NAME}</p>
            <p>{import.meta.env.VITE_APP_API_URL}</p>
        </APanel>
    )
}

export default Home