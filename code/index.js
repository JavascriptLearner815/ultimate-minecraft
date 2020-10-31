const { token, secret, publicKey, id, prefix, description, botUser } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);