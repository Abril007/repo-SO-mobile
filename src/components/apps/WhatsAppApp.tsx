
import React, { useState, useRef, useEffect } from "react";
import { useMobileOS } from "@/context/MobileOSContext";
import { Send, User, Clock, ArrowLeft, Users, Phone, Video } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const WhatsAppApp: React.FC = () => {
  const { creditBalance } = useMobileOS();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy el asistente de WhatsApp. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Verificar saldo
    if (creditBalance <= 0) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "No tienes saldo suficiente para enviar mensajes. Recarga saldo marcando al 123.",
        isUser: false,
        timestamp: new Date()
      }]);
      return;
    }
    
    // Enviar mensaje
    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Respuesta del bot después de 1 segundo
    setTimeout(() => {
      let botResponse = "";
      
      // Lógica simple de bot
      const lowercaseMsg = newMessage.toLowerCase();
      
      if (lowercaseMsg.includes("hola") || lowercaseMsg.includes("saludos")) {
        botResponse = "¡Hola! ¿Cómo estás hoy?";
      } else if (lowercaseMsg.includes("adios") || lowercaseMsg.includes("chao")) {
        botResponse = "¡Hasta luego! Ha sido un placer charlar contigo.";
      } else if (lowercaseMsg.includes("gracias")) {
        botResponse = "¡De nada! Estoy aquí para ayudarte.";
      } else if (lowercaseMsg.includes("hora")) {
        botResponse = `La hora actual es ${new Date().toLocaleTimeString()}`;
      } else {
        botResponse = "Entiendo. ¿Hay algo más en lo que pueda ayudarte?";
      }
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-mobile-accent text-white p-4">
        <div className="flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
              <User size={20} />
            </div>
            <div>
              <div className="font-medium">Asistente</div>
              <div className="text-xs">En línea</div>
            </div>
          </div>
          <div className="ml-auto flex space-x-4">
            <Video size={20} />
            <Phone size={20} />
          </div>
        </div>
      </div>
      
      {/* Chat */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto" style={{ backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABoSURBVDhP7dLBCcAgEERR08jGFVyzF5PesglbXYQJhBw8OPjz4RjGWVx8hciZUF0jIkXxvnDK7E+OqUIfDrw3+gT27qAH/8PwJxx4b/QJ7N1BD8MvRK+Ntm5LbvSJYch7o70jwz2/4AIjrxX2Qk2FpwAAAABJRU5ErkJggg==')" }}>
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-3 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isUser 
                  ? 'bg-green-100 rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div className="text-right text-xs text-gray-500 mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      
      {/* Input */}
      <div className="bg-white p-3 flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 rounded-full px-4 py-2 bg-gray-100 focus:outline-none"
          placeholder="Escribe un mensaje"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button 
          className="w-10 h-10 rounded-full bg-mobile-accent flex items-center justify-center text-white"
          onClick={handleSendMessage}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppApp;
