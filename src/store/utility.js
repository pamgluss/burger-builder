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