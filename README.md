# ShareX Integration for Raycast

This extension integrates the powerful ShareX screen capture and file sharing tool with Raycast, providing seamless access to its features directly from your launcher on Windows.

## ✨ Features

*   **Capture Screen Region**: Instantly trigger ShareX's region capture mode.
*   **Open Screenshots Folder**: Quickly access the folder where ShareX saves your screenshots for the current month.
*   **View Recent Screenshots**: Browse, open, and manage your recent screenshots in a Raycast list view.

## ✅ Prerequisites

Before you begin, ensure you have the following installed and configured:

1.  **Windows OS**: This extension is designed exclusively for Windows.
2.  **ShareX**: The ShareX application must be installed on your system. You can download it from [getsharex.com](https://getsharex.com/).
3.  **Node.js & npm**: Required to install and run the extension from source.

## 🔧 Configuration

After installing the extension, you must configure its preferences in Raycast:

1.  **ShareX Executable Path**: Set the full file path to your `ShareX.exe`.
    *   **Preference Name**: `sharexPath`
    *   **Default Value**: `C:\Program Files\ShareX\ShareX.exe`

2.  **Screenshots Folder Path**: Set the path to the root folder where ShareX stores screenshots.
    *   **Preference Name**: `screenshotsPath`
    *   **Default Value**: `C:\Users\*\Documents\ShareX\Screenshots` (Note: `*` will be your username)

## 📦 Installation

As this extension is not on the Raycast Store, you can install it locally for development and use:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the directory**:
    ```bash
    cd Raycast-ShareX-Extension
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Run in development mode**:
    ```bash
    npm run dev
    ```
    This will launch Raycast with the extension active.

## 🛠️ Commands

This extension provides the following commands:

*   **Capture Screen Region**
    *   Triggers ShareX to start a screen region capture.
    *   This is a `no-view` command, so it runs instantly in the background.

*   **Open Screenshots Folder**
    *   Opens the specific subfolder for the current year and month within your configured screenshots path.
    *   This is a `no-view` command.

*   **View Recent Screenshots**
    *   Displays a list of recent screenshots from your ShareX folder.
    *   You can perform actions on each screenshot, such as opening it or deleting it.
    *   This is a `view` command.

## 📄 License

This project is licensed under the MIT License.

I am not a developer, I understand somethings but this was made with Gemini-cli, a nice bit of vibe coding.
Thanks to Joaolucaswork https://github.com/joaolucaswork/raycast-windows-extension-template/ for the template that this extension uses
