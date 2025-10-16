import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { api, VitalsResponse, ChatResponse } from '@/lib/api';
import { History, MessageSquare, Activity } from 'lucide-react';

const HistoryView = () => {
  const [vitalsHistory, setVitalsHistory] = useState<VitalsResponse[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { token } = useAuth();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const [vitals, chats] = await Promise.all([
        api.getVitalsHistory(token!),
        api.getConversationsHistory(token!),
      ]);
      setVitalsHistory(vitals);
      setChatHistory(chats);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (riskLabel: string) => {
    const risk = riskLabel.toLowerCase();
    if (risk.includes('high')) return 'bg-destructive text-destructive-foreground';
    if (risk.includes('medium') || risk.includes('moderate')) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Health History
        </CardTitle>
        <CardDescription>
          View your past vitals submissions and chat conversations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vitals">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vitals" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Vitals
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Conversations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vitals">
            <ScrollArea className="h-[400px] pr-4">
              {isLoading ? (
                <p className="text-center text-muted-foreground py-8">Loading...</p>
              ) : vitalsHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No vitals history yet</p>
              ) : (
                <div className="space-y-4">
                  {vitalsHistory.map((vital, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">
                            {new Date(vital.timestamp).toLocaleDateString()}
                          </CardTitle>
                          <Badge className={getRiskColor(vital.ml_output.risk_label)}>
                            {vital.ml_output.risk_label}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          {new Date(vital.timestamp).toLocaleTimeString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Confidence:</span>
                          <span className="font-medium">
                            {Math.round(vital.ml_output.probability * 100)}%
                          </span>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground line-clamp-3">
                            {vital.llm_advice.advice}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="chats">
            <ScrollArea className="h-[400px] pr-4">
              {isLoading ? (
                <p className="text-center text-muted-foreground py-8">Loading...</p>
              ) : chatHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No chat history yet</p>
              ) : (
                <div className="space-y-4">
                  {chatHistory.map((chat, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {new Date(chat.timestamp).toLocaleDateString()}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(chat.timestamp).toLocaleTimeString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-wrap line-clamp-4">
                          {chat.advice}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HistoryView;
