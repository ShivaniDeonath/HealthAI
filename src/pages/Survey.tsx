import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Upload, FileText, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<string[]>([""]);
  const [image, setImage] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const addSymptomField = () => {
    setSymptoms([...symptoms, ""]);
  };

  const updateSymptom = (index: number, value: string) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      toast({
        title: "Image Uploaded",
        description: "Your image has been successfully uploaded.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Analyzing Your Symptoms",
      description: "Please wait while we process your information...",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 py-8 px-4">
      <div className="container max-w-3xl mx-auto space-y-6 animate-fade-in-up">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/auth")}
          className="gap-2 hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Main Card */}
        <Card className="p-8 shadow-large border-border/50 glass-effect">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Health Assessment</h1>
              <p className="text-muted-foreground">
                Help us understand your symptoms to provide accurate recommendations
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Symptoms Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Current Symptoms
                </Label>
                
                {symptoms.map((symptom, index) => (
                  <div key={index} className="space-y-2">
                    <Input
                      placeholder={`Symptom ${index + 1} (e.g., headache, fever, cough)`}
                      value={symptom}
                      onChange={(e) => updateSymptom(index, e.target.value)}
                      className="h-12"
                      required={index === 0}
                    />
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSymptomField}
                  className="w-full border-dashed hover:border-primary hover:text-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Symptom
                </Button>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Upload Image (Optional)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Upload a photo of any visible symptoms (rash, injury, etc.)
                </p>
                
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {image ? image.name : "Click to upload image"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold" htmlFor="additional-info">
                  Additional Information
                </Label>
                <Textarea
                  id="additional-info"
                  placeholder="Any other details about your symptoms, duration, or medical history..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Past Records Integration Note */}
              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-secondary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Past Records Integration</p>
                    <p className="text-sm text-muted-foreground">
                      Our AI will analyze your past medical records (if available) 
                      to provide more accurate recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-14 text-lg gradient-primary hover:opacity-90 text-primary-foreground shadow-medium"
              >
                Analyze Symptoms
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
