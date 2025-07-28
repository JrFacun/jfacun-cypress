import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  id: faker.number.int({ min: 1000, max: 9999 }),
  username: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phone: faker.phone.number('09#########'),
  userStatus: 1
});
