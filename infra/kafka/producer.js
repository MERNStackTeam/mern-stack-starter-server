const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092'], // Adjust the Kafka broker(s) as needed
});

const producer = kafka.producer();

async function runProducer() {
  await producer.connect();
  await producer.send({
    topic: 'my-topic', // Use the topic you created
    messages: [
      { value: 'Hello, Kafka!' },
    ],
  });
  await producer.disconnect();
}

runProducer().catch(console.error);
