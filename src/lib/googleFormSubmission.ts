// lib/googleformsubmission.tsx
export const submitToGoogleForm = async (data: Record<string, any>, formType: string) => {
  const formData = new URLSearchParams();

  // Common fields
  formData.append('entry.29456833', data.name || '');
  formData.append('entry.972921336', data.email || '');
  formData.append('entry.1163255132', data.phone || '');
  formData.append('entry.1033293189', data.howHeard || '');
  formData.append('entry.398675917', data.preferredContact || '');
  formData.append('entry.843035178', data.consent ? 'Yes' : 'No');

  // Form-specific fields
  if (formType === 'demoRequest') {
    formData.append('entry.1138033603', data.demo || '');
  }

  try {
    await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSdVmeRzLwjcp_NgJc0Pqo1NnRmvaZY1mHoqwmQNQ0PDeKmzdA/formResponse',
      {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // 👈 prevents CORS error
      }
    );

    // In no-cors mode we can't read response.ok, so just assume success
    return true;
  } catch (error) {
    console.error('Google Form submission failed:', error);
    return false;
  }
};
