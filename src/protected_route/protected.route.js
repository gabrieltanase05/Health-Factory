import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";


function ProtectedRoute({component: Component, ...rest}) {
    const isToken = useSelector(state => state.isToken);
    
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
