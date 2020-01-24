"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const lodash = require("lodash");
const util = require("util");
const guards_1 = require("../guards");
const color_1 = require("./color");
const errors_1 = require("./errors");
const http_1 = require("./utils/http");
const FORMAT_ERROR_BODY_MAX_LENGTH = 1000;
exports.CONTENT_TYPE_JSON = 'application/json';
exports.ERROR_UNKNOWN_CONTENT_TYPE = 'UNKNOWN_CONTENT_TYPE';
exports.ERROR_UNKNOWN_RESPONSE_FORMAT = 'UNKNOWN_RESPONSE_FORMAT';
class Client {
    constructor(config) {
        this.config = config;
    }
    async make(method, path) {
        const url = path.startsWith('http://') || path.startsWith('https://') ? path : `${this.config.getAPIUrl()}${path}`;
        const { req } = await http_1.createRequest(method, url, this.config.getHTTPConfig());
        req
            .set('Content-Type', exports.CONTENT_TYPE_JSON)
            .set('Accept', exports.CONTENT_TYPE_JSON);
        return { req };
    }
    async do(req) {
        const res = await req;
        const r = transformAPIResponse(res);
        if (guards_1.isAPIResponseError(r)) {
            throw new errors_1.FatalException('API request was successful, but the response output format was that of an error.\n' +
                formatAPIResponse(req, r));
        }
        return r;
    }
    paginate(args) {
        return new Paginator({ client: this, ...args });
    }
}
exports.Client = Client;
class Paginator {
    constructor({ client, reqgen, guard, state, max }) {
        const defaultState = { page: 1, done: false, loaded: 0 };
        this.client = client;
        this.reqgen = reqgen;
        this.guard = guard;
        this.max = max;
        if (!state) {
            state = { page_size: 100, ...defaultState };
        }
        this.state = lodash.assign({}, state, defaultState);
    }
    next() {
        if (this.state.done) {
            return { done: true }; // TODO: why can't I exclude value?
        }
        return {
            done: false,
            value: (async () => {
                const { req } = await this.reqgen();
                req.query(lodash.pick(this.state, ['page', 'page_size']));
                const res = await this.client.do(req);
                if (!this.guard(res)) {
                    throw createFatalAPIFormat(req, res);
                }
                this.state.loaded += res.data.length;
                if (res.data.length === 0 || // no resources in this page, we're done
                    (typeof this.max === 'number' && this.state.loaded >= this.max) || // met or exceeded maximum requested
                    (typeof this.state.page_size === 'number' && res.data.length < this.state.page_size) // number of resources less than page size, so nothing on next page
                ) {
                    this.state.done = true;
                }
                this.state.page++;
                return res;
            })(),
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
exports.Paginator = Paginator;
class TokenPaginator {
    constructor({ client, reqgen, guard, state, max }) {
        const defaultState = { done: false, loaded: 0 };
        this.client = client;
        this.reqgen = reqgen;
        this.guard = guard;
        this.max = max;
        if (!state) {
            state = { ...defaultState };
        }
        this.state = lodash.assign({}, state, defaultState);
    }
    next() {
        if (this.state.done) {
            return { done: true }; // TODO: why can't I exclude value?
        }
        return {
            done: false,
            value: (async () => {
                const { req } = await this.reqgen();
                if (this.state.page_token) {
                    req.query({ page_token: this.state.page_token });
                }
                const res = await this.client.do(req);
                if (!this.isPageTokenResponseMeta(res.meta)) {
                    throw createFatalAPIFormat(req, res);
                }
                const nextPageToken = res.meta.next_page_token;
                if (!this.guard(res)) {
                    throw createFatalAPIFormat(req, res);
                }
                this.state.loaded += res.data.length;
                if (res.data.length === 0 || // no resources in this page, we're done
                    (typeof this.max === 'number' && this.state.loaded >= this.max) || // met or exceeded maximum requested
                    !nextPageToken // no next page token, must be done
                ) {
                    this.state.done = true;
                }
                this.state.page_token = nextPageToken;
                return res;
            })(),
        };
    }
    isPageTokenResponseMeta(meta) {
        return meta
            && (!meta.prev_page_token || typeof meta.prev_page_token === 'string')
            && (!meta.next_page_token || typeof meta.next_page_token === 'string');
    }
    [Symbol.iterator]() {
        return this;
    }
}
exports.TokenPaginator = TokenPaginator;
class ResourceClient {
    applyModifiers(req, modifiers) {
        if (!modifiers) {
            return;
        }
        if (modifiers.fields) {
            req.query({ fields: modifiers.fields });
        }
    }
    applyAuthentication(req, token) {
        req.set('Authorization', `Bearer ${token}`);
    }
}
exports.ResourceClient = ResourceClient;
function transformAPIResponse(r) {
    if (r.status === 204) {
        r.body = { meta: { status: 204, version: '', request_id: '' } };
    }
    if (r.status !== 204 && r.type !== exports.CONTENT_TYPE_JSON) {
        throw exports.ERROR_UNKNOWN_CONTENT_TYPE;
    }
    const j = r.body;
    if (!j.meta) {
        throw exports.ERROR_UNKNOWN_RESPONSE_FORMAT;
    }
    return j;
}
exports.transformAPIResponse = transformAPIResponse;
function createFatalAPIFormat(req, res) {
    return new errors_1.FatalException('API request was successful, but the response format was unrecognized.\n' +
        formatAPIResponse(req, res));
}
exports.createFatalAPIFormat = createFatalAPIFormat;
function formatSuperAgentError(e) {
    const res = e.response;
    const req = res.request;
    const statusCode = e.response.status;
    let f = '';
    try {
        const r = transformAPIResponse(res);
        f += formatAPIResponse(req, r);
    }
    catch (e) {
        f += (`HTTP Error ${statusCode}: ${req.method.toUpperCase()} ${req.url}\n` +
            '\n' + (res.text ? res.text.substring(0, FORMAT_ERROR_BODY_MAX_LENGTH) : '<no buffered body>'));
        if (res.text && res.text.length > FORMAT_ERROR_BODY_MAX_LENGTH) {
            f += ` ...\n\n[ truncated ${res.text.length - FORMAT_ERROR_BODY_MAX_LENGTH} characters ]`;
        }
    }
    return color_1.failure(color_1.strong(f));
}
exports.formatSuperAgentError = formatSuperAgentError;
function formatAPIResponse(req, r) {
    return formatResponseError(req, r.meta.status, guards_1.isAPIResponseSuccess(r) ? r.data : r.error);
}
function formatResponseError(req, status, body) {
    return color_1.failure(`Request: ${req.method} ${req.url}\n` +
        (status ? `Response: ${status}\n` : '') +
        (body ? `Body: \n${util.inspect(body, { colors: chalk_1.default.enabled })}` : ''));
}
exports.formatResponseError = formatResponseError;
