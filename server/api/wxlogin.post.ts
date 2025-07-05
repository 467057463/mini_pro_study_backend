import jwt from 'jsonwebtoken';
import prisma from "~/lib/prisma";
import { getWxUserSession } from "../utils/wxApi";

export default defineEventHandler(async (event) => {
  const { code } = await readBody(event)

  const session = await getWxUserSession({
    js_code: code
  })

  const user = await prisma.user.upsert({
    where: {
      openid: session.openid
    },
    update: session,
    create: session
  })

  // 生成 jwt token
  const runtimeConfig = useRuntimeConfig();
  const token = jwt.sign(
    {
      id: user.id
    },
    runtimeConfig.jwtSecert,
    {
      expiresIn: '30d'
    }
  )

  return responFormat({ token }, 0, 'login success')
})