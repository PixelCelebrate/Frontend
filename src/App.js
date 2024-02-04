import './App.css';
import React, {createContext, useEffect, useRef, useState} from 'react'
import NavigationBar from './navigation-bar'
import HomeContainer from './home/home-container'
import UserPageContainer from './userpage/userpage-container'
import ErrorPage from './commons/errorhandling/error-page';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export const AppContext = React.createContext(true);


function App() {

    //Stocare:
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEmployee, setIsEmployee] = useState(true);
    const [employeeUsername, setEmployeeUsername] = useState("Username");

    //Luat pentru folosit:
    useEffect(() => {
        //Repunerea datelor:
        //User:
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
        setIsEmployee(localStorage.getItem("isEmployee"));
        setEmployeeUsername(localStorage.getItem("employeeUsername"));
    })


  return (
      <AppContext.Provider value = {{
          isLoggedIn, setIsLoggedIn, 
          isEmployee, setIsEmployee, 
          employeeUsername, setEmployeeUsername,
      }}>
          <div className="App">

              <Router>
                  <div>
                      <Switch>
                          <Route
                              exact
                              path='/'
                              render={() =>
                                  <div>
                                      <NavigationBar/>
                                      <HomeContainer/>
                                  </div>
                              }/>
                              
                          {/*/!*Despre noi:  *!/*/}
                          <Route
                              exact
                              path='/userpage'
                              render={() =>
                                  <div>
                                      <NavigationBar/>
                                      <UserPageContainer/>
                                  </div>
                              }/>

                          {/*Error Page:  */}
                          <Route
                              exact
                              path='/error'
                              render={() => <ErrorPage/>}
                          />
                          <Route render={() =><ErrorPage/>} />
                      </Switch>
                  </div>
              </Router>
          </div>
      </AppContext.Provider>
  );
}

export default App;