// 获取项目中定义的 Sass 变量
export function useSassVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}