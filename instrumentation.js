const { NodeSDK } = require('@opentelemetry/sdk-node');
const { LangfuseSpanProcessor } = require('@langfuse/otel');

const sdk = new NodeSDK({
    spanProcessors: [
        new LangfuseSpanProcessor({}),
    ],
});

sdk.start();

module.exports = { sdk };

