import { useSassVar } from '@/hook/useSass'

export const useTheme = () => ({
  token: {
    colorPrimary:
      localStorage.getItem('--color-primary') || useSassVar('--color-primary'),
    borderRadius: Number(useSassVar('--border-radius').split('px')[0]), //这里的类型只能是 Number，去掉 px 单位
  },
})
