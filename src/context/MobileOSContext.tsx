
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Carrier = "Movistar" | "Digitel" | "Movilnet";
type AppType = "Phone" | "Microphone" | "Camera" | "Battery" | "Connectivity" | "Memory" | "WhatsApp" | "Messages" | "Home";

interface MobileOSContextType {
  // Sistema
  currentApp: AppType;
  setCurrentApp: (app: AppType) => void;
  isPoweredOn: boolean;
  setPoweredOn: (on: boolean) => void;
  isBooting: boolean;
  recentApps: AppType[];
  closeApp: (app: AppType) => void;
  restartPhone: () => void;
  volumeLevel: number;
  setVolumeLevel: (level: number) => void;
  
  // Batería
  batteryLevel: number;
  setBatteryLevel: (level: number) => void;
  isCharging: boolean;
  setIsCharging: (charging: boolean) => void;
  
  // Conectividad
  carrier: Carrier;
  setCarrier: (carrier: Carrier) => void;
  signalStrength: number; // 0-4
  setSignalStrength: (strength: number) => void;
  wifiEnabled: boolean;
  setWifiEnabled: (enabled: boolean) => void;
  wifiStrength: number; // 0-3
  setWifiStrength: (strength: number) => void;
  
  // Memoria
  internalMemory: {
    total: number; // en GB
    used: number;
    system: number; // espacio usado por el sistema
  };
  setInternalMemory: (memory: { total: number; used: number; system: number }) => void;
  externalMemory: {
    installed: boolean;
    total: number; // en GB
    used: number;
  };
  setExternalMemory: (memory: { installed: boolean; total: number; used: number }) => void;
  
  // RAM
  ramMemory: {
    total: number; // en GB
    used: number;
    apps: Record<string, number>; // uso por aplicación
  };
  
  // Saldo
  creditBalance: number;
  setCreditBalance: (balance: number) => void;
  rechargeCredit: (amount: number) => void;
  
  // Llamadas
  callInProgress: boolean;
  setCallInProgress: (inProgress: boolean) => void;
  currentNumber: string;
  setCurrentNumber: (number: string) => void;

  // Funcionalidades
  toggleWifi: () => void;
  simulateIncomingCall: () => void;
  endCall: () => void;
}

const MobileOSContext = createContext<MobileOSContextType | undefined>(undefined);

export const useMobileOS = () => {
  const context = useContext(MobileOSContext);
  if (!context) {
    throw new Error("useMobileOS must be used within a MobileOSProvider");
  }
  return context;
};

