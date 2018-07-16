declare module 'putClientProxyModel' {
    export interface PathParameters {
        tenantId: string;
    }

    export interface QueryStringParameters {       
    }

    export interface EventHeader {
        tenantId: string;
        aggregateId: string;
        type: string;
        correlationId: string;
        client: Client;
    }

    export interface Client {
        id: string;
        name: string;
        type: string;
        mobile: string;
        email: string;
    }

    export interface Identity {
        cognitoIdentityPoolId?: any;
        accountId: string;
        cognitoIdentityId?: any;
        caller: string;
        apiKey: string;
        sourceIp: string;
        accessKey: string;
        cognitoAuthenticationType?: any;
        cognitoAuthenticationProvider?: any;
        userArn: string;
        userAgent: string;
        user: string;
    }

    export interface RequestContext {
        accountId: string;
        resourceId: string;
        stage: string;
        requestId: string;
        identity: Identity;
        resourcePath: string;
        httpMethod: string;
        apiId: string;
    }

    export interface Event {
        resource: string;
        path: string;
        httpMethod: string;
        headers?: any;
        queryStringParameters?: QueryStringParameters;
        pathParameters: PathParameters;
        stageVariables?: any;
        requestContext: RequestContext;
        body: string;
        isBase64Encoded: boolean;
    }

    interface Callback { (error?: string, result?: any): void }
}