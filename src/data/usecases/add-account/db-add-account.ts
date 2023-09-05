import { AccountModel } from "../../../domain/models/account";
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account";
import { Encrypt } from "../../protocols/encrypter";

export class DbAccount implements AddAccount {
    private readonly encrypter: Encrypt
    constructor(enrypter: Encrypt) {
        this.encrypter = enrypter;
    }
    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve(null));
    }

}