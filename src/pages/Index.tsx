import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, Shield, Users, Heart, ChevronRight, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Health Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Instant Health Insights &
              <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Trusted Care Connections
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get immediate AI-powered health diagnostics, personalized recommendations, 
              and connect with verified healthcare professionals—all in one platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Emergency Button - Prominent & Animated */}
            <Button
              onClick={() => navigate("/chatbot?emergency=true")}
              size="lg"
              className="h-16 px-10 text-lg font-semibold bg-emergency hover:bg-emergency/90 text-emergency-foreground shadow-glow animate-emergency-pulse group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Activity className="h-6 w-6 animate-pulse" />
                Emergency Assistance
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            {/* Standard CTA */}
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="h-16 px-10 text-lg font-semibold gradient-primary hover:opacity-90 text-primary-foreground shadow-medium hover-lift"
            >
              <span className="flex items-center gap-3">
                Get Started
                <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: "AI Diagnostics",
                description: "Advanced symptom analysis with ML-powered recommendations"
              },
              {
                icon: Shield,
                title: "Trusted Network",
                description: "Verified doctors and healthcare facilities near you"
              },
              {
                icon: Users,
                title: "Community Health",
                description: "Access government schemes and health campaigns"
              },
              {
                icon: Heart,
                title: "24/7 Support",
                description: "Voice-enabled assistant available anytime"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover-lift animate-fade-in-up glass-effect"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
              Trusted by healthcare professionals
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">HIPAA Compliant</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <span className="font-medium">AI-Verified Data</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">10K+ Active Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
