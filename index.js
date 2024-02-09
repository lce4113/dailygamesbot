// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { Sheets } from 'google-sheets-api'
import CONFIG from './config.js'
const { token, channels, sheetsId, sheetsEmail, sheetsKey } = CONFIG

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] })

// message listener
client.on('messageCreate', async msg => {
  if (!channels.includes(msg.channel.id)) return
  console.log(msg.content)
})

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
  const sheets = new Sheets({ email: sheetsEmail, key: sheetsKey })
  const info = await sheets.getSheets(sheetsId)
  const values = await sheets.getRange(sheetsId, info[0].id, 'A1:C3')
  // console.log(values)
})

// Log in to Discord with your client's token
client.login(token)