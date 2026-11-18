# Fixação da semana 06 — Módulo 02

Exercício de fixação da semana 06 do módulo 02.

O app pratica recursos nativos do celular em duas abas.

## Cartão

Cartão de visita com nome, cargo e cinco ações:

- Ligar, mandar e-mail, abrir o WhatsApp e ver o endereço no Google Maps.
- Compartilhar o cartão com nome, telefone e e-mail.
- Cada botão vibra antes de abrir o link. Se o link não abrir, o app mostra um alerta.
- Ao compartilhar, o celular vibra de novo em caso de sucesso.

## Onde estou

Tela de localização:

- O botão **Atualizar posição** pede permissão e busca a posição atual.
- A tela mostra latitude, longitude, precisão em metros, cidade e estado.
- Enquanto a posição é buscada, aparece um indicador de carregamento.
- Se a permissão for negada, a tela avisa e oferece o botão **Abrir configurações**.
- O botão **Ver no mapa** abre a coordenada no Google Maps.

## Como rodar

```bash
npm install
npx expo start
```

Abra o projeto no Expo Go, em um emulador ou em um build de desenvolvimento.
