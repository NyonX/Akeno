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

//Log in Event 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Serving ${client.guilds.array().length} server(s).`);
});

// --------------------
//---AI Integeration---
//---------------------

client.on("message", msg => {
  
  //Checks for prefix and bot
if(!msg.content.startsWith(prefix)) return;
if(msg.author.bot) return; 

let request = ai.textRequest(msg.content.slice(1), {sessionId: `${msg.author.id}`});

// Log all responses.
request.on('response', function(response) {
    console.log(response);     
});

//Log all errors
request.on('error', function(error) {
    console.log(error);
});

 
request.end()

//Call API with message and reply back, then execute action
   if (msg.content.startsWith(prefix + "")) {
       ai.textRequest(`${msg.content.slice(1)}`, {sessionId: `${msg.author.id}`});
       request.on('response', function(response) {
       let responseText = response.result.fulfillment.speech;
       if (responseText !== ''){
       	msg.reply(`${responseText}`);
       	if (response.result.action !== '') {
       		let action = response.result.action
       		console.log(response.result.action);
       		if (response.result.parameters !== '') {
       			let sub = response.result.parameters.Username
       			try {
       				let cmd = require(`./commands/${action}.js`);
       				cmd.run(client, msg, sub);
       			} catch (err) {
       				console.error(err);
       			}

       		}
       	}
       }       
    });
    
  }

//Logs more errors
request.on('error', function(error) {
    console.log(error);
});
});

//Login
client.login(token);