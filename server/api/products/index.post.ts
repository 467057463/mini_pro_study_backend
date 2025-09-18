export default defineEventHandler(async (event) => {
  const user = await useRquestUser(event);
  const data = await readBody(event);
  const res = await prisma.product.create({
    data
  })
  
  return responFormat(res, 0)
})