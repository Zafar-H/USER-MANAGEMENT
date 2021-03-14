import { AbstractControl, ValidationErrors } from '@angular/forms';

//Specifying the custom validations for form fields
export class FormFieldValidators {
    //Specifying the Validation to check whethe the value contains only alphabets
    static shouldBeAlphabet(control: AbstractControl) : ValidationErrors | null {
        var fieldValue = (control.value as string);
        var regularExpression = (/^[a-z]+$/i);

        if(!fieldValue.match(regularExpression))
            return { shouldBeAlphabet : true };

        return null;
    }

    //Specifying the validation to check whether value contains only number
    static shouldBeNumber(control: AbstractControl) : ValidationErrors | null {
        var fieldValue = (control.value as string);
        var spaceDelimeter = " ";
        var regularExpression = (/^[0-9]+$/i);
        if(!fieldValue.match(regularExpression))
            return { shouldBeNumber : true };

        return null;

    }

    //Specifying the validation to check whether value contains space
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        var fieldValue = (control.value as string);
        var spaceDelimeter = " ";
        if(fieldValue.indexOf(spaceDelimeter) >= 0)
            return { cannotContainSpace : true };

        return null;

    }

    //Specifying the validation to check format of email
    static ShouldBeMailFormat(control: AbstractControl) : ValidationErrors | null {
        var fieldValue = (control.value as string);
        var regularExpression = (/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
        if(!fieldValue.match(regularExpression))
            return { ShouldBeMailFormat : true };

        return null;

    }
}