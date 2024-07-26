import React, { useState } from "react";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  mintTo,
  getMint,
} from "@solana/spl-token";
import bs58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";

const SendSPL: React.FC = () => {
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const { publicKey, sendTransaction } = useWallet();

  const sendToken = async () => {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );

    // Địa chỉ mint của SPL token
    const mintAddress = new PublicKey(
      "Hj1RB4fFwUPjtAu94GGurqpNkkfNHugGHTLySSaKR8JY"
    );

    // Địa chỉ ví người nhận
    const recipientPublicKey = new PublicKey(recipientAddress);

    try {
      if (!publicKey || !recipientPublicKey || amount <= 0) {
        return;
      }
      //tạo account người gửi
      const senderTokenAccount = getAssociatedTokenAddressSync(
        mintAddress,
        publicKey
      );
      const recipientTokenAccount = getAssociatedTokenAddressSync(
        mintAddress,
        recipientPublicKey
      );

      const mintInfo = await getMint(connection, mintAddress);
      const transaction = new Transaction().add(
        createTransferInstruction(
          senderTokenAccount,
          recipientTokenAccount,
          publicKey,
          amount * 1000
        )
      );

      const signature = await sendTransaction(transaction, connection);

      setTransactionStatus(
        `Transaction successful with signature: ${signature}`
      );
    } catch (error) {
      setTransactionStatus(`Transaction failed: ${error}`);
    }
  };

  return (
    <div style={{ marginTop: "300px" }}>
      <h1>Send SPL Token</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={sendToken}>Send Token</button>
      {transactionStatus && <p>{transactionStatus}</p>}
    </div>
  );
};

export default SendSPL;
