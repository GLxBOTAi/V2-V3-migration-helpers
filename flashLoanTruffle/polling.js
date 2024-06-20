try {
  // Existing code for polling
} catch (err) {
  console.error('PollingBlockTracker encountered an error:', err);
  throw new Error(`PollingBlockTracker - encountered an error while attempting to update the latest block: ${err.message}`);
}

