  
const db = require('quick.db')
const Discord = require('discord.js')
 let ayarlar = ['aç','kapat']
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send('Hey Bu Ayarı Kullanabilmek İçin `aç` yada `kapat` Yazmalısın.')
  if(!ayarlar.includes(args[0])) return message.channel.send(`Geçerli parametreleri kullanmalısın.\nParametreler: ${ayarlar.join(' - ')}`)
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` Yetkisine Sahip Olmalısın!')
 
  if (args[0] == 'aç') {
    if(db.has(`reklam_${message.guild.id}`)) return message.channel.send(`Sistem zaten açık.`)
    db.set(`reklam_${message.guild.id}`, 'acik')
      message.channel.send('**Reklam Engel Başarıyla Açıldı! `Üyeleri Yasakla` Yetkisine Sahip Olanların Reklamı Engellenmicektir.**')
  }
  if (args[0] == 'kapat') {
        if(!db.has(`reklam_${message.guild.id}`)) return message.channel.send(`Sistem zaten kapalı.`)
    db.delete(`reklam_${message.guild.id}`)
      message.channel.send('**Reklam Engel Başarıyla Kapatıldı! Artık Herkes Reklam Yapabilir.**')
  }
 
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['advertisement','reklam'],
  permLevel: 0
};
 
exports.help = {
  name: 'reklam-engelle',
  description: 'Yapılan Reklamları Engeller',
  usage: '/reklam-engelle'
};