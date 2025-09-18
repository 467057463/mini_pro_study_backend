export default defineEventHandler(async () => {
  const res = await prisma.address.findMany({})
  return responFormat(res, 0)
})