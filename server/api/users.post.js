import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const { Name, Surname, Email } = await readBody(event)

  const user = await prisma.users.create({
    data: {
      Name, Surname, Email
    },
  })
  return user
})