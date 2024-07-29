// import axios from "axios";
import { Link } from "react-router-dom";
import {useState, useEffect } from "react";
import axios from "axios";
import basket from "../images/grocery-store.ico";
import homeimg from '../images/2.png';
import banner from '../images/HEALTHY.png';
import '../css/contact.css';
 

function Customer(){
    let [Prods,setProds]=useState([]);
    const [displaymain, setDisplaymain] = useState(true);
    const [displayc, setDisplayc] = useState(false);

    const [formdataC,setFormDataC]=useState({
        'search':'',
    }) 

    const [Logindata, setLogindata] = useState({});
     
    

    useEffect(()=>{
        var api='http://localhost:5000/getdataProds';
        axios.get(api).then((response)=>{
            setProds(response.data.mdata);
            setFilteredData(response.data.mdata);
           
        })
    },[]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const cartItemCount = cartItems.length;

    const addToCart = (event, productName, price,company) => {
        console.log(cartItems);
        event.preventDefault(); // Prevent the default behavior of the event
    
        // Ensure productName and price are valid
        if (!productName || !price) {
            console.error('Invalid product name or price');
            return;
        }
    
        // Create a new item object
        const newItem = {
            user:Logindata.email,
            productName: productName,
            price: price,
            company:company,
            quantity:1,
            status:0,
        };
        
        const existingItem = cartItems.find(item => item.productName ===  productName);
        if (!existingItem) {
             
            setCartItems(prevCartItems => [...prevCartItems, newItem]);
        }
        // Update cartItems state
        // setCartItems(prevCartItems => [...prevCartItems, newItem]);
    };
    
    
    
    const removeFromCart = (index) => {
        
        setCartItems(prevCartItems => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems.splice(index, 1);
            return updatedCartItems;
        });
    };

    const incrementQuantity = (event,index) => {
        event.preventDefault();
        const newCartItems = [...cartItems];
        newCartItems[index].quantity += 1;
        setCartItems(newCartItems);
    };

    const decrementQuantity = (event,index) => {
        event.preventDefault()
        const newCartItems = [...cartItems];
        if (newCartItems[index].quantity > 1) {
            newCartItems[index].quantity -= 1;
            setCartItems(newCartItems);
        }
    };
  
    let Total=0;
     
    const [filteredData, setFilteredData] = useState([]);

    const submitsearch=(e)=>{
        e.preventDefault();
        setSearchTerm(formdataC.search);
        setDisplaymain(true);
         
    }

    const buy=()=>{
        localStorage.setItem('order', JSON.stringify(cartItems));
        window.location.href = `/payment?tr=${Total}`;
    } 
     const viewcart=()=>{
        setDisplayc(true);
        setDisplaymain(false);
     }
     const continueshopping=()=>{
        setDisplayc(false);
        setDisplaymain(true);
     }

    useEffect(() => {
        // Update filteredData when searchTerm or data changes
        const filteredResults = Prods.filter(item =>
            ((item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
             (item.productname && item.productname.toLowerCase().includes(searchTerm.toLowerCase())))
          );
        setFilteredData(filteredResults);
      }, [searchTerm, Prods]);
      
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
    
      
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return(
        <div className="container-fluid bg-gray-100 p-0">
            <div className="row p-0 m-0">
                <div className="col-12 text-light">
                 
                <nav className='navbar navbar-expand-lg navbar-expand-sm sticky-top navbar-dark text-white bg-dark fixed w-full p-0'>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="float-left"> 
                        <span className="text-2xl ps-2 font-['Lucida Calligraphy']">FOODIE</span>
                        <span className="text-xs">MART</span>
                    </div>
                    <div className="float-left mx-3"> 
                        <ul className="navbar-nav mr-auto inline">
                        <li className="float-left nav-item active mx-1">
                            <Link to={`/user`} className="nav-link">Home</Link>
                        </li>
                        <li className="float-left nav-item active mx-1">
                            <Link to={`/profile`} className="nav-link">Profile</Link>
                        </li>
                        <li className="float-left nav-item mx-1">
                            <Link to={`/contact`} className="nav-link">Contact</Link>
                        </li>
                        <li className="float-left nav-item mx-1">
                            <Link to={`/tracking`} className="nav-link">Track orders</Link>
                        </li>
                        </ul>    
                    </div>
                    <div className="float-left mx-2"> 
                        <input className="form-control m-2" type="text" placeholder="Search..." onChange={(e) => setFormDataC({...formdataC, search:e.target.value})} />
                    </div> 
                    <div className="float-left mx-1">
                        <button className="btn btn-outline-success text-light m-2" type="submit" onClick={submitsearch}>Search</button>
                    </div>
                    <div className="float-left ms-1 text-center pt-2">
                        <i className="fa-solid fa-user"></i><span> {Logindata.email}</span>
                    </div>
                    <div className="float-right pt-2 mx-5">
                        <span className="bg-light text-dark px-1 rounded-full">{cartItemCount}</span> 
                        <img src={basket} alt="cart" className="h-8 cursor-pointer" onClick={viewcart} />
                    </div>
                    <div className="float-right mx-5 pt-2">
                        <span onClick={Loggingout} className="cursor-pointer"> 
                        <i className="fa-solid fa-right-from-bracket"></i> 
                        <span className="ms-1">Logout</span> 
                        </span> 
                    </div>
                    </div>
                </nav>
                </div>
            </div>  
             
            <div className="row mt-5 pt-1 p-0">
                <img src={homeimg} alt="hi" className="h-128 w-full" />
            </div>
            
            <div className="row mt-1 p-0 m-0"> 
                {displaymain && ( 
                <div className='row mt-5 flex flex-wrap gap-0 m-0 p-0'>
                    {Prods && filteredData.map((ele, index) => (
                    <div key={index} className='col-md-3 col-sm-12 mt-3'>
                        <div className="card h-130 rounded-lg">
                        <div className="card-header"> 
                            <img src={ele.image} className="img-fluid img-thumbnail card-img-top poster mx-3 h-40 w-75" alt="..." />
                        </div>
                        <div className="card-body">
                            <h6>{ele.company}</h6>
                            <h5 className="card-title">{ele.productname}</h5>
                            <p className="card-text"><span className='font-bold'>Type</span>&nbsp;:&nbsp;{ele.type}</p>
                            <p className='card-text'><span className='font-bold'>Category</span>&nbsp;:&nbsp;{ele.category}</p>
                            <p className='card-text'><span className='font-bold'>Description</span>&nbsp;:&nbsp;<span className="text-xs">{ele.description}</span></p>
                        </div>
                        <div className="card-footer text-center"> 
                            <button className='text-light text-center btn btn-danger mx-1 py-2 px-3'>Price: &#8377;{ele.price}</button>
                            <button className='text-light btn btn-primary px-2 py-2' onClick={(event) => addToCart(event, ele.productname, ele.price, ele.company)}>
                            <img src={basket} alt="cart" className="h-5" /> Add to cart
                            </button>  
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>   

            {/* Cart display section */}
            {displayc && (
                <div className="container">
                <div className="row mt-5">
                    <div className="col-3"></div>
                    <div className="col-6">
                    <table className="mt-5 pt-5 text-center text-light text-lg border-2 border-black">
                        {/* Table header and body */}
                    </table>
                    <div className="text-center mt-5">
                        <button className="btn btn-warning" onClick={continueshopping}>Continue Shopping</button>
                        <button className="btn btn-warning ml-2" onClick={buy}>BUY NOW</button> 
                    </div> 
                    </div>
                    <div className="col-3"></div>
                </div>
                </div>
            )}

            <div className="row mt-20 pt-4">
                <div className="col-md-12 p-0 mx-0">
                <img src={banner} alt="banner" className="h-96 w-95% p-0 m-0" />
                </div>
            </div>
            
            <div className="mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="px-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-bold mb-4">Order Online</h3>
                        <p className="text-gray-600">
                        We offer a premium food delivery service to enhance your stay. Enjoy a wide range of delicious meals, freshly prepared by our talented chefs, delivered straight to your room. We pride ourselves on quick, courteous service, ensuring your food arrives hot and ready to enjoy.
                        </p>
                    </div>
                    </div>

                    <div className="px-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-bold mb-4">Dining</h3>
                        <p className="text-gray-600">
                        We provide exquisite dining facilities designed to provide a memorable culinary experience. Our elegant restaurant offers a diverse menu featuring gourmet dishes crafted from fresh, local ingredients by our expert chefs.
                        </p>
                    </div>
                    </div>

                    <div className="px-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-bold mb-4">Party Catering</h3>
                        <p className="text-gray-600">
                        Our Partners offer top-notch catering services tailored to meet the needs of any event, from intimate gatherings to grand celebrations. Our experienced culinary team crafts customized menus featuring a variety of delectable dishes made from the finest ingredients.
                        </p>
                    </div>
                    </div>
                </div>

                <div className="mt-16 bg-gray-100 py-16">
                    <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                        <h1 className="text-3xl font-bold mb-6">Contact us</h1>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                            <i className="fas fa-location-dot mr-2 text-blue-500"></i>
                            <span>Polavaram, Eluru dist, AP, 521214</span>
                            </li>
                            <li className="flex items-center">
                            <i className="fas fa-phone mr-2 text-blue-500"></i>
                            <a href="https://wa.me/6281241178" className="font-bold mr-2">6281241178</a>,
                            <a href="https://wa.me/7794916396" className="font-bold ml-2">7794916396</a>
                            </li>
                            <li className="flex items-center">
                            <i className="fas fa-envelope mr-2 text-blue-500"></i>
                            <a href="mailto:manojmaridi666@gmail.com" className="font-bold">manojmaridi666@gmail.com</a>
                            </li>
                        </ul>
                        <div className="mt-6 space-x-4">
                            <a href="https://www.facebook.com/manoj.maridi.1" className="text-blue-600 hover:text-blue-800">
                            <i className="fab fa-facebook text-2xl"></i>
                            </a>
                            <a href="https://www.instagram.com/manoj_c_oo_l/" className="text-pink-600 hover:text-pink-800">
                            <i className="fab fa-instagram text-2xl"></i>
                            </a>
                            <a href="https://www.twitter.com" className="text-blue-400 hover:text-blue-600">
                            <i className="fab fa-twitter text-2xl"></i>
                            </a>
                        </div>
                        </div>

                        <div>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="name" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <input type="email" name="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            <input type="tel" name="phone" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <input type="text" name="sub" placeholder="Subject" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Your Message..." required></textarea>
                            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">SUBMIT</button>
                        </form>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p>
                        Copyright &copy; {new Date().getFullYear()} All rights reserved | Maridi Manoj kumar
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>



    //     <div className="container-fluid" style={{backgroundColor:'#f5f5f5',padding:'0px'}}>
    //         <div className="row" style={{padding:'0px',margin:"0px"}}>
    //             <div className="col-12 text-light">
    //                 <nav className='navbar navbar-expand-lg navbar navbar-expand-sm sticky-top  navbar-dark bg-dark' style={{position:"fixed",width:"100%",padding:'0px'}}>
    //                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //                      <div style={{float:"left"}}> 
    //                         <span className="fs-2 ps-2" style={{fontFamily:"Lucida Calligraphy"}}> FOODIE </span><span className="" style={{fontSize:"11px"}}>MART</span>
    //                     </div>
    //                     <div  style={{float:"left"}} className='mx-3'> 
    //                         <ul className="navbar-nav mr-auto " style={{display:"inline"}}>
    //                             <li style={{float:"left"}} className="nav-item active mx-1">
    //                                 <Link to={`/user`} className="nav-link "  >Home <span className="sr-only"> </span></Link>
    //                             </li>
    //                             <li style={{float:"left"}} className="nav-item active mx-1">
    //                                 <Link to={`/profile`} className="nav-link " >Profile <span className="sr-only"> </span></Link>
    //                             </li>
    //                             <li style={{float:"left"}} className="nav-item mx-1">
    //                                 <Link to={`/contact`} className="nav-link " >Contact <span className="sr-only"> </span></Link>
    //                             </li>
    //                             <li style={{float:"left"}} className="nav-item mx-1">
    //                                 <Link to={`/tracking`} className="nav-link " >Track orders<span className="sr-only"> </span></Link>
    //                             </li>
    //                         </ul>    
    //                     </div>
    //                     <div style={{float:"left"}} className='mx-2' > 
    //                         <input  className="form-control m-2" type="text" placeholder="Search..."  onChange={(e)=>setFormDataC({...formdataC,search:e.target.value})}  />
    //                     </div> 
    //                     <div style={{float:"left"}} className='mx-1'>
    //                         <button  className="btn btn-outline-success  text-light m-2 " type="submit" onClick={submitsearch} >Search</button>
    //                     </div>
                         
    //                     <div style={{float:"left"}} className=" ms-1  text-center pt-2">
    //                     <i  className="fa-solid fa-user"></i><span> {Logindata.email}</span>
                         
    //                     </div>

    //                     <div style={{float:"right"}} className="pt-2 mx-5">
    //                      <span className="bg-light text-dark px-1" style={{borderRadius:"50%"}}>{cartItemCount}</span> <img src={basket} alt="cart" style={{ height:"30px"} } onClick={viewcart}></img> 
    //                     </div>
                         
    //                     <div className="mx-5 pt-2" style={{float:"right"}} >
                        
    //                     <span onClick={Loggingout}> <i  className="fa-solid fa-right-from-bracket"> </i> <span className="ms-1">Logout</span> </span> 
                         
    //                     </div>
                        

    //                      </div>
    //                 </nav>
    //             </div>
    //         </div>  
    //         <div className="row mt-5 pt-4">
                 
    //             <div className="col-md-12 " style={{padding:'0px',marginLeft:'0px',marginRight:'0px'}}>
    //                 <img src={banner} alt="banner" style={{height:"400px" ,width:"95%",padding:'0px',margin:'0px'}}></img>
    //             </div>
                
    //         </div>
            
    //         <div className="row mt-1" style={{padding:'0px',margin:'0px'}}> 
    //             {displaymain&&( 
    //             <div className='row mt-5  ' style={{display: 'flex',flexWrap: 'wrap',gap: '0px',margin: '0px',padding:'0px' }}>
    //             {/* {Prods &&filteredData.map((ele,index,arr)=> */}
    //             {Prods && filteredData.map((ele, index, arr) => {
    //                     return (
    //                         <div key={index} className='col-md-3 col-sm-12 mt-3'>
    //                                     <div className="card  "   style={{height:'520px' ,borderRadius:'10px'}}   >
    //                                         <div className="card-header"> 
    //                                         <img src={ele.image} className="img-fluid img-thumbnail card-img-top poster mx-3" alt="..." style={{height:"150px",width:"300px"}} />
    //                                         </div>
    //                                         <div className="card-body">
                                                
    //                                             <h6>{ele.company}</h6>
    //                                             <h5 className="card-title">{ele.productname}</h5>
    //                                             <p className="card-text"><span className='fw-bold'> Type</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;{ele.type}</p>
    //                                             <p className='card-text'><span className='fw-bold'> Category    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    :&nbsp;&nbsp;&nbsp;&nbsp;{ele.category}</p>
    //                                             <p className='card-text ' ><span className='fw-bold'> Description   </span>  &nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;<span  style={{fontSize:"12px"}}> {ele.description}</span></p>
                                                 
                                
    //                                         </div>
    //                                         <div className="card-footer  text-center"> 
                                                 
    //                                             <button className='text-light text-center btn btn-danger  mx-1 py-2' style={{paddingLeft:"10px",paddingRight:"10px"}}>Price:&nbsp; &#8377; {ele.price}</button>
    //                                             <button  className='text-light btn btn-primary px-2 py-2'  onClick={(event) => addToCart(event, ele.productname, ele.price,ele.company)}> <img src={basket} alt="cart" style={{ height:"20px"} }></img>  Add to cart   </button>  
                                                  
    //                                         </div>
    //                                     </div>
                                             
                                            
    //                                 </div>
                                         
                                   
    //                             )
    //                         }
    //                 )}
                    
    //             </div>
                 
    //             )}
                
    //         </div>   

    //         {displayc &&(
    //             <div className="container">
    //                 <div className="row mt-5">
    //                     <div className="col-3"></div>
    //                     <div className="col-6">
    //                         <table border={5} cellPadding={10} cellSpacing={20} className="mt-5 pt-5 text-center text-light fs-5 " style={{ border: '2px solid black' }}>
    //                             <thead className="bg-primary">
    //                                 <tr>
    //                                     <th>S. NO</th>
    //                                     <th>Product Name</th>
    //                                     <th>Price</th>
    //                                     <th>Quantity &nbsp; &nbsp; &nbsp;</th>
    //                                     <th>Amount</th>
    //                                     <th>Remove Item</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 {
    //                                     cartItems.map((ele, index) => {
    //                                         const Amount = ele.price * ele.quantity; // Assuming quantity is always 1
    //                                         Total += Amount; // Add the current amount to Total
    //                                         return (
    //                                             <tr className="bg-secondary mt-2 pt-3" style={{margin:"10px", border:"2px solid black"}} key={index}>
    //                                                 <td>{index + 1}</td>
    //                                                 <td>{ele.productName}</td>
    //                                                 <td>{ele.price}</td>
    //                                                 <td><span className="bg-light" onClick={(event) => decrementQuantity(event, index)}><i  className="fa-solid fa-minus text-dark px-1"></i></span><span className="px-2">{ele.quantity}</span> <span className="bg-light" onClick={(event) => incrementQuantity(event, index)}><i  className="fa-solid fa-plus text-dark px-1"></i></span></td>  
    //                                                 <td>&#8377;{Amount}</td>
    //                                                 <td><button className="btn btn-danger" onClick={removeFromCart}><i  className="fa-solid fa-trash me-2"></i>   Delete</button></td> {/* Add remove button here */}
    //                                             </tr>
    //                                         );
    //                                     })
    //                                 }
    //                                 <tr className="bg-dark">
    //                                     <td colSpan={4} className="fw-bolder">TOTAL</td>
    //                                     <td colSpan={2} className="fw-bold text-start ps-2">&#8377; {Total}</td>
    //                                 </tr>
    //                             </tbody>
    //                         </table>
    //                         <div className="text-center mt-5">
    //                         <button className="btn btn-warning" onClick={continueshopping}> Continue Shopping</button>  &nbsp;
    //                         <button className="btn btn-warning" onClick={buy}> BUY NOW</button> 
    //                             </div> 
    //                     </div>
    //                     <div className="col-3"></div>
    //                 </div>
    //             </div>
                 
                
    //         )}
    //        <div className="row mt-5 pt-1" style={{padding:'0px'}}>
    //             <img src={homeimg} alt="hi" style={{height:'500px',width:'100%'}}></img>
    //         </div>
            
    //         <div className="row mt-4"> 
           
    //             <div class="col-md-4 ">
    //             <div id="DIV_1" className="col-sm-12">
    //                 <div id="DIV_2">
    //                 <h3 id="H3_3">
    //                         Order Online
    //                     </h3>
    //                 <p id="P_4">
    //                 We offers a premium food delivery service to enhance your stay. Enjoy a wide range of delicious meals, freshly prepared by our talented chefs, delivered straight to your room. We pride ourselves on quick, courteous service, ensuring your food arrives hot and ready to enjoy. 
    //                 </p>
    //                 </div>
    //             </div>
    //             </div>

    //             <div class="col-md-4  ">
    //             <div id="DIV_1" className="col-sm-12">
    //                 <div id="DIV_2">
    //                 <h3 id="H3_3">
    //                     Dining
    //                     </h3>
    //                 <p id="P_4">
    //                 We provide boasts exquisite dining facilities designed to provide a memorable culinary experience. Our elegant restaurant offers a diverse menu featuring gourmet dishes crafted from fresh, local ingredients by our expert chefs. 
    //                 </p>
    //                 </div>
    //             </div>
    //             </div>


    //             <div class="col-md-4 ">
    //             <div id="DIV_1">
    //                 <div id="DIV_2">
    //                 <h3 id="H3_3">
    //                         Party Cattering
    //                     </h3>
    //                 <p id="P_4">
    //                 Our Partners offers you top-notch catering services tailored to meet the needs of any event, from intimate gatherings to grand celebrations. Our experienced culinary team crafts customized menus featuring a variety of delectable dishes made from the finest ingredients. 
    //                 </p>
    //                 </div>
    //             </div>
    //             </div>
    //         </div>

    //         <div className="row mt-1 cd">
    //             <div className="col-md-12">
    //             <section class="contact-sec sec-pad">
    //                     <div class="container">
    //                         <div class="row">
    //                         <div class="col-md-6">
    //                             <div class="contact-detail">
    //                             <h1 class="section-title">Contact us</h1>

    //                             <ul class="contact-ul">
    //                                 <li><i class="fa fa-location-dot"></i> Polavaram ,Eluru dist ,AP ,521214</li>

    //                                 <li>
    //                                 <i class="fa fa-phone"></i>
    //                                 <a href="https://wa.me/6281241178"><b>6281241178</b></a>,
    //                                 <a href="https://wa.me/7794916396"><b>7794916396</b></a>
    //                                 </li>

    //                                 <li>
    //                                 <i class="fa-solid fa-envelope"></i>
    //                                 <a href="mailto:manojmaridi666@gmail.com"><b> manojmaridi666@gmail.com</b></a>
    //                                 </li>
    //                             </ul>

    //                             <span>
    //                                 <a href="https://www.facebook.com/manoj.maridi.1" class="fb"><i class="fa-brands fa-facebook"></i></a>
    //                                 <a href="https://www.instagram.com/manoj_c_oo_l/" class="insta"><i class="fa-brands fa-instagram"></i></a>
    //                                 <a href="https://www.twitter.com" class="twitter"><i class="fa-brands fa-twitter"></i></a>
    //                             </span>
    //                             </div>
    //                         </div>

    //                         <div class="col-md-6">
    //                             <form action="#" class="contFrm" method="POST">
    //                             <div class="row">
    //                                 <div class="col-sm-6">
    //                                 <input type="text" name="name" placeholder="Your Name" class="inptFld" required />
    //                                 </div>

    //                                 <div class="col-sm-6">
    //                                 <input type="email" name="email" placeholder="Email Address" class="inptFld" required />
    //                                 </div>

    //                                 <div class="col-sm-6">
    //                                 <input type="tel" name="phone" placeholder="Phone Number" class="inptFld" required />
    //                                 </div>

    //                                 <div class="col-sm-6">
    //                                 <input type="text" name="sub" placeholder="Subject" class="inptFld" required />
    //                                 </div>

    //                                 <div class="col-12">
    //                                 <textarea class="inptFld" rows="" cols="" placeholder="Your Message..." required></textarea>
    //                                 </div>

    //                                 <div class="col-12">
    //                                 <input type="submit" name="submit" value="SUBMIT" class="inptBtn" />
    //                                 </div>
    //                             </div>
    //                             </form>
    //                         </div>
    //                         </div>

    //                         <div   style={{textAlign:'center',marginTop:'20px'}}>
    //                         <p> Copyright &copy;
    //                             <script>
    //                             document.write(new Date().getFullYear());
    //                             </script>
    //                             All rights reserved |Maridi Manoj kumar
    //                         </p>
    //                         </div>

    //                     </div>
    //                     </section>
    //             </div>
    //         </div>
    // </div>
    )
}
export default Customer;