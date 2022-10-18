module.exports = {
  name: "messageReactionAdd",
  once: false,
  async execute(reaction, user) {
    if (!(reaction.emoji.name == "📜" || reaction.emoji.name == "ewok")) return;

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (e) {
        console.error("Something went wrong when fetching message:", e);
        return;
      }
    }
    await reaction.message.reply(
      "I'll translate this after my human translator implements the language module. May the kna naa chesl you yehan jeerota.\n>>> May the spirit tree bring you peace friend."
    );
  },
};
