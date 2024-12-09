import {
  ERROR_DESCRIPTION_EMPTY,
  ERROR_MATE_NAME_EXIST,
  ERROR_NAME_EMPTY,
  ERROR_NAME_LENGTH,
  ERROR_NAME_VALIDATION,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_STANDARD,
} from 'app/constants/validation';

const validateName = (name: string) => {
  if (name.trim() === '') {
    return ERROR_NAME_EMPTY;
  }
  if (!NAME_STANDARD.test(name)) {
    return ERROR_NAME_VALIDATION;
  }
  if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    return ERROR_NAME_LENGTH;
  }
  return '';
};

const validateDescription = (description: string) => {
  if (description.trim() === '') {
    return ERROR_DESCRIPTION_EMPTY;
  }
  return '';
};

const validateMateNameExist = (
  mateName: string,
  existingMateNames: string[]
) => {
  if (existingMateNames.includes(mateName)) {
    return ERROR_MATE_NAME_EXIST;
  }
};

export { validateDescription, validateMateNameExist, validateName };
