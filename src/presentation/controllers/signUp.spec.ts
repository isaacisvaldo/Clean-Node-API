import { SignUpController } from './signUp'
import { MissingParamError } from '../errors/messing-param-errors'
import { InvalidParamError } from '../errors/invalid-param-errors'
import { EmailValidator } from '../protocols/email-validator'
describe('signUp Controller', () => {
    interface SutTypes{
        sut:SignUpController,
        emailValidatorStb:EmailValidator
    }
    const makeSut = (): SutTypes => {
        class EmailValidatorStub  implements EmailValidator{
            isValid(email: string): boolean {
                return true;
            }
        }

        const emailValidatorStb = new EmailValidatorStub()
        const sut = new SignUpController(emailValidatorStb)
        return {
            sut,
            emailValidatorStb
        }
    }
    test('Should return 400 if name is provided', () => {
        const {sut} = makeSut()
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
        const {sut} = makeSut()
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
        const {sut} = makeSut()
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
        const {sut} = makeSut()
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
    test('Should return 400 if an email invalid is provided', () => {
        const {sut,emailValidatorStb} = makeSut()
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
        const {sut,emailValidatorStb} = makeSut()
     const isValidSpy =   jest.spyOn(emailValidatorStb, 'isValid')
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

})