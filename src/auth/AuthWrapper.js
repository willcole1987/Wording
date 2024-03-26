import { createContext, useContext, useState } from "react"
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {

     const [ user, setUser ] = useState(
          {
               name: (sessionStorage.getItem("name") ?? ""), 
               isAuthenticated: (sessionStorage.getItem("isAuthenticated") === 'true'? true : false)
          })

     const login = (userName, password) => {

          // Make a call to the authentication API to check the username
          return new Promise((resolve, reject) => {
               if (password === "password") {
                    setUser({name: userName, isAuthenticated: true})
                    sessionStorage.setItem("name",userName);
                    sessionStorage.setItem("isAuthenticated", true);
                    resolve("success")
               } else {
                    reject("Incorrect password")
               }
          })
     }
     const logout = () => {

          setUser({...user, isAuthenticated: false})
          sessionStorage.setItem("name","")
          sessionStorage.setItem("isAuthenticated",false)
     }


     return (
          
               <AuthContext.Provider value={{user, login, logout}}>
                    <>
                         <RenderHeader />
                         <RenderMenu />
                         <RenderRoutes />
                    </>
                    
               </AuthContext.Provider>
          
     )

}