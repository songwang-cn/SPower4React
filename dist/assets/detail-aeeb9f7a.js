import{r as n,bg as e,bq as l}from"./index-83662eaa.js";import{D as h,e as j,G as d,d as u}from"./DeviceService-9214c083.js";const g=a=>{var s,i,r,c;const[t,m]=n.useState(new h),[f,o]=n.useState(!1);async function x(){o(!0),m(await new u().getDetail(a.param.id)),o(!1)}return n.useEffect(()=>{x()},[]),e.jsx(j,{loading:f,title:"详情",onCancel:a.onCancel,onConfirm:a.onConfirm,hideFooter:!0,children:e.jsxs(l,{colon:!0,labelCol:{span:6},children:[e.jsxs(d,{columns:3,title:"基础信息",children:[e.jsx(l.Item,{label:"设备名称",children:t.name}),e.jsx(l.Item,{label:"设备编码",children:t.code}),e.jsx(l.Item,{label:"设备位置",children:(s=t.factoryModelInfo)==null?void 0:s.name}),e.jsx(l.Item,{label:"设备位置",children:(i=t.factoryModelInfo)==null?void 0:i.name})]}),e.jsxs(d,{columns:3,title:"设备信息",children:[e.jsx(l.Item,{label:"设备名称",children:t.name}),e.jsx(l.Item,{label:"设备编码",children:t.code}),e.jsx(l.Item,{label:"设备位置",children:(r=t.factoryModelInfo)==null?void 0:r.name}),e.jsx(l.Item,{label:"设备位置",children:(c=t.factoryModelInfo)==null?void 0:c.name})]})]})})};export{g as default};
