//vue3中使用方法调用或计算属性来替换过滤器
export function getGender(gender) {
  if (gender === 1) {
    return '男'
  }
  return '女'
}

// 获取就诊时间
export function getTreatTimeNoon(num) {
  if (num === 1) {
    return '08:30~12:00'
  } else {
    return '14:00~18:00'
  }
}

// 有两种状态，若是status为’date‘则是单单获取日期，若是status为’time‘则还需要时间
export function dateTime(date, status) {
  const getDate = new Date(date)
  const year = getDate.getFullYear()
  const month = turnDouble(getDate.getMonth() + 1)
  const cDate = turnDouble(getDate.getDate())

  if (status === 'date') {
    return year + '-' + month + '-' + cDate
  } else if (status === 'time') {
    const hour = turnDouble(getDate.getHours())
    const minutes = turnDouble(getDate.getMinutes())
    const seconds = turnDouble(getDate.getSeconds())
    return (
      year +
      '-' +
      month +
      '-' +
      cDate +
      '  ' +
      hour +
      ':' +
      minutes +
      ':' +
      seconds
    )
  }
}

function turnDouble(num) {
  // 假如长度为2
  if (num >= 10) {
    return num
  } else {
    // 否则在前面加0
    return '0' + num
  }
}
