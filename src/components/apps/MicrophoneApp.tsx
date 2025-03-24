
import React, { useState, useEffect } from "react";
import { Mic, Square, RotateCcw, Play, Pause, Save } from "lucide-react";
import { cn } from "@/lib/utils";

const MicrophoneApp: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<{id: number, duration: number, date: Date}[]>([]);
  const [selectedRecording, setSelectedRecording] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Efecto para controlar el timer de grabación
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (!isRecording && recordingTime !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    if (recordingTime > 0) {
      setIsRecording(false);
      
      // Agregar nueva grabación
      setRecordings(prev => [
        ...prev, 
        { 
          id: Date.now(), 
          duration: recordingTime,
          date: new Date()
        }
      ]);
      
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayRecording = (id: number) => {
    setSelectedRecording(id);
    setIsPlaying(true);
    
    // Simulación de reproducción
    const recording = recordings.find(rec => rec.id === id);
    if (recording) {
      // Detener la reproducción al finalizar
      setTimeout(() => {
        setIsPlaying(false);
      }, recording.duration * 1000);
    }
  };

  const handleStopPlaying = () => {
    setIsPlaying(false);
    setSelectedRecording(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-purple-50 to-purple-100 p-6">
      {/* Visualizador de audio */}
      <div className="h-32 mb-6 bg-white bg-opacity-70 backdrop-blur-sm rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm">
        {isRecording ? (
          <div className="flex space-x-1 items-end h-24 w-full px-4">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="bg-purple-500 w-1.5 animate-pulse"
                style={{ 
                  height: `${Math.max(15, Math.random() * 100)}%`,
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>
        ) : (
          <div className="text-mobile-gray">
            {selectedRecording !== null && isPlaying ? (
              <div className="flex space-x-1 items-end h-24 w-full px-4">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i}
                    className="bg-blue-500 w-1.5"
                    style={{ 
                      height: `${Math.max(5, Math.random() * 70)}%`
                    }}
                  ></div>
                ))}
              </div>
            ) : (
              "Presiona el botón para grabar"
            )}
          </div>
        )}
        
        {isRecording && (
          <div className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full flex items-center space-x-1">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs text-white font-medium">REC</span>
          </div>
        )}
      </div>
      
      {/* Tiempo de grabación */}
      <div className="text-center mb-8">
        <div className="text-4xl font-light">
          {formatTime(recordingTime)}
        </div>
      </div>
      
      {/* Controles de grabación */}
      <div className="flex justify-center space-x-8 mb-8">
        {!isRecording ? (
          <button
            className="h-16 w-16 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg"
            onClick={handleStartRecording}
          >
            <Mic size={28} />
          </button>
        ) : (
          <button
            className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg"
            onClick={handleStopRecording}
          >
            <Square size={24} />
          </button>
        )}
      </div>
      
      {/* Lista de grabaciones */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="font-semibold text-sm text-mobile-dark mb-2">Grabaciones</h3>
        
        <div className="space-y-2">
          {recordings.length === 0 ? (
            <div className="text-center text-mobile-gray text-sm py-4">
              No hay grabaciones
            </div>
          ) : (
            recordings.map((recording) => (
              <div 
                key={recording.id}
                className={cn(
                  "bg-white bg-opacity-70 backdrop-blur-xs rounded-lg p-3 flex items-center",
                  selectedRecording === recording.id ? "border-2 border-purple-500" : ""
                )}
              >
                <div className="flex-1">
                  <div className="font-medium">
                    Grabación {recording.id.toString().substring(10)}
                  </div>
                  <div className="text-xs text-mobile-gray">
                    {recording.date.toLocaleString()} - {formatTime(recording.duration)}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {selectedRecording === recording.id && isPlaying ? (
                    <button 
                      className="p-2 rounded-full bg-red-500 text-white"
                      onClick={handleStopPlaying}
                    >
                      <Pause size={16} />
                    </button>
                  ) : (
                    <button 
                      className="p-2 rounded-full bg-purple-500 text-white"
                      onClick={() => handlePlayRecording(recording.id)}
                    >
                      <Play size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MicrophoneApp;
