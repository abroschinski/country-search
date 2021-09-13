class ValidationResult{
    readonly isValid: boolean;
    readonly errorMessage: string;
    
    constructor(isValid: boolean, errorMessage: string = ""){
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
}

export default ValidationResult;
