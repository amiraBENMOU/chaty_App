import'./style1.css'
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Discussion from './discussion';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import ChattyImg from '../src/img/Mesa de trabajo 1@72x.png';
import sign from '../src/img/sign_first_page.jpg'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import  { useRef,useState, useEffect } from 'react';
import  Axios from 'axios';









function Login() {
    //for Register
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    //for login
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);

    //create a register method
    const register = () => {
      Axios({
        method: "POST",
        data: {
          username: registerUsername,
          email:registerEmail,
          password: registerPassword,
        },
        withCredentials: true,
        url: "http://localhost:3002/register",
      }).then((res) => console.log(res));
    };


// about googel 
    const clientId ="251271269751-03pj9n0gr4uvutf89824j93k2sqobns1.apps.googleusercontent.com"
    //to redirect 
    let history = useNavigate();
    const onSuccess = (res) => {
      console.log('success:', res);
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };
  useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
});


 

    return(
        <React.Fragment>
       <Container fluid >
        
                <Row>
                  
                  <Col>
                  <div  className="text-center">
                        <img className="fluid  w-75 m-auto   img-responsive "src={sign} alt="sign"/>
                    </div>
                  </Col>
                  
                  <Col className='mt-5 '> 
                  <div className='mb-4'>
                      <h1  className='text-dark text-center h5  '> Welcom To Sign.io  </h1>  
                  </div>        
                 
     
                      <Stack gap={2} className="col-md-5 mx-auto text-center">
                      
                         <Form> 
                                
                                 
                                 <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                                    <Form.Control type="emali " placeholder=" Email"
                                     onChange={(e) => setRegisterEmail(e.target.value)}
                                       />
                                        
                                 </Form.Group>

                                <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                                     <Form.Control type="password"  placeholder="Password"
                                      onChange={(e) => setRegisterPassword(e.target.value)}
                                     />
                               </Form.Group>                                 

                        </Form> 
                        
            
                        <Button variant="info"  className='text-light button' 
                                 onClick={register}> Log in 
                        </Button>  
                        
                         <p className='text-dark Account center text-primary'> You Don't have an Account ?<span className="text-info">Register</span></p> 
                         <div id="signInDiv "> </div>
                         <GoogleLogin
                                       clientId={clientId}
                                       buttonText="Sign in with Google"
                                       onSuccess={onSuccess}
                                       onFailure={onFailure}
                                       cookiePolicy={'single_host_origin'}
                                       isSignedIn={true}
                            />
  
                        
                     </Stack>

                 </Col>
              </Row>
      </Container>
      </React.Fragment>
 
    );
}
export default Login;