import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';

function AddProduct(){
    const [Addp,setAddp]=useState({
        'company':'',
        'type':'',
        'productname':'',
        'description':'',
        'category':'',
        'price':'',
        'image':'',
       
    })  

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(Addp)
       await axios.post('http://localhost:5000/addAdminProductdetails',{Addp})
       .then((res)=>{
        Swal.fire({
            title: "Good job!",
            text: "Product added successfully !",
            icon: "success"
          });
        })   
        
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-6 bg-warning">
                    <form className="text-center">
                        <h1>Details of the product</h1>

                        <div className='col-12 mt-5'>
                            <div className='col-6' style={{float:'left'}}>
                                <label className='fs-3'>Company Name</label>
                            </div>
                            <div className='col-6' style={{float:'left'}}>
                                <input className='form-control' type='text' placeholder='Company Name' onChange={(e)=>setAddp({...Addp,company:e.target.value})}></input><br></br>
                            </div>
                        </div>


                        <div className='col-12 mt-5'>
                            <div className='col-6' style={{float:'left'}}>
                                <label className='fs-3'>Type of Product</label>
                            </div>
                            <div className='col-6' style={{float:'left'}}>
                              
                                <input type="radio" id="option1" name="option" value="veg" onChange={(e)=>setAddp({...Addp,type:e.target.value})} /> &nbsp;
                                <label for="option1">VEG</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" id="option2" name="option" value="nonveg" onChange={(e)=>setAddp({...Addp,type:e.target.value})} />&nbsp;&nbsp;
                                <label for="option2">NON VEG</label>
                                <input type="radio" id="option3" name="option" value="Others" onChange={(e)=>setAddp({...Addp,type:e.target.value})} />&nbsp;&nbsp;
                                <label for="option2">Others</label>
                                <br/>
                                <br/>
                        
                            </div>
                        </div>

                        <div className='col-12 mt-5'>
                            <div className='col-6' style={{float:'left'}}>
                                <label className='fs-3'>Name of Product</label>
                            </div>
                            <div className='col-6' style={{float:'left'}}>
                                <input className='form-control' type='text' placeholder='Name of the Product' onChange={(e)=>setAddp({...Addp,productname:e.target.value})}></input><br></br>
                            </div>
                        </div>

                        <div className='col-12 mt-5'>
                            <div className='col-6' style={{float:'left'}}>
                                <label className='fs-3'>Description</label>
                            </div>
                            <div className='col-6' style={{float:'left'}}>
                                <input className='form-control' type='text' placeholder='Description' onChange={(e)=>setAddp({...Addp,description:e.target.value})}></input><br></br>
                            </div>
                        </div>

                        <div className='col-12'>
                            <div className='col-6' style={{float:'left'}}>
                                <label className='fs-3'>Category</label>
                            </div>
                            <div className='col-6' style={{float:'left'}}>
                                
                            <select className="px-5 py-2"   id="options" name="options" placeholder="select category" onChange={(e)=>setAddp({...Addp,category:e.target.value})}>
                            <option value="">Select category</option>
                                <option value="starters">Starters</option>
                                <option value="biryani">birayani</option>
                                <option value="curries">curries</option>
                                <option value="drinks">drinks</option>

                            </select>
                                <br></br>
                                <br></br>
                            </div>
                        </div>

                        <div className='col-12'>
                            <div className='col-6' style={{float:'left'}}>
                                <label className='fs-3'>Price</label>
                            </div>
                            <div className='col-6' style={{float:'left'}}>
                                <input className='form-control' type='text' placeholder='Price' onChange={(e)=>setAddp({...Addp,price:e.target.value})}></input><br></br>
                            </div>
                        </div>

                        <div className='col-12'>
                            <div className='col-6' style={{float:'left'}}>
                                <label className='fs-3'>Image Link</label>
                            </div>
                            <div className='col-6' style={{float:'left'}}>
                                <input className='form-control' type='text' placeholder='Image Link' onChange={(e)=>setAddp({...Addp,image:e.target.value})}></input><br></br>
                            </div>
                        </div>
                        <buttton className='btn btn-primary' onClick={handleSubmit}>Submit</buttton>
                        <br></br>
                        <br></br>
                        <br></br>
                         
                    </form>
                </div>
            </div>
            
        </div>
    )
}
export default AddProduct;