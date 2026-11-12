---
title: "WorldCam Globe: O Mapa 3D que Transmite 200.000 Câmeras e Satélites ao Vivo"
description: "Explore um globo tridimensional em código aberto que reúne transmissões de rua, radar de voos comerciais, tráfego de cargueiros oceânicos e órbita da ISS em tempo real."
date: "2026-11-12"
category: "DevTools & Ferramentas"
tags: ["WebGL","Three.js","OpenSource","JavaScript","Mapas"]
author: "Luis Carvalho"
readTime: "5 min de leitura"
githubRepo: "vasturiano/globe.gl"
stars: "42.8k"
---

Imagine abrir o navegador e poder rotacionar o planeta Terra em 3D, dar zoom em Tóquio, Times Square ou Londres e assistir câmeras públicas de rua transmitindo em 4K no exato momento da navegação.

O **WorldCam Globe** utiliza bibliotecas de visualização espacial baseadas em WebGL e Three.js para plotar mais de **200.000 fontes de dados públicos** em uma única interface tridimensional sem travamentos e com latência de apenas 0.4s.

---

### As 4 Camadas de Monitoramento em Tempo Real

1. **Câmeras Públicas Urbanas**: Milhares de feeds de vídeo de alta resolução transmitindo cruzamentos, praias, avenidas e pontos turísticos do mundo todo.
2. **Tráfego Aéreo Comercial (ADS-B)**: Todos os aviões comerciais em voo com dados precisos de altitude, modelo da aeronave, velocidade e rota traçada em 3D.
3. **Radar Marítimo & Cabos Submarinos**: Navios cargueiros navegando oceanos em tempo real com mapas interativos da infraestrutura submarina de internet que conecta os continentes.
4. **Órbita Espacial & Constelações**: Acompanhe a trajetória da Estação Espacial Internacional (ISS) a 418 km de altitude e o enxame de satélites Starlink cortando a atmosfera terrestre.

---

### Como Incorporar um Globo 3D no seu Projeto

A mágica por trás dessa visualização é acessível a qualquer desenvolvedor front-end através do componente de código aberto `globe.gl`.

```bash
# Instalação rápida via npm ou pnpm
npm install globe.gl three
```

#### Exemplo em JavaScript Puro:

```javascript
import Globe from 'globe.gl';

const myGlobe = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .pointsData(liveCamerasArray)
  .pointAltitude('altitude')
  .pointColor(() => '#34D399')
  .onPointClick(camera => window.open(camera.streamUrl, '_blank'))
  (document.getElementById('globeViz'));
```

---

### Veredito DevRemoto

Além de ser uma das explorações visuais mais impressionantes da web moderna, o projeto prova o poder do WebGL moderno para manipular grandes volumes de coordenadas geográficas no cliente sem exigir servidores pesados de renderização.
