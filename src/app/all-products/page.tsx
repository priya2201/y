'use client';
import React, { useEffect, useState } from 'react';
// import {  useRouter} from 'next/router';
import { Button, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function AllProducts() {
    const [products, setProducts] = useState([]);
    // const router = useRouter();

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/');
                const data = await response.json();
                setProducts(Array.isArray(data) ? data : data.products || []);
                console.log(data.products, data, 'data')
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetching();
    }, []);

    // const handleEditClick = (id: string) => {
    //     router.push(`/edit-product/${id}`);
    // };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>All Products</Typography>
            <List>
                {products.map(product => (
                    <ListItem key={product._id} divider>
                        <ListItemText primary={product.title} secondary={`Price: $${product.price}`} />
                        {/* <Button variant="contained" onClick={() => handleEditClick(product._id)}>Edit</Button> */}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default AllProducts;
