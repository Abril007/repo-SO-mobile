
import React, { useEffect, useState } from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { cn } from "@/lib/utils";
import { Phone as PhoneIcon, Power } from "lucide-react";

const BootScreen: React.FC = () => {
  const { isPoweredOn, isBooting } = useMobileOS();
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    if (isPoweredOn && isBooting) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100); // Make it a bit faster
      
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(0);
    }
  }, [isPoweredOn, isBooting]);
  
  if (!isPoweredOn) {
    return (
      <div className="flex-1 flex items-center justify-center h-full bg-black">
        {/* Pantalla completamente apagada */}
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full bg-black">
      <div className={cn(
        "transition-all duration-1000",
        loadingProgress > 20 ? "opacity-100 scale-100" : "opacity-0 scale-50"
      )}>
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8">
          <PhoneIcon size={48} className="text-mobile-accent" />
        </div>
        
        <div className="text-white text-2xl font-light mb-16 text-center">
          MobileOS
        </div>
        
        <div className="w-40 h-1 bg-gray-700 rounded-full mx-auto">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
