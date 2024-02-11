// Import things
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { addToSheet } from './sheets.js'
import dotenv from 'dotenv'
dotenv.config()

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] })

// Channels the bot listens to
const CHANNELS = [
  "1145459706551357550", // #daily-games-and-stuff (Nerds)
  "837501692256714752", // #bot-messages (lce4113's Cave)
  "892280702375170058", // #enter-the-cave (lce4113's Cave)
]

// Message listener
client.on('messageCreate', async msg => {
  if (!CHANNELS.includes(msg.channel.id)) return
  if (msg.content.includes("New York Times Mini Crossword")) {
    const date = msg.content.match(/\d+\/\d+\/\d+/)[0]
    const time = '0:' + msg.content.match(/\d+:\d+/)[0]
    addToSheet(date, msg.author.displayName, msg.author.id, "mini", time)
  }
  if (msg.content.includes("https://www.nytimes.com/badges/games/mini.html")) {
    const date = msg.content.match(/\d+-\d+-\d+/)[0]
    const time = '0:0:' + msg.content.match(/t=(\d+)/)[1]
    addToSheet(date, msg.author.displayName, msg.author.id, "mini", time)
  }
})

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, async readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

// Log in to Discord with your client's token
client.login(process.env.TOKEN)