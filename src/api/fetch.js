import 'isomorphic-fetch';

import { GET } from './constants.js';

export function makeRequest(path, method, data) {   
	let fetchOptions = {
        'Content-Type': 'application/json;charset=UTF-8',
        method: method,
        headers: {
            "Accept": 'application/json',
        },
        credentials: 'include'
    };

    if(method !== GET && data) {
        fetchOptions.data = data;
    }

    return fetch(`${process.env.REACT_APP_BASE_URL}${path}`, fetchOptions)
    	.then(response => {
    		if(response.status >= 200 && response.status < 300) {
    			return response.text()
    				.then(responseText => {
                        let jsonData;
                        try {
                            jsonData = JSON.parse(responseText);
                        } catch(e) {
                            console.warn(e);
                        }
    					return jsonData;
    				});
    		} else {
    			throw response;
    		}
    	});
}


