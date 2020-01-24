"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = require("../guards");
const color_1 = require("./color");
const errors_1 = require("./errors");
const http_1 = require("./http");
class BaseSession {
    constructor(e) {
        this.e = e;
    }
    async logout() {
        this.e.config.unset('org.id');
        this.e.config.unset('user.id');
        this.e.config.unset('user.email');
        this.e.config.unset('tokens.user');
        this.e.config.set('git.setup', false);
    }
    isLoggedIn() {
        return typeof this.e.config.get('tokens.user') === 'string';
    }
    getUser() {
        const userId = this.e.config.get('user.id');
        if (!userId) {
            throw new errors_1.SessionException(`Oops, sorry! You'll need to log in:\n    ${color_1.input('ionic login')}\n\n` +
                `You can create a new account by signing up:\n\n    ${color_1.input('ionic signup')}\n`);
        }
        return { id: userId };
    }
    getUserToken() {
        const userToken = this.e.config.get('tokens.user');
        if (!userToken) {
            throw new errors_1.SessionException(`Oops, sorry! You'll need to log in:\n    ${color_1.input('ionic login')}\n\n` +
                `You can create a new account by signing up:\n\n    ${color_1.input('ionic signup')}\n`);
        }
        return userToken;
    }
}
exports.BaseSession = BaseSession;
class ProSession extends BaseSession {
    async login(email, password) {
        const { req } = await this.e.client.make('POST', '/login');
        req.send({ email, password, source: 'cli' });
        try {
            const res = await this.e.client.do(req);
            if (!guards_1.isLoginResponse(res)) {
                const data = res.data;
                if (hasTokenAttribute(data)) {
                    data.token = '*****';
                }
                throw new errors_1.FatalException('API request was successful, but the response format was unrecognized.\n' +
                    http_1.formatResponseError(req, res.meta.status, data));
            }
            const { token, user } = res.data;
            if (this.e.config.get('user.id') !== user.id) { // User changed
                await this.logout();
            }
            this.e.config.set('user.id', user.id);
            this.e.config.set('user.email', email);
            this.e.config.set('tokens.user', token);
        }
        catch (e) {
            if (guards_1.isSuperAgentError(e) && (e.response.status === 401 || e.response.status === 403)) {
                throw new errors_1.SessionException('Incorrect email or password.');
            }
            throw e;
        }
    }
    async ssoLogin(email) {
        const { AuthClient } = await Promise.resolve().then(() => require('./auth'));
        const { Auth0OAuth2Flow } = await Promise.resolve().then(() => require('./sso'));
        const authClient = new AuthClient(this.e);
        const { uuid: connection } = await authClient.connections.load(email);
        const flow = new Auth0OAuth2Flow({ audience: this.e.config.get('urls.api'), email, connection }, this.e);
        const token = await flow.run();
        await this.tokenLogin(token);
        this.e.config.set('org.id', connection);
    }
    async tokenLogin(token) {
        const { UserClient } = await Promise.resolve().then(() => require('./user'));
        const userClient = new UserClient(token, this.e);
        try {
            const user = await userClient.loadSelf();
            const user_id = user.id;
            if (this.e.config.get('user.id') !== user_id) { // User changed
                await this.logout();
            }
            this.e.config.set('user.id', user_id);
            this.e.config.set('user.email', user.email);
            this.e.config.set('tokens.user', token);
        }
        catch (e) {
            if (guards_1.isSuperAgentError(e) && (e.response.status === 401 || e.response.status === 403)) {
                throw new errors_1.SessionException('Invalid auth token.');
            }
            throw e;
        }
    }
}
exports.ProSession = ProSession;
async function promptToLogin(env) {
    const { validators } = await Promise.resolve().then(() => require('@ionic/cli-framework'));
    env.log.msg(`Log in to your Ionic account\n` +
        `If you don't have one yet, create yours by running: ${color_1.input(`ionic signup`)}\n`);
    const email = await env.prompt({
        type: 'input',
        name: 'email',
        message: 'Email:',
        validate: v => validators.required(v) && validators.email(v),
    });
    const password = await env.prompt({
        type: 'password',
        name: 'password',
        message: 'Password:',
        mask: '*',
        validate: v => validators.required(v),
    });
    await env.session.login(email, password);
}
exports.promptToLogin = promptToLogin;
function hasTokenAttribute(r) {
    return r && typeof r === 'object' && typeof r.token === 'string';
}
