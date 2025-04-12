import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => ctx.reply('👋 Welcome to the bot!'));
bot.help(ctx => ctx.reply('ℹ️ Send /start to begin.'));

bot.command('echo', ctx => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  ctx.reply(text || '❗ Nothing to echo');
});

bot.on('text', ctx => ctx.reply(`📨 You said: ${ctx.message.text}`));

bot
  .launch()
  .then(() => console.log('🤖 Bot is up and running!'))
  .catch(err => console.error('❌ Bot launch failed:', err));

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
