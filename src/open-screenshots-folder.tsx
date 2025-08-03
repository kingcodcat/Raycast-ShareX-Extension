import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import * as path from "path";

const execAsync = promisify(exec);

interface Preferences {
  screenshotsPath: string;
}

export default async function Command() {
  const preferences: Preferences = getPreferenceValues();
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const folderPath = path.join(preferences.screenshotsPath, `${year}-${month}`);

  try {
    await execAsync(`explorer "${folderPath}"`);
    await showToast({
      style: Toast.Style.Success,
      title: "Opened Screenshots Folder",
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to Open Screenshots Folder",
      message: `Could not open folder: ${folderPath}`,
    });
  }
}
