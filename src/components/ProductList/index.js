import React, { useState } from 'react'
import productList from '../../products.json'
import categoryList from '../../categories.json'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//components
import { Container, Row, Col, Form, ListGroup, Button } from 'react-bootstrap'
import Main from '../layout/main'


//actions
import { addProduct } from '../../redux/actions/productActions'

function ProductList(props){
    const [products, setProducts] = useState(productList)

    const addProdutToCart = (product) =>{
        const { addProduct } = props
        addProduct(product)
    }

    const changeCategory = (category) => {
       if(category === "all"){
            setProducts(productList)
       }else{
           const category_id = parseInt(category)
           setProducts(productList.filter(product => product.category_id === category_id))
       }
    }

    return(
        <Main>
            <Container className="pt-5">
                <Row className="mb-5 justify-content-center">
                    <Col md={6}>
                        <Form.Control as="select" onChange={(event) => changeCategory(event.target.value)}>
                            <option value="all">Categorias</option>
                            {categoryList.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)}
                        </Form.Control>
                    </Col>
                </Row>

                <Row className="mb-5 justify-content-center">
                    <Col md={8}>
                        <ListGroup>
                            {products.map((product, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex justify-content-between"
                                    as="div"
                                    action variant="primary" >
                                    {product.name}
                                    <Button onClick={()=> addProdutToCart(product)}>Adicionar ao carrinho <i className="fa fa-plus"></i></Button>
                                    
                                </ListGroup.Item>
                            ))}                        
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </Main>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addProduct,
}, dispatch)

export default connect(null, mapDispatchToProps)(ProductList)