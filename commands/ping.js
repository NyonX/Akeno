exports.run = (client, msg, action, parameter) => {
	console.log(msg.author.tag);
    msg.reply(action).catch(console.error);
}