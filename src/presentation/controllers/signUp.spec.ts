import { SignUpController } from './signUp'
import { MissingParamError } from '../errors/messing-param-errors'

describe('signUp Controller', () => {
    const makeSut = (): SignUpController => {
        return new SignUpController

    }
    test('Should return 400 if name is provided', () => {
        const sut = makeSut()
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
        const sut = makeSut()
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
        const sut = makeSut()
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
        const sut = makeSut()
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

})