// src/components/DemoRequestPopup.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { MessageCircle, CheckCircle } from "lucide-react";

// ---------------- Schema ----------------
const demoRequestFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone number required"),
  demo: z.string().min(1, "Please select a service"),
  preferredContact: z.string().min(1, "Select a contact method"),
  howHeard: z.string().min(1, "Please select an option"),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must consent before submitting",
  }),
});

type DemoRequestFormValues = z.infer<typeof demoRequestFormSchema>;

// ---------------- Inline Google Form Submit ----------------
const submitToGoogleForm = async (data: DemoRequestFormValues) => {
  const formData = new URLSearchParams();

  formData.append("entry.29456833", data.name);
  formData.append("entry.972921336", data.email);
  formData.append("entry.1163255132", data.phone);
  formData.append("entry.1033293189", data.howHeard);
  formData.append("entry.398675917", data.preferredContact);
  formData.append("entry.843035178", data.consent ? "Yes" : "No");
  formData.append("entry.1138033603", data.demo);

  try {
    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSdVmeRzLwjcp_NgJc0Pqo1NnRmvaZY1mHoqwmQNQ0PDeKmzdA/formResponse",
      {
        method: "POST",
        body: formData,
        mode: "no-cors", // 👈 silent submit, no redirect
      }
    );
    return true;
  } catch (err) {
    console.error("Google Form submission failed:", err);
    return false;
  }
};

// ---------------- Component ----------------
const DemoRequestPopup = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  defaultDemo = "",
  availableDemos = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DemoRequestFormValues) => void;
  title: string;
  description: string;
  defaultDemo?: string;
  availableDemos?: string[];
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoRequestFormValues>({
    resolver: zodResolver(demoRequestFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      demo: defaultDemo,
      preferredContact: "",
      howHeard: "",
      consent: false,
    },
  });

  useEffect(() => {
    if (defaultDemo) form.setValue("demo", defaultDemo);
  }, [defaultDemo, form]);

  const handleSubmit = async (data: DemoRequestFormValues) => {
    const success = await submitToGoogleForm(data);
    if (success) {
      setIsSubmitted(true);
      onSubmit(data);

      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const resetForm = () => {
    form.reset({
      name: "",
      email: "",
      phone: "",
      demo: defaultDemo,
      preferredContact: "",
      howHeard: "",
      consent: false,
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto min-h-[500px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                {title}
              </DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* demo */}
                <FormField
                  control={form.control}
                  name="demo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interested In *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableDemos.map((demo, idx) => (
                            <SelectItem key={idx} value={demo}>
                              {demo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* preferredContact */}
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Phone">Phone</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* howHeard */}
                <FormField
                  control={form.control}
                  name="howHeard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you hear about us? *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select how you heard" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Google Search">Google Search</SelectItem>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* consent */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I consent to being contacted regarding my demo request. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter className="flex gap-2">
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-gradient">
                    Request Demo
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center py-10 min-h-[400px] justify-center">
            <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
            <h3 className="text-xl font-bold mt-4">Thank You!</h3>
            <p className="text-muted-foreground text-center">
              Your demo request has been submitted successfully. We’ll get back to you soon!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestPopup;
