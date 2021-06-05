import React from 'react';
import { Link, Redirect } from 'react-router-dom'

import Form from '../form';
import '../form.css';
import { signUpApi } from '../../../service/auth';
import TextField from '../../Input/TextField';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      redirect: localStorage.getItem('userTokenTime') ? true : false
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.firstNameInputChangeHandler = this.firstNameInputChangeHandler.bind(this);
    this.lastNameInputChangeHandler = this.lastNameInputChangeHandler.bind(this);
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);
  }

  async onSubmitHandler (e) {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    if (!(firstName === '' || lastName === '' || email === '' || password === '')
      && (EMAIL_REGEX.test(email))) {
    await  signUpApi({ firstName, lastName, email, password })
        .then(res => {
          this.setState({
            redirect: true
          });
        }).catch(err => {
           alert(err);
          console.log(err);
        });
    } else {
      alert('Please enter valid details');
    }
  }

  firstNameInputChangeHandler(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  lastNameInputChangeHandler(event) {
    this.setState({
      lastName: event.target.value
    });
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
    if (this.state.redirect) return <Redirect to='/signIn' />
    return (
      <Form onSubmit={this.onSubmitHandler.bind(this)}>
        <h3 className="text-center text-info">Register</h3>
        <TextField
          id='first-name'
          type='text'
          name='firstName'
          placeholder='First Name'
          onChange={this.firstNameInputChangeHandler}
        />
           <TextField
         id="last-name"
            className="form-control"
            type="text"
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            onChange={this.lastNameInputChangeHandler}
        />
           <TextField
           id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="example@domain.com"
            label='Email'
            onChange={this.emailInputChangeHandler}
        />
         
           <TextField
        id="password"
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.passwordInputChangeHandler}
        />
         
        <div className="d-flex justify-content-between align-items-end">
          <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
          <Link to="/signIn" className="text-info">Login here</Link>
        </div>
      </Form>
    );
  }
}

export default SignIn;
