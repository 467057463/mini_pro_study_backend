import { createHash } from "node:crypto"
let shasum = createHash('sha1')

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const user = await useRquestUser(event)
  const body = await readBody(event)

  const pc = new WXBizDataCrypt(runtimeConfig.wxAppId, user.session_key)
  const data = pc.decryptData(body.encryptedData, body.iv)
  return responFormat(data)
})