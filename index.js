const fs = require("fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
});

client.once("ready", (c) => {
  console.log(`Ready to be a bot!\nLogged in as ${c.user.tag}`);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (!(reaction.emoji.name == "📜" || reaction.emoji.name == "ewok")) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (err) {
      console.error("Something went wrong when fetching the message:", err);
      return;
    }
  }

  console.log("Conditional reaction event received!");
  await reaction.message.reply(
    "I'll translate this after my human translator implements the language module. May the kna naa chesl you yehan jeerota.\n>>> May the spirit tree bring you peace friend."
  );
});

client.on("messageCreate", async (message) => {
  if (message.partial) {
    try {
      await message.fetch();
    } catch (err) {
      console.error("Something went wrong when fetching this message:", err);
      return;
    }
  }
  if (
    message.guild.name == "Unexpected Results" ||
    message.guild.name == "Testing Grounds"
  ) {
    if (message.content.toLocaleLowerCase().includes("republican")) {
      await message.reply("a god fearing one.");
    }
    if (
      message.content.toLocaleLowerCase().includes("commie") ||
      message.content.toLocaleLowerCase().includes("communist") ||
      message.content.toLocaleLowerCase().includes("cummie")
    ) {
      await message.react(
        message.guild.emojis.cache.find((emoji) => emoji.name == "ak47")
      );
    }
    if (message.content.toLocaleLowerCase().includes("democrat")) {
      await message.react(
        message.guild.emojis.cache.find((emoji) => emoji.name == "trump")
      );
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "There was an error executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.BOT_TOKEN);
