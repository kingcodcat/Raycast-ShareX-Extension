/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** ShareX Executable Path - The full path to your ShareX.exe file */
  "sharexPath": string,
  /** Screenshots Folder Path - The root folder where ShareX saves screenshots */
  "screenshotsPath": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `capture-screen-region` command */
  export type CaptureScreenRegion = ExtensionPreferences & {}
  /** Preferences accessible in the `open-screenshots-folder` command */
  export type OpenScreenshotsFolder = ExtensionPreferences & {}
  /** Preferences accessible in the `view-recent-screenshots` command */
  export type ViewRecentScreenshots = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `capture-screen-region` command */
  export type CaptureScreenRegion = {}
  /** Arguments passed to the `open-screenshots-folder` command */
  export type OpenScreenshotsFolder = {}
  /** Arguments passed to the `view-recent-screenshots` command */
  export type ViewRecentScreenshots = {}
}

