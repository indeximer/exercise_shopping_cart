import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//style
import './_navheader.scss'

//components
import { Navbar } from 'react-bootstrap'

function Navheader(props){
    const { showCart, cart } = props
    return(
        <Navbar className="justify-content-between" expand="lg" variant="dark" bg="dark">
            <Navbar.Brand href="/">Produtos</Navbar.Brand>
            {showCart &&
                <Navbar.Text>
                    <Link to="/checkout">
                        <i className="fa fa-shopping-cart cart">
                            {cart.length > 0 &&
                                <span className="cart-counter">{cart.length}</span>
                            }                        
                        </i>
                    </Link>
                </Navbar.Text>
            }
        </Navbar>
    )
}

const mapStateToProps = (store) => ({
    cart: store.productsStore.cart
})
export default connect(mapStateToProps)(Navheader)