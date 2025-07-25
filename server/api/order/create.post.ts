export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body)
  const res = await prisma.order.createMany({
    data: [body]
  });

  return responFormat(res)
})