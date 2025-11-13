import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Activity, MessageCircle, Shield, Heart, Award, Mail, Phone, MapPin } from 'lucide-react';
import AnimatedStatistics from '@/components/AnimatedStatistics';
import Autoplay from 'embla-carousel-autoplay';
import logo from '@/assets/logo.png';
import pregnantWoman1 from '@/assets/pregnant-woman-1.jpg';
import pregnantWoman2 from '@/assets/pregnant-woman-2.jpg';
import happyFamily2 from '@/assets/happy-family-2.jpg';

const Index = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const heroImages = [pregnantWoman1, pregnantWoman2, happyFamily2];

  const testimonials = [
    {
      name: 'Amina K.',
      role: 'Expecting Mother',
      content: 'AfyaJamii helped me monitor my pregnancy closely. The AI guidance gave me peace of mind throughout my journey.',
    },
    {
      name: 'Grace M.',
      role: 'Postnatal Mother',
      content: 'The risk assessment feature detected early warning signs that my doctor confirmed. This app literally saved my life.',
    },
    {
      name: 'Dr. Sarah O.',
      role: 'Healthcare Provider',
      content: 'AfyaJamii bridges the gap in maternal healthcare access. The AI-powered insights help us reach more mothers in remote areas.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-10 mb-24">
          <div className="flex justify-center animate-fade-in">
            <img src={logo} alt="AfyaJamii Logo" className="h-36 w-36 drop-shadow-lg" />
          </div>
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-6xl font-bold text-foreground tracking-tight">AfyaJamii</h1>
            <p className="text-2xl text-primary font-semibold max-w-3xl mx-auto">
              AI-Powered Maternal Health & Nutrition Platform
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your trusted companion for pregnancy and postnatal care, providing personalized health monitoring and expert AI guidance
            </p>
          </div>
          <div className="flex gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Image Carousel Section */}
        <section className="mb-24 max-w-6xl mx-auto">
          <Carousel 
            plugins={[autoplayPlugin.current]}
            className="w-full"
            opts={{ loop: true }}
          >
            <CarouselContent>
              {heroImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={image} 
                      alt={`Maternal health and care - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        {/* Animated Statistics Section */}
        <AnimatedStatistics />

        {/* Features Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Solution</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI-powered tools designed to ensure safer pregnancies and healthier mothers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <Activity className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Vitals Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Track your health metrics with AI-powered risk assessment and instant feedback
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">AI Health Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get personalized nutrition and health advice from our AI assistant anytime
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Risk Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Early identification of health concerns with machine learning analysis
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Personalized Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tailored recommendations based on your unique pregnancy or postnatal journey
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="mb-24 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Trusted by Mothers & Healthcare Providers</h2>
            <p className="text-lg text-muted-foreground">Real stories from our community</p>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-primary/30 shadow-xl">
                    <CardHeader className="pb-4">
                      <Award className="h-12 w-12 text-primary mx-auto mb-6" />
                      <CardDescription className="text-lg italic text-foreground leading-relaxed px-4">
                        "{testimonial.content}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pt-6 border-t">
                      <p className="font-bold text-lg text-foreground">{testimonial.name}</p>
                      <p className="text-base text-primary mt-1">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src={logo} alt="AfyaJamii Logo" className="h-14 w-14" />
                <h3 className="text-2xl font-bold text-foreground">AfyaJamii</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Empowering mothers with AI-driven health insights for safer pregnancies and healthier families.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-base">
                <li><Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">Get Started</Link></li>
                <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Sign In</Link></li>
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Resources</h4>
              <ul className="space-y-3 text-base">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health Tips</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Nutrition Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4 text-base">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="mailto:info@afyajamii.com" className="hover:text-primary transition-colors">info@afyajamii.com</a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="tel:+254700000000" className="hover:text-primary transition-colors">+254 700 000 000</a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 text-center">
            <p className="text-base text-muted-foreground">
              © {new Date().getFullYear()} AfyaJamii. All rights reserved. Saving lives through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
