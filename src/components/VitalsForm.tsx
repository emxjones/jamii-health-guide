import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { api, VitalsResponse } from '@/lib/api';
import { Activity } from 'lucide-react';

interface VitalsFormProps {
  onSubmitSuccess: (data: VitalsResponse) => void;
}

const VitalsForm = ({ onSubmitSuccess }: VitalsFormProps) => {
  const [vitals, setVitals] = useState({
    Age: '',
    SystolicBP: '',
    DiastolicBP: '',
    BS: '',
    BodyTemp: '',
    HeartRate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericVitals = {
      Age: parseFloat(vitals.Age),
      SystolicBP: parseFloat(vitals.SystolicBP),
      DiastolicBP: parseFloat(vitals.DiastolicBP),
      BS: parseFloat(vitals.BS),
      BodyTemp: parseFloat(vitals.BodyTemp),
      HeartRate: parseFloat(vitals.HeartRate),
    };

    if (Object.values(numericVitals).some(isNaN)) {
      toast({
        title: "Error",
        description: "Please fill in all fields with valid numbers",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.submitVitals(numericVitals, token!);
      toast({
        title: "Success",
        description: "Vitals submitted successfully",
      });
      onSubmitSuccess(response);
      setVitals({
        Age: '',
        SystolicBP: '',
        DiastolicBP: '',
        BS: '',
        BodyTemp: '',
        HeartRate: '',
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit vitals",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Submit Your Vitals
        </CardTitle>
        <CardDescription>
          Enter your current health measurements for AI-powered risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                step="1"
                value={vitals.Age}
                onChange={(e) => setVitals({ ...vitals, Age: e.target.value })}
                placeholder="e.g., 28"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
              <Input
                id="systolic"
                type="number"
                step="1"
                value={vitals.SystolicBP}
                onChange={(e) => setVitals({ ...vitals, SystolicBP: e.target.value })}
                placeholder="e.g., 120"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
              <Input
                id="diastolic"
                type="number"
                step="1"
                value={vitals.DiastolicBP}
                onChange={(e) => setVitals({ ...vitals, DiastolicBP: e.target.value })}
                placeholder="e.g., 80"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bs">Blood Sugar (mmol/L)</Label>
              <Input
                id="bs"
                type="number"
                step="0.1"
                value={vitals.BS}
                onChange={(e) => setVitals({ ...vitals, BS: e.target.value })}
                placeholder="e.g., 5.5"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temp">Body Temperature (°C)</Label>
              <Input
                id="temp"
                type="number"
                step="0.1"
                value={vitals.BodyTemp}
                onChange={(e) => setVitals({ ...vitals, BodyTemp: e.target.value })}
                placeholder="e.g., 36.5"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hr">Heart Rate (bpm)</Label>
              <Input
                id="hr"
                type="number"
                step="1"
                value={vitals.HeartRate}
                onChange={(e) => setVitals({ ...vitals, HeartRate: e.target.value })}
                placeholder="e.g., 72"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Submit Vitals"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VitalsForm;
