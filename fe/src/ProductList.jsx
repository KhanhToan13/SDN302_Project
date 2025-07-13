import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Table } from 'react-bootstrap';

const ProductList = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get('http://localhost:9999/api/products');
                const data = res.data;
                if (data.length > 0) setProduct(data);
            } catch (error) {
                console.log('Lỗi server:' + error);
            }
        };

        getProduct();
    }, []);

    return (
        <Container>
            <h2 className="text-center">Product List</h2>
            <Row className="d-flex justify-content-start">
                <Button className="col-2 m-3">Add new product</Button>
            </Row>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>CategoryName</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((p, index) => (
                        <tr key={index}>
                            <td>{p._id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.stock}</td>
                            <td>{p.category.name}</td>
                            <td>
                                <Button variant="outline-danger" className="mx-2">
                                    Delete
                                </Button>
                                <Button variant="outline-primary">Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProductList;
