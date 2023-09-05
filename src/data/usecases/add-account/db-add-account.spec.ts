import { resolve } from "node:path/win32"
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
    })
    test('should throw if Encrypt throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        const promise = sut.add(accountData)
        await expect(promise).rejects.toThrow()
    })

})