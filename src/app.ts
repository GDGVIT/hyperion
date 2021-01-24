import { Telegraf } from 'telegraf'
import { upcomingContests } from './api/codeforces/codeforces'
import dotenv from 'dotenv'
import { getCodeforcesString } from './api/constants'
dotenv.config()

const bot = new Telegraf(process.env.TOKEN!)

bot.start((ctx) => ctx.reply('Hey there, good to see you.'))
bot.help((ctx) => ctx.reply('Hello Coder! Type the number corresponding to the site to get the upcoming contest details for the same. \n\n1. Codeforces \n2. Topcoder \n3. Hackerrank \n4. Leetcode'))
// bot.hears('hi', Telegraf.reply('yo'))
// bot.hears('tell me a joke', ({ reply }) => reply('your life.'))

// RESULTS

// Codeforces
bot.hears('1', async (ctx) => {
  const result = await upcomingContests()
  console.log(result.result)
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeforcesString(i.name, i.startTimeSeconds)
  }
  ctx.reply('Upcoming contests on Codeforces: ' + s)
})

// initialise the bot
bot.launch()
