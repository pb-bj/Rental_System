import { differenceInYears, parseISO } from 'date-fns';

// export const validateCarDetails = ({ brand, model, plateNo, seats, mileage, price, carTypes, image }) => {
//    const errors = {};

//    if(!brand) { errors.brand = '* Brand field is required '}
//    if(!model ) { errors.model = '* Model field is required' }
//    if(!carTypes ) { errors.carTypes = '* Types field is required' }
//    if(!plateNo ) { errors.plateNo = '* Plate Number field is required' }
//    if(!Number(seats) ) { errors.seats = '* Seats field is required' }
//    if(!Number(mileage) ) { errors.mileage = '* Mileage field is required' }
//    if(!Number(price) ) { errors.price = '* Price field is required' }
//    if(!image) { errors.image = '* Image field is required' }

//    return errors;
// }


export const validateBooking = (data) => {
  const errors = {};

  if (!data.tripStartDate) {
    errors.tripStartDate = '*Trip Start date is required';
  }  else if (!isValidDate(data.tripStartDate)) {
        errors.tripStartDate = '* Trip Start Date must be a valid date';
  }
  
   // for tripEndDate
    if (!data.tripEndDate) {
        errors.tripEndDate = '* Trip End Date is required';
    } else if (!isValidDate(data.tripEndDate)) {
        errors.tripEndDate = '* Trip End Date must be a valid date';
    } else if (new Date(data.tripEndDate) < new Date(data.tripStartDate)) {
        errors.tripEndDate = '* Trip End Date cannot be before Trip Start Date';
    }

    // for pickupLocation
    if (!data.pickupLocation) {
        errors.pickupLocation = '* Pickup & Return Location is required';
  }

    return errors;
}


export const bookingValidation = (data) => {
  const errors = {};

   if (!data.dob) {
    errors.dob = '* Date of Birth is required';
  } else if (!isISO8601(data.dob)) {
    errors.dob = '* Invalid date format. Date of Birth must be in ISO 8601 format (YYYY-MM-DD)';
  } else {
    // Parse the date string to Date object
    const dobDate = parseISO(data.dob);

    if (isNaN(dobDate.getTime())) {
      errors.dob = '* Invalid date format. Date of Birth must be a valid date.';
    } else {
      const age = differenceInYears(new Date(), dobDate);

      if (age < 18) {
        errors.dob = '* Age must be above 18 years.';
      }
    }
  }

  if (!data.gender) {
    errors.gender = '* Gender is required';
  } else if (!['male', 'female'].includes(data.gender.toLowerCase())) {
    errors.gender = '* Invalid gender selection';
  }

  const licenseRegex = /^\d{2}-\d{2}-\d{8}$/;
  if (!data.license) {
    errors.license = '* License Number is required';
  } else if (!licenseRegex.test(data.license)) {
    errors.license = '* License must be in the format xx-xx-xxxxxxxx';
  }
  
  return errors;
}

const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString) && !isNaN(new Date(dateString));
};

const isISO8601 = (dateString) => {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
  return iso8601Regex.test(dateString);
};

// for admin new car validation 
// utils/validateCarDetails.js

export const validateCarDetails = (carDetails) => {
    const errors = {};

    if (!carDetails.brand.trim()) {
        errors.brand = 'Brand is required';
    }

    if (!carDetails.model.trim()) {
        errors.model = 'Model is required';
    }

    if (!carDetails.plateNo.trim()) {
        errors.plateNo = 'Plate number is required';
    }
  
    if (!carDetails.features.trim()) {
        errors.features = 'features is required';
    }

    if (!carDetails.seats || isNaN(carDetails.seats) || carDetails.seats <= 0) {
        errors.seats = 'Seats must be a positive number';
    }

    if (!carDetails.carTypes.trim()) {
        errors.carTypes = 'Car type is required';
    }

    if (!carDetails.mileage || isNaN(carDetails.mileage) || carDetails.mileage < 0) {
        errors.mileage = 'Mileage must be a non-negative number';
    }

    if (!carDetails.price || isNaN(carDetails.price) || carDetails.price < 0) {
        errors.price = 'Price must be a non-negative number';
    }

    if (!carDetails.image) {
        errors.image = 'Image is required';
    }

    return errors;
};


