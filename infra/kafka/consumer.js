const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'], // Adjust the Kafka broker(s) as needed
});

const consumer = kafka.consumer({ groupId: 'my-group' });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'my-topic' }); // Subscribe to the same topic

  await consumer.run({
    eachMessage: async({ message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}

runConsumer().catch(console.error);
