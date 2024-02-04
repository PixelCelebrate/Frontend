import React from 'react';
import './userpage-container.css';
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
    Input,
    Label,
} from 'reactstrap';

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import backgroundImg1 from "../commons/images/backgroundImg1.jpg";
import backgroundImg2 from "../commons/images/backgroundImg2.jpg";
import { useState, useContext, useEffect} from 'react';
//Componentele au nevoie de litera mare:
import Userpage_addUser from "./components/userpage_addUser";
import Userpage_updateUser from "./components/userpage_updateUser";
import Userpage_deleteUser from "./components/userpage_deleteUser";
import Userpage_selectNumberOfDays from "./components/userpage_selectNumberOfDays";
import {AppContext} from "../App";
import AdministratorTable from "./components/userpage_tableAdministrator";
import EmployeeTable from "./components/userpage_tableEmployee";
import * as API_USERPAGE_TABLEMANAGEMENT from "./api/userpage-api";


export default function UserPageContainer() {

    //Select modals CRUD:
    const [selectAddUser, setSelectAddUser] = useState(false);
    const [selectUpdateUser, setSelectUpdateUser] = useState(false);
    const [selectDeleteUser, setSelectDeleteUser] = useState(false);
    const [selectNumberOfDays, setSelectNumberOfDays] = useState(false);
    const [selectModal, setSelectModal] = useState(<div></div>);

    //Pentru alegere intre angajat si administrator: Pentru employee am nevoie de 2 si dupa concatenat:
    const [employeeOrAdministrator, setEmployeeOrAdministrator] = useState(<div></div>); 
    const [employeeTable, setEmployeeTable] = useState(<div></div>); 

    const {isLoggedIn, setIsLoggedIn, 
           isEmployee, setIsEmployee, 
           employeeUsername, setEmployeeUsername} = useContext(AppContext);


    //Pentru tabel: Lista goala la inceput:
    const [tableAdmin, setTableAdmin] = useState([]); //([]); 
    // const [tableEmployee, setTableEmployee] = useState([]); 
    var tableAdminResult = []; //Nu const
    var tableEmployeeResult = [];
    // this.setState({ dealersOverallTotal: total }, () => {
    //      console.log(this.state.dealersOverallTotal, 'dealersOverallTotal1');
    // }); 
    //Isloaded nu cred ca trebuie;


    //Set modal add user:
    const toggleFormAddUser = () => {
        setSelectAddUser(!selectAddUser);

        console.log("Add User Form!");
    }

    //Set modal update user:
    const toggleFormUpdateUser = () => {
        setSelectUpdateUser(!selectUpdateUser);

        console.log("Update User Form!");
    }

    //Set modal delete user:
    const toggleFormDeleteUser = () => {
        setSelectDeleteUser(!selectDeleteUser);

        console.log("Delete User Form!");
    }

    //Set modal number of days:
    const toggleFormNumberOfDays = () => {
        setSelectNumberOfDays(!selectNumberOfDays);

        console.log("Select Number Of Days Form!");
    }

    //Pentru reload:
    const reload = (selectModal) => {
        //Diferit:
        if(selectModal === 1)
        {
            //Add User:
            toggleFormAddUser();
        }
        else if(selectModal === 2)
        {
            //Update User:
            toggleFormUpdateUser();
        }
        else if(selectModal === 3)
        {
            //Delete User:
            toggleFormDeleteUser();
        }
        else if(selectModal === 4)
        {
            //Delete User:
            toggleFormNumberOfDays();
        }

        //Refresh page: Doar pe admin afecteaza:
        window.location.reload(false);
    }


    const setUserAdminData = (userAdminData) => {
        //Asincron: Deci nu va apuca sa se afiseze la console log:
        
        //Metoda 1:
        // setTableAdmin(userAdminData);
        //Metoda 2:
        tableAdminResult = userAdminData;

        console.log("The user data 2: ");
        console.log(userAdminData);
        console.log("The user data 3: ");
        console.log(tableAdmin);
        console.log("The user data 4: ");
        console.log(tableAdminResult);
    }

    const setUserEmployeeData = (userEmployeeData) => {
        tableEmployeeResult = userEmployeeData;
    }


    //Pentru ADMIN:
    //Get user data: Get deci fara parametru:
    const getUserData = () => {
        return API_USERPAGE_TABLEMANAGEMENT.getUserData((result, status) => {

            //Nu poate da eroare la luat, doar null daca nu exista date in tabel:
            if (result !== null && (status === 200 || status === 201))
            {
                //Pentru a pune datele:
                setUserAdminData(result);

                //Admin:
                setEmployeeOrAdministrator(
                <div>
                <div className = "userPage">
    
                    {/*Title:*/}
                    <div className="userpage-divTitle"></div>
    
                    <p className="userpage-p1">
                        Administrator Page
                    </p>
    
                    {/*Title:*/}
                    {/* <div className="userpage-divTitleText"></div> */}
    
    
    
                    {/* CRUD: */}
                    {/* Add: */}
                    <Button
                        className = "userpage-addUserStyle"
                        onClick={toggleFormAddUser}
                    > 
                    Add User 
                    </Button>
    
                    {/* Update: */}
                    <Button
                        className = "userpage-updateUserStyle"
                        onClick={toggleFormUpdateUser}
                    > 
                    Update User 
                    </Button>
    
                    {/* Delete: */}
                    <Button
                        className = "userpage-deleteUserStyle"
                        onClick={toggleFormDeleteUser}
                    > 
                    Delete User 
                    </Button>

                    {/* Number of days: */}
                    <Button
                        className = "userpage-numberOfDaysStyle"
                        onClick={toggleFormNumberOfDays}
                    > 
                    {/* Set Number Of Days */}
                    Set No. Days
                    </Button>
    
    
                    {/* Table with every user: */}
                    {/* Trebuie refresh: */}
                    <div className="userpage-tableAdmin">
                        <Row>
                            <Col sm={{size: '8', offset: '2'}}>
                                <AdministratorTable 
                                // tableData = {tableAdmin}
                                tableData = {tableAdminResult}
                                />
                            </Col>
                        </Row>
                    </div>
    
    

                    {/* Input field pentru zile de nastere: */}


    
                    {/*Img 1:*/}
                    <img src={backgroundImg1}  alt = "Background Img 1"
                         width = "100%" height = "100%" 
                         style = {{opacity : "0.6"}}
                         //  background-repeat = "repeat"
                         >
                    </img>
    
                    <div className = "userpage-blackBar">
    
                    </div>
    
                    <img src={backgroundImg2}  alt = "Background Img 2"
                         width = "100%" height = "100%" 
                         style = {{opacity : "0.6",
                                   //    border : "100% 100% 0% 0% solid black",
                                   //    borderColor: "black"
                                }} 
                         //  background-repeat = "repeat"
                         >
                    </img>
                </div>
                </div>
                ); 

                //Trebuie pus in tabel datele luate: Result direct:
                console.log("The user data 1: ");
                var userAdminData = result;
                console.log(result);
                // setTableAdmin(userAdminData);
                // setTableAdmin(result);
                // setUserAdminData(result);
                // localStorage.setItem("userAdminTable", result);
                // console.log("The user data: " + result);

                //this.reloadHandler();
                //console.log("Username: " + result.UserName + "!");
                //window.alert("The user was added!");
            }
            else {
                //Siguranta:
                //Daca nu sunt bune datele:
                // setTableAdmin([]);
                setUserAdminData([]);
                // localStorage.setItem("userAdminTable", []);
                //Nimic altceva:
                window.alert("Invalid data!");
            }
        });
    }



    //Pentru EMPLOYEE:
    //Get own data: And title at the begining:
    const getUserDataByUsername = (usernameSaved) => {
        //Nu este doar pentru table management:
        return API_USERPAGE_TABLEMANAGEMENT.getUserDataByUsername(usernameSaved, (result, status) => {

            //Primesc inapoi tot obiectul, scot id-ul: Nu exista caz adevarat de eroare;
            if (result !== null && (status === 200 || status === 201))
            {
                //Date personale employee:
                setEmployeeOrAdministrator(
                    <div>
                        {/*Title:*/}
                        <div className="userpage-divTitle"></div>
                        <p className="userpage-p1-employee">
                           Employee Page
                        </p>

                        <div className = "userpage-firstNameField">
                        <Label for='firstnameField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                First name:
                            </strong>
                        </Label>
                        <Input name='firstname' id='firstField'
                               defaultValue={result.FirstName}
                               readOnly
                        />
                        </div>

                        <div className = "userpage-lastNameField">
                        <Label for='lastnameField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                Last Name:
                            </strong>
                        </Label>
                        <Input name='lastname' id='lastnameField'
                               defaultValue={result.LastName}
                               readOnly
                        />
                        </div>

                        <div className = "userpage-userNameField">
                        <Label for='usernameField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                Username:
                            </strong>
                        </Label>
                        {/* type='username'  */}
                        <Input name='username' id='usernameField'
                               defaultValue={result.UserName}
                               //Nemodificabil:
                               readOnly
                        />
                        </div>

                        {/* <div className = "userpage-passwordField">
                        <Label for='passwordField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                Password:
                            </strong>
                        </Label>
                        <Input name='Password' id='passwordField'
                               defaultValue={result.Password}
                               readOnly
                        />
                        </div> */}

                        <div className = "userpage-birthdayField">
                        <Label for='birthdayField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                Birthday:
                            </strong>
                        </Label>
                        <Input name='birthday' id='birthdayField'
                               defaultValue={result.Birthday.substring(0, 10)}
                               readOnly
                        />
                        </div>

                        <div className = "userpage-roleField">
                        <Label for='roleField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                Role:
                            </strong>
                        </Label>
                        <Input name='role' id='roleField'
                               defaultValue={result.Role}
                               readOnly
                        />
                        </div>

                        <div className = "userpage-emailField">
                        <Label for='emailField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                Email:
                            </strong>
                        </Label>
                        <Input name='email' id='emailField'
                               defaultValue={result.Email}
                               readOnly
                        />
                        </div>

                        <div className = "userpage-dateOfJoiningField">
                        <Label for='dateOfJoiningField' 
                        style = {{fontSize: "large"}}>
                            <strong>
                                Date of joining:
                            </strong>
                        </Label>
                        <Input name='dateofjoining' id='dateofjoiningField'
                               defaultValue={result.DateOfJoining.substring(0, 10)}
                               readOnly
                        />
                        </div>

                        {/*Img 1:*/}
                        <img src={backgroundImg1}  alt = "Background Img 1"
                            width = "100%" height = "100%" 
                            style = {{opacity : "0.6"}}
                             >
                        </img>
    
                    <   div className = "userpage-blackBar">
                        </div>
    
                        {/* Img 2: */}
                        <img src={backgroundImg2}  alt = "Background Img 2"
                            width = "100%" height = "100%" 
                            style = {{opacity : "0.6",
                                    }} 
                             >
                        </img>
                    </div>
                    ); 
            }
            else {
                window.alert("Invalid data!");
            }
        });
    }


    //Get user data: Get deci fara parametru:
    const getUserInfo = () => {
        return API_USERPAGE_TABLEMANAGEMENT.getUserInfo((result, status) => {

            //Nu poate da eroare la luat, doar null daca nu exista date in tabel:
            if (result !== null && (status === 200 || status === 201))
            {
                //Pentru a pune datele:
                setUserEmployeeData(result);

                //Employee:
                setEmployeeTable(
                <div>
                <div className = "userPage">
    
                    {/* Table with every employees username and email: */}
                    {/* Trebuie refresh: */}
                    <div className="userpage-tableEmployee">
                        <Row>
                            <Col sm={{size: '8', offset: '2'}}>
                                <EmployeeTable 
                                tableData = {tableEmployeeResult}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                </div>
                ); 
            }
            else {
                window.alert("Invalid data!");
            }
        });
    }




     //Pentru cine sa fie afisat:
    useEffect(() => {
        //Setare pentru activare:
        // getUserData();
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
        setIsEmployee(localStorage.getItem("isEmployee"));
        setEmployeeUsername(localStorage.getItem("employeeUsername"));
        // setTableAdmin([]);
        // getUserData();

        //Pentru admin:
        if(isLoggedIn === "true" && isEmployee === "false")
        {
            getUserData();

            //Pentru a se pune tabelurile:
            // getUserData();
            // setTableAdmin([]);
            // setTableAdmin(localStorage.getItem("userAdminTable"));
            // console.log("The table:");
            // console.log(tableAdmin);
            console.log("The user data 5: ");
            console.log(tableAdmin);
        }
        //Daca nu este apelat ramane gol:
        else if(isLoggedIn === "true" && isEmployee === "true")
        {
            //Employee:
            //Get own data: In loc de handleSubmit:
            var usernameSaved = localStorage.getItem("employeeUsername");
            getUserDataByUsername(usernameSaved);
            //Get employees usernames and emails:
            getUserInfo();

            //Concatenare cele 2 parti get:
            //employeeOrAdministrator;
        }
        else if(isLoggedIn === "false")
        {
            //Page not found::
            setEmployeeOrAdministrator(
            <div>
                {/* <ErrorPage/> */}
                {/* <Route render={() =><ErrorPage/>} /> */}
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                    <h1 style = {{color: 'red', textAlign: 'center',
                                  margin: '15% 0% 0% 0%'}}>
                                  Page not found! Try to log in!
                    </h1>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            ); 
        }
    }
    //Pentru activare:
    , [isLoggedIn, isEmployee]);       
    // , [isLoggedIn, isEmployee, tableAdmin]);  
    // , [isLoggedIn, isEmployee, tableAdminResult]);   


    return (
        <div>
                {/* Employee, Admin or Nothing: */}
                {employeeTable}
                {employeeOrAdministrator}
                {/* {getUserData()} */}


                {/* Raman aici pentru ca si fara buton pot sa existe: */}
                {/*Add User:*/}
                <Modal
                    //Pe care sa o folosim:
                    isOpen={selectAddUser}
                    toggle={toggleFormAddUser}
                    size="lg"
                    style = {{borderRadius: "20% !important"}}
                >
                    <ModalHeader
                        style={{backgroundColor: '#98b9ec',
                            textAlign: "center",
                            paddingLeft: "45%",}}
                        toggle={toggleFormAddUser}>
                        <strong>
                            Add User:
                        </strong>
                    </ModalHeader>

                    <ModalBody
                        style={{backgroundColor: '#98b9ec'}}
                    >
                        <Userpage_addUser
                            reloadHandler={() => reload(1)}
                        />
                    </ModalBody>
                </Modal>


                {/* Update User: */}
                <Modal
                    //Pe care sa o folosim:
                    isOpen={selectUpdateUser}
                    toggle={toggleFormUpdateUser}
                    size="lg"
                    style = {{borderRadius: "20% !important"}}
                >
                    <ModalHeader
                        style={{backgroundColor: '#98b9ec',
                            textAlign: "center",
                            paddingLeft: "45%",}}
                        toggle={toggleFormUpdateUser}>
                        <strong>
                            Update User:
                        </strong>
                    </ModalHeader>

                    <ModalBody
                        style={{backgroundColor: '#98b9ec'}}
                    >
                        <Userpage_updateUser
                            reloadHandler={() => reload(2)}
                        />
                    </ModalBody>
                </Modal>


                {/*Delete User:*/}
                <Modal
                    //Pe care sa o folosim:
                    isOpen={selectDeleteUser}
                    toggle={toggleFormDeleteUser}
                    size="lg"
                    style = {{borderRadius: "20% !important"}}
                >
                    <ModalHeader
                        style={{backgroundColor: '#98b9ec',
                            textAlign: "center",
                            paddingLeft: "45%",}}
                        toggle={toggleFormDeleteUser}>
                        <strong>
                            Delete User:
                        </strong>
                    </ModalHeader>

                    <ModalBody
                        style={{backgroundColor: '#98b9ec'}}
                    >
                        <Userpage_deleteUser
                            reloadHandler={() => reload(3)}
                        />
                    </ModalBody>
                </Modal>


                {/*Number of days:*/}
                <Modal
                    //Pe care sa o folosim:
                    isOpen={selectNumberOfDays}
                    toggle={toggleFormNumberOfDays}
                    size="lg"
                    style = {{borderRadius: "20% !important"}}
                >
                    <ModalHeader
                        style={{backgroundColor: '#98b9ec',
                            textAlign: "center",
                            paddingLeft: "45%",}}
                        toggle={toggleFormNumberOfDays}>
                        <strong>
                            {/* Set Number Of Days: */}
                            Set No. Days:
                        </strong>
                    </ModalHeader>

                    <ModalBody
                        style={{backgroundColor: '#98b9ec'}}
                    >
                        <Userpage_selectNumberOfDays
                            reloadHandler={() => reload(4)}
                        />
                    </ModalBody>
                </Modal>
        </div>
    );
}





