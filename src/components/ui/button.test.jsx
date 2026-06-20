import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Get in touch</Button>);
    expect(screen.getByRole("button", { name: "Get in touch" })).toBeInTheDocument();
  });

  it("renders as a link when asChild", () => {
    render(
      <Button asChild>
        <a href="/x">Go</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("href", "/x");
  });
});
