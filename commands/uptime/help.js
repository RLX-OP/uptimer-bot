const { Client, MessageEmbed, Message, MessageActionRow,MessageButton } = require("discord.js");
const { prefix, botid } = require("./../../config.json");

module.exports = {
  name: "help",
  description: "Shows all commands of the bot",
  ownerOnly: false,
  run: async (client, message, args) => {
    let youtube_sub = "https://youtube.com/channel/UCrqGsp8-fPxzK4-E2EOpe9A";

    const commands = client.commands
      .filter((c) => c.ownerOnly === false)
      .map((cmd) => `**${prefix}${cmd.name}** - ${cmd.description}`);

    const contents =
      "Uptimer is a free discord bot that hosts projects 24/7 online.\n\n" +
      commands.sort().join("\n");

    let embed = new MessageEmbed()
      .setTitle("Here are my commands")
      .setDescription(contents)
      .setColor("RANDOM")
      .setFooter(`Prefix: "${prefix}"`)
      .setThumbnail(client.user.displayAvatarURL())      
      .setTimestamp();
          
          const row = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot%20applications.commands`)
        .setLabel("INVITE")
            .setStyle("LINK")
    )
          const row1 = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.gg/drmBRDjb4d`)
        .setLabel("SUPPORT SERVER")
            .setStyle("LINK")
    )
          const row2 = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://youtube.com/channel/UC3YKZAmjRJJMTUsYbhiAOAA`)
        .setLabel("SUBSCRIBE")
            .setStyle("LINK")
    )

    return message.channel.send({ embeds: [embed], components: [row, row1, row2] });
  },
};
