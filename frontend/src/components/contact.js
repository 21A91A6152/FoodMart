import { Link } from "react-router-dom";
import {useState, useEffect } from "react";
import basket from "../images/grocery-store.ico";
import customer from '../images/customercare.jpg';
import '../css/contact.css'
 
 
 
function Contact(){
    
    const [Logindata, setLogindata] = useState({});
     
    const [formdataC,setFormDataC]=useState({
        'search':'',
    })
    const Loggingout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('userData');
        window.location.href = '/' 
      }
  
      const submitsearch=(e)=>{
        e.preventDefault();
     
        
    }


      useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log(userData);
          setLogindata(userData);
        } else {
          console.log('No user data found in local storage');
        }
      }, []);
    return(
        <div className="container-fluid" style={{backgroundColor:'#f5f5f5'}}>
            <div className="row">
                <div className="col-12 text-light   ">
                    <nav className='navbar navbar-expand-lg navbar navbar-expand-sm sticky-top navbar-dark bg-dark' style={{position:"fixed",width:"100%"}}>
                         <div className="collapse navbar-collapse" id="navbarSupportedContent">
                         <div style={{float:"left"}}> 
                            <span className="fs-2 ps-2" style={{fontFamily:"Lucida Calligraphy"}}> FOODIES </span><span className="" style={{fontSize:"11px"}}>MART</span>
                        </div>
                        <div  style={{float:"left"}} className='mx-3'> 
                            <ul className="navbar-nav mr-auto " style={{display:"inline"}}>
                                <li style={{float:"left"}} className="nav-item active mx-1">
                                    <Link to={`/user`} className="nav-link "  >Home <span className="sr-only"> </span></Link>
                                </li>
                                <li style={{float:"left"}} className="nav-item active mx-1">
                                    <Link to={`/profile`} className="nav-link " >Profile <span className="sr-only"> </span></Link>
                                </li>
                                <li style={{float:"left"}} className="nav-item mx-1">
                                    <Link to={`/contact`} className="nav-link " >Contact <span className="sr-only"> </span></Link>
                                </li>
                                <li style={{float:"left"}} className="nav-item mx-1">
                                    <Link to={`/tracking`} className="nav-link " >Track orders<span className="sr-only"> </span></Link>
                                </li>
                            </ul>    
                        </div>
                        <div style={{float:"left"}} className='mx-2' > 
                            <input  className="form-control m-2" type="text" placeholder="Search..."  onChange={(e)=>setFormDataC({...formdataC,search:e.target.value})}  />
                        </div> 
                        <div style={{float:"left"}} className='mx-1'>
                            <button  className="btn btn-outline-success  text-light m-2 " type="submit" onClick={submitsearch} >Search</button>
                        </div>
                         
                        <div style={{float:"left"}} className=" ms-5  text-center pt-2">
                        <i  className="fa-solid fa-user"></i><span> {Logindata.email}</span>
                         
                        </div>

                        <div style={{float:"right"}} className="pt-2 mx-5">
                         <span className="bg-light text-dark px-1" style={{borderRadius:"50%"}}> </span> <img src={basket} alt="cart" style={{ height:"30px"} }  ></img> 
                        </div>
                         
                        <div className="mx-5 pt-2" style={{float:"right"}} >
                        
                        <span onClick={Loggingout}> <i  className="fa-solid fa-right-from-bracket"> </i> <span className="mx-1">Logout</span> </span> 
                         
                        </div>
                        

                         </div>
                    </nav>
                </div>
            </div>  
            <div className="row mt-5  bg-white ">
                
                <div  className="col-md-6 pt-5">
                      
                    <h1 className="text-center pt-5">Get In Touch</h1>
                    <p className="ps-5">Want to get in touch? We'd love to hear from you. Here's how you can reach us...</p>
                </div>
                <div className="col-md-6">
                    <img src={customer} alt="care" style={{height:'400px',width:"100%"}} ></img>
                </div>
            
            </div>
            <div className="row "> 
                <div className="col-md-2"></div>
                <div className="col-md-3 mt-2" style={{backgroundColor:"#fff"}} >
                    <h2 className="text-center"><i class="fa-solid fa-phone"></i></h2>
                    <h3>Talk with our Customer Care</h3>
                    <p>Just pick up the phone and clear your queries</p>
                </div>
                <div className="col-md-2 "></div>
                <div className="col-md-3 mt-2" style={{backgroundColor:"#fff"}}>
                <h2 className="text-center"><i class="fa-solid fa-message"></i></h2>
                    <h3 >Chat with us</h3>
                    <p>Some times you need a little help. Dont't worry we are here to help you</p>
                </div>
                <div className="col-md-2"></div>
            </div>
            
            <div className="row mt-5 cd">
                <div className="col-md-12">
                <section class="contact-sec sec-pad">
                        <div class="container">
                            <div class="row">
                            <div class="col-md-6">
                                <div class="contact-detail">
                                <h1 class="section-title">Contact us</h1>

                                <ul class="contact-ul">
                                    <li><i class="fa fa-location-dot"></i> Polavaram ,Eluru dist ,AP ,521214</li>

                                    <li>
                                    <i class="fa fa-phone"></i>
                                    <a href="https://wa.me/6281241178"><b>6281241178</b></a>,
                                    <a href="https://wa.me/7794916396"><b>7794916396</b></a>
                                    </li>

                                    <li>
                                    <i class="fa-solid fa-envelope"></i>
                                    <a href="mailto:manojmaridi666@gmail.com"><b> manojmaridi666@gmail.com</b></a>
                                    </li>
                                </ul>

                                <span>
                                    <a href="https://www.facebook.com/manoj.maridi.1" class="fb"><i class="fa-brands fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/manoj_c_oo_l/" class="insta"><i class="fa-brands fa-instagram"></i></a>
                                    <a href="https://www.twitter.com" class="twitter"><i class="fa-brands fa-twitter"></i></a>
                                </span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <form action="#" class="contFrm" method="POST">
                                <div class="row">
                                    <div class="col-sm-6">
                                    <input type="text" name="name" placeholder="Your Name" class="inptFld" required />
                                    </div>

                                    <div class="col-sm-6">
                                    <input type="email" name="email" placeholder="Email Address" class="inptFld" required />
                                    </div>

                                    <div class="col-sm-6">
                                    <input type="tel" name="phone" placeholder="Phone Number" class="inptFld" required />
                                    </div>

                                    <div class="col-sm-6">
                                    <input type="text" name="sub" placeholder="Subject" class="inptFld" required />
                                    </div>

                                    <div class="col-12">
                                    <textarea class="inptFld" rows="" cols="" placeholder="Your Message..." required></textarea>
                                    </div>

                                    <div class="col-12">
                                    <input type="submit" name="submit" value="SUBMIT" class="inptBtn" />
                                    </div>
                                </div>
                                </form>
                            </div>
                            </div>

                            <div   style={{textAlign:'center',marginTop:'20px'}}>
                            <p> Copyright &copy;
                                <script>
                                document.write(new Date().getFullYear());
                                </script>
                                All rights reserved |Maridi Manoj kumar
                            </p>
                            </div>

                        </div>
                        </section>
                </div>
            </div>
            
        </div>
          
            
    )
}
export default Contact;