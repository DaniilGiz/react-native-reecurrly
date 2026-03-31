export const lightColors = {
    background: "#fff9e3",
    foreground: "#081126",
    card: "#fff8e7",
    muted: "#f6eecf",
    mutedForeground: "rgba(0, 0, 0, 0.6)",
    primary: "#081126",
    accent: "#ea7a53",
    border: "rgba(0, 0, 0, 0.1)",
    success: "#16a34a",
    destructive: "#dc2626",
    subscription: "#8fd1bd",
} as const;

export const darkColors = {
    background: "#0b1220",
    foreground: "#e5eaf6",
    card: "#14203b",
    muted: "#1d2b47",
    mutedForeground: "rgba(255, 255, 255, 0.7)",
    primary: "#f0f7ff",
    accent: "#5db9fa",
    border: "rgba(255, 255, 255, 0.15)",
    success: "#65d583",
    destructive: "#fb6e6e",
    subscription: "#4a9fb3",
} as const;

export const colors = lightColors;

export type ThemeColors = typeof lightColors;
export type ThemeMode = 'system' | 'light' | 'dark';

export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    18: 72,
    20: 80,
    24: 96,
    30: 120,
} as const;

export const components = {
    tabBar: {
        height: spacing[18],
        horizontalInset: spacing[5],
        radius: spacing[8],
        iconFrame: spacing[12],
        itemPaddingVertical: spacing[2],
    },
} as const;

export const theme = {
    colors,
    spacing,
    components,
} as const;