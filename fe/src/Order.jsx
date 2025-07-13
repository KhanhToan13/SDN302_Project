import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';

const Order = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axios.get('http://localhost:9999/api/orders');
                const data = res.data;
                if (data.length > 0) setOrder(data);
            } catch (error) {
                console.log('Lỗi server:' + error);
            }
        };

        getOrder();
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
                        <th>Customer Name</th>
                        <th>Items</th>
                        <th>TotalPrice</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((p, index) => (
                        <tr key={index}>
                            <td>{p._id}</td>
                            <td>{p.customerId.name}</td>
                            <td>
                                {p.products.map((p) => (
                                    <>
                                        <p>
                                            {p.productId.name} - SL:{p.quantity}
                                        </p>
                                        <br />
                                    </>
                                ))}
                            </td>
                            <td>{p.totalPrice}</td>
                            <td>{p.orderDate}</td>
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

export default Order;
