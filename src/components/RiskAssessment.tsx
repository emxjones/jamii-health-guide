import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VitalsResponse } from '@/lib/api';
import { AlertCircle, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

interface RiskAssessmentProps {
  data: VitalsResponse;
}

const RiskAssessment = ({ data }: RiskAssessmentProps) => {
  const getRiskColor = (risk: string) => {
    const riskLower = risk.toLowerCase();
    if (riskLower.includes('high')) return 'bg-destructive text-destructive-foreground';
    if (riskLower.includes('medium') || riskLower.includes('moderate')) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  const getRiskIcon = (risk: string) => {
    const riskLower = risk.toLowerCase();
    if (riskLower.includes('high')) return <AlertCircle className="h-4 w-4" />;
    if (riskLower.includes('medium') || riskLower.includes('moderate')) return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  // Parse feature importances if it's a string
  const featureImportances = typeof data.ml_feature_importances === 'string' 
    ? JSON.parse(data.ml_feature_importances)
    : data.ml_feature_importances || {};

  // Format advice text to render bold text
  const formatAdvice = (text: string) => {
    // Split by ** markers and render alternating segments as bold
    const parts = text.split('**');
    return parts.map((part, index) => {
      // Odd indices (1, 3, 5...) are between ** markers, so should be bold
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Risk Assessment Results
          </CardTitle>
          <CardDescription>AI-powered analysis of your vital signs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
              <Badge className={`${getRiskColor(data.ml_risk_label)} flex items-center gap-1 w-fit`}>
                {getRiskIcon(data.ml_risk_label)}
                {data.ml_risk_label}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Confidence</p>
              <p className="text-2xl font-bold">{(data.ml_probability * 100).toFixed(1)}%</p>
            </div>
          </div>

          {Object.keys(featureImportances).length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Key Health Indicators</h4>
              <div className="space-y-2">
                {Object.entries(featureImportances)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([feature, importance]) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{feature}</span>
                          <span className="text-sm text-muted-foreground">
                            {((importance as number) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(importance as number) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Health Advice</CardTitle>
          <CardDescription>Personalized recommendations based on your vitals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-foreground leading-relaxed">
              {formatAdvice(data.ml_risk_label)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;
