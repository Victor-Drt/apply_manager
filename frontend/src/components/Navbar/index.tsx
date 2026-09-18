import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";


interface NavbarProps {
    name: string;
    image: string;
    email: string;
}

const Navbar = ({ name, image, email }: NavbarProps) => {

    const navigate = useNavigate()
    var imageUrl = image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}`

    function handleLogout() {
        logout()
        navigate("/", { replace: true })
    }

    if (!image) {
        let splited_name = name.split(" ")
        imageUrl += `${splited_name[0]}+${splited_name[1]}`
    }

    return (
        <aside className="navbar">
            <div className="profile-card-row">
                <img className="profile-image" src={image ? image : imageUrl} alt="Profile" />
                <h2 className="profile-name">{name}</h2>
                <p className="profile-email">{email}</p>
                <button className="profile-button"><i className="fa-solid fa-bars">:</i></button>
            </div>
            <nav className="navbar-list">
                <h2 className="navbar-title">Menu</h2>
                <ul className="navbar-list-items">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/applications">Applications</NavLink></li>
                    <button className="logout-button" onClick={handleLogout}>
                        Sair
                    </button>
                </ul>
            </nav>
        </aside>
    );
}

export default Navbar;