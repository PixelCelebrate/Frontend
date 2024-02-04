import React, {useContext, useEffect} from 'react';
import './home-container.css';
import backgroundImg1 from '../commons/images/backgroundImg1.jpg'
import * as API_HOME_CONTAINER from "./api/home-api"; 
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Container,
} from 'reactstrap';
import HomeForm_Login from "./components/home-form_login";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import HomeForm from "./components/home-form_login";
import * as API_HOME from "./api/home-api"
import { useState } from 'react'
import {AppContext} from "../App";


export default function HomeContainer() {

    //Definite o singura data aici:
    const [selectLogin, setSelectLogin] = useState(false);
    const [selectRegister, setSelectRegister] = useState(false);
    //Pentru butoane de login si register si logout:
    const [loginAndRegisterButtons, setLoginAndRegisterButtons] = useState(<div></div>); 


    //Din APp JS: Folosesti context:
    //Trebuie definite unde sunt folosite:
    const {isLoggedIn, setIsLoggedIn, 
           isEmployee, setIsEmployee, 
           employeeUsername, setEmployeeUsername} = useContext(AppContext);


    //Set modal login:
    const toggleFormLogin = () => {
        setSelectLogin(!selectLogin);

        console.log("Login Form!");
    }

    //Set modal register:
    const toggleFormRegister = () => {
        setSelectRegister(!selectRegister);

        console.log("Register Form!");
    }

    //Pentru reload:
    const reload = (loginOrRegister) => {
        //Diferit:
        if(loginOrRegister === 1)
        {
            //Am facut login:
            toggleFormLogin();
        }
        else if(loginOrRegister === 2)
        {
            //Am facut register:
            toggleFormRegister();
        }
    }



    //Pentru logout: Fara api catre backend:
    const handleLogout = () => {
        userLogout();
        //Afisare pagina pe care sunt:
        console.log("Page that was left: " + window.location.href);
    }

    //User logout:
    const userLogout = () => {

        // return API_HOME_CONTAINER.userLogout((result, status) => {
        //     if (status === 200 || status === 201)
        //     {

        console.log("User Name Delogat: " + setEmployeeUsername(localStorage.getItem("employeeUsername")) + " !");

        //Not logged in anymore:
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);

        //Employee:
        setIsEmployee(true);
        localStorage.setItem("isEmployee", true);

        //Empty username:
        setEmployeeUsername("username");
        localStorage.setItem("employeeUsername", "username");

        //    }
        //     else {
        //         window.alert("Invalid!");
        //     }
        // });
    }



    //Pentru handle data: Pe cealalta pagina:
    // const handleUserData = () => {
    //     userData();
    // }

    //Get user data:
    // const userData = () => {
    //     return API_HOME_CONTAINER.getUserData((result, status) => {
    //         if (result !== null && status === 200) {
    //         } else {
    //             window.alert("Invalid!");
    //         }
    //     });
    // }



    //Pentru a afisa angajatul:
    //Refresh context:
    useEffect(() => {
            setIsLoggedIn(localStorage.getItem("isLoggedIn"));
            setIsEmployee(localStorage.getItem("isEmployee"));
            setEmployeeUsername(localStorage.getItem("employeeUsername"));

            //Daca nu este logat nimeni, poti da login:
            if(isLoggedIn === "false")
            {
            //Butonul de login:
            setLoginAndRegisterButtons(<div>
                <Button
                    className = "home-loginStyle"
                    onClick={toggleFormLogin}
                > Login </Button>

                {/* <Button
                    className = "home-registerStyle"
                    onClick={toggleFormRegister}
                >
                    Register
                </Button> */}
            </div>); 
        }
        else
        {
            //Este cineva logat:
            setLoginAndRegisterButtons(
                <div>
                    <p className="home-userUsernameData">Hello, {employeeUsername}!</p>

                    <Button
                        className = "home-logoutStyle"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Button>
                </div>
            );
        }
    }
    //Pentru activare:
    , [isLoggedIn, employeeUsername]);




    return (
        <div className="home">

            {/*Parte titlu:*/}
            <div>
                <div className="home-divTitle"></div>

                {/*Title:*/}
                <p className="home-p1">
                    Pixel Celebration
                </p>

                {/*Title:*/}
                <div className="home-divTitleText"></div>

                {/*Text sub:*/}
                <p className="home-p2"> The Future, With Medical Imagery: </p>

                {/*Text 1:*/}
                <p className="home-p3">
                    - Medical imaging plays a crucial 
                    <br></br>
                    role in modern healthcare, providing 
                    <br></br>
                    valuable insights into the internal 
                    <br></br>
                    structures of the human body.
                    </p>

                {/*Text 2:*/}
                <p className="home-p4">
                    - These images aid healthcare professionals
                    <br></br>
                    in diagnosing, monitoring, and treating 
                    <br></br>
                    various medical conditions. Several imaging
                    <br></br> 
                    modalities are utilized, each offering unique
                    <br></br>
                    perspectives and applications.
                    </p>

                {/*Img 1:*/}
                <img src={backgroundImg1}  alt = "Background Img 1"
                     width = "100%" height = "50%" style = {{opacity : "0.5"}}>
                </img> 
            </div>



            {/*Parte login + register:*/}
            <div className="home-divCredentials">
                {/*Text Login Register:*/}
                <div className="home-LoginRegisterText"></div>

                {/*Paragraf Login Register:*/}
                <p className = "home-LoginRegisterTextP1">
                    Do you want to login?
                    <br></br>
                    All employees can acces their account
                    <br></br>
                    using the following button!
                </p>

                {/*Sageata din 3 componente:*/}
                <div className="home-LoginRegisterArrow"></div>
                <div className="home-LoginRegisterArrowUp"></div>
                <div className="home-LoginRegisterArrowDown"></div>

                {/*Div Buttons:*/}
                <div className="home-LoginRegisterButtons"></div>


                {/*Ori logat, ori nu: Cu useEffects:*/}
                {loginAndRegisterButtons}


                {/* Raman aici pentru ca si fara buton pot sa existe: */}
                {/*Login:*/}
                <Modal
                    isOpen={selectLogin}
                    toggle={toggleFormLogin}
                    size="lg"
                    style = {{borderRadius: "20% !important"}}
                >
                    <ModalHeader
                        style={{backgroundColor: '#98b9ec',
                            textAlign: "center",
                            paddingLeft: "45%",}}
                        toggle={toggleFormLogin}>
                        <strong>
                            Login:
                        </strong>
                    </ModalHeader>

                    <ModalBody
                        style={{backgroundColor: '#98b9ec'}}
                    >
                        <HomeForm_Login
                            reloadHandler={() => reload(1)}
                        />
                    </ModalBody>
                </Modal>

                {/*Register:*/}
                <Modal
                    isOpen={selectRegister}
                    toggle={toggleFormRegister}
                    size="lg"
                    style = {{borderRadius: "20% !important "}}
                >
                    <ModalHeader
                        style={{backgroundColor: '#98b9ec',
                            textAlign: "center",
                            paddingLeft: "45%"}}
                        toggle={toggleFormRegister}>
                        <strong>
                            Register
                        </strong>
                    </ModalHeader>

                    {/* <ModalBody
                        style={{backgroundColor: '#98b9ec'}}>
                        <HomeForm_Register
                            reloadHandler={() => reload(2)}
                        />
                    </ModalBody> */}
                </Modal>

            </div>

        </div>
    );
}