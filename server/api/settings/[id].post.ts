export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const user = await useRquestUser(event, {role: 'admin'});
  const data = await readBody(event);

  const res = await prisma.setting.update({
    where: {
      id
    },
    data
  })

  return responFormat(res, 0)
})