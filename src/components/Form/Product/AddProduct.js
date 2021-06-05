import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from '../form';
import '../form.css';
import { API_END_POINT_URL } from '../../../util';
import { addProduct, updateProduct } from '../../../actions/product';
import TextField from '../../Input/TextField';
import Button from '../../Input/Button';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      image: '',
      description: '',
      redirect: localStorage.getItem('userTokenTime')  ? false : true
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.titleInputChangeHandler = this.titleInputChangeHandler.bind(this);
    this.priceInputChangeHandler = this.priceInputChangeHandler.bind(this);
    this.imageInputChangeHandler = this.imageInputChangeHandler.bind(this);
    this.descriptionInputChangeHandler = this.descriptionInputChangeHandler.bind(this);
  }
  componentDidMount() {
       const { productList } = this.props;
    const url = window.location.href;
    if (url.includes('edit')) {
    const id = localStorage.getItem('id');
    const productDetail = productList.filter(pro => pro._id === id)
      this.setState({
        isEdit:true,
        productDetail: productDetail,
        productId: id,
        title: productDetail[0].title,
        price: productDetail[0].price,      
        image:`${API_END_POINT_URL}${productDetail[0].image}`,
        description: productDetail[0].description,
       });
      }
}
 async onSubmitHandler (e) {
    e.preventDefault();
    const { title, price, image, description, imageFile, isEdit,productId } = this.state;
    const { addProduct, updateProduct } = this.props;
    if (!(title === '' || price === '' || image === '' || description === '')) {
      const formData = new FormData();
      formData.append('image', imageFile);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
      const response = !isEdit ? await addProduct(formData) : await updateProduct(productId, formData);
      if (response) {
        this.setState({
          redirect: true
        });
      }
    } else {
      alert('Please enter valid details');
    }
  }

  titleInputChangeHandler(event) {
    this.setState({
      title: event.target.value
    });
  }

  priceInputChangeHandler(event) {
    this.setState({
      price: event.target.value
    });
  }

    imageInputChangeHandler(e) {
        const allowedImageTypes = ['png', 'jpg', 'jpeg'];
      if (e.target.files && e.target.files.length > 0) {
      const fileToUpload = e.target.files[0];
      if (!allowedImageTypes.includes(fileToUpload.type.split('/')[1])) {
          alert('file not support');
        return;
      }
        this.setState({  imageFile: fileToUpload })
         const reader = new FileReader();
         reader.addEventListener('load', () => {
        this.setState({ image: reader.result })
      }
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  descriptionInputChangeHandler(event) {
    this.setState({
      description: event.target.value
    });
  }

  render() {
    const { image, title, price, description, isEdit } = this.state;
     if (this.state.redirect) return <Redirect to='/products' />
    return (
      <Fragment>
        {
          <Form onSubmit={this.onSubmitHandler.bind(this)}>
            <h3 className="text-center text-info">{!isEdit ? 'Add Product' : ' Edit Product'}</h3>
            <TextField
              id='title'
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={this.titleInputChangeHandler}
            />
            <TextField
              id='price'
              type='number'
              name='price'
              placeholder='Price'
              value={price}
              onChange={this.priceInputChangeHandler}
            />
            <div className="form-group">
              <label htmlFor="image" className="text-info">Image</label><br />
              {image && <img src={image} alt="images" style={{ maxWidth: "25%" }} />}
              <input
                id="image"
                className="form-control"
                type="file"
                name="image"
                accept="image/*"
                placeholder="Image"
                onChange={this.imageInputChangeHandler}
              />
              
            </div>
            <TextField
              id="description"
              className="form-control"
              type="textarea"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.descriptionInputChangeHandler}
            />
            <Button
              name={'submit'}
              value={!isEdit ? "Save" : "Update"} />
          </Form>}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  productList: state.products,
});

export default connect(
  mapStateToProps,
  { addProduct, updateProduct }
)(AddProduct);
