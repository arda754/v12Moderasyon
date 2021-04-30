const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client ,message, args) =>{
if(args[0] === 'aç') {
    db.set(`kufur_${message.guild.id}`, "acik")
    message.channel.send('**Başarılı Şekilde Küfür Engel `Aktif` Edildi.**')
  return
}
if (args[0] === 'kapat') {
  db.delete(`kufur_${message.guild.id}`)
message.channel.send('**Başarılı Şekilde Küfür Engel `Deaktif` Edildi.**')
return
}
  message.channel.send('Lüten `Aktif` yada `Deaktif` Yazın!')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['küfür'],
 permLevel: 0
};

exports.help = {
 name: 'küfür aç',
 description: 'Yapılan Küfürü Engeller',
 usage: '/küfür aç'
};