import { Telegraf } from 'telegraf'
import { upcomingContests } from './api/codeforces/codeforces'
import dotenv from 'dotenv'

dotenv.config()

const bot = new Telegraf(process.env.TOKEN!)

bot.start((ctx) => ctx.reply('Hey there, good to see you.'))
bot.help((ctx) => ctx.reply('1. Say "hi" \n2. Say "go" \n3. Say "tell me a joke" '))
bot.hears('hi', Telegraf.reply('yo'))
bot.hears('tell me a joke', ({ reply }) => reply('your life.'))
bot.hears('go', async (ctx) => {
  const result = await upcomingContests()
  console.log(result)
  ctx.reply(JSON.stringify(result))
})

// initialise the bot
bot.launch()
