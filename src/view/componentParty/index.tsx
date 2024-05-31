import { AButton } from "@/airpower/component"
import { AirAlert } from "@/airpower/feedback/AirAlert"
import { AirConfirm } from "@/airpower/feedback/AirConfirm"

const componentParty = () => {

    async function _alert() {
        await new AirAlert()
            .setOkText('真的吗')
            .setCancelText('再见')
            .setContent('really')
            .show()
        alert(1)
    }

    return (
        <div>
            <AButton onClick={_alert}>AirAlert</AButton>
            <AButton onClick={() => new AirConfirm().show()}>AirConfirm</AButton>
        </div >
    )
}

export default componentParty