import React, { useState } from 'react';
import { 
  FileCode, 
  Folder, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  Terminal, 
  ExternalLink, 
  HelpCircle,
  FileText,
  Smartphone,
  Layers,
  ChevronRight,
  Code
} from 'lucide-react';
import JSZip from 'jszip';
import { FLUTTER_PROJECT_FILES, FlutterFile } from '../../data/flutterSourceCode';

export const FlutterCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_PROJECT_FILES[1]); // lib/main.dart
  const [activeTab, setActiveTab] = useState<'code' | 'guide' | 'viva'>('code');
  const [isCopied, setIsCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add each file to the zip archive preserving directory structure
      FLUTTER_PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mindcare_flutter_project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const categories = [
    { id: 'entry', label: 'App Entry & Root' },
    { id: 'config', label: 'Dependencies & Config' },
    { id: 'theme', label: 'Theme & Palette' },
    { id: 'screen', label: 'Screen Views' },
    { id: 'model', label: 'Data Models' },
    { id: 'service', label: 'Storage & Services' },
    { id: 'widget', label: 'Reusable Widgets' },
    { id: 'docs', label: 'Lab Documentation' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Header */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-tight">
              MindCare Flutter & Dart Project Studio
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete, runnable Flutter codebase ready for Android Studio, VS Code, and Lab Viva
          </p>
        </div>

        {/* Action Tabs & Zip Download */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-900 rounded-xl border border-slate-800 flex text-xs">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'code' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Source Code ({FLUTTER_PROJECT_FILES.length} files)
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'guide' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Run & Setup Guide
            </button>
            <button
              onClick={() => setActiveTab('viva')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'viva' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              College Viva Q&A
            </button>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            {isZipping ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Download Full Flutter ZIP
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'code' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left File Tree Sidebar */}
          <div className="w-72 bg-slate-950/80 border-r border-slate-800 p-3 overflow-y-auto shrink-0 flex flex-col">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5 mb-1 flex items-center justify-between">
              <span>Project Structure</span>
              <span className="text-[10px] font-mono text-purple-400">Flutter 3.x</span>
            </div>

            <div className="space-y-4 flex-1">
              {categories.map(cat => {
                const filesInCat = FLUTTER_PROJECT_FILES.filter(f => f.category === cat.id);
                if (filesInCat.length === 0) return null;

                return (
                  <div key={cat.id}>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                      <Folder className="w-3 h-3 text-slate-500" />
                      <span>{cat.label}</span>
                    </div>
                    <div className="space-y-0.5">
                      {filesInCat.map(file => {
                        const isSelected = selectedFile.path === file.path;
                        return (
                          <button
                            key={file.path}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between group ${
                              isSelected
                                ? 'bg-purple-600/20 text-purple-300 font-semibold border-l-2 border-purple-500'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                            }`}
                          >
                            <span className="truncate">{file.path}</span>
                            <span className="text-[10px] text-slate-600 group-hover:text-slate-400 shrink-0">
                              {file.content.split('\n').length}L
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400">
              <span className="font-semibold text-slate-200">Tip:</span> Every file is valid, self-contained Dart code ready to paste into Android Studio or VS Code.
            </div>
          </div>

          {/* Right Code Display */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900">
            {/* File info bar */}
            <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-slate-200 font-bold">{selectedFile.path}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-[11px] truncate">{selectedFile.description}</span>
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code lines */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed bg-[#0F172A] selection:bg-purple-900 selection:text-white">
              <pre className="overflow-x-auto">
                <code>
                  {selectedFile.content.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row hover:bg-slate-800/40">
                      <span className="table-cell pr-4 text-right select-none text-slate-600 text-[11px] w-10">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre">{line || ' '}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Guide Tab */}
      {activeTab === 'guide' && (
        <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl mx-auto text-slate-300 text-sm">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">How to Run MindCare in Android Studio or VS Code</h3>
            <p className="text-slate-400 text-xs">
              Step-by-step instructions for launching this project on an Android Virtual Device (Emulator) or physical mobile phone.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="font-bold text-purple-400 text-xs uppercase tracking-wider">Method 1: Visual Studio Code</h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
              <li>Click <strong>Download Full Flutter ZIP</strong> above and extract the files to a folder (e.g. <code>C:\projects\mindcare</code>).</li>
              <li>Open <strong>VS Code</strong>, then click <strong>File &gt; Open Folder</strong> and choose the extracted directory.</li>
              <li>Install the <strong>Flutter</strong> and <strong>Dart</strong> extensions from the VS Code Marketplace.</li>
              <li>Open the integrated terminal (<code>Ctrl + `</code>) and run:
                <pre className="mt-1 p-2 bg-slate-900 rounded-lg text-emerald-400 font-mono text-[11px]">flutter pub get</pre>
              </li>
              <li>In the bottom-right status bar, select your target device (e.g. <em>Pixel 8 API 34</em> or <em>Android Phone</em>).</li>
              <li>Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">F5</kbd> to launch with debugging.</li>
            </ol>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="font-bold text-sky-400 text-xs uppercase tracking-wider">Method 2: Android Studio</h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
              <li>Open <strong>Android Studio</strong>.</li>
              <li>Click <strong>Open</strong> and browse to the extracted project folder.</li>
              <li>Android Studio will identify the Flutter project and display <strong>"Flutter commands: pub get"</strong> at the top. Click <strong>pub get</strong>.</li>
              <li>Open the <strong>Device Manager</strong> on the right sidebar and click <strong>Play</strong> on your Android Virtual Device (AVD).</li>
              <li>Select <code>lib/main.dart</code> in the configuration toolbar and click the green <strong>Run (Play)</strong> icon.</li>
            </ol>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">Method 3: Terminal / Command Line</h4>
            <pre className="p-3 bg-slate-900 rounded-lg text-emerald-400 font-mono text-xs leading-relaxed">
{`# 1. Navigate into project directory
cd mindcare

# 2. Verify Flutter SDK is healthy
flutter doctor

# 3. Download packages (fl_chart, google_fonts, shared_preferences)
flutter pub get

# 4. Check connected devices or running emulators
flutter devices

# 5. Launch app on Android device
flutter run`}
            </pre>
          </div>

          <div className="p-4 bg-rose-950/30 border border-rose-900/60 rounded-2xl">
            <h4 className="font-bold text-rose-400 text-xs uppercase tracking-wider mb-2">Common Troubleshooting Fixes</h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li><strong>Gradle build error:</strong> Ensure your JDK version is compatible with Flutter 3 (JDK 17 recommended). Run <code>flutter clean &amp;&amp; flutter pub get</code>.</li>
              <li><strong>Android SDK licenses:</strong> Run <code>flutter doctor --android-licenses</code> and press <code>y</code> to accept.</li>
              <li><strong>Missing assets:</strong> Ensure <code>pubspec.yaml</code> has <code>uses-material-design: true</code>.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Viva Tab */}
      {activeTab === 'viva' && (
        <div className="flex-1 overflow-y-auto p-8 space-y-4 max-w-4xl mx-auto text-slate-300 text-sm">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">College Mini-Project Viva Q&A</h3>
            <p className="text-slate-400 text-xs">
              Subject: UI Design Using Flutter Lab • Key technical questions examiners commonly ask
            </p>
          </div>

          {[
            {
              q: '1. What are the key advantages of using Flutter for building MindCare?',
              a: 'Flutter allows single-codebase cross-platform compilation directly to ARM machine code, yielding smooth 60–120 FPS animations essential for calming breathing exercises. Its rich widget catalog and Material 3 support enable fast UI prototyping with cohesive design tokens.',
            },
            {
              q: '2. How does MindCare adhere to Material 3 principles?',
              a: 'MindCare utilizes `useMaterial3: true` in ThemeData with `ColorScheme.fromSeed(seedColor: Color(0xFF8C7AE6))`, rounded card shapes (`borderRadius: BorderRadius.circular(20)`), modern NavigationBar widgets with pill indicators, and subtle tonal elevations instead of heavy drop shadows.',
            },
            {
              q: '3. How is local data persistence handled for the Mood Tracker?',
              a: 'We use the `shared_preferences` package. When a user submits a mood check-in, the entry is serialized into a JSON map via `toJson()`, encoded with `jsonEncode()`, and saved under the key `mindcare_mood_entries_v1`. On app launch, it is retrieved and decoded back into `List<MoodEntry>` via `MoodEntry.fromJson()`.',
            },
            {
              q: '4. How is the 7-day mood history graph implemented in Flutter?',
              a: 'We utilize the `fl_chart` library. The `MoodChartWidget` builds a `LineChart` using `LineChartBarData` where X represents the day index and Y represents mood intensity (1 to 5). It features custom emoji Y-axis titles and curved splines (`isCurved: true`).',
            },
            {
              q: '5. How does the Guided Breathing animation work under the hood?',
              a: 'It uses an `AnimationController` and `CurvedAnimation` coupled with an `AnimatedBuilder` or `Transform.scale`. A periodic `Timer` manages the 4-4-4-4 seconds cycle, signaling the animation controller to expand during Inhale and contract during Exhale.',
            },
            {
              q: '6. What precautions were implemented regarding privacy and crisis safety?',
              a: 'MindCare explicitly includes a prominent Crisis Support modal with 24/7 emergency numbers (988, Crisis Text Line 741741, Tele-MANAS 14416). It includes disclaimers that demo authentication and simulated chats are for educational self-care, not clinical diagnostic advice.',
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <h4 className="font-bold text-white text-xs mb-1.5">{item.q}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
