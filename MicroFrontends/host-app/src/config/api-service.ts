import axios from 'axios';

export type MethodHttp = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
    delete: 'DELETE',
}

export interface InvokeOptions {
    header?: any;
    pathParams?: any;
    reqPathParam?: any;
    shouldHandleError?: boolean;
    // errorCallBack: any;
    showLoader?: boolean;
    noExpSessionHandle?: boolean;
    file?: any;
    textPlain?: boolean;
}

interface IEndPoint {
    url: string;
    method: string;
    useMock?: boolean;
    baseUrl?: string;
    loading?: boolean;
    hideNotification?: boolean
}

export const invokeWS = <T,>(endpoint: IEndPoint, requestData?: any, options?: InvokeOptions) : Promise<T>=> {
    const invokeOptions = formatOptions(options || {});

    // For real call WS
    return callWS(endpoint, requestData, invokeOptions);
};

const callWS = <T,>(endpoint: IEndPoint, requestData: any, invokeOptions?: InvokeOptions): Promise<T> => {
    return new Promise((resolve, reject) => {
        if (endpoint?.loading) {
            document.body.classList.add('loading-indicator');
        }

        const invokeParams = buildRequest(endpoint, requestData, invokeOptions || {});

        if (invokeOptions?.textPlain) {
            axios.defaults.headers.post = { 'Content-Type': 'text/plain' };
        }

        axios.request(invokeParams).then(
            (response: any) => {
                console.log('response ', response)
                document.body.classList.remove('loading-indicator');
                !endpoint?.hideNotification && showNotification(true, response);
                resolve(response.data);
            },
            (error: any) => {
                console.log('error ', error)
                document.body.classList.remove('loading-indicator');
                !endpoint?.hideNotification && showNotification(false, error?.response);
                if (error.response?.status === 401) {
                    // Redirect to login or show "Session expired" message
                    // alert('Session expired')
                    document.location.href = `${window.location.origin}/`
                    localStorage.removeItem('isLoggedIn')
                }
                reject(error);
            }
        );
    });
};

const buildRequest = (endpoint: any, requestData: any, options: InvokeOptions) => {
    return {
        method: endpoint.method,
        baseUrl: endpoint.baseUrl,
        url: import.meta.env.VITE_GW_BASIC_URL + endpoint.url + formatPathParams(options),
        data: !endpoint.method || endpoint.method !== 'GET' ? requestData : undefined,
        headers: getHeaders(),
    };
};

const formatOptions = (options: InvokeOptions): InvokeOptions => {
    return {
        header: options.header || null,
        pathParams: options.pathParams || null,
        reqPathParam: options.reqPathParam || null,
        shouldHandleError: options.shouldHandleError || true,
        showLoader: options.showLoader || false,
        noExpSessionHandle: options.noExpSessionHandle || false,
        file: options.file || null,
        textPlain: options.textPlain || false,
    };
};

const formatPathParams = (options: InvokeOptions): string => {
    console.log('options ', options);
    return '';
};

const getHeaders = () => {
    const headers: any = {};
    return headers;
};

const showNotification = (success: boolean, result: any) => {
    if (success) {
        const successMessage = result?.data
        console.log('successMessage ', successMessage);
    } else {
        const errorMessage = result?.data?.message ?? result.statusText
        console.log('errorMessage ', errorMessage);
    }
};
