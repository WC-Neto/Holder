import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Href, useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const options = [
  {
    title: "Sou Idoso",
    description: "Preciso de ajuda com tarefas do dia a dia",
    route: "/cadastro-idoso" as Href,
    icon: "favorite",
    cardColor: "#E8A9B2",
    iconColor: "#FFFFFF",
  },
  {
    title: "Sou Voluntario",
    description: "Quero ajudar pessoas da minha comunidade",
    route: "/cadastro-voluntario" as Href,
    icon: "back-hand",
    cardColor: "#A9CCBC",
    iconColor: "#FFFFFF",
  },
] as const;

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.pressed,
        ]}
      >
        <MaterialIcons name="arrow-back" size={24} color="#56514D" />
      </Pressable>

      <View style={styles.content}>
        <Image
          resizeMode="contain"
          source={require("../../assets/images/holder_logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Como voce quer usar o Holder?</Text>
        <Text style={styles.subtitle}>Selecione uma opcao para continuar</Text>

        <View style={styles.cardList}>
          {options.map((option) => (
            <Pressable
              accessibilityRole="button"
              key={option.title}
              onPress={() => router.push(option.route)}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: option.cardColor },
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.cardIconCircle}>
                <MaterialIcons
                  color={option.iconColor}
                  name={option.icon}
                  size={32}
                />
              </View>

              <Text style={styles.cardTitle}>{option.title}</Text>
              <Text style={styles.cardDescription}>{option.description}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={styles.footerText}>
        Ao continuar, voce concorda com nossos{" "}
        <Text style={styles.footerLink}>Termos de Uso</Text> e{" "}
        <Text style={styles.footerLink}>Politica de Privacidade</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FBF5EE",
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2ECE5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "700",
    color: "#4B4846",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: "#948F89",
    textAlign: "center",
    marginBottom: 28,
  },
  cardList: {
    width: "100%",
    gap: 16,
  },
  card: {
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: "center",
    minHeight: 126,
    justifyContent: "center",
  },
  cardIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  footerText: {
    fontSize: 11,
    lineHeight: 16,
    color: "#A9A39D",
    textAlign: "center",
    marginTop: 44,
  },
  footerLink: {
    color: "#94BAC4",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
