import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const ProductList: React.FC = () => {
  const products = [
    { id: 1, name: "Tiempo Legend 8", price: 3899 },
    { id: 2, name: "Mercurial Vapor 13", price: 3899 },
    { id: 3, name: "Mercurial Vapor 13", price: 3899 },
    { id: 4, name: "Mercurial Vapor 13", price: 3899 },
    { id: 5, name: "Mercurial Vapor 13", price: 3899 },
    { id: 6, name: "Mercurial Vapor 13", price: 3899 },
    { id: 7, name: "Mercurial Vapor 13", price: 3899 },
    { id: 8, name: "Mercurial Vapor 13", price: 3899 },
  ];

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
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