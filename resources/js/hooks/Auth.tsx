import React from "react";
import axios from 'axios';
import { API, auth, setUserLog } from "../utils/Config";

let AuthContext = React.createContext<AuthContextType>( null! );

function AuthProvider( { children }: AuthChildren ){
    const[ user, setUser ] = React.useState<User>( auth );
    
    const login = ( user: LoginData, successResponse?: Function, errorResponse?: Function ) => {
        axios.post( `${API.url}/login`, user )
        .then( ( res ) => {
            const user = res.data;

            let userData: User = {
                ID: user.data.id,
                token: user.data.token,
                firstName: user.data.first_name,
                lastName: user.data.last_name,
                email: user.data.email,
                data: {
                    createdAt: user.data.created_at,
                    updatedAt: user.data.updated_at
                }
            } 

            setUser( userData );

            setUserLog( userData );

            if( successResponse){
                successResponse( res.data );
            }
        })
        .catch( ( error ) => {
            if(errorResponse){
                errorResponse( error.response.data );
            }
        });
    }

    const logout = ( callback:VoidFunction ) => {
        setUser({
            token: false
        });

        setUserLog( {token: false } );
    }

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth(){
    return React.useContext( AuthContext );
}
export { useAuth, AuthProvider };