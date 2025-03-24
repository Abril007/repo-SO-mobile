import React from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { 
  Battery, 
  BatteryCharging, 
  BatteryWarning, 
  BatteryFull,
  BarChart, 
  Zap, 
  Clock 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Camera, Wifi, Phone } from "lucide-react";

const BatteryApp: React.FC = () => {
  const { batteryLevel, isCharging, setIsCharging } = useMobileOS();

  // Calcular el color basado en el nivel de batería
  const getBatteryColor = () => {
    if (batteryLevel <= 20) return "text-mobile-error";
    if (batteryLevel <= 40) return "text-mobile-warning";
    return "text-mobile-success";
  };

  // Obtener el icono adecuado para el nivel de batería
  const getBatteryIcon = () => {
    if (isCharging) {
      return <BatteryCharging size={38} className="text-mobile-success" />;
    }
    
    if (batteryLevel <= 20) {
      return <BatteryWarning size={38} className="text-mobile-error" />;
    }
    
    if (batteryLevel >= 90) {
      return <BatteryFull size={38} className="text-mobile-success" />;
    }
    
    return <Battery size={38} className={getBatteryColor()} />;
  };

  // Calcular tiempo restante (simulación)
  const getRemainingTime = () => {
    if (isCharging) {
      // Simulación de tiempo para carga completa
      const remainingPercent = 100 - batteryLevel;
      const minutesPerPercent = 1.5; // Aproximadamente 1.5 minutos por cada 1%
      const totalMinutes = remainingPercent * minutesPerPercent;
      
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);
      
      return `${hours}h ${minutes}m para carga completa`;
    } else {
      // Simulación de tiempo restante de batería
      const minutesPerPercent = 10; // Aproximadamente 10 minutos por cada 1%
      const totalMinutes = batteryLevel * minutesPerPercent;
      
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);
      
      return `${hours}h ${minutes}m restantes`;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-yellow-50 to-orange-50 p-6">
      {/* Encabezado */}
      <h1 className="text-2xl font-semibold mb-6">Batería</h1>
      
      {/* Widget principal de batería */}
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center mb-4">
          {getBatteryIcon()}
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-medium">{Math.round(batteryLevel)}%</h2>
            <p className="text-sm text-mobile-gray">{getRemainingTime()}</p>
          </div>
        </div>
        
        <Progress value={batteryLevel} className="h-3" />
      </div>
      
      {/* Estado de carga */}
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap size={24} className={isCharging ? "text-mobile-success" : "text-mobile-gray"} />
            <span className="ml-2 font-medium">Cargando</span>
          </div>
          
          <button 
            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${isCharging ? 'bg-mobile-success justify-end' : 'bg-mobile-gray justify-start'}`}
            onClick={() => setIsCharging(!isCharging)}
          >
            <span className="w-5 h-5 rounded-full bg-white shadow-sm m-0.5"></span>
          </button>
        </div>
      </div>
      
      {/* Uso de batería */}
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm">
        <h3 className="font-medium mb-2 flex items-center">
          <BarChart size={18} className="mr-1" />
          Uso de batería
        </h3>
        
        <div className="space-y-3">
          {/* Apps que consumen batería (simulación) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">
                <Camera size={18} className="text-white" />
              </div>
              <div className="ml-2">
                <div className="font-medium">Cámara</div>
                <div className="text-xs text-mobile-gray">Último uso: hace 10 min</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">28%</div>
              <div className="text-xs text-mobile-gray">15 min</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center">
                <Wifi size={18} className="text-white" />
              </div>
              <div className="ml-2">
                <div className="font-medium">Conectividad</div>
                <div className="text-xs text-mobile-gray">Último uso: Ahora</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">15%</div>
              <div className="text-xs text-mobile-gray">En uso</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <div className="ml-2">
                <div className="font-medium">Teléfono</div>
                <div className="text-xs text-mobile-gray">Último uso: hace 25 min</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">10%</div>
              <div className="text-xs text-mobile-gray">5 min</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Consejos de optimización */}
      <div className="mt-auto">
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-1">Optimizar batería</h3>
          <p className="text-sm text-mobile-gray">Activa el modo de ahorro de batería para prolongar su duración.</p>
        </div>
      </div>
    </div>
  );
};

export default BatteryApp;
