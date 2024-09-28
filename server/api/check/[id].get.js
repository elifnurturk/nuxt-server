//possible to get response via /{licencekey}
import { defineEventHandler, H3Error } from 'h3';
import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  if (!event.context.params.id) {
    throw new H3Error('Key is required');
  }

  try {
    const log = await prisma.logs.findUnique({
      where: {
        Id :  parseInt(event.context.params.id),
      },
      include: {
        Licence: true, // Include related Licence data
        User: true, // Include related User data
      },
    });

    if (log.LogoutDate === null) {
      // If LogoutDate is null, the device is logged in
            // If LogoutDate is not null, the device is logged out
      return {
        statusCode: 200,
        message: "Logged in", // Device is currently logged out
      };
    }
    
    setResponseStatus(event, 403);

    return {
      statusCode: 403,
      message: "A device with this key already exists and is logged in.", // Device is currently logged out
    };
   
  } catch (error) {
    console.error('Error fetching log:', error);
    throw new H3Error('Internal Server Error');
  }
});