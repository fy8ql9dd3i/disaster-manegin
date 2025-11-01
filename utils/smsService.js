// backend/utils/smsService.js

import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// Twilio credentials from environment
const fromNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

let cachedClient = null;

function validateTwilioConfig(accountSid, authToken) {
  if (!accountSid || !authToken) {
    throw new Error(
      "Twilio credentials are missing. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in your environment."
    );
  }

  // Twilio account SIDs normally start with 'AC'
  if (typeof accountSid === "string" && !accountSid.startsWith("AC")) {
    throw new Error(
      "TWILIO_ACCOUNT_SID appears invalid: account SIDs normally start with 'AC'. Please verify your TWILIO_ACCOUNT_SID."
    );
  }
}

function getTwilioClient() {
  if (cachedClient) return cachedClient;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  validateTwilioConfig(accountSid, authToken);

  cachedClient = twilio(accountSid, authToken);
  return cachedClient;
}

/**
 * sendSMS
 * @param {string} to - Recipient phone number with country code, e.g., +251912345678
 * @param {string} message - Message content
 */
export const sendSMS = async (to, message) => {
  try {
    const client = getTwilioClient();

    const response = await client.messages.create({
      body: message,
      from: fromNumber,
      to,
    });

    console.log(`SMS sent to ${to}: SID ${response.sid}`);
    return response;
  } catch (error) {
    console.error(`Failed to send SMS to ${to}:`, error.message);
    throw new Error(`SMS sending failed: ${error.message}`);
  }
};
