module.exports = async (client, event) => {
    if (!['MESSAGE_REACTION_ADD'].includes(event.t)) return;
    console.log(event.d.emoji.name);
};