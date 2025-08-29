const defaultOptions = {
    formatFunction: (tokenPair) => JSON.stringify(tokenPair),
    contentType: "application/json",
};
export class ReiJwtSenderToBody {
    options;
    constructor(options) {
        this.options = Object.assign({}, defaultOptions, options);
    }
    send(res, pair) {
        res.setHeader("Content-Type", this.options.contentType);
        res.statusCode = 200;
        res.end(this.options.formatFunction(pair));
    }
}
