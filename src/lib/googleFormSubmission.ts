import { z } from "zod";

// Shared Google Form submission utility
export const submitToGoogleForm = async (data: Record<string, any>, formType: string) => {
  const formData = new URLSearchParams();

  // Common fields for all forms
  formData.append('entry.29456833', data.name || '');
  formData.append('entry.972921336', data.email || '');
  formData.append('entry.1163255132', data.phone || '');
  formData.append('entry.1033293189', data.howHeard || '');
  formData.append('entry.398675917', data.preferredContact || '');
  formData.append('entry.843035178', data.consent ? 'Yes' : 'No');

  // Form-specific fields
  if (formType === 'basic') {
    formData.append('entry.1138033603', data.serviceInterested || '');
    formData.append('entry.248014544', data.projectDetails || '');
  } else if (formType === 'joinTeam') {
    formData.append('entry.420083984', data.experience || '');
    formData.append('entry.2027611888', Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || '')); // Primary Skills
    formData.append('entry.260817724', data.availability || ''); // Availability
    formData.append('entry.1102916320', data.github || ''); // GitHub Profile
    formData.append('entry.1987849174', data.linkedin || ''); // LinkedIn Profile
    formData.append('entry.1207402561', data.motivation || ''); // Motivation
  } else if (formType === 'careerService') {
    formData.append('entry.1138033603', data.interest || ''); // Service/Interest Type
  } else if (formType === 'demoRequest') {
    formData.append('entry.1138033603', data.demo || ''); // Service/Interest Type
  } else if (formType === 'pricingPlan') {
    formData.append('entry.1138033603', data.planInterested || ''); // Service/Interest Type
  }

  const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdVmeRzLwjcp_NgJc0Pqo1NnRmvaZY1mHoqwmQNQ0PDeKmzdA/formResponse', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.ok;
};

// Types for form data
export type GoogleFormData = {
  name: string;
  email: string;
  phone: string;
  howHeard: string;
  preferredContact: string;
  consent: boolean;
  serviceInterested?: string;
  projectDetails?: string;
  experience?: string;
  availability?: string;
  github?: string;
  linkedin?: string;
  motivation?: string;
  skills?: string[];
  interest?: string;
  demo?: string;
};
