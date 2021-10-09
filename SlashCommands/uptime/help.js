const { Client, MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
const { botid } = require("../../config.json");
const { prefix } = require("../../config.json");
module.exports = {
  name: "help",
  description: "Shows all commands of the bot",
  ownerOnly: false,
  run: async (client, interaction, args) => {
   const commands = client.slashCommands
      .filter((c) => c.ownerOnly === false)
      .map((cmd) => `**${cmd.name}** - ${cmd.description}`);

    const contents =
      "Uptimer is a free discord bot that hosts projects 24/7 online.\n\n" +
      commands.sort().join("\n");

    let embed = new MessageEmbed()
      .setTitle("Uptimer bot")
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


    return interaction.followUp({ embeds: [embed], components: [row, row1, row2] });
  },
};
