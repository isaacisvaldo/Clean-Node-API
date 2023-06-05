import { HttpRequest, HttpResponse,EmailValidator ,Controller,AddAccount} from './signup-protocols'
import { MissingParamError } from '../../errors/messing-param-errors'
import { InvalidParamError } from '../../errors/invalid-param-errors'
import { badRequest,serverError,ok} from '../../helpers/http-helper'


export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    constructor(emailValidator: EmailValidator, addAccount:AddAccount ) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount

    }
  async   handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password', 'password_confirmation']
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const {name,email, password, password_confirmation} = httpRequest.body
            if(password!== password_confirmation){
                return badRequest(new InvalidParamError('password_confirmation'))
            }
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            //Se todos oa dados forem validados 
            //Criar um user 
           const account= await this.addAccount.add({
                name,
                email,
                password
              })
              return ok(account)
        } catch (error) {
            
            return serverError()

        }



    }


}