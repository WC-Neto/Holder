import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type SignUpVariant = "idoso" | "voluntario";

type SignUpScreenProps = {
  variant: SignUpVariant;
};

function formatDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

const contentByVariant = {
  idoso: {
    title: "Cadastro de Idoso",
    accentColor: "#E8A9B2",
    buttonColor: "#E8A9B2",
    cameraColor: "#F0B39E",
  },
  voluntario: {
    title: "Cadastro de Voluntario",
    accentColor: "#9FCFCB",
    buttonColor: "#9FCFCB",
    cameraColor: "#88C9D0",
  },
} as const;

export default function SignUpScreen({ variant }: SignUpScreenProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");

  const content = contentByVariant[variant];

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/")}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons name="arrow-back" size={24} color="#56514D" />
          </Pressable>

          <Text style={styles.headerTitle}>{content.title}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressTrack}>
          {[0, 1, 2].map((step) => (
            <View
              key={step}
              style={[
                styles.progressSegment,
                step === 0 && { backgroundColor: content.accentColor },
              ]}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Dados Pessoais</Text>

        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <MaterialIcons name="person" size={54} color="#BEC1C4" />
          </View>

          <View
            style={[
              styles.cameraBadge,
              { backgroundColor: content.cameraColor },
            ]}
          >
            <MaterialIcons name="photo-camera" size={13} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            onChangeText={setFullName}
            placeholder="Digite seu nome Completo"
            placeholderTextColor="#B8B1AB"
            style={styles.input}
            value={fullName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            inputMode="numeric"
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={(value) => setBirthDate(formatDate(value))}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#B8B1AB"
            style={styles.input}
            value={birthDate}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            inputMode="numeric"
            keyboardType="number-pad"
            maxLength={14}
            onChangeText={(value) => setCpf(formatCpf(value))}
            placeholder="000.000.000-00"
            placeholderTextColor="#B8B1AB"
            style={styles.input}
            value={cpf}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
          if (!fullName || !birthDate || !cpf) {
          alert("Preencha os campos");

          //futuramente ativa popup de erro mais estilizada e será necessário uma validação mais robusta dos campos

          return;
          }
          router.push("/"); // futuramente direciona para a próxima etapa do cadastro
          }}
          style={({ pressed }) => [
            styles.continueButton,
            { backgroundColor: content.buttonColor },
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.continueText}>Continuar</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FBF5EE",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2ECE5",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#292624",
  },
  headerSpacer: {
    width: 40,
  },
  progressTrack: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },
  progressSegment: {
    flex: 1,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#E3DFDA",
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
    color: "#4B4846",
    marginBottom: 22,
  },
  avatarWrap: {
    alignSelf: "center",
    marginBottom: 28,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1ECE5",
  },
  cameraBadge: {
    position: "absolute",
    right: 2,
    bottom: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FBF5EE",
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    color: "#4B4846",
    marginBottom: 10,
  },
  input: {
    height: 54,
    borderRadius: 10,
    backgroundColor: "#F0ECE7",
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#4B4846",
  },
  continueButton: {
    marginTop: "auto",
    minHeight: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  continueText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  pressed: {
    opacity: 0.9,
  },
});
