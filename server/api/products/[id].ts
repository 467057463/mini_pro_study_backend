export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const res = await prisma.product.findUnique({
    where: {id}
  })

  return responFormat(res, 0)
})