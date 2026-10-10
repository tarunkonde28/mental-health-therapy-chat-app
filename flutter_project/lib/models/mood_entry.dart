class MoodEntry {
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
