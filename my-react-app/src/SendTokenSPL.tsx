import React, { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl, Keypair, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID, getMint } from '@solana/spl-token';
import bs58 from 'bs58';

const SendTokenSPL: React.FC = () => {
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  const sendToken = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Chuyển đổi private key từ base58 sang Uint8Array
    const senderSecretKeyBase58 = '2nJq28DAa3jqGxayRSJcFNA3p9VQdQvh33zQpNkYzCDJnsHhgKwZrooPcnhhKCypHoGCiuycbZhPwM3Q9bectXoi';
    const senderSecretKey = bs58.decode(senderSecretKeyBase58);
    const senderKeypair = Keypair.fromSecretKey(senderSecretKey);

    // Địa chỉ mint của SPL token
    const mintAddress = new PublicKey('Hj1RB4fFwUPjtAu94GGurqpNkkfNHugGHTLySSaKR8JY');

    // Địa chỉ ví người nhận
    const recipientPublicKey = new PublicKey(recipientAddress);

    try {
      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        senderKeypair,
        mintAddress,
        senderKeypair.publicKey
      );

      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        senderKeypair,
        mintAddress,
        recipientPublicKey
      );

      const mintInfo = await getMint(connection, mintAddress);
      const transaction = new Transaction().add(
        createTransferInstruction(
          senderTokenAccount.address,
          recipientTokenAccount.address,
          senderKeypair.publicKey,
          amount * Math.pow(10, mintInfo.decimals), // Chuyển đổi số lượng theo decimal của token
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair]
      );

      setTransactionStatus(`Transaction successful with signature: ${signature}`);
    } catch (error) {
      setTransactionStatus(`Transaction failed: ${error}`);
    }
  };

  return (
    <div>
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

export default SendTokenSPL;
