module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client, config) {
    if (message.partial) {
      try {
        return await message.fetch();
      } catch (e) {
        console.error("Something went wrong when fetching the message:", e);
        return;
      }
    }

    await config
      .find(async (serverConfig) => serverConfig.server == message.guild.name)
      .events.find(async (event) => event.type == "messageCreate")
      .conditions.forEach(
        async (condition) => await parseEventConditions(message, condition)
      );
  },
};

async function parseEventConditions(message, messageCreateConditions) {
  if (message.author.bot) return;

  if (
    normalizedIncludes(message, messageCreateConditions.trigger.keywords) &&
    checkRequiredAuthor(message, messageCreateConditions)
  ) {
    await performAction(message, messageCreateConditions.action);
  }
}

function checkRequiredAuthor(message, condition) {
  if (!condition.requiredAuthor.username) return true;

  if (condition.requiredAuthor.username == message.author.username) return true;

  return false;
}

async function performAction(message, action) {
  if (action.type == "react") {
    await reactWithEmoji(message, action.value);
  }
  if (action.type == "reply") {
    await replyToMessage(message, action.value);
  }
}

function normalizedIncludes(message, keywords) {
  for (const key in keywords) {
    if (message.content.toLocaleLowerCase().includes(keywords[key])) {
      return true;
    }
  }
  return false;
}

async function replyToMessage(message, reply) {
  try {
    await message.reply(reply);
  } catch (e) {
    console.error("Something went wrong when replying to the message:", e);
    return;
  }
}

async function reactWithEmoji(message, name) {
  try {
    await message.react(getEmojiByName(message, name));
  } catch (e) {
    console.error("Something went wrong when reacting to the message:", e);
    return;
  }
}

function getEmojiByName(message, emojiName) {
  try {
    return message.guild.emojis.cache.find((emoji) => emoji.name == emojiName);
  } catch (e) {
    console.error("Something went wrong when fetching the emoji: ", e);
    return;
  }
}
