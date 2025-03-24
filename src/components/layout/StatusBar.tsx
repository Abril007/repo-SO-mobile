
import React from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { 
  Battery, 
  BatteryCharging, 
  Wifi, 
  WifiOff, 
  Signal, 
  SignalLow, 
  SignalMedium, 
  SignalHigh, 
  SignalZero 
} from "lucide-react";

const StatusBar: React.FC = () => {
  const { 
    batteryLevel, 
    isCharging, 
    carrier, 
    signalStrength, 
    wifiEnabled, 
    wifiStrength 
  } = useMobileOS();

  // Obtener el icono de señal basado en la intensidad
  const getSignalIcon = () => {
    switch (signalStrength) {
      case 0:
        return <SignalZero size={14} className="text-mobile-error" />;
      case 1:
        return <SignalLow size={14} />;
      case 2:
        return <SignalMedium size={14} />;
      case 3:
      case 4:
        return <SignalHigh size={14} />;
      default:
        return <SignalZero size={14} />;
    }
  };

  // Obtener color de batería basado en el nivel
  const getBatteryColor = () => {
    if (batteryLevel <= 20) return "text-mobile-error";
    if (batteryLevel <= 40) return "text-mobile-warning";
    return "text-mobile-success";
  };

  // Formatear la hora actual
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="status-bar">
      {/* Parte izquierda: Operador y señal */}
      <div className="flex items-center space-x-1">
        <span className="font-medium text-[10px]">{carrier}</span>
        {getSignalIcon()}
      </div>

      {/* Parte central: Hora */}
      <div className="font-semibold">
        {getCurrentTime()}
      </div>

      {/* Parte derecha: WiFi y Batería */}
      <div className="flex items-center space-x-2">
        {wifiEnabled ? (
          <Wifi size={14} className={wifiStrength === 0 ? "text-mobile-error" : ""} />
        ) : (
          <WifiOff size={14} className="text-mobile-gray" />
        )}
        
        <div className="flex items-center">
          {isCharging ? (
            <BatteryCharging size={16} className="text-mobile-success" />
          ) : (
            <Battery size={16} className={getBatteryColor()} />
          )}
          <span className="text-[10px] ml-1">{Math.round(batteryLevel)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
