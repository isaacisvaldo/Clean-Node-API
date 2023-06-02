export class InvalidParamError extends Error {
    constructor(ParamName: string){
        super(`Invalid parameter${ParamName}`);
        this.name ='InvalidParamError'

    }
}