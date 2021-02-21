import React from "react"
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component}) {

    const { currentUser } = useAuth()

    return(
        <Route
            render={props => {
                return currentUser ? <Component /> : <Redirect to="/login" />
            }}
        >
        </Route>
    )
}