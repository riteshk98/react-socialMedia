export * from './constants';

export const setIteminLocalStorage=(key, value)=>{
    if(!key || !value){
        console.error('No Token present');
    }
    const valuetoStore = typeof value !== 'string'? JSON.stringify(value) : value;
    localStorage.setItem(key,valuetoStore);
}

export const getItemFromLocalStorage=(key)=>{
    if(!key){
        console.error('No Token present');
    }
    return localStorage.getItem(key);
}
export const removeItemFromLocalStorage=(key)=>{
    if(!key){
        console.error('No Token present');
    }
    localStorage.removeItem(key);
}

export const getFormBody=(params)=>{
    let formBody =[];
    for(let property in params){
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);

        formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody.join('&');
}