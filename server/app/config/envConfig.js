// Conditional module export based on environment
if (process.env.NODE_ENV === "production") {

    // if in production, require the production configuration
    module.exports = require("./prod");

}
else {
    // otherwise, require the development configuration
    module.exports = require("./dev");
}