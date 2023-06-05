import { SignUpController } from './signUp'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { EmailValidator,AccountModel,AddAccount,AddAccountModel } from './signup-protocols'

describe('signUp Controller', () => {

    const makeEmailValidator = (): EmailValidator => {
        class EmailValidatorStub implements EmailValidator {
            isValid(email: string): boolean {
                return true;
            }
        }

        return new EmailValidatorStub()
    }
    const makeaddAccount = (): AddAccount => {
        class AddAccountStbu implements AddAccount {
            add(account: AddAccountModel): AccountModel {
               const fakeAccount ={
                id:'valid_id',
                name:'valid_name',
                email:'valid_email@example.com',
                password:'valid_password'
               }
               return fakeAccount
            }
        }

        return new AddAccountStbu()
    }
    interface SutTypes {
        sut: SignUpController,
        emailValidatorStb: EmailValidator,
        addAccountStub:AddAccount
    }
    const makeSut = (): SutTypes => { 
        const emailValidatorStb = makeEmailValidator()
        const  addAccountStub = makeaddAccount()
        const sut = new SignUpController(emailValidatorStb,addAccountStub)
        return {
            sut,
            emailValidatorStb,
            addAccountStub
        }
    }
    test('Should return 400 if name is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'test@example.com',
                password: 'password',
                password_confirmation: 'password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })
    test('Should return 400 if email is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                password: 'password',
                password_confirmation: 'password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if password is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'example@example.com',
                password_confirmation: 'password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
    test('Should return 400 if password  confirmation is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'example@example.com',
                password: 'password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password_confirmation'))
    })
    test('Should return 400 if password  confirmation fails', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'example@example.com',
                password: 'password',
                password_confirmation: 'invalid_password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('password_confirmation'))
    })
    test('Should return 400 if an email invalid is provided', () => {
        const { sut, emailValidatorStb } = makeSut()
        jest.spyOn(emailValidatorStb, 'isValid').mockReturnValueOnce(false)
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'example_invalid_@example.com',
                password: 'password',
                password_confirmation: 'password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
    test('Should  call EmailValidator whit correct email', () => {
        const { sut, emailValidatorStb } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStb, 'isValid')
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'example_@example.com',
                password: 'password',
                password_confirmation: 'password'

            }
        }
        sut.handle(httpRequest)
        expect(isValidSpy).toHaveBeenCalledWith('example_@example.com')
    })
    test('Should return 500 if EmailValidator throws', () => {
       
        const {sut, emailValidatorStb} = makeSut()
        jest.spyOn(emailValidatorStb,'isValid').mockImplementationOnce(()=>{
            throw new Error()
        })
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'test@example.com',
                password: 'password',
                password_confirmation: 'password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })
    test('Should return 500 if AddAccount throws', () => {
       
        const {sut, addAccountStub} = makeSut()
        jest.spyOn(addAccountStub,'add').mockImplementationOnce(()=>{
            throw new Error()
        })
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'test@example.com',
                password: 'password',
                password_confirmation: 'password'

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })
    test('Should  call Account with correct values', () => {
        const { sut, addAccountStub } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        const httpRequest = {
            body: {
                name: 'Isaac Isvaldo',
                email: 'example_@example.com',
                password: 'password',
                password_confirmation: 'password'

            }
        }
        sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'Isaac Isvaldo',
            email: 'example_@example.com',
            password: 'password',
            
        })
    })

})