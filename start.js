"use strict";
process.title = "Akeno V4"

// Set Up Constants
const Discord = require("discord.js");
const client = new Discord.Client();

// Require Libraries
const fs = require('fs');
const moment = require('moment');
const apiai = require('apiai');

//Meta
var date = new Date();
var version = "4.0";
var token = process.env.token;
var owner = process.env.owner;
var ai = apiai(process.env.ai);
var prefix = process.env.prefix;

// --------------------
//---AI Integeration---
//---------------------
client.on("message", msg => {
	if (msg.author.bot) return;
	if(!msg.content.startsWith(prefix)) return;
	console.log(msg);


var request = app.textRequest(`${msg.content.slice(1)}`);

// Log all responses.
request.on('response', function(response) {
    console.log(response);    
});
 
request.on('error', function(error) {
    console.log(error);
});

request.end();
	if (msg.content.startsWith(prefix + "")) {
		ai.textRequest(`${msg.content.slice(1)}`);
		request.on('response', function(response) {
			let reply = response.result.fulfillment.speech;
			client.sendMessage(msg, `${reply}`);
		});
	};
 });