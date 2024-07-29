import Swal from 'sweetalert2';
import gif from '../images/confetti.gif'; // assuming it's a gif file

function Result() {
    const handleb = () => {
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

    

    return(
        <div>
            <button className="btn btn-primary" onClick={handleb}>buy</button>
        </div>
    )
}
export default Result