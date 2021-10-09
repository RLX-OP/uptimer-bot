const UrlsConfig = require("./../../database/models/UrlsConfig");
const { MessageEmbed } = require("discord.js");
const { default_prefix } = require("./../../config.json");

module.exports = {
  name: "stats",
  description: "Shows Stats of all of your Projects.",  
  ownerOnly: false,
  run: async (client, message, args) => {
    const filter = {
      authorID: message.member.user.id,
    };

    const all = await UrlsConfig.find(filter);

    const menuEmoji = "<a:a_v_error:879317251424157707>";

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
          `<a:a_v_error:879317251424157707> Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }\n<a:a_v_error:879317251424157707> FetchError: ${data.errorText}`
        );
      } else {
        embed.addField(
          `**${count}**. \`${data.projectURL}\``,
          `<a:a_v_error:879317251424157707> Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }`
        );
      }
    });

    if (count === 0) {
      embed.setDescription(
        `*You don't have any projects hosted.*\nAdd one by using: ${default_prefix}add [project Url]`
      );
    }
    embed.setFooter(`Date Format: DD/MM/YY | HH:MM:SS`);

    var errors = false;

    await message.author.send({ embeds: [embed] }).catch((err) => {
      errors = true;
      if (err.message === "Cannot send messages to this user")
        return message.channel.send(
          `Error: \`Cannot send message to you. please turn on your Dms\`.`
        );
    });
    if (!errors) {
      message.channel.send({ content: "📥 Check your DM." })
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
