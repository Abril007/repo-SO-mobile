
import React, { useState, useEffect } from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { 
  Phone, 
  X, 
  Plus, 
  User, 
  Clock, 
  Mic, 
  MicOff, 
  Volume2, 
  Volume, 
  VolumeX 
} from "lucide-react";
import { cn } from "@/lib/utils";

const PhoneApp: React.FC = () => {
  const { 
    callInProgress, 
    currentNumber, 
    setCurrentNumber, 
    setCallInProgress,
    creditBalance,
    setCurrentApp 
  } = useMobileOS();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (callInProgress) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      setCallTimer(timer);
      
      return () => clearInterval(timer);
    } else {
      if (callTimer) {
        clearInterval(callTimer);
      }
      setCallDuration(0);
    }
  }, [callInProgress]);

  if (callInProgress) {
    return (
      <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 p-6">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-mobile-accent flex items-center justify-center">
            <User size={48} className="text-white" />
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{currentNumber}</h2>
            <p className="text-mobile-gray mt-1">Llamada en curso</p>
          </div>
          
          <div className="text-mobile-gray mt-2">
            {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          <button
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-full",
              isMuted 
                ? "bg-mobile-error text-white" 
                : "bg-mobile-light-gray bg-opacity-30 text-mobile-dark"
            )}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            <span className="text-xs mt-1">Silenciar</span>
          </button>
          
          <button
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-full",
              isSpeaker 
                ? "bg-mobile-accent text-white" 
                : "bg-mobile-light-gray bg-opacity-30 text-mobile-dark"
            )}
            onClick={() => setIsSpeaker(!isSpeaker)}
          >
            {isSpeaker ? <Volume2 size={24} /> : <Volume size={24} />}
            <span className="text-xs mt-1">Altavoz</span>
          </button>
          
          <button
            className="flex flex-col items-center justify-center p-4 rounded-full bg-mobile-error text-white"
            onClick={() => {
              setCallInProgress(false);
              setCallDuration(0);
              
              // Si llamamos al 123, abrir la app de mensajes
              if (currentNumber === "123") {
                setTimeout(() => {
                  setCurrentApp("Messages");
                }, 500);
              }
            }}
          >
            <X size={24} />
            <span className="text-xs mt-1">Finalizar</span>
          </button>
        </div>
      </div>
    );
  }

  const handleKeyPress = (key: string) => {
    if (key === "clear") {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else if (key === "call") {
      if (currentNumber.length > 0) {
        setCallInProgress(true);
        
        // Si llamamos al 123, es consulta de saldo
        if (currentNumber === "123") {
          // La llamada será corta, solo para mostrar la transición a mensajes
          setTimeout(() => {
            setCallInProgress(false);
            setCurrentApp("Messages");
          }, 2000);
        }
      }
    } else {
      setCurrentNumber(currentNumber + key);
    }
  };

  const renderKey = (key: string, label?: string) => {
    if (key === "call") {
      return (
        <button
          className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl"
          onClick={() => handleKeyPress(key)}
        >
          <Phone size={24} />
        </button>
      );
    }
    
    if (key === "clear") {
      return (
        <button
          className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl"
          onClick={() => handleKeyPress(key)}
        >
          <X size={20} />
        </button>
      );
    }
    
    return (
      <button
        className="h-14 w-14 rounded-full bg-white bg-opacity-50 flex items-center justify-center text-mobile-dark text-2xl shadow-sm backdrop-blur-xs relative"
        onClick={() => handleKeyPress(key)}
      >
        {key}
        {label && <span className="text-[10px] absolute bottom-3">{label}</span>}
      </button>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="rounded-xl p-4 mb-6 bg-white bg-opacity-50 backdrop-blur-xs">
        <input
          type="text"
          value={currentNumber}
          readOnly
          className="w-full text-2xl font-medium text-center bg-transparent focus:outline-none"
          placeholder="Número de teléfono"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {renderKey("1")}
        {renderKey("2", "ABC")}
        {renderKey("3", "DEF")}
        {renderKey("4", "GHI")}
        {renderKey("5", "JKL")}
        {renderKey("6", "MNO")}
        {renderKey("7", "PQRS")}
        {renderKey("8", "TUV")}
        {renderKey("9", "WXYZ")}
        {renderKey("*")}
        {renderKey("0", "+")}
        {renderKey("#")}
      </div>
      
      <div className="flex justify-center mt-6">
        {renderKey("call")}
      </div>
      
      <div className="mt-auto pt-4 flex justify-around">
        <button className="flex flex-col items-center opacity-60">
          <Phone size={24} className="text-mobile-accent" />
          <span className="text-xs mt-1 text-mobile-dark font-medium">Teclado</span>
        </button>
        
        <button className="flex flex-col items-center opacity-60">
          <Clock size={24} className="text-mobile-gray" />
          <span className="text-xs mt-1 text-mobile-dark font-medium">Recientes</span>
        </button>
        
        <button className="flex flex-col items-center opacity-60">
          <User size={24} className="text-mobile-gray" />
          <span className="text-xs mt-1 text-mobile-dark font-medium">Contactos</span>
        </button>
      </div>
      
      {/* Mensaje informativo para consultar saldo */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
        <p className="font-medium mb-1">Consulta tu saldo</p>
        <p>Marca 123 para consultar tu saldo actual.</p>
        <p>Saldo: {creditBalance.toFixed(2)} Bs.</p>
      </div>
    </div>
  );
};

export default PhoneApp;
