import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormGroup } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';


function Cart(props) {
  let history = useHistory()
  const items = props.cartItems;

  if (items.length < 1) {
    history.push('/');
  }

  let total = 0;

  items.forEach(value => {
    total += Number.parseFloat(value.price);
  })

  return (
    <div>
      <h4 className="d-flex flex-row justify-content-between">
        <span className="text-muted">Your cart</span>
        <span className="badge badge-secondary badge-pill">{items.length}</span>
      </h4>
      <div className="card">
        <ul className="list-group list-group-flush">
          {items.map(item =>

            <li key={item.name} className="list-group-item">
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                  <h6 style={{ fontSize: '1.2rem' }}>{item.name}</h6>
                  <span style={{ fontSize: '0.8rem' }} className="text-muted">{item.description}</span>
                </div>

                <div>
                  <p>GHC {item.price}</p>
                </div>
              </div>
            </li>
          )}

          <li className="list-group-item">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-column">
                <h6 className="lead">Total (GHC)</h6>
              </div>

              <div>
                <p className="font-weight-bold">GHC {total}</p>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
}

function Billing(props) {

  const initialFormData = Object.freeze({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    zipcode: "",
    saveInfoNextTime: "",
    sameShippingAddress: "",
    payment: "",
    paymentCardName: "",
    paymentCardNumber: "",
    paymentCardExpirationDate: "",
    paymentCVV: "",
  });



  const [formData, updateFormData] = React.useState(initialFormData);
  const [validated, setValidated] = React.useState(false);
  const [show, setShow] = useState(false);

  const closeModal = () => {
    setShow(false)
  }
  const openModal = () => {
    setShow(true)
  }

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(false)
    } else {
      openModal();
      console.log(formData);
      
    }
    // console.log(formData);
    // ... submit to API or something
  };


  const Col = 'div';
  return (
    <div>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body><p className="text-success">Payment successful</p></Modal.Body>
      </Modal>
      <Form noValidate validated={validated}>
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-md-6 pl-0">
              <Form.Group as={Col} >
                <Form.Label column="lg" lg={10}>First name</Form.Label>
                <Form.Control size="lg" onChange={handleChange} type="text" required name="firstname" />
              </Form.Group>
            </div>

            <div className="col-md-6 pr-0">
              <Form.Group as={Col}>
                <Form.Label column="lg" lg={10}>Last name</Form.Label>
                <Form.Control size="lg" onChange={handleChange} type="text" name="lastname" />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 p-0">
              <Form.Label className="pt-0" column="lg" lg={10}>
                Username
            </Form.Label>
              <InputGroup className="">
                <InputGroup.Prepend>
                  <InputGroup.Text>@ </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl size="lg" onChange={handleChange} placeholder="Username" name="username" />
              </InputGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 p-0">
              <Form.Group as={Col}>
                <Form.Label className="pt-3" column="lg" lg={10}>Email (optional)</Form.Label>
                <Form.Control size="lg" onChange={handleChange} type="email" placeholder="you@example.com" name="email" />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 p-0">
              <Form.Group as={Col}>
                <Form.Label className="pt-0" column="lg" lg={10}>Address</Form.Label>
                <Form.Control size="lg" onChange={handleChange} type="text" name="address1" placeholder="" />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 p-0">
              <Form.Group as={Col}>
                <Form.Label className="pt-0" column="lg" lg={10}>Address 2 (Optional)</Form.Label>
                <Form.Control size="lg" onChange={handleChange} type="text" name="address2" placeholder="" />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5 pl-0">
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control size="lg" onChange={handleChange} value="Ghana" as="select" name="country" custom>
                  <option value="Ghana" >Ghana(GH)</option>
                  <option value="Togo">Togo (TG)</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control size="lg" onChange={handleChange} value="Accra" as="select" name="state" custom>
                  <option value="Accra" >Accra</option>
                  <option value="Kumasi">Kumasi</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-3 pr-0">
              <Form.Group>
                <Form.Label>Zip</Form.Label>
                <Form.Control size="lg" onChange={handleChange} name="zipcode" type="text" />
              </Form.Group>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-12">
              <Form.Check
                custom
                type={'checkbox'}
                id={'checkbox1'}
                name={'sameShippingAddress'}
                onChange={handleChange}
                value={'true'}
                label={`Shipping address is the same as my billing address`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Check
                custom
                type={'checkbox'}
                id={'checkbox2'}
                name={'saveInfoNextTime'}
                value={'true'}
                onChange={handleChange}
                label={`Save this information for next time`}
              />
            </div>
          </div>

          <hr />

          <h4>Payment</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex flex-column">
                <Form.Check
                  custom
                  type={'radio'}
                  name={'payment'}
                  id={'radio1'}
                  label={`Credit card`}
                  value={'credit card'}
                  onChange={handleChange}
                />
                <Form.Check
                  custom
                  type={'radio'}
                  name={'payment'}
                  id={'radio2'}
                  label={`Debit card`}
                  value={`Debit card`}
                  onChange={handleChange}
                />
                <Form.Check
                  custom
                  type={'radio'}
                  name={'payment'}
                  id={'radio3'}
                  label={`PayPal`}
                  value={`PayPal`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 pl-0">
              <Form.Group as={Col} >
                <Form.Label column="lg" lg={10}>Name on Card</Form.Label>
                <Form.Control size="lg" onChange={handleChange} type="text" name="paymentCardName" />
                <Form.Text id="passwordHelpBlock" muted>
                  Full name as displayed on card
              </Form.Text>
              </Form.Group>
            </div>

            <div className="col-md-6 pr-0">
              <Form.Group as={Col}>
                <Form.Label column="lg" lg={10}>Credit card number</Form.Label>
                <Form.Control size="lg" onChange={handleChange} name="paymentCardNumber" type="text" />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 pl-0">
              <Form.Group as={Col} >
                <Form.Label column="lg" lg={10}>Expiration</Form.Label>
                <Form.Control size="lg" onChange={handleChange} name="paymentCardExpirationDate" type="text" />
              </Form.Group>
            </div>

            <div className="col-md-3 pr-0">
              <Form.Group as={Col}>
                <Form.Label column="lg" lg={10}>CVV</Form.Label>
                <Form.Control size="lg" onChange={handleChange} name="paymentCVV" type="text" />
              </Form.Group>
            </div>
          </div>

          <hr className="my-5" />

          <div className="row">
            <div className="col-md-12 pl-0">
              <Button variant="primary" onClick={handleSubmit} size="lg" type="submit" block>Continue to checkout</Button>
            </div>
          </div>

        </div>
      </Form>
    </div>
  );
}



function CheckoutComponent(props) {
  let foundItems = [];
  let allItems = [];
  const { state } = useLocation();
  const cartItems = state.cartItems

  if (cartItems) {
    cartItems.forEach(item => {
      if (item.checked == true) {
        foundItems.push(item)
      }
    });

  }

  return (
    <div>
      <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" width="72" height="72" src="/bootstrap-solid.svg" />
        <h2>Checkout form</h2>
        <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8"><Billing /></div>
          <div className="col-md-4"><Cart cartItems={foundItems} /></div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComponent;
