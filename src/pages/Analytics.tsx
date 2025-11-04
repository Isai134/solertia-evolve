import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, TrendingUp, DollarSign, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type AnalyticsMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  hasChart?: boolean;
};

const Analytics = () => {
  const [messages, setMessages] = useState<AnalyticsMessage[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy tu asistente de analytics. Puedes preguntarme sobre revenue, SKUs, meseros y más. Por ejemplo: 'Top 10 SKUs por revenue para store_id=3'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: AnalyticsMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: Connect to your Python backend API
    // const response = await fetch('YOUR_API_URL/manager/ask', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt: input })
    // });

    // Simulated response
    setTimeout(() => {
      const assistantMessage: AnalyticsMessage = {
        role: "assistant",
        content: "Conecta este frontend a tu API de Python en http://localhost:8000/manager/ask para activar el SQL agent y visualizaciones.",
        timestamp: new Date(),
        hasChart: false,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Manager Analytics</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered SQL analytics with natural language queries
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,890</div>
            <p className="text-xs text-primary mt-1">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top SKU
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tacos al Pastor</div>
            <p className="text-xs text-muted-foreground mt-1">1,245 orders this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Store Locations
            </CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Active locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chat */}
      <Card className="h-[600px]">
        <CardHeader>
          <CardTitle>SQL Analytics Agent</CardTitle>
          <CardDescription>
            Ask questions in natural language to query the database
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100%-100px)]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.hasChart && (
                      <div className="mt-3 p-4 bg-background rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          [Chart visualization would appear here]
                        </p>
                      </div>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="h-8 w-8 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <p className="text-sm">Analizando...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Ej: Top 10 SKUs por revenue para store_id=3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading} className="bg-gradient-secondary">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Store Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Store Locations Map</CardTitle>
          <CardDescription>
            Interactive map showing all restaurant locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Connect to API endpoint: /manager/map_data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
