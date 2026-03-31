import { darkColors, lightColors, ThemeColors, ThemeMode } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';

const THEME_STORAGE_KEY = '@recurrly_theme_mode';

interface ThemeContextValue {
    themeMode: ThemeMode;
    colorScheme: 'light' | 'dark';
    colors: ThemeColors;
    setThemeMode: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemScheme = useColorScheme() ?? 'light';
    const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (stored === 'light' || stored === 'dark' || stored === 'system') {
                    setThemeModeState(stored);
                }
            } catch (error) {
                console.warn('Failed to load theme preference', error);
            } finally {
                setIsHydrated(true);
            }
        };

        load();
    }, []);

    const resolvedScheme: 'light' | 'dark' = useMemo(() => {
        if (themeMode === 'system') return systemScheme;
        return themeMode;
    }, [themeMode, systemScheme]);

    useEffect(() => {
        const listener = ({ colorScheme }: Appearance.AppearancePreferences) => {
            if (themeMode === 'system' && colorScheme) {
                // force update with system changes
                setThemeModeState((prev) => prev);
            }
        };

        const subscription = Appearance.addChangeListener(listener);
        return () => subscription.remove();
    }, [themeMode]);

    const setThemeMode = async (mode: ThemeMode) => {
        setThemeModeState(mode);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
        } catch (error) {
            console.warn('Failed to save theme preference', error);
        }
    };

    const colors = resolvedScheme === 'dark' ? darkColors : lightColors;

    if (!isHydrated) return null;

    return (
        <ThemeContext.Provider value={{ themeMode, colorScheme: resolvedScheme, colors: colors as ThemeColors, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
