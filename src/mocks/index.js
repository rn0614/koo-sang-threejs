export const mswStart = async () => {
  if (process.env.NODE_ENV === "development") {
    if (typeof window === "undefined") {
      console.log('server mocking start')
      const { server } = await import("../mocks/server");
      server.listen();
    } else {
      console.log('client mocking start')
      const { worker } = await import("../mocks/browser");
      await worker.start();
      console.log('client mocking end')
    }
  }
};
