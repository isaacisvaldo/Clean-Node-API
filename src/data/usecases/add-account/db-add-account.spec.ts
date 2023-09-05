import { DbAccount } from "./db-add-account"

describe('DbAccount usecases', () => {
    test('should call Encrypt with correct  password', async() => {
        class EncrypterStub {
            async encrypt(values: string): Promise<string> {
                return new Promise(resolve => ('hashed_password'))
            }
        }
        const encrypterStub = new EncrypterStub()
        const sut = new DbAccount(encrypterStub)
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
         sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    }, 10000)

})