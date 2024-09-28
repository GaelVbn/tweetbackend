// HAVE TO CREATE AN ACCOUNT AWS EMAIL SERVICE

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
require("dotenv").config();

const ses = new SESClient({});

function createSendEmailCommad(
  ToAddress: string,
  fromAdress: string,
  message: string
) {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [ToAddress],
    },
    Source: fromAdress,
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Hello",
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message,
        },
      },
    },
  });
}

export async function sendEmailToken(email: string, token: string) {
  const message = `Your email token is ${token}`;
  const command = createSendEmailCommad(email, "wXJ2y@example.com", message);

  try {
    return await ses.send(command);
  } catch (error) {
    console.log(error);
    return error;
  }
}

sendEmailToken("l7YQr@example.com", "12345678");
