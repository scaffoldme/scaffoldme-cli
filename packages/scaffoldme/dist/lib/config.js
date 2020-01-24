"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_framework_1 = require("@ionic/cli-framework");
const os = require("os");
const path = require("path");
exports.GLOBAL_OPTIONS = [
    {
        name: 'help',
        summary: 'Display help for commands',
        aliases: ['h'],
        type: Boolean,
        groups: ["hidden" /* HIDDEN */],
    },
    {
        name: 'verbose',
        summary: 'Print debug log messages',
        type: Boolean,
    },
    {
        name: 'quiet',
        summary: 'Only print warning and error log messages',
        type: Boolean,
    },
    {
        name: 'interactive',
        summary: 'Disable interactivity such as progress indicators and prompts',
        type: Boolean,
        default: true,
    },
    {
        name: 'color',
        summary: 'Disable colors in stdout',
        type: Boolean,
        default: true,
    },
    {
        name: 'confirm',
        summary: 'Automatically answer YES to confirmation prompts',
        type: Boolean,
    },
    {
        name: 'project',
        summary: 'The project ID to use in a multi-app configuration setup',
        groups: ["hidden" /* HIDDEN */],
    },
    {
        name: 'json',
        summary: 'Use JSON when operating with stdout, if possible',
        type: Boolean,
        groups: ["hidden" /* HIDDEN */],
    },
];
exports.CONFIG_FILE = 'config.json';
exports.DEFAULT_CONFIG_DIRECTORY = path.resolve(os.homedir(), '.ionic');
class Config extends cli_framework_1.BaseConfig {
    constructor(p, options) {
        super(p, options);
        const c = this.c;
        // <4.0.0 config migration
        if (c.state) {
            // start fresh
            this.c = {
                'version': '4.0.0',
                'telemetry': c.telemetry,
                'npmClient': c.npmClient,
                'interactive': c.interactive,
                'user.id': c.user && c.user.id,
                'user.email': c.user && c.user.email,
                'git.setup': c.git && c.git.setup,
                'tokens.user': c.tokens && c.tokens.user,
                'tokens.telemetry': c.tokens && c.tokens.telemetry,
                'features.ssl-commands': c.features && c.features['ssl-commands'],
            };
        }
    }
    provideDefaults(config) {
        return {
            'version': '4.0.0',
            'telemetry': true,
            'npmClient': 'npm',
        };
    }
    getAPIUrl() {
        return this.get('urls.api', 'https://api.ionicjs.com');
    }
    getDashUrl() {
        return this.get('urls.dash', 'https://dashboard.ionicframework.com');
    }
    getGitHost() {
        return this.get('git.host', 'git.ionicjs.com');
    }
    getGitPort() {
        return this.get('git.port', 22);
    }
    getHTTPConfig() {
        const { c } = this;
        return {
            ssl: {
                cafile: c['ssl.cafile'],
                certfile: c['ssl.certfile'],
                keyfile: c['ssl.keyfile'],
            },
            proxy: c['proxy'],
        };
    }
}
exports.Config = Config;
function parseGlobalOptions(pargv) {
    return cli_framework_1.parseArgs(pargv, cli_framework_1.metadataOptionsToParseArgsOptions(exports.GLOBAL_OPTIONS));
}
exports.parseGlobalOptions = parseGlobalOptions;
