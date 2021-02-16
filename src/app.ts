import { Telegraf } from 'telegraf'
import schedule from 'node-schedule'
import { upcomingContestsCodeforces, runningContestsCodeforces } from './api/codeforces/codeforces'
import { upcomingContestsCodeChef, runningContestsCodeChef } from './api/codechef/codechef'
import { upcomingContestsAtcoder } from './api/atcoder/atcoder'
import { getCodeforcesString, getAtcoderString, getCodeChefStringUpcoming, getCodeChefStringRunning, getTime } from './api/apiConstants'
import { constants } from './constants'
import dotenv from 'dotenv'
import Extra from 'telegraf/extra'
dotenv.config()

let bot
if (process.env.TOKEN != null) {
  bot = new Telegraf(process.env.TOKEN)
} else {
  process.exit(2)
}

bot.start((ctx) => ctx.reply(constants.startMessage))
bot.help((ctx) => ctx.reply(constants.helpMessage))

// RESULTS
bot.hears('0', (ctx) => {
  const userName = ctx.from.first_name
  const helloText = '<i>Hello</i>, ' + userName + '!'
  return helloText
})

// For Codeforces:
bot.command('cf_upcoming', async (ctx) => {
  const result = await upcomingContestsCodeforces()
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds)
  }
  if (s === '') {
    ctx.reply(constants.noContestMessage)
  } else {
    ctx.reply(constants.codeForcesReplyUpcoming + s, Extra.HTML())
  }
})

bot.command('cf_running', async (ctx) => {
  const result = await runningContestsCodeforces()
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds)
  }
  if (s === '') {
    ctx.reply(constants.noContestMessage)
  } else {
    ctx.reply(constants.codeForcesReplyRunning + s, Extra.HTML())
  }
})

// For Codechef:
bot.command('cc_upcoming', async (ctx) => {
  const result = await upcomingContestsCodeChef()
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeChefStringUpcoming(i.name, i.code, i.startDate)
  }
  if (s === '') {
    ctx.reply(constants.noContestMessage)
  } else {
    ctx.reply(constants.codeChefReplyUpcoming + s, Extra.HTML())
  }
})
bot.command('cc_running', async (ctx) => {
  const result = await runningContestsCodeChef()
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeChefStringRunning(i.name, i.code, i.endDate)
  }
  if (s === '') {
    ctx.reply(constants.noContestMessage)
  } else {
    ctx.reply(constants.codeChefReplyRunning + s, Extra.HTML())
  }
})

// For Atcoder:
bot.command('ac_contests', async (ctx) => {
  const events = await upcomingContestsAtcoder()
  let s = ''
  for (const i of events.result) {
    s = s + '\n\n' + getAtcoderString(i.title, i.id, i.startTimeSeconds)
  }
  if (s === '') {
    ctx.reply(constants.noContestMessage)
  } else {
    ctx.reply(constants.atCoderReply + s, Extra.HTML())
  }
})

// Misc all
bot.command('upcoming', async (ctx) => {
  const eventsCF = await upcomingContestsCodeforces()
  const eventsCC = await upcomingContestsCodeChef()
  const eventsAC = await upcomingContestsAtcoder()
  let resultString = ''
  for (const i of eventsCF.result) {
    resultString = resultString + '\n\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds)
  }
  for (const i of eventsCC.result) {
    resultString = resultString + '\n\n' + getCodeChefStringUpcoming(i.name, i.code, i.startDate)
  }
  for (const i of eventsAC.result) {
    resultString = resultString + '\n\n' + getAtcoderString(i.title, i.id, i.startTimeSeconds)
  }
  if (resultString === '') {
    ctx.reply(constants.noContestMessage)
  } else {
    ctx.reply(constants.miscReply + resultString, Extra.HTML())
  }
})

