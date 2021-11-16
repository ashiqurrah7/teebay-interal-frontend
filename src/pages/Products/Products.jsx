import React, { Fragment, useEffect } from "react";
import { Segment, Container, Dimmer, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../actions/product";

const Products = ({ product: { products, loading }, getProducts }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container textAlign="center" style={{ width: "50vw" }}>
      {loading ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <Fragment>
          <h1>Products</h1>
          {products && products.length > 0 ? (
            products.map((product) => (
              <Segment key={product.id}>
                <h3>
                  <Link to={`products/${product.id}`}>{product.title}</Link>
                </h3>
                <p>
                  Categories:{" "}
                  {product.categories.map((category) => category.name + " ")}
                </p>
                <p>{product.desc}</p>
                <p>Price: ${product.price}</p>
              </Segment>
            ))
          ) : (
            <Segment>No Products available at this time</Segment>
          )}
        </Fragment>
      )}
    </Container>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(Products);
