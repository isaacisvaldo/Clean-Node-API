import {httpRequest,httpResponse} from '../protocols/http'
import {MissingParamError} from '../errors/meassing-param-errors'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
    handle(httpRequest: httpRequest): httpResponse {
        const requiredFields =['name','email']
        for (const field of requiredFields){
            if(!httpRequest.body[field]){
                return badRequest(new MissingParamError(field))
            }  
        }
        
 
    }
}