import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  // Read the request body
  const { LicenceKey, UserMail, ProductId, EndDate } = await readBody(event);
  const productIdInt = parseInt(ProductId);
  const endDateObj = new Date(EndDate);

  try {
    // Check if the user exists
    const userExists = await prisma.users.findUnique({
      where: {
        Email: UserMail
      }
    });

    if (!userExists) {
      return {
        status: 404,
        body: {
          error: 'User with the provided email does not exist'
        }
      };
    }

    // Check if the product exists
    const productExists = await prisma.products.findUnique({
      where: {
        Id: productIdInt
      }
    });

    if (!productExists) {
      return {
        status: 404,
        body: {
          error: 'Product with the provided ID does not exist'
        }
      };
    }

    // Check if a licence with the same key already exists
    const licenceExists = await prisma.licences.findUnique({
      where: {
        LicenceKey: LicenceKey
      }
    });

    if (licenceExists) {
      return {
        status: 400,
        body: {
          error: 'Licence with the same key already exists'
        }
      };
    }

    // Create the licence record
    const licence = await prisma.licences.create({
      data: {
        LicenceKey,  
        UserMail,
        ProductId: productIdInt,
        EndDate: endDateObj
      }
    });

    // Return the created licence as a success response
    return {
      status: 201,
      body: licence
    };

  } catch (error) {
    // Handle any unexpected errors during the process
    return {
      status: 500,
      body: {
        error: 'An error occurred while processing the request'
      }
    };
  } finally {
    // Ensure the Prisma client is disconnected after operations
    await prisma.$disconnect();
  }
});
