import {httpRequest,httpResponse} from '../protocols/http'
import {MissingParamError} from '../errors/meassing-param-errors'
export class SignUpController {
    handle(httpRequest: httpRequest): httpResponse {
        if(!httpRequest.body.name){
            return {
                statusCode:400,
                body:new MissingParamError('name')
               }
        } else if (!httpRequest.body.email){
            return {
                statusCode:400,
                body:new MissingParamError('email')
               }
        }
 
    }
}