import '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    group: any;
    mesh: any;
    ambientLight: any;
    directionalLight: any;
    pointLight: any;
    sphereGeometry: any;
    meshStandardMaterial: any;
    meshBasicMaterial: any;
    ringGeometry: any;
  }
}
