// nurturetrips-service/infra/kafka.js

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'your-client-id',
  brokers: ['kafka-broker-url'], // Update with your Kafka broker(s)
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'your-consumer-group' });

async function initKafka() {
  await producer.connect();
  await consumer.connect();

  // Producer error handling
  producer.on('producer.unhandledError', (error) => {
    console.error('Producer error:', error);
  });

  // Consumer error handling
  consumer.on('consumer.crash', (error) => {
    console.error('Consumer error:', error);
  });

  // Subscribe to Kafka topics
  await consumer.subscribe({ topic: 'your-topic-name' }); // Replace with your topic

  // Set up a message handler for the consumer
  await consumer.run({
    eachMessage: async({ message }) => {
      // Process the received message
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}

module.exports = {
  producer,
  consumer,
  initKafka,
};
