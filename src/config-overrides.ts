// @ts-ignore
const { override } = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');

/* config-overrides.ts */
module.exports = override(addReactRefresh({ disableRefreshCheck: true }));