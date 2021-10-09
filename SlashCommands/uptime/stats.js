const UrlsConfig = require("./../../database/models/UrlsConfig");
const { MessageEmbed } = require("discord.js");
const { errorembedemoji, prefix, correctembedemoji,pinembedemoji, menuembedemoji } = require("./../../config.json");

module.exports = {
  name: "stats",
  description: "Shows Stats of all of your Projects.",  
  ownerOnly: false,
  run: async (client, interaction, args) => {
    const filter = {
      authorID: interaction.member.user.id,
    };

    const all = await UrlsConfig.find(filter);

    const menuEmoji = `${menuembedemoji}`;

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${menuEmoji} Your Projects Stats ${menuEmoji}`);

    let count = 0;
    all.forEach(async (data) => {
      count++;
      if (count === 26) return;


      if (data.get("error")) {
        embed.addField(
          `**${count}**. \`${data.projectURL}\``,
          `${pinembedemoji} Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }\n${errorembedemoji} FetchError: ${data.errorText}`
        );
      } else {
        embed.addField(
          `**${count}**. \`${data.projectURL}\``,
          `${errorembedemoji} Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }`
        );
      }
    });

    if (count === 0) {
      embed.setDescription(
        `*You don't have any projects hosted.*\nAdd one by using: ${prefix}add [project Url] or use slash commands`
      );
    }
    embed.setFooter(`Date Format: DD/MM/YY | HH:MM:SS`);

    var errors = false;

    await interaction.member.user.send({ embeds: [embed] }).catch((err) => {
      errors = true;
      if (err.message === "Cannot send messages to this user")
        return interaction.followUp({ embeds: [new MessageEmbed().setColor("RED").setTitle("${errorembedemoji} | Error").setDescription("Cannot send message to you. please turn on your Dms.").setFooter(interaction.member.user.tag).setThumbnail(client.user.displayAvatarURL())] });
    });
    if (!errors) {
      interaction.followUp({ embeds: [new MessageEmbed().setColor("RANDOM").setTitle(`${correctembedemoji} | Done`).setDescription("📥 Check your dms.").setFooter(interaction.member.user.tag).setThumbnail(client.user.displayAvatarURL())] });
    }
  },
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  hours = d.getHours();
  mins = d.getMinutes();
  sec = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  let format = `${day}/${month}/${year} | ${hours}:${mins}:${sec}`;

  return format;
}
