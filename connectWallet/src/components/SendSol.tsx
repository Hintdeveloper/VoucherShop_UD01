import React, { useState } from "react";
import {
  Connection,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const SendSol: React.FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [toPubkey, setToPubkey] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const sendSol = async () => {
    try {
      if (!publicKey || !toPubkey || amount <= 0) {
        setMessage("Please fill in all fields correctly.");
        return;
      }

      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );

      // Convert amount from SOL to lamports
      const lamportsToSend = amount * LAMPORTS_PER_SOL;

      const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(toPubkey),
          lamports: lamportsToSend,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transferTransaction, connection);
      await connection.confirmTransaction(signature);

      setMessage(
        `Sent ${amount} SOL from ${publicKey.toBase58()} to ${toPubkey}`
      );
    } catch (error) {
      console.error("Error sending SOL:", error);
      setMessage("Error sending SOL");
    }
  };

  return (
    <div>
      <div>
        <label>
          Receiver Public Key:
          <input
            type="text"
            value={toPubkey}
            onChange={(e) => setToPubkey(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Amount (SOL):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
            step="any"
          />
        </label>
      </div>
      <button onClick={sendSol}>Send SOL</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendSol;
