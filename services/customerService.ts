import Customer from '../modal/Customer';

export async function findCustomerByMobileNumber(mobile: string) {
  try {
    return await Customer.findOne({
      where: {
        mobile_number: mobile,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: findCustomerByMobileNumber');
  }
}
