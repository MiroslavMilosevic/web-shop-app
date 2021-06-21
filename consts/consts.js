const CONSTS =
{

    PORT: 3000 || process.env.PORT,
    START_MESSAGE: `server started at port:`,
    DB_URI: `mongodb+srv://user1:12345@mycluster.dc55z.mongodb.net/web-shop-app?retryWrites=true&w=majority`,
    SECRET: `mikele mikele`,
    JWT_EXPIRES: 90,

}


module.exports = CONSTS;