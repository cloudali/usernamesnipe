const { GatewayIntentBits, Partials, WebhookClient, EmbedBuilder, Routes, REST } = require("discord.js");
const Discord = require("discord.js")
const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const fs = require("fs");
const { token, clientid } = require("./config.json")
const path = require('path');

client.commands = new Discord.Collection();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
    commands.push(command.data.toJSON());
}



const rest = new REST().setToken(token);

(async () => {
    try {
        const data = await rest.put(
            Routes.applicationCommands(clientid),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();




const events = fs
    .readdirSync("./events")
    .filter(file => file.endsWith(".js"));

for (const file of events) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}



process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});




client.login(token);