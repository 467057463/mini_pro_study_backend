export default defineEventHandler(async (event) => {
  const user = await useRquestUser(event, {role: 'admin'});
  const id = Number(getRouterParam(event, 'id'));

  const res = await prisma.setting.delete({
    where: {id}
  })

  return responFormat(res, 0)
})