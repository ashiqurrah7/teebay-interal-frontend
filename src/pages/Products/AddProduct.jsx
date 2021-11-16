import React, { useState } from "react";
import {
  Form,
  Button,
  Segment,
  Label,
  Container,
  Select,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProduct } from "../../actions/product";

const AddProduct = ({createProduct}) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: 0,
    category_ids: [],
  });

  const countryOptions = [
    { key: "af", value: 1, text: "Electronics" },
    { key: "ax", value: 2, text: "Furniture" },
    { key: "al", value: 3, text: "Home Appliances" },
    { key: "dz", value: 4, text: "Sporting Goods" },
    { key: "as", value: 5, text: "Outdoor" },
    { key: "ad", value: 6, text: "Toys" },
  ];

  //Handles value changes in text inputs
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCategoriesChange = (e, {value}) => {
    setFormData({ ...formData, category_ids: value });
  };

  const onSubmit = async () => {
    createProduct(formData)
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { title, desc, price, category_ids } = formData;

  return (
    <Container textAlign="center" style={{ width: "40vw" }}>
      <h1>Add a Product</h1>
      <Segment style={{ padding: "5vh" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <input
              type="text"
              placeholder="Product Title"
              {...register("title", {
                required: true,
              })}
              value={title}
              onChange={(e) => onChange(e)}
            />
            {errors.title?.type === "required" && (
              <Label basic color="red" pointing>
                A title is required
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <textarea
              placeholder="Product Description"
              {...register("desc", {
                required: true,
              })}
              value={desc}
              onChange={(e) => onChange(e)}
            />
            {errors.desc?.type === "required" && (
              <Label basic color="red" pointing>
                A title is required
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="Product Price"
              {...register("price", {
                required: true,
              })}
              value={price}
              onChange={(e) => onChange(e)}
            />
            {errors.price?.type === "required" && (
              <Label basic color="red" pointing>
                Please set a price for the product
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <Select
              placeholder="Select Categories"
              onChange={onCategoriesChange}
              value={category_ids}
              options={countryOptions}
              multiple
            />
          </Form.Field>
          <Button type="submit" color="violet">
            ADD PRODUCT
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

AddProduct.propTypes = {
    createProduct: PropTypes.func.isRequired,
};

export default connect(null, {createProduct})(AddProduct);
