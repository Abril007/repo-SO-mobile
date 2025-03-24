
import React, { useState } from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { 
  HardDrive, 
  Database, 
  Trash2, 
  Image, 
  FileText, 
  Music, 
  Film, 
  Download,
  RefreshCw,
  Cpu
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MemoryApp: React.FC = () => {
  const { 
    internalMemory, 
    setInternalMemory, 
    externalMemory, 
    setExternalMemory,
    ramMemory
  } = useMobileOS();
  
  const [cleaningUp, setCleaningUp] = useState(false);
  const [activeTab, setActiveTab] = useState<'storage' | 'ram'>('storage');
  
  const formatMemory = (used: number, total: number) => {
    return `${used} GB / ${total} GB`;
  };
  
  const getPercentage = (used: number, total: number) => {
    return (used / total) * 100;
  };
  
  const cleanMemory = () => {
    setCleaningUp(true);
    
    setTimeout(() => {
      setInternalMemory({
        ...internalMemory,
        used: Math.max(internalMemory.system + 2, internalMemory.used - 8)
      });
      
      if (externalMemory.installed) {
        setExternalMemory({
          ...externalMemory,
          used: Math.max(2, externalMemory.used - 5)
        });
      }
      
      setCleaningUp(false);
    }, 2000);
  };
  
  const getMemoryColor = (percentage: number) => {
    if (percentage > 90) return "text-mobile-error";
    if (percentage > 70) return "text-mobile-warning";
    return "text-mobile-success";
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-orange-50 to-amber-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Sistema</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'storage' ? 'text-mobile-accent border-b-2 border-mobile-accent' : 'text-gray-500'}`}
          onClick={() => setActiveTab('storage')}
        >
          Almacenamiento
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'ram' ? 'text-mobile-accent border-b-2 border-mobile-accent' : 'text-gray-500'}`}
          onClick={() => setActiveTab('ram')}
        >
          Memoria RAM
        </button>
      </div>
      
      {activeTab === 'storage' ? (
        <>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center mb-2">
              <HardDrive size={24} className="text-mobile-dark mr-2" />
              <h2 className="text-lg font-medium">Almacenamiento interno</h2>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Usado</span>
                <span className={getMemoryColor(getPercentage(internalMemory.used, internalMemory.total))}>
                  {formatMemory(internalMemory.used, internalMemory.total)}
                </span>
              </div>
              <Progress 
                value={getPercentage(internalMemory.used, internalMemory.total)} 
                className="h-2" 
              />
            </div>
            
            <div className="mt-4 bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <FileText size={16} className="text-blue-500 mr-1" />
                <span className="text-sm font-medium">Sistema Operativo</span>
              </div>
              <span className="text-xs text-mobile-gray">{internalMemory.system} GB</span>
              <div className="mt-1 w-full h-1.5 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${(internalMemory.system / internalMemory.total) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Image size={16} className="text-blue-500 mr-1" />
                  <span className="text-sm font-medium">Imágenes</span>
                </div>
                <span className="text-xs text-mobile-gray">12.5 GB</span>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Film size={16} className="text-purple-500 mr-1" />
                  <span className="text-sm font-medium">Videos</span>
                </div>
                <span className="text-xs text-mobile-gray">8.2 GB</span>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Music size={16} className="text-pink-500 mr-1" />
                  <span className="text-sm font-medium">Audio</span>
                </div>
                <span className="text-xs text-mobile-gray">5.3 GB</span>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <FileText size={16} className="text-green-500 mr-1" />
                  <span className="text-sm font-medium">Documentos</span>
                </div>
                <span className="text-xs text-mobile-gray">2.8 GB</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center mb-2">
              <Database size={24} className="text-mobile-dark mr-2" />
              <h2 className="text-lg font-medium">Tarjeta SD</h2>
            </div>
            
            {externalMemory.installed ? (
              <>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Usado</span>
                    <span className={getMemoryColor(getPercentage(externalMemory.used, externalMemory.total))}>
                      {formatMemory(externalMemory.used, externalMemory.total)}
                    </span>
                  </div>
                  <Progress 
                    value={getPercentage(externalMemory.used, externalMemory.total)} 
                    className="h-2" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Image size={16} className="text-blue-500 mr-1" />
                      <span className="text-sm font-medium">Imágenes</span>
                    </div>
                    <span className="text-xs text-mobile-gray">22.3 GB</span>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Download size={16} className="text-orange-500 mr-1" />
                      <span className="text-sm font-medium">Descargas</span>
                    </div>
                    <span className="text-xs text-mobile-gray">15.7 GB</span>
                  </div>
                </div>
                
                <button 
                  className="mt-4 w-full bg-gray-200 text-mobile-dark py-2 rounded-lg flex items-center justify-center"
                  onClick={() => setExternalMemory({ ...externalMemory, installed: false })}
                >
                  <span className="mr-1">Expulsar SD</span>
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-mobile-gray mb-2">No hay tarjeta SD instalada</p>
                <button 
                  className="bg-mobile-accent text-white px-4 py-2 rounded-lg"
                  onClick={() => setExternalMemory({ installed: true, total: 128, used: 45 })}
                >
                  Insertar SD
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center mb-2">
            <Cpu size={24} className="text-mobile-dark mr-2" />
            <h2 className="text-lg font-medium">Memoria RAM</h2>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Usado</span>
              <span className={getMemoryColor(getPercentage(ramMemory.used, ramMemory.total))}>
                {ramMemory.used.toFixed(1)} GB / {ramMemory.total} GB
              </span>
            </div>
            <Progress 
              value={getPercentage(ramMemory.used, ramMemory.total)} 
              className="h-2" 
            />
          </div>
          
          <h3 className="font-medium text-sm mb-2 text-gray-600">Uso por aplicación</h3>
          
          {Object.entries(ramMemory.apps).map(([app, usage]) => (
            <div key={app} className="bg-gray-100 p-3 rounded-lg mb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <Cpu size={16} className="text-mobile-accent" />
                  </div>
                  <span className="text-sm font-medium">{app}</span>
                </div>
                <span className="text-xs font-medium">{usage.toFixed(1)} GB</span>
              </div>
              <div className="mt-2 w-full h-1.5 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-mobile-accent rounded-full" 
                  style={{ width: `${(usage / ramMemory.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <div className="text-sm font-medium mb-1">Memoria disponible</div>
            <div className="text-xs text-mobile-gray">
              {(ramMemory.total - ramMemory.used).toFixed(1)} GB de {ramMemory.total} GB
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-auto">
        <button 
          className={`w-full flex items-center justify-center py-3 px-4 rounded-xl ${
            cleaningUp ? 'bg-gray-200' : 'bg-mobile-accent text-white'
          }`}
          onClick={cleanMemory}
          disabled={cleaningUp}
        >
          {cleaningUp ? (
            <>
              <RefreshCw size={20} className="mr-2 animate-spin" />
              <span>Limpiando...</span>
            </>
          ) : (
            <>
              <Trash2 size={20} className="mr-2" />
              <span>Limpiar almacenamiento</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MemoryApp;
