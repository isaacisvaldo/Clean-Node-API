import {SignUpController} from './signUp'

describe('signUp Controller', ()=> {
    test('Should return 400 if name is provided', ()=> {
     const sut = new SignUpController()
     const httpRequest = {
        body: {
            email:'test@example.com',
            password: 'password',
            password_confirmation: 'password'

        }
     }
     const httpResponse = sut.handle(httpRequest)
     expect(httpResponse.statusCode).toBe(400)
    })
})