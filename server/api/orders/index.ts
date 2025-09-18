export default defineEventHandler(async(event) => {
  const user = await useRquestUser(event);
  return responFormat(user, 0)
})