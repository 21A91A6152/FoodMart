import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Admin(){
    const [Logindata, setLogindata] = useState({});
    let [Ordersdata,setOrdersdata]=useState([]);
    // const [data, setData] = useState({ items: [] });
     
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
        const fetchOrdersData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/getOrdereddata');
            setOrdersdata(response.data.mdata);  
            setFilteredData(response.data.mdata);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchOrdersData();

    const intervalId = setInterval(fetchOrdersData, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); 
      }, []); 

      const [filteredData, setFilteredData] = useState([]);




      useEffect(() => {
  // Update filteredData when searchTerm or data changes
    const filteredResults = Ordersdata.filter(item =>
    item.company && item.company.toLowerCase().includes(Logindata.company.toLowerCase())
  );
  console.log(filteredResults);
 
  setFilteredData(filteredResults);

}, [Logindata, Ordersdata]);

    
const handledeliver = async (event, productName, user, Company) => {
    event.preventDefault();
    const data = {
        productName: productName,
        user: user,
        Company: Company
    };

    try {
        const res = await axios.post('http://localhost:5000/deliver', data);
        if (res.data.msg === "successful") {
            await Swal.fire({
                title: "Successful!",
                text: "Order delivered!",
                icon: "success"
            });
            window.location.reload();
        } else {
            await Swal.fire({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error"
            });
        }
    } catch (err) {
        console.log(err);
        // Handle error
    }
}

 
console.log(filteredData)

         


    return(
        <div className="container-fluid" style={{backgroundColor:'#f5f5f5'}}>
            <div className="row">
                <div className="col-12  ">
                    <nav className='bg-info' style={{position:"absolute",width:"100%"}}>
                        <div style={{float:"left"}}> 
                            <span className="fs-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MY_APP</span>
                        </div>
                        <div  style={{float:"left"}} className='mx-5'> 
                            <ul className="navbar-nav  " style={{display:"inline"}}>
                                <li style={{float:"left"}} className="nav-item active mx-5">
                                    <Link to={`/`} className="nav-link "  >Home <span className="sr-only"> </span></Link>
                                </li>
                                <li style={{float:"left"}} className="nav-item active mx-5">
                                    <Link to={`/`} className="nav-link " >Profile <span className="sr-only"> </span></Link>
                                </li>
                                <li style={{float:"left"}} className="nav-item mx-5">
                                    <Link to={`/`} className="nav-link " >Contact <span className="sr-only"> </span></Link>
                                </li>
                            </ul>    
                        </div>
                        <div style={{float:"left"}} className='mx-2' > 
                            <input className="form-control m-2" type="search" placeholder="Search"  />
                        </div> 
                        <div style={{float:"left"}} className='mx-3'>
                            <button className="btn btn-outline-success  text-light m-2 " type="submit" >Search</button>
                        </div>
                        <div style={{float:"left"}} className="ms-5 text-center pt-3">
                        <i className="fa-solid fa-user"></i><span> {Logindata.email}</span>
                         
                        </div>
                        <div className="me-5 pt-2" style={{float:"right"}} >
                        <span onClick={Loggingout}> <i className="fa-solid fa-right-from-bracket"> </i> <span className="mx-1">Logout</span> </span> 
                         
                        </div>
                    </nav>
                </div>
            </div> 
            <div className="row">
                <div className="col-12">
                    <h1>WELCOME, ADMIN</h1>
                    <p>We are happy to be parter with you</p>
                </div>
            </div> 
            <div className="row">
                <div className="col-12">
                    <Link to={`/addproduct`}><button className="btn btn-primary" >Add Product</button></Link>
                     
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                 
          
                <div>
                    <h2>Orders</h2>
                    <table className="text-center" cellPadding={10} cellSpacing={10}>
                        <thead>
                        <tr>
                            <th className="text-center text-light bg-dark">Product Name</th>
                            <th className="text-center text-light bg-dark">Price</th>
                            <th className="text-center text-light bg-dark">user</th>
                            <th className="text-center text-light bg-dark">Quantity</th>
                            <th className="text-center text-light bg-dark">Conformation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Ordersdata && filteredData.map((ele, index, arr) => {
                             if(ele.status===1){
                        return (
                            

                            
                            <tr key={index} className="mt-2">
                            <td className="bg-secondary fw-bold text-light" >{ele.productName}</td>
                            <td className="bg-secondary fw-bold text-light">{ele.price}</td>
                            <td className="bg-secondary fw-bold text-light">{ele.user}</td>
                            <td className="bg-secondary text-light">{ele.quantity}</td>
                            <td className="bg-secondary text-light"><button className="btn btn-warning" onClick={(event) => handledeliver(event, ele.productName, ele.user,ele.company)}>Order delivered</button></td>
                            </tr>
                        )
                            }
                        })}
                        
                        </tbody>
                    </table>
                    </div>
                      
                    {/* <table id="productTable">
                        <thead>
                            <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                             
                        </tbody>
                    </table> */}
                     
                </div>
            </div>
        </div>
    )
}
export default Admin;