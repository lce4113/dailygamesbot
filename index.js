// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js'
import CONFIG from './config.js'
import { read } from './sheets.js'
const { TOKEN, CHANNELS } = CONFIG

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] })

// message listener
client.on('messageCreate', async msg => {
  if (!CHANNELS.includes(msg.channel.id)) return
  console.log(msg.content)
})

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
  read();
})

// Log in to Discord with your client's token
client.login(TOKEN)