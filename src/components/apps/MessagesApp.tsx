
import React, { useState, useEffect } from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { MessageCircle, Search, Plus, User } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: Date;
  isSystem: boolean;
}

const MessagesApp: React.FC = () => {
  const { creditBalance, rechargeCredit, setCurrentApp } = useMobileOS();
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    // Mensaje inicial
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: "Sistema",
          text: "Bienvenido a la app de mensajes. Marca al 123 para consultar tu saldo o envía 'recarga saldo Xbs' para recargar.",
          time: new Date(),
          isSystem: true
        }
      ]);
    }
  }, [messages.length]);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };
  
  const handleSaldoRequest = () => {
    const newMessage: Message = {
      id: Date.now(),
      sender: "Sistema",
      text: `Tu saldo actual es: ${creditBalance.toFixed(2)} Bs.`,
      time: new Date(),
      isSystem: true
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  // Función para manejar recargas
  const handleRechargeMessage = (amount: number) => {
    if (amount <= 0) return;
    
    rechargeCredit(amount);
    
    const newMessage: Message = {
      id: Date.now(),
      sender: "Sistema",
      text: `Se ha recargado ${amount.toFixed(2)} Bs a tu saldo. Tu nuevo saldo es: ${creditBalance + amount} Bs.`,
      time: new Date(),
      isSystem: true
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  // Parseamos una recarga
  const parseRechargeMessage = (text: string) => {
    try {
      const regex = /recarga saldo (\d+)bs/i;
      const match = text.match(regex);
      
      if (match && match[1]) {
        const amount = parseFloat(match[1]);
        handleRechargeMessage(amount);
      }
    } catch (error) {
      console.error("Error parsing recharge message:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-mobile-accent text-white p-4">
        <h1 className="text-2xl font-semibold">Mensajes</h1>
        <div className="flex items-center mt-4">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full bg-white bg-opacity-20 rounded-full px-4 py-2 pl-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
              placeholder="Buscar mensajes"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
          <button className="ml-3 w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <Plus size={18} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className="bg-white rounded-lg p-4 mb-3 shadow-sm"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                {message.isSystem ? (
                  <MessageCircle size={16} className="text-mobile-accent" />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div>
                <div className="font-medium">{message.sender}</div>
                <div className="text-xs text-gray-500">
                  {formatDate(message.time)} {formatTime(message.time)}
                </div>
              </div>
            </div>
            <div className="text-sm">{message.text}</div>
          </div>
        ))}
        
        {/* Sistema button */}
        <div 
          className="bg-white rounded-lg p-4 mb-3 shadow-sm border-l-4 border-mobile-accent"
          onClick={handleSaldoRequest}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-mobile-accent flex items-center justify-center mr-2 text-white">
              <span className="text-xs font-bold">123</span>
            </div>
            <div>
              <div className="font-medium">Consulta de Saldo</div>
              <div className="text-xs text-gray-500">Toca para consultar</div>
            </div>
          </div>
          <div className="text-sm">Consulta tu saldo actual y recarga cuando lo necesites.</div>
        </div>
        
        {/* Recarga button */}
        <div className="bg-white rounded-lg p-4 mb-3 shadow-sm border-l-4 border-green-500">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-2 text-white">
              <Plus size={16} />
            </div>
            <div>
              <div className="font-medium">Recarga de Saldo</div>
              <div className="text-xs text-gray-500">Formato: "recarga saldo 50bs"</div>
            </div>
          </div>
          <div className="text-sm">Envía un mensaje con el formato "recarga saldo Xbs" donde X es la cantidad a recargar.</div>
          
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[50, 100, 200].map(amount => (
              <button 
                key={amount}
                className="bg-gray-100 rounded-lg py-2 text-center text-sm font-medium"
                onClick={() => handleRechargeMessage(amount)}
              >
                {amount} Bs
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="bg-white border-t border-gray-200 p-4">
        <button 
          className="w-full bg-mobile-accent text-white py-3 rounded-lg font-medium"
          onClick={() => setCurrentApp("WhatsApp")}
        >
          Abrir WhatsApp
        </button>
      </div>
    </div>
  );
};

export default MessagesApp;
