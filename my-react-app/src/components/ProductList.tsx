import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const ProductList: React.FC = () => {
  const products = [
    { id: 1, name: 'Tiempo Legend 8', price: 3899 },
    { id: 2, name: 'Mercurial Vapor 13', price: 3899 },
  ];

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
