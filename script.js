addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled(event.scheduledTime))
})

async function handleScheduled(scheduledTime) {
  const apiUrl = 'https://www.reddit.com/top.json?limit=20&sr_detail=1'
  const response = await fetch(apiUrl)
  const fileContent = await response.text()
  const url = 'https://api.github.com/repos/nvshs/reddit-api-cache/contents/top.json'
  const token = 'YOUR GITHUB TOKEN HERE'
  const response2 = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Cloudflare Workers'
    },
    body: JSON.stringify({
      message: 'Update top.json',
      content: encodeBase64(fileContent),
      sha: await getFileSha(url, token)
    })
  })
  console.log(`Top posts updated at ${scheduledTime}`)
}

function encodeBase64(str) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  return btoa(String.fromCharCode(...new Uint8Array(data)))
}

async function getFileSha(url, token) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'Cloudflare Workers'
    }
  })
  const data = await response.json()
  return data.sha
}
