# Demonstração de Trabalho com Three.js

Este é um exemplo de código que utiliza a biblioteca Three.js para criar uma cena 3D interativa. A cena inclui um modelo 3D carregado a partir de um arquivo GLTF, objetos geométricos simples, texturas e animações.

## Requisitos

Antes de executar este código, certifique-se de ter os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) (e o gerenciador de pacotes npm)
- Um servidor local (você pode usar [http-server](https://www.npmjs.com/package/http-server) ou qualquer outro de sua escolha)

## Como Usar

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/GeovaneRigonato/ComputacaoGrafica.git
```

2. Navegue até o repositório
```cd ComputacaoGrafica```

3. Instale as dependecias
```npm install```

4. Inicie um servidor local para visualizar a cena 3D 
 ```npm start```

 Abra um navegador da web e acesse http://localhost:8080 para visualizar a cena 3D interativa.

## Funcionalidades
Câmera OrbitControls: A cena permite que você interaja com a câmera usando controles OrbitControls. Use o mouse para girar e zoom na cena.

Carregamento de Modelo GLTF: O código carrega um modelo 3D a partir de um arquivo GLTF e adiciona-o à cena. Você pode selecionar animações para reproduzir a partir de uma lista de botões.

Objetos Geométricos: A cena inclui objetos geométricos simples, como uma esfera e um torus.

Texturas: Um cubo na cena tem uma textura de céu mapeada. Um plano usa uma textura de grama que é repetida horizontalmente.

Animação de Esfera: Uma esfera vermelha se move para cima e para baixo na cena como parte de uma animação.

Luzes: A cena possui três luzes: uma luz branca direcional que ilumina o modelo 3D e duas luzes laterais, verde e vermelha, que adicionam iluminação lateral à cena.


