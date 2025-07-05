export default defineEventHandler(async (event) => {
  const res = await createActivity()
  console.log(res)
  return res;
})