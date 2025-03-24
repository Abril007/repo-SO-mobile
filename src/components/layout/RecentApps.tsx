
import React from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { X } from "lucide-react";
import MobileIcon from "@/components/ui/MobileIcon";

interface RecentAppsProps {
  onClose: () => void;
}

const RecentApps: React.FC<RecentAppsProps> = ({ onClose }) => {
  const { recentApps, closeApp, setCurrentApp, ramMemory } = useMobileOS();
  
  // Calcular el uso total de RAM
  const ramUsagePercentage = (ramMemory.used / ramMemory.total) * 100;
  
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">Aplicaciones recientes</h2>
        <button 
          className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
          onClick={onClose}
        >
          <X size={18} className="text-white" />
        </button>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-sm">Memoria RAM</span>
          <span className="text-white text-sm">{ramMemory.used.toFixed(1)}GB / {ramMemory.total}GB</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-mobile-accent rounded-full"
            style={{ width: `${ramUsagePercentage}%` }}
          />
        </div>
      </div>
      
      {recentApps.length === 0 ? (
        <div className="text-center text-white mt-12">
          <p>No hay aplicaciones recientes</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {recentApps.map(app => (
            <div 
              key={app} 
              className="relative bg-white bg-opacity-10 rounded-xl p-4 pr-12"
            >
              <div 
                className="flex items-center"
                onClick={() => {
                  setCurrentApp(app);
                  onClose();
                }}
              >
                <MobileIcon 
                  type={app as any} 
                  size={24} 
                  className="mr-4" 
                  label="" 
                  onClick={() => {}} // Añadimos la propiedad onClick requerida
                />
                <div>
                  <h3 className="text-white font-medium">{app}</h3>
                  <p className="text-gray-300 text-xs">
                    {ramMemory.apps[app] ? `${ramMemory.apps[app].toFixed(1)} GB de RAM` : ""}
                  </p>
                </div>
              </div>
              
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center"
                onClick={() => closeApp(app)}
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentApps;
