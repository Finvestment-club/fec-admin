
import { Link } from "react-router-dom";

const NotFound = () => {
    return  (

        <section className='page notfound'>
          <div className="content">
            <img style={{height:"450px", width:"auto"}} src="./images/notFound.png" alt="notfound" />
            <Link to={'/'}>RETURN TO HOME PAGE</Link>

            
          </div>
        </section>
    )
};

export default NotFound;
