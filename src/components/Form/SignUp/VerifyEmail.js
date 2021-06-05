import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SUCCESS_ICON from "../../../success-icon.png";
import axios from 'axios';
import { API_END_POINT_URL } from '../../../util';
 
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlreadyVerify:false
        }
    }
    componentDidMount() {
        const token = window.location.href.split('email/')[1];
        console.log('token',token)
        axios.get(`${API_END_POINT_URL}api/verify-email/${token}`).then(res => {
             console.log('res',res)
        this.setState({
          isAlreadyVerify: false
        });
      }).catch(err => {
          console.log(err);
           this.setState({
          isAlreadyVerify: true
        });
      });
    }
    render() { 
        const { isAlreadyVerify } = this.state;
        return (
             <div className="container mt-5">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6 py-3" style={{justifyContent:'center',display:'flex'}}>
                <div class="succes-inner1">
                {   !isAlreadyVerify?<> <img class="sucess-img" src={SUCCESS_ICON} alt="imag" style={{width:"65px"}} />
                            <p>Congrats! Your email has been verified</p></>
                            :<p> Your email has been already verified</p>}
                    <Link to="/signIn" className="text-info">Back To Login</Link>
                    </div> 
                 </div>
            </div>
        </div>
        );
    }
}
 
export default VerifyEmail;