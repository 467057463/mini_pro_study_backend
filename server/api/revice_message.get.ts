export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const query = getQuery(event)
  console.log({
    query,
    body
  })
  return responFormat('success')
})