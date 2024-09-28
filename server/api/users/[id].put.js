import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
    const body = await readBody(event)
    const name = body.Name
    const surname = body.Surname
    const email = body.Email

    const updateUser = await prisma.users.update({
      where: {
        Id: parseInt(event.context.params.id)},
        data: {
            Name: name,
            Surname: surname,
            Email: email,
          },
    });
    return updateUser;
});
