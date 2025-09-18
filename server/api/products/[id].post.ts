export default defineEventHandler(async (event) => {
  const user = await useRquestUser(event);
  const id = Number(getRouterParam(event, 'id'));
	const data = await readBody(event);

  const res = await prisma.product.update({
    where: {id},
    data
  })

  return responFormat(res, 0)
})