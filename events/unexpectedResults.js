module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.partial) {
      try {
        return await message.fetch();
      } catch (e) {
        console.error("Something went wrong when fetching the message:", e);
        return;
      }
    }

    if (
      (message.guild.name == "Unexpected Results" ||
        message.guild.name == "Testing Grounds") &&
      !message.author.bot
    ) {
      //   Republican
      if (normalizedIncludes(message, ["republicans"])) {
        await replyToMessage(message, "god fearing republicans");
      } else if (normalizedIncludes(message, ["republican"])) {
        await replyToMessage(message, "a god fearing republican");
      }

      //   Communist
      if (normalizedIncludes(message, ["commie", "communist", "cummie"])) {
        await reactWithEmoji(message, "ak47");
      }

      //   Democrat
      if (normalizedIncludes(message, ["democrat", "democrats"])) {
        await reactWithEmoji(message, "trump");
      }

      //   Jail
      if (
        normalizedIncludes(message, [
          "jail",
          "jailbait",
          "prison",
          "shark",
          "bait",
          "ooh ha ha",
          "haha",
        ])
      ) {
        await replyToMessage(message, "SHARKBAIT! OOH HA HA!");
      }

      // Moonshine: message.content = I love you Kyle
      if (
        message.author.username == "Moonshine" &&
        normalizedIncludes(message, ["i love you kyle"])
      ) {
        await replyToMessage(
          message,
          `Kyle cannot reply to this message with what you desire. Maybe one day...`
        );
      }
    }
  },
};

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
