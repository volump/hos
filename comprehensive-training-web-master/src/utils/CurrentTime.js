// 获取当天时间
export function getCurrentTime(data) {
  let today = new Date()
  data.appointDate = today
  const year = today.getFullYear()
  const month = today.getMonth()
  const date = today.getDate()
  // 定义早上医生上班时间
  let morningStart = new Date(year, month, date, 8, 30)
  let morningEnd = new Date(year, month, date, 12)
  // 定义医生下午的上班时间
  let afternoonStart = new Date(year, month, date, 14)
  let afternoonEnd = new Date(year, month, date, 18, 30)
  //当前时间在上午8.30-12.00
  if (today > morningStart && today < morningEnd) {
    data.selectTimeID = 1
    data.isTimeTreat = true
  }
  //当前时间在上午14.00-18.00
  else if (today > afternoonStart && today < afternoonEnd) {
    data.selectTimeID = 2
    data.isTimeTreat = true
  }
  //不在规定时间段
  else {
    data.selectTimeID = 2
    data.isTimeTreat = false
  }
}
