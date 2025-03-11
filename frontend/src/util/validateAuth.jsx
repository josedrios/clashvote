import validator from 'validator';

export function validateAuthForm(formData, showAlert, formType) {
  formData.email = formData.email?.trim();

  // EMPTY FIELD CHECKS
  const emptyFields = [];

  if (!formData.email) emptyFields.push('Email');
  if (!formData.password) emptyFields.push('Password');

  if (formType === 'signup') {
    if (!formData.username) emptyFields.push('Username');
    if (!formData.age) emptyFields.push('Age Check');
    if (!formData.age || formData.age !== true) emptyFields.push('Age Check');
    if (!formData.tos || formData.tos !== true)
      emptyFields.push('Terms of Service agreement');
  }

  if (emptyFields.length > 0) {
    showAlert(`Missing entries for ${emptyFields.join(', ')}`, 'error');
    return false;
  }

  // USERNAME VALIDATION CHECK
  if (formType === 'signup') {
    if (!usernameCheck(formData, showAlert)) {
      return false;
    }
  }

  const emailFaults = [];

  // EMAIL VALIDATION CHECK
  if (!validator.isEmail(formData.email)) {
    emailFaults.push(
      `Please enter a correctly formatted email address (ex. example@domain.com).`
    );
  }

  if (!validator.isLength(formData.email, { max: 254 })) {
    emailFaults.push(`Your email is too long (max 254 characters)`);
  }

  if (emailFaults.length > 0) {
    showAlert(`Email is invalid,  ${emailFaults.join(', ')}`, 'error');
    return false;
  }

  // PASSWORD VALIDATION CHECK
  if (formType === 'signup') {
    if (!passwordCheck(formData, showAlert)) {
      return false;
    }
  }

  // IF GIVEN PW FOR LOGIN IS MORE THAN 64 CHARS, CUT EXTRA THEN RUN QUERY (OR INSTANTLY GIVE INVALID PW BANNER)

  return true;
}

export function usernameCheck(formData, showAlert) {
  const usernameFaults = [];

  if (!validator.isLength(formData.username, { min: 3 })) {
    usernameFaults.push('less than 3 characters');
  }

  if (!/^[a-zA-Z0-9_.]+$/.test(formData.username)) {
    usernameFaults.push(
      'special characters (only letters, numbers, underscores, and dots are allowed)'
    );
  }

  if (!validator.isLength(formData.username, { max: 16 })) {
    usernameFaults.push('more than 16 characters');
  }

  if (usernameFaults.length > 0) {
    showAlert(`Your username has ${usernameFaults.join(', ')}`, 'error');
    return false;
  }

  return true;
}

export function passwordCheck(formData, showAlert) {
  const passwordFaults = [];

  if (!validator.isLength(formData.password, { min: 8 })) {
    passwordFaults.push('at least 8 characters');
  }

  if (!validator.isLength(formData.password, { max: 64 })) {
    passwordFaults.push('at most 64 characters');
  }

  if (!/[0-9]/.test(formData.password)) {
    passwordFaults.push('at least one number');
  }

  if (!/\W/.test(formData.password)) {
    passwordFaults.push('at least one special character');
  }

  if (/\s/.test(formData.password)) {
    passwordFaults.push('proper formatting (remove spaces)');
  }

  if (passwordFaults.length > 0) {
    showAlert(
      `Your password does not have ${passwordFaults.join(', ')}`,
      'error'
    );
    return false;
  }

  return true;
}
