import { Botao } from "@/components/botao";
import * as Location from "expo-location";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Posicao = {
  latitude: number;
  longitude: number;
  precisao: number | null;
  cidade: string;
  estado: string;
};

export default function OndeEstouScreen() {
  const insets = useSafeAreaInsets();
  const [carregando, setCarregando] = useState(false);
  const [negado, setNegado] = useState(false);
  const [posicao, setPosicao] = useState<Posicao | null>(null);

  const atualizar = async () => {
    setCarregando(true);
    setNegado(false);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPosicao(null);
        setNegado(true);
        return;
      }

      const local = await Location.getCurrentPositionAsync({});
      const { latitude, longitude, accuracy } = local.coords;
      const lugares = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const lugar = lugares[0];

      setPosicao({
        latitude,
        longitude,
        precisao: accuracy,
        cidade: lugar?.city ?? "Cidade não encontrada",
        estado: lugar?.region ?? "Estado não encontrado",
      });
    } catch {
      Alert.alert(
        "Localização indisponível",
        "Não foi possível ler a posição deste aparelho.",
      );
    } finally {
      setCarregando(false);
    }
  };

  const verNoMapa = async () => {
    if (!posicao) {
      return;
    }

    try {
      await Linking.openURL(
        `https://maps.google.com/?q=${posicao.latitude},${posicao.longitude}`,
      );
    } catch {
      Alert.alert("Não foi possível abrir o mapa.");
    }
  };

  const abrirConfiguracoes = async () => {
    try {
      await Linking.openSettings();
    } catch {
      Alert.alert(
        "Configurações",
        "Abra as configurações do aparelho e permita a localização deste app.",
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Text style={styles.titulo}>📍 Onde estou?</Text>
      <Botao
        titulo="Atualizar posição"
        cor="#3C8C40"
        onPress={atualizar}
      />

      {carregando ? (
        <ActivityIndicator
          size="large"
          color="#3C8C40"
          style={styles.indicador}
        />
      ) : null}

      {negado && !carregando ? (
        <View style={styles.bloco}>
          <Text style={styles.aviso}>
            A localização foi negada. O celular não pergunta de novo depois
            do primeiro não. Libere a permissão nas configurações.
          </Text>
          <Botao
            titulo="Abrir configurações"
            cor="#24292F"
            onPress={abrirConfiguracoes}
          />
        </View>
      ) : null}

      {posicao && !carregando && !negado ? (
        <View style={styles.bloco}>
          <Text style={styles.lugar}>
            {posicao.cidade} - {posicao.estado}
          </Text>
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Latitude</Text>
            <Text style={styles.valor}>{posicao.latitude.toFixed(5)}</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Longitude</Text>
            <Text style={styles.valor}>{posicao.longitude.toFixed(5)}</Text>
          </View>
          <Text style={styles.precisao}>
            {posicao.precisao == null
              ? "Precisão indisponível"
              : `Precisão: uns ${Math.round(posicao.precisao)} metros`}
          </Text>
          <Botao titulo="📍 Ver no mapa" cor="#24292F" onPress={verNoMapa} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    gap: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2328",
  },
  indicador: {
    marginTop: 24,
  },
  bloco: {
    gap: 12,
  },
  aviso: {
    fontSize: 16,
    lineHeight: 22,
    color: "#1F2328",
  },
  lugar: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2328",
  },
  linha: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rotulo: {
    fontSize: 16,
    color: "#6B7280",
  },
  valor: {
    fontSize: 16,
    color: "#1F2328",
    fontVariant: ["tabular-nums"],
  },
  precisao: {
    fontSize: 14,
    color: "#6B7280",
  },
});
