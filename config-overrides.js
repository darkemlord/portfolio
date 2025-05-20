module.exports = function override(config) {
  config.module.rules.push({
    test: /\.m?js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: /@mediapipe\/tasks-vision/
  });
  return config;
}; 