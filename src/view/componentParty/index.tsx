import { AButton } from "@/airpower/component"
import { AirAlert } from "@/airpower/feedback/AirAlert"
import { AirNotification } from "@/airpower/feedback/AirNotification"

const componentParty = () => {

    function onAlert() {
        AirAlert.warning(<AButton type="primary">你在干什么?</AButton>, '提示')
    }

    return (
        <div>
            <AButton onClick={onAlert}>AirAlert</AButton>
            <AButton onClick={() => AirNotification.success(<AButton type="primary">123</AButton>, '提示')}>AirNotification</AButton>
        </div>
    )
}

export default componentParty