var Dropbox = require("dropbox").Dropbox;
const dbx = new Dropbox({
    clientId: process.env.DROPBOX_CLIENT_ID,
    clientSecret: process.env.DROPBOX_CLIENT_SECRET,
    refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
    token_access_type: 'offline',


});

export default dbx;