import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { withRouter } from "react-router-dom";
import validate from "./validators/userpage-validators";
import * as API_USERPAGE_DELETEUSER from "../api/userpage-api";
import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";


//Form:
class Userpage_deleteUser extends React.Component
{
    //Constructor:
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.deleteUser = this.deleteUser.bind(this);

        //State:
        this.state = {
            formIsValid: false,
            formControls: {

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
            },
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

    handleSubmit()
    {
        let userToDelete = {
            UserName: this.state.formControls.UserName.value,
        };

        console.log(userToDelete);

        this.deleteUser(userToDelete);
    }

    //Delete User:
    deleteUser(userToDelete) {
        return API_USERPAGE_DELETEUSER.deleteUser(userToDelete, (result, status) => {

            if (result !== null && (status === 200 || status === 201) 
               && result !== "Cannot find user by the username. Try a different username.")
            {
                this.reloadHandler();

                //console.log("Username: " + result.UserName + "!");

                window.alert("The user was deleted!");
            }
            else {
                window.alert("Invalid credentials!");
            }
        });
    }

    render() {
        return (
            <div>
            
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

                <Row>
                        <Col sm={{size: '8', offset: 5}}>
                                <Button type={"submit"} disabled={!this.state.formIsValid}
                                        onClick={() => this.handleSubmit()}
                                        style = {{backgroundColor: '#ab1111'}}>
                                        Confirm Delete User
                                </Button>
                        </Col>
                </Row>

            </div>
        ) ;
    }
}

export default withRouter(Userpage_deleteUser);


