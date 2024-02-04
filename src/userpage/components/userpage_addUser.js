import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { withRouter } from "react-router-dom";
import validate from "./validators/userpage-validators";
import * as API_USERPAGE_ADDUSER from "../api/userpage-api";
import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";


//Form:
class Userpage_addUser extends React.Component
{
    //Constructor:
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.addUser = this.addUser.bind(this);

        //State:
        this.state = {
            formIsValid: false,
            formControls: {

                // UserId: {
                //     value: '',
                //     placeholder: 'User Id',
                //     valid: false,
                //     touched: false,
                //     validationRules: {
                //         minLength: 3,
                //         isRequired: true,
                //         nameValidator: true
                //     }
                // },
                FirstName: {
                    value: '',
                    placeholder: 'Insert first name.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        nameValidator: true
                    }
                },
                LastName: {
                    value: '',
                    placeholder: 'Insert last name.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        nameValidator: true
                    }
                },
                UserName: {
                    value: '',
                    placeholder: 'Insert username.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        nameValidator: true
                    }
                },
                Password: {
                    value: '',
                    placeholder: 'Must be 8-10 characters, at least 1 digit, 1 special character and must start with a capital letter.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        passwordValidator: true
                    }
                },
                //Birthday: new Date(),
                // Birthday: {
                //     value: '',
                //     placeholder: '',
                //     valid: false,
                //     touched: false,
                //     validationRules: {
                //         isRequired: true,
                //     }
                // },
                Role: {
                    value: '',
                    placeholder: 'Insert Administrator or Employee.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        roleValidator: true
                    }
                },
                Email: {
                    value: '',
                    placeholder: 'Insert a valid email.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        emailValidator: true
                    }
                },
                //DateOfJoining: new Date(),
                // DateOfJoining: {
                //     value: '',
                //     placeholder: '',
                //     valid: false,
                //     touched: false,
                //     validationRules: {
                //         isRequired: true,
                //     }
                // },
            },
            Birthday: new Date(),
            DateOfJoining: new Date(),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handleDateOfJoining = this.handleDayOfJoining.bind(this);
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

        //Verifica daca ramane true:
        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        //Caz prioritar:
        // if(updatedFormElement.value == "nothing")
        // {
        //     //Setez true si ignora asa:
        //     formIsValid = true;
        // }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };

    //Handle Birthday and DayOfJoining:
    handleBirthday(birthdayInput) {
        this.setState({
            Birthday: birthdayInput
        });
    }

    handleDayOfJoining(dateOfJoiningInput) {
        this.setState({
            DateOfJoining: dateOfJoiningInput
        });
    }

    handleSubmit()
    {
        let userToAdd = {
            FirstName: this.state.formControls.FirstName.value,
            LastName: this.state.formControls.LastName.value,
            UserName: this.state.formControls.UserName.value,
            Password: this.state.formControls.Password.value,
            Birthday: "", //this.state.formControls.Birthday.value,
            Role: this.state.formControls.Role.value,
            Email: this.state.formControls.Email.value,
            DateOfJoining: "", //this.state.formControls.DateOfJoining.value
        };

        let Birthday;
        let DateOfJoining

        //Pentru data corecta string:
        if(this.state.Birthday.getMonth() < 10)
        {
            if(this.state.Birthday.getDate() < 10)
            {
                Birthday = this.state.Birthday.getFullYear() + '-0' +
                    (this.state.Birthday.getMonth() + 1) + '-0'
                    + this.state.Birthday.getDate();
            }
            else
            {
                Birthday = this.state.Birthday.getFullYear() + '-0' +
                    (this.state.Birthday.getMonth() + 1) + '-'
                    + this.state.Birthday.getDate();
            }
        }
        else
        {
            if(this.state.Birthday.getDate() < 10)
            {
                Birthday = this.state.Birthday.getFullYear() + '-' +
                    (this.state.Birthday.getMonth() + 1) + '-0'
                    + this.state.Birthday.getDate();
            }
            else
            {
                Birthday = this.state.Birthday.getFullYear() + '-' +
                    (this.state.Birthday.getMonth() + 1)
                    + '-' + this.state.Birthday.getDate();
            }
        }

        //Fara time: Deci 0:
        userToAdd.Birthday = Birthday + "T00:00:00"; 
        console.log("Birthday: " + userToAdd.Birthday + ".");

        if(this.state.DateOfJoining.getMonth() < 10)
        {
            if(this.state.DateOfJoining.getDate() < 10)
            {
                DateOfJoining = this.state.DateOfJoining.getFullYear() + '-0' +
                    (this.state.DateOfJoining.getMonth() + 1) + '-0'
                    + this.state.DateOfJoining.getDate();
            }
            else
            {
                DateOfJoining = this.state.DateOfJoining.getFullYear() + '-0' +
                    (this.state.DateOfJoining.getMonth() + 1) + '-'
                    + this.state.DateOfJoining.getDate();
            }
        }
        else
        {
            if(this.state.DateOfJoining.getDate() < 10)
            {
                DateOfJoining = this.state.DateOfJoining.getFullYear() + '-' +
                    (this.state.DateOfJoining.getMonth() + 1) + '-0'
                    + this.state.DateOfJoining.getDate();
            }
            else
            {
                DateOfJoining = this.state.DateOfJoining.getFullYear() + '-' +
                    (this.state.DateOfJoining.getMonth() + 1)
                    + '-' + this.state.DateOfJoining.getDate();
            }
        }

        //Fara time: Deci 0:
        userToAdd.DateOfJoining = DateOfJoining + "T00:00:00"; 
        console.log("DateOfJoining: " + userToAdd.DateOfJoining + ".");

        console.log(userToAdd);

        this.addUser(userToAdd);
    }

    //Add User:
    addUser(userToAdd) {
        return API_USERPAGE_ADDUSER.addUser(userToAdd, (result, status) => {

            if (result !== null && (status === 200 || status === 201) 
               && result !== "The username (or email) is already taken.")
            {
                this.reloadHandler();

                //console.log("Username: " + result.UserName + "!");

                window.alert("The user was added!");
            }
            else {
                window.alert("Invalid credentials!");
            }
        });
    }

    render() {
        return (
            <div>
                {/*FirstName:*/}
                <FormGroup id='FirstName'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='FirstNameField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            First Name:
                        </strong>
                    </Label>
                    <Input name='FirstName' id='FirstNameField'
                           placeholder={this.state.formControls.FirstName.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.FirstName.value}
                           touched={this.state.formControls.FirstName.touched? 1 : 0}
                           valid={this.state.formControls.FirstName.valid}
                           required
                    />
                    {this.state.formControls.FirstName.touched && !this.state.formControls.FirstName.valid &&
                        <div
                            style = {{marginLeft: "3%",
                                      marginTop: "3%"}}
                            className={"error-message row"}>
                            * User First Name is not valid!
                        </div>}
                </FormGroup>

                {/*LastName:*/}
                <FormGroup id='LastName'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='LastNameField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Last Name:
                        </strong>
                    </Label>
                    <Input name='LastName' id='LastNameField'
                           placeholder={this.state.formControls.LastName.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.LastName.value}
                           touched={this.state.formControls.LastName.touched? 1 : 0}
                           valid={this.state.formControls.LastName.valid}
                           required
                    />
                    {this.state.formControls.LastName.touched && !this.state.formControls.LastName.valid &&
                        <div
                            style = {{marginLeft: "3%",
                                      marginTop: "3%"}}
                            className={"error-message row"}>
                            * User Last Name is not valid!
                        </div>}
                </FormGroup>

                {/*UserName:*/}
                <FormGroup id='UserName'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='UserNameField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            User Name:
                        </strong>
                    </Label>
                    <Input name='UserName' id='UserNameField'
                           placeholder={this.state.formControls.UserName.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.UserName.value}
                           touched={this.state.formControls.UserName.touched? 1 : 0}
                           valid={this.state.formControls.UserName.valid}
                           required
                    />
                    {this.state.formControls.UserName.touched && !this.state.formControls.UserName.valid &&
                        <div
                            style = {{marginLeft: "3%",
                                      marginTop: "3%"}}
                            className={"error-message row"}>
                            * Username is not valid!
                        </div>}
                </FormGroup>

                {/*Password:*/}
                <FormGroup id='Password'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='PasswordField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Password:
                        </strong>
                    </Label>
                    <Input name='Password' id='PasswordField'
                           placeholder={this.state.formControls.Password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.Password.value}
                           touched={this.state.formControls.Password.touched? 1 : 0}
                           valid={this.state.formControls.Password.valid}
                           type="password"
                           required
                    />
                    {this.state.formControls.Password.touched && !this.state.formControls.Password.valid &&
                        <div
                            style = {{marginLeft: "3%",
                                      marginTop: "3%"}}
                            className={"error-message row"}>
                            * User Password is not valid!
                        </div>}
                </FormGroup>

                {/*Birthday:*/}
                <Label for='BirthdayField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Birthday:&nbsp;&nbsp;&nbsp;
                        </strong>
                </Label>
                <DatePicker
                    value = { this.state.Birthday }
                    onChange = { this.handleBirthday }
                    name = "Birthday"
                    format = {"yyyy-MM-dd"}
                    className = "birthday"
                />

                {/*Role:*/}
                <FormGroup id='Role'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='RoleField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Role:
                        </strong>
                    </Label>
                    <Input name='Role' id='RoleField'
                           placeholder={this.state.formControls.Role.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.Role.value}
                           touched={this.state.formControls.Role.touched? 1 : 0}
                           valid={this.state.formControls.Role.valid}
                           required
                    />
                    {this.state.formControls.Role.touched && !this.state.formControls.Role.valid &&
                        <div
                            style = {{marginLeft: "3%",
                                      marginTop: "3%"}}
                            className={"error-message row"}>
                            * User Role is not valid!
                        </div>}
                </FormGroup>

                {/*Email:*/}
                <FormGroup id='Email'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='EmailField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Email:
                        </strong>
                    </Label>
                    <Input name='Email' id='EmailField'
                           placeholder={this.state.formControls.Email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.Email.value}
                           touched={this.state.formControls.Email.touched? 1 : 0}
                           valid={this.state.formControls.Email.valid}
                           required
                    />
                    {this.state.formControls.Email.touched && !this.state.formControls.Email.valid &&
                        <div
                            style = {{marginLeft: "3%",
                                      marginTop: "3%"}}
                            className={"error-message row"}>
                            * User Email is not valid!
                        </div>}
                </FormGroup>

                {/*DateOfJoining:*/}
                <Label for='DateOfJoiningField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Date of joining:&nbsp;&nbsp;&nbsp;
                        </strong>
                </Label>
                <DatePicker
                    value = { this.state.DateOfJoining }
                    onChange = { this.handleDateOfJoining }
                    name = "DateOfJoining"
                    format = {"yyyy-MM-dd"}
                    className = "dateOfJoining"
                />

                    <Row>
                        <Col sm={{size: '8', offset: 5}}>
                                <Button type={"submit"} disabled={!this.state.formIsValid}
                                        onClick={() => this.handleSubmit()}
                                        style = {{backgroundColor: '#ab1111'}}>
                                        Confirm Add User
                                </Button>
                        </Col>
                    </Row>


            </div>
        ) ;
    }
}

export default withRouter(Userpage_addUser);


