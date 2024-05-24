
// 获取项目中定义的 Sass 变量
function useSassVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

console.log(useSassVar('--border-radius'))

export default {
    token: {
        colorPrimary: useSassVar('--color-primary'),
        borderRadius: Number(useSassVar('--border-radius').split('px')[0]), //这里的类型只能是 Number，去掉 px 单位
    },
}
