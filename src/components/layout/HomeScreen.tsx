
import React from "react";
import MobileIcon from "@/components/ui/MobileIcon";
import { useMobileOS } from "@/context/MobileOSContext";
import { Home, LayoutGrid } from "lucide-react";

const HomeScreen: React.FC = () => {
  const { setCurrentApp } = useMobileOS();

  const handleOpenApp = (app: "Phone" | "Microphone" | "Camera" | "Battery" | "Connectivity" | "Memory" | "WhatsApp" | "Messages") => {
    setCurrentApp(app);
  };

  return (
    <div 
      className="flex-1 flex flex-col justify-center p-6"
      style={{
        backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col space-y-8">
        {/* Reloj */}
        <div className="text-center mb-8">
          <div className="text-4xl font-extralight">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm font-medium text-mobile-dark text-opacity-70 mt-1">
            {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Apps principales */}
        <div className="grid grid-cols-4 gap-6">
          <MobileIcon
            type="Phone"
            label="Llamadas"
            onClick={() => handleOpenApp("Phone")}
          />
          <MobileIcon
            type="Microphone"
            label="Micrófono"
            onClick={() => handleOpenApp("Microphone")}
          />
          <MobileIcon
            type="Camera"
            label="Cámara"
            onClick={() => handleOpenApp("Camera")}
          />
          <MobileIcon
            type="Battery"
            label="Batería"
            onClick={() => handleOpenApp("Battery")}
          />
        </div>

        {/* Apps secundarias */}
        <div className="grid grid-cols-4 gap-6">
          <MobileIcon
            type="Connectivity"
            label="Conectividad"
            onClick={() => handleOpenApp("Connectivity")}
          />
          <MobileIcon
            type="Memory"
            label="Memoria"
            onClick={() => handleOpenApp("Memory")}
          />
          <MobileIcon
            type="WhatsApp"
            label="WhatsApp"
            onClick={() => handleOpenApp("WhatsApp")}
          />
          <MobileIcon
            type="Messages"
            label="Mensajes"
            onClick={() => handleOpenApp("Messages")}
          />
        </div>
      </div>

      {/* Dock de aplicaciones */}
      <div className="mt-auto">
        <div className="glass-panel p-4 flex justify-around items-center mt-8">
          <MobileIcon
            type="Phone"
            label=""
            onClick={() => handleOpenApp("Phone")}
            size={20}
            className="w-12 h-12"
          />
          <MobileIcon
            type="WhatsApp"
            label=""
            onClick={() => handleOpenApp("WhatsApp")}
            size={20}
            className="w-12 h-12"
          />
          <MobileIcon
            type="Messages"
            label=""
            onClick={() => handleOpenApp("Messages")}
            size={20}
            className="w-12 h-12"
          />
          <MobileIcon
            type="Memory"
            label=""
            onClick={() => handleOpenApp("Memory")}
            size={20}
            className="w-12 h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
