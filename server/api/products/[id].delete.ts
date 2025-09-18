export default defineEventHandler(async (event) => {
  const user = await useRquestUser(event);
  const id = Number(getRouterParam(event, 'id'));

  const res = await prisma.product.delete({
    where: {id}
  })

  return responFormat(res, 0)
})