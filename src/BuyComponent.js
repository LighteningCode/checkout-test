import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { FormCheck } from 'react-bootstrap';

function ItemList(props) {
    const location = useLocation();
    const history = useHistory();
    let formKeys = {}

    props.items.forEach(item => {
        formKeys[item.name] = ""
    });

    const initialFormData = Object.freeze(formKeys);

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData);
        history.push('/checkout', { cartItems: formData });
    };

    const items = props.items;

    return (
        <div className="container">
            <Form className="mb-5">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="text-center">Items</h4>
                        {items.map((item, index) =>
                            <div value={item.id} key={`item${index}`} id={`itemContainer${index}`}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.imageurl} />
                                </Card>
                                <Form.Check
                                    id={`item${index}`}
                                    custom
                                    onChange={handleChange}
                                    type={'checkbox'}
                                    name={item.name}
                                    value={item.id}
                                    label={`${item.name} - GHC ${item.price}`}
                                />
                            </div>
                        )}
                    </div>

                </div>
                <Button variant="primary" type="submit" onClick={handleSubmit} size="lg" block>Proceed to checkout</Button>
            </Form>

        </div>
    )
}

function BuyComponent(props) {
    return (
        <div>
            <div className="mt-5">
                <h3 className="text-center">Buy Item</h3>
                <p className="lead text-center">Select item to and buy</p>
            </div>
            <ItemList items={props.items} />
        </div>
    );
}


export default BuyComponent;

