import React, { useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CurrencyFormat from 'react-currency-format';

//components
import { Container, Row, Col, ListGroup, Button, Modal } from 'react-bootstrap'
import Main from '../layout/main'

//actions
import { resetCart, changeQuantity } from '../../redux/actions/productActions'

function Checkout(props){
    const [modal, setModal] = useState({
        showSuccess:false,
        showEmptyCart:false
    })
    const { cart, resetCart, changeQuantity, history } = props

    useEffect(() => {
        if(cart.length === 0){
            let newState = { ...modal } 
            newState.showEmptyCart = true
            setModal(newState)
        }
    });

    const closeModal = (modalType) =>{
        let newState = { ...modal }
        newState[modalType] = false
        setModal(newState)
        resetCart()
        history.push('/')
    }

    const handleCheckout = () => {
        let newState = { ...modal }
        newState.showSuccess = true
        setModal(newState)
    }

    const getTotal = (cart) =>{
        const total = cart.reduce((total, product) =>{
            return total + product.price * product.quantity
        }, 0)
        return total
    }

    return(
        <Main showCart={false}>
            <Container className="pt-5">
                <Row className="mb-5">
                    <Col className="text-center">
                        <h1>Finalizar Pedido</h1>
                    </Col>                    
                </Row>

                <Row className="mb-5 justify-content-center">
                    <Col xs={12} md={8}>
                        <ListGroup>
                            {cart.map((product, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex justify-content-between"
                                    as="div"
                                    action
                                    variant="primary" >
                                    <div>
                                        <Button 
                                            className="btn-round"
                                            onClick={() => changeQuantity({newQuantity: product.quantity - 1, productId: product.id})}>
                                            <i className="fa fa-minus"></i>
                                        </Button>
                                        {product.quantity}
                                        <Button 
                                            className="btn-round"
                                            onClick={() => changeQuantity({newQuantity: product.quantity + 1, productId: product.id})}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                        {product.name}
                                    </div>
                                    <CurrencyFormat 
                                        value={product.price * product.quantity} 
                                        displayType={'text'} 
                                        thousandSeparator={'.'} 
                                        decimalSeparator={','} 
                                        prefix={'R$ '}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        renderText={value => <div>{value}</div>} />                      
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item 
                                className="d-flex justify-content-between"
                                as="div"
                                action
                                variant="primary">
                                <div><strong>TOTAL:</strong></div>
                                <CurrencyFormat 
                                    value={getTotal(cart)} 
                                    displayType={'text'} 
                                    thousandSeparator={'.'} 
                                    decimalSeparator={','} 
                                    prefix={'R$ '}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    renderText={value => <div>{value}</div>} />
                            </ListGroup.Item>      
                        </ListGroup>
                    </Col>                    
                </Row>

                <Row className="mb-5">
                    <Col className="text-center">
                        <Button variant="success" size="lg" onClick={handleCheckout}>Finalizar Pedido</Button>
                    </Col>                    
                </Row>
            </Container>
            
            <Modal show={modal.showSuccess} onHide={() => closeModal('showSuccess')}>
                <Modal.Header closeButton>
                    <Modal.Title>Compra realizada com Sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => closeModal('showSuccess')}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modal.showEmptyCart} onHide={() => closeModal('showEmptyCart')}>
                <Modal.Header closeButton>
                    <Modal.Title>Você não tem produtos no carrinho :(</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => closeModal('showEmptyCart')}>
                        Ver lista de produtos
                    </Button>
                </Modal.Footer>
            </Modal>
        </Main>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeQuantity,
    resetCart,
}, dispatch)

const mapStateToProps = (store) => ({
    cart: store.productsStore.cart
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))