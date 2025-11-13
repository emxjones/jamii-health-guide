import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StatData {
  name: string;
  value: number;
  color: string;
}

const AnimatedStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    deaths: 0,
    lowResource: 0,
    newborn: 0,
    preventable: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const chartData: StatData[] = [
    { name: 'Maternal Deaths', value: 295000, color: 'hsl(var(--primary))' },
    { name: 'Newborn Deaths', value: 2400000, color: 'hsl(var(--secondary))' },
    { name: 'Lives Saved', value: 5000000, color: 'hsl(var(--accent))' },
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
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        deaths: Math.floor(295000 * progress),
        lowResource: Math.floor(94 * progress),
        newborn: Math.floor(2.4 * progress * 10) / 10,
        preventable: Math.floor(66 * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          deaths: 295000,
          lowResource: 94,
          newborn: 2.4,
          preventable: 66,
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Donut Chart */}
        <Card className="flex items-center justify-center">
          <CardContent className="p-6">
            <ChartContainer
              config={{
                deaths: { label: 'Maternal Deaths', color: 'hsl(var(--primary))' },
                newborn: { label: 'Newborn Deaths', color: 'hsl(var(--secondary))' },
                saved: { label: 'Lives Saved', color: 'hsl(var(--accent))' },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Animated Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">
                {animatedValues.deaths.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Maternal deaths annually worldwide</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">
                {animatedValues.lowResource}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Deaths in low-resource settings</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">
                {animatedValues.newborn.toFixed(1)}M
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Newborn deaths in first month</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">
                {animatedValues.preventable}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Preventable with proper care</p>
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
