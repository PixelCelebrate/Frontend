import React, {useContext, useEffect} from 'react';
import {AppContext} from "../../App";
import Button from "react-bootstrap/Button";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { withRouter } from "react-router-dom";
import validate from "./validators/home-validators";
import * as API_HOME_LOGIN from "../api/home-api";


//Form:
class HomeForm_Login extends React.Component
{
    //Constructor:
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.userLogin = this.userLogin.bind(this);

        this.state = {
            userLoggedIn: {
                name: '',
                username: '',
                role: '',
            },
            formIsValid: false,
            formControls: {
                username: {
                    value: '',
                    placeholder: 'Login with Username',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        nameValidator: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Must be 8-10 characters, at least 1 digit, 1 special character and must start with a capital letter.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        passwordValidator: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Toggle:
    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    //Verificari pentru change:
    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;

            //Not needed:
            //console.log(updatedControls[updatedFormElementName].valid);
        }

        //Not needed:
        //console.log(value);

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };

    //Handle la ce primeste de la fields:
    handleSubmit(isLoggedIn, setIsLoggedIn, isEmployee, setIsEmployee, setEmployeeUsername)
    {
        let homeUserLogin = {
            UserName: this.state.formControls.username.value,
            Password: this.state.formControls.password.value
        };

        //Not every time:
        console.log(homeUserLogin);

        //Apeluri backend:
        this.userLogin(homeUserLogin, isLoggedIn, setIsLoggedIn, isEmployee, setIsEmployee, setEmployeeUsername);
    }

    //User Login:
    userLogin(homeUserLogin, isLoggedIn, setIsLoggedIn, isEmployee, setIsEmployee, setEmployeeUsername) {
        return API_HOME_LOGIN.userLogin(homeUserLogin, (result, status) => {

            //if (result !== null && (status === 200 || status === 201))
            if (result !== "There is not such user!" && (status === 200 || status === 201))
            {
                this.reloadHandler();
                console.log("User name: " + result.UserName + " !");

                //Save logged in user: Name, Username, Role:
                this.state.userLoggedIn.name = result.FirstName;
                this.state.userLoggedIn.username = result.UserName;
                this.state.userLoggedIn.role = result.Role;

                //Avem pe cineva logat acum:
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", true);
                setEmployeeUsername(result.UserName);
                localStorage.setItem("employeeUsername", result.UserName);

                //If employee:
                if(this.state.userLoggedIn.role === "Employee")
                {
                    setIsEmployee(true);
                    localStorage.setItem("isEmployee", true);
                    console.log("Employee Logged In!");
                }
                //If administrator
                else if(this.state.userLoggedIn.role === "Administrator")
                {
                    setIsEmployee(false);
                    localStorage.setItem("isEmployee", false);
                    console.log("Administrator Logged In!");
                }
            }
            else {
                window.alert("Invalid credentials, try again!");
            }
        });
    }

    render() {

        return (
                <div>
                    <FormGroup id='username'
                               style = {{backgroundColor: "#ecca67",
                                   padding: "2%",
                                   borderRadius: "1.5%"}}
                    >
                        <AppContext.Consumer>
                            {({isLoggedIn}) => (
                                <Label for='usernameField' style = {{fontStyle: "italic", fontSize: "large"}}>
                                    <strong>
                                        Username:
                                    </strong>
                                </Label>
                            )}
                        </AppContext.Consumer>
                        <Input name='username' id='usernameField'
                               placeholder={this.state.formControls.username.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.username.value}
                               touched={this.state.formControls.username.touched? 1 : 0}
                               valid={this.state.formControls.username.valid}
                               required
                        />
                        {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                            <div
                                style = {{marginLeft: "3%",
                                    marginTop: "3%"}}
                                className={"error-message row"}>
                                * Username is not valid!
                            </div>}
                    </FormGroup>

                    {/*Password:*/}
                    {/*Type pentru password ascuns:*/}
                    <FormGroup id='password'
                               style = {{backgroundColor: "#ecca67",
                                   padding: "2%",
                                   borderRadius: "1.5%"}}
                    >
                        <Label for='passwordField' style = {{fontStyle: "italic", fontSize: "large"}}>
                            <strong>
                                Password:
                            </strong>
                        </Label>
                        <Input type='password' name='password' id='passwordField'
                               placeholder={this.state.formControls.password.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.password.value}
                               touched={this.state.formControls.password.touched? 1 : 0}
                               valid={this.state.formControls.password.valid}
                               required
                        />
                        {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                            <div
                                style = {{marginLeft: "3%",
                                    marginTop: "3%"}}
                                className={"error-message"}>
                                * Password must have a valid format!
                            </div>}
                    </FormGroup>

                    {/*Buton confirmare, in handleSubmit apel pentru backend: HandleSubmit de login;*/}
                    <Row>
                        <Col sm={{size: '8', offset: 5}}>
                        <AppContext.Consumer>
                            {({isLoggedIn, setIsLoggedIn, isEmployee, setIsEmployee, setEmployeeUsername}) => (
                                <Button type={"submit"} disabled={!this.state.formIsValid}
                                        onClick={() => this.handleSubmit(isLoggedIn, setIsLoggedIn, isEmployee, setIsEmployee, setEmployeeUsername)}
                                        style = {{backgroundColor: '#ab1111'}}>
                                    Confirm Login
                                </Button>
                            )}
                        </AppContext.Consumer>
                        </Col>
                    </Row>

                </div>
        ) ;
    }
}

//Rutare:
export default withRouter(HomeForm_Login);


