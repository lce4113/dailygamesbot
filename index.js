// Import things
import { Client, Events, GatewayIntentBits } from 'discord.js'
import CONFIG from './config.js'
import { add, read } from './sheets.js'
const { TOKEN, CHANNELS } = CONFIG

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] })

// Message listener
client.on('messageCreate', async msg => {
  if (!CHANNELS.includes(msg.channel.id)) return
  console.log(msg.content)
})

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, async readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
  add();
})

// Log in to Discord with your client's token
client.login(TOKEN)