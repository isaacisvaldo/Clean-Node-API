export class MissingParamError extends Error {
    constructor(ParamName: string){
        super(`Missing parameter${ParamName}`);
        this.name ='MissingParameterError'

    }
}