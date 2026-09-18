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
                <button className="profile-button">
                    <i className="fa-solid fa-bars">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"
                            className="lucide lucide-ellipsis-vertical preview-icon">
                            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1"
                            />
                        </svg>
                    </i>
                </button>
            </div>
            <nav className="navbar-list">
                <h2 className="navbar-title">Menu</h2>
                <ul className="navbar-list-items">
                    <li>
                        <NavLink to="/home">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"
                                className="navbar-icon"
                                aria-hidden="true">
                                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                                <path d="M7 11h8" /><path d="M7 16h3" />
                                <path d="M7 6h12" />
                            </svg>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/applications">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"
                                className="navbar-icon"
                                aria-hidden="true">
                                <path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><rect width="16" height="18" x="4" y="4" rx="2" /><path d="M8 10h6" /><path d="M8 14h8" /><path d="M8 18h5" />
                            </svg>
                            Candidaturas
                        </NavLink>
                    </li>
                    <button className="logout-button" onClick={handleLogout}>
                        Sair
                    </button>
                </ul>
            </nav>
        </aside>
    );
}

export default Navbar;