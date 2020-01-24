"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_fs_1 = require("@ionic/utils-fs");
const utils_network_1 = require("@ionic/utils-network");
const crypto = require("crypto");
const http = require("http");
const path = require("path");
const qs = require("querystring");
const constants_1 = require("../constants");
const open_1 = require("./open");
const REDIRECT_PORT = 8123;
const REDIRECT_HOST = 'localhost';
class OAuth2Flow {
    constructor({ authorizationUrl, tokenUrl, clientId, redirectHost = REDIRECT_HOST, redirectPort = REDIRECT_PORT }, e) {
        this.e = e;
        this.authorizationUrl = authorizationUrl;
        this.tokenUrl = tokenUrl;
        this.clientId = clientId;
        this.redirectHost = redirectHost;
        this.redirectPort = redirectPort;
    }
    get redirectUrl() {
        return `http://${this.redirectHost}:${this.redirectPort}`;
    }
    async run() {
        const verifier = this.generateVerifier();
        const challenge = this.generateChallenge(verifier);
        const authorizationParams = this.generateAuthorizationParameters(challenge);
        const authorizationUrl = `${this.authorizationUrl}?${qs.stringify(authorizationParams)}`;
        await open_1.open(authorizationUrl);
        const authorizationCode = await this.getAuthorizationCode();
        const token = await this.getAccessToken(authorizationCode, verifier);
        return token;
    }
    async getSuccessHtml() {
        const p = path.resolve(constants_1.ASSETS_DIRECTORY, 'sso', 'success', 'index.html');
        const contents = await utils_fs_1.readFile(p, { encoding: 'utf8' });
        return contents;
    }
    async getAuthorizationCode() {
        if (!(await utils_network_1.isPortAvailable(this.redirectPort))) {
            throw new Error(`Cannot start local server. Port ${this.redirectPort} is in use.`);
        }
        const successHtml = await this.getSuccessHtml();
        return new Promise((resolve, reject) => {
            const server = http.createServer((req, res) => {
                if (req.url) {
                    const params = qs.parse(req.url.substring(req.url.indexOf('?') + 1));
                    if (params.code) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(successHtml);
                        req.socket.destroy();
                        server.close();
                        resolve(Array.isArray(params.code) ? params.code[0] : params.code);
                    }
                    // TODO, timeout, error handling
                }
            });
            server.listen(this.redirectPort, this.redirectHost);
        });
    }
    async getAccessToken(authorizationCode, verifier) {
        const params = this.generateTokenParameters(authorizationCode, verifier);
        const { req } = await this.e.client.make('POST', this.tokenUrl);
        const res = await req.send(params);
        return res.body.access_token;
    }
    generateVerifier() {
        return this.base64URLEncode(crypto.randomBytes(32));
    }
    generateChallenge(verifier) {
        return this.base64URLEncode(crypto.createHash('sha256').update(verifier).digest());
    }
    base64URLEncode(buffer) {
        return buffer.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
}
exports.OAuth2Flow = OAuth2Flow;
const AUTHORIZATION_URL = 'https://auth.ionicframework.com/authorize';
const TOKEN_URL = 'https://auth.ionicframework.com/oauth/token';
const CLIENT_ID = '0kTF4wm74vppjImr11peCjQo2PIQDS3m';
const API_AUDIENCE = 'https://api.ionicjs.com';
class Auth0OAuth2Flow extends OAuth2Flow {
    constructor({ email, connection, audience = API_AUDIENCE, authorizationUrl = AUTHORIZATION_URL, tokenUrl = TOKEN_URL, clientId = CLIENT_ID, ...options }, e) {
        super({ authorizationUrl, tokenUrl, clientId, ...options }, e);
        this.e = e;
        this.email = email;
        this.connection = connection;
        this.audience = audience;
    }
    generateAuthorizationParameters(challenge) {
        return {
            audience: this.audience,
            scope: 'openid profile email offline_access',
            response_type: 'code',
            connection: this.connection,
            client_id: this.clientId,
            code_challenge: challenge,
            code_challenge_method: 'S256',
            redirect_uri: this.redirectUrl,
        };
    }
    generateTokenParameters(code, verifier) {
        return {
            grant_type: 'authorization_code',
            client_id: this.clientId,
            code_verifier: verifier,
            code,
            redirect_uri: this.redirectUrl,
        };
    }
}
exports.Auth0OAuth2Flow = Auth0OAuth2Flow;
