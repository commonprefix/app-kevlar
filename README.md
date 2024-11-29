# Kevlar Desktop App

This is a desktop tray app build with Electron. It allows you to start the
[kevlar](https://github.com/commonprefix/kevlar)
light client, integrate it with your Metamask wallet and view the logs.

## Building and Running Locally

1. **Install Dependencies**:  
   Ensure you have Node.js and Yarn installed. Then, run the following command to install the necessary dependencies:
   ```bash
   yarn
   ```

2. **Start the Development Server**:  
   To start the app in development mode, use:
   ```bash
   yarn dev
   ```
   This will launch the app in a new tray icon in your system tray.

## Building for Production

1. **Package for Different Operating Systems**:  
   Use the following commands to build the app for different operating systems:

   - **Windows**:
     ```bash
     yarn dist:win
     ```

   - **macOS**:
     ```bash
     yarn dist:mac
     ```

   - **Linux**:
     ```bash
     yarn dist:linux
     ```

   These commands will generate the respective installers for each OS in the `dist` directory.
