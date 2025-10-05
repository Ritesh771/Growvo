// lib/googleformsubmission.tsx
export const submitToGoogleForm = async (data: Record<string, any>, formType: string) => {
  console.log('Submitting to Google Form:', { data, formType });
  const formData = new URLSearchParams();

  // Common fields
  formData.append('entry.1281215578', data.name || '');
  formData.append('entry.1544666143', data.email || '');
  formData.append('entry.1323833081', data.phone || '');
  formData.append('entry.397320121', data.howHeard || '');
  formData.append('entry.1834734913', data.preferredContact || '');
  formData.append('entry.1887385685', data.consent ? 'Yes, I consent to being contacted regarding my inquiry' : 'No');

  // Form-specific fields
  if (formType === 'careerService') {
    formData.append('entry.64908277', data.interest || '');
  }

  if (formType === 'basic') {
    formData.append('entry.1786993325', data.serviceInterested || '');
    formData.append('entry.1802830662', data.projectDetails || '');
  }

  if (formType === 'pricingPlan') {
    console.log('Adding pricing plan field:', data.planInterested);
    formData.append('entry.803452891', data.planInterested || '');
  }

  if (formType === 'demoRequest') {
    formData.append('entry.1299762502', data.demo || '');
  }

  if (formType === 'joinTeam') {
    formData.append('entry.150988986', data.experience || '');
    // Handle multiple skills
    if (data.skills && Array.isArray(data.skills)) {
      data.skills.forEach((skill: string) => {
        formData.append('entry.1125528412', skill);
      });
    }
    formData.append('entry.367005104', data.availability || '');
    formData.append('entry.1850187293', data.github || '');
    formData.append('entry.516552343', data.linkedin || '');
    formData.append('entry.707588687', data.motivation || '');
  }

  console.log('Form data to be sent:', Object.fromEntries(formData.entries()));

  try {
    const response = await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSevW4FY7YJFpG1k8d2L055m-ArBy6jauNIQW1SImTeEtwdEFA/formResponse',
      {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // 👈 prevents CORS error
      }
    );

    console.log('Google Form submission response:', response);
    // In no-cors mode we can't read response.ok, so just assume success
    return true;
  } catch (error) {
    console.error('Google Form submission failed:', error);
    return false;
  }
};
