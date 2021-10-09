const UrlsConfig = require("./../../database/models/UrlsConfig");
const { Client, MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "total",
  description: "Shows all projects",
        ownerOnly: false,
  run: async (client, message, args) => {
    UrlsConfig.countDocuments(
      { authorID: message.member.user.id },
      async function (err, total) {        
        return message.channel.send({ embeds: [new MessageEmbed().setTitle(`Uptimer Bot Total Projects`).setColor("RANDOM").addField("Total Projects: ", `${client.projectsSize}`, true).addField("Your Projects:", `${total}`, true).setThumbnail(client.user.displayAvatarURL()).setFooter(message.member.user.tag)] });
      }
    );
  },
};
