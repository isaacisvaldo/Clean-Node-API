import {HttpRequest,HttpResponse} from '../protocols/http'
import {MissingParamError} from '../errors/messing-param-errors'
import { InvalidParamError } from '../errors/invalid-param-errors'
import { badRequest } from '../helpers/http-helper'
import {Controller} from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
export class SignUpController  implements Controller {
    private readonly emailValidator: EmailValidator
    constructor (emailValidator: EmailValidator){
        this.emailValidator = emailValidator

    }
    handle(httpRequest: HttpRequest): HttpResponse {
     const requiredFields =['name','email','password','password_confirmation']
    for (const field of requiredFields){
        if(!httpRequest.body[field]){
            return badRequest(new MissingParamError(field))
        }  
    }  
   const isValid = this.emailValidator.isValid(httpRequest.body.email)
     if(!isValid){
        return badRequest(new InvalidParamError('email'))
     }

    }  
    
    
}