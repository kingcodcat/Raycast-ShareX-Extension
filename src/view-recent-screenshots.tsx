import { Action, ActionPanel, Grid, getPreferenceValues, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { exec } from "child_process";
import { readdir, stat } from "fs/promises";
import * as path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

interface Preferences {
  screenshotsPath: string;
}

interface Screenshot {
  name: string;
  path: string;
  createdAt: Date;
}

async function getScreenshots(baseScreenshotsPath: string): Promise<Screenshot[]> {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const monthlyFolderPath = path.join(baseScreenshotsPath, `${year}-${month}`);

    console.log(`[DEBUG] Reading screenshots from specific monthly folder: ${monthlyFolderPath}`);

    try {
        const files = await readdir(monthlyFolderPath);
        const imageFiles = files.filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
        console.log(`[DEBUG] Found ${imageFiles.length} image files in the monthly folder.`);

        if (imageFiles.length === 0) {
            await showToast({ style: Toast.Style.Success, title: "No screenshots found this month." });
            return [];
        }

        const screenshotsWithStats = await Promise.all(
            imageFiles.map(async (file) => {
                const filePath = path.join(monthlyFolderPath, file);
                const stats = await stat(filePath);
                return {
                    name: file,
                    path: filePath,
                    createdAt: stats.ctime,
                };
            })
        );

        const sortedScreenshots = screenshotsWithStats.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        console.log(`[DEBUG] Successfully processed and sorted ${sortedScreenshots.length} screenshots.`);
        return sortedScreenshots;

    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log(`[DEBUG] The folder for the current month does not exist: ${monthlyFolderPath}`);
            await showToast({ style: Toast.Style.Success, title: "No screenshots folder found for this month." });
        } else {
            console.error(`[ERROR] Failed to get screenshots: ${error}`);
            await showToast({
                style: Toast.Style.Failure,
                title: "Failed to Load Screenshots",
                message: error.message,
            });
        }
        return [];
    }
}

export default function Command() {
  const preferences: Preferences = getPreferenceValues();
  const { data: screenshots, isLoading, revalidate } = usePromise(getScreenshots, [preferences.screenshotsPath]);

  async function deleteScreenshot(filePath: string) {
    try {
      await execAsync(`del "${filePath}"`);
      revalidate();
      await showToast({
        style: Toast.Style.Success,
        title: "Screenshot Deleted",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to Delete Screenshot",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <Grid isLoading={isLoading}>
      {screenshots?.map((screenshot) => (
        <Grid.Item
          key={screenshot.path}
          content={{ source: screenshot.path }}
          title={screenshot.name}
          actions={
            <ActionPanel>
              <Action.Open title="Open Screenshot" target={screenshot.path} />
              <Action.ShowInFinder title="Show in Explorer" path={screenshot.path} />
              <Action.CopyToClipboard title="Copy Screenshot" content={{ file: screenshot.path }} />
              <Action
                title="Delete Screenshot"
                icon={Action.Trash}
                onAction={() => deleteScreenshot(screenshot.path)}
                shortcut={{ modifiers: ["ctrl"], key: "d" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
