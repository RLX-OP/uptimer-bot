const UrlsConfig = require('./../../database/models/UrlsConfig');
const { MessageEmbed, Client, Message } = require('discord.js');
const validUrl = require('valid-url');
const { errorembedemoji, correctembedemoji, prefix } = require("../../config.json");
module.exports = {
	name: 'remove',
	description: 'Removes monitor from your project.',
	ownerOnly: false,
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {string[]} args
	 * @returns {Promise<any>}
	 */
	run: async (client, message, args) => {
const url = args[0];

    if (!url) {
      const urlsFilter = {
        authorID: message.member.user.id,
      };

      const all = await UrlsConfig.find(urlsFilter);

      if (all.length === 0) {
        return message.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`You don't have any projects Added. Add one by using: ${prefix}monitor [project Url] or use slash commands`).setFooter(message.member.user.tag).setThumbnail(message.member.user.displayAvatarURL())] });
      }

      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("** Select what project you want remove from being uptimed. **");

      let length = all.length;
      const projects = sliceIntoChunks(all, 5);
      let projectCount = 0;
      let count = 0;
      const countConfig = new Map();
      let content = [];

      let currentPage = 0;

      projects[currentPage].forEach((doc) => {
        projectCount++;
        content.push(`**${projectCount}**. \`${doc.projectURL}\``);
        countConfig.set(projectCount, doc.projectURL);
      });

      embed.setDescription(content.join("\n"));

      const reactions = [
        { emoji: "<a:lefter_arrow:880005290160971776>", action: "back" },
        { emoji: "<:Number_1:880005589999190056>", number: 1 },
        { emoji: "<:Number_2:880005634869841931>", number: 2 },
        { emoji: "<:Number_3:880005688959574038>", number: 3 },
        { emoji: "<:Number_4:880005718428758026>", number: 4 },
        { emoji: "<:Number_5:880005751316303892>", number: 5 },
        { emoji: "<a:righter_arrow:880005322952044565>", action: "next" },
      ];

      let errors = false;
      const msg = await message.member.user.send({ embeds: [embed] }).catch((err) => {
        errors = true;
        if (err.message === "Cannot send messages to this user")
          message.reply({ content: `Error: \`Cannot send message to you. please turn on your Dms\`.` });
      });

      if (errors) return;

      message.reply({ embeds: [new MessageEmbed().setColor("GREEN").setTitle(`${correctembedemoji} | Done`).setDescription("📥 Check your DM.").setFooter(message.member.user.tag).setThumbnail(message.member.user.displayAvatarURL())] });

      reactions.forEach(async (rec) => await msg.react(rec.emoji));

      const filter = (reaction, user) =>
        reactions.find((r) => r.emoji === reaction.emoji.name) &&
        user.id === message.member.user.id;

      const collector = msg.createReactionCollector(filter, { time: 150000 });

      collector.on("collect", async (reaction) => {
        switch (reaction.emoji.name) {
          case "<:Number_1:880005589999190056>": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(1),
            });
            let embed1 = new MessageEmbed()
              .setTitle("✅ Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await msg.send({ embeds: [embed1] })
            collector.stop();
            break;
          }

          case "<:Number_2:880005634869841931>": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(2),
            });
            let embed2 = new MessageEmbed()
              .setTitle("✅ Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await msg.send({ embeds: [embed2] });
            collector.stop();
            break;
          }

          case "<:Number_3:880005688959574038>": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(3),
            });
            let embed3 = new MessageEmbed()
              .setTitle("✅ Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await msg.send({ embeds: [embed3] });
            collector.stop();
            break;
          }

          case "<:Number_4:880005718428758026>": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(4),
            });
            let embed4 = new MessageEmbed()
              .setTitle("✅ Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await msg.send({ embeds: [embed4] });
            collector.stop();
            break;
          }

          case "<:Number_5:880005751316303892>": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(5),
            });
            let embed5 = new MessageEmbed()
              .setTitle("✅ Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await msg.send({ embeds: [embed5] });
            collector.stop();
            break;
          }

          case "<a:lefter_arrow:880005290160971776>": {
            if (currentPage !== 0) {
              currentPage = currentPage - 1;
              if (!projects[currentPage]) break;
              projectCount = 0;
              content = [];
              countConfig.clear();
              projects[currentPage].forEach((doc) => {
                projectCount++;
                content.push(`**${projectCount}**. \`${doc.projectURL}\``);
                countConfig.set(projectCount, doc.projectURL);
              });

              embed.setDescription(content.join("\n"));
              await msg.edit({ embeds: [embed] });
              break;
            }
            break;
          }

          case "<a:righter_arrow:880005322952044565>": {
            if (currentPage !== all.length) {
              currentPage = currentPage + 1;
              if (!projects[currentPage]) break;
              projectCount = 0;
              content = [];
              countConfig.clear();
              projects[currentPage].forEach((doc) => {
                projectCount++;
                content.push(`**${projectCount}**. \`${doc.projectURL}\``);
                countConfig.set(projectCount, doc.projectURL);
              });

              embed.setDescription(content.join("\n"));
              await msg.edit({ embeds: [embed] });
              break;
            }
            break;
          }

          default:
            break;
        }
      });
      return;
    }

    if (!validUrl.isUri(url)) {
      return message.reply({ content: "Please provide a vaild url!" });
    }

    // LOADING
    let waitEmbed = new MessageEmbed().setDescription(
      "<a:loading:879577672303378442> Please wait..."
    );
    var messageAlert = await message.reply({ content: `${message.member.user.id}`, embeds: [waitEmbed] });

    
    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
      authorID: member.user.id,
    });

    
    if (checkIfExsists === null) {
      
      let embed = new MessageEmbed()
        .setTitle("<a:loading:879577672303378442> Project is not Registered!")
        .setDescription("Add one using: `;monitor <url>` or use slash commands")
        .setColor("RANDOM")
        .setTimestamp();

      await messageAlert.edit({ embeds: [embed] });      
    } else {
      var storeIt = await UrlsConfig.findOneAndDelete({
        projectURL: url,
      }).then(async () => {
        

        let new_pros = await client.projects.filter((p) => p !== url);
        client.projects = new_pros;

        let embed10 = new MessageEmbed()
          .setTitle("✅ Removed Succesfully!")
          .setDescription("Thanks for using me")
          .setColor("RANDOM")
          .setTimestamp();

        await messageAlert.edit({ embeds: [embed10] });        
      });
    }
  },
};
function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

							