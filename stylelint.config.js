module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    'selector-pseudo-element-colon-notation': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'color-hex-length': null,
    'comment-empty-line-before': null,
  },
}
