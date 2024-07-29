import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import basket from "../images/grocery-store.ico";
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";
import gif from '../images/confetti.gif'; // assuming it's a gif file

import "../css/card.css"

function Payment(){

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const amount = searchParams.get('tr');
    const TotalAmount=parseInt(amount)+50;
     
    const[adata,setadata]=useState({
        'fname':'',
        'lname':'',
        'village':'',
        'country':'',
        'pincode':'',
        'city':'',
        'state':'',
    });
    const [Logindata, setLogindata] = useState({});
    const [Orderdata, setOrderdata] = useState({});

    const Loggingout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('userData');
        window.location.href = '/signin' 
      }
    const placeorder=async(e)=>{
        e.preventDefault();
        // const newData = { 
        //     usermail:Logindata.email,
        // };
        // setOrderdata
        const orderItems = Object.values(Orderdata);
    
        for (const item of orderItems) {
            console.log(item)
            await axios.post('http://localhost:5000/addorders', {item,adata});
            console.log('Item sent successfully:', item);
          }
            Swal.fire({
                title: "ORDER PLACED!",
                html: `
                    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                        <img src="${gif}" style="width: 100%; height: 100%; object-fit: cover;" />
                        <div style="position: absolute; top: 53%; color:white; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 1;">
                            <h1>Order Placed</h1>
                            <span>Track your order</span>
                        </div>
                    </div>
                `,
                icon: "success",
                // hide the default confirmation button
                customClass: {
                    popup: 'swal-wide', // apply custom styling to the modal
                    content: 'swal-wide-content' // apply custom styling to the content
                }
            });
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

      useEffect(() => {
        const userDataString = localStorage.getItem('order');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            console.log(userData);
            
            
            const newData = { 
                ...userData,
                
            };
            
            setOrderdata(newData);
        } else {
            console.log('No user data found in local storage');
        }
    }, []); // Add Logindata.email to the dependency array
    
    const addressave=async(e)=>{
        e.preventDefault();
        console.log(adata)
        Swal.fire("address saved!..");
       
    }

     console.log(Orderdata)
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
                                    <li style={{float:"left"}} className="nav-item active mx-3">
                                        <Link to={`/user`} className="nav-link "  >Home <span className="sr-only"> </span></Link>
                                    </li>
                                    <li style={{float:"left"}} className="nav-item active mx-3">
                                        <Link to={`/`} className="nav-link " >Profile <span className="sr-only"> </span></Link>
                                    </li>
                                    <li style={{float:"left"}} className="nav-item mx-3">
                                        <Link to={`/`} className="nav-link " >Contact <span className="sr-only"> </span></Link>
                                    </li>
                                </ul>    
                            </div>
                            <div style={{float:"left"}} className='mx-2' > 
                                <input className="form-control m-2" type="text" placeholder="Search..."    />
                            </div> 
                            <div style={{float:"left"}} className='mx-1'>
                                <button className="btn btn-outline-success  text-light m-2 " type="submit"   >Search</button>
                            </div>
                            
                            <div style={{float:"left"}} className=" ms-5  text-center pt-2">
                            <i className="fa-solid fa-user"></i><span> {Logindata.email}</span>
                            
                            </div>

                            <div style={{float:"right"}} className="pt-2 mx-5">
                            <img src={basket} alt="cart" style={{ height:"30px"} }  ></img> 
                            </div>
                            <div className="mx-5 pt-2" style={{float:"right"}} >
                            
                            <span onClick={Loggingout}> <i className="fa-solid fa-right-from-bracket"> </i> <span className="mx-1">Logout</span> </span> 
                            
                            </div>
                            

                            </div>
                        </nav>
                    </div>
            </div>
            <div className="row mt-5">
                <div className="col-1"></div>
                 
                <div className="col-5 mt-5">
                     <div className="card">
                        <div className="card-headder">
                             <h3>Order Details:-</h3>
                            <p>please check and verify order details and shipping address before payment.</p>
                        </div>
                        <div className="card-body">
                            <div className=" p-2"  style={{borderRadius:"20px"}}> 
                                <h5 className="px-2">Bill Details :</h5>
                                 <div><div  >Items Total <span style={{float:'right'}}> &#8377;{amount}</span></div></div>
                                 <div className="mt-3"><div  >Delevery charges  <span style={{float:'right'}}> &#8377;50</span>  </div></div>
                                 <hr/>
                                 <br/>
                                 <div className="mt-3 fw-bold"><div  >TOTAL AMOUNT<span style={{float:'right'}}> &#8377;{TotalAmount} </span></div></div>
                                 <br/>
                                 <hr/>
                            </div>

                            <div>
                                <h5>Shipping Address:</h5>
                                <p>Please enter your shipping details.</p>
                                <hr />
                                <div className="form">
                                                                        
                                <div className="fields fields--2">
                                    <label className="field">
                                    <span className="field__label" htmlFor="firstname">First name</span>
                                    <input className="field__input" type="text" id="firstname" value={adata.fname} onChange={(e)=>setadata({...adata,fname:e.target.value})}  />
                                    </label>
                                    <label className="field">
                                    <span className="field__label" htmlFor="lastname">Last name</span>
                                    <input className="field__input" type="text" id="lastname" value={adata.lname} onChange={(e)=>setadata({...adata,lname:e.target.value})} />
                                    </label>
                                </div>
                                <label className="field">
                                    <span className="field__label" htmlFor="address">Address</span>
                                    <input className="field__input" type="text" id="address" value={adata.village} onChange={(e)=>setadata({...adata,village:e.target.value})}/>
                                </label>
                                <label className="field">
                                    <span className="field__label" htmlFor="country">Country</span>
                                    <select className="field__input" id="country" value={adata.country} onChange={(e)=>setadata({...adata,country:e.target.value})}>
                                    <option value=""></option>
                                    <option value="usa">U.S.A</option>
                                    <option value="india">India</option>
                                    <option value="uk">U.K</option>
                                     
                                    </select>
                                </label>
                                <div className="fields fields--3">
                                    <label className="field">
                                    <span className="field__label" htmlFor="pincode">Pin code</span>
                                    <input className="field__input" type="number" id="pincode" maxLength={6} value={adata.pincode} onChange={(e)=>setadata({...adata,pincode:e.target.value})} />
                                    </label>
                                    <label className="field">
                                    <span className="field__label" htmlFor="city">City</span>
                                    <input className="field__input" type="text" id="city" value={adata.city} onChange={(e)=>setadata({...adata,city:e.target.value})} />
                                    </label>
                                    <label className="field">
                                    <span className="field__label" htmlFor="state">State</span>
                                    <select className="field__input" id="state" value={adata.state} onChange={(e)=>setadata({...adata,state:e.target.value})}>
                                        <option value=""></option>
                                        <option value="Andhra pradesh">Andhra pradesh</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Tamilnadu">Tamilnadu</option>
                                    </select>
                                    </label>
                                </div>
                                 <div>
                                        <input type="checkbox"   value="true" />
                                        <label for="vehicle1">billing address and shipping address are same</label><br/>
                                 </div>
                                </div>
   
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-dark text-light px-5" onClick={addressave}>Save Address</button>
                        </div>
                     </div>
                </div>
                <div className="col-5 mt-5">
                     <div className="card">
                        <div className="card-headder">
                             <h3>Payment Details:-</h3>
                            <p>continue your purchase by providing your payment details</p>
                            <hr/>
                            <p className="text-center fw-bolder">Pay using UPI</p>
                            <div className="card-row">
                                <span className="gpay"></span>
                                <span className="phonepay"></span>
                                <span className="paytm"></span>
                                <span className="upi"></span>
                            </div>
                            <hr/>
                            <p className="text-center fw-bolder">Pay using card</p>
                            <div className="card-row">
                                <span className="visa"></span>
                                <span className="mastercard"></span>
                                <span className="amex"></span>
                                <span className="discover"></span>
                            </div>

                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group mt-2">
                                    <label or="NameOnCard">Name on card</label>
                                    <input id="NameOnCard" className="form-control" type="text" placeholder="Name on Card" maxLength="255"></input>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="CreditCardNumber">Card number</label>
                                    <input id="CreditCardNumber" className="null card-image form-control" type="text" placeholder="0000-0000-0000-0000" maxLength={16}></input>
                                </div>
                                <div className="expiry-date-group form-group mt-2">
                                    <label htmlFor="ExpiryDate">Expiry date</label>
                                    <input id="ExpiryDate" className="form-control" type="text" placeholder="MM / YY" maxLength="7"></input>
                                </div>
                                <div className="security-code-group form-group mt-2">
                                    <label htmlFor="SecurityCode">Security code</label>
                                    <div className="input-container" >
                                        <input id="SecurityCode" className="form-control" type="text" placeholder="CVV" maxLength={3} ></input>
                                         
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-dark text-light px-5" onClick={placeorder}>Place the order</button>
                        </div>
                     </div>

                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}
export default Payment;