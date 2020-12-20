/* const { Telegraf } = require('telegraf')
const express = require('express')

const bot = new Telegraf(process.env.TOKEN)
// Set the bot response
bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hack the World.</b>'))

// Set telegram webhook
// lt --port 3000
bot.telegram.setWebhook('https://----.localtunnel.me/start')

const app = express()
app.get('/', (req, res) => res.send('Hack the World.'))
// Set the bot API endpoint
app.use(bot.webhookCallback('/start'))
app.listen(3000, () => {
  console.log('Listening on 3000...')
}) */
const { Telegraf } = require('telegraf')
require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN)

bot.start((ctx) => ctx.reply('Hey there Abdeali, good to see you.'))
bot.help((ctx) => ctx.reply('1. Say "hi" \n2. Ask me "howdy" \n3. Say "tell me a joke" \n4. Send me a sticker'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('howdy', Telegraf.reply("i'm killin' it"))
bot.hears('tell me a joke', ({ reply }) => reply('your life.'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

// launch bot
bot.launch()
