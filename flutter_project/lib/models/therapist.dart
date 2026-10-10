class Therapist {
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
    ];
  }
}
