import { AButton } from "@/airpower/component"
import { AirRequest } from "@/airpower/dto/AirRequest"
import { AirAlert } from "@/airpower/feedback/AirAlert"
import { AirConfirm } from "@/airpower/feedback/AirConfirm"
import { AppConfig } from "@/config/AppConfig"
import { DeviceEntity } from "@/entity/DeviceEntity"

const componentParty = () => {

    async function _alert() {
        await new AirAlert()
            .setOkText('真的吗')
            .setCancelText('再见')
            .setContent('really')
            .show()
        alert(1)
    }

    console.log(new AirRequest<DeviceEntity>())

    return (
        <div>
            <AButton onClick={_alert}>AirAlert</AButton>
            <AButton onClick={() => new AirConfirm().show()}>AirConfirm</AButton>
            <AButton onClick={() => AppConfig.navigate('/login')}>login</AButton>
        </div >
    )
}

export default componentParty