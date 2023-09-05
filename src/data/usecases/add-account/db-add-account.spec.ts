import { Encrypter } from "../../protocols/encrypter"
import { DbAccount } from "./db-add-account"
interface SutTypes {
    sut: DbAccount,
    encrypterStub: Encrypter
}
const makEncrypter = (): Encrypter => {
    class EncrypterStub {
        async encrypt(values: string): Promise<string> {
            return new Promise(resolve => ('hashed_password'))
        }
    }
    return new EncrypterStub()
}
const makeSut = (): SutTypes => {

    const encrypterStub = makEncrypter()
    const sut = new DbAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}
describe('DbAccount usecases', () => {
    test('should call Encrypt with correct  password', async () => {
        const { sut, encrypterStub } = makeSut()
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