import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from "../state_provider/StateProvider";


function ProtectedRoute({component: Component, ...rest}) {
    const [{ isToken }] = useStateValue();
    return (
        <Route { ...rest } render={
            (props) => {
                if(isToken) {
                    return <Component {...props}/>
                } else {
                   return <Redirect to={{
                                pathname: "/authentication",
                                state: {
                                    from: props.location
                                }
                            }}/>
                }
            }
        } />
    )
}

export default ProtectedRoute