bot.command('running', async (ctx) => {
  const eventsCF = await runningContestsCodeforces()
  const eventsCC = await runningContestsCodeChef()
  let resultString = ''
  for (const i of eventsCF.result) {
    resultString = resultString + '\n\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds)
  }
  for (const i of eventsCC.result) {
    resultString = resultString + '\n\n' + getCodeChefStringRunning(i.name, i.code, i.endDate)
  }
  if (resultString === '') {
    ctx.reply(constants.noContestMessage)
  } else {
    ctx.reply(constants.miscReply + resultString, Extra.HTML())
  }
})

// Editorial
bot.command('sites', (ctx) => ctx.reply(constants.sitesMessage))

// scheduled messages
bot.command('subscribe', async (ctx) => {
  const eventsCodechef = await upcomingContestsCodeChef()
  for (const i of eventsCodechef.result) {
    const yearContest = i.startDate.toString().substring(0, 4)
    const monthContest = parseInt(i.startDate.toString().substring(5, 7))
    const dayContest = i.startDate.toString().substring(8, 10)
    const hoursContest = i.startDate.toString().substring(11, 16)
    const dayPreviousReminder = new Date(parseInt(yearContest), monthContest, parseInt(dayContest) - 1, 10, 0, 0)
    const daySameReminder = new Date(parseInt(yearContest), monthContest, parseInt(dayContest), parseInt(hoursContest) - 1, 0, 0)
    schedule.scheduleJob(dayPreviousReminder, function () {
      ctx.reply('One day before reminder - Codechef\n' + getCodeChefStringUpcoming(i.name, i.code, i.startDate), Extra.HTML())
    })
    schedule.scheduleJob(daySameReminder, function () {
      ctx.reply('One hour before reminder - Codechef\n' + getCodeChefStringUpcoming(i.name, i.code, i.startDate), Extra.HTML())
    })
  }

  const eventsCodeforces = await upcomingContestsCodeforces()
  for (const i of eventsCodeforces.result) {
    const yearContest = getTime(i.startTimeSeconds).substring(6, 11)
    const monthContest = getTime(i.startTimeSeconds).substring(2, 6)
    const dayContest = getTime(i.startTimeSeconds).substring(0, 2)
    const hoursContest = getTime(i.startTimeSeconds).toString().substring(17, 19)
    const d = Date.parse(monthContest + '1, 2021')
    const final = new Date(d).getMonth()
    const dayPreviousReminder = new Date(parseInt(yearContest), final, parseInt(dayContest) - 1, 10, 0, 0)
    const daySameReminder = new Date(parseInt(yearContest), final, parseInt(dayContest), parseInt(hoursContest) - 1, 0, 0)
    schedule.scheduleJob(dayPreviousReminder, function () {
      ctx.reply('One day before reminder - codeForces\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds), Extra.HTML())
    })
    schedule.scheduleJob(daySameReminder, function () {
      ctx.reply('One hour before reminder - Codeforces\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds), Extra.HTML())
    })
  }

  const eventsAtcoder = await upcomingContestsAtcoder()
  for (const i of eventsAtcoder.result) {
    const yearContest = getTime(i.startTimeSeconds).substring(6)
    const monthContest = getTime(i.startTimeSeconds).substring(2, 6)
    const dayContest = getTime(i.startTimeSeconds).substring(0, 2)
    const hoursContest = getTime(i.startTimeSeconds).toString().substring(0, 2)
    const d = Date.parse(monthContest + '1, 2021')
    const final = new Date(d).getMonth()
    const dayPreviousReminder = new Date(parseInt(yearContest), final, parseInt(dayContest) - 1, 10, 0, 0)
    const daySameReminder = new Date(parseInt(yearContest), final, parseInt(dayContest), parseInt(hoursContest) - 1, 0, 0)
    schedule.scheduleJob(dayPreviousReminder, function () {
      ctx.reply('One day before reminder - Atcoder \n' + getAtcoderString(i.title, i.id, i.startTimeSeconds), Extra.HTML())
    })
    schedule.scheduleJob(daySameReminder, function () {
      ctx.reply('One hour before reminder - Atcoder\n' + getAtcoderString(i.title, i.id, i.startTimeSeconds), Extra.HTML())
    })
  }
})

// Launching the bot
bot.launch()
