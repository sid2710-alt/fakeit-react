import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
const Navbar=()=>{
     return <div className={styles.nav}>
         <div className={styles.leftDiv}>
             <a href="/">
                 <img 
                 alt=""
                 src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                 />
             </a>

         </div>
         <div className={styles.rightDiv}>
            <div className='styles.user'>
<Link to='/'>
    <img
     src="https://cdn-icons-png.flaticon.com/128/709/709722.png"
    alt=""
     className={styles.userDp}/>
</Link>
 <span> Siddhant</span>
</div>
<div className={styles.navLinks}>
    <ul>
<li>
    <Link to="/login"> Log in</Link>
</li>
<li>
    <a href="/">Log out</a>
</li>
<li>
    <a href="/">Register</a>
</li>

    </ul>

</div>

         </div>
     </div>
}
export default Navbar;