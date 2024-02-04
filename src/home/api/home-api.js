import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


//Endpoints:
const endpoint = {
    default: '/Home'
};


//User login:
//http://localhost:5028/api/Home/AddUser :
function userLogin(homeUserLogin, callback){
    let request = new Request(HOST.backend_api + "/api" + endpoint.default + "/loginUserData", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        //Trimis la backend: String sau Object:
        body: JSON.stringify(homeUserLogin)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    //Si pentru cookie:
    userLogin,
};






