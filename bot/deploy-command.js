const fs = require("fs");
const path = require("node:path");
const { REST, SlashCommandBuilder, Routes } = require("discord.js");
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
require("dotenv").config({ path: path.join(__dirname, "..", envFile) });

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
});

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

// delete all global application commands
// rest
//   .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
//   .then(() => console.log("Successfully deleted all application commands."))
//   .catch(console.error);

// create global application commands
rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
