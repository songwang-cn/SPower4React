import { useState, useEffect } from "react";
import { AirEntity } from "../dto/AirEntity";
import { DialogHelper } from "../helper/DialogHelper";
import { ClassConstructor } from "class-transformer";
import { AirNotification } from "../feedback/AirNotification";
import { AirRequest } from "../dto/AirRequest";
import { AirResponse } from "../dto/AirResponse";
import { AirClassTransformerHelper } from "../helper/AirClassTransformerHelper";
import { AirPage } from "../dto/AirPage";
import { AirAbstractService } from "../service/AirAbstractService";
import { DeviceEntity } from "@/entity/DeviceEntity";

interface IUseTableOption<E extends AirEntity> {
  detailView?: JSX.Element;
  editView?: JSX.Element;
  addView?: JSX.Element;
  afterGetPage?: (response: AirResponse<E>) => void;
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

export const useTableHook = <
  E extends AirEntity,
  S extends AirAbstractService<E>,
>(
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option?: IUseTableOption<E>
) => {
  const service = AirClassTransformerHelper.newInstance(serviceClass);

  function onDetail(row: E) {
    DialogHelper.show(option?.detailView!, row.copy());
  }

  async function onEdit(row: E) {
    await DialogHelper.show(option?.editView!, row);
    getPage();
  }

  async function onAdd() {
    await DialogHelper.show(option?.addView! || option?.editView!);
    getPage();
  }

  async function onDelete(row: E) {
    await service.deleteById(row.id!, "删除成功");
    getPage();
  }

  function onPageChange(page: AirPage) {
    setRequest(request.setPage(page));
  }

  function onSearch(param: E) {
    console.log("onSearch", param);
    setRequest(request.setQueryParams(param));
  }

  const [request, setRequest] = useState(new AirRequest<E>());

  const [response, setResponse] = useState(new AirResponse<E>());

  const [isLoading, setLoading] = useState(false);

  async function getPage() {
    setLoading(true);
    // setResponse(await service.getPage(request))
    setResponse({
        "total": 18,
        "currentPage": 1,
        "currentPageSize": 20,
        "items": [
            {
                "createdBy": "企业管理员",
                "createdTime": 1719904645989,
                "updatedBy": "企业管理员",
                "updatedTime": 1719904645989,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "搅拌蒸馏装置",
                "code": "Devi2407020002",
                "tags": [],
                "id": 4227140177807872,
                "isProduceDevice": true,
                "isEnergyDevice": false,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": false,
                "isScrapped": false,
                "storageLocation": 4135112527563264,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697436957944,
                    "updatedBy": "普通员工",
                    "updatedTime": 1698890820715,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "饮料车间",
                    "code": "TR0098",
                    "id": 4135112527563264,
                    "parentId": 4135112438864384,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697707445380,
                "updatedBy": "企业管理员",
                "updatedTime": 1718182811319,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "网关设备",
                "code": "Devi2310190004",
                "tags": [],
                "id": 4136220444183040,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "maintenanceType": null
            },
            {
                "createdBy": "管理员",
                "createdTime": 1698130906787,
                "updatedBy": "普通员工",
                "updatedTime": 1705037296238,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "网关设备02",
                "code": "Devi2310240002",
                "tags": [],
                "id": 4137954942036480,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": false,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": true,
                "iconUrl": "",
                "isScrapped": false,
                "storageLocation": 4137951632910848,
                "maintenanceType": 1,
                "path": "4137951632910848",
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1698130098896,
                    "updatedBy": "管理员",
                    "updatedTime": 1698130098900,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "BDD车间",
                    "code": "BaFa2310240001",
                    "id": 4137951632910848,
                    "parentId": 0,
                    "dna": "4137951632910848",
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697443187915,
                "updatedBy": "企业管理员",
                "updatedTime": 1704867222675,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "干燥设备",
                "code": "Devi2310160003",
                "tags": [],
                "id": 4135138045524480,
                "isProduceDevice": true,
                "isEnergyDevice": false,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135118153947648,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697438331573,
                    "updatedBy": "管理员",
                    "updatedTime": 1698033440541,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "熟食车间",
                    "code": "BaFa231016001898",
                    "id": 4135118153947648,
                    "parentId": 4135112438864384,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1698201302412,
                "updatedBy": "企业管理员",
                "updatedTime": 1704183726740,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "123",
                "code": "Devi2310250001",
                "tags": [],
                "id": 4138243282516480,
                "isProduceDevice": true,
                "isEnergyDevice": false,
                "isDataCollectionDevice": false,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": false,
                "isScrapped": false,
                "storageLocation": 4137951632910848,
                "maintenanceType": 1,
                "path": "4137951632910848",
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1698130098896,
                    "updatedBy": "管理员",
                    "updatedTime": 1698130098900,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "BDD车间",
                    "code": "BaFa2310240001",
                    "id": 4137951632910848,
                    "parentId": 0,
                    "dna": "4137951632910848",
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1698745801876,
                "updatedBy": "管理员",
                "updatedTime": 1698745801876,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "测试003",
                "code": "00003",
                "tags": [],
                "id": 4140473552316928,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4140354984200704,
                "maintenanceType": null,
                "path": "4135112438864384,4137951719315968,4137951783324160,4140354984200704",
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1698716854582,
                    "updatedBy": "管理员",
                    "updatedTime": 1698716854586,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "qlTest",
                    "code": "00011",
                    "id": 4140354984200704,
                    "parentId": 4137951783324160,
                    "dna": "4135112438864384,4137951719315968,4137951783324160,4140354984200704",
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1698745779255,
                "updatedBy": "管理员",
                "updatedTime": 1698745779255,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "测试002",
                "code": "00002",
                "tags": [],
                "id": 4140473459735040,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4140354984200704,
                "maintenanceType": null,
                "path": "4135112438864384,4137951719315968,4137951783324160,4140354984200704",
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1698716854582,
                    "updatedBy": "管理员",
                    "updatedTime": 1698716854586,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "qlTest",
                    "code": "00011",
                    "id": 4140354984200704,
                    "parentId": 4137951783324160,
                    "dna": "4135112438864384,4137951719315968,4137951783324160,4140354984200704",
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1698717068435,
                "updatedBy": "管理员",
                "updatedTime": 1698717068435,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "戚磊测试",
                "code": "00008",
                "tags": [],
                "id": 4140355860142592,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4140354984200704,
                "maintenanceType": 1,
                "path": "4135112438864384,4137951719315968,4137951783324160,4140354984200704",
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1698716854582,
                    "updatedBy": "管理员",
                    "updatedTime": 1698716854586,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "qlTest",
                    "code": "00011",
                    "id": 4140354984200704,
                    "parentId": 4137951783324160,
                    "dna": "4135112438864384,4137951719315968,4137951783324160,4140354984200704",
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697687150902,
                "updatedBy": "管理员",
                "updatedTime": 1698305619329,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "测试top设备",
                "code": "Devi2310190001",
                "tags": [],
                "id": 4136137317997056,
                "isProduceDevice": false,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": false,
                "isScrapped": false,
                "storageLocation": 4135117495491072,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697438170817,
                    "updatedBy": "管理员",
                    "updatedTime": 1697769302590,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "加工2厂3333333333333333",
                    "code": "BaFa23101600111",
                    "id": 4135117495491072,
                    "parentId": 0,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697443192162,
                "updatedBy": "管理员",
                "updatedTime": 1698285650337,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "烘干设备就会收到就好和撒娇等哈就哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 哈",
                "code": "Devi2310160007顶顶顶！@#￥%……&*（）——~！@#￥顶顶顶顶顶顶顶顶顶顶",
                "tags": [],
                "id": 4135138062920192,
                "isProduceDevice": false,
                "isEnergyDevice": false,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135112527563264,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697436957944,
                    "updatedBy": "普通员工",
                    "updatedTime": 1698890820715,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "饮料车间",
                    "code": "TR0098",
                    "id": 4135112527563264,
                    "parentId": 4135112438864384,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697687168133,
                "updatedBy": "管理员",
                "updatedTime": 1698138974462,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "测试top设备1",
                "code": "Devi2310190002",
                "tags": [],
                "id": 4136137388509696,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135117495491072,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697438170817,
                    "updatedBy": "管理员",
                    "updatedTime": 1697769302590,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "加工2厂3333333333333333",
                    "code": "BaFa23101600111",
                    "id": 4135117495491072,
                    "parentId": 0,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1698130172889,
                "updatedBy": "管理员",
                "updatedTime": 1698130223381,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "BDD溴化锂机组",
                "code": "Devi2310240001",
                "tags": [],
                "id": 4137951935986176,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": true,
                "isProductionMonitoring": true,
                "iconUrl": "bug001/industrialhub/2023/10/24/e7a8150e62624352a6862386fea2f53d.png",
                "isScrapped": false,
                "storageLocation": 4137951783324160,
                "maintenanceType": null,
                "path": "4135112438864384,4137951719315968,4137951783324160",
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1698130135618,
                    "updatedBy": "管理员",
                    "updatedTime": 1698130135621,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "BDD01产线",
                    "code": "BaFa2310240003",
                    "id": 4137951783324160,
                    "parentId": 4137951719315968,
                    "dna": "4135112438864384,4137951719315968,4137951783324160",
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697616900361,
                "updatedBy": "管理员",
                "updatedTime": 1698127965328,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "灌装设备02",
                "code": "Devi2310180001",
                "tags": [],
                "id": 4135849571711488,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135118283184640,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697438363125,
                    "updatedBy": "管理员",
                    "updatedTime": 1699257002592,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "豆制品",
                    "code": "   ",
                    "id": 4135118283184640,
                    "parentId": 4135118153947648,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697443096018,
                "updatedBy": "管理员",
                "updatedTime": 1698125299974,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "烘干设备",
                "code": "Devi2310160002",
                "tags": [],
                "id": 4135137669114368,
                "isProduceDevice": false,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": false,
                "isScrapped": false,
                "storageLocation": 4135118283184640,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697438363125,
                    "updatedBy": "管理员",
                    "updatedTime": 1699257002592,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "豆制品",
                    "code": "   ",
                    "id": 4135118283184640,
                    "parentId": 4135118153947648,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697443189098,
                "updatedBy": "管理员",
                "updatedTime": 1697788845425,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "杀菌设备",
                "code": "Devi2310160004",
                "tags": [],
                "id": 4135138050370048,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135112527563264,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697436957944,
                    "updatedBy": "普通员工",
                    "updatedTime": 1698890820715,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "饮料车间",
                    "code": "TR0098",
                    "id": 4135112527563264,
                    "parentId": 4135112438864384,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697443191186,
                "updatedBy": "管理员",
                "updatedTime": 1697788835980,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "烘干设备",
                "code": "Devi2310160006",
                "tags": [],
                "id": 4135138058922496,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": true,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135112527563264,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697436957944,
                    "updatedBy": "普通员工",
                    "updatedTime": 1698890820715,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "饮料车间",
                    "code": "TR0098",
                    "id": 4135112527563264,
                    "parentId": 4135112438864384,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697443190141,
                "updatedBy": "管理员",
                "updatedTime": 1697788778862,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "灌装设备",
                "code": "Devi2310160005",
                "tags": [],
                "id": 4135138054642176,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": false,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135112527563264,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697436957944,
                    "updatedBy": "普通员工",
                    "updatedTime": 1698890820715,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "饮料车间",
                    "code": "TR0098",
                    "id": 4135112527563264,
                    "parentId": 4135112438864384,
                    "tagsStr": "",
                    "orderNum": 0
                }
            },
            {
                "createdBy": "管理员",
                "createdTime": 1697443193180,
                "updatedBy": "管理员",
                "updatedTime": 1697788762606,
                "remark": "",
                "tenantId": 4135065701841408,
                "tenantCode": "bug001",
                "name": "    4热无法v",
                "code": "       ",
                "tags": [],
                "id": 4135138067089920,
                "isProduceDevice": true,
                "isEnergyDevice": true,
                "isDataCollectionDevice": false,
                "isMaintenanceDevice": false,
                "isProductionMonitoring": true,
                "isScrapped": false,
                "storageLocation": 4135112527563264,
                "maintenanceType": null,
                "factoryModelInfo": {
                    "createdBy": "管理员",
                    "createdTime": 1697436957944,
                    "updatedBy": "普通员工",
                    "updatedTime": 1698890820715,
                    "remark": "",
                    "tenantId": 4135065701841408,
                    "tenantCode": "bug001",
                    "name": "饮料车间",
                    "code": "TR0098",
                    "id": 4135112527563264,
                    "parentId": 4135112438864384,
                    "tagsStr": "",
                    "orderNum": 0
                }
            }
        ] as unknown as E[]
    } as AirResponse<E>);
    setLoading(false);
  }

  useEffect(() => {
    getPage();
  }, [request]);

  return {
    isLoading,
    request,
    response,
    onSearch,
    onPageChange,
    onDetail,
    onAdd,
    onEdit,
    onDelete,
    getPage,
  };
};
