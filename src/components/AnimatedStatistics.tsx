import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface StatData {
  name: string;
  value: number;
  color: string;
}

const AnimatedStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    deaths: 0,
    births: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const chartData: StatData[] = [
    { name: 'Maternal Deaths', value: 295000, color: 'hsl(var(--destructive))' },
    { name: 'Total Births', value: 140000000, color: 'hsl(var(--primary))' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 80;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        deaths: Math.floor(295000 * progress),
        births: Math.floor(140000000 * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          deaths: 295000,
          births: 140000000,
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">The Global Challenge</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every day, approximately 800 women die from preventable causes related to pregnancy and childbirth. 
          AfyaJamii leverages AI to bridge this healthcare gap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
        {/* Donut Chart */}
        <Card className="flex items-center justify-center border-primary/20 shadow-lg">
          <CardContent className="p-8">
            <ChartContainer
              config={{
                deaths: { label: 'Maternal Deaths', color: 'hsl(var(--destructive))' },
                births: { label: 'Total Births', color: 'hsl(var(--primary))' },
              }}
              className="h-[350px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={isVisible ? chartData : []}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                                Global Stats
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                                2023 WHO Data
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Animated Statistics */}
        <div className="space-y-6">
          <Card className="border-destructive/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-5xl font-bold text-destructive">
                {animatedValues.deaths.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium text-muted-foreground">
                Maternal deaths annually worldwide
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                ~800 mothers die every day from preventable causes
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-5xl font-bold text-primary">
                {(animatedValues.births / 1000000).toFixed(0)}M
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium text-muted-foreground">
                Total births globally per year
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Every birth deserves safe maternal care
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Source: World Health Organization (WHO), 2023
      </p>
    </section>
  );
};

export default AnimatedStatistics;
