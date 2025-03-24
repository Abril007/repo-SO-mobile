
import React from "react";
import { 
  Phone, 
  Mic, 
  Camera, 
  Battery, 
  Wifi, 
  HardDrive, 
  LayoutGrid,
  MessageCircle,
  LucideIcon
} from "lucide-react";

type IconType = "Phone" | "Microphone" | "Camera" | "Battery" | "Connectivity" | "Memory" | "Apps" | "WhatsApp" | "Messages";

interface MobileIconProps {
  type: IconType;
  label: string;
  onClick: () => void;
  size?: number;
  className?: string;
}

const iconMap: Record<IconType, LucideIcon> = {
  Phone: Phone,
  Microphone: Mic,
  Camera: Camera,
  Battery: Battery,
  Connectivity: Wifi,
  Memory: HardDrive,
  Apps: LayoutGrid,
  WhatsApp: MessageCircle, // Using MessageCircle for WhatsApp
  Messages: MessageCircle  // Using MessageCircle for Messages too
};

const iconColors: Record<IconType, string> = {
  Phone: "text-green-500",
  Microphone: "text-purple-500",
  Camera: "text-blue-500",
  Battery: "text-yellow-500",
  Connectivity: "text-sky-500",
  Memory: "text-orange-500",
  Apps: "text-indigo-500",
  WhatsApp: "text-green-600",
  Messages: "text-blue-600"
};

const MobileIcon: React.FC<MobileIconProps> = ({ 
  type, 
  label, 
  onClick, 
  size = 24,
  className = ""
}) => {
  const Icon = iconMap[type];
  const colorClass = iconColors[type];

  return (
    <div 
      className={`mobile-app-icon ${className}`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-full ${colorClass} bg-opacity-10`}>
        <Icon size={size} className={colorClass} />
      </div>
      <span className="mt-1 text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default MobileIcon;
