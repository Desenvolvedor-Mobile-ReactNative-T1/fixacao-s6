import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Cartão" }} />
      <Tabs.Screen name="explore" options={{ title: "Onde estou" }} />
    </Tabs>
  );
}
