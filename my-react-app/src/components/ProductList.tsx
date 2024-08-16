import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getState, voucherType } from "./redux/slices/VoucherSlices";
import gameshiftService from "../gameshift.service";
import { Image } from "@mui/icons-material";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  getMint
} from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  Transaction
} from "@solana/web3.js";
import SendSPL from "./SendTokenForm";
import { json } from "react-router-dom";
import '../styles/listproduct.scss'


const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const wallet = useWallet()
  // const data = useSelector(getState);
  const email = "hientranle1209@gmail.com";

  const [listProduct, setlistProduct] = useState<voucherType>(useSelector(getState));

  useEffect(() => {
    gameshiftService.fetchVoucherlist(email).then(res=>{
      // console.log(res.data.data);
      const data = res.data.data;
      const fileterData = data.filter((item: any) => item.type === 'UniqueAsset');
      setlistProduct(fileterData.map((item: any) => item.item));
      if(wallet.connected){
        localStorage.setItem("publicKeyClient",JSON.stringify(wallet.publicKey?.toBase58()))
      }
    });
  }, []);


console.log(listProduct)




  const sendToken = async (amount: number,idPrd:string) => {
    console.log(wallet.publicKey?.toBase58())

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
    const recipientPublicKey = new PublicKey("3uAftQ4avEt3pkBBjWptA9W9fQgjX2FZJfk4VHCnwSUP");
    const senderPublicKey = new PublicKey(wallet.publicKey?.toBase58()+"")

    try {

      //tạo account người gửi
      const senderTokenAccount = getAssociatedTokenAddressSync(
        mintAddress,
        senderPublicKey
      );
      const recipientTokenAccount = getAssociatedTokenAddressSync(
        mintAddress,
        recipientPublicKey
      );

      const transaction = new Transaction().add(
        createTransferInstruction(
          senderTokenAccount,
          recipientTokenAccount,
          senderPublicKey,
          amount
        )
      );

      await wallet.sendTransaction(transaction, connection);
      gameshiftService.BuyVoucher("hientranle1209@gmail.com",senderPublicKey.toBase58(),idPrd)
      console.log(senderPublicKey.toBase58())
      console.log(amount)

    } catch (error) {
      console.log("err: ", error)
    }
  };


  return (
    <Grid container spacing={3}>
      {listProduct.map((product) => (
        <Grid item xs={14} sm={8} md={6} lg={5} key={product.id}>
          <Card key={product.id}>
            <CardContent>
              <img src={product.imageUrl}/>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <button onClick={()=>sendToken(1000,product.id)}><span className="text">BUY</span></button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
