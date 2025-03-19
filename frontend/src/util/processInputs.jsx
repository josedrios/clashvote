import validator from 'validator';

export function validateAuthForm(data, showAlert, formType) {
  data.email = data.email?.trim();

  // Empty fields check
  const emptyFields = [];

  if (!data.email) emptyFields.push('Email');
  if (!data.password) emptyFields.push('Password');

  if (formType === 'signup') {
    if (!data.username) emptyFields.push('Username');
    if (!data.age) emptyFields.push('Age Check');
    if (!data.age || data.age !== true) emptyFields.push('Age Check');
    if (!data.tos || data.tos !== true)
      emptyFields.push('Terms of Service agreement');
  }

  if (emptyFields.length > 0) {
    showAlert(`Missing entries for ${emptyFields.join(', ')}`, 'error');
    return false;
  }

  // Username validation
  if (formType === 'signup') {
    if (!usernameCheck(data.username, showAlert)) {
      return false;
    }
  }

  // Email validation
  if (formType === 'signup') {
    if (!emailCheck(data.email, showAlert)) {
      return false;
    }
  }

  // Password validation
  if (formType === 'signup') {
    if (!passwordCheck(data.password, showAlert)) {
      return false;
    }
  }

  return true;
}

export function usernameCheck(username, showAlert) {
  const usernameFaults = [];

  if (!validator.isLength(username, { min: 3 })) {
    usernameFaults.push('less than 3 characters');
  }

  if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
    usernameFaults.push(
      'special characters or spaces (only letters, numbers, underscores, and dots are allowed)'
    );
  }

  if (!validator.isLength(username, { max: 16 })) {
    usernameFaults.push('more than 16 characters');
  }

  if (usernameFaults.length > 0) {
    showAlert(`Your username contains ${usernameFaults.join(', ')}`, 'error');
    return false;
  }

  return true;
}

export function emailCheck(email, showAlert) {
  const emailFaults = [];

  if (!validator.isEmail(email)) {
    emailFaults.push(
      `Please enter a correctly formatted email address (ex. example@domain.com).`
    );
  }

  if (!validator.isLength(email, { max: 254 })) {
    emailFaults.push(`Your email is too long (max 254 characters)`);
  }

  if (emailFaults.length > 0) {
    showAlert(`Email is invalid,  ${emailFaults.join(', ')}`, 'error');
    return false;
  }
  return true;
}

export function passwordCheck(password, showAlert) {
  const passwordFaults = [];

  if (!validator.isLength(password, { min: 8 })) {
    passwordFaults.push('at least 8 characters');
  }

  if (!validator.isLength(password, { max: 64 })) {
    passwordFaults.push('at most 64 characters');
  }

  if (!/[0-9]/.test(password)) {
    passwordFaults.push('at least one number');
  }

  if (!/\W/.test(password)) {
    passwordFaults.push('at least one special character');
  }

  if (/\s/.test(password)) {
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
