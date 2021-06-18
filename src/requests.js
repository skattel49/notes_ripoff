const base_url = 'http://localhost:2000';

const options = () => {
    return {
        credentials: 'include',
        headers: {
            Authorization: `Berarer ${localStorage.getItem('token')}`,
        }
    }
}

export const Get = (relativeUrl, query)=>{
    const opt = options();
    opt.method = 'get';
    return fetch(base_url+relativeUrl+'?'+query, opt);
}

export const Post = (relativeUrl, body)=> {
    const opt = options();
    opt.method = 'post';
    opt.body = JSON.stringify(body);
    opt.headers['Content-type'] = 'application/json';
    return fetch(base_url+relativeUrl, opt);
}

export const Patch = (relativeUrl, body)=>{
    const opt = options();
    opt.method = 'patch';
    opt.body = JSON.stringify(body);
    opt.headers['Content-type'] = 'application/json';

    return fetch(base_url+relativeUrl, opt);
}

export const Delete = (relativeUrl, body)=>{
    const opt = options();
    
    opt.method = 'delete';
    opt.body = JSON.stringify(body);
    opt.headers['Content-type'] = 'application/json';

    return fetch(base_url+relativeUrl, opt);
}

