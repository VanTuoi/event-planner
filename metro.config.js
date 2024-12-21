/* eslint-disable @typescript-eslint/no-require-imports */
const { resolve } = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    "~": resolve(__dirname, "./src")
};

module.exports = config;
