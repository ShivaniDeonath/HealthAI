import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FloatingChatbot = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/chatbot")}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-wellness shadow-glow hover:scale-110 transition-transform z-50 p-0"
      aria-label="Open AI Assistant"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};

export default FloatingChatbot;
