export default defineEventHandler(async (event) => {
  const {code, uuid} = await readBody(event)

  // 图形验证码验证
  const captchaCode = await captchaStorage.getItem(uuid) as string;
  if(!captchaCode || captchaCode.toLowerCase() !== code.toLowerCase()){
    return responFormat(null, 100001, '验证码错误')
  }

  return responFormat(null, 0, '')
})