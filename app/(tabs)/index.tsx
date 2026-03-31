import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import "@/global.css";
import { formatCurrency } from "@/lib/utils";
import { posthog } from "@/src/config/posthog";
import { useClerk, useUser } from "@clerk/expo";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    const { user } = useUser();
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
    const { signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (err) {
            console.error("Sign out error:", err);
        }
    };

    // Get user display name: firstName, fullName, or email
    const displayName = user?.firstName || user?.fullName || user?.emailAddresses[0]?.emailAddress || 'User';

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <View className="home-header">
                            <View className="home-user">
                                <Image
                                    source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                                    className="home-avatar"
                                />
                                <View className="flex-1">
                                    <Text className="home-user-name" numberOfLines={1} ellipsizeMode="tail">
                                        {displayName}
                                    </Text>
                                    <Text className="text-xs font-sans-medium text-muted-foreground mt-1 ml-4">
                                        {user?.emailAddresses?.[0]?.emailAddress}
                                    </Text>
                                </View>
                            </View>
                            <Pressable
                                className="size-12 items-center justify-center rounded-full border border-border bg-transparent"
                                onPress={handleSignOut}
                                hitSlop={8}
                            >
                                <Image source={icons.add} className="size-6 opacity-40 add-icon" />
                            </Pressable>
                        </View>

                        <View className="home-balance-card">
                            <Text className="home-balance-label">Balance</Text>
                            <View className="home-balance-row">
                                <Text className="home-balance-amount">{formatCurrency(HOME_BALANCE.amount)}</Text>
                                <Text className="home-balance-date">
                                    {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                                </Text>
                            </View>
                        </View>

                        <View className="mb-5">
                            <ListHeading title="Upcoming" />
                            <FlatList
                                data={UPCOMING_SUBSCRIPTIONS}
                                renderItem={({ item }) => (
                                    <UpcomingSubscriptionCard {...item} />
                                )}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<Text className="home-empty-state">No upcoming renewals yet.</Text>}
                            />
                        </View>

                        <ListHeading title="All Subscriptions" />
                    </>
                )}
                data={HOME_SUBSCRIPTIONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SubscriptionCard
                        {...item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() => {
                            const isExpanding = expandedSubscriptionId !== item.id;
                            setExpandedSubscriptionId((currentId) => (currentId === item.id ? null : item.id));
                            if (isExpanding) {
                                posthog.capture('subscription_expanded', { subscription_id: item.id });
                            }
                        }}
                    />
                )}
                extraData={expandedSubscriptionId}
                ItemSeparatorComponent={() => <View className="h-4" />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text className="home-empty-state">No active subscriptions yet.</Text>}
                contentContainerClassName="pb-30"
            />
        </SafeAreaView>
    );
}