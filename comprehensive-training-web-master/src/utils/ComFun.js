//记录一些简单显示功能例如加载动画等等
import { ElLoading } from 'element-plus'
let loading = null
//Loading显示
export function LoadingOpen() {
  loading = ElLoading.service({
    lock: true,
    text: '正在加载，请稍后',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
//发生错误要等待一会Loading关闭
export function LoadingClose_later() {
  setTimeout(() => {
    loading.close()
  }, 1800)
}
//直接响应立即关闭
export function LoadingClose_immed() {
  loading.close()
}
