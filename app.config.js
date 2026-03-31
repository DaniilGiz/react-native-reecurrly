const appJson = require('./app.json')

export default {
    expo: {
        ...appJson.expo,
        extra: {
            ...(appJson.expo?.extra || {}),
            posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
            posthogHost: process.env.POSTHOG_HOST,
            eas: {
                projectId: "2f36ef9c-be4c-44c8-9e86-38fe081376a5"
            }
        },
    },
    ios: {
        infoPlist: {
            ITSAppUsesNonExemptEncryption: false
        }
    }
}