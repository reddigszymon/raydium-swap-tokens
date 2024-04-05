import "dotenv/config";
import { Market } from "@project-serum/serum";
import { Connection, PublicKey } from "@solana/web3.js";
import { Market as getMarketAuthority } from "@raydium-io/raydium-sdk";

// Replace this with the actual Serum program ID you're working with
const SERUM_PROGRAM_ID = new PublicKey(
  "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"
);

async function fetchMarketDetails(marketId) {
  console.log(process.env.RPC_URL);
  console.log(marketId);
  const connection = new Connection(process.env.RPC_URL);
  const marketAddress = new PublicKey(marketId);

  // Providing the missing 'options' and 'programId' arguments
  const market = await Market.load(
    connection,
    marketAddress,
    {},
    SERUM_PROGRAM_ID
  );

  const marketAuthority = await getMarketAuthority
    .getAssociatedAuthority({
      programId: SERUM_PROGRAM_ID,
      marketId: marketAddress,
    })
    .publicKey.toString();

  console.log("Market loaded successfully");

  console.log(market.decoded);

  return {
    marketAuthority: marketAuthority,
    marketBaseVault: market.decoded.baseVault.toString(),
    marketQuoteVault: market.decoded.quoteVault.toString(),
    marketBids: market.bidsAddress.toString(),
    marketAsks: market.asksAddress.toString(),
    marketEventQueue: market.decoded.eventQueue.toString(),
  };
}

// Use this function with your marketId
fetchMarketDetails("9CV3aH66o7F3jsoXXrgBtvNgRy9VyzuAtrFwWn2zaayb")
  .then((details) => console.log(details))
  .catch((err) => console.error(err));
