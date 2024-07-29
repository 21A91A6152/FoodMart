import imgp from '../images/pimg.jpg';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
function Profile(){
    const [receivedData, setReceivedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        const fetchOrdersData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/getOrdereddata');
            setFilteredData(response.data.mdata);
            setReceivedData(response.data.mdata);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchOrdersData();
      }, []); 



    const [Logindata, setLogindata] = useState({});


  const Loggingout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('userData');
    window.location.href = '/' 
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
    // Update filteredData when searchTerm or data changes
      const filteredResults = receivedData.filter(item =>
      item.user && item.user.toLowerCase().includes(Logindata.email.toLowerCase())
    );
    console.log(filteredResults);
   
    setFilteredData(filteredResults);
  
  }, [Logindata, receivedData]);

  console.log(filteredData)

    return (
        <div className="container-fluid bg-dark pb-5" style={{height:"800px"}}>
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
                                    <Link to={`/profile`} className="nav-link " >Profile <span className="sr-only"> </span></Link>
                                </li>
                                <li style={{float:"left"}} className="nav-item mx-3">
                                    <Link to={`/contact`} className="nav-link " >Contact <span className="sr-only"> </span></Link>
                                </li>
                                <li style={{float:"left"}} className="nav-item mx-3">
                                    <Link to={`/tracking`} className="nav-link " >Track Orders <span className="sr-only"> </span></Link>
                                </li>
                            </ul>    
                        </div>
                        <div style={{float:"left"}} className='mx-2' > 
                            <input  className="form-control m-2" type="text" placeholder="Search..."     />
                            {/* onChange={(e)=>setFormDataC({...formdataC,search:e.target.value})} */}
                        </div> 
                        <div style={{float:"left"}} className='mx-1'>
                            <button  className="btn btn-outline-success  text-light m-2 " type="submit"  >Search</button>
                        </div>
                         
                        <div style={{float:"left"}} className=" ms-5  text-center pt-2">
                        <i  className="fa-solid fa-user"></i><span> {Logindata.email}</span>
                         
                        </div>

                        
                         
                        <div className="mx-5 pt-2" style={{float:"right"}} >
                        
                        <span onClick={Loggingout}> <i  className="fa-solid fa-right-from-bracket"> </i> <span className="mx-1">Logout</span> </span> 
                         
                        </div>
                        

                         </div>
                    </nav>
                </div>
            </div> 
            <div className='row'>
            <h1 className='text-dark text-center '>Profile</h1>
            <div className='col-4'></div>
                <div className="col-8 ">
                     
                     
                    <div className=" card text-center align-center mt-5 pt-5 pb-5" style={{width:"500px"}}>
                        <img src={imgp} class="card-img-top rounded mx-auto d-block" style={{height:"200px",width:"200px"}} alt="..." />
                        <div class="card-body">
                            <h5 class="card-title pt-5">Details</h5>
                            <div>
                                {Logindata ? (
                                    <div>
                                     
                                    <p className='fs-4'>Name: {Logindata.fname}&nbsp;{Logindata.lname}</p>
                                    <p className='fs-4'>Email id: {Logindata.email}</p>
                                    <p className='fs-4'>Phone number: {Logindata.phone}</p>
                                    <button className='btn btn-primary' onClick={Loggingout}>logout &nbsp;&nbsp;<i class="fa-solid fa-right-from-bracket"></i></button>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile