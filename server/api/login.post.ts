import jwt from 'jsonwebtoken';
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { username, password, uuid, code } = await readBody(event)

  // 图形验证码验证
  // const captchaCode = await captchaStorage.getItem(uuid) as string;
  // if(!captchaCode || captchaCode.toLowerCase() !== code.toLowerCase()){
  //   return responFormat(null, 100001, '验证码错误')
  // }

  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  // 验证 用户名/密码 是否正确
  if(!user || !await verifyPassword(user.password, password)){
    return responFormat(null, 100003, '用户名密码错误')
  }

  // 生成 jwt token
  const runtimeConfig = useRuntimeConfig();
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    runtimeConfig.jwtSecert,
    {
      expiresIn: '30d'
    }
  )

  await setUserSession(event, {
    user: {
      id: user.id,
    },
    token,
  }, {
    maxAge: 60 * 60 * 24 * 30
  })
  
  return responFormat({ token }, 0, 'login success')
})