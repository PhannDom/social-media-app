import { Dispatch } from "react"
import { userService } from "../../services"
import { AccountActionTypes, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "./types"
import {history} from '../../helpers'

export const login = (email: string, password: string, from: string) => {
    return (dispath: Dispatch<AccountActionTypes>) => {
        dispath({
            type: LOGIN_REQUEST,
            payload: {
                email,
                password
            }
        });
        userService.login(email, password).then((res) => {
            dispath({
                type: LOGIN_SUCCESS,
                payload: res
            });
            history.push(from)
        }, (error) => {
            dispath({
                type: LOGIN_FAILURE,
                payload: { error: error.toString() }
            })
        });
    }
}

export const logout = (): AccountActionTypes => {
    return { type: LOG_OUT }
}