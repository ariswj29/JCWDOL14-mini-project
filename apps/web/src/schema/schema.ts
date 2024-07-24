import * as yup from 'yup';

export const usersSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  roleId: yup.string().required('Role is required'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .when('$isEdit', (isEdit, schema) =>
      isEdit ? schema.optional() : schema.required('Password is required'),
    ),
  address: yup.string().required('Address is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
});

export const eventSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(50, 'Name must be at most 100 characters long'),

  image: yup
    .mixed()
    .test('fileSize', 'The file is too large', (value: any) => {
      if (!value || !value.length) return true;
      return value[0].size <= 2000000;
    })
    .test('fileType', 'Unsupported File Format', (value: any) => {
      if (!value || !value.length) return true;
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    }),

  isFree: yup.boolean().required('isFree is required'),

  price: yup.number().when('isFree', {
    is: false,
    then: (schema) =>
      schema
        .required('Price is required')
        .min(1, 'Price must be greater than 0'),
    otherwise: (schema) => schema.notRequired(),
  }),

  date: yup
    .date()
    .required('Date is required')
    .min(new Date(), 'Date must be in the future'),

  time: yup
    .string()
    .required('Time is required')
    .matches(/^([01]\d|2[0-3]).([0-5]\d)$/, 'Time must be in the format HH.mm'),

  location: yup
    .string()
    .required('Location is required')
    .max(100, 'Location must be at most 255 characters long'),

  description: yup
    .string()
    .required('Description is required')
    .max(5000, 'Description must be at most 5000 characters long'),

  availableSeats: yup
    .string()
    .required('Available seats are required')
    .min(1, 'There must be at least one available seat'),

  categoryId: yup.string().required('Category is required'),

  userId: yup.string().required('User ID is required'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const orderTicketSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  address: yup.string().required('Address is required'),
});
