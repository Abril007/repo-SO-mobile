import React, { useState, useEffect } from "react";
import MobileOS from "@/components/layout/MobileOS";
import { useMobileOS } from "@/context/MobileOSContext";
import { Power, Volume, Volume2, RotateCcw } from "lucide-react";

const PowerButton: React.FC = () => {
  const { isPoweredOn, setPoweredOn, isBooting, restartPhone } = useMobileOS();
  const [showMenu, setShowMenu] = useState(false);
  
  const handleLongPress = () => {
    setShowMenu(true);
  };
  
  const handlePowerToggle = () => {
    console.log("Power toggle called, current state:", isPoweredOn);
    setPoweredOn(!isPoweredOn);
    setShowMenu(false);
  };
  
  const handleRestart = () => {
    console.log("Restarting phone");
    restartPhone();
    setShowMenu(false);
  };
  
  const handlePowerButtonClick = () => {
    console.log("Power button clicked, current state:", isPoweredOn);
    // Si el teléfono está apagado, lo encendemos
    // Si está encendido, mostramos el menú
    if (!isPoweredOn) {
      setPoweredOn(true);
    } else {
      handleLongPress();
    }
  };
  
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button 
        className={`absolute -right-2 top-28 h-12 w-1.5 bg-gray-800 rounded-l-sm active:bg-gray-600 ${isPoweredOn ? 'border-r border-blue-400' : ''}`}
        onClick={handlePowerButtonClick}
        onContextMenu={(e) => {
          e.preventDefault();
          handleLongPress();
        }}
      />
      
      {showMenu && (
        <div className="absolute -right-32 top-32 bg-white rounded-lg shadow-xl w-28 overflow-hidden z-10">
          <button 
            className="w-full py-2 px-3 flex items-center text-sm hover:bg-gray-100 border-b border-gray-200"
            onClick={handlePowerToggle}
          >
            <Power size={14} className="mr-2" />
            <span>{isPoweredOn ? 'Apagar' : 'Encender'}</span>
          </button>
          <button 
            className="w-full py-2 px-3 flex items-center text-sm hover:bg-gray-100"
            onClick={handleRestart}
            disabled={isBooting}
          >
            <RotateCcw size={14} className="mr-2" />
            <span>Reiniciar</span>
          </button>
        </div>
      )}
    </div>
  );
};

const VolumeButtons: React.FC = () => {
  const { volumeLevel, setVolumeLevel } = useMobileOS();
  const [volumeTimer, setVolumeTimer] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (volumeTimer) clearTimeout(volumeTimer);
    
    if (volumeLevel > 0) {
      const timer = setTimeout(() => {
        setVolumeLevel(0); // 0 significa que no se muestra
      }, 2000);
      
      setVolumeTimer(timer);
      
      return () => clearTimeout(timer);
    }
  }, [volumeLevel, setVolumeLevel]);
  
  const increaseVolume = () => {
    const newValue = Math.min(10, volumeLevel === 0 ? 5 : volumeLevel + 1);
    setVolumeLevel(newValue);
  };
  
  const decreaseVolume = () => {
    const newValue = Math.max(1, volumeLevel === 0 ? 4 : volumeLevel - 1);
    setVolumeLevel(newValue);
  };
  
  return (
    <>
      <button 
        className="absolute -left-2 top-28 h-8 w-1.5 bg-gray-800 rounded-r-sm active:bg-gray-600"
        onClick={increaseVolume}
      />
      <button 
        className="absolute -left-2 top-40 h-8 w-1.5 bg-gray-800 rounded-r-sm active:bg-gray-600"
        onClick={decreaseVolume}
      />
    </>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-3xl font-light text-gray-800 mb-2 tracking-tight">Simulador de Sistema Operativo Móvil</h1>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        Explora las funcionalidades básicas de un sistema operativo móvil
      </p>
      
      <div className="relative flex justify-center">
        <div className="mobile-screen" style={{ width: '430px', height: '932px' }}>
          <MobileOS />
        </div>
        
        <PowerButton />
        
        <VolumeButtons />
      </div>
      
      <div className="mt-8 text-sm text-gray-500 max-w-md text-center">
        <p className="mb-2">Funcionalidades:</p>
        <ul className="space-y-1 text-left max-w-sm mx-auto">
          <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-[10px]">→</span> Presiona el botón lateral para encender/apagar</li>
          <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-[10px]">→</span> Mantén presionado para ver más opciones</li>
          <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-[10px]">→</span> Usa los botones de volumen</li>
          <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-[10px]">→</span> Marca al 123 para consultar saldo</li>
          <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-[10px]">→</span> Recarga saldo con "recarga saldo Xbs"</li>
        </ul>
      </div>
    </div>
  );
};

import { MobileOSProvider } from "@/context/MobileOSContext";

export default Index;
