---
title: "Kokoro-82M: O Motor de Voz Neural Gratuito que Desbanca Serviços Pagos"
description: "Com apenas 82 milhões de parâmetros, o Kokoro gera fala humana com cadência natural, respiração e sotaque brasileiro rodando localmente sem placa de vídeo cara."
date: "2026-11-12"
category: "Inteligência Artificial"
tags: ["TTS","Áudio","Voz Neural","Docker","Python"]
author: "Luis Carvalho"
readTime: "4 min de leitura"
githubRepo: "hexgrad/kokoro"
stars: "31.2k"
---

Serviços de voz neural como a ElevenLabs transformaram a produção de vídeos, mas cobram assinaturas pesadas em dólar e limitam a quantidade de caracteres que você pode vocalizar por mês.

O **Kokoro-82M** chegou para mudar esse cenário: é um modelo de Text-to-Speech com apenas **82 milhões de parâmetros** que gera áudios de altíssima fidelidade e naturalidade rodando em tempo real até mesmo na CPU de um notebook comum.

---

### Como Rodar no Docker em Segundos

```bash
# Executa a API do Kokoro localmente com suporte a português
docker run -d -p 8880:8880 --name kokoro-tts ghcr.io/remsky/kokoro-fastapi-cpu:v0.1.0
```

A partir daí, você tem um endpoint local compatível com a API da OpenAI para gerar falas instantâneas para vídeos, podcasts e assistentes virtuais a custo zero.

---

### Veredito DevRemoto

O Kokoro é a prova viva de que modelos de IA eficientes e compactos podem superar gigantes inflados. É a engine oficial que usamos para renderizar áudios de alta fidelidade no canal DevRemoto.
