
import React from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  Signal, 
  SignalMedium, 
  SignalHigh,
  Globe,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const ConnectivityApp: React.FC = () => {
  const { 
    carrier, 
    setCarrier, 
    signalStrength, 
    setSignalStrength,
    wifiEnabled, 
    setWifiEnabled, 
    wifiStrength,
    setWifiStrength
  } = useMobileOS();

  // Cambiar el operador
  const handleCarrierChange = (newCarrier: "Movistar" | "Digitel" | "Movilnet") => {
    setCarrier(newCarrier);
    
    // Simular variación de la intensidad de la señal al cambiar de operador
    setSignalStrength(Math.floor(Math.random() * 5));
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-sky-50 p-6">
      {/* Encabezado */}
      <h1 className="text-2xl font-semibold mb-6">Conectividad</h1>
      
      {/* WiFi */}
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {wifiEnabled ? (
              <Wifi size={24} className="text-mobile-accent" />
            ) : (
              <WifiOff size={24} className="text-mobile-gray" />
            )}
            <span className="ml-2 font-medium">Wi-Fi</span>
          </div>
          
          <button 
            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${wifiEnabled ? 'bg-mobile-accent justify-end' : 'bg-mobile-gray justify-start'}`}
            onClick={() => setWifiEnabled(!wifiEnabled)}
          >
            <span className="w-5 h-5 rounded-full bg-white shadow-sm m-0.5"></span>
          </button>
        </div>
        
        {wifiEnabled && (
          <div className="ml-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">WiFi-Home</div>
                <div className="text-xs text-mobile-gray">Conectado</div>
              </div>
              
              <div className="flex gap-0.5">
                {[1, 2, 3].map((bar) => (
                  <div 
                    key={bar}
                    className={cn(
                      "h-3 w-1 rounded",
                      bar <= wifiStrength ? "bg-mobile-accent" : "bg-mobile-light-gray"
                    )}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2">
              <div>
                <div className="font-medium">WiFi-Vecino</div>
                <div className="text-xs text-mobile-gray">Seguro</div>
              </div>
              
              <div className="flex gap-0.5">
                {[1, 2].map((bar) => (
                  <div 
                    key={bar}
                    className="h-3 w-1 rounded bg-mobile-light-gray"
                  ></div>
                ))}
                <div className="h-3 w-1 rounded bg-mobile-light-gray opacity-30"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Operador móvil */}
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
        <h3 className="font-medium mb-4 flex items-center">
          <Signal size={18} className="mr-2" />
          Operador móvil
        </h3>
        
        <div className="space-y-3">
          <button 
            className={cn(
              "w-full p-3 rounded-lg flex items-center justify-between",
              carrier === "Movistar" ? "bg-blue-100" : "bg-gray-50"
            )}
            onClick={() => handleCarrierChange("Movistar")}
          >
            <div className="font-medium">Movistar</div>
            {carrier === "Movistar" && (
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((bar) => (
                  <div 
                    key={bar}
                    className={cn(
                      "h-3 w-1 rounded",
                      bar <= signalStrength ? "bg-blue-500" : "bg-gray-200"
                    )}
                  ></div>
                ))}
              </div>
            )}
          </button>
          
          <button 
            className={cn(
              "w-full p-3 rounded-lg flex items-center justify-between",
              carrier === "Digitel" ? "bg-green-100" : "bg-gray-50"
            )}
            onClick={() => handleCarrierChange("Digitel")}
          >
            <div className="font-medium">Digitel</div>
            {carrier === "Digitel" && (
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((bar) => (
                  <div 
                    key={bar}
                    className={cn(
                      "h-3 w-1 rounded",
                      bar <= signalStrength ? "bg-green-500" : "bg-gray-200"
                    )}
                  ></div>
                ))}
              </div>
            )}
          </button>
          
          <button 
            className={cn(
              "w-full p-3 rounded-lg flex items-center justify-between",
              carrier === "Movilnet" ? "bg-red-100" : "bg-gray-50"
            )}
            onClick={() => handleCarrierChange("Movilnet")}
          >
            <div className="font-medium">Movilnet</div>
            {carrier === "Movilnet" && (
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((bar) => (
                  <div 
                    key={bar}
                    className={cn(
                      "h-3 w-1 rounded",
                      bar <= signalStrength ? "bg-red-500" : "bg-gray-200"
                    )}
                  ></div>
                ))}
              </div>
            )}
          </button>
        </div>
      </div>
      
      {/* Otras opciones de conectividad */}
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bluetooth size={20} className="text-mobile-gray" />
              <span className="ml-2">Bluetooth</span>
            </div>
            <button className="w-12 h-6 rounded-full flex items-center bg-mobile-gray justify-start">
              <span className="w-5 h-5 rounded-full bg-white shadow-sm m-0.5"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe size={20} className="text-mobile-gray" />
              <span className="ml-2">Datos móviles</span>
            </div>
            <button className="w-12 h-6 rounded-full flex items-center bg-mobile-accent justify-end">
              <span className="w-5 h-5 rounded-full bg-white shadow-sm m-0.5"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin size={20} className="text-mobile-gray" />
              <span className="ml-2">Ubicación</span>
            </div>
            <button className="w-12 h-6 rounded-full flex items-center bg-mobile-accent justify-end">
              <span className="w-5 h-5 rounded-full bg-white shadow-sm m-0.5"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectivityApp;
