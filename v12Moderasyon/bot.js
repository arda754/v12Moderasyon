const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
const db2 = require('wio.db');
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags')
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


// mod log 

client.on("guildMemberAdd", async member => {
    let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
      if (!kanal) return;  
      var bera = member.guild.owner
      if (member.user.bot === true) {
         if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
        let ber = new Discord.MessageEmbed()
          .setColor("GOLD")
          .setThumbnail(member.user.avatarURL())
          .setDescription(`**${member.user.tag}** (${member.id}) Adlı Bota Giriş İzni Verildi Eğer Kaldırmak İstiyorsanız **?!bot-izni kaldır (BOT ID)**.`);
        bera.send(ber);
         } else {
           let izinverilmemişbot = new Discord.MessageEmbed()
          .setColor("GOLD")
          .setThumbnail(member.user.avatarURL())
          .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "Adlı Bot Sunucuya Eklendi ve Banladım Eğer İzin Vermek İstiyorsanız **?!bot-izni ver (BOT ID)**")
          member.guild.members.ban(member, { reason : "Anti Raid Açık Kanka" }) 
           bera.send(izinverilmemişbot)
    }
      }
    });
    
    
    //MOD LOG
    client.on('channelCreate', async channel => {
      const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
      if (!c) return;
        var embed = new Discord.MessageEmbed()
                        .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n► ID: ${channel.id}`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
        c.send(embed)
    });
    
    client.on('channelDelete', async channel => {
      const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
      if (!c) return;
        let embed = new Discord.MessageEmbed()
                        .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n��� ID: ${channel.id}`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    
        c.send(embed)
    });
    
       client.on('channelNameUpdate', async channel => {
      const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
      if (!c) return;
        var embed = new Discord.MessageEmbed()
                        .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n► ID: ${channel.id}`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
        c.send(embed)
    });
    
    client.on('emojiCreate', emoji => {
      const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
      if (!c) return;
    
        let embed = new Discord.MessageEmbed()
                        .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)
    
        c.send(embed)
        });
    client.on('emojiDelete', emoji => {
      const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
      if (!c) return;
    
        let embed = new Discord.MessageEmbed()
                        .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)
    
        c.send(embed)
        });
    client.on('emojiUpdate', (oldEmoji, newEmoji) => {
      const c = newEmoji.guild.channels.cache.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
      if (!c) return;
    
        let embed = new Discord.MessageEmbed()
                        .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)
    
        c.send(embed)
        });
    
    client.on('guildBanAdd', async (guild, user) => {    
        const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
      if (!channel) return;
      
      const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    
        let embed = new Discord.MessageEmbed()
                        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                        .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)
    
        channel.send(embed)
    });
    
    client.on('guildBanRemove', async (guild, user) => {    
        const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
      if (!channel) return;
      
      const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    
        let embed = new Discord.MessageEmbed()
                        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                        .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)
    
        channel.send(embed)
    });
    client.on('messageDelete', async message => {    
      if(message.author.bot) return
    
        const channel = message.guild.channels.cache.get(db.fetch(`codeminglog_${message.guild.id}`));
      if (!channel) return;
      
        let embed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                        .setTitle("Mesaj silindi")                
                        .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                      //  .addField(`Kanal:`,`${message.channel.name}`)
                        .setTimestamp()
                        .setColor("GOLD")
                        .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)
    
        channel.send(embed)
    });
    
    client.on('messageUpdate', async(oldMessage, newMessage) => {
        if(oldMessage.author.bot) return;
        if(oldMessage.content == newMessage.content) return;
    
        const channel = oldMessage.guild.channels.cache.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
        if(!channel) return;
    
        let embed = new Discord.MessageEmbed()
        .setTitle("Mesaj güncellendi!")
        .addField("Eski mesaj : ",`${oldMessage.content}`)
        .addField("Yeni mesaj : ",`${newMessage.content}`)
        .addField("Kanal : ",`${oldMessage.channel.name}`)
        .setTimestamp()
        .setColor("GOLD")
        .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)
    
        channel.send(embed)
    });
    
    client.on('roleCreate', async (role) => {    
    
        const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
      if (!channel) return;
      
        let embed = new Discord.MessageEmbed()
    .addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
    .setTimestamp()
    .setColor("GOLD")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)
    
        channel.send(embed)
    });
    
    client.on('roleDelete', async (role) => {    
    
        const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
      if (!channel) return;
      
        let embed = new Discord.MessageEmbed()
    .addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
    .setTimestamp()
    .setColor("GOLD")
        .addField("Rol renk kodu : ",`${role.hexColor}`)
    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)
    
        channel.send(embed)
    })







// Küfür engel

client.on("message", async msg => {
  
  
    const i = await db.fetch(`kufur_${msg.guild.id}`)
       if (i == "acik") {
           const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
           if (kufur.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                             
                         return msg.reply('**Bu Sunucuda Küfür Filtresi Aktiftir.**')
               }              
             } catch(err) {
               console.log(err);
             }
           }
       }
       if (!i) return;
   });
   
   client.on("messageUpdate", (oldMessage, newMessage) => {
     
     
    const i = db.fetch(`${oldMessage.guild.id}.kufur`)
       if (i) {
           const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
           if (kufur.some(word => newMessage.content.includes(word))) {
             try {
               if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                     oldMessage.delete();
                             
                         return oldMessage.reply('**Bu Sunucuda Küfür Filtresi Aktiftir.**')
               }              
             } catch(err) {
               console.log(err);
             }
           }
       }
       if (!i) return;
   });

   // Küfür engel


// Reklam engel

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

//REKLAM ENGEL
client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('**Bu Sunucuda** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem İzin Vermem ? !**').then(msg => msg.delete(3000));
   
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });

    // Reklam engel