require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
    const client = new MongoClient(process.env.DATABASE_URL);
    try {
        await client.connect();
        const db = client.db(); // Uses the DB name from the connection string
        const plansCollection = db.collection('Plan');

        // Clear existing plans
        await plansCollection.deleteMany({});

        const plans = [
            {
                name: 'FREE',
                maxEvents: 3,
                maxGuestsPerEvent: 50,
                price: 0,
            },
            {
                name: 'PAID',
                maxEvents: 9999999,
                maxGuestsPerEvent: 9999999,
                price: 29.0,
            },
        ];

        const result = await plansCollection.insertMany(plans);
        console.log('Seed successful:');
        console.log(result.insertedIds);
    } catch (error) {
        console.error('Seed failed:', error);
    } finally {
        await client.close();
    }
}

main();
