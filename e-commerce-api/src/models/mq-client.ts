import amqp from 'amqplib';
import { env } from '../environment/environment';

let connection: amqp.Connection;

const publish = async (exchange: string, severity: string, message: any) => {
    if (!connection) connection = await amqp.connect(env.RABBIT_MQ_URL)
    const channel = await connection.createChannel()
    await channel.assertExchange(exchange, 'direct', {
        durable: true,
    });
    channel.publish(exchange, severity, Buffer.from(message));
};

export const rabbitMq = {
    publish
};