import { createHash } from "node:crypto"
export function wxVerify(rawData, sessionKey, singature){
  let shasum = createHash('sha1')
  let generatedSignature = shasum.update(rawData + sessionKey).digest('hex')
  return generatedSignature === singature
}