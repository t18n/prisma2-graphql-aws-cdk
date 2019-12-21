import { Photon } from '@prisma/photon';

// Create seeding data
// Only run first time when there is no data
const photon = new Photon();

async function main() {
  const user1 = await photon.users.create({
    data: {
      email: 'harrypotter@turbothinh.com',
      firstName: 'Harry Potter',
      products: {
        create: {
          name: 'YKCKAWFF',
          serialNumber: '73874687725577',
        },
      },
      orders: {
        create: {
          price: 123,
          currency: 'usd',
          status: true,
        },
      },
    },
  });

  const user2 = await photon.users.create({
    data: {
      email: 'me@turbothinh.com',
      firstName: 'Turbo',
      products: {
        create: [
          {
            name: 'H7CZ294E',
            serialNumber: '59296742794472',
          },
          {
            name: 'DXZZFKHK',
            serialNumber: '89648526697659',
          },
        ],
      },
      orders: {
        create: {
          price: 423,
          currency: 'usd',
          status: false,
        },
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
