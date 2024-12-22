const mineflayer = require('mineflayer');

let bot = null;

function getRandomName() {
  const prefix = "ADX_";
  const maxLength = 12 - prefix.length;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let randomPart = "";

  for (let i = 0; i < maxLength; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return prefix + randomPart;
}

function createBot() {
  if (bot) {
    console.log("Bot đã tồn tại, đang cố gắng kết nối lại...");
    return;  
  }

  bot = mineflayer.createBot({
    host: 'sidzai3.aternos.me',
    port: 35840,
    username: getRandomName(),
    version: false,
    auth: 'mojang'
  });

  bot.on('kicked', (reason) => {
    console.log(`Bot bị kick: ${reason}`);
    bot = null;  
    setTimeout(createBot, 2000); 
  });

  bot.on('end', () => {
    console.log("Bot mất kết nối, đang khởi động lại...");
    bot = null;  
    setTimeout(createBot, 2000); 
  });

  bot.on('error', (err) => {
    console.log(`Lỗi: ${err.message}`);
  });

  bot.on('login', () => {
    console.log(`Bot đã đăng nhập với tên: ${bot.username}`);
  });
  
  bot.on('chat', (username, message) => {
    console.log(`[${username}]: ${message}`);
  });
  
  bot.on('message', (message) => {
    console.log(`[SERVER]: ${message.toString()}`);
  });
}

createBot();