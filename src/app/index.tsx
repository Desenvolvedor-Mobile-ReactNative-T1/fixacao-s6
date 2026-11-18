import { Botao } from "@/components/botao";
import * as Haptics from "expo-haptics";
import { Alert, Linking, Share, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NOME = "Matheus";
const CARGO = "Mentor";
const TELEFONE = "48998989898";
const EMAIL = "matheusnadai@senai";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const abrir = async (url: string) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Não foi possível abrir",
        "Nenhum aplicativo conseguiu abrir esse link.",
      );
    }
  };

  const compartilhar = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const resultado = await Share.share({
        message: `${NOME} - ${CARGO} - ${TELEFONE} - ${EMAIL}`,
      });
      if (resultado.action === Share.sharedAction) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      }
    } catch {
      Alert.alert(
        "Não foi possível compartilhar",
        "O cartão não foi enviado.",
      );
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 32 }]}>
      <Text style={styles.nome}>{NOME}</Text>
      <Text style={styles.cargo}>{CARGO}</Text>

      <Botao
        titulo="📞 Ligar"
        cor="#3C8C40"
        onPress={() => abrir(`tel:+55${TELEFONE}`)}
      />
      <Botao
        titulo="✉️ Mandar e-mail"
        cor="#24292F"
        onPress={() => abrir(`mailto:${EMAIL}`)}
      />
      <Botao
        titulo="💬 WhatsApp"
        cor="#2EBE4F"
        onPress={() => abrir(`https://wa.me/55${TELEFONE}`)}
      />
      <Botao titulo="👤 Compartilhar" cor="#2F6FED" onPress={compartilhar} />
      <Botao
        titulo="📍 Como chegar"
        cor="#5C6370"
        onPress={() =>
          abrir("https://maps.google.com/?q=SENAI+Florianopolis")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    gap: 12,
  },
  nome: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2328",
  },
  cargo: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 12,
  },
});
