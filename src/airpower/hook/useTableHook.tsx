import { DeviceEntity } from "@/entity/DeviceEntity"
import { useState, useRef, useEffect } from "react"
import { AirEntity } from "../dto/AirEntity"
import { DialogHelper } from "../helper/DialogHelper"
import { ClassConstructor } from "class-transformer"
import { AirNotification } from "../feedback/AirNotification"
import { AirRequest } from "../dto/AirRequest"
import { AirResponse } from "../dto/AirResponse"
import { AirClassTransformerHelper } from "../helper/AirClassTransformerHelper"
import { AirPage } from "../dto/AirPage"
import { AirAbstractService } from "../service/AirAbstractService"

interface IUseTableOption<E extends AirEntity> {
    detailView?: React.FC,
    editView?: React.FC,
    afterGetPage?: (response: AirResponse<E>) => void
}

/**
 * UseTable 😄 表格自定义Hook 
 * @param entityClass 实体类
 * @param serviceClass 请求类
 * @param option 其他选项 IUseTableOption
 * @returns isLoading:是否正在加载，
 * @returns response:请求返回
 * @returns onPageChange:分页变化
 * @returns onDelete:删除
 * @returns onEdit:编辑
 * @returns onDetail:详情
 */

export const useTableHook = <E extends AirEntity, S extends AirAbstractService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option?: IUseTableOption<E>) => {

    const service = AirClassTransformerHelper.newInstance(serviceClass)


    function onDetail(row: E) {
        DialogHelper.show(option?.detailView, row.copy())
    }

    function onEdit(row: DeviceEntity) {
        DialogHelper.show(option?.editView, row)
    }

    function onDelete(row: DeviceEntity) {
        console.log('删除')
        AirNotification.warning('深处')
    }

    function onPageChange(page: AirPage) {
        setRequest(request.setPage(page))
    }

    const [request, setRequest] = useState(new AirRequest<E>(entityClass))

    const [response, setResponse] = useState(new AirResponse<E>())

    const [isLoading, setLoading] = useState(false)

    async function getPage() {
        setLoading(true)
        /* const res = await service.getPage(request)
        res.items.map(v => v.type = [1, 2, 3][Math.ceil(Math.random() * 2)]) */
        setResponse({
            "total": 30,
            "currentPage": 2,
            "currentPageSize": 20,
            "items": [
                {
                    "createdBy": "Hmm",
                    "createdTime": 1696988702821,
                    "updatedTime": 1696988702801,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "机加车间设备",
                    "code": "Devi2310110001",
                    "tags": [],
                    "id": 4133276474579456,
                    "isProduceDevice": true,
                    "isEnergyDevice": true,
                    "isDataCollectionDevice": true,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": true,
                    "isScrapped": false,
                    "storageLocation": 4101121565764096,
                    "maintenanceType": null,
                    "path": "4101121565764096",
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1689138383286,
                        "updatedBy": "Hmm",
                        "updatedTime": 1697527246626,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "机加车间",
                        "code": "BaFa2307120001",
                        "id": 4101121565764096,
                        "parentId": 0,
                        "tagsStr": "",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1692087891001,
                    "updatedBy": "企业超管",
                    "updatedTime": 1696821829967,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "123",
                    "code": "Devi2308150002",
                    "tags": [],
                    "id": 4113202749364736,
                    "isProduceDevice": true,
                    "isEnergyDevice": true,
                    "isDataCollectionDevice": true,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": true,
                    "isScrapped": false,
                    "storageLocation": 4101121660975616,
                    "maintenanceType": null,
                    "path": "4101121565764096,4101121660975616",
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1689138406531,
                        "updatedBy": "Hmm",
                        "updatedTime": 1697527254718,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "夹具",
                        "code": "BaFa2307120002",
                        "id": 4101121660975616,
                        "parentId": 4101121565764096,
                        "tagsStr": "",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1686219233843,
                    "updatedBy": "企业超管",
                    "updatedTime": 1693375611520,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "123",
                    "code": "BaDe2306080002",
                    "tags": [],
                    "id": 4089164729645568,
                    "isProduceDevice": false,
                    "isEnergyDevice": true,
                    "isDataCollectionDevice": true,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "isScrapped": false,
                    "storageLocation": 4101121660975616,
                    "maintenanceType": null,
                    "path": "4101121565764096,4101121660975616",
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1689138406531,
                        "updatedBy": "Hmm",
                        "updatedTime": 1697527254718,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "夹具",
                        "code": "BaFa2307120002",
                        "id": 4101121660975616,
                        "parentId": 4101121565764096,
                        "tagsStr": "",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1685944449361,
                    "updatedBy": "企业超管",
                    "updatedTime": 1693375535026,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "粉体搅拌机",
                    "code": "BaDe2306050002",
                    "tags": [],
                    "id": 4088039212407296,
                    "isProduceDevice": false,
                    "isEnergyDevice": false,
                    "isDataCollectionDevice": false,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "iconUrl": "demo/common/2023/06/05/e080a814448d4ec28a2024dbbe06ca2d.png",
                    "isScrapped": false,
                    "storageLocation": 4101121565764096,
                    "maintenanceType": null,
                    "path": "4101121565764096",
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1689138383286,
                        "updatedBy": "Hmm",
                        "updatedTime": 1697527246626,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "机加车间",
                        "code": "BaFa2307120001",
                        "id": 4101121565764096,
                        "parentId": 0,
                        "tagsStr": "",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1685945221826,
                    "updatedBy": "企业超管",
                    "updatedTime": 1693292434101,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "切割机",
                    "code": "BaDe2306050005",
                    "tags": [],
                    "id": 4088042376423936,
                    "isProduceDevice": false,
                    "isEnergyDevice": false,
                    "isDataCollectionDevice": false,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "iconUrl": "demo/common/2023/06/05/71d9842bb7cb42bead237dcfb9bbfba1.png",
                    "isScrapped": false,
                    "storageLocation": 4088036291729920,
                    "maintenanceType": null,
                    "path": "4088036291729920",
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1685943736305,
                        "updatedBy": "企业超管",
                        "updatedTime": 1688020793226,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "造纸车间",
                        "code": "BaFa2306050001",
                        "id": 4088036291729920,
                        "parentId": 0,
                        "dna": "4088036291729920",
                        "tagsStr": "BaDi2306090018,",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1692087199181,
                    "updatedBy": "企业超管",
                    "updatedTime": 1692089173981,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "ee",
                    "code": "Devi2308150001",
                    "tags": [],
                    "id": 4113199915670016,
                    "deviceSpc": "222",
                    "isProduceDevice": false,
                    "isEnergyDevice": false,
                    "isDataCollectionDevice": false,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "iconUrl": "demo/common/2023/06/05/282184147a68464e96666db92321d1eb.png",
                    "isScrapped": false,
                    "parentId": 4091618749086208,
                    "storageLocation": 4088036291729920,
                    "maintenanceType": null,
                    "path": "4088036291729920",
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1685943736305,
                        "updatedBy": "企业超管",
                        "updatedTime": 1688020793226,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "造纸车间",
                        "code": "BaFa2306050001",
                        "id": 4088036291729920,
                        "parentId": 0,
                        "dna": "4088036291729920",
                        "tagsStr": "BaDi2306090018,",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1691120102170,
                    "updatedBy": "企业超管",
                    "updatedTime": 1692064238283,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "dfhd",
                    "code": "Devi2308040001",
                    "tags": [],
                    "id": 4109238686312960,
                    "isProduceDevice": false,
                    "isEnergyDevice": false,
                    "isDataCollectionDevice": false,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "isScrapped": false,
                    "maintenanceType": null
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1685944974986,
                    "updatedTime": 1690878840707,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "高速混合机",
                    "code": "BaDe2306050003",
                    "tags": [],
                    "id": 4088041365367296,
                    "isProduceDevice": false,
                    "isEnergyDevice": false,
                    "isDataCollectionDevice": false,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "iconUrl": "demo/common/2023/06/05/282184147a68464e96666db92321d1eb.png",
                    "isScrapped": false,
                    "storageLocation": 4088037819206144,
                    "maintenanceType": null,
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1685944109224,
                        "updatedBy": "企业超管",
                        "updatedTime": 1686878833097,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "产线一",
                        "code": "BaFa2306050002",
                        "id": 4088037819206144,
                        "parentId": 4088036291729920,
                        "dna": "4088036291729920,4088037819206144",
                        "tagsStr": "",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1685954071634,
                    "updatedTime": 1690878784591,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "磨浆机",
                    "code": "BaDe2306080001",
                    "tags": [],
                    "id": 4088078625237504,
                    "isProduceDevice": false,
                    "isEnergyDevice": false,
                    "isDataCollectionDevice": false,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "iconUrl": "",
                    "isScrapped": false,
                    "storageLocation": 4088036291729920,
                    "maintenanceType": null,
                    "factoryModelInfo": {
                        "createdBy": "企业超管",
                        "createdTime": 1685943736305,
                        "updatedBy": "企业超管",
                        "updatedTime": 1688020793226,
                        "remark": "",
                        "tenantId": 1001,
                        "tenantCode": "demo",
                        "name": "造纸车间",
                        "code": "BaFa2306050001",
                        "id": 4088036291729920,
                        "parentId": 0,
                        "dna": "4088036291729920",
                        "tagsStr": "BaDi2306090018,",
                        "orderNum": 0
                    }
                },
                {
                    "createdBy": "企业超管",
                    "createdTime": 1685608347256,
                    "updatedTime": 1690878737392,
                    "remark": "",
                    "tenantId": 1001,
                    "tenantCode": "demo",
                    "name": "aaa",
                    "code": "BaDe2306010021",
                    "tags": [],
                    "id": 4086662538185216,
                    "isProduceDevice": false,
                    "isEnergyDevice": false,
                    "isDataCollectionDevice": false,
                    "isMaintenanceDevice": false,
                    "isProductionMonitoring": false,
                    "isScrapped": false,
                    "maintenanceType": null
                }
            ]
        })
        setLoading(false)
    }

    useEffect(() => {
        getPage()
    }, [request])

    return {
        isLoading,
        request,
        response,
        onPageChange,
        onDetail,
        onEdit,
        onDelete,
        getPage
    }
}