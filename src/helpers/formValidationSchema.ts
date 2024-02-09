import type { CheckoutFormValidation } from '@components/types';
import { object, string } from 'yup';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^(\d{2}[-\s]?)(\d{3}[-\s]?)(\d{2}[-\s]?){2}$/;
const nameRegex = /^[A-Za-z-']+$/; // Only letters, hyphens and apostrophe allowed

const validateObjectFields = (req: string) => {
  return object({
    label: string().required(req),
    ref: string().required(req),
    value: string().required(req),
  }).test({
    test: (value: any) => {
      return (
        value !== undefined &&
        value.label !== undefined &&
        value.label !== '' &&
        value.ref !== undefined &&
        value.ref !== '' &&
        value.value !== undefined &&
        value.value !== ''
      );
    },
    message: req,
  });
};

const validationSchema = (data: CheckoutFormValidation) => {
  const {
    firstNameReq,
    lastNameReq,
    emailReq,
    validEmail,
    phoneReq,
    validPhone,
    deliveryReq,
    deliveryAreaReq,
    deliveryCityReq,
    postOfficeBranchNumReq,
    paymentReq,
    notesReq,
    firstNameInvalid,
    lastNameInvalid,
  } = data;
  return object().shape({
    firstName: string()
      .trim()
      .required(firstNameReq)
      .matches(nameRegex, firstNameInvalid),
    lastName: string()
      .trim()
      .required(lastNameReq)
      .matches(nameRegex, lastNameInvalid),
    email: string().trim().required(emailReq).matches(emailRegex, validEmail),
    phone: string().trim().required(phoneReq).matches(phoneRegex, validPhone),
    delivery: string().trim().required(deliveryReq),
    deliveryArea: validateObjectFields(deliveryAreaReq),
    deliveryCity: validateObjectFields(deliveryCityReq),
    postOfficeBranchNum: validateObjectFields(postOfficeBranchNumReq),
    payment: string().required(paymentReq),
    notes: string().trim().max(1000, notesReq),
  });
};

export default validationSchema;
