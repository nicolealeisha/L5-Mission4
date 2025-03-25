import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';


function Footer () {
    return ( 
    <>
    <div className='bottom-footer'>
        <ul className='btm-foot-list'>
            <li className='btm-foot-item btm-foot-copyright'><p className='btm-foot-txt'>© Turners 2025</p></li> 
        </ul> 
        <ul className='rh-btm-foot-list'>   
            <li className='btm-foot-item'><FontAwesomeIcon icon={faHouse} className='footer-icon'/><p className='btm-foot-txt'>Branch Details</p></li> 
            <li className='btm-foot-item'><FontAwesomeIcon icon={faFacebookF} className='footer-icon' /><p className='btm-foot-txt'>Facebook</p></li> 
            <li className='btm-foot-item'><FontAwesomeIcon icon={faEnvelope} className='footer-icon' /><p className='btm-foot-txt'>Newsletter</p></li> 
            <li className='btm-foot-item'><FontAwesomeIcon icon={faEnvelope} className='footer-icon' /><p className='btm-foot-txt'>Email Alerts</p></li>
            <li className='btm-foot-item btm-final-item'><FontAwesomeIcon icon={faInstagram} className='footer-icon' /><p className='btm-foot-txt'>Instagram</p></li>
        </ul>
    </div>
    </> );
}

export default Footer ;