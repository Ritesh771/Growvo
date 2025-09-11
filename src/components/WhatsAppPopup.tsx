import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, CheckCircle } from "lucide-react";
import { submitToGoogleForm } from "@/lib/googleFormSubmission";

const basicFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }).refine((val) => val.trim().length > 0, {
    message: "Name cannot be empty or just whitespace.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }).email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
  serviceInterested: z.string().min(1, {
    message: "Please select a service.",
  }),
  projectDetails: z.string().min(1, {
    message: "Project details are required.",
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

const customQuoteFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }).refine((val) => val.trim().length > 0, {
    message: "Name cannot be empty or just whitespace.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }).email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
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

const joinTeamFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }).refine((val) => val.trim().length > 0, {
    message: "Name cannot be empty or just whitespace.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }).email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
  experience: z.string().min(1, {
    message: "Please select your years of experience.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
  availability: z.string().min(1, {
    message: "Please select your availability.",
  }),
  github: z.string().url({
    message: "Please enter a valid GitHub URL.",
  }).optional().or(z.literal("")),
  linkedin: z.string().url({
    message: "Please enter a valid LinkedIn URL.",
  }).optional().or(z.literal("")),
  motivation: z.string().min(1, {
    message: "Please provide your motivation.",
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

const demoFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }).refine((val) => val.trim().length > 0, {
    message: "Name cannot be empty or just whitespace.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }).email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
  preferredContact: z.string().min(1, {
    message: "Please select your preferred contact method.",
  }),
  howHeard: z.string().min(1, {
    message: "Please select how you heard about us.",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to proceed.",
  }),
});

type FormType = "basic" | "joinTeam" | "demo" | "customQuote";

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  title?: string;
  description?: string;
  formType?: FormType;
}

const SKILL_OPTIONS = [
  "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express.js",
  "Python", "Django", "Flask", "JavaScript", "TypeScript", "HTML/CSS",
  "Tailwind CSS", "MongoDB", "PostgreSQL", "MySQL", "Redis",
  "AWS", "Docker", "Kubernetes", "Git", "REST APIs", "GraphQL",
  "React Native", "Flutter", "Swift", "Kotlin", "Figma", "Adobe XD"
];

const SERVICE_OPTIONS = ["Web Development", "Mobile App Development", "AI/ML", "Career Services", "Other"];

const HOW_HEARD_OPTIONS = ["Social Media", "Email", "Search Engine", "Referral", "Other"];

const PREFERRED_CONTACT_OPTIONS = ["Email", "Phone", "WhatsApp"];

const WhatsAppPopup = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Get in Touch",
  description = "Please provide your details so we can personalize our conversation.",
  formType = "basic",
}: WhatsAppPopupProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const schema = formType === "joinTeam" ? joinTeamFormSchema : formType === "demo" ? demoFormSchema : formType === "customQuote" ? customQuoteFormSchema : basicFormSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formType === "joinTeam" ? {
      name: "",
      email: "",
      phone: "",
      experience: "",
      skills: [],
      availability: "",
      github: "",
      linkedin: "",
      motivation: "",
      preferredContact: "",
      howHeard: "",
      consent: false,
    } : formType === "demo" ? {
      name: "",
      email: "",
      phone: "",
      preferredContact: "",
      howHeard: "",
      consent: false,
    } : formType === "customQuote" ? {
      name: "",
      email: "",
      phone: "",
      preferredContact: "",
      howHeard: "",
      consent: false,
    } : {
      name: "",
      email: "",
      phone: "",
      serviceInterested: "",
      projectDetails: "",
      preferredContact: "",
      howHeard: "",
      consent: false,
    },
  });

  const getDefaultValues = () => {
    if (formType === "joinTeam") {
      return {
        name: "",
        email: "",
        phone: "",
        experience: "",
        skills: [],
        availability: "",
        github: "",
        linkedin: "",
        motivation: "",
        preferredContact: "",
        howHeard: "",
        consent: false,
      };
    } else if (formType === "demo") {
      return {
        name: "",
        email: "",
        phone: "",
        preferredContact: "",
        howHeard: "",
        consent: false,
      };
    } else if (formType === "customQuote") {
      return {
        name: "",
        email: "",
        phone: "",
        preferredContact: "",
        howHeard: "",
        consent: false,
      };
    } else {
      return {
        name: "",
        email: "",
        phone: "",
        serviceInterested: "",
        projectDetails: "",
        preferredContact: "",
        howHeard: "",
        consent: false,
      };
    }
  };

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      const success = await submitToGoogleForm(values, formType);
      if (success) {
        setShowSuccess(true);
        // Success message will stay until user clicks "Close"
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    form.setValue("skills", newSkills);
  };

  const renderBasicForm = () => (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your full name"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Email Address *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Phone Number *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="serviceInterested"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Service Interested In *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SERVICE_OPTIONS.map((service) => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="projectDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Project/Inquiry Details *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your project or inquiry"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Preferred Contact Method *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select preferred contact" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PREFERRED_CONTACT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="howHeard"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">How did you hear about us? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select how you heard" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {HOW_HEARD_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
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
              <FormMessage className="text-xs sm:text-sm" />
            </div>
          </FormItem>
        )}
      />
    </>
  );

  const renderCustomQuoteForm = () => (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your full name"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Email Address *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Phone Number *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Preferred Contact Method *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select preferred contact" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PREFERRED_CONTACT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="howHeard"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">How did you hear about us? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select how you heard" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {HOW_HEARD_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
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
              <FormMessage className="text-xs sm:text-sm" />
            </div>
          </FormItem>
        )}
      />
    </>
  );

  const renderDemoForm = () => (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your full name"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Email Address *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Phone Number *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Preferred Contact Method *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select preferred contact" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PREFERRED_CONTACT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="howHeard"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">How did you hear about us? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select how you heard" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {HOW_HEARD_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
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
                I consent to being contacted regarding my demo request. *
              </FormLabel>
              <FormMessage className="text-xs sm:text-sm" />
            </div>
          </FormItem>
        )}
      />
    </>
  );

  const renderJoinTeamForm = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  className="h-11 sm:h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Email Address *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 sm:h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Phone Number *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="h-11 sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Years of Experience *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                <SelectItem value="1-3 years">1-3 years</SelectItem>
                <SelectItem value="3-5 years">3-5 years</SelectItem>
                <SelectItem value="5-10 years">5-10 years</SelectItem>
                <SelectItem value="10+ years">10+ years</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="availability"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Availability *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="skills"
        render={() => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Primary Skills *</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded-md p-3">
              {SKILL_OPTIONS.map((skill) => (
                <label key={skill} className="flex items-center space-x-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="rounded"
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">GitHub Profile (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/username"
                  className="h-11 sm:h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">LinkedIn Profile (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/in/username"
                  className="h-11 sm:h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="motivation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Motivation *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Why do you want to join our team?"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">Preferred Contact Method *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select preferred contact" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PREFERRED_CONTACT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="howHeard"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base">How did you hear about us? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 sm:h-10">
                  <SelectValue placeholder="Select how you heard" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {HOW_HEARD_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
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
                I consent to being contacted regarding my application. *
              </FormLabel>
              <FormMessage className="text-xs sm:text-sm" />
            </div>
          </FormItem>
        )}
      />
    </>
  );

  const handleDialogChange = (open: boolean) => {
    if (!open && !showSuccess) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className={`${formType === "joinTeam" ? "sm:max-w-[600px]" : "sm:max-w-[425px]"} w-[95vw] max-w-[95vw] mx-4 p-4 sm:p-6 max-h-[90vh] overflow-y-auto`}>
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 animate-pulse" />
            <h3 className="text-lg font-semibold text-center">Thank you!</h3>
            <p className="text-sm text-center text-muted-foreground">
              Your message has been sent successfully. We'll get back to you soon.
            </p>
            <Button
              onClick={() => {
                setShowSuccess(false);
                form.reset(getDefaultValues());
                setSelectedSkills([]);
                onClose();
              }}
              className="mt-4 btn-gradient"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle className="text-lg sm:text-xl">{title}</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base mt-1">
                    {description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
                {formType === "joinTeam" ? renderJoinTeamForm() : formType === "demo" ? renderDemoForm() : formType === "customQuote" ? renderCustomQuoteForm() : renderBasicForm()}

                <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-11 sm:h-10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto h-11 sm:h-10"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPopup;
