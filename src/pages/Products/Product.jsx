import React, { Fragment, useEffect } from "react";
import { Button, Container, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { getProduct, removeProduct } from "../../actions/product";
import { createConversation } from "../../actions/chat";
import { Link, useHistory } from "react-router-dom";

const Product = ({ product: { product, loading }, getProduct, removeProduct, createConversation, match }) => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const buttonsFloatRightStyle = {float:"right", clear:"both"}

  useEffect(() => {
    getProduct(match.params.id);
  }, [match.params.id, getProduct, loading]);
  const handleDelete = () => {
    removeProduct(match.params.id)
    history.push('/products')
  }
  const handleContactOwner = () => {
    createConversation({second_user_id: product.user_id}, history)
  }
  return (
    <Container>
      {product ? (
        <Fragment>
          <Segment textAlign="center">
            <h3>{product.title}</h3>
            <p>
              Categories:{" "}
              {product.categories.map((category) => category.name + " ")}
            </p>
            <p>Description: {product.desc}</p>
            <p>Price: ${product.price}</p>
          </Segment>
          {user && user.id === product.user_id ? (
            <div style={buttonsFloatRightStyle}>
              <Button
                as={Link}
                to={`/products/${product.id}/edit`}
                color="violet"
                style={{ marginRight: "20px" }}
              >
                Edit Product
              </Button>
              <Button color="red" onClick={handleDelete}>Delete Product</Button>
            </div>
          ) : (
            <div style={buttonsFloatRightStyle}>
              <Button onClick={handleContactOwner}  color="violet">
                Contact Product Owner
              </Button>
            </div>
          )}
        </Fragment>
      ) : (
        <Segment> Oops something went wrong! </Segment>
      )}
    </Container>
  );
};

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  createConversation: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProduct, removeProduct, createConversation })(Product);
