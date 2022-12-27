import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../redux/actions/productActions";
import axios from "axios";

const CreateProductScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { loading, success, error } = useSelector(
    (state) => state.productCreate
  );

  useEffect(() => {
    const navigate = () => {
      if (success) {
        navigate("/admin/products");
      }
    };
    navigate();
  }, [dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        description,
        brand,
        category,
        price,
        countInStock,
        image,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error.message);
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Create Product</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Message variant="danger">{error}</Message>}
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="brand" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            as="select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="Levi">Levi</option>
            <option value="Amazon Essentials">Amazon Essentials</option>
            <option value="Carhartt Store">Carhartt Store</option>
            <option value="Fruit of the Loom">Fruit of the Loom</option>
            <option value="Alberto Nardoni">Alberto Nardoni</option>
            <option value="Lucky Brand">Lucky Brand</option>
            <option value="DC Comics">DC Comics</option>
            <option value="J.Ver">J.Ver</option>
            <option value="Wrangler">Wrangler</option>
            <option value="QIMYUM">QIMYUM</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="Sweater">Sweater</option>
            <option value="Dress">Dress</option>
            <option value="Hoodies">Hoodies</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Flip-flops">Flip-flops</option>
            <option value="Shorts">Shorts</option>
            <option value="Skirt">Skirt</option>
            <option value="Skirt">Skirt</option>
            <option value="Jeans">Jeans</option>
            <option value="Shoes">Shoes</option>
            <option value="Coat">Coat</option>
            <option value="High heels">High heels</option>
            <option value="Suit">Suit</option>
            <option value="Cap">Cap</option>
            <option value="Socks">Socks</option>
            <option value="Shirt">Shirt</option>
            <option value="Bra">Bra</option>
            <option value="Scarf">Scarf</option>
            <option value="Swimsuit">Swimsuit</option>
            <option value="Hat">Hat</option>
            <option value="Gloves">Gloves</option>
            <option value="Jacket">Jacket</option>
            <option value="Long coat">Long coat</option>
            <option value="Boots">Boots</option>
            <option value="Sunglasses">Sunglasses</option>
            <option value="Tie">Tie</option>
            <option value="Polo shirt">Polo shirt</option>
            <option value="Leather jacket">Leather jacket</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="price" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock" className="mt-3">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Count In Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            label="Choose file"
            onChange={uploadFileHandler}
          ></Form.Control>
          {uploading && <Loading />}
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          {loading ? <Loading /> : `Add`}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateProductScreen;
