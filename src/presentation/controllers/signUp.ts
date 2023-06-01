import {httpRequest,httpResponse} from '../protocols/http'
import {MissingParamError} from '../errors/meassing-param-errors'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
    handle(httpRequest: httpRequest): httpResponse {
        if(!httpRequest.body.name){
            return badRequest(new MissingParamError('name'))
        } else if (!httpRequest.body.email){
            return badRequest(new MissingParamError('email'))
        }
 
    }
}