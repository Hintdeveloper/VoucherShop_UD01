import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getState } from "./redux/slices/VoucherSlices";

const ProductList: React.FC = () => {
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
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
