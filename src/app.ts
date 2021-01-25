import { Telegraf } from 'telegraf'
import { upcomingContests } from './api/codeforces/codeforces'
import { getCodeforcesString } from './api/apiConstants'
import { constants } from './constants'
import dotenv from 'dotenv'
dotenv.config()

const bot = new Telegraf(process.env.TOKEN!)

bot.start((ctx) => ctx.reply(constants.startMessage))
bot.help((ctx) => ctx.reply(constants.helpMessage))

// RESULTS
// For Codeforces:
bot.hears('1', async (ctx) => {
  const result = await upcomingContests()
  console.log(result.result)
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeforcesString(i.name, i.startTimeSeconds)
  }
  ctx.reply(constants.codeforcesReply + s)
})

// For Topcoder:

// Launching the bot
bot.launch()
