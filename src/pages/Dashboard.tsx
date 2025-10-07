import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Activity, Pill, Video, MapPin, Phone, 
  Calendar, Star, Award, Megaphone, CheckCircle2, AlertCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  rating: number;
  address: string;
  phone: string;
  image: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Mock data
  const diagnosis = {
    condition: "Common Cold with Mild Fever",
    confidence: 87,
    severity: "Low",
  };

  const firstAid = [
    "Rest and stay hydrated",
    "Take over-the-counter pain relievers (acetaminophen or ibuprofen)",
    "Use a humidifier to ease congestion",
    "Gargle with warm salt water for sore throat",
  ];

  const medicines = [
    { name: "Acetaminophen 500mg", dosage: "Every 6 hours" },
    { name: "Vitamin C", dosage: "1000mg daily" },
  ];

  const videos = [
    { title: "Understanding Common Cold: Symptoms & Treatment", channel: "Health Plus", duration: "8:42" },
    { title: "Home Remedies for Cold and Flu", channel: "Dr. Sarah's Clinic", duration: "12:15" },
    { title: "When to See a Doctor for Cold Symptoms", channel: "Medical Insights", duration: "6:30" },
  ];

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Physician",
      qualification: "MD, MBBS",
      experience: "12 years",
      rating: 4.8,
      address: "123 Health St, Medical Center",
      phone: "+1 (555) 123-4567",
      image: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Internal Medicine",
      qualification: "MD, FACP",
      experience: "15 years",
      rating: 4.9,
      address: "456 Care Ave, City Hospital",
      phone: "+1 (555) 234-5678",
      image: "👨‍⚕️",
    },
  ];

  const initiatives = [
    { title: "Free Health Check-up Camp", date: "Dec 15, 2024", location: "Community Center" },
    { title: "Ayushman Bharat Scheme", type: "Government Initiative", description: "Free healthcare coverage" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 py-8 px-4">
      <div className="container max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={() => navigate("/survey")}
            className="gap-2 hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Health Summary */}
        <Card className="p-8 shadow-large border-border/50 glass-effect animate-fade-in-up">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Health Assessment Results</h2>
                <p className="text-muted-foreground">Based on your symptoms and medical history</p>
              </div>
              <Badge 
                variant="outline" 
                className="text-lg py-2 px-4 bg-secondary/10 border-secondary text-secondary"
              >
                {diagnosis.confidence}% Confidence
              </Badge>
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{diagnosis.condition}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary" className="gap-1">
                      {diagnosis.severity === "Low" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {diagnosis.severity} Severity
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* First Aid & Medicine */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-medium hover-lift glass-effect animate-slide-in-right">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">First Aid Steps</h3>
              </div>
              <ul className="space-y-3">
                {firstAid.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-secondary">{index + 1}</span>
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="p-6 shadow-medium hover-lift glass-effect animate-slide-in-right" style={{ animationDelay: '100ms' }}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Recommended Medicines</h3>
              </div>
              <div className="space-y-3">
                {medicines.map((med, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-muted-foreground">{med.dosage}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Video Recommendations */}
        <Card className="p-6 shadow-medium glass-effect">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Educational Videos</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {videos.map((video, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl border border-border hover:border-primary transition-colors cursor-pointer hover-lift"
                >
                  <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium line-clamp-2 mb-1">{video.title}</h4>
                  <p className="text-sm text-muted-foreground">{video.channel}</p>
                  <p className="text-xs text-muted-foreground mt-1">{video.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Doctors & Hospitals */}
        <Card className="p-6 shadow-medium glass-effect">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Recommended Healthcare Providers</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className="p-6 rounded-xl border border-border hover:border-primary transition-all cursor-pointer hover-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{doctor.image}</div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-bold text-lg">{doctor.name}</h4>
                      <p className="text-sm text-primary">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span>•</span>
                        <span>{doctor.experience} exp</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {doctor.phone}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Community Initiatives */}
        <Card className="p-6 shadow-medium glass-effect">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emergency/10 flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-emergency" />
              </div>
              <h3 className="text-xl font-bold">Community Health Initiatives</h3>
            </div>
            <div className="space-y-3">
              {initiatives.map((initiative, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{initiative.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {'date' in initiative && initiative.date}
                        {'type' in initiative && initiative.type}
                      </p>
                      {'location' in initiative && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {initiative.location}
                        </div>
                      )}
                      {'description' in initiative && (
                        <p className="text-sm text-muted-foreground mt-1">{initiative.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Doctor Detail Dialog */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedDoctor?.name}</DialogTitle>
          </DialogHeader>
          {selectedDoctor && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="text-6xl">{selectedDoctor.image}</div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-lg font-semibold text-primary">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.qualification}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{selectedDoctor.rating}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{selectedDoctor.experience}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Clinic Address</p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 gradient-primary text-primary-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="flex-1">
                  💬 Chat Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
