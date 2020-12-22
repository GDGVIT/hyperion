const { Telegraf } = require('telegraf')
require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN)

bot.start((ctx) => ctx.reply('Hey there Abdeali, good to see you.'))
bot.help((ctx) => ctx.reply('1. Say "hi" \n2. Ask me "howdy" \n3. Say "tell me a joke" \n4. Send me a sticker'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('howdy', Telegraf.reply("i'm killin' it"))
bot.hears('tell me a joke', ({ reply }) => reply('your life.'))
bot.launch()
