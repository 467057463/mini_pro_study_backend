export default defineEventHandler(async (event) => {
  const { keys } =  await readBody(event);
  const res = await prisma.setting.findMany({
    where: {
      key:{
        in: keys
      }
    }
  })
  return responFormat(res, 0)
})