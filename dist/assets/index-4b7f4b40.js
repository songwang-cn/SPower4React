import{j as n,A as o}from"./index-9b9e66e0.js";import{A as r,B as e,a as i,b as s}from"./AirRequest-ede39835.js";const c=()=>{async function t(){await new s().setOkText("真的吗").setCancelText("再见").setContent("really").show(),alert(1)}return console.log(new r),n.jsxs("div",{children:[n.jsx(e,{onClick:t,children:"AirAlert"}),n.jsx(e,{onClick:()=>new i().show(),children:"AirConfirm"}),n.jsx(e,{onClick:()=>o.navigate("/login"),children:"login"})]})};export{c as default};