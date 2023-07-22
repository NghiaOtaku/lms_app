const getApiLinkByEnv = (localUrl, deployUrl) => {
    if (process.env.NODE_ENV === 'production') {
        return localUrl;
    }
    return localUrl;
};

export const API_ENDPOINT = getApiLinkByEnv(process.env.REACT_APP_DOMAIN + 'api/');
export const DOMAIN = getApiLinkByEnv(process.env.REACT_APP_DOMAIN);
