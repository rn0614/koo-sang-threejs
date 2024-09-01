import { render, screen, waitFor } from "@testing-library/react";
import TestingPage from "@/app/music/(header)/page";
import QueryClientProvider from "@/providers/QueryClientProvider";
import UserProvider from "@/providers/UserProvider";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@supabase/ssr", () => ({
  createBrowserClient: jest.fn(),
}));

test("testing test", async () => {
  render(
    <QueryClientProvider>
      <UserProvider>
        <TestingPage />
      </UserProvider>
    </QueryClientProvider>
  );
  
  const myElem = await screen.findByText("string");

  await waitFor(() => expect(myElem).toBeInTheDocument());
});