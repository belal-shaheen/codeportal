module.exports = {
  images: {
    //https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_1440/https://ubuntu.com/wp-content/uploads/b04f/flutterinstallerprotos.jpg
    domains: ["res.cloudinary.com"],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};
