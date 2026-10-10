export interface FlutterFile {
  path: string;
  name: string;
  category: 'config' | 'entry' | 'theme' | 'model' | 'service' | 'screen' | 'widget' | 'docs';
  description: string;
  content: string;
}

export const FLUTTER_PROJECT_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    category: 'config',
    description: 'Flutter project dependencies, assets, and metadata configuration',
    content: `name: mindcare
description: "MindCare – Mental Health and Therapy Chat App. College Mini-Project for UI Design Using Flutter Lab."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1
  fl_chart: ^0.68.0
  shared_preferences: ^2.2.3
  intl: ^0.19.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
`,
  },
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    category: 'entry',
    description: 'Main application entry point with theme configuration and route handling',
    content: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'screens/splash_screen.dart';
import 'screens/welcome_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/main_navigation_screen.dart';
import 'screens/breathing_screen.dart';
import 'screens/self_care_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set system UI overlay style to match calming lavender theme
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: Colors.white,
      systemNavigationBarIconBrightness: Brightness.dark,
    ),
  );

  runApp(const MindCareApp());
}

class MindCareApp extends StatelessWidget {
  const MindCareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MindCare',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/welcome': (context) => const WelcomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/main': (context) => const MainNavigationScreen(),
        '/breathing': (context) => const BreathingScreen(),
        '/self-care': (context) => const SelfCareScreen(),
      },
    );
  }
}
`,
  },
  {
    path: 'lib/theme/app_theme.dart',
    name: 'app_theme.dart',
    category: 'theme',
    description: 'Material 3 calming color palette (soft lavender, light blue, mint green, white) and typography',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Calming Color Palette
  static const Color lavenderPrimary = Color(0xFF8C7AE6);
  static const Color lavenderLight = Color(0xFFF0EDFB);
  static const Color lavenderSurface = Color(0xFFF7F6FD);
  
  static const Color lightBlue = Color(0xFFE8F1FC);
  static const Color accentBlue = Color(0xFF4A90E2);
  
  static const Color mintGreen = Color(0xFF48BB78);
  static const Color mintLight = Color(0xFFEBFBEE);
  
  static const Color peachWarm = Color(0xFFFED7D7);
  static const Color textDark = Color(0xFF2D3748);
  static const Color textMuted = Color(0xFF718096);
  static const Color surfaceWhite = Colors.white;

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: lavenderPrimary,
        primary: lavenderPrimary,
        secondary: accentBlue,
        tertiary: mintGreen,
        surface: surfaceWhite,
        surfaceContainerLow: lavenderSurface,
        onPrimary: Colors.white,
        onSurface: textDark,
      ),
      scaffoldBackgroundColor: const Color(0xFFF9F9FD),
      textTheme: GoogleFonts.plusJakartaSansTextTheme().apply(
        bodyColor: textDark,
        displayColor: textDark,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        scrolledUnderElevation: 0,
        iconTheme: IconThemeData(color: textDark),
        titleTextStyle: TextStyle(
          color: textDark,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
      cardTheme: CardTheme(
        color: surfaceWhite,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: Colors.black.withOpacity(0.04), width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: lavenderPrimary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceWhite,
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: Colors.black.withOpacity(0.08)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: Colors.black.withOpacity(0.08)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: lavenderPrimary, width: 2),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: surfaceWhite,
        indicatorColor: lavenderLight,
        elevation: 3,
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: lavenderPrimary,
            );
          }
          return const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            color: textMuted,
          );
        }),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/models/therapist.dart',
    name: 'therapist.dart',
    category: 'model',
    description: 'Data model for licensed therapists and counseling specialists',
    content: `class Therapist {
  final String id;
  final String name;
  final String title;
  final String specialty;
  final int experienceYears;
  final double rating;
  final int reviewCount;
  final String avatarUrl;
  final String bio;
  final List<String> approaches;
  final String education;
  final List<String> languages;
  final String sessionFee;
  final bool isAvailableToday;
  final String nextSlot;

  const Therapist({
    required this.id,
    required this.name,
    required this.title,
    required this.specialty,
    required this.experienceYears,
    required this.rating,
    required this.reviewCount,
    required this.avatarUrl,
    required this.bio,
    required this.approaches,
    required this.education,
    required this.languages,
    required this.sessionFee,
    required this.isAvailableToday,
    required this.nextSlot,
  });

  static List<Therapist> getSampleTherapists() {
    return [
      const Therapist(
        id: 't1',
        name: 'Dr. Sarah Jenkins, Ph.D.',
        title: 'Licensed Clinical Psychologist',
        specialty: 'Anxiety, Stress & CBT',
        experienceYears: 11,
        rating: 4.9,
        reviewCount: 142,
        avatarUrl: 'https://images.unsplash.com/photo-1594824813637-8835848bb447?w=160&auto=format&fit=crop&q=80',
        bio: 'Specializing in Evidence-Based CBT and Mindfulness-based stress reduction. Passionate about helping students navigate perfectionism and burnout in academic life.',
        approaches: ['Cognitive Behavioral Therapy (CBT)', 'Mindfulness-Based Stress Reduction', 'Acceptance & Commitment'],
        education: 'Ph.D. Clinical Psychology, Stanford University',
        languages: ['English', 'Spanish'],
        sessionFee: '\$85 / 50 min (Demo Tier)',
        isAvailableToday: true,
        nextSlot: 'Today at 3:30 PM',
      ),
      const Therapist(
        id: 't2',
        name: 'Marcus Vance, LMFT',
        title: 'Licensed Marriage & Family Therapist',
        specialty: 'Relationships & Life Transitions',
        experienceYears: 8,
        rating: 4.8,
        reviewCount: 98,
        avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&auto=format&fit=crop&q=80',
        bio: 'Focuses on relational health, communication blocks, and emotional regulation. Dedicated to an open space where clients feel seen without judgment.',
        approaches: ['Systemic Therapy', 'Emotion-Focused Therapy (EFT)', 'Attachment-Focused Work'],
        education: 'M.S. Counseling Psychology, Columbia University',
        languages: ['English'],
        sessionFee: '\$75 / 50 min (Demo Tier)',
        isAvailableToday: true,
        nextSlot: 'Tomorrow at 10:00 AM',
      ),
      const Therapist(
        id: 't3',
        name: 'Dr. Elena Rostova, MD',
        title: 'Psychiatrist & Psychotherapist',
        specialty: 'Mood Disorders & Holistic Wellness',
        experienceYears: 14,
        rating: 4.95,
        reviewCount: 184,
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&auto=format&fit=crop&q=80',
        bio: 'Combines clinical neurobiology with compassionate talk therapy to treat chronic depression, mood lability, and sleep-related mental fatigue.',
        approaches: ['Integrative Psychiatry', 'Psychodynamic Therapy', 'Sleep Hygiene & Chronobiology'],
        education: 'M.D., Johns Hopkins School of Medicine',
        languages: ['English', 'French'],
        sessionFee: '\$110 / 50 min (Demo Tier)',
        isAvailableToday: false,
        nextSlot: 'Thursday at 2:00 PM',
      ),
      const Therapist(
        id: 't4',
        name: 'Aisha Patel, LCSW',
        title: 'Licensed Clinical Social Worker',
        specialty: 'College Burnout, Identity & Self-Compassion',
        experienceYears: 6,
        rating: 4.85,
        reviewCount: 76,
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
        bio: 'Empowers students and early-career individuals to decouple self-worth from productivity and establish healthy emotional boundaries.',
        approaches: ['Dialectical Behavior (DBT) Skills', 'Compassion-Focused Therapy', 'Somatic Grounding'],
        education: 'MSW, University of Chicago',
        languages: ['English', 'Hindi'],
        sessionFee: '\$65 / 50 min (Demo Tier)',
        isAvailableToday: true,
        nextSlot: 'Today at 5:00 PM',
      ),
    ];
  }
}
`,
  },
  {
    path: 'lib/models/mood_entry.dart',
    name: 'mood_entry.dart',
    category: 'model',
    description: 'Data model for user mood check-in logs and local persistence',
    content: `class MoodEntry {
  final String id;
  final String mood; // happy, calm, okay, anxious, sad
  final String label;
  final int intensity; // 1 to 5
  final List<String> tags;
  final String notes;
  final DateTime timestamp;

  MoodEntry({
    required this.id,
    required this.mood,
    required this.label,
    required this.intensity,
    required this.tags,
    required this.notes,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'mood': mood,
    'label': label,
    'intensity': intensity,
    'tags': tags,
    'notes': notes,
    'timestamp': timestamp.toIso8601String(),
  };

  factory MoodEntry.fromJson(Map<String, dynamic> json) => MoodEntry(
    id: json['id'] as String,
    mood: json['mood'] as String,
    label: json['label'] as String,
    intensity: json['intensity'] as int,
    tags: List<String>.from(json['tags'] as List),
    notes: json['notes'] as String? ?? '',
    timestamp: DateTime.parse(json['timestamp'] as String),
  );
}
`,
  },
  {
    path: 'lib/models/chat_message.dart',
    name: 'chat_message.dart',
    category: 'model',
    description: 'Model for therapy chat messages with sender type and timestamps',
    content: `class ChatMessage {
  final String id;
  final bool isFromUser;
  final String therapistName;
  final String text;
  final DateTime timestamp;

  ChatMessage({
    required this.id,
    required this.isFromUser,
    required this.therapistName,
    required this.text,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'isFromUser': isFromUser,
    'therapistName': therapistName,
    'text': text,
    'timestamp': timestamp.toIso8601String(),
  };

  factory ChatMessage.fromJson(Map<String, dynamic> json) => ChatMessage(
    id: json['id'] as String,
    isFromUser: json['isFromUser'] as bool,
    therapistName: json['therapistName'] as String,
    text: json['text'] as String,
    timestamp: DateTime.parse(json['timestamp'] as String),
  );
}
`,
  },
  {
    path: 'lib/models/self_care_activity.dart',
    name: 'self_care_activity.dart',
    category: 'model',
    description: 'Model for practical mental wellness checklist activities',
    content: `class SelfCareActivity {
  final String id;
  final String title;
  final String category;
  final int durationMinutes;
  bool isCompleted;
  final String description;

  SelfCareActivity({
    required this.id,
    required this.title,
    required this.category,
    required this.durationMinutes,
    this.isCompleted = false,
    required this.description,
  });
}
`,
  },
  {
    path: 'lib/services/storage_service.dart',
    name: 'storage_service.dart',
    category: 'service',
    description: 'Local SharedPreferences persistence for offline mood entries and task states',
    content: `import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/mood_entry.dart';

class StorageService {
  static const String _moodKey = 'mindcare_mood_entries_v1';
  static const String _selfCareKey = 'mindcare_completed_tasks_v1';

  static Future<List<MoodEntry>> loadMoodEntries() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_moodKey);
    if (jsonString == null || jsonString.isEmpty) {
      return _getDefaultEntries();
    }
    try {
      final List decoded = jsonDecode(jsonString);
      return decoded.map((item) => MoodEntry.fromJson(item)).toList();
    } catch (_) {
      return _getDefaultEntries();
    }
  }

  static Future<void> saveMoodEntries(List<MoodEntry> entries) async {
    final prefs = await SharedPreferences.getInstance();
    final encoded = jsonEncode(entries.map((e) => e.toJson()).toList());
    await prefs.setString(_moodKey, encoded);
  }

  static Future<void> clearAllMoodData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_moodKey);
  }

  static List<MoodEntry> _getDefaultEntries() {
    final now = DateTime.now();
    return [
      MoodEntry(
        id: '1',
        mood: 'calm',
        label: 'Calm & Grounded',
        intensity: 4,
        tags: ['Morning Walk', 'Tea'],
        notes: 'Had a restful morning without rushing.',
        timestamp: now.subtract(const Duration(days: 3)),
      ),
      MoodEntry(
        id: '2',
        mood: 'anxious',
        label: 'Anxious / Restless',
        intensity: 2,
        tags: ['College Deadline'],
        notes: 'Felt nervous regarding upcoming submission.',
        timestamp: now.subtract(const Duration(days: 2)),
      ),
      MoodEntry(
        id: '3',
        mood: 'okay',
        label: 'Okay / Neutral',
        intensity: 3,
        tags: ['Library Study'],
        notes: 'Steady progress made today.',
        timestamp: now.subtract(const Duration(days: 1)),
      ),
      MoodEntry(
        id: '4',
        mood: 'happy',
        label: 'Peaceful & Happy',
        intensity: 5,
        tags: ['Good Rest', 'Friends'],
        notes: 'Reconnected with classmates over coffee.',
        timestamp: now,
      ),
    ];
  }
}
`,
  },
  {
    path: 'lib/screens/splash_screen.dart',
    name: 'splash_screen.dart',
    category: 'screen',
    description: 'Splash screen displaying MindCare branding and gentle fade-in transition',
    content: `import 'dart:async';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    _scaleAnimation = Tween<double>(begin: 0.85, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
    );

    _controller.forward();

    // Auto-navigate to welcome screen after 2.5 seconds
    Timer(const Duration(milliseconds: 2400), () {
      if (mounted) {
        Navigator.pushReplacementNamed(context, '/welcome');
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F6FD),
      body: Center(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: ScaleTransition(
            scale: _scaleAnimation,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // MindCare Lotus / Wellness Icon Container
                Container(
                  width: 104,
                  height: 104,
                  decoration: BoxDecoration(
                    color: AppTheme.lavenderPrimary,
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.lavenderPrimary.withOpacity(0.35),
                        blurRadius: 28,
                        offset: const Offset(0, 10),
                      ),
                    ],
                  ),
                  child: const Center(
                    child: Icon(
                      Icons.spa_rounded,
                      size: 54,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                const Text(
                  'MindCare',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.5,
                    color: Color(0xFF2D3748),
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Your mental wellness matters.',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                    color: Color(0xFF718096),
                  ),
                ),
                const SizedBox(height: 48),
                const SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(
                    strokeWidth: 2.5,
                    valueColor: AlwaysStoppedAnimation<Color>(AppTheme.lavenderPrimary),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/welcome_screen.dart',
    name: 'welcome_screen.dart',
    category: 'screen',
    description: 'Welcome screen with onboarding illustration and Login/SignUp CTAs',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9F9FD),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20),
          child: Column(
            children: [
              const Spacer(),
              // Hero Illustration Container
              Container(
                width: 220,
                height: 220,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppTheme.lavenderLight, AppTheme.lightBlue],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.lavenderPrimary.withOpacity(0.12),
                      blurRadius: 30,
                      offset: const Offset(0, 12),
                    ),
                  ],
                ),
                child: const Center(
                  child: Icon(
                    Icons.favorite_rounded,
                    size: 88,
                    color: AppTheme.lavenderPrimary,
                  ),
                ),
              ),
              const SizedBox(height: 36),
              const Text(
                'Find Peace & Balance',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textDark,
                ),
              ),
              const SizedBox(height: 12),
              const Text(
                'Confidential counseling, daily mood check-ins, and guided breathing exercises designed for your peace of mind.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 15,
                  height: 1.5,
                  color: AppTheme.textMuted,
                ),
              ),
              const Spacer(),
              // Simulated Environment Notice
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: AppTheme.mintLight,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.info_outline, size: 16, color: AppTheme.mintGreen),
                    SizedBox(width: 6),
                    Text(
                      'College Mini-Project Demo Mode',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF22543D),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              // Get Started / Login Buttons
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.pushNamed(context, '/login'),
                  child: const Text('Log In'),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: () => Navigator.pushNamed(context, '/register'),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    side: const BorderSide(color: AppTheme.lavenderPrimary, width: 1.5),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: const Text(
                    'Create an Account',
                    style: TextStyle(
                      color: AppTheme.lavenderPrimary,
                      fontWeight: FontWeight.w600,
                      fontSize: 15,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () => Navigator.pushReplacementNamed(context, '/main'),
                child: const Text(
                  'Skip to Demo Overview',
                  style: TextStyle(color: AppTheme.textMuted, fontSize: 13),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/login_screen.dart',
    name: 'login_screen.dart',
    category: 'screen',
    description: 'Login screen with form validation, password visibility toggle, and demo autofill',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController(text: 'alex.rivera@college.edu');
  final _passwordController = TextEditingController(text: 'mindcare123');
  bool _obscurePassword = true;
  bool _isLoading = false;

  void _handleLogin() {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);
      Future.delayed(const Duration(milliseconds: 800), () {
        if (mounted) {
          setState(() => _isLoading = false);
          Navigator.pushReplacementNamed(context, '/main');
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign In'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Welcome Back',
                  style: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.textDark,
                  ),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Sign in to access your personal journal and counseling sessions.',
                  style: TextStyle(fontSize: 14, color: AppTheme.textMuted),
                ),
                const SizedBox(height: 28),
                const Text(
                  'Email Address',
                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    hintText: 'student@college.edu',
                    prefixIcon: Icon(Icons.email_outlined, color: AppTheme.textMuted),
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'Please enter your email';
                    }
                    if (!value.contains('@')) {
                      return 'Please enter a valid email';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                const Text(
                  'Password',
                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    hintText: 'Enter your password',
                    prefixIcon: const Icon(Icons.lock_outline, color: AppTheme.textMuted),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword ? Icons.visibility_off : Icons.visibility,
                        color: AppTheme.textMuted,
                      ),
                      onPressed: () {
                        setState(() => _obscurePassword = !_obscurePassword);
                      },
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.length < 6) {
                      return 'Password must be at least 6 characters';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 12),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Demo: Password reset link simulated.')),
                      );
                    },
                    child: const Text('Forgot Password?'),
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _isLoading ? null : _handleLogin,
                    child: _isLoading
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                          )
                        : const Text('Sign In'),
                  ),
                ),
                const SizedBox(height: 24),
                Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Don't have an account?", style: TextStyle(color: AppTheme.textMuted)),
                      TextButton(
                        onPressed: () => Navigator.pushReplacementNamed(context, '/register'),
                        child: const Text('Sign Up', style: TextStyle(fontWeight: FontWeight.w600)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/register_screen.dart',
    name: 'register_screen.dart',
    category: 'screen',
    description: 'Registration form with confirmation validation and simulated user account creation',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _obscurePassword = true;
  bool _agreedToTerms = true;

  void _handleRegister() {
    if (_formKey.currentState!.validate()) {
      if (!_agreedToTerms) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please accept the privacy terms to proceed.')),
        );
        return;
      }
      Navigator.pushReplacementNamed(context, '/main');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Account')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Join MindCare',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 4),
                const Text(
                  'A secure and compassionate space for your mental health.',
                  style: TextStyle(fontSize: 14, color: AppTheme.textMuted),
                ),
                const SizedBox(height: 20),
                const Text('Full Name', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(hintText: 'e.g. Alex Rivera'),
                  validator: (v) => (v == null || v.isEmpty) ? 'Name is required' : null,
                ),
                const SizedBox(height: 14),
                const Text('Email Address', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(hintText: 'name@example.com'),
                  validator: (v) => (v == null || !v.contains('@')) ? 'Valid email required' : null,
                ),
                const SizedBox(height: 14),
                const Text('Password', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    hintText: 'Create a password',
                    suffixIcon: IconButton(
                      icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                  validator: (v) => (v == null || v.length < 6) ? 'At least 6 characters required' : null,
                ),
                const SizedBox(height: 14),
                const Text('Confirm Password', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _confirmPasswordController,
                  obscureText: true,
                  decoration: const InputDecoration(hintText: 'Re-enter your password'),
                  validator: (v) {
                    if (v != _passwordController.text) return 'Passwords do not match';
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Checkbox(
                      value: _agreedToTerms,
                      activeColor: AppTheme.lavenderPrimary,
                      onChanged: (val) => setState(() => _agreedToTerms = val ?? false),
                    ),
                    const Expanded(
                      child: Text(
                        'I understand MindCare is a college demo app and not a crisis hotline.',
                        style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _handleRegister,
                    child: const Text('Complete Sign Up'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/main_navigation_screen.dart',
    name: 'main_navigation_screen.dart',
    category: 'screen',
    description: 'Material 3 NavigationBar housing Home, Therapists, Chat, Mood Tracker, and Profile',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'home_screen.dart';
import 'therapist_screen.dart';
import 'chat_screen.dart';
import 'mood_tracker_screen.dart';
import 'profile_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    TherapistScreen(),
    ChatScreen(),
    MoodTrackerScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home_rounded, color: AppTheme.lavenderPrimary),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.people_outline_rounded),
            selectedIcon: Icon(Icons.people_rounded, color: AppTheme.lavenderPrimary),
            label: 'Therapists',
          ),
          NavigationDestination(
            icon: Icon(Icons.chat_bubble_outline_rounded),
            selectedIcon: Icon(Icons.chat_bubble_rounded, color: AppTheme.lavenderPrimary),
            label: 'Chat',
          ),
          NavigationDestination(
            icon: Icon(Icons.sentiment_satisfied_alt_outlined),
            selectedIcon: Icon(Icons.sentiment_very_satisfied_rounded, color: AppTheme.lavenderPrimary),
            label: 'Mood',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline_rounded),
            selectedIcon: Icon(Icons.person_rounded, color: AppTheme.lavenderPrimary),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/home_screen.dart',
    name: 'home_screen.dart',
    category: 'screen',
    description: 'Home dashboard with personalized greeting, daily affirmation, quick cards, and appointments',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/emergency_help_sheet.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9F9FD),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Row: Greeting & Crisis Shortcut
              Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Good Morning, Alex',
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.textDark,
                        ),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'How are you feeling right now?',
                        style: TextStyle(fontSize: 14, color: AppTheme.textMuted),
                      ),
                    ],
                  ),
                  IconButton(
                    onPressed: () {
                      showModalBottomSheet(
                        context: context,
                        isScrollControlled: true,
                        backgroundColor: Colors.transparent,
                        builder: (ctx) => const EmergencyHelpSheet(),
                      );
                    },
                    icon: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: AppTheme.peachWarm.withOpacity(0.5),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.health_and_safety_rounded, color: Color(0xFFC53030), size: 22),
                    ),
                    tooltip: 'Emergency & Crisis Helplines',
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Daily Affirmation Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF8C7AE6), Color(0xFF6C5CE7)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(22),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.lavenderPrimary.withOpacity(0.25),
                      blurRadius: 18,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.auto_awesome, color: Colors.amberAccent, size: 18),
                        SizedBox(width: 8),
                        Text(
                          'DAILY THOUGHT',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1.2,
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      '“Feelings are something you have; not something you are. Be patient with your mind.”',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontStyle: FontStyle.italic,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Quick Access Grid
              const Text(
                'Wellness Tools',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.35,
                children: [
                  _buildToolCard(
                    context,
                    title: 'Guided Breathing',
                    subtitle: 'Box 4-4-4-4 rhythm',
                    icon: Icons.air_rounded,
                    color: AppTheme.lightBlue,
                    iconColor: AppTheme.accentBlue,
                    onTap: () => Navigator.pushNamed(context, '/breathing'),
                  ),
                  _buildToolCard(
                    context,
                    title: 'Self-Care Checklist',
                    subtitle: 'Daily gentle goals',
                    icon: Icons.check_circle_outline_rounded,
                    color: AppTheme.mintLight,
                    iconColor: AppTheme.mintGreen,
                    onTap: () => Navigator.pushNamed(context, '/self-care'),
                  ),
                  _buildToolCard(
                    context,
                    title: 'Therapy Chat',
                    subtitle: 'Supportive AI demo',
                    icon: Icons.forum_rounded,
                    color: AppTheme.lavenderLight,
                    iconColor: AppTheme.lavenderPrimary,
                    onTap: () {
                      // Handled via bottom bar or tab index
                    },
                  ),
                  _buildToolCard(
                    context,
                    title: 'Mood History',
                    subtitle: 'Track your rhythms',
                    icon: Icons.insights_rounded,
                    color: const Color(0xFFFFF5F5),
                    iconColor: const Color(0xFFE53E3E),
                    onTap: () {
                      // Handled via bottom bar
                    },
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Upcoming Demo Appointment
              const Text(
                'Upcoming Consultation',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 10),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          color: AppTheme.lavenderLight,
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Icon(Icons.video_camera_front_rounded, color: AppTheme.lavenderPrimary),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              'Dr. Sarah Jenkins',
                              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Today at 3:30 PM • 50 min session',
                              style: TextStyle(fontSize: 13, color: AppTheme.textMuted),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.mintLight,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text(
                          'Confirmed',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppTheme.mintGreen),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildToolCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required Color iconColor,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(20),
          border: Border.Border.all(color: Colors.black.withOpacity(0.03)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Icon(icon, color: iconColor, size: 28),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 11.5, color: AppTheme.textMuted),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/therapist_screen.dart',
    name: 'therapist_screen.dart',
    category: 'screen',
    description: 'Therapist directory with specialty filter chips, search input, and profile dialog',
    content: `import 'package:flutter/material.dart';
import '../models/therapist.dart';
import '../theme/app_theme.dart';
import 'therapist_detail_screen.dart';

class TherapistScreen extends StatefulWidget {
  const TherapistScreen({super.key});

  @override
  State<TherapistScreen> createState() => _TherapistScreenState();
}

class _TherapistScreenState extends State<TherapistScreen> {
  final List<Therapist> _allTherapists = Therapist.getSampleTherapists();
  String _selectedCategory = 'All';
  String _searchQuery = '';

  final List<String> _categories = [
    'All',
    'Anxiety & Stress',
    'Relationships',
    'Depression',
    'College Burnout'
  ];

  @override
  Widget build(BuildContext context) {
    final filtered = _allTherapists.where((t) {
      final matchesQuery = t.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          t.specialty.toLowerCase().contains(_searchQuery.toLowerCase());
      if (_selectedCategory == 'All') return matchesQuery;
      return matchesQuery && t.specialty.toLowerCase().contains(_selectedCategory.toLowerCase().split(' ')[0]);
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Counseling Specialists'),
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              decoration: InputDecoration(
                hintText: 'Search by therapist name or specialty...',
                prefixIcon: const Icon(Icons.search_rounded, color: AppTheme.textMuted),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                fillColor: Colors.white,
                filled: true,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: BorderSide(color: Colors.black.withOpacity(0.06)),
                ),
              ),
            ),
          ),

          // Category Chips
          SizedBox(
            height: 48,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final cat = _categories[index];
                final isSelected = cat == _selectedCategory;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: FilterChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (_) => setState(() => _selectedCategory = cat),
                    backgroundColor: Colors.white,
                    selectedColor: AppTheme.lavenderLight,
                    labelStyle: TextStyle(
                      color: isSelected ? AppTheme.lavenderPrimary : AppTheme.textDark,
                      fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                      fontSize: 12.5,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: BorderSide(
                        color: isSelected ? AppTheme.lavenderPrimary : Colors.black.withOpacity(0.08),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 8),

          // Therapist List
          Expanded(
            child: filtered.isEmpty
                ? const Center(
                    child: Text('No therapists found matching your query.', style: TextStyle(color: AppTheme.textMuted)),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    itemCount: filtered.length,
                    itemBuilder: (context, index) {
                      final therapist = filtered[index];
                      return _buildTherapistCard(therapist);
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildTherapistCard(Therapist therapist) {
    return Card(
      margin: const EdgeInsets.only(bottom: 14),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 28,
                  backgroundImage: NetworkImage(therapist.avatarUrl),
                  backgroundColor: AppTheme.lavenderLight,
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              therapist.name,
                              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                            ),
                          ),
                          Row(
                            children: [
                              const Icon(Icons.star_rounded, color: Colors.amber, size: 18),
                              const SizedBox(width: 2),
                              Text(
                                '\${therapist.rating}',
                                style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        therapist.title,
                        style: const TextStyle(fontSize: 12.5, color: AppTheme.textMuted),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        therapist.specialty,
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                          color: AppTheme.lavenderPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  therapist.sessionFee,
                  style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600, color: AppTheme.textDark),
                ),
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => TherapistDetailScreen(therapist: therapist),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  ),
                  child: const Text('View Profile', style: TextStyle(fontSize: 13)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/therapist_detail_screen.dart',
    name: 'therapist_detail_screen.dart',
    category: 'screen',
    description: 'Detailed profile screen showing bio, clinical approaches, and demo booking action',
    content: `import 'package:flutter/material.dart';
import '../models/therapist.dart';
import '../theme/app_theme.dart';

class TherapistDetailScreen extends StatelessWidget {
  final Therapist therapist;

  const TherapistDetailScreen({super.key, required this.therapist});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Specialist Profile')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 46,
                    backgroundImage: NetworkImage(therapist.avatarUrl),
                    backgroundColor: AppTheme.lavenderLight,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    therapist.name,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    therapist.title,
                    style: const TextStyle(fontSize: 13, color: AppTheme.textMuted),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text('About & Clinical Philosophy', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 8),
            Text(
              therapist.bio,
              style: const TextStyle(fontSize: 14, height: 1.5, color: AppTheme.textDark),
            ),
            const SizedBox(height: 20),
            const Text('Therapeutic Approaches', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: therapist.approaches
                  .map((appr) => Chip(
                        label: Text(appr, style: const TextStyle(fontSize: 12)),
                        backgroundColor: AppTheme.lavenderLight,
                      ))
                  .toList(),
            ),
            const SizedBox(height: 20),
            const Text('Credentials & Education', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 6),
            Text(therapist.education, style: const TextStyle(fontSize: 13.5, color: AppTheme.textMuted)),
            const SizedBox(height: 36),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Demo: Session request sent to \${therapist.name}.')),
                  );
                },
                child: const Text('Book Demo Consultation'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/chat_screen.dart',
    name: 'chat_screen.dart',
    category: 'screen',
    description: 'Modern messaging interface with compassionate therapist responses and preset prompts',
    content: `import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/chat_message.dart';
import '../theme/app_theme.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isTyping = false;

  final List<ChatMessage> _messages = [
    ChatMessage(
      id: 'm1',
      isFromUser: false,
      therapistName: 'Dr. Sarah Jenkins',
      text: 'Hello Alex! I’m glad you reached out today. Remember that whatever you are carrying, this is a safe, confidential space. How has your mental energy been feeling today?',
      timestamp: DateTime.now().subtract(const Duration(minutes: 10)),
    ),
  ];

  final List<String> _quickPrompts = [
    'I’m feeling anxious about exams',
    'Can we try a breathing technique?',
    'I have trouble sleeping peacefully',
  ];

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;

    final userMsg = ChatMessage(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      isFromUser: true,
      therapistName: 'You',
      text: text.trim(),
      timestamp: DateTime.now(),
    );

    setState(() {
      _messages.add(userMsg);
      _controller.clear();
      _isTyping = true;
    });

    _scrollToBottom();

    // Simulated empathetic clinical response
    Future.delayed(const Duration(milliseconds: 1400), () {
      if (!mounted) return;
      String reply = "Thank you for sharing that with me. Acknowledging how you feel without self-judgment is the first powerful step. What physical sensations are accompanying this thought right now?";
      if (text.toLowerCase().contains('exam') || text.toLowerCase().contains('anxious')) {
        reply = "Exam and academic stress can feel intense. Let's remember: your worth as a person is never defined by a single exam score. Would you like to practice our 4-second box breathing together?";
      } else if (text.toLowerCase().contains('sleep')) {
        reply = "Racing thoughts at night are common when the brain hasn't had wind-down time. Let's practice a grounding technique: 5 things you can see, 4 things you can touch.";
      }

      final botMsg = ChatMessage(
        id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
        isFromUser: false,
        therapistName: 'Dr. Sarah Jenkins',
        text: reply,
        timestamp: DateTime.now(),
      );

      setState(() {
        _messages.add(botMsg);
        _isTyping = false;
      });
      _scrollToBottom();
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          children: const [
            Text('Therapy Chat (Dr. Sarah)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            Text('Demo Clinical AI Simulation', style: TextStyle(fontSize: 11, color: AppTheme.mintGreen)),
          ],
        ),
      ),
      body: Column(
        children: [
          // Demo Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 16),
            color: AppTheme.lavenderLight,
            child: const Text(
              'Demo session for lab evaluation. In emergencies, call 988 or local crisis hotlines.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 11, color: AppTheme.lavenderPrimary),
            ),
          ),

          // Message Bubbles
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return _buildChatBubble(msg);
              },
            ),
          ),

          if (_isTyping)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
              child: Row(
                children: const [
                  SizedBox(
                    width: 14,
                    height: 14,
                    child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.lavenderPrimary),
                  ),
                  SizedBox(width: 8),
                  Text('Dr. Sarah is typing...', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                ],
              ),
            ),

          // Quick Prompt suggestions
          SizedBox(
            height: 38,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: _quickPrompts.length,
              itemBuilder: (context, i) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: ActionChip(
                    label: Text(_quickPrompts[i], style: const TextStyle(fontSize: 11)),
                    onPressed: () => _sendMessage(_quickPrompts[i]),
                    backgroundColor: Colors.white,
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 6),

          // Message Input Field
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Colors.black.withOpacity(0.06))),
            ),
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: const InputDecoration(
                        hintText: 'Type your thoughts here...',
                        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      ),
                      onSubmitted: _sendMessage,
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton(
                    onPressed: () => _sendMessage(_controller.text),
                    icon: Container(
                      padding: const EdgeInsets.all(10),
                      decoration: const BoxDecoration(
                        color: AppTheme.lavenderPrimary,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.send_rounded, color: Colors.white, size: 18),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChatBubble(ChatMessage msg) {
    final isMe = msg.isFromUser;
    final timeStr = DateFormat('hh:mm a').format(msg.timestamp);

    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.78),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: isMe ? AppTheme.lavenderPrimary : Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(18),
            topRight: const Radius.circular(18),
            bottomLeft: Radius.circular(isMe ? 18 : 4),
            bottomRight: Radius.circular(isMe ? 4 : 18),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,
          children: [
            Text(
              msg.text,
              style: TextStyle(
                color: isMe ? Colors.white : AppTheme.textDark,
                fontSize: 14.5,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              timeStr,
              style: TextStyle(
                color: isMe ? Colors.white70 : AppTheme.textMuted,
                fontSize: 10.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/mood_tracker_screen.dart',
    name: 'mood_tracker_screen.dart',
    category: 'screen',
    description: 'Mood selector, local persistence, interactive chart, and recent mood history list',
    content: `import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/mood_entry.dart';
import '../services/storage_service.dart';
import '../theme/app_theme.dart';
import '../widgets/mood_chart_widget.dart';

class MoodTrackerScreen extends StatefulWidget {
  const MoodTrackerScreen({super.key});

  @override
  State<MoodTrackerScreen> createState() => _MoodTrackerScreenState();
}

class _MoodTrackerScreenState extends State<MoodTrackerScreen> {
  List<MoodEntry> _entries = [];
  String _selectedMood = 'calm';
  final TextEditingController _notesController = TextEditingController();

  final Map<String, Map<String, dynamic>> _moodTypes = {
    'happy': {'label': 'Happy & Joyful', 'icon': Icons.sentiment_very_satisfied_rounded, 'color': Color(0xFF48BB78)},
    'calm': {'label': 'Calm & Grounded', 'icon': Icons.sentiment_satisfied_alt_rounded, 'color': Color(0xFF8C7AE6)},
    'okay': {'label': 'Okay / Neutral', 'icon': Icons.sentiment_neutral_rounded, 'color': Color(0xFF4A90E2)},
    'anxious': {'label': 'Anxious / Restless', 'icon': Icons.sentiment_dissatisfied_rounded, 'color': Color(0xFFED8936)},
    'sad': {'label': 'Sad / Heavy', 'icon': Icons.sentiment_very_dissatisfied_rounded, 'color': Color(0xFFE53E3E)},
  };

  @override
  void initState() {
    super.initState();
    _loadEntries();
  }

  Future<void> _loadEntries() async {
    final loaded = await StorageService.loadMoodEntries();
    setState(() => _entries = loaded);
  }

  void _saveEntry() async {
    final meta = _moodTypes[_selectedMood]!;
    final newEntry = MoodEntry(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      mood: _selectedMood,
      label: meta['label'] as String,
      intensity: _getIntensityValue(_selectedMood),
      tags: ['Daily Check-in'],
      notes: _notesController.text.trim(),
      timestamp: DateTime.now(),
    );

    final updated = [_newEntry, ..._entries];
    await StorageService.saveMoodEntries(updated);
    setState(() {
      _entries = updated;
      _notesController.clear();
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Mood recorded successfully.')),
      );
    }
  }

  int _getIntensityValue(String mood) {
    switch (mood) {
      case 'happy': return 5;
      case 'calm': return 4;
      case 'okay': return 3;
      case 'anxious': return 2;
      case 'sad': return 1;
      default: return 3;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mood Tracker')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'How are you feeling right now?',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 14),

            // 5 Mood Selector Buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: _moodTypes.entries.map((entry) {
                final isSelected = entry.key == _selectedMood;
                final color = entry.value['color'] as Color;
                final icon = entry.value['icon'] as IconData;

                return GestureDetector(
                  onTap: () => setState(() => _selectedMood = entry.key),
                  child: Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isSelected ? color.withOpacity(0.18) : Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: isSelected ? color : Colors.black.withOpacity(0.08),
                            width: isSelected ? 2 : 1,
                          ),
                        ),
                        child: Icon(icon, color: color, size: 30),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        entry.key[0].toUpperCase() + entry.key.substring(1),
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: isSelected ? FontWeight.w700 : FontWeight.w400,
                          color: isSelected ? color : AppTheme.textMuted,
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 18),

            // Optional Reflection Notes
            TextField(
              controller: _notesController,
              decoration: const InputDecoration(
                hintText: 'Add an optional note (e.g. took a walk, studied for exam)...',
                contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _saveEntry,
                child: const Text('Log Today\'s Mood'),
              ),
            ),
            const SizedBox(height: 24),

            // Mood History Chart
            const Text(
              '7-Day Mood Trend',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 10),
            MoodChartWidget(entries: _entries),
            const SizedBox(height: 24),

            // Past Entries List
            const Text(
              'Past Reflections',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 10),
            if (_entries.isEmpty)
              const Center(child: Text('No mood entries recorded yet.'))
            else
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _entries.length,
                itemBuilder: (context, i) {
                  final e = _entries[i];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 10),
                    child: ListTile(
                      leading: Icon(
                        _moodTypes[e.mood]?['icon'] as IconData? ?? Icons.sentiment_satisfied,
                        color: _moodTypes[e.mood]?['color'] as Color? ?? AppTheme.lavenderPrimary,
                      ),
                      title: Text(e.label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                      subtitle: Text(
                        e.notes.isNotEmpty ? e.notes : 'No extra notes provided',
                        style: const TextStyle(fontSize: 12),
                      ),
                      trailing: Text(
                        DateFormat('MMM d').format(e.timestamp),
                        style: const TextStyle(fontSize: 11, color: AppTheme.textMuted),
                      ),
                    ),
                  );
                },
              ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/breathing_screen.dart',
    name: 'breathing_screen.dart',
    category: 'screen',
    description: 'Guided Box 4-4-4-4 and 4-7-8 breathing exercise with animated glow circle and safety note',
    content: `import 'dart:async';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class BreathingScreen extends StatefulWidget {
  const BreathingScreen({super.key});

  @override
  State<BreathingScreen> createState() => _BreathingScreenState();
}

class _BreathingScreenState extends State<BreathingScreen> with SingleTickerProviderStateMixin {
  late AnimationController _animController;
  Timer? _phaseTimer;
  bool _isRunning = false;

  int _currentPhaseIndex = 0;
  int _secondsLeft = 4;
  int _cyclesCompleted = 0;

  final List<String> _phases = ['Inhale through nose', 'Hold breath gently', 'Exhale slowly', 'Rest & Pause'];
  final List<int> _durations = [4, 4, 4, 4];

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    );
  }

  void _startBreathing() {
    setState(() {
      _isRunning = true;
      _currentPhaseIndex = 0;
      _secondsLeft = _durations[0];
    });
    _animController.forward(from: 0.0);
    _tick();
  }

  void _tick() {
    _phaseTimer?.cancel();
    _phaseTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!_isRunning) {
        timer.cancel();
        return;
      }
      setState(() {
        if (_secondsLeft > 1) {
          _secondsLeft--;
        } else {
          _currentPhaseIndex = (_currentPhaseIndex + 1) % _phases.length;
          _secondsLeft = _durations[_currentPhaseIndex];
          if (_currentPhaseIndex == 0) {
            _cyclesCompleted++;
            _animController.forward(from: 0.0);
          } else if (_currentPhaseIndex == 2) {
            _animController.reverse(from: 1.0);
          }
        }
      });
    });
  }

  void _pauseBreathing() {
    setState(() => _isRunning = false);
    _phaseTimer?.cancel();
    _animController.stop();
  }

  void _resetBreathing() {
    setState(() {
      _isRunning = false;
      _currentPhaseIndex = 0;
      _secondsLeft = 4;
      _cyclesCompleted = 0;
    });
    _phaseTimer?.cancel();
    _animController.reset();
  }

  @override
  void dispose() {
    _animController.dispose();
    _phaseTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Guided Breathing')),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            children: [
              const Text(
                'Box Breathing (4-4-4-4)',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 6),
              const Text(
                'A gentle somatic exercise to stimulate the vagus nerve and slow racing thoughts.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13.5, color: AppTheme.textMuted),
              ),
              const Spacer(),

              // Animated Breathing Sphere
              AnimatedBuilder(
                animation: _animController,
                builder: (context, child) {
                  final scale = 0.8 + (_animController.value * 0.4);
                  return Transform.scale(
                    scale: _isRunning ? scale : 0.85,
                    child: Container(
                      width: 220,
                      height: 220,
                      decoration: BoxDecoration(
                        gradient: RadialGradient(
                          colors: [
                            AppTheme.lavenderPrimary.withOpacity(0.85),
                            AppTheme.accentBlue.withOpacity(0.4),
                          ],
                        ),
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.lavenderPrimary.withOpacity(0.3),
                            blurRadius: 36,
                            spreadRadius: 8,
                          ),
                        ],
                      ),
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              '$_secondsLeft',
                              style: const TextStyle(
                                fontSize: 48,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                            Text(
                              _phases[_currentPhaseIndex],
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                                color: Colors.white70,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
              const Spacer(),

              Text(
                'Completed Cycles: $_cyclesCompleted',
                style: const TextStyle(fontWeight: FontWeight.w600, color: AppTheme.textMuted),
              ),
              const SizedBox(height: 20),

              // Control Buttons
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  OutlinedButton.icon(
                    onPressed: _resetBreathing,
                    icon: const Icon(Icons.refresh_rounded),
                    label: const Text('Reset'),
                  ),
                  const SizedBox(width: 16),
                  ElevatedButton.icon(
                    onPressed: _isRunning ? _pauseBreathing : _startBreathing,
                    icon: Icon(_isRunning ? Icons.pause_rounded : Icons.play_arrow_rounded),
                    label: Text(_isRunning ? 'Pause' : 'Start'),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Safety disclaimer
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.lavenderLight,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: const Text(
                  'Safety Note: Breathe gently without straining. If you feel lightheaded, stop immediately and return to your natural breathing.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 11.5, color: AppTheme.textMuted),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/self_care_screen.dart',
    name: 'self_care_screen.dart',
    category: 'screen',
    description: 'Wellness checklist with completion tracking, progress bar, and celebratory encouragement',
    content: `import 'package:flutter/material.dart';
import '../models/self_care_activity.dart';
import '../theme/app_theme.dart';

class SelfCareScreen extends StatefulWidget {
  const SelfCareScreen({super.key});

  @override
  State<SelfCareScreen> createState() => _SelfCareScreenState();
}

class _SelfCareScreenState extends State<SelfCareScreen> {
  final List<SelfCareActivity> _activities = [
    SelfCareActivity(
      id: '1',
      title: '3-Minute Mindful Breath',
      category: 'Mindfulness',
      durationMinutes: 3,
      isCompleted: true,
      description: 'Pause all screens and take 10 slow, diaphragmatic breaths.',
    ),
    SelfCareActivity(
      id: '2',
      title: 'Hydrate with Fresh Water',
      category: 'Body',
      durationMinutes: 1,
      isCompleted: true,
      description: 'Drink a full glass of cool water to support physical equilibrium.',
    ),
    SelfCareActivity(
      id: '3',
      title: '15-Minute Outdoor Walk',
      category: 'Body',
      durationMinutes: 15,
      isCompleted: false,
      description: 'Step outside to absorb natural sunlight and stretch legs.',
    ),
    SelfCareActivity(
      id: '4',
      title: 'Evening Gratitude Journal',
      category: 'Reflection',
      durationMinutes: 5,
      isCompleted: false,
      description: 'Write down 3 tiny moments today that brought you ease.',
    ),
    SelfCareActivity(
      id: '5',
      title: 'Screen-Free Wind Down',
      category: 'Rest',
      durationMinutes: 30,
      isCompleted: false,
      description: 'Put your phone on silent mode 30 minutes before sleep.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final completedCount = _activities.where((a) => a.isCompleted).length;
    final progress = _activities.isEmpty ? 0.0 : completedCount / _activities.length;

    return Scaffold(
      appBar: AppBar(title: const Text('Daily Self-Care')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Progress Header Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.lavenderLight,
                borderRadius: BorderRadius.circular(22),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Today\'s Progress',
                        style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                      ),
                      Text(
                        '\$completedCount of \${_activities.length} Completed',
                        style: const TextStyle(fontWeight: FontWeight.w600, color: AppTheme.lavenderPrimary),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: LinearProgressIndicator(
                      value: progress,
                      minHeight: 8,
                      backgroundColor: Colors.white,
                      valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.lavenderPrimary),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    progress == 1.0
                        ? 'Wonderful! You gave yourself mindful kindness today.'
                        : 'Take each step gently at your own pace without pressure.',
                    style: const TextStyle(fontSize: 12.5, color: AppTheme.textMuted),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            const Text('Gentle Daily Intentions', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),

            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _activities.length,
              itemBuilder: (context, i) {
                final item = _activities[i];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: CheckboxListTile(
                    value: item.isCompleted,
                    activeColor: AppTheme.lavenderPrimary,
                    title: Text(
                      item.title,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14.5,
                        decoration: item.isCompleted ? TextDecoration.lineThrough : null,
                        color: item.isCompleted ? AppTheme.textMuted : AppTheme.textDark,
                      ),
                    ),
                    subtitle: Text(
                      '\${item.durationMinutes} min • \${item.description}',
                      style: const TextStyle(fontSize: 12),
                    ),
                    onChanged: (val) {
                      setState(() {
                        item.isCompleted = val ?? false;
                      });
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/profile_screen.dart',
    name: 'profile_screen.dart',
    category: 'screen',
    description: 'Profile management, notification preferences, privacy disclosure, and data wipe',
    content: `import 'package:flutter/material.dart';
import '../services/storage_service.dart';
import '../theme/app_theme.dart';
import '../widgets/emergency_help_sheet.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _dailyReminder = true;
  bool _soundEnabled = true;

  void _clearLocalData() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Clear Locally Stored Mood Data?'),
        content: const Text('This will delete all offline mood entries stored on this device. This action cannot be undone.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Clear Data', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );

    if (confirm == true) {
      await StorageService.clearAllMoodData();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Local mood history cleared.')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile & Preferences')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          children: [
            // User Avatar & Name
            Center(
              child: Column(
                children: const [
                  CircleAvatar(
                    radius: 44,
                    backgroundImage: NetworkImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'),
                  ),
                  SizedBox(height: 12),
                  Text('Alex Rivera', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                  Text('alex.rivera@college.edu', style: TextStyle(fontSize: 13, color: AppTheme.textMuted)),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Preferences
            Card(
              child: Column(
                children: [
                  SwitchListTile(
                    title: const Text('Daily Wellness Reminder', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    subtitle: const Text('Gentle notification at 8:30 PM', style: TextStyle(fontSize: 12)),
                    value: _dailyReminder,
                    activeColor: AppTheme.lavenderPrimary,
                    onChanged: (val) => setState(() => _dailyReminder = val),
                  ),
                  const Divider(height: 1),
                  SwitchListTile(
                    title: const Text('Haptic / Audio Guidance', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    subtitle: const Text('Subtle cues during breathing exercises', style: TextStyle(fontSize: 12)),
                    value: _soundEnabled,
                    activeColor: AppTheme.lavenderPrimary,
                    onChanged: (val) => setState(() => _soundEnabled = val),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Emergency Resources Button
            Card(
              child: ListTile(
                leading: const Icon(Icons.health_and_safety_rounded, color: Color(0xFFC53030)),
                title: const Text('Crisis & Emergency Resources', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                subtitle: const Text('Access 24/7 free helplines (988, Tele-MANAS)', style: TextStyle(fontSize: 12)),
                trailing: const Icon(Icons.chevron_right_rounded),
                onTap: () {
                  showModalBottomSheet(
                    context: context,
                    isScrollControlled: true,
                    backgroundColor: Colors.transparent,
                    builder: (ctx) => const EmergencyHelpSheet(),
                  );
                },
              ),
            ),
            const SizedBox(height: 16),

            // Privacy & Data management
            Card(
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.delete_outline_rounded, color: Colors.red),
                    title: const Text('Clear Stored Mood Entries', style: TextStyle(color: Colors.red, fontWeight: FontWeight.w600, fontSize: 14)),
                    subtitle: const Text('Reset device storage cache', style: TextStyle(fontSize: 12)),
                    onTap: _clearLocalData,
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.logout_rounded, color: AppTheme.textMuted),
                    title: const Text('Sign Out', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    onTap: () => Navigator.pushReplacementNamed(context, '/welcome'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/widgets/mood_chart_widget.dart',
    name: 'mood_chart_widget.dart',
    category: 'widget',
    description: 'fl_chart-based 7-day mood history curve showing intensity trends',
    content: `import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../models/mood_entry.dart';
import '../theme/app_theme.dart';

class MoodChartWidget extends StatelessWidget {
  final List<MoodEntry> entries;

  const MoodChartWidget({super.key, required this.entries});

  @override
  Widget build(BuildContext context) {
    if (entries.isEmpty) {
      return Container(
        height: 160,
        alignment: Alignment.center,
        child: const Text('Log moods to see your weekly trend.', style: TextStyle(color: AppTheme.textMuted)),
      );
    }

    final spots = <FlSpot>[];
    final displayEntries = entries.take(7).toList().reversed.toList();
    for (int i = 0; i < displayEntries.length; i++) {
      spots.add(FlSpot(i.toDouble(), displayEntries[i].intensity.toDouble()));
    }

    return Container(
      height: 180,
      padding: const EdgeInsets.only(top: 16, right: 20, left: 10, bottom: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.black.withOpacity(0.04)),
      ),
      child: LineChart(
        LineChartData(
          minY: 1,
          maxY: 5,
          gridData: FlGridData(
            show: true,
            drawVerticalLine: false,
            horizontalInterval: 1,
            getDrawingHorizontalLine: (value) => FlLine(
              color: Colors.black.withOpacity(0.04),
              strokeWidth: 1,
            ),
          ),
          titlesData: FlTitlesData(
            topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                interval: 1,
                reservedSize: 28,
                getTitlesWidget: (val, meta) {
                  String label = '';
                  if (val == 5) label = '😊';
                  if (val == 4) label = '😌';
                  if (val == 3) label = '😐';
                  if (val == 2) label = '😟';
                  if (val == 1) label = '😢';
                  return Text(label, style: const TextStyle(fontSize: 12));
                },
              ),
            ),
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (val, meta) {
                  return Text('D\${val.toInt() + 1}', style: const TextStyle(fontSize: 10, color: AppTheme.textMuted));
                },
              ),
            ),
          ),
          borderData: FlBorderData(show: false),
          lineBarsData: [
            LineChartBarData(
              spots: spots,
              isCurved: true,
              color: AppTheme.lavenderPrimary,
              barWidth: 3,
              isStrokeCapRound: true,
              dotData: const FlDotData(show: true),
              belowBarData: BarAreaData(
                show: true,
                color: AppTheme.lavenderPrimary.withOpacity(0.12),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/widgets/emergency_help_sheet.dart',
    name: 'emergency_help_sheet.dart',
    category: 'widget',
    description: 'Emergency crisis modal bottom sheet with verified suicide & mental health helplines',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class EmergencyHelpSheet extends StatelessWidget {
  const EmergencyHelpSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: const [
                Icon(Icons.health_and_safety_rounded, color: Color(0xFFC53030), size: 28),
                SizedBox(width: 10),
                Text(
                  'Immediate Support & Helplines',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ],
            ),
            const SizedBox(height: 8),
            const Text(
              'If you or someone you know is in immediate crisis, please reach out to qualified emergency support. MindCare is a self-care app and does not replace emergency medical care.',
              style: TextStyle(fontSize: 13, height: 1.4, color: AppTheme.textMuted),
            ),
            const SizedBox(height: 20),

            _buildContactRow(
              title: '988 Suicide & Crisis Lifeline',
              subtitle: 'Free, confidential, available 24/7 across USA & Canada',
              phone: 'Dial 988',
            ),
            const SizedBox(height: 12),
            _buildContactRow(
              title: 'Crisis Text Line',
              subtitle: 'Free 24/7 text support with trained crisis counselors',
              phone: 'Text HOME to 741741',
            ),
            const SizedBox(height: 12),
            _buildContactRow(
              title: 'Tele-MANAS & KIRAN Helpline',
              subtitle: 'Toll-free 24/7 national mental health helpline (India)',
              phone: '14416 / 1800-599-0019',
            ),
            const SizedBox(height: 20),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pop(context),
                style: ElevatedButton.styleFrom(backgroundColor: AppTheme.textDark),
                child: const Text('Close'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContactRow({
    required String title,
    required String subtitle,
    required String phone,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF5F5),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFFEB2B2)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                const SizedBox(height: 2),
                Text(subtitle, style: const TextStyle(fontSize: 11.5, color: AppTheme.textMuted)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFFC53030),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              phone,
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}
`,
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'docs',
    description: 'Complete college lab report, project setup guide, emulator execution steps & viva questions',
    content: `# MindCare – Mental Health and Therapy Chat App
**College Mini-Project for UI Design Using Flutter Lab**

MindCare is a modern, compassionate Android mobile application built with **Flutter and Dart** using **Material 3**. It offers students and users a calming interface with soft lavender, light blue, mint-green, and white hues.

---

## 📱 Features Included
1. **Splash Screen**: Calming logo animation with tagline *"Your mental wellness matters."*
2. **Authentication Flow**: Welcome, Login, and Registration with password visibility toggles, form validation, and clear demo notices.
3. **Home Dashboard**: Personalized greetings, daily wellness thought/affirmation, quick navigation cards, and upcoming consultation preview.
4. **Therapist Directory**: Specialist cards with ratings, experience, approaches, filter chips (Anxiety, Relationships, Depression, Burnout), and detail modal.
5. **Therapy Chat**: Realistic conversational interface featuring compassionate clinical responses, prompt chips, and timestamped chat bubbles.
6. **Mood Tracker**: 5 distinct emotional states (Happy, Calm, Okay, Anxious, Sad), notes input, local persistence via \`shared_preferences\`, and 7-day trend line chart.
7. **Guided Breathing**: Interactive Box Breathing (4-4-4-4) with expanding somatic circle, countdown timer, cycle counter, and comfort precautions.
8. **Daily Self-Care Checklist**: Practical habits (mindfulness, hydration, walking, journaling) with progress bar and streak reinforcement.
9. **Profile & Emergency Resources**: Preferences toggles, clear local data, and emergency crisis hotlines (988, 741741, Tele-MANAS 14416).

---

## 🛠️ Technology Stack
- **Framework**: Flutter 3.x
- **Language**: Dart
- **Design System**: Material 3 (\`useMaterial3: true\`)
- **Key Packages**:
  - \`fl_chart\`: For 7-day mood trend visualization
  - \`google_fonts\`: Plus Jakarta Sans typography
  - \`shared_preferences\`: Offline persistence for mood logs
  - \`intl\`: Date and time formatting

---

## 🚀 How to Run the App

### Option A: Running in Visual Studio Code
1. Ensure the Flutter SDK is installed and configured in your \`PATH\` (\`flutter doctor\`).
2. Open the project root folder in **VS Code**.
3. Install the official **Flutter** and **Dart** extensions from the VS Code Marketplace.
4. Run \`flutter pub get\` in the integrated terminal to download all dependencies.
5. Open an Android emulator (from Device Manager) or connect an Android phone with USB Debugging enabled.
6. Press \`F5\` or click **Run > Start Debugging**.

### Option B: Running in Android Studio
1. Open **Android Studio** and select **Open** -> choose this project directory.
2. Android Studio will automatically recognize the Flutter project and prompt you to run \`pub get\`.
3. Open the **Device Manager** tool window and launch your preferred Android Virtual Device (e.g. Pixel 8 with API 34).
4. Select \`lib/main.dart\` in the target configuration dropdown and click the green **Play (Run)** button.

### Option C: Running via Terminal
\`\`\`bash
# 1. Fetch dependencies
flutter pub get

# 2. Verify connected devices
flutter devices

# 3. Launch application on target device
flutter run
\`\`\`

---

## 🧪 Common Troubleshooting Tips
- **Issue: "Target of URI doesn't exist"**: Run \`flutter pub get\` or restart the Dart Analysis Server in VS Code (\`Ctrl+Shift+P > Dart: Restart Analysis Server\`).
- **Issue: Gradle build daemon errors**: Run \`flutter clean && flutter pub get\` and ensure JDK 17 is configured.
- **Issue: Android SDK licenses not accepted**: Run \`flutter doctor --android-licenses\` in your terminal.

---

## 🎓 College Lab Viva Questions & Answers
- **Q1: Why was Material 3 chosen for this project?**
  *A1: Material 3 provides modern rounded surfaces, tonal color palettes (ColorScheme.fromSeed), and accessible NavigationBar components suited for wellness applications.*
- **Q2: How is data persisted offline?**
  *A2: Using \`shared_preferences\` with JSON serialization. Entries are encoded into JSON strings and stored in key-value format locally without requiring an active internet connection.*
- **Q3: What state management technique was used?**
  *A3: Clean \`StatefulWidget\` with modular callbacks and localized state updates, keeping the codebase transparent and readable for academic evaluation.*
`,
  },
];
