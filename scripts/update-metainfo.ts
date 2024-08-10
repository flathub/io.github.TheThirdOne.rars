// deno-lint-ignore-file no-explicit-any
/**
 * @file Deno script to update `io.github.TheThirdOne.rars.metainfo.xml`
 */

import { escape } from "@std/html";
import { join } from "@std/path";
import { parse, stringify } from "@libs/xml";

/**
 * Process the description
 * @param description Description to process
 * @returns Processed description
 */
const processDescription = (description: string) => {
  // Remove links
  description = description.replaceAll(/\w+:\/\/[^\s)]+/g, "");

  // Trim the description
  description = description.trim();

  // Truncate to 1000 characters
  if (description.length > 1000) {
    description = description.slice(0, 997) + "...";
  }

  // Escape the description
  return escape(description);
}
// Read the metainfo file
const metainfoPath = join(
  import.meta.dirname!,
  "..",
  "io.github.TheThirdOne.rars.metainfo.xml"
);
const metainfo = parse(await Deno.readTextFile(metainfoPath));

// Get the releases
const releasesRes = await fetch(
  "https://api.github.com/repos/TheThirdOne/rars/releases"
);
const releases = await releasesRes.json();

// Update the metainfo
(metainfo["component"] as Record<string, any>)["releases"]["release"] = releases
  .filter((release: Record<string, any>) => !release.prerelease && !release.draft && release.tag_name.match(/^v\d+\.\d+(?:\.\d+)?$/))
  .map((release: Record<string, any>) => ({
    "@version": release.tag_name,
    "@date": release.published_at,
    description: {
      p: processDescription(release.body),
    },
    url: release.html_url,
  }));

// Write the updated metainfo file
await Deno.writeTextFile(metainfoPath, stringify(metainfo));
