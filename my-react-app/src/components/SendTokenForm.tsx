import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  getMint,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import React, { useState } from "react";


const sendToken = async () => {
  const { sendTransaction } = useWallet();
  // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  // Địa chỉ mint của SPL token
  const mintAddress = new PublicKey(
    "Hj1RB4fFwUPjtAu94GGurqpNkkfNHugGHTLySSaKR8JY"
  );
  // Địa chỉ ví người gửi
  const senderAddressPublicKey = new PublicKey("7x1TjnukrK1Y2C5xTqUUc8YFmFJr7HFqzPtscY7bxCb7");
  // Địa chỉ ví người nhận
  const recipientPublicKey = new PublicKey(
    "3uAftQ4avEt3pkBBjWptA9W9fQgjX2FZJfk4VHCnwSUP"
  );

  try {
    if (!senderAddressPublicKey || !recipientPublicKey ) {
      return;
    }
    //tạo account người gửi
    const senderTokenAccount = getAssociatedTokenAddressSync(
      mintAddress,
      senderAddressPublicKey
    );
    const recipientTokenAccount = getAssociatedTokenAddressSync(
      mintAddress,
      recipientPublicKey
    );
    const mintInfo = await getMint(connection, mintAddress);
    const tr = new Transaction().add(
      createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount,
        senderTokenAccount,
        1000 * Math.pow(10, mintInfo.decimals)
      )
    );

    const signature = await sendTransaction(tr, connection);

    alert(`Transaction successful with signature: ${signature}`);
  } catch (error) {
    console.log(error);
  }
};

export default sendToken;


// import {
//   createTransferInstruction,
//   getAssociatedTokenAddressSync,
//   getMint
// } from "@solana/spl-token";
// import { useWallet } from "@solana/wallet-adapter-react";
// import {
//   Connection,
//   PublicKey,
//   Transaction
// } from "@solana/web3.js";
// import React from "react";

// const SendSPL: React.FC = () => {
//   const { publicKey, sendTransaction } = useWallet();

//   const sendToken = async () => {
//     console.log(publicKey?.toBase58())
//     // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//     const connection = new Connection(
//       "https://api.devnet.solana.com",
//       "confirmed"
//     );

//     // Địa chỉ mint của SPL token
//     const mintAddress = new PublicKey(
//       "Hj1RB4fFwUPjtAu94GGurqpNkkfNHugGHTLySSaKR8JY"
//     );

//     // Địa chỉ ví người nhận
//     const recipientPublicKey = new PublicKey("5kPR7So5bdq8oUXJWoLa4V1PCf7b7HyYtk79HxAJGvRT");
//     const senderPublicKey = new PublicKey("3uAftQ4avEt3pkBBjWptA9W9fQgjX2FZJfk4VHCnwSUP");

//     try {

//       //tạo account người gửi
//       const senderTokenAccount = getAssociatedTokenAddressSync(
//         mintAddress,
//         senderPublicKey
//       );
//       const recipientTokenAccount = getAssociatedTokenAddressSync(
//         mintAddress,
//         recipientPublicKey
//       );

//       const mintInfo = await getMint(connection, mintAddress);
//       const transaction = new Transaction().add(
//         createTransferInstruction(
//           senderTokenAccount,
//           recipientTokenAccount,
//           senderPublicKey,
//           1000000000
//         )
//       );

//       await sendTransaction(transaction, connection);


//     } catch (error) {
//       console.log("err: ", error)
//     }
//   };

//   return (
//     <div style={{ marginTop: "300px" }}>
//       {/* <ButtonConnect/> */}
//       <button onClick={sendToken}>Send Token</button>
//     </div>
//   );
// };

// export default SendSPL;
