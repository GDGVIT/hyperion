function addZero (i): string {
  if (i < 10) {
    i = '0' + i
  }
  return i
}
function timeConverter (unixTimestamp): string {
  const a = new Date(unixTimestamp * 1000)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const year = a.getFullYear()
  const month = months[a.getMonth()]
  const date = a.getDate()
  const hour = addZero(a.getHours())
  const min = addZero(a.getMinutes())
  const sec = addZero(a.getSeconds())
  return `${date} ${month} ${year} from ${hour}:${min}:${sec}.`
}

export function getCodeforcesString (name, startTimeSeconds): string {
  const formattedTime = timeConverter(startTimeSeconds)
  return `${name} starts on ${formattedTime}`
}
export function getCodeChefString (name, href, startTime, startDate): string {
  return `<a href ='${href}'>${name}</a> starts on ${startDate} from ${startTime}`
}
export function getAtcoderString (title, id, startTimeSeconds): string {
  const formattedTime = timeConverter(startTimeSeconds)
  return `<a href='https://atcoder.jp/contests/${id}'>${title.substring(1)}</a> starts on ${formattedTime}`
}
