import { useState, useEffect } from "react";
import { STACKS_TESTNET } from "@stacks/network";
import { fetchCallReadOnlyFunction, cvToJSON } from "@stacks/transactions";

const CONTRACT_ADDRESS = "ST3GAYKCWBD2PTNR77WGYWCPPR102C5E0C9V1H9ZX"; 
const CONTRACT_NAME = "stx-raffle"; 

export function useRaffleData() {
  const [potSize, setPotSize] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stxPrice, setStxPrice] = useState<number>(0); // 🆕 NEW STATE

  const network = STACKS_TESTNET;

  const fetchRaffleData = async () => {
    // 🚨 LOG 1: Function Started
    console.error("🟢 RAFFLE HOOK: Starting fetch...");

    try {
      // --- 🆕 NEW: FETCH REAL PRICE ---
      try {
        const priceRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd");
        const priceData = await priceRes.json();
        const price = priceData.blockstack.usd;
        console.error("🟢 RAFFLE HOOK: Real STX Price:", price);
        setStxPrice(price);
      } catch (err) {
        console.error("🔴 RAFFLE HOOK: Failed to fetch price, defaulting...", err);
        setStxPrice(2.00); // Fallback
      }
      // --------------------------------

      const options = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "get-current-pot",
        functionArgs: [],
        network,
        senderAddress: CONTRACT_ADDRESS, 
      };

      // 🚨 LOG 2: Attempting Network Call
      console.error("🟢 RAFFLE HOOK: Calling Network...", options);

      const potResponse = await fetchCallReadOnlyFunction(options);
      
      // 🚨 LOG 3: Got Response
      console.error("🟢 RAFFLE HOOK: Got Response!", potResponse);

      const potJson = cvToJSON(potResponse);
      console.error("🟢 RAFFLE HOOK: JSON Pot Data", potJson);
      
      // PARSING LOGIC (The "NaN" Fixer)
      let safePot = 0;
      if (potJson.value) {
          if (typeof potJson.value === 'object' && potJson.value.value) {
              safePot = Number(potJson.value.value);
          } else {
              safePot = Number(potJson.value);
          }
      }
      
      console.error("🟢 RAFFLE HOOK: Final Pot Number", safePot);
      setPotSize(safePot);

      // (Skipping round for a second to isolate the error)
      setRound(142); 

    } catch (error) {
      console.error("🔴 RAFFLE HOOK ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 🚨 LOG 0: Component Mounted
    console.error("🟢 RAFFLE HOOK: Component Mounted!");
    fetchRaffleData();
  }, []);

  // 🆕 Return stxPrice here
  return { potSize, round, isLoading, stxPrice, refresh: fetchRaffleData };
}