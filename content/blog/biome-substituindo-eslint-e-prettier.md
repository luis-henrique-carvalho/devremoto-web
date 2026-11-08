---
title: "Biome.js: O Linter e Formatter em Rust que quer Aposentar o ESLint e Prettier"
description: "Descubra como o Biome formata e analisa projetos TypeScript e JavaScript com velocidade quase instantânea e configuração simplificada."
date: "2026-11-08"
category: "Ferramentas"
tags: ["TypeScript", "JavaScript", "Rust", "DevTools"]
author: "Luis Carvalho"
readTime: "4 min de leitura"
githubRepo: "biomejs/biome"
stars: "14.2k"
---

Se você trabalha com TypeScript ou JavaScript há algum tempo, certamente já passou pela dor de cabeça de configurar uma combinação de **ESLint**, **Prettier**, plugins e regras conflitantes, além de esperar segundos preciosos no seu pipeline de CI.

O **Biome** (sucessor espiritual do projeto Rome) é uma ferramenta completa desenvolvida em **Rust** que combina formatação de código e análise estática (linting) em um único binário com foco obsessivo em performance.

---

### Por que o Biome chamou a atenção da comunidade?

1. **Velocidade Bruta**: Por ser compilado em Rust e tirar proveito de paralelismo nativo, o Biome é até **25 vezes mais rápido** que o Prettier em projetos grandes.
2. **Zero Conflito de Configuração**: Chega de conflitos entre formatação do Prettier e regras de estilização do ESLint. O Biome unifica ambos sob um mesmo motor sintático.
3. **Compatibilidade com Prettier de 97%+**: Você pode migrar seu codebase sem que ele mude drasticamente a formatação que sua equipe já utiliza.

---

### Mão na Massa: Como Usar no seu Projeto

A adoção do Biome é direta e não exige dezenas de dependências no `package.json`.

#### 1. Instalação

Você pode rodar diretamente via npx ou instalar como dependência de desenvolvimento:

```bash
# Execução direta sem instalar
npx @biomejs/biome init

# Ou instalando via pnpm / npm
pnpm add -D --save-exact @biomejs/biome
```

O comando `init` gera automaticamente um arquivo `biome.json` na raiz com as opções recomendadas.

#### 2. Formatando e Corrigindo Erros

Para checar todo o projeto e aplicar correções seguras automaticamente:

```bash
# Verifica formatação e erros de linting
pnpm biome check .

# Corrige automaticamente e formata
pnpm biome check --write .
```

---

### Exemplo de Configuração `biome.json`

O arquivo de configuração é enxuto e autoexplicativo:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always"
    }
  }
}
```

---

### Veredito: Vale a pena adotar hoje?

Para **novos projetos e bibliotecas**, o Biome já é a nossa recomendação padrão. O ganho de velocidade no terminal e a simplicidade de manter apenas um arquivo de configuração pagam o investimento imediatamente.

Para codebases legados gigantes com dezenas de regras customizadas de ESLint corporativo, vale testar primeiro em uma subpasta ou serviço isolado antes de migrar todo o monorepo.
