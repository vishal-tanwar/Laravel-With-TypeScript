const storage: Storage = localStorage;
const user = getUserLog();
let auth:User = {
    token: false,
}
auth = Object.assign( auth, user );

const API = {
    url: 'http://localhost:8000/api/v1',
    baseURL: 'http://localhost:8000/'
}


export function setUserLog( data:User):void {
    sessionStorage.setItem('user', JSON.stringify( data ) );
}

export function getUserLog():User {
    let data:string | null =  sessionStorage.getItem('user' );

    if( data && JSON.parse( data )){
        return JSON.parse( data );
    }
    return auth;
}
export { storage, auth, API };
