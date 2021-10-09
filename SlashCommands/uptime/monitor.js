const UrlsConfig = require("./../../database/models/UrlsConfig");
const { Client, MessageEmbed, Message } = require("discord.js");
const fetch = require("node-fetch");
const validUrl = require("valid-url");

module.exports = {
  name: "monitor",
  description: "Adds monitor to your project.",    
  ownerOnly: false,
options: [
        {
                name: "urls",
                type: 3,
                description: "type a url to uptime",
required: false
        }
],
  run: async (client, interaction, args) => {
    var url = args.join(" ");

    if (!url) return interaction.followUp({ content: "Please provide a project url" });
    if (!validUrl.isUri(url)) {
      return interaction.followUp({ content: "Please provide a vaild url" });
    }
        
    var interactionA = await interaction.followUp({ content: `<@${interaction.member.user.id}>`, embeds: [new MessageEmbed().setColor("WHITE").setDescription("<a:loading:879577672303378442> Please wait...").setFooter(interaction.member.user.tag).setThumbnail(interaction.member.user.displayAvatarURL())] });

    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
    });

    if (checkIfExsists === null) {
      
      await UrlsConfig.create({
        authorID: interaction.member.user.id,
        projectURL: url,
        pinged: 0,
      }).then(async () => {
        
        client.projects.push(url);
        try {
          
          await fetch(url);
        } catch (e) {
          
          await UrlsConfig.findOneAndUpdate(
            { projectURL: url },
            { error: true, errorText: e.message },
            { new: true }
          );
          interaction.followUp({ content: "Fetching Error" });
        }
        
        await interactionA.edit({ embeds: [new MessageEmbed().setTitle("<a:tick:879317182721454160> Added Succesfully").setColor("RED").setDescription("Thanks for using me").setTimestamp()] });
        
      });
    } else {      
      
      await interactionA.edit({ embeds: [new MessageEmbed().setTitle("Error | Already Registered").setDescription("The Project you're Trying To Register Is Already In The Database").setColor("RED").setFooter(interaction.member.user.tag).setThumbnail(client.user.displayAvatarURL()).setTimestamp()] });
    }
  },
};
