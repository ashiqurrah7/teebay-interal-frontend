import React, { Fragment, useEffect } from "react";
import { Segment, Container, Dimmer, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

const MyProducts = ({ auth: { user, loading }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser, loading]);

  return (
    <Container textAlign="center" style={{ width: "50vw" }}>
      {loading ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <Fragment>
          <h1>My Products</h1>
          {user ? (
            user.products.length > 0 ? (
              user.products.map((product) => (
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
            )
          ) : (
            <Segment>Nothing to display</Segment>
          )}
        </Fragment>
      )}
    </Container>
  );
};

MyProducts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(MyProducts);
