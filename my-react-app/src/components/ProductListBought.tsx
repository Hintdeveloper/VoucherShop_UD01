import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "./redux/slices/VoucherSlices";

const ProductListBought: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(getState);

  console.log(data);
  return (
    <Grid container spacing={3}>
      {data.map((product) => (
        <Grid item xs={14} sm={8} md={6} lg={5} key={product.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.price} VND
              </Typography>
            </CardContent>
            <button>BUY</button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListBought;