export const MobileOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<AppType>("Home");
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isCharging, setIsCharging] = useState(false);
  const [carrier, setCarrier] = useState<Carrier>("Movistar");
  const [signalStrength, setSignalStrength] = useState(3);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [wifiStrength, setWifiStrength] = useState(2);
  const [callInProgress, setCallInProgress] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [isPoweredOn, setPoweredOn] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(5);
  const [recentApps, setRecentApps] = useState<AppType[]>([]);
  const [creditBalance, setCreditBalance] = useState(100); // 100 Bs iniciales
  
  const [internalMemory, setInternalMemory] = useState({
    total: 64,
    used: 32,
    system: 8 // 8 GB usados por el sistema
  });
  
  const [externalMemory, setExternalMemory] = useState({
    installed: true,
    total: 128,
    used: 45
  });
  
  const [ramMemory, setRamMemory] = useState({
    total: 6,
    used: 1.2,
    apps: {
      "System": 0.8,
    } as Record<string, number>
  });

  // Efecto para manejar el booteo del teléfono
  useEffect(() => {
    if (isPoweredOn && !isBooting) return;
    
    if (isPoweredOn && isBooting) {
      const bootTimer = setTimeout(() => {
        setIsBooting(false);
      }, 5000); // 5 segundos para bootear
      
      return () => clearTimeout(bootTimer);
    }
  }, [isPoweredOn, isBooting]);

  // Actualizar apps recientes cuando se cambia de app
  useEffect(() => {
    if (currentApp !== "Home") {
      setRecentApps(prev => {
        // Remover la app si ya existe en el array
        const filtered = prev.filter(app => app !== currentApp);
        // Añadir la app al principio
        return [currentApp, ...filtered].slice(0, 5); // Mantener solo las 5 más recientes
      });
      
      // Actualizar el uso de RAM
      setRamMemory(prev => {
        const appUsage = {
          ...prev.apps,
          [currentApp]: Math.random() * 0.5 + 0.3 // Entre 0.3 y 0.8 GB
        };
        
        // Calcular el uso total
        const totalAppUsage = Object.values(appUsage).reduce((sum, val) => sum + val, 0);
        
        return {
          ...prev,
          used: totalAppUsage,
          apps: appUsage
        };
      });
    }
  }, [currentApp]);

  // Simular descarga gradual de batería
  useEffect(() => {
    if (!isPoweredOn) return;
    
    if (!isCharging && batteryLevel > 0) {
      const interval = setInterval(() => {
        setBatteryLevel(prev => Math.max(0, prev - 0.1));
      }, 60000); // Cada minuto baja 0.1%
      
      return () => clearInterval(interval);
    }
  }, [isCharging, batteryLevel, isPoweredOn]);

  // Simular carga de batería
  useEffect(() => {
    if (!isPoweredOn) return;
    
    if (isCharging && batteryLevel < 100) {
      const interval = setInterval(() => {
        setBatteryLevel(prev => Math.min(100, prev + 0.2));
      }, 30000); // Cada 30 segundos sube 0.2%
      
      return () => clearInterval(interval);
    }
  }, [isCharging, batteryLevel, isPoweredOn]);

  // Fluctuación aleatoria de la señal
  useEffect(() => {
    if (!isPoweredOn || isBooting) return;
    
    const interval = setInterval(() => {
      // 10% de probabilidad de cambiar la intensidad de la señal
      if (Math.random() < 0.1) {
        setSignalStrength(Math.floor(Math.random() * 5)); // 0-4
      }
      
      // 5% de probabilidad de cambiar la intensidad del WiFi
      if (wifiEnabled && Math.random() < 0.05) {
        setWifiStrength(Math.floor(Math.random() * 4)); // 0-3
      }
    }, 30000); // Cada 30 segundos
    
    return () => clearInterval(interval);
  }, [wifiEnabled, isPoweredOn, isBooting]);

  const toggleWifi = () => {
    setWifiEnabled(prev => !prev);
  };

  const simulateIncomingCall = () => {
    // Generar un número aleatorio de 9 dígitos
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    setCurrentNumber(randomNumber);
    setCallInProgress(true);
    setCurrentApp("Phone");
  };

  const endCall = () => {
    setCallInProgress(false);
  };
  
  const closeApp = useCallback((app: AppType) => {
    setRecentApps(prev => prev.filter(a => a !== app));
    
    // Liberar RAM
    setRamMemory(prev => {
      const newApps = { ...prev.apps };
      delete newApps[app];
      
      const totalAppUsage = Object.values(newApps).reduce((sum, val) => sum + val, 0);
      
      return {
        ...prev,
        used: totalAppUsage,
        apps: newApps
      };
    });
    
    if (currentApp === app) {
      setCurrentApp("Home");
    }
  }, [currentApp]);
  
  const restartPhone = useCallback(() => {
    setPoweredOn(false);
    setTimeout(() => {
      setPoweredOn(true);
      setIsBooting(true);
      setRecentApps([]);
      setRamMemory({
        total: 6,
        used: 0.8,
        apps: {
          "System": 0.8,
        }
      });
    }, 1000);
  }, []);
  
  const rechargeCredit = useCallback((amount: number) => {
    setCreditBalance(prev => prev + amount);
  }, []);

  return (
    <MobileOSContext.Provider
      value={{
        currentApp,
        setCurrentApp,
        batteryLevel,
        setBatteryLevel,
        isCharging,
        setIsCharging,
        carrier,
        setCarrier,
        signalStrength,
        setSignalStrength,
        wifiEnabled,
        setWifiEnabled,
        wifiStrength,
        setWifiStrength,
        internalMemory,
        setInternalMemory,
        externalMemory,
        setExternalMemory,
        callInProgress,
        setCallInProgress,
        currentNumber,
        setCurrentNumber,
        toggleWifi,
        simulateIncomingCall,
        endCall,
        isPoweredOn,
        setPoweredOn,
        isBooting,
        recentApps,
        closeApp,
        restartPhone,
        volumeLevel,
        setVolumeLevel,
        ramMemory,
        creditBalance,
        setCreditBalance,
        rechargeCredit
      }}
    >
      {children}
    </MobileOSContext.Provider>
  );
};
