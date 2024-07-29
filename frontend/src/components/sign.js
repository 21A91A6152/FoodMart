import signin from '../images/10778.jpg';
import { useState   } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/signin.css';
import Swal from 'sweetalert2';

function SignIn(){
    const [formdataA,setFormDataA]=useState({
        'email':'',
        'password':'',
    }) 

    const [formdataC,setFormDataC]=useState({
        'email':'',
        'password':'',
    }) 

 

    const [display2, setDisplay2] = useState(false);
    const [display1, setDisplay1] = useState(false);
    const [display, setDisplay] = useState(true);
    
     
     
    const handleSubmitA = async (e) => {
        e.preventDefault();
        console.log(formdataA);
    
        try {
            const response = await axios.post('http://localhost:5000/logindetailsA', { formdataA });
            const responseData = response.data;
    
            if (responseData.msg === "login successful") {
                await Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "login successful ...!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
                localStorage.setItem('userData', JSON.stringify(responseData.email));
                window.location.href = '/admin';
            } else {
                Swal.fire({
                    title: "Login unsuccessful!",
                    text: "Check details and login!",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error occurred while logging in:", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while logging in. Please try again later.",
                icon: "error"
            });
        }
    };
    

    const handleSubmitC = async (e) => {
        e.preventDefault();
        console.log(formdataC);
    
        try {
            const response = await axios.post('http://localhost:5000/logindetailsC', { formdataC });
            const responseData = response.data;
    
            if (responseData.msg === "login successful") {
                await Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "login successful ...!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
                localStorage.setItem('userData', JSON.stringify(responseData.email));
                window.location.href = '/user';
            } else {
                Swal.fire({
                    title: "Login unsuccessful!",
                    text: "Check details and login!",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error occurred while logging in:", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while logging in. Please try again later.",
                icon: "error"
            });
        }
    };
  
    const containerStyle = {
      backgroundImage: `url(${signin})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '800px',
      margin:'2px'  
    };
    const userlogin=()=>{
        setDisplay(true);
        setDisplay1(true);
        setDisplay2(false);
        
    }
    const adminlogin=()=>{
        setDisplay(true)
        setDisplay1(false);
        setDisplay2(true);
        
    }
  
     
    return(
         
        <div className="container-fluid " style={containerStyle}>
            
                {display &&(
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 mt-5 text-center '>
                        <button className='btn btn-light mx-2' style={{borderRadius:"10px"}} onClick={userlogin}>User</button> <button className='btn btn-light mx-2' style={{borderRadius:"10px"}} onClick={adminlogin}>Admin</button>    
                    </div>
                </div>
        
            )}
     
            {display1 && (
            <div className="row gx-1 mt-3">
                  
                <div className='col-md-4 '></div>
                <div className="col-md-8 col-sm-10">
                 
                    <div className='col-md-7 mb-5 mt-5 text-light' style={{border:"2px solid white", borderRadius:"20px"}} > 
                        <h1 className='text-warning p-3'>Login to Customer Account</h1>
                        <div className="row  mt-1 " >
                            <div className="col-md-12 sm-12 p-4  ">
                                <div className="input-group">
                                    
                                    <input type="email" className=' form-control col-10 p-2 rounded'  id="email" placeholder="Email Address" name="email" aria-describedby="basic-addon1" onChange={(e)=>setFormDataC({...formdataC,email:e.target.value})}   />
                                </div> 
                            </div>
                        </div>
                    
                
                        <div className="row mt-1 ">
                            <div className="col-md-12 sm-12 px-4 py-2">
                                <div className="input-group">
                                    <input type="password" className=' form-control col-10 p-2 rounded '   placeholder="Password" name="password" aria-describedby="basic-addon1" onChange={(e)=>setFormDataC({...formdataC,password:e.target.value})}/>     
                                </div> 
                            </div>  
                        </div>
                    
                        <div className="row mt-1 text-center" >
                            <div className="col-md-12  sm-12 text-light  ">
                            <Link  to={`/forgot`}> Forgotten password</Link><br /><br />
                           <button  className="btn btn-primary col-md-10 col-sm-12" type="button" onClick={handleSubmitC}>Login</button>
                            <br></br>
                            <br></br>
                            <br></br>
                            If not register go to <Link to={`/register`}>signup page</Link>
                            <br></br>
                            <br></br>
                            </div>
                        </div>
                    </div>
                
                 

                </div>
            </div>
            )}
            {display2 && (
                <div className="row gx-1 mt-3">
                    
                    <div className='col-md-4 '></div>
                    <div className="col-md-8 col-sm-10">
                    
                        <div className='col-md-7 mb-5 mt-5 text-light ' style={{border:"2px solid white", borderRadius:"20px"}}> 
                            <h1 className='text-warning p-3'>Login to Admin Account</h1>
                            <div className="row  mt-1 " >
                                <div className="col-md-12 sm-12 p-4  ">
                                    <div className="input-group">
                                        
                                        <input type="email" className=' form-control col-10 p-2 rounded'  id="email" placeholder="Email Address" name="email" aria-describedby="basic-addon1" onChange={(e)=>setFormDataA({...formdataA,email:e.target.value})}   />
                                    </div> 
                                </div>
                            </div>
                        
                    
                            <div className="row mt-1 ">
                                <div className="col-md-12 sm-12 px-4 py-2">
                                    <div className="input-group">
                                        
    
                                            <input type="password" className=' form-control col-10 p-2 rounded '   placeholder="Password" name="password" aria-describedby="basic-addon1" onChange={(e)=>setFormDataA({...formdataA,password:e.target.value})}/>
                                    
                                        
                                    </div>
                                
                                </div>
                                
                            </div>
                        
                            <div className="row mt-1 text-center" >
                                <div className="col-md-12  sm-12  ">
                                <Link  to={`/forgot`}> Forgotten password</Link><br /><br />
                            <button  className="btn btn-primary col-md-10 col-sm-12" type="button" onClick={handleSubmitA}>Login</button>
                                <br></br>
                                <br></br>
                                <br></br>
                                If not register go to <Link to={`/register`}>signup page</Link>
                                <br></br>
                                <br></br>
                                </div>
                            </div>
                        </div>
                    
                    

                    </div>
                </div>
            )}
            
        </div>
         
    );
}

export default SignIn;

export const isAuthenticated = () => {
    // Check if user data exists in local storage
    console.log("HI")
    return localStorage.getItem('userData') !== null;
  };