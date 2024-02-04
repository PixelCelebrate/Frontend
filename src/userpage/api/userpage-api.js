import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


//Endpoints:
const endpoint = {
    first: '/Administrator',
    second: '/Employee'
};


//PathL:
//http://localhost:5028/api/User/AddUser :


//Pentru CRUD:
//Add user:
function addUser(userToAdd, callback){

    //Inainte de request il transform in string:
    let userToAddString = 
    userToAdd.FirstName + " "
    + userToAdd.LastName + " "
    + userToAdd.UserName + " "
    + userToAdd.Password + " "
    + userToAdd.Birthday + " "
    + userToAdd.Role + " "
    + userToAdd.Email + " "
    + userToAdd.DateOfJoining;

    console.log("New string: " + userToAddString);

    let request = new Request(HOST.backend_api + "/api" + endpoint.first + "/addUser", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToAddString)
        //body: userToAddString
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

//Update user:
function updateUser(userToUpdate, callback){

    //Inainte de request il transform in string:
    let userToUpdateString = 
    userToUpdate.FirstName + " "
    + userToUpdate.LastName + " "
    + userToUpdate.UserName + " "
    + userToUpdate.Password + " "
    + userToUpdate.Birthday + " "
    + userToUpdate.Role + " "
    + userToUpdate.Email + " "
    + userToUpdate.DateOfJoining;

    let request = new Request(HOST.backend_api + "/api" + endpoint.first + "/updateUser", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToUpdateString)
        //body: userToUpdateString
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

//Delete user:
function deleteUser(userToDelete, callback){

    //Inainte de request il transform in string:
    let userToDeleteString = userToDelete.UserName;

    let request = new Request(HOST.backend_api + "/api" + endpoint.first + "/deleteUser", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToDeleteString)
        //body: userToDeleteString
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

//Select number of days:
function selectNumberOfDays(numberOfDaysObject, callback)
{
    //Inainte de request il transform in string:
    let numberOfDaysString = numberOfDaysObject.NumberOfDays;

    let request = new Request(HOST.backend_api + "/api" + endpoint.first + "/selectNumberOfDays", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(numberOfDaysString)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

//Get number of days:
function getNumberOfDays(callback) {
    let request = new Request(HOST.backend_api + "/api" + endpoint.first + "/getNumberOfDays", {
        method: 'GET',
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}



//Pentru tabel:
//Get user data: Get:
function getUserData(callback) {
    let request = new Request(HOST.backend_api + "/api" + endpoint.first + "/getUserData", {
        method: 'GET',
    });

    //Nimic trimis, no body json;

    console.log(request.url);
    //Do request:
    RestApiClient.performRequest(request, callback);
}



//Pentru employee:


//Get own data:
function getUserDataByUsername(userNameData, callback){

    let request = new Request(HOST.backend_api + "/api" + endpoint.second + "/userDataEmployee", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userNameData)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}


//Get employee username and email as data:
function getUserInfo(callback) {
    let request = new Request(HOST.backend_api + "/api" + endpoint.second + "/getUserInfo", {
        method: 'GET',
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


export {
    addUser,
    updateUser,
    deleteUser,
    getUserData,
    getUserDataByUsername,
    getUserInfo,
    selectNumberOfDays,
    getNumberOfDays,
};






