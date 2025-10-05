import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, CheckCircle } from "lucide-react";
import { submitToGoogleForm } from "@/lib/googleFormSubmission";

const pricingPlanFormSchema = z.object({
  name: z.string().min(1, {
    message: "Full Name is required.",
  }).refine((val) => val.trim().length > 0, {
    message: "Full Name cannot be empty or just whitespace.",
  }),
  email: z.string().min(1, {
    message: "Email Address is required.",
  }).email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Phone Number is required.",
  }),
  planInterested: z.string().min(1, {
    message: "Please select a plan.",
  }),
  preferredContact: z.string().min(1, {
    message: "Please select your preferred contact method.",
  }),
  howHeard: z.string().min(1, {
    message: "Please select how you heard about us.",
  }),
  consent: z.boolean().refine((val) => val, {
    message: "You must consent to proceed.",
  }),
});

type PricingPlanFormValues = z.infer<typeof pricingPlanFormSchema>;

interface PricingPlanPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PricingPlanFormValues) => void;
  title: string;
  description: string;
  defaultPlan?: string;
}

const PricingPlanPopup = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  defaultPlan = ""
}: PricingPlanPopupProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<PricingPlanFormValues>({
    resolver: zodResolver(pricingPlanFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      planInterested: defaultPlan,
      preferredContact: "",
      howHeard: "",
      consent: false,
    },
  });

  // Update the plan field when defaultPlan changes
  useEffect(() => {
    if (defaultPlan) {
      form.setValue("planInterested", defaultPlan);
    }
  }, [defaultPlan, form]);

  const handleSubmit = async (data: PricingPlanFormValues) => {
    setIsSubmitted(true);
    try {
      const success = await submitToGoogleForm(data, 'pricingPlan');
      if (success) {
        onSubmit(data);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting pricing plan form:', error);
      setIsSubmitted(false);
      // You could add error state here if needed
    }
  };

  const resetForm = () => {
    form.reset({
      name: "",
      email: "",
      phone: "",
      planInterested: defaultPlan,
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

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              Your inquiry has been submitted successfully. We'll get back to you soon!
            </p>
            <Button
              onClick={handleClose}
              className="mt-4 btn-gradient"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="planInterested"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Interested In *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Small Plan">Small Plan</SelectItem>
                      <SelectItem value="Medium Plan">Medium Plan</SelectItem>
                      <SelectItem value="Large Plan">Large Plan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Method *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred contact" />
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

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      I consent to being contacted regarding my inquiry. *
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
                Submit Inquiry
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PricingPlanPopup;
