const Discord = require("discord.js");


exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || message.author  
  
const exampleEmbed = new Discord.MessageEmbed()
 .setColor("WHİTE")
 .setDescription(`• Kurallar •
**Reklam**
• Sözlü Reklamlar, Link ile Reklam, Özelden Reklam, Resim ile Reklam vb Şekilde Reklamlar Yapmak Yasaktır.
**Küfür, Argo, Hakaret**
• Her kanalda küfür etmek ve argo kullanmak yasaktır.
• Üyelere karşı hakaret etmek ve dalga geçme yasaktır.
**Yetkililer ve Yetki**
• Yetki istemek yasaktır.
• Yetkili alımları ile ilgili soru sormak yasaktır.
• Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.
• Yetkililere saygılı olun.
**Spam, Flood, Etiketleme**
• Spam Yapmak Yasaktır.
• Bir Kelimeyi Sürekli Bir Mesajda Yazmak Yasaktır.
• Flood Yapmak Alt Alta Sürekli Yazmak Yasaktır.
• Bir Üyeyi Sürekli @etiketlemek Yasaktır.
**Din, Siyaset, Cinsellik**
• Din ile İlgili Konuşmak, Tartışmak, Kullanıcı Adlarını Din ile İlgili Koymak Yasaktır.
• Siyaset ile İlgili Konuşmak, Tartışmak, Kullanıcı Adlarını Siyaset ile İlgili Koymak Yasaktır.
• 18+ Fotoğraflar Paylaşmak ve Konuşmak yasaktır.
**Kavga, Tartışmak**
• Kavga Etmek, Kavgaya Dahil Olmak ve Tartışmak Yasaktır.
• Herhangi Bir Sorununuz Varsa Yetkiliye Danışınız.`)
//.setImage("https://tenor.com/view/kurallar-just-follow-the-rules-gif-15657985")
  message.channel.send(exampleEmbed)
  
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kurallar',
  description: 'Kurallar Metnini Atar',
  usage: '/kurallar'
}; 