export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const res = await prisma.setting.create({
    data
  })
  
  return responFormat(res, 0)
})