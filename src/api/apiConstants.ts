import { ContestResponseSchema } from './codechef/interfaces'
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

export function getCodeforcesString (name, id, startTimeSeconds): string {
  const formattedTime = timeConverter(startTimeSeconds)
  return `<a href='https://atcoder.jp/contests/${id}'>${name}</a> starts on ${formattedTime}`
}
export function getCodeChefString (name, href, startTime, startDate): string {
  return `<a href ='${href}'>${name}</a> starts on ${startDate} from ${startTime}`
}
export function getAtcoderString (title, id, startTimeSeconds): string {
  const formattedTime = timeConverter(startTimeSeconds)
  return `<a href='https://atcoder.jp/contests/${id}'>${title.substring(1)}</a> starts on ${formattedTime}`
}

export function codechefFilterUpcoming (i: ContestResponseSchema): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDay()
  const time = today.getHours()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const yearTemp = i.startDate.toString().substring(7)
  const monthTemp = i.startDate.toString().substring(2, 6)
  const dayTemp = i.startDate.toString().substring(0, 2)
  const timeTemp = i.startTime.toString().substring(0, 3)
  const final = (parseInt(timeTemp) >= 12) ? (parseInt(timeTemp) - 12).toString() : timeTemp
  if (year.toString() < yearTemp) {
    return getCodeChefString(i.name, i.href, i.startTime, i.startDate)
  } else if (year.toString() === yearTemp && monthNames[month] < monthTemp) {
    return getCodeChefString(i.name, i.href, i.startTime, i.startDate)
  } else if (year.toString() === yearTemp && monthNames[month] === monthTemp && day.toString() < dayTemp) {
    return getCodeChefString(i.name, i.href, i.startTime, i.startDate)
  } else if (year.toString() === yearTemp && monthNames[month] === monthTemp && day.toString() === dayTemp && time.toString() <= final) {
    return getCodeChefString(i.name, i.href, i.startTime, i.startDate)
  } else {
    return 'Not valid'
  }
}
