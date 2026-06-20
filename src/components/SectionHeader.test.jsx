import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeader from "@/components/SectionHeader";

describe("SectionHeader", () => {
  it("renders the title and label", () => {
    render(<SectionHeader number="02" label="What I build" title="Selected Work" />);
    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(screen.getByText("What I build")).toBeInTheDocument();
  });
});
