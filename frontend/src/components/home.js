import { Link } from "react-router-dom";
import homeimg from '../images/home.jpg';
import  logo from '../images/170750310/Logo Files/For Web/png/Black logo - no background.png';

 

function Home(){
    var year=  (new Date().getFullYear());
    
    return(
        <div className="container-fluid">
           
            
            <div className="row"  >  
                <div className='card'>
                    <img src={homeimg} alt='' className='img-fluid' style={{height:"800px",position:"relative",top:'0px'}} ></img>
                    <div className="card-img-overlay text-left " style={{position:"absolute",top:"10px",left:'10px'}}>
                        <img src={logo} alt="logo" style={{height:'150px',width:'300px'}}></img>
                    </div>
                    <div className="card-img-overlay text-center" style={{position:"absolute",top:"300px"}}>   
                        <div className='mt-2'>
                            <Link to={`/register`}><button className='btn btn-warning py-2 pe-2 fs-3'>Sign up</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <Link to={`/signin`}><button className='btn btn-warning py-2  fs-3'>Sign in</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-5 bg-dark text-light text-center">
                <div className="col-12">
                <p> Copyright &copy; {year} &nbsp;&nbsp;
                                
                                All rights reserved  &nbsp;&nbsp;
                                | &nbsp;&nbsp;
                                Maridi Manoj kumar
                            </p>

                </div>
            </div>
              
                

          
              
        </div>
    )
}
export default Home;
 

 
      
 