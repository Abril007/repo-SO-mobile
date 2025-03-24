
import React, { useEffect, useState } from "react";
import { MobileOSProvider, useMobileOS } from "@/context/MobileOSContext";
import StatusBar from "@/components/layout/StatusBar";
import HomeScreen from "@/components/layout/HomeScreen";
import PhoneApp from "@/components/apps/PhoneApp";
import MicrophoneApp from "@/components/apps/MicrophoneApp";
import CameraApp from "@/components/apps/CameraApp";
import BatteryApp from "@/components/apps/BatteryApp";
import ConnectivityApp from "@/components/apps/ConnectivityApp";
import MemoryApp from "@/components/apps/MemoryApp";
import WhatsAppApp from "@/components/apps/WhatsAppApp";
import MessagesApp from "@/components/apps/MessagesApp";
import { Home as HomeIcon, ArrowLeft, AppWindow } from "lucide-react";
import { cn } from "@/lib/utils";
import BootScreen from "@/components/layout/BootScreen";
import RecentApps from "@/components/layout/RecentApps";

const MobileOSContent: React.FC = () => {
  const { 
    currentApp, 
    setCurrentApp, 
    simulateIncomingCall, 
    isPoweredOn, 
    isBooting,
    recentApps,
    volumeLevel,
    setVolumeLevel
  } = useMobileOS();
  
  const [showRecentApps, setShowRecentApps] = useState(false);

  console.log("MobileOS render state:", { isPoweredOn, isBooting });

  // Efecto para simular una llamada entrante después de un tiempo
  useEffect(() => {
    if (isPoweredOn && !isBooting) {
      const timeout = setTimeout(() => {
        if (Math.random() > 0.5) {
          simulateIncomingCall();
        }
      }, 30000); // 30 segundos después de cargar
      
      return () => clearTimeout(timeout);
    }
  }, [isPoweredOn, isBooting, simulateIncomingCall]);

  // Si el teléfono está apagado o arrancando
  if (!isPoweredOn) {
    console.log("Rendering powered off screen");
    return <BootScreen />;
  }
  
  if (isBooting) {
    console.log("Rendering boot screen");
    return <BootScreen />;
  }

  // Renderizar la aplicación seleccionada
  const renderApp = () => {
    switch (currentApp) {
      case "Phone":
        return <PhoneApp />;
      case "Microphone":
        return <MicrophoneApp />;
      case "Camera":
        return <CameraApp />;
      case "Battery":
        return <BatteryApp />;
      case "Connectivity":
        return <ConnectivityApp />;
      case "Memory":
        return <MemoryApp />;
      case "WhatsApp":
        return <WhatsAppApp />;
      case "Messages":
        return <MessagesApp />;
      case "Home":
      default:
        return <HomeScreen />;
    }
  };

  const toggleRecentApps = () => {
    setShowRecentApps(!showRecentApps);
  };

  return (
    <div className="mobile-screen">
      {showRecentApps ? (
        <RecentApps onClose={() => setShowRecentApps(false)} />
      ) : (
        <>
          <StatusBar />
          
          {/* Contenedor de la aplicación actual */}
          <div className="app-container">
            {renderApp()}
          </div>
          
          {/* Barra de navegación inferior */}
          {currentApp !== "Home" && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-black bg-opacity-10 backdrop-blur-sm flex items-center px-6">
              <button 
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm"
                onClick={() => setCurrentApp("Home")}
              >
                <HomeIcon size={20} className="text-white" />
              </button>
              
              <button 
                className="ml-auto mr-4 w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm"
                onClick={toggleRecentApps}
              >
                <AppWindow size={20} className="text-white" />
              </button>
              
              <button 
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm"
                onClick={() => setCurrentApp("Home")}
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Indicador de volumen */}
      {volumeLevel > 0 && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-lg px-4 py-2 flex items-center space-x-2 text-white">
          <div className="text-sm">Volumen: {volumeLevel}</div>
          <div className="w-24 h-1 bg-white bg-opacity-30 rounded-full">
            <div 
              className="h-full bg-white rounded-full" 
              style={{ width: `${(volumeLevel / 10) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const MobileOS: React.FC = () => {
  return (
    <MobileOSProvider>
      <MobileOSContent />
    </MobileOSProvider>
  );
};

export default MobileOS;
