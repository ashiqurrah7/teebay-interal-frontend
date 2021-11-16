import React, { Fragment, useEffect } from "react";
import { Button, Container, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { getProduct } from "../../actions/product";
import { Link } from "react-router-dom";

const Product = ({ product: { product, loading }, getProduct, match }) => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getProduct(match.params.id);
  }, [match.params.id, getProduct, loading]);

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
            <p>{product.desc}</p>
            <p>Price: ${product.price}</p>
          </Segment>
          {user && user.id === product.user_id ? (
            <div>
              <Button
                as={Link}
                to={`/products/${product.id}/edit`}
                color="violet"
                style={{ marginRight: "20px" }}
              >
                Edit Product
              </Button>
              <Button color="red">Delete Product</Button>
            </div>
          ) : (
            <div>
              <Button as={Link} to={`/chat/1`} color="violet">
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
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProduct })(Product);
