import { AButton } from "@/airpower/component"
import { AirAlert } from "@/airpower/feedback/AirAlert"
import { AirConfirm } from "@/airpower/feedback/AirConfirm"
import { AppStore } from "@/store"

const componentParty = () => {

    return (
        <div>
            <AButton onClick={() => AirAlert.warning('123', '123')}>AirAlert</AButton>
            <AButton onClick={() => AirConfirm.show('123', '123')}>AirConfirm</AButton>
            <AButton onClick={() => AppStore.updateLoading()}>AirLoading</AButton>
        </div >
    )
}

export default componentParty