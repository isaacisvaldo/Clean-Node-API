import { HttpRequest, HttpResponse,EmailValidator ,Controller} from '../protocols'
import { MissingParamError } from '../errors/messing-param-errors'
import { InvalidParamError } from '../errors/invalid-param-errors'
import { badRequest,serverError} from '../helpers/http-helper'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator

    }
    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['name', 'email', 'password', 'password_confirmation']
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        } catch (error) {
            
            return serverError()

        }



    }


}