import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from '@/lib/utils';
import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const SubscriptionCard = ({ name, price, currency, icon, billing, color,
    category, plan, renewalDate, onPress, expanded, paymentMethod, startDate, status }: SubscriptionCardProps) => {
    const { colors } = useTheme();
    const fallback = "Not provided";
    const cardBackground = expanded ? colors.subscription : (color ?? colors.card);

    return (
        <Pressable
            onPress={onPress}
            className="sub-card"
            style={{ backgroundColor: cardBackground, borderColor: colors.border }}
        >
            <View className="sub-head">
                <View className="sub-main">
                    <View className="sub-icon-wrap">
                        <Image source={icon} className="sub-icon" />
                    </View>
                    <View className="sub-copy">
                        <Text numberOfLines={1} className="sub-title" style={{ color: colors.foreground }}>
                            {name}
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" className="sub-meta" style={{ color: colors.mutedForeground }}>
                            {category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : "")}
                        </Text>
                    </View>
                </View>

                <View className="sub-price-box">
                    <Text className="sub-price" style={{ color: colors.foreground }}>{formatCurrency(price, currency)}</Text>
                    <Text className="sub-billing" style={{ color: colors.mutedForeground }}>{billing}</Text>
                </View>
            </View>

            {expanded && (
                <View className="sub-body">
                    <View className="sub-details">
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label" style={{ color: colors.mutedForeground }}>Payment:</Text>
                                <Text className="sub-value" style={{ color: colors.foreground }} numberOfLines={1} ellipsizeMode="tail">
                                    {paymentMethod?.trim() || fallback}
                                </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label" style={{ color: colors.mutedForeground }}>Category:</Text>
                                <Text className="sub-value" style={{ color: colors.foreground }} numberOfLines={1} ellipsizeMode="tail">
                                    {category?.trim() || plan?.trim() || fallback}
                                </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label" style={{ color: colors.mutedForeground }}>Started:</Text>
                                <Text className="sub-value" style={{ color: colors.foreground }} numberOfLines={1} ellipsizeMode="tail">
                                    {startDate ? formatSubscriptionDateTime(startDate) : fallback}
                                </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label" style={{ color: colors.mutedForeground }}>Renewal date:</Text>
                                <Text className="sub-value" style={{ color: colors.foreground }} numberOfLines={1} ellipsizeMode="tail">
                                    {renewalDate ? formatSubscriptionDateTime(renewalDate) : fallback}
                                </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label" style={{ color: colors.mutedForeground }}>Status:</Text>
                                <Text className="sub-value" style={{ color: colors.foreground }} numberOfLines={1} ellipsizeMode="tail">
                                    {status ? formatStatusLabel(status) : fallback}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    )
}

export default SubscriptionCard