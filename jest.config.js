process.env.JEST_PLAYWRIGHT_CONFIG = "./jest-playwright.config.js";

module.exports = {
  verbose: true,
  preset: "jest-playwright-preset",
  projects: [
    "<rootDir>/apps/app-mosh-lol",
    "<rootDir>/apps/app-sentrei-com",
    "<rootDir>/apps/blog-sentrei-com",
    "<rootDir>/apps/og-sentrei-com",
    "<rootDir>/apps/wiki-sentrei-com",
    "<rootDir>/apps/www-daobaord-com",
    "<rootDir>/apps/www-mosh-lol",
    "<rootDir>/apps/www-sentrei-com",
    "<rootDir>/apps/www-thisweekindaos-com",
    "<rootDir>/components/atoms",
    "<rootDir>/components/molecules",
    "<rootDir>/components/organisms",
    "<rootDir>/components/roots",
    "<rootDir>/components/screens",
  ],
};
