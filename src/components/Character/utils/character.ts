import * as THREE from "three";
import { GLTFLoader, DRACOLoader } from "three-stdlib";

export interface CharacterRefs {
  character: THREE.Group;
  headGroup?: THREE.Group;
  leftPupil?: THREE.Mesh;
  rightPupil?: THREE.Mesh;
  leftEyelid?: THREE.Mesh;
  rightEyelid?: THREE.Mesh;
  leftBrow?: THREE.Mesh;
  rightBrow?: THREE.Mesh;
  torso?: THREE.Object3D;
}

const isMobile = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  (window.innerWidth <= 1024 && "ontouchstart" in window);

const AVATAR_MODEL = "/models/avatar.glb";
const FALLBACK_AVATAR_MODEL =
  "https://media.githubusercontent.com/media/Rikinshah787/3d-creative-portfolio-AI/main/public/models/avatar.glb";

export function createRikinCharacter(
  onProgress?: (pct: number) => void,
  onLoaded?: () => void
): CharacterRefs {
  const character = new THREE.Group();
  character.name = "rikin-character";
  const mobile = isMobile();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
  dracoLoader.setDecoderConfig({ type: "js" });

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  const applyGltf = (gltf: any) => {
    const model = gltf.scene;
    model.traverse((obj: THREE.Object3D) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (!mobile) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      }
    });
    model.scale.setScalar(1.6);
    model.position.set(0, -0.9, 0);
    character.add(model);
    dracoLoader.dispose();
    onLoaded?.();
  };

  const loadModel = (url: string, isFallback = false) => {
    loader.load(
      url,
      (gltf) => {
        applyGltf(gltf);
      },
      (xhr) => {
        if (xhr.lengthComputable && onProgress) {
          onProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.warn(`Failed to load avatar model from ${url}:`, error);
        if (!isFallback) {
          console.log("Attempting fallback CDN avatar model...");
          loadModel(FALLBACK_AVATAR_MODEL, true);
        } else {
          console.error("All avatar model sources failed:", error);
          dracoLoader.dispose();
          onLoaded?.();
        }
      }
    );
  };

  loadModel(AVATAR_MODEL);

  const headGroup = character;
  const torso = character;

  return {
    character,
    headGroup,
    torso,
  };
}
