import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, Send, Mic, MicOff, ThumbsUp, ThumbsDown, 
  Activity, Bot, User as UserIcon
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isEmergency = searchParams.get("emergency") === "true";
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: isEmergency 
        ? "🚨 Emergency Mode Activated. Please describe your emergency situation clearly. I'm here to help immediately."
        : "Hello! I'm your AI health assistant. How can I help you today? You can describe your symptoms or ask any health-related questions.",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your symptoms, I recommend the following steps...",
        "I understand. Let me help you with that. Could you tell me more about...",
        "That sounds concerning. Here's what you should do immediately...",
      ];
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: isEmergency 
          ? "I've analyzed your emergency situation. Here are immediate steps to take: 1) Stay calm, 2) Call emergency services if needed, 3) Follow these first-aid instructions..."
          : responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "Voice Assistant Activated",
        description: "Listening... Speak now",
      });
    } else {
      toast({
        title: "Voice Assistant Stopped",
        description: "Processing your voice input...",
      });
    }
  };

  const handleFeedback = (helpful: boolean) => {
    toast({
      title: helpful ? "Thank you!" : "Feedback Received",
      description: helpful 
        ? "Your feedback helps us improve our recommendations" 
        : "We'll work on providing better assistance",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex flex-col">
      {/* Header */}
      <div className="border-b border-border glass-effect">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="gap-2 hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold">AI Health Assistant</h2>
                  <p className="text-xs text-muted-foreground">
                    {isEmergency ? "🚨 Emergency Mode" : "Online • Always here to help"}
                  </p>
                </div>
              </div>
            </div>
            
            {isEmergency && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emergency/10 border border-emergency/20 animate-emergency-pulse">
                <Activity className="h-4 w-4 text-emergency" />
                <span className="text-sm font-medium text-emergency">Emergency Active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="container max-w-4xl mx-auto px-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in-up ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <Card className={`p-4 max-w-[80%] ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card"
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === "user" 
                    ? "text-primary-foreground/70" 
                    : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
                
                {message.role === "assistant" && message.id > 1 && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">Was this helpful?</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleFeedback(true)}
                      className="h-7 px-2"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleFeedback(false)}
                      className="h-7 px-2"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </Card>
              
              {message.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-4 w-4 text-secondary" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 animate-fade-in-up">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <Card className="p-4">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border glass-effect">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant={isListening ? "default" : "outline"}
              onClick={toggleVoice}
              className={isListening ? "bg-emergency animate-emergency-pulse" : ""}
            >
              {isListening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? "Listening..." : "Type your message..."}
              disabled={isListening}
              className="h-12"
            />
            
            <Button
              onClick={handleSend}
              size="icon"
              className="h-12 w-12 gradient-primary hover:opacity-90"
              disabled={!input.trim() || isListening}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            AI responses are for informational purposes only. Consult a healthcare professional for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
