

export default defineEventHandler(async (event) => {
  const user = await useRquestUser(event)
  const body = await readBody(event)
  
  const res = wxVerify(body.rawData, user.session_key, body.signature)

  return responFormat(res)
})

