import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VitalsResponse } from '@/lib/api';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface RiskAssessmentProps {
  data: VitalsResponse;
}

const RiskAssessment = ({ data }: RiskAssessmentProps) => {
  const riskLevel = data.ml_output.risk_label.toLowerCase();
  const probability = Math.round(data.ml_output.probability * 100);

  const getRiskColor = () => {
    if (riskLevel.includes('high')) return 'bg-destructive text-destructive-foreground';
    if (riskLevel.includes('medium') || riskLevel.includes('moderate')) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  const getRiskIcon = () => {
    if (riskLevel.includes('high')) return <AlertCircle className="h-5 w-5" />;
    if (riskLevel.includes('medium') || riskLevel.includes('moderate')) return <AlertTriangle className="h-5 w-5" />;
    return <CheckCircle className="h-5 w-5" />;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getRiskIcon()}
            Risk Assessment Results
          </CardTitle>
          <CardDescription>
            Based on your submitted vitals - {new Date(data.timestamp).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Level:</span>
            <Badge className={getRiskColor()}>
              {data.ml_output.risk_label}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Confidence:</span>
              <span className="font-medium">{probability}%</span>
            </div>
            <Progress value={probability} className="h-2" />
          </div>
          
          <div className="space-y-2 pt-2">
            <h4 className="text-sm font-semibold">Key Health Indicators:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(data.ml_output.feature_importances)
                .sort(([, a], [, b]) => b - a)
                .map(([feature, importance]) => (
                  <div key={feature} className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{feature}</span>
                      <span className="font-medium">{Math.round(importance * 100)}%</span>
                    </div>
                    <Progress value={importance * 100} className="h-1" />
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Health Advice</CardTitle>
          <CardDescription>
            Personalized recommendations from Afya Jamii AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
            {data.llm_advice.advice}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;
