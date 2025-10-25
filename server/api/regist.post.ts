import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { username, password, uuid, code } = await readBody(event)

  // 图形验证码验证
  const captchaCode = await captchaStorage.getItem(uuid) as string;
  if(!captchaCode || captchaCode.toLowerCase() !== code.toLowerCase()){
    return responFormat(null, 100001, '验证码错误')
  }

  // 检查用户是否存在
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  })
  
  if(user){
    return responFormat(null, 100002, '账号号已注册')
  }

  // 创建用户
  const res = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password)
    }
  })


  // 生成 jwt token
  const runtimeConfig = useRuntimeConfig();
  const token = jwt.sign(
    {
      id: res.id,
      username: res.username,
      role: res.role
    },
    runtimeConfig.jwtSecert,
    {
      expiresIn: '30d'
    }
  )

  await setUserSession(event, {
    user: {
      id: res.id,
      username: res.username,
      role: res.role
    },
    token,
  }, {
    maxAge: 60 * 60 * 24 * 30
  })

  return responFormat({token, role: res.role}, 0, 'registe success')
})