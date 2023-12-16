import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { FormCheck } from 'react-bootstrap';

class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicks: 0, isToggled: true }
        this.handleClicks = this.handleClicks.bind(this)
    }

    componentDidMount() {
        console.log("Component mounted");
    }

    handleClicks(id, place) {
        this.setState({
            clicks: this.state.clicks += 1,
            isToggled: !this.state.isToggled
        })
        console.log('this is the ID:' + id);
        console.log('this is the place: ' + place);

    }

    render() {
        return (<div onClick={this.handleClicks.bind(this, 3, 4)}><button className={this.state.isToggled ? 'btn btn-primary' : 'btn'}>The button counts {this.state.clicks}</button></div>)
    }
}


class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loggedIn: false }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogin() {
        this.setState({
            loggedIn: true
        })
    }

    handleLogout() {
        this.setState({
            loggedIn: false
        })
    }

    render() {
        const isLoggedIn = this.state.loggedIn;
        let button;
        if (isLoggedIn) {
            button = <button onClick={this.handleLogout} className="btn btn-dark"> Logout</button>
        } else {
            button = <button onClick={this.handleLogin} className="btn btn-primary"> Login</button>
        }


        return (
            <div>
                {button}
            </div>
        )
    }
}

function Warning(props) {
    if (!props.warningSwitch) {
        return null
    }

    return (
        <div>This is a warning</div>
    );
}

class WarningBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showWarning: false }
        this.handleWarnDisplay = this.handleWarnDisplay.bind(this)
    }

    handleWarnDisplay() {
        this.setState({
            showWarning: !this.state.showWarning
        })
    }

    render() {


        return (
            <div>
                <Warning warningSwitch={this.state.showWarning} />
                <button onClick={this.handleWarnDisplay} className="btn btn-warning">{!this.state.showWarning ? 'Show' : 'Hide'}</button>
            </div>
        )
    }
}


function CheckoutButton(props) {
    const history = useHistory();
    let formData = props.formData;

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        history.push('/checkout', { cartItems: formData });
    };

    return (
        <Button variant="primary" type="submit" onClick={handleSubmit} size="lg">Proceed to checkout</Button>
    )
}

class ShopItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [] }
        this.itemClicked = this.itemClicked.bind(this)
        this.onItemChange = this.onItemChange.bind(this)
    }


    componentDidMount() {
        const _items = this.props.items;
        this.setState({
            items: _items
        })
    }

    onItemChange(item_index) {
        // do nothing to satisfy the onChange warning        
    }

    itemClicked(item_index) {
        let _items = this.state.items;
        _items[item_index].checked = !_items[item_index].checked
        this.setState({
            items: _items
        })
    }



    render() {
        const listItems = this.state.items
        return (
            <form>
                <div className="d-flex flex-row flex-wrap">
                {listItems.map((itemData, index) =>
                    <div key={`productItem${itemData.id}`} style={{ width: '300px' }} className={itemData.checked ? 'checkedItem p-2' : 'p-2'} onClick={this.itemClicked.bind(this, index)}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={itemData.imageurl} />
                        </Card>
                        <Form.Check 
                        type="checkbox"
                        value={itemData.id}
                        name={itemData.name}
                        custom
                        onChange={this.onItemChange.bind(this, index)}
                        checked={itemData.checked ? 'checked' : ''}
                        label={`${itemData.name} - GHC ${itemData.price}`}
                        />
                    </div>
                )}
                </div>
                <CheckoutButton formData={this.props.items} />
            </form>
        )
    }
}


function BuyComponent(props) {
    return (
        <div>
            <div className="mt-5">
                <h3 className="text-center">Buy Item</h3>
                <p className="lead text-center">Select item to and buy</p>
            </div>
            <ShopItem items={props.items} />
        </div>
    );
}


export default BuyComponent;

