import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './components/Common/Dashboard';
import ProductDetail from './components/Common/ProductDetail';
import Upload from './components/Upload/Upload';
import SignIn from './components/Form/SignIn/SignIn';
import AddProduct from './components/Form/Product/AddProduct';
import SignUp from './components/Form/SignUp/SignUp';
import SignOut from './components/signOut/SignOut';
import VerifyEmail from './components/Form/SignUp/VerifyEmail';
import history from './store/history';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
   let shouldRedirect = localStorage.getItem('userTokenTime');
    if (!shouldRedirect) {
       history.push ('/signIn')
     }
  }
  render() {
    
    return (
      <React.Fragment>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/products" component={Dashboard} />
      <Route  exact path={`/product/:id`} component={ProductDetail} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/add-product" component={AddProduct} />
      <Route exact path="/edit-product/:id" component={AddProduct} />
      <Route exact path="/signUp" component={SignUp} />
      <Route  path="/verifyEmail" component={VerifyEmail} />
      <Route exact path="/signOut" component={SignOut} />
    </React.Fragment>
    );
  }
}

export default App;
