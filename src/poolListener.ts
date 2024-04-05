import "dotenv/config";
import WebSocket from "ws";
import { PublicKey } from "@solana/web3.js";

// Define the program ID for the AMM pools on Raydium
const AMM_PROGRAM_ID = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";
const SOLANA_MAINNET_WS_ENDPOINT = process.env.RAYDIUM_WSS_URL;

// Establish a WebSocket connection to the Solana blockchain
const ws = new WebSocket(SOLANA_MAINNET_WS_ENDPOINT);

ws.on("open", function open() {
  console.log("Connected to Solana Mainnet");

  // Subscribe to the program account to get notifications for all transactions involving the AMM program
  const subscribeMessage = {
    jsonrpc: "2.0",
    id: 1,
    method: "programSubscribe",
    params: [
      AMM_PROGRAM_ID,
      {
        encoding: "base64",
      },
    ],
  };
  ws.send(JSON.stringify(subscribeMessage));
});

ws.on("message", function incoming(data) {
  const msg = JSON.parse(data.toString());
  console.log("Received a message:", msg);

  // Check if the message is a notification of a program event
  if (msg && msg.method === "programNotification") {
    const { result } = msg.params;
    console.log("Notification of a program event:", result);

    // Here you would parse the transaction and extract the new AMM pool information
    // This part of the code depends on the structure of the transactions for creating new AMM pools
    // and how the data is encoded within those transactions.

    // For example, you might need to decode the transaction instructions and then extract the relevant
    // data fields to populate your ApiPoolInfoV4 objects.
  }
});

ws.on("close", function close() {
  console.log("Disconnected from Solana Mainnet");
});
