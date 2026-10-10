import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ShieldAlert, ArrowLeft, Bot, CheckCheck } from 'lucide-react';
import { ChatMessage, Therapist } from '../../../types';
import { INITIAL_CHAT_MESSAGES, SAMPLE_THERAPISTS } from '../../../data/sampleData';

interface ChatScreenProps {
  currentTherapist?: Therapist;
  onOpenEmergency: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  currentTherapist = SAMPLE_THERAPISTS[0],
  onOpenEmergency,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'I feel overwhelmed by college deadlines',
    'Can we practice a quick breathing technique?',
    'My thoughts keep racing at bedtime',
    'How do I handle imposter syndrome?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate thoughtful therapist response
    setTimeout(() => {
      let reply = `Thank you for sharing that with me, Alex. Acknowledging these feelings without judging yourself is a crucial foundation in mindfulness. When you notice this sensation, where do you feel it in your body?`;

      const lower = text.toLowerCase();
      if (lower.includes('deadline') || lower.includes('exam') || lower.includes('overwhelm') || lower.includes('college')) {
        reply = `Academic pressure can trigger our fight-or-flight response, making even small tasks feel monumental. Let's remember: your self-worth is not tied to productivity. What is one small, manageable step we can focus on for just 10 minutes today?`;
      } else if (lower.includes('breath') || lower.includes('breathing')) {
        reply = `Breathing exercises are wonderfully grounding for the nervous system. Let's switch over to the Guided Breathing screen or take four slow breaths right now: inhale for 4 seconds, hold for 4, exhale for 4. Shall we try?`;
      } else if (lower.includes('sleep') || lower.includes('night') || lower.includes('racing')) {
        reply = `When the room gets quiet, all unaddressed thoughts from the day tend to surface. A helpful CBT tool is 'worry journaling'—writing down the top 3 racing thoughts on paper before bed to give your mind permission to rest.`;
      } else if (lower.includes('imposter') || lower.includes('good enough') || lower.includes('failure')) {
        reply = `Imposter thoughts are exceptionally common among dedicated students. We often compare our messy internal doubts with other people's curated external highlights. What evidence do you have of challenges you've successfully overcome in the past?`;
      }

      const therapistMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'therapist',
        therapistId: currentTherapist.id,
        therapistName: currentTherapist.name,
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      };

      setMessages(prev => [...prev, therapistMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F8F9FD] text-slate-800">
      {/* Top Bar */}
      <div className="px-4 py-3 bg-white border-b border-slate-200/80 shadow-xs flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentTherapist.avatarUrl}
              alt={currentTherapist.name}
              className="w-10 h-10 rounded-2xl object-cover ring-2 ring-purple-100"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 leading-tight">
              {currentTherapist.name}
            </h2>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-slate-500 font-medium">Online</span>
              <span className="text-[10px] text-slate-300">•</span>
              <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.2 rounded">
                Demo AI Counselor
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenEmergency}
          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Crisis Helplines"
        >
          <ShieldAlert className="w-5 h-5" />
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="px-4 py-2 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border-b border-purple-100 text-center">
        <p className="text-[10px] text-purple-800 leading-tight">
          <strong>Academic Simulation:</strong> Responses provide supportive CBT insights. For clinical emergencies, call 988.
        </p>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 pb-2">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[82%] p-3.5 rounded-3xl text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-[#8C7AE6] text-white rounded-tr-xs shadow-purple-500/10'
                    : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/70'
                }`}
              >
                {!isUser && (
                  <div className="text-[10px] font-bold text-purple-700 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{msg.therapistName || currentTherapist.name}</span>
                  </div>
                )}
                <p>{msg.text}</p>
                <div
                  className={`mt-1.5 text-[9px] flex items-center justify-end gap-1 ${
                    isUser ? 'text-purple-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-purple-200" />}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-xs py-1 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl border border-slate-200 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-[11px] text-slate-400 ml-1.5">{currentTherapist.name.split(',')[0]} is reflecting...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200/60 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-xl text-[11px] text-slate-700 whitespace-nowrap transition-colors shrink-0 shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field Bar */}
      <div className="p-3 bg-white border-t border-slate-200/80 mb-16">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type your thoughts to your counselor..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-2xl bg-[#8C7AE6] hover:bg-[#7A67D8] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md shadow-purple-500/20 active:scale-95 shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
