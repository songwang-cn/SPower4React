export interface IRouter {
    name: string
    path?: string
    element?: JSX.Element
    icon?: string
    component?: string
    children?: IRouter[]
}