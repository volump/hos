//成功或者错误的弹窗
import { ElNotification } from 'element-plus'
export function tips(type, message) {
  if (type == 'success') {
    ElNotification({
      title: '消息提示：成功',
      message: message,
      type: 'success'
    })
  } else if (type == 'error') {
    ElNotification({
      title: '消息提示：发生错误',
      message: message,
      type: 'warning'
    })
  } else if (type == 'warning') {
    ElNotification({
      title: '消息提示',
      message: message,
      type: 'warning'
    })
  }
}
