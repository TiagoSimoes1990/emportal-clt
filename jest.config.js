/** @type {import('jest').Config} */
const config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom'],
    reporters: [
        'default',
        ['./node_modules/jest-html-reporter', {
            "pageTitle": "Test Report",
            "includeFailureMsg": true,
            "logo": "./src/images/Go Fleet Logo-GreenGrey.png",
            "sort": "status",
        }],
    ]
  };
module.exports = config;
