export default defineEventHandler(async(event) => {
  const query = getQuery(event);

  const list = await prisma.product.findMany({
    where: query
  })

  return responFormat({list}, 0)
})