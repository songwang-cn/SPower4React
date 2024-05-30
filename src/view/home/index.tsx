import { APanel } from "@/airpower/component"

const Home = () => {
    return (
        <APanel title="首页">
            <p>{import.meta.env.VITE_APP_NAME}</p>
            <p>{import.meta.env.VITE_APP_CODE}</p>
            <p>{import.meta.env.VITE_APP_API_URL}</p>
            <p>{import.meta.env.VITE_APP_STATIC_URL}</p>
        </APanel>
    )
}

export default Home