import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

function ProtectedRoute({isToken, component: Component, ...rest}) {

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

// Redux middleware
const mapStateToProps = (state) => {
    return {
      isToken: state.authentication.isToken
    }
  }

  
export default connect(mapStateToProps)(ProtectedRoute)
