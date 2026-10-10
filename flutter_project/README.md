# MindCare – Mental Health and Therapy Chat App
**College Mini-Project for UI Design Using Flutter Lab**

MindCare is a modern, compassionate Android mobile application built with **Flutter and Dart** using **Material 3**. It offers students and users a calming interface with soft lavender, light blue, mint-green, and white hues.

---

## 📱 Features Included
1. **Splash Screen**: Calming logo animation with tagline *"Your mental wellness matters."*
2. **Authentication Flow**: Welcome, Login, and Registration with password visibility toggles, form validation, and clear demo notices.
3. **Home Dashboard**: Personalized greetings, daily wellness thought/affirmation, quick navigation cards, and upcoming consultation preview.
4. **Therapist Directory**: Specialist cards with ratings, experience, approaches, filter chips (Anxiety, Relationships, Depression, Burnout), and detail modal.
5. **Therapy Chat**: Realistic conversational interface featuring compassionate clinical responses, prompt chips, and timestamped chat bubbles.
6. **Mood Tracker**: 5 distinct emotional states (Happy, Calm, Okay, Anxious, Sad), notes input, local persistence via `shared_preferences`, and 7-day trend line chart.
7. **Guided Breathing**: Interactive Box Breathing (4-4-4-4) with expanding somatic circle, countdown timer, cycle counter, and comfort precautions.
8. **Daily Self-Care Checklist**: Practical habits (mindfulness, hydration, walking, journaling) with progress bar and streak reinforcement.
9. **Profile & Emergency Resources**: Preferences toggles, clear local data, and emergency crisis hotlines (988, 741741, Tele-MANAS 14416).

---

## 🛠️ Technology Stack
- **Framework**: Flutter 3.x
- **Language**: Dart
- **Design System**: Material 3 (`useMaterial3: true`)
- **Key Packages**:
  - `fl_chart`: For 7-day mood trend visualization
  - `google_fonts`: Plus Jakarta Sans typography
  - `shared_preferences`: Offline persistence for mood logs
  - `intl`: Date and time formatting

---

## 🚀 How to Run the App

### Option A: Running in Visual Studio Code
1. Ensure the Flutter SDK is installed and configured in your `PATH` (`flutter doctor`).
2. Open the project root folder in **VS Code**.
3. Install the official **Flutter** and **Dart** extensions from the VS Code Marketplace.
4. Run `flutter pub get` in the integrated terminal to download all dependencies.
5. Open an Android emulator (from Device Manager) or connect an Android phone with USB Debugging enabled.
6. Press `F5` or click **Run > Start Debugging**.

### Option B: Running in Android Studio
1. Open **Android Studio** and select **Open** -> choose this project directory.
2. Android Studio will automatically recognize the Flutter project and prompt you to run `pub get`.
3. Open the **Device Manager** tool window and launch your preferred Android Virtual Device (e.g. Pixel 8 with API 34).
4. Select `lib/main.dart` in the target configuration dropdown and click the green **Play (Run)** button.

### Option C: Running via Terminal
```bash
# 1. Fetch dependencies
flutter pub get

# 2. Verify connected devices
flutter devices

# 3. Launch application on target device
flutter run
```

---

## 🧪 Common Troubleshooting Tips
- **Issue: "Target of URI doesn't exist"**: Run `flutter pub get` or restart the Dart Analysis Server in VS Code (`Ctrl+Shift+P > Dart: Restart Analysis Server`).
- **Issue: Gradle build daemon errors**: Run `flutter clean && flutter pub get` and ensure JDK 17 is configured.
- **Issue: Android SDK licenses not accepted**: Run `flutter doctor --android-licenses` in your terminal.
