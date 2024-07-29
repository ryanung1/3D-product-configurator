import * as THREE from 'three';

export const createTextTexture = (text) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  context.font = 'bold 80px Arial';
  const textWidth = context.measureText(text).width;
  
  // Adjust canvas size based on text
  canvas.width = textWidth + 40;
  canvas.height = 100;
  
  context.font = 'bold 80px Arial';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  
  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.encoding = THREE.sRGBEncoding; // Ensure the texture is in sRGB color space
  return texture;
}
