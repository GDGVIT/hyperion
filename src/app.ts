import { Telegraf } from 'telegraf'
import { upcomingContestsCodeforces } from './api/codeforces/codeforces'
import { upcomingContestsCodeChef } from './api/codechef/codechef'
import { upcomingContestsAtcoder } from './api/atcoder/atcoder'
import { getCodeforcesString, getAtcoderString, codechefFilter } from './api/apiConstants'
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
// For Codeforces:
bot.hears('0', (ctx) => {
  const userName = ctx.from.first_name
  const helloText = '<i>Hello</i>, ' + userName + '!'
  return helloText
})
bot.hears('1', async (ctx) => {
  const result = await upcomingContestsCodeforces()
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds)
  }
  ctx.reply(constants.codeForcesReply + s, Extra.HTML())
})

// For Codechef:
bot.hears('2', async (ctx) => {
  const events = await upcomingContestsCodeChef()
  let s = ''
  for (const i of events.result) {
    const str = codechefFilter(i)
    if (str !== 'Not valid') {
      s = s + '\n\n' + codechefFilter(i)
    }
  }
  ctx.reply(constants.codeChefReply + s, Extra.HTML())
})

// For Atcoder:
bot.hears('3', async (ctx) => {
  const events = await upcomingContestsAtcoder()
  let s = ''
  for (const i of events.result) {
    s = s + '\n\n' + getAtcoderString(i.title, i.id, i.startTimeSeconds)
  }
  ctx.reply(constants.atCoderReply + s, Extra.HTML())
})

// Misc all
bot.hears('6', async (ctx) => {
  const eventsCF = await upcomingContestsCodeforces()
  const eventsCC = await upcomingContestsCodeChef()
  const eventsAC = await upcomingContestsAtcoder()
  let resultString = ''
  for (const i of eventsCF.result) {
    resultString = resultString + '\n\n' + getCodeforcesString(i.name, i.id, i.startTimeSeconds)
  }
  for (const i of eventsCC.result) {
    const str = codechefFilter(i)
    if (str !== 'Not valid') {
      resultString = resultString + '\n\n' + codechefFilter(i)
    }
  }
  for (const i of eventsAC.result) {
    resultString = resultString + '\n\n' + getAtcoderString(i.title, i.id, i.startTimeSeconds)
  }
  ctx.reply(constants.miscReply + resultString, Extra.HTML())
})

// Launching the bot
bot.launch()
