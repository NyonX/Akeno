exports.run = (client, action, parameter) => {
    msg.reply(action + " " + "parameter").catch(console.error);
}