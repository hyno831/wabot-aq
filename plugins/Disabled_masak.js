let fetch = require("node-fetch")

let handler = async (m, { conn, text }) => {
  let res = await fetch(global.API('zeks', '/api/resep-masak', { q : text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.title) throw json
  await conn.sendFile(m.chat, json.thumb, '', `
${json.title}
${json.url}

*Tingkat:* ${json.tingkat}
*Durasi:* ${json.duration}
*Porsi:* ${json.banyak}


*Bahan:* ${json.bahan}
*Cara:* ${json.cara}
`.trim(), m)
}
handler.help = ['resep <makanan>', 'masak <makanan>']
handler.tags = ['disabled']
handler.command = /^(resep|masak)$/i
handler.owner

module.exports = handler