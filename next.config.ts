import type { NextConfig } from "next";


//nextConfig is a variable that holds the object that contains the configuration for the Next.js app.
//This obejct contains key value pairs that are used to configure the Next.js app.
//The key is the name of the configuration and the value is the value of the configuration.
//Here key-value are : webpack : (config)=>{}
//config is an object that contains different configuration for the Next.js app.
//One is config.resolve.alias that contains the alias for the Next.js app.

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),  // basically spreads the config.resolve.alias object and adds the new alias to it.
      "@lib": require("path").resolve(__dirname, "lib"), // Now you can use: import x from "@lib/..."
      "@components": require("path").resolve(__dirname, "components"), // Now you can use: import x from "@components/..."
    };
    return config;  //always return the modified config object.
},
};

export default nextConfig;
