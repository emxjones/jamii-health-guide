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
import happyFamily1 from '@/assets/happy-family-1.jpg';
import happyFamily2 from '@/assets/happy-family-2.jpg';

const Index = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const heroImages = [
    { src: pregnantWoman1, alt: 'African pregnant woman in clinic' },
    { src: pregnantWoman2, alt: 'African pregnant woman in garden' },
    { src: happyFamily1, alt: 'Happy African family' },
    { src: happyFamily2, alt: 'African family with newborn' },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="flex justify-center">
            <img src={logo} alt="AfyaJamii Logo" className="h-32 w-32" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">AfyaJamii</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-Powered Maternal Health & Nutrition Platform
            </p>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Your trusted companion for pregnancy and postnatal care, providing personalized health monitoring and expert AI guidance
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Image Carousel Section */}
        <section className="mb-20 max-w-5xl mx-auto">
          <Carousel 
            plugins={[autoplayPlugin.current]}
            className="w-full"
            opts={{ loop: true }}
          >
            <CarouselContent>
              {heroImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-8 text-white">
                        <p className="text-lg md:text-xl font-semibold">
                          {image.alt}
                        </p>
                      </div>
                    </div>
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
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Solution</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI-powered tools designed to ensure safer pregnancies and healthier mothers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <Activity className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Vitals Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your health metrics with AI-powered risk assessment and instant feedback
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI Health Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get personalized nutrition and health advice from our AI assistant anytime
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Risk Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Early identification of health concerns with machine learning analysis
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Personalized Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tailored recommendations based on your unique pregnancy or postnatal journey
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Mothers & Healthcare Providers</h2>
            <p className="text-muted-foreground">Real stories from our community</p>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-primary/20">
                    <CardHeader>
                      <Award className="h-8 w-8 text-primary mx-auto mb-4" />
                      <CardDescription className="text-base italic text-foreground">
                        "{testimonial.content}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
      <footer className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src={logo} alt="AfyaJamii Logo" className="h-12 w-12" />
                <h3 className="text-xl font-bold text-foreground">AfyaJamii</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering mothers with AI-driven health insights for safer pregnancies and healthier families.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">Get Started</Link></li>
                <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Sign In</Link></li>
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health Tips</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Nutrition Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:info@afyajamii.com" className="hover:text-primary transition-colors">info@afyajamii.com</a>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+254700000000" className="hover:text-primary transition-colors">+254 700 000 000</a>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary mt-1" />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AfyaJamii. All rights reserved. Saving lives through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
