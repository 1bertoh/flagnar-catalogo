// components/Model.tsx
import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Box3, TextureLoader, Vector3 } from "three";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { useGLTF } from "@react-three/drei";

const Model = () => {
  // Carregar o arquivo .mtl (materiais)
  const materials = useLoader(MTLLoader, "/3d/b1.mtl");
  const { scene } = useGLTF("/3d/boia1.glb");
  const modelRef = useRef<Group>(null);

  // Carregar o arquivo .obj com os materiais
  const obj = useLoader(OBJLoader, "/3d/b1.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  }) as Group;

  // Carregar a textura
  const texture = useLoader(TextureLoader, "/3d/texture.png");

  // Aplicar a textura ao modelo
  obj.traverse((child) => {
    if (child instanceof Mesh) {
      if (child.material instanceof MeshStandardMaterial) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    }
  });

  useEffect(() => {
    if (modelRef.current) {
      // Calcular a caixa delimitadora do objeto
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();

      box.getCenter(center); // Obter o centro geométrico

      // Reposicionar o pivô para o centro geométrico
      modelRef.current.position.sub(center); // Mover o objeto para o centro
      modelRef.current.updateMatrixWorld(); // Atualizar a matriz do mundo
    }
  }, [scene]);

  // Girar o objeto automaticamente
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta; // Girar em torno do eixo Y
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]} // Ajuste a escala conforme necessário
    />
  );
};

export default Model;
