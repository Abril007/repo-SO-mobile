
import React, { useState, useEffect } from "react";
import { 
  Camera as CameraIcon, 
  RefreshCcw, 
  ImageIcon, 
  BatteryMedium, // Replace FlashOff with an available icon
  Zap 
} from "lucide-react";

const CameraApp: React.FC = () => {
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [photoTaken, setPhotoTaken] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  
  // Simular efecto de la cámara
  const takePhoto = () => {
    // Flash efecto
    if (flashOn) {
      const flashElem = document.createElement('div');
      flashElem.className = 'fixed inset-0 bg-white z-50';
      document.body.appendChild(flashElem);
      
      setTimeout(() => {
        document.body.removeChild(flashElem);
      }, 150);
    }
    
    // Capturar una imagen simulada
    setPhotoTaken(`https://picsum.photos/500/800?random=${Date.now()}`);
    
    // Sonido de cámara
    const audio = new Audio('/camera-shutter.mp3');
    audio.play().catch(() => {
      // Silenciar error de reproducción automática
      console.log('No se pudo reproducir el sonido');
    });
  };
  
  const savePhoto = () => {
    if (photoTaken) {
      setPhotos(prev => [photoTaken, ...prev]);
      setPhotoTaken(null);
    }
  };
  
  const discardPhoto = () => {
    setPhotoTaken(null);
  };
  
  const toggleCamera = () => {
    setFrontCamera(prev => !prev);
  };
  
  const toggleFlash = () => {
    setFlashOn(prev => !prev);
  };

  return (
    <div className="flex-1 flex flex-col bg-black relative">
      {photoTaken ? (
        // Vista previa de la foto
        <div className="flex-1 flex flex-col">
          <img 
            src={photoTaken} 
            alt="Photo preview" 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-between p-6 bg-gradient-to-t from-black to-transparent">
            <button 
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              onClick={discardPhoto}
            >
              <RefreshCcw size={20} className="text-white" />
            </button>
            
            <button 
              className="h-12 w-12 rounded-full bg-white flex items-center justify-center"
              onClick={savePhoto}
            >
              <ImageIcon size={20} className="text-black" />
            </button>
          </div>
        </div>
      ) : (
        // Visor de la cámara
        <div className="flex-1 flex flex-col">
          <div 
            className="flex-1 bg-gray-900 relative"
            style={{
              backgroundImage: `url(https://picsum.photos/500/800?random=${frontCamera ? 'front' : 'back'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Elementos de UI sobre la cámara */}
            <div className="absolute top-6 right-6 flex space-x-4">
              <button 
                className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
                onClick={toggleFlash}
              >
                {flashOn ? (
                  <Zap size={18} className="text-yellow-400" />
                ) : (
                  <BatteryMedium size={18} className="text-white" />
                )}
              </button>
            </div>
          </div>
          
          {/* Controles inferiores */}
          <div className="h-24 bg-black flex items-center justify-between px-6">
            <button className="h-12 w-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <ImageIcon size={20} className="text-white" />
            </button>
            
            <button 
              className="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center"
              onClick={takePhoto}
            >
              <div className="h-14 w-14 rounded-full bg-white"></div>
            </button>
            
            <button 
              className="h-12 w-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
              onClick={toggleCamera}
            >
              <RefreshCcw size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraApp;
