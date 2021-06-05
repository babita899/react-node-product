import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Form from '../form';
import '../form.css';
import { API_END_POINT_URL } from '../../../util';
import TextField from '../../Input/TextField';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: localStorage.getItem('userTokenTime') ? true : false
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);
  }

  
  onSubmitHandler() {
    if (!(this.state.email === '' || this.state.password === '')) {
      axios.post(`${API_END_POINT_URL}api/signIn`, {
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        localStorage.setItem('userTokenTime', res.token);
        localStorage.setItem('userTime', new Date().getTime());
        this.setState({
          redirect: true
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert('Please enter valid details');
    }
  }

  emailInputChangeHandler(event) {
    this.setState({
      email: event.target.value
    });
  }

  passwordInputChangeHandler(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/products" />;
    return (
      <Form onSubmit={this.onSubmitHandler.bind(this)}>
        <h3 className="text-center text-info">Login</h3>
        <TextField
          id="email"
          className="form-control"
          type="email"
          name="email"
          placeholder="example@domain.com"
          label="Email"
          onChange={this.emailInputChangeHandler}
        />
        <TextField
          id="password"
          className="form-control"
          type="password"
          name="password"
          placeholder="********"
          label="Password"
          onChange={this.passwordInputChangeHandler}
        />
        <div className="d-flex justify-content-between align-items-end">
          <button onClick={this.onSubmitHandler} className="btn btn-info btn-md" type="button">Submit</button>
          <Link to="/signUp" className="text-info">Sign Up here</Link>
        </div>
      </Form>
    );
  }
}

export default SignIn;
