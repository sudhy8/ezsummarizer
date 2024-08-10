var Dropbox = require("dropbox").Dropbox;
const dbx = new Dropbox({
    // clientId: process.env.DROPBOX_CLIENT_ID,
    // clientSecret: process.env.DROPBOX_CLIENT_SECRET,
    // refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
    // token_access_type: 'offline',

    clientId: 'ons7bx7cm7zkdzz',
    clientSecret: 'qajyb859d3gcl7u',
    refreshToken: 'ifogVAS3OjEAAAAAAAAAAbDWRAWX0kiwszEjK9OzlQIg5LVDanjB5Jqx7Ig13e9W',
});

export default dbx;