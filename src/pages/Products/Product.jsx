import React, {Fragment, useEffect} from 'react'
import { Container, Segment } from 'semantic-ui-react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getProduct } from "../../actions/product"

const Product = ({ product: { product, loading }, getProduct, match }) => {
    

    useEffect(() => {
        getProduct(match.params.id);
    }, [match.params.id, getProduct]);

    return (
        <Container>
            {product ? (
                <Fragment>
                    <Segment>
                        <h3>{product.title}</h3>
                            <p>Categories: {product.categories.map(category => (category.name+" "))}</p>
                            <p>{product.desc}</p>
                            <p>Price: {product.price}</p>
                    </Segment>
                </Fragment>
            ) : (
                <Segment> Oops something went wrong! </Segment>
            )}
        </Container>
    )
}

Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
  };
  
const mapStateToProps = (state) => ({
    product: state.product,
});

export default connect(mapStateToProps, { getProduct })(Product)
