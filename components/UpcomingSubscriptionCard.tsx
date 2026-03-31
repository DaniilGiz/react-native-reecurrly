import { formatCurrency } from "@/lib/utils";
import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';
import { Image, Text, View } from 'react-native';

const UpcomingSubscriptionCard = ({ name, price, daysLeft, icon, currency }: UpcomingSubscription) => {
    const { colors } = useTheme();

    return (
        <View className="upcoming-card" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <View className="upcoming-row">
                <View className="upcoming-icon-wrap">
                    <Image source={icon} className="upcoming-icon" />
                </View>
                <View>
                    <Text className="upcoming-price" style={{ color: colors.foreground }}>{formatCurrency(price, currency)}</Text>
                    <Text className="upcoming-meta" style={{ color: colors.mutedForeground }} numberOfLines={1}>
                        {daysLeft > 1 ? `${daysLeft} days left` : 'Last day'}
                    </Text>
                </View>
            </View>

            <Text className="upcoming-name" style={{ color: colors.foreground }} numberOfLines={1}>{name}</Text>
        </View>
    )
}
export default UpcomingSubscriptionCard