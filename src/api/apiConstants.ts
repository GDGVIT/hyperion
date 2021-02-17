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
  return `${date} ${month} ${year} from ${hour}:${min}`
}

export function getCodeforcesString (name, id, startTimeSeconds): string {
  const formattedTime = timeConverter(startTimeSeconds)
  return `<a href='https://atcoder.jp/contests/${id}'>${name}</a> starts on ${formattedTime}.`
}

export function getCodeChefStringUpcoming (name, code, startDate): string {
  const tempYear = startDate.substring(0, 4)
  const tempDay = startDate.substring(8, 10)
  const tempTime = startDate.substring(11, 16)
  const tempMonth = parseInt(startDate.toString().substring(5, 7))
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let finalMonth = ''
  for (let i = 0; i <= months.length; i++) {
    if (tempMonth === i) {
      finalMonth = months[i]
    }
  }
  return `<a href ='https://www.codechef.com/${code}?itm_campaign=contest_listing'>${name}</a> starts on ${tempDay} ${finalMonth} ${tempYear} from ${tempTime}.`
}

export function getCodeChefStringRunning (name, code, endDate): string {
  const tempYear = endDate.substring(0, 4)
  const tempDay = endDate.substring(8, 10)
  const tempTime = endDate.substring(11, 16)
  const tempMonth = parseInt(endDate.toString().substring(5, 7))
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let finalMonth = ''
  for (let i = 0; i <= months.length; i++) {
    if (tempMonth === i) {
      finalMonth = months[i]
    }
  }
  return `<a href ='https://www.codechef.com/${code}?itm_campaign=contest_listing'>${name}</a> ends on ${tempDay} ${finalMonth} ${tempYear} at ${tempTime}.`
}

export function getAtcoderString (title, id, startTimeSeconds): string {
  const formattedTime = timeConverter(startTimeSeconds)
  return `<a href='https://atcoder.jp/contests/${id}'>${title.substring(1)}</a> starts on ${formattedTime}.`
}

export function getTime (startTimeSeconds): string {
  const formattedTime = timeConverter(startTimeSeconds)
  return formattedTime
}

export function getKickStart (name, startDate, startTime): string {
  return `<a href="https://codingcompetitions.withgoogle.com/kickstart/schedule">${name}</a> on ${startDate} at ${startTime}.`
}
