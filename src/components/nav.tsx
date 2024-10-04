import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { faCalendar, faComments } from "@fortawesome/free-regular-svg-icons";
import { faMoneyBill, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav(){


    const Styles = {
        navHolder: 
        {
            width: '98vw',
            height: "30px",
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: "10px"
        },
        navButton: 
        {
            width: "25%"
        }
    }


    return (
        <div style={Styles.navHolder}>
            <button style={Styles.navButton}>
                <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
            </button>
            <button style={Styles.navButton}>
                <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>
            </button>
            <button style={Styles.navButton}>
                <FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
            </button>
            <button style={Styles.navButton}>
                <FontAwesomeIcon icon={faComments} />
            </button>
        </div>
    )
}