import React from 'react';

import { connect } from 'react-redux';
import './common.css';
import Navbar from '../Navbar/Navbar';
import { Link, Redirect } from 'react-router-dom';
import { API_END_POINT_URL } from '../../util';
import { getProductList } from '../../actions/product';
//import pushApp from '../../firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    let shouldRedirect = localStorage.getItem('userTokenTime');
    if (!shouldRedirect) {
      this.setState({ redirect: true });
    } else {
    const { getProductList } = this.props;
    this.setState({ isloading: true });
     getProductList(lo => {
       if (lo) this.setState({ isloaded: true, isloading: false })
     });
    } 
  }
 
  handleClick = (id) => {
    localStorage.setItem('id', id);
 }

  render() {
  const { isloaded, isloading } = this.state;
    const { productList } = this.props;
     if (this.state.redirect) return <Redirect to="/signIn"/>
    return (
      <React.Fragment>
        <Navbar />  
       {isloading &&  <div className="loader"><div className="loader-inner"></div></div>}
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
            <div className="row">
          {
                productList && productList.length ? productList.map((product,index) => {
                  const imageUrl = `${API_END_POINT_URL}${product.image}`
                return (<Link key={index} className="product" to={`/product/${product._id}`} onClick={()=>this.handleClick(product._id)}>
                  <div className="title ctn">{product.title}</div>
                 <img src={imageUrl} className="imageCss" alt={'url'} />
                  <div className="ctn">${product.price}</div>
                 <div className="ctn">{product.description} </div>
                </Link>)
              })
                  : isloaded && 'Add Product'
           }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.products,
});

export default connect(
  mapStateToProps,
  {getProductList}
)(Dashboard);
