// Import things
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { read } from './read.js'
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
  if (msg.author.bot) return
  if (!CHANNELS.includes(msg.channel.id)) return
  await read(msg.content)
})

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, async readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
  const channel = await client.channels.fetch(CHANNELS[0])
  console.log(channel.name)
  let all_msgs = [], last_msg = 1197420445989879888
  for (let i = 0; i < 10; i++) {
    const msgs = await channel.messages.fetch({ limit: 100, before: last_msg })
    all_msgs.push(...msgs.values())
    last_msg = msgs.last().id
  }
  // msgs.forEach(async msg => await read(msg))
  for await (const msg of all_msgs) await read(msg);
})

// Log in to Discord with your client's token
client.login(process.env.TOKEN)