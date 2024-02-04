//Name:
const nameValidator = value => {
    const re = /^[A-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return re.test(String(value));
};

//Email:
const emailValidator = value => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

//Password:
const passwordValidator = value => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,10}$/;
    return re.test(String(value));
};

//More than 3:
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

//Is required:
const isRequiredValidator = value => {
    return value.trim() !== '';
};

//Administrator or Employee:
const roleValidator = value => {
    //Una din cele 2, sa inceapa si sa se termine cu el:
    const re = /^(Administrator|Employee)$/;
    return re.test(String(value));
};

//Number:
const numberValidator = value => {
    const re = /^(\b([1-9]|[12][0-9]|30)\b)$/;
    return re.test(String(value));
};


//Values:
const validate = (value, rules) =>
{
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'nameValidator': isValid = isValid && nameValidator(value);
                                  break;
            case 'emailValidator': isValid = isValid && emailValidator(value);
                                   break;
            case 'passwordValidator': isValid = isValid && passwordValidator(value);
                                      break;
            case 'minLengthValidator': isValid = isValid && minLengthValidator(value, rules[rule]);
                                       break;
            case 'isRequiredValidator': isValid = isValid && isRequiredValidator(value);
                                        break;
            case 'roleValidator': isValid = isValid && roleValidator(value);
                                            break;      
            case 'numberValidator': isValid = isValid && numberValidator(value);
                                              break;                           
            default: isValid = true;
        }
    }

    return isValid;
};


export default validate;