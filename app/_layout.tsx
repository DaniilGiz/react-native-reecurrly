import '@/global.css';
import { posthog } from '@/src/config/posthog';
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useGlobalSearchParams, usePathname } from "expo-router";
import { useEffect } from 'react';
import { PostHogProvider } from 'posthog-react-native';

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error('Add your Clerk Publishable Key to the .env file');
}

function ScreenTracker() {
    const pathname = usePathname();
    const params = useGlobalSearchParams();

    useEffect(() => {
        posthog.screen(pathname, params as Record<string, string>);
    }, [pathname, params]);

    return null;
}

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
        'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf')
    })

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null;

    return (
        <PostHogProvider client={posthog}>
            <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
                <ScreenTracker />
                <Stack screenOptions={{ headerShown: false }} />
            </ClerkProvider>
        </PostHogProvider>
    );
}
