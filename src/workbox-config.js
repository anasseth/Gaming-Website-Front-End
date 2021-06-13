module.exports = {
  globDirectory: "dist/game-ui/",
  globPatterns: [
    "**/*.{css,eot,html,ico,jpg,js,json,png,svg,ttf,txt,webmanifest,woff,woff2,webm,xml}",
  ],
  globFollow: true,
  globStrict: true,
  globIgnores: [
    "**/*-es5.*.js",
    "3rdpartylicenses.txt",
    "assets/images/icons/icon-*.png",
  ],
  dontCacheBustURLsMatching: new RegExp(".+.[a-f0-9]{20}..+"),
  maximumFileSizeToCacheInBytes: 5000000,
  swSrc: "dist/game-ui/service-worker.js",
  swDest: "dist/game-ui/service-worker.js",
};
