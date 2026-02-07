import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useThemeColors, spacing, typography } from "@/constants/theme";

export default function HomeScreen() {
  const colors = useThemeColors();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Your App Name
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Replace this with your app's home screen.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
  },
});
