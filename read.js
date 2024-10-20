import { addToSheet } from './sheets.js'

export async function read(msg) {
  console.log(msg.content);
  if (msg.content.includes("New York Times Mini Crossword")) {
    const date = msg.content.match(/\d+\/\d+\/\d+/)[0]
    const time = '0:' + msg.content.match(/\d+:\d+/)[0]
    await addToSheet(date, msg.author.displayName, msg.author.id, "mini", time)
  }
  if (msg.content.includes("https://www.nytimes.com/badges/games/mini.html")) {
    const date = msg.content.match(/\d+-\d+-\d+/)[0]
    const time = '0:0:' + msg.content.match(/t=(\d+)/)[1]
    await addToSheet(date, msg.author.displayName, msg.author.id, "mini", time)
  }
}