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
import { MessageCircle } from "lucide-react";

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
});

type FormType = "basic" | "joinTeam";

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
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

const WhatsAppPopup = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Get in Touch",
  description = "Please provide your details so we can personalize our conversation.",
  formType = "basic",
}: WhatsAppPopupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const schema = formType === "joinTeam" ? joinTeamFormSchema : basicFormSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formType === "joinTeam" ? {
      name: "",
      email: "",
      experience: "",
      skills: [],
      availability: "",
      github: "",
      linkedin: "",
    } : {
      name: "",
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      form.reset();
      setSelectedSkills([]);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
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
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
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
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
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
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${formType === "joinTeam" ? "sm:max-w-[600px]" : "sm:max-w-[425px]"} w-[95vw] max-w-[95vw] mx-4 p-4 sm:p-6 max-h-[90vh] overflow-y-auto`}>
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
            {formType === "joinTeam" ? renderJoinTeamForm() : renderBasicForm()}

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
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPopup;
