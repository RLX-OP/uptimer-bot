const { Client, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
const { botid } = require("../../config.json");

module.exports = {
  name: "invite",
  description: "invite me",
      ownerOnly: false,  
  run: async (client, message, args) => {
          
const row = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot%20applications.commands`)
        .setLabel("INVITE")
            .setStyle("LINK")
    )
          message.channel.send({ content: `<@${message.member.user.id}>`, components: [row] })
  }
}