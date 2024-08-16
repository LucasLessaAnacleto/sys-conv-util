# sys-conv-util

Esse pacote exporta uma função utilitária para conversão de valores entre diferentes sistemas como Base10, Base2, Base64 e texto simples em JavaScript.

## Instalação

Você pode instalar este pacote via npm:

```bash
npm install sys-conv-util
```

## Uso

A função sysConvUtil permite converter entre diferentes bases e formatos de texto através dos Buffers do javascript. Você pode escolher entre Base10 (decimal), Base2 (binário), Base64 e texto (utf-8).

### Importando

```js
const convUtil = require('sys-conv-util');
```

### Parâmetros
```js
convUtil("systems conversion", "text");
```
O primeiro parâmetro é o valor a ser convertido em si. O segundo parâmetro é o tipo atual do valor passado no primeiro parâmetro, os valores disponíveis para esse parâmetro é: "text", "2", "10"(padrão), "64". 

### Convertendo Valores
```js
// Exemplo: Converter um número em Base10 para Base2
const converter = sysConv(10, '10');
console.log(converter.base2); // Saída: "1010"

// Exemplo: Converter uma string em Base64 para texto
const converter = sysConv('SGVsbG8gd29ybGQ=', '64');
console.log(converter.text); // Saída: "Hello world"

// Exemplo: Converter texto para Base64
const converter = sysConv('Hello world', 'text');
console.log(converter.base64); // Saída: "SGVsbG8gd29ybGQ="
```