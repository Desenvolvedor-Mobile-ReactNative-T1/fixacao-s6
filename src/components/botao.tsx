import { Pressable, StyleSheet, Text } from "react-native";

type BotaoProps = { titulo: string; cor: string; onPress: () => void };

export function Botao({ titulo, cor, onPress }: BotaoProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.botao,
        { backgroundColor: cor },
        // pressed && styles.pressionado,
      ]}
    >
      <Text style={styles.botaoTexto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F1",
    padding: 24,
    paddingTop: 64,
    gap: 16,
  },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#1F2328" },
  botao: {
    backgroundColor: "#4D7C2A",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoAviso: { backgroundColor: "#C0392B" },
  botaoMapa: { backgroundColor: "#24292F", marginTop: 8 },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
