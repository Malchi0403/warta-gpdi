export async function getData() {
  const data = await fetch('http://localhost:8080/api/event')
  const posts = await data.json()
  return posts
}