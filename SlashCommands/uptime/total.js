const UrlsConfig = require("./../../database/models/UrlsConfig");
const { Client, MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "total",
  description: "Shows all projects",
        ownerOnly: false,
  run: async (client, interaction, args) => {
    UrlsConfig.countDocuments(
      { authorID: interaction.member.user.id },
      async function (err, total) {        
        return interaction.followUp({ embeds: [new MessageEmbed().setTitle(`<a:blinkinghearts:879380824305319947> Uptimer Bot Total Projects <a:blinkinghearts:879380824305319947>`).setColor("RANDOM").addField("Total Projects: ", `${client.projectsSize}`, true).addField("Your Projects:", `${total}`, true).setThumbnail(client.user.displayAvatarURL()).setFooter(interaction.member.user.tag)] });
      }
    );
  },
};
