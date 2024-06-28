import Cookies from 'js-cookie';

export const getAuthHeader = () => {
    let token = Cookies.get('token');
    if (token) {
        token = token.replace(/"/g, '');
    }
    return {
        Authorization: `Bearer ${token || ''}`
    };
};