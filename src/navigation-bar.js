import React from 'react'
import logo from './commons/images/celebrationIcon.svg';
import './navigation-bar.css';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap'; 
import {useContext, useEffect, useState} from 'react';
import {AppContext} from "./App"; //Working directory, not father directory;




// Structura noua:
export default function NavigationBar() {

    //Pentru a alege intre afisare sau nu la pagina noua:
    const [userPage, setUserPage] = useState(<div></div>); 

    const {isLoggedIn, setIsLoggedIn} = useContext(AppContext);


    // Pentru a afisa angajatul:
    // Refresh context:
    useEffect(() => {
        //Pentru refresh:
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));

        //Daca nu este logat:
        if(isLoggedIn === "false")
        {
            //Butonul de login:
            setUserPage(
            <div>
                  {/* Gol;     */}
            </div>
            ); 
        }
        else
        {
            //Este cineva logat:
            setUserPage(
                <div>
                     <NavLink className = "nav-bar-link2" href="/userpage">User Page</NavLink>
                </div>
            );
        }
    }
    //Pentru activare:
    , [isLoggedIn]);


    return (
        <div
        style = {{
            display: "unset",
        }}
    >
        <Navbar color="dark" expand="md"
        style = {{
            position: "sticky",
            zIndex: "120",
            width: "100%",
            top: "0vmax",
            borderStyle: "solid",
            borderWidth: "0vmax 0vmax 0.5vmax 0vmax",
            borderColor: "black",
        }}
        >
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"50"}/>
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <NavLink className = "nav-bar-link1" href="/">Home</NavLink>
                
                {/* Afisat sau nu: */}
                {/* <NavLink className = "nav-bar-link2" href="/desprenoi">User Page</NavLink> */}
                {userPage}

            </Nav>
        </Navbar>
        </div>
    );
}





//Structura veche:
// const NavigationBar = () => (

//     <div
//     style = {{
//         display: "unset",
//     }}
//     >
//         <Navbar color="dark" expand="md"
//         style = {{
//             position: "sticky",
//             zIndex: "120",
//             width: "100%",
//             top: "0vmax",
//             borderStyle: "solid",
//             borderWidth: "0vmax 0vmax 0.5vmax 0vmax",
//             borderColor: "black",
//         }}
//         >
//             <NavbarBrand href="/">
//                 <img src={logo} width={"50"}
//                      height={"50"}/>
//             </NavbarBrand>
//             <Nav className="mr-auto" navbar>

//                 <NavLink className = "nav-bar-link1" href="/">Home</NavLink>
                
//                 {/* Afisat sau nu: */}
//                 <NavLink className = "nav-bar-link2" href="/desprenoi">User Page</NavLink>
//                 {/* {userPage} */}

//             </Nav>
//         </Navbar>
//     </div>
// );

// export default NavigationBar



