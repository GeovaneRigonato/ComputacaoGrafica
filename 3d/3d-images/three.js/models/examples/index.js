import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Configuração da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Posicionar a câmera
camera.position.z = 50;
camera.position.y = 50;


// Luz direcional branca
const directionalLightWhite = new THREE.DirectionalLight(0xffffff, 1);
directionalLightWhite.position.set(0, 0, 2);
scene.add(directionalLightWhite);

// Luz direcional verde (lateral)
const directionalLightGreen = new THREE.DirectionalLight(0x00ff00, 1);
directionalLightGreen.position.set(1, 0, 0);
scene.add(directionalLightGreen);

// Luz direcional vermelha (lateral)
const directionalLightRed = new THREE.DirectionalLight(0xff0000, 1);
directionalLightRed.position.set(-1, 0, 0);
scene.add(directionalLightRed);

// Adiciona OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 2);
scene.add(directionalLight);

// Carrega o modelo trex/scene.gltf, associa a um objeto chamado trex e adiciona no centro da cena
const loader = new GLTFLoader();
let object;
let mixer;
loader.load(
  "trex/scene.gltf", 
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    directionalLight.target = object;
    mixer = new THREE.AnimationMixer(object);
    // Verifique se há animações no arquivo GLTF
    if (gltf.animations && gltf.animations.length > 0) {
      const animationButtonsDiv = document.getElementById("animationButtons");

      gltf.animations.forEach((animation, index) => {
        const button = document.createElement("button");
        button.textContent = animation.name || `Animação ${index + 1}`;
        button.addEventListener("click", () => {
          // Iniciar a animação correspondente
          console.log("Iniciando animação", animation.name);
          const clipAction = mixer.clipAction(animation);
          clipAction.play();
        });
        animationButtonsDiv.appendChild(button);
      });
    } else {
      console.log("Nenhuma animação encontrada no arquivo GLTF.");
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Criar uma geometria para uma esfera
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Posicionar a esfera na cena
sphereMesh.position.set(0, 0, 0);

// Adicionar a esfera à cena
scene.add(sphereMesh);

// Criar uma geometria para um torus
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);

// Posicionar o torus na cena
torusMesh.position.set(2, 0, 0);

// Adicionar o torus à cena
scene.add(torusMesh);

// Carregar a textura do céu
const textureLoaderCeu = new THREE.TextureLoader();
const textureCeu = textureLoaderCeu.load("../../../textures/ceu.jpg");

// Criar um cubo com a textura do céu
const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
cubeGeometry.scale(-1, 1, 1); // Inverter a geometria
const cubeMaterial = new THREE.MeshBasicMaterial({ map: textureCeu });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Posicionar o cubo na cena
cubeMesh.position.set(0, 48, 0);

// Adicionar o cubo à cena
scene.add(cubeMesh); 

// Criar uma geometria para o plano
const planeGeometry = new THREE.PlaneGeometry(100, 100, 50);
const textureLoaderGrama = new THREE.TextureLoader();
const textureGrama = textureLoaderGrama.load("../../../textures/grama.avif");
textureGrama.wrapS = THREE.RepeatWrapping; // Repetir a textura horizontalmente
textureGrama.wrapT = THREE.RepeatWrapping; // Repetir a textura verticalmente
textureGrama.repeat.set(4, 4); // Definir a quantidade de repetição horizontal 

const planeMaterial = new THREE.MeshBasicMaterial({ map: textureGrama });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

// Posicionar o plano na cena
planeMesh.rotation.x = -0.5 * Math.PI;
planeMesh.position.y = -1;

// Adicionar o plano à cena
scene.add(planeMesh);

// Criar uma geometria para uma esfera vermelha que sobe e desce
const movingSphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const movingSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const movingSphereMesh = new THREE.Mesh(movingSphereGeometry, movingSphereMaterial);

// Posicionar a esfera na cena
movingSphereMesh.position.set(10, 0, 0);

// Adicionar a esfera à cena
scene.add(movingSphereMesh);

let spherePositionY = 0; // Posição inicial da esfera no eixo Y
let sphereDirection = 1; // Direção inicial da animação (1 para subir, -1 para descer)
let sphereSpeed = 0.1; // Velocidade da animação

// Função para atualizar a posição da esfera na animação
const updateSpherePosition = () => {
  spherePositionY += sphereDirection * sphereSpeed;

  // Inverter a direção se a esfera atingir certos limites
  if (spherePositionY >= 10 || spherePositionY <= -10) {
    sphereDirection *= -1;
  }

  movingSphereMesh.position.y = spherePositionY;
};

// Função de animação
const animate = () => {
  requestAnimationFrame(animate);

  // Atualize a posição da esfera
  updateSpherePosition();

  // Atualize o mixer de animação a cada frame
  if (mixer) {
    mixer.update(0.01);
  }

  // Renderize a cena
  renderer.render(scene, camera);
};

animate();
