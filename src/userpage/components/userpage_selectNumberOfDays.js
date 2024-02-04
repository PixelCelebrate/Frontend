import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { withRouter } from "react-router-dom";
import validate from "./validators/userpage-validators";
import * as API_USERPAGE_SELECTDAYS from "../api/userpage-api";


//Form:
class Userpage_selectNumberOfDays extends React.Component
{
    //Constructor:
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.getNumberOfDays = this.getNumberOfDays.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.selectNumberOfDays = this.selectNumberOfDays.bind(this);

        //State:
        this.state = {
            formIsValid: false,
            OldNumberOfDays: "",
            formControls: {
                NumberOfDays: {
                    value: '',
                    placeholder: 'Insert number of days. (from 1 to 30)',
                    valid: false,
                    touched: false,
                    validationRules: {
                        // minLength: 3,
                        // numberValidator: true,
                        //CONTEAZA ORDINEA:
                        isRequired: true,
                        numberValidator: true
                    }
                },
            },
        };

        //No apel:
        //Fara reload:
        this.getNumberOfDays();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount()
    // {
    //     this.getNumberOfDays();
    // }

    //Toggle:
    toggleForm() {
        // this.getNumberOfDays();
        this.setState({collapseForm: !this.state.collapseForm});
        // this.getNumberOfDays();
    }

    //Verificari pentru change:
    handleChange = event => {
        
        //Rescrii de fiecare data: Ca altfel face doar la inceput 1 data:
        // this.getNumberOfDays();
        this.getNumberOfDays();

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
        let numberOfDaysObject = {
            NumberOfDays: this.state.formControls.NumberOfDays.value,
        };

        console.log(numberOfDaysObject);

        this.selectNumberOfDays(numberOfDaysObject);
    }

    //Select Number Of Days:
    selectNumberOfDays(numberOfDaysObject) {
        return API_USERPAGE_SELECTDAYS.selectNumberOfDays(numberOfDaysObject, (result, status) => {

            if (result !== null && (status === 200 || status === 201) 
            //    && result !== ""
            )
            {
                this.reloadHandler();

                //console.log("Username: " + result.UserName + "!");

                window.alert("New number of days was set!");
            }
            else {
                window.alert("Invalid number selected!");
            }
        });
    }

    //Get Number Of Days:
    getNumberOfDays() {
        return API_USERPAGE_SELECTDAYS.getNumberOfDays((result, status) => {

            if (result !== null && (status === 200 || status === 201))
            {
                // this.reloadHandler();

                console.log("Old date: " + result + " .");

                //Fara obiect, doar result direct:
                // this.state.OldNumberOfDays = result;
                this.setState({
                    OldNumberOfDays: result,
                })
                // this.setState({collapseForm: !this.state.collapseForm});
                // window.alert("New number of days was set!");
            }
            else {
                window.alert("Please add a new number first!");
            }
        });
    }


    render() {
        //Infinit:
        // this.getNumberOfDays();

        return (
            <div>

                {/*Get NumberOfDays:*/}
                <FormGroup id='GetNumberOfDays'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='GetNumberOfDaysField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Current Number Of Days:
                        </strong>
                    </Label>
                    <Input name='GetNumberOfDays' id='GetNumberOfDaysField'
                           defaultValue={this.state.OldNumberOfDays}
                           readOnly
                    />
                </FormGroup>
            

                {/*NumberOfDays:*/}
                <FormGroup id='NumberOfDays'
                           style = {{backgroundColor: "#ecca67",
                                    padding: "2%",
                                    borderRadius: "1.5%"}}
                >
                    <Label for='NumberOfDaysField'
                           style = {{fontStyle: "italic", fontSize: "large"}}>
                        <strong>
                            Number Of Days:
                        </strong>
                    </Label>
                    <Input name='NumberOfDays' id='NumberOfDaysField'
                           placeholder={this.state.formControls.NumberOfDays.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.NumberOfDays.value}
                           touched={this.state.formControls.NumberOfDays.touched? 1 : 0}
                           valid={this.state.formControls.NumberOfDays.valid}
                           //required
                    />
                    {this.state.formControls.NumberOfDays.touched && !this.state.formControls.NumberOfDays.valid &&
                        <div
                            style = {{marginLeft: "3%",
                                      marginTop: "3%"}}
                            className={"error-message row"}>
                            * New number of days is not valid!
                        </div>}
                </FormGroup>

                <Row>
                        <Col sm={{size: '8', offset: 5}}>
                                <Button type={"submit"} disabled={!this.state.formIsValid}
                                        onClick={() => this.handleSubmit()}
                                        style = {{backgroundColor: '#ab1111'}}>
                                        {/* Confirm New Number Of Days */}
                                        Confirm New Number
                                </Button>
                        </Col>
                </Row>

            </div>
        ) ;
    }
}

export default withRouter(Userpage_selectNumberOfDays);


