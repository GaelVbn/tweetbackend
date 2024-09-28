import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTIFICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const router = Router();
const prisma = new PrismaClient();

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number): string {
  const jwtPayload = {
    tokenId,
  };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

// Create a user, if it doesn't exist,
// generate the emaiilToken and send it via email
router.post("/login", async (req, res) => {
  const { email } = req.body;

  //generate a token
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              email,
            },
          },
        },
      },
    });

    console.log(createdToken);
    // send email token to user's email
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create token" });
  }
});

// validate the email token and generate
// a long lived auth token
router.post("/authenticate", async (req, res) => {
  const { email, emailToken } = req.body;
  const dbEmailToken = await prisma.token.findUnique({
    where: {
      emailToken,
    },
    include: {
      user: true,
    },
  });
  if (!dbEmailToken || !dbEmailToken.valid) {
    res.sendStatus(401);
    return;
  }

  if (dbEmailToken.expiration < new Date()) {
    res.sendStatus(401).json({ error: "Token expired" });
    return;
  }

  if (dbEmailToken.user.email !== email) {
    res.sendStatus(401);
    return;
  }

  // Here we validate that the user is the owner of the email
  const expiration = new Date(
    new Date().getTime() + AUTHENTIFICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );

  // generate an api token
  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  //invalidate the email
  await prisma.token.update({
    where: {
      id: dbEmailToken.id,
    },
    data: {
      valid: false,
    },
  });

  //generate the jwt token
  const authToken = generateAuthToken(apiToken.id);

  res.json({ authToken });
});
export default router;
