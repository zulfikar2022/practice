import Joi from 'joi';

export const studentValidationSchema = Joi.object({
  name: {
    firstName: Joi.string().trim().min(3).max(20).required(),
    middleName: Joi.string().trim(),
    lastName: Joi.string().trim().min(3).max(20).required().messages({
      'string.base': 'last name is a string',
      'any.required': 'last name is required',
    }),
  },
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.base': 'gender must be a string',
    'any.only': 'gender can only be male,female or others',
    'any.required': 'gender field is required',
  }),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.string().isoDate(),
  contactNumber: Joi.string().trim().required().max(14).min(11),
  emergencyContactNumber: Joi.string().required().max(14).min(11),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
  ),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: {
    fathersName: Joi.string().trim().required(),
    fathersOccupation: Joi.string().trim().required(),
    fathersContactNumber: Joi.string().trim().required().max(14).min(11),
    mothersName: Joi.string().trim().required(),
    mothersOccupation: Joi.string().trim().required(),
    mothersContactNumber: Joi.string().trim().required().max(14).min(11),
  },
  localGuardian: {
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required().max(14).min(11),
    address: Joi.string().trim().required(),
  },
  profileImage: Joi.string().uri(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});
