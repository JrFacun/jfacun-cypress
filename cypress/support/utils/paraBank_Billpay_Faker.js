import { faker } from '@faker-js/faker';

export function billData() {
    
    return{
        payeeName: faker.person.fullName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number('09#########'),
        accountNumber: '1234598231',
        verifyAccountNumber: '1234598231',
        amount: faker.number.int({ min: 10, max: 1000 }),

    };
}