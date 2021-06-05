import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './common.css';
import Navbar from '../Navbar/Navbar';
import { Redirect ,Link} from 'react-router-dom'
import { API_END_POINT_URL } from '../../util';

class ProductDetail extends Component {
    state = {
        productDetail:{}
    }
  componentDidMount() {
    let shouldRedirect = localStorage.getItem('userTokenTime');
    if (!shouldRedirect) {
      this.setState({ redirect: true });
    } else {
      const { productList } = this.props;
      const id = localStorage.getItem('id');
      const productDetail = productList.filter(pro => pro._id === id)
      this.setState({ productDetail: productDetail, productId: id });
    }
  }

    handleDelete = () => {
      axios.delete(`${API_END_POINT_URL}api/products/${this.state.productId}`).then(res => this.setState({ redirect:true})
    );
    }
    render() { 
        const { productDetail,productId } = this.state;
        if (this.state.redirect) return <Redirect to="/products"/>
        return (
            <div>
            <Navbar />
            {
              <div className="container mt-5">
                <div id="login-row" className="row justify-content-center align-items-center">
                  <div id="login-column" className="col-md-3 py-3">
                    <div id="login-box" className="col-md-12">
                      <div className='product-detail-container'>
                        <div>
                          <div className='product-detail'>{productDetail[0] && productDetail[0].title}</div>
                          <div className='product-detail imageCss'><img src={`${API_END_POINT_URL}${productDetail[0] && productDetail[0].image}`} alt={'url'}  className="imageCss" /></div>
                          <div className='product-detail'>${productDetail[0] && productDetail[0].price}</div>
                          <div className='product-detail'>{productDetail[0] && productDetail[0].description}</div>
                        </div>
                        <div className="row">
                          <Link to={`/edit-product/${productId}`}><button className='btn btn-info edit-btn' >Edit</button></Link>
                          <button className='btn btn-danger btn-css' onClick={this.handleDelete}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            </div>
        );
    }
}
 

const mapStateToProps = state => ({
  productList: state.products,
});

export default connect(
  mapStateToProps,
  {}
)(ProductDetail);
