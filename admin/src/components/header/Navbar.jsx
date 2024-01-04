// import './Navbar.css';
// import App from './Drop';


// const Navbar = () => {  

//   return (
//     <div className="navbar">
//       <div className="navbar-left">
//         <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-digital-shopping-logo-mouse-cursor-cart-concepts_502185-286.jpg" alt="Logo" className="logo" />
//       </div>
//       <div className="navbar-right">
//         <div className="profile-icon" > 
//           <img src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png" alt="Profile" /> 
//           <App />
//         </div>
        
//       </div>
//      </div>
//   );
// };

// export default Navbar;

import React from 'react';

const Navbar = () => {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to right, #2e72e5, #0a4be9)',
        color: '#fff',
        padding: '10px 20px',
        transition: 'background 0.3s',
    };

    const logoStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#fff',
    };

    const userIconStyle = {
        fontSize: '20px',
        marginLeft: '10px',
        cursor: 'pointer',
        transition: 'color 0.3s',
    };

 
    return (
        <div
            style={navbarStyle}
        >
            <div>
                <a href="/" style={logoStyle}>
                    Your Logo
                </a>
            </div>
            <div>
                <span>Welcome, User</span>
                <i
                    className="fas fa-user"
                    style={userIconStyle}
                    
                ></i>
            </div>
        </div>
    );
};

export default Navbar;




