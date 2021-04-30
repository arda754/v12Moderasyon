const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

  
const yardım = new Discord.MessageEmbed()
.setColor('RED')
.setTitle(`**Yardım Menüsü**`)

.setDescription(`**Mindless #Code Moderasyon**

:tools: **\`Moderasyon Komutları\`**

:tools: **\`${prefix}modlog\`: Log Kanalını Ayarlarsınız.**

:tools: **\`${prefix}ban <user>\`: Kişiyi Sunucudan Banlar.**

:tools: **\`${prefix}küfür aç\`: Küfürü engellersiniz.**

:tools: **\`${prefix}say\`: Üye sayısını gösterir.**

:tools: **\`${prefix}sohbet-aç/kapat\`: Sohbeti Açar/Kapatır.**

:tools: **\`${prefix}reklam-engelle aç\`: Reklam Engellemeyi Açar/Kapatır.**

:tools: **\`${prefix}kurallar\`: Kural atar.**

:tools: **\`${prefix}avatar\`: Avatarınızı gösterir.**

:tools: **\`${prefix}kilit süre\`: Chate kilitlersiniz.**

:tools: **\`${prefix}ban-log\`: Ban-log ayarlarsınız.**

:tools: **\`${prefix}normal-sunucu-kur\`: Public sunucu kurar.**
`)







.setFooter(`Mindless Code Kardeşim`)
message.channel.send(yardım)
  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["yardım", "yardım menü"], 
  permLevel: 0
};

exports.help = {
  name: "yardımm",
  description: 'Yardım Menüsü',
  usage: 'yardım'
};