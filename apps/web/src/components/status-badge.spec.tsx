import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("renders the status label and status class", () => {
    const actualMarkup: string = renderToStaticMarkup(createElement(StatusBadge, { status: "completed" }));

    expect(actualMarkup).toContain("completed");
    expect(actualMarkup).toContain("status-completed");
  });
});
