export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('body', body)
  const res = await updateActivityMsg(body)
  console.log('res', res)
  return res;
})