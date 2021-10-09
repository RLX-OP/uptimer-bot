const UrlsConfig = require("./../../database/models/UrlsConfig");
const { Client, MessageEmbed, Message } = require("discord.js");
const { default_prefix } = require("./../../config.json");

module.exports = {
  name: "projects",
  description: "Shows all of your projects",  
  ownerOnly: false,
  run: async (client, message, args) => {
    const filter = {
      authorID: message.member.user.id,
    };

    let content = [];

    const all = await UrlsConfig.find(filter); 

    var menuEmoji = "<a:tick:879317182721454160>";

    
    var embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${menuEmoji} Your Projects ${menuEmoji}`)
      .setTimestamp();

    var count = 0;

    all.forEach(async (data) => {
      
      count++;
      content.push(`**${count}**. \`${data.projectURL}\``);
    });

    
    if (content.length === 0) {
      
      embed.setDescription(
        `*You don't have any projects Added.*\nAdd one by using: ${default_prefix}add [project Url]`
      );
    } else {
      
      embed.setDescription(content.join("\n"));
    }    
    embed.setFooter("Thanks for using me");

    
    var errors = false;

    
    await message.author.send({ embeds: [embed] }).catch((err) => {
      errors = true;
      if (err.message === "Cannot send messages to this user") {        
        return message.channel.send({ content: `Error: \`Cannot send message to you. please turn on your Dms\`.` });
      }
    });
    if (!errors) {      
      message.channel.send({ content: "Check your DM." });
    }
  },
};
