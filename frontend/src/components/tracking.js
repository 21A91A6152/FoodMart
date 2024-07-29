 
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/rating.css'
 
function Tracking(){
    const [receivedData, setReceivedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        const fetchOrdersData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/getOrdereddatatotrack');
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
    if (Logindata && receivedData) {
        const filteredResults = receivedData.filter(item =>
            item.user && item.user.toLowerCase() === Logindata.email.toLowerCase()
        );
        console.log(filteredResults);
   
        setFilteredData(filteredResults);
    }
}, [Logindata, receivedData]);



  console.log(filteredData)
  console.log(receivedData)

  const stars = document.querySelectorAll(".stars  i");
console.log(stars);

stars.forEach((star, index1) => {
  star.addEventListener("mouseover", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? (star.style.transform = "scale(1.2)")
        : (star.style.transform = "scale(1)");
    });
    // star.style.transform = "scale(1.5)";
  });
  star.addEventListener("mouseout", () => {
    star.style.transform = "scale(1)";
  });
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});


    return (
        <div className="container-fluid   pb-5" style={{height:"800px",backgroundColor:'#f5f5f5'}}>
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
            <div className='row mt-5'>
                <div className='col-12 '>
                    <h1 className='pt-5'>
                        Track your Orders 
                    </h1>
                    <p>Your orders will be delivered soon. In case any problems please contact our customer care number they will help you within 2-3 days. </p>
                    <div>
                        <table border={"2px"} cellPadding={"10px"} > 
                             
                                <tr className='bg-dark text-light'>
                                <td>S.No</td>
                                <td className='px-5'>Product Name</td>
                                <td className='px-5'>Company</td>
                                <td className='px-5'>Quantity</td>
                                <td className='px-5'>Price</td>
                                <td className='px-5'>Status</td>
                                <td className='px-5'>Review</td>
                                <td className='px-5'>Rating</td>
                                <td className='px-5'>Submit</td>
                                </tr>
                            
                            <tbody> 
                        {receivedData.map((ele, index, arr) => {
                            index=index+1;
                        return (
                             
                                <tr className='bg-info'>
                                    <td>{index}</td>
                                    <td>{ele.productName}</td>
                                    <td className='text-center'>{ele.company}</td>
                                    <td className='text-center'>{ele.quantity}</td>
                                    <td className='text-center'>{ele.price}</td>
                                    <td>{ele.status === 1 && <p>Packing</p>}
                                {ele.status === 2 && <p>Order Delivered</p>}
                                {ele.status !== 1 && ele.status !== 2 && <p>Please contact customer care, your order is missing</p>}
                                </td>
                                <td className='px-2'><input></input></td>
                                <td className='px-4'><div class="stars">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div></td>
                                <td className='text-center'><button className='btn btn-success'>Submit</button></td>
                                </tr>
                                 
                            
                        );
                         
                        })}
                    </tbody>
                    </table>

                    </div>

                </div>
            
            </div>
             
        </div>
    )
}
export default Tracking