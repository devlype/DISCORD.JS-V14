const Discord = require("discord.js")

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');


const config = require("./config.json")



const client = new Discord.Client({

  intents: [

    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers


  ]

});



module.exports = client



client.on('interactionCreate', (interaction) => {



  if (interaction.type === Discord.InteractionType.ApplicationCommand) {



    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);



    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);



    cmd.run(client, interaction)



  }

})



client.on('ready', () => {

  console.log(`${client.user.username} esta online 🟢`)

})





client.slashCommands = new Discord.Collection()



require('./handler')(client)



client.login(config.token)
