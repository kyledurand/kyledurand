const nested = require("postcss-nested");
const pxToRem = require("postcss-pxtorem");

module.exports = {
  plugins: [
    pxToRem({
      propList: ["*"],
    }),
    nested(),
  ],
};
