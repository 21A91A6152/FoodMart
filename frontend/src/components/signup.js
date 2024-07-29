import signin from '../images/10778.jpg';
import { useState   } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/signin.css';
 
import Swal from 'sweetalert2';
 

function SignUp(){
    const [formdataC,setFormDataC]=useState({
        'fname':'',
        'lname':'',
        'email':'',
        'phone':'',
        'password':'',
       
    })  
    const [formdataA,setFormDataA]=useState({
        'fname':'',
        'lname':'',
        'email':'',
        'company':'',
        'phone':'',
        'password':'',
       
    })  
   

    const [display2, setDisplay2] = useState(false);
    const [display1, setDisplay1] = useState(false);
    const [display, setDisplay] = useState(true);
    
     
     
     
    const handleSubmitC=async(e)=>{
        e.preventDefault();
        console.log(formdataC)
       await axios.post('http://localhost:5000/adddetailsCsignup',{formdataC})
       .then((res)=>{
       
        Swal.fire({
            title: "Good job!",
            text: "Registeration successfull !",
            icon: "success"
          });
        })    
        
    }
    const handleSubmitA=async(e)=>{
        e.preventDefault();
        console.log(formdataA)
       await axios.post('http://localhost:5000/adddetailsAsignup',{formdataA})
       .then((res)=>{
       
        Swal.fire({
            title: "Good job!",
            text: "Registeration successfull !",
            icon: "success"
          });
        })   
        
    }
  
    const containerStyle = {
      backgroundImage: `url(${signin})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '800px',
      margin:'2px' // Set a height for the container
      // Other background properties if needed
      // ...
    };
    const userlogin=()=>{
        setDisplay(true);
        setDisplay1(true);
        setDisplay2(false);
        
    }
    const adminlogin=()=>{
        setDisplay(true);
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
            <div className="row gx-1 mt-3  ">
                  
                <div className='col-md-4 '></div>
                <div className="col-md-8 col-sm-10  "  >
                    <div className="col-md-7 pt-3 px-3 pb-2  " style={{border:"2px solid white", borderRadius:"20px"}}>
                        <h3 className='text-warning'>Create your Customer Account Now</h3>
                        <div class="row  mt-1 pt-4 ">
                            <div class="col-md-6 sm-12 py-2 px-3  ">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user"  style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input   type="text" className='col-11 p-2 rounded' required name='fname' placeholder="First name" value={formdataC.fname} onChange={(e)=>setFormDataC({...formdataC,fname:e.target.value})}  />
                                </div>
                            </div>
                            <div class="col-md-6 sm-12 py-2 px-3">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user"  style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input type="text" className='col-11 p-2 rounded' required  name='lname' placeholder="Last name" aria-label="Last name" value={formdataC.lname} onChange={(e)=>setFormDataC({...formdataC,lname:e.target.value})} />
                                </div>
                            
                            </div>
                        </div>

                        
                
                        <div class="row  mt-1 " >
                            <div class="col-md-12 sm-12 py-2 px-3 ">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                    <i class="fa-solid fa-envelope"  style={{color:"white"}}></i>
                                    </div>&nbsp;

                                    <input type="email" className='col-11 p-2 rounded' required  id="email" placeholder="Email Address" name="email"  value={formdataC.email} onChange={(e) => setFormDataC({ ...formdataC, email: e.target.value })}   />
                                </div> 
                            </div>
                        </div>
                    
                        <div class="row  mt-1"  >
                            <div class="col-md-12 sm-12 py-2 px-3"> 
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa-solid fa-phone" style={{color:"white"}}></i>
                                </div>&nbsp;
                                <input   id="number" className='col-11 p-2 rounded' required placeholder="Phone Number" name="phone" type="number" value={formdataC.phone} onChange={(e)=>setFormDataC({...formdataC,phone:e.target.value})}/>
                            </div>
                            </div>
                        </div>
                    
                        
                
                        <div class="row mt-1 ">
                            <div class="col-md-6 sm-12 py-2 px-3">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user"  style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input type="password" className='col-11 p-2 rounded' required   placeholder="Password" name="password" value={formdataC.password} onChange={(e)=>setFormDataC({...formdataC,password:e.target.value})}/>
                                </div>
                            
                            </div>
                            <div class="col-md-6 sm-12 py-2 px-3">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user" style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input type="password"  className='col-11 p-2 rounded' required  placeholder="Confirm password" confirmpassword="password"   />
                                </div>
                            </div>
                        </div>
                    
                        <div class="row mt-1 text-center" >
                            <div class="col-md-12  sm-12 pt-2  ">

                            <button class="btn btn-primary col-md-12 col-sm-12" type="button" onClick={handleSubmitC}>create your account</button>
                            </div>
                        </div>
                
                        <p class="text-center">____________________________ or ____________________________</p>
                
                        <div class="row mt-1 text-center"> 
                            <div class="col-md-12 col-sm-12 ">
                               
                                <p className='text-light'>Already Register? <Link to={`/signin`} >Login</Link> </p>

                            </div>
                        </div>
                    </div>
             
                </div>
            </div>
            )}
            {display2 && (
                <div className="row gx-1 mt-3">
                    
                    <div className='col-md-4 '></div>
                    <div className="col-md-8 col-sm-10" >
                    
                    <div className="col-md-7  pt-3 px-3 pb-2" style={{border:"2px solid white", borderRadius:"20px"}}>
                        <h3 className='text-warning'>Create your Admin Account Now</h3>
                        <div class="row  mt-1 pt-4 ">
                            <div class="col-md-6 sm-12  py-2 px-3  ">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user"  style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input   type="text" className='col-11 p-2 rounded border border-light' required name='fname' placeholder="First name" value={formdataA.fname} onChange={(e)=>setFormDataA({...formdataA,fname:e.target.value})}  />
                                </div>
                            </div>
                            <div class="col-md-6 sm-12  py-2 px-3">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user"  style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input type="text" className='col-11 p-2 rounded'  name='lname'  required placeholder="Last name" aria-label="Last name" value={formdataA.lname} onChange={(e)=>setFormDataA({...formdataA,lname:e.target.value})} />
                                </div>
                            
                            </div>
                        </div>

                        
                
                        <div class="row  mt-1 " >
                            <div class="col-md-12 sm-12  py-2 px-3 ">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                    <i class="fa-solid fa-envelope"  style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input type="email" className='col-11 p-2 rounded'  id="email" required placeholder="Email Address" name="email" value={formdataA.email}  onChange={(e)=>setFormDataA({...formdataA,email:e.target.value})}   />
                                </div> 
                            </div>
                        </div>

                        <div class="row  mt-1"  >
                            <div class="col-md-12 sm-12  py-2 px-3"> 
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa-regular fa-building" style={{color:"white"}}></i>
                                </div>&nbsp;
                                <input   id="company" className='col-11 p-2 rounded' required placeholder="Company/Institution name" name="company" type="text" value={formdataA.company} onChange={(e)=>setFormDataA({...formdataA,company:e.target.value})}/>
                            </div>
                            </div>
                        </div>

                        <div class="row  mt-1"  >
                            <div class="col-md-12 sm-12  py-2 px-3"> 
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa-solid fa-phone" style={{color:"white"}}></i>
                                </div>&nbsp;
                                <input   id="number" className='col-11 p-2 rounded' required placeholder="Phone Number" name="phone" type="number" value={formdataA.phone} onChange={(e)=>setFormDataA({...formdataA,phone:e.target.value})}/>
                            </div>
                            </div>
                        </div>
                    
                         
                
                        <div class="row mt-1 ">
                            <div class="col-md-6 sm-12  py-2 px-3">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user"  style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input type="password" className='col-11 p-2 rounded'  required  placeholder="Password" name="password" value={formdataA.password} onChange={(e)=>setFormDataA({...formdataA,password:e.target.value})}/>
                                </div>
                            </div>
                            <div class="col-md-6 sm-12  py-2 px-3 ">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa-solid fa-user" style={{color:"white"}}></i>
                                    </div>&nbsp;
                                    <input type="password"  className='col-11 p-2 rounded' required  placeholder="Confirm password" confirmpassword="password"   />
                                </div>
                            </div>
                        </div>
                    
                        <div class="row mt-1 text-center" >
                            <div class="col-md-12  sm-12 pt-2  ">

                            <button class="btn btn-primary col-md-12 col-sm-12" type="button" onClick={handleSubmitA}>create your account</button>
                            </div>
                        </div>
                
                        <p class="text-center">____________________________ or ____________________________</p>
                
                        <div class="row mt-1 text-center"> 
                            <div class="col-md-12 sm-12 ">
                               
                                <p className='text-light'>Already Register? <Link to={`/signin`} >Login</Link> </p>

                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            )}
            
        </div>
         
    );
}
export default SignUp;