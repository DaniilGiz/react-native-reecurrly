import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';

const posthogProjectToken: string = Constants.expoConfig?.extra?.posthogProjectToken ?? '';
const posthogHost: string = Constants.expoConfig?.extra?.posthogHost ?? '';

export const posthog = new PostHog(posthogProjectToken, {
    host: posthogHost,
});
