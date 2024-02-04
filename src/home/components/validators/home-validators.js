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
            default: isValid = true;
        }
    }

    return isValid;
};


export default validate;