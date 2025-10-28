import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import BusinessCard from "@/components/BusinessCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  businesses?: any[];
}

const mockResponses: Record<string, any> = {
  tailor: [
    {
      id: "t1",
      name: "Style Republic Boutique",
      category: "Fashion",
      description: "Premium African fashion and contemporary designs for the modern professional.",
      address: "23 Opebi Road, Ikeja, Lagos",
      phone: "+2348098765432",
      whatsapp: "+2348098765432",
      rating: 4.6,
    },
  ],
  food: [
    {
      id: "1",
      name: "Lagos Grill House",
      category: "Restaurant",
      description: "Authentic Nigerian cuisine with a modern twist.",
      address: "15 Admiralty Way, Lekki Phase 1, Lagos",
      phone: "+2348012345678",
      whatsapp: "+2348012345678",
      website: "https://lagosgrill.com",
      rating: 4.8,
    },
  ],
  tech: [
    {
      id: "3",
      name: "TechHub Solutions",
      category: "Technology",
      description: "Complete IT services and digital transformation solutions.",
      address: "45 Herbert Macaulay Way, Yaba, Lagos",
      phone: "+2348087654321",
      whatsapp: "+2348087654321",
      website: "https://techhub.ng",
      rating: 4.9,
    },
  ],
};

const ChatAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Afriyelp AI assistant. I can help you find the perfect business or service. Just tell me what you're looking for!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simple keyword matching (in production, this would use actual AI)
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response: Message;

      if (lowerInput.includes("tailor") || lowerInput.includes("fashion") || lowerInput.includes("clothes")) {
        response = {
          role: "assistant",
          content: "I found some great tailors and fashion businesses for you:",
          businesses: mockResponses.tailor,
        };
      } else if (lowerInput.includes("food") || lowerInput.includes("restaurant") || lowerInput.includes("eat")) {
        response = {
          role: "assistant",
          content: "Here are some excellent restaurants I'd recommend:",
          businesses: mockResponses.food,
        };
      } else if (lowerInput.includes("tech") || lowerInput.includes("it") || lowerInput.includes("computer")) {
        response = {
          role: "assistant",
          content: "I found these tech service providers:",
          businesses: mockResponses.tech,
        };
      } else {
        response = {
          role: "assistant",
          content: "I can help you find businesses in categories like: Food & Dining, Fashion, Technology, Beauty, Automotive, and more. What are you interested in?",
        };
      }

      setMessages((prev) => [...prev, response]);
    }, 500);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Assistant</h1>
          <p className="text-muted-foreground">
            Describe what you need, and I'll help you find it
          </p>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 mb-4 overflow-hidden flex flex-col">
          <CardContent className="p-6 flex-1 overflow-y-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className={`rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                        : "bg-muted max-w-[90%]"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  {message.businesses && message.businesses.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {message.businesses.map((business) => (
                        <BusinessCard key={business.id} {...business} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message... (e.g., 'I need a tailor in Lagos')"
            className="flex-1"
          />
          <Button onClick={handleSend} size="lg">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistantPage;
