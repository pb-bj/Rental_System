export const validateCarDetails = ({ brand, model, plateNo, seats, mileage, price, carTypes, image }) => {
   const errors = {};

   if(!brand) { errors.brand = '* Brand field is required '};
   if(!model ) { errors.model = '* Model field is required' };
   if(!carTypes ) { errors.carTypes = '* Types field is required' };
   if(!plateNo ) { errors.plateNo = '* Plate Number field is required' };
   if(!Number(seats) ) { errors.seats = '* Seats field is required' };
   if(!Number(mileage) ) { errors.mileage = '* Mileage field is required' };
   if(!Number(price) ) { errors.price = '* Price field is required' };
   if(!image) { errors.image = '* Image field is required' };

   return errors;
}