import { describe, expect, it } from "vitest";
import * as api from "../main";

describe("public API (2.0)", () => {
  it("drops the status-tone helpers and formatGmtOffsetLabel no app imports", () => {
    for (const name of ["statusTone", "statusVariant", "priorityVariant", "STATUS_TONES", "TONE_VARIANT", "formatGmtOffsetLabel"]) {
      expect(api).not.toHaveProperty(name);
    }
  });

  it("keeps PRIORITY_TONE and StatusBadge, which Artist uses", () => {
    expect(api).toHaveProperty("PRIORITY_TONE");
    expect(api).toHaveProperty("StatusBadge");
  });

  it("exports the spec DataCard (v2), not v1's brand band", () => {
    expect(api).toHaveProperty("DataCard");
  });
});
