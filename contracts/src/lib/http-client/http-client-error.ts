export class HttpClientError extends Error {
    constructor(public status: number, public statusText: string) {
        super(`${status} ${statusText}`);
    }
}

export class NotFoundError extends HttpClientError {
    constructor() {
        super(404, 'Not Found');
    }
}

export class ServerError extends HttpClientError {
    constructor() {
        super(500, 'Internal Server Error');
    }
}

export const errors = {
    404: NotFoundError,
    500: ServerError,

} as const