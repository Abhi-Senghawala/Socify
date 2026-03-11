import React, { useState } from "react";
import {
  HelpCircle,
  Book,
  MessageCircle,
  Mail,
  FileText,
  AlertCircle,
  ThumbsUp,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const HelpSettings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    category: "general",
  });

  const faqs = [
    {
      id: 1,
      question: "How do I change my password?",
      answer:
        'Go to Settings > Security, then click on "Change Password". You\'ll need your current password to set a new one.',
    },
    {
      id: 2,
      question: "How do I delete my account?",
      answer:
        "Account deletion can be done in Settings > Account. Please note that this action is permanent and cannot be undone.",
    },
    {
      id: 3,
      question: "How do I report inappropriate content?",
      answer:
        'Click the three dots on any post and select "Report". Our team will review it within 24 hours.',
    },
    {
      id: 4,
      question: "How do I block someone?",
      answer:
        'Go to their profile, click the three dots, and select "Block". They won\'t be notified.',
    },
    {
      id: 5,
      question: "How do I make my account private?",
      answer:
        'Go to Settings > Privacy and toggle on "Private Account". Only approved followers can see your posts.',
    },
  ];

  const resources = [
    {
      icon: Book,
      title: "User Guide",
      description: "Learn how to use all features",
      link: "#",
    },
    {
      icon: FileText,
      title: "Terms of Service",
      description: "Our terms and conditions",
      link: "#",
    },
    {
      icon: AlertCircle,
      title: "Community Guidelines",
      description: "Rules for the community",
      link: "#",
    },
    {
      icon: ThumbsUp,
      title: "Tips & Tricks",
      description: "Get the most out of Socify",
      link: "#",
    },
  ];

  const supportCategories = [
    { value: "general", label: "General Question" },
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing & Payments" },
    { value: "account", label: "Account Access" },
    { value: "report", label: "Report Content" },
    { value: "other", label: "Other" },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    setShowContactForm(false);
    // Show success message
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle size={24} className="text-purple-400" />
          <h2 className="text-white font-semibold text-lg">Help & Support</h2>
        </div>
        <p className="text-gray-400 text-sm">
          Get help with your account, find answers to common questions, or
          contact our support team.
        </p>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-white font-semibold mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                }
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <span className="text-white text-sm font-medium text-left">
                  {faq.question}
                </span>
                {expandedFaq === faq.id ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </button>

              {expandedFaq === faq.id && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-400 py-4">
            No FAQs found matching your search
          </p>
        )}
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-white font-semibold mb-4">Help Resources</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.link}
                className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Icon size={20} className="text-purple-400 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm mb-1">
                    {resource.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {resource.description}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle size={20} className="text-purple-400" />
          <h3 className="text-white font-semibold">Contact Support</h3>
        </div>

        {!showContactForm ? (
          <button
            onClick={() => setShowContactForm(true)}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Send us a message
          </button>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Category
              </label>
              <select
                value={contactForm.category}
                onChange={(e) =>
                  setContactForm({ ...contactForm, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {supportCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Brief summary of your issue"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Message
              </label>
              <textarea
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Describe your issue in detail..."
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Send Message
              </button>
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="px-4 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
          <Mail size={16} className="text-gray-400" />
          <p className="text-xs text-gray-400">
            Average response time: <span className="text-white">24 hours</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSettings;
