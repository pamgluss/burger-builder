/*
* Take in an existing object (like the state), and an object of updated properties
* and expand both together in a new object.
*/
export const updateObject = (prevObject, nextProperties) => {
    return {
        ...prevObject,
        ...nextProperties
    }
}

export const checkValidity = (value, rules) => {
    // If there are no rules, return early
    if(!rules){
        return true;
    }
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}