import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface Preferences {
  sharexPath: string;
}

export default async function Command() {
  const preferences: Preferences = getPreferenceValues();

  try {
    await execAsync(`"${preferences.sharexPath}" -RectangleRegion`);
    await showToast({
      style: Toast.Style.Success,
      title: "Started Region Capture",
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to Start Region Capture",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
