import validator from 'validator';

export function validateAuthForm(formData, showAlert, formType) {
  console.log(formData);

  // EMPTY FIELD CHECKS
  const emptyFields = [];

  if (!formData.email) emptyFields.push('Email');
  if (!formData.password) emptyFields.push('Password');

  if (formType === 'signup') {
    if (!formData.username) emptyFields.push('Username');
    if (!formData.age) emptyFields.push('Age Check');
    if (!formData.tos) emptyFields.push('Terms of Service agreement');
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

  // EMAIL VALIDATION CHECK
  if (!validator.isEmail(formData.email.trim())) {
    showAlert(`'${formData.email}' is not a valid email`, 'error');
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

export function processFormData(formData, showAlert, formType) {
  showAlert(`Information has reached the process function`, 'success');
}

function usernameCheck(formData, showAlert) {
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

function passwordCheck(formData, showAlert) {
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

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
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