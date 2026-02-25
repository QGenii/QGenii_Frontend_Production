import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Headphones, BookOpen } from 'lucide-react';
import ContactForm from '../Components/ContactForm';

const ContactPage = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@studyplanner.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: MessageSquare,
      title: 'Contact Form',
      description: 'Fill out our form for detailed inquiries',
      contact: 'Quick and easy',
      action: 'Open Form',
      onClick: () => setShowContactForm(true)
    }
  ];

  const faqItems = [
    {
      question: 'How do I create my first study plan?',
      answer: 'Click on "New Study Plan" from your dashboard, fill in the details like title, description, due date, and priority level. You can then add tasks and track your progress.'
    },
    {
      question: 'Can I sync my study plans with my calendar?',
      answer: 'Yes! Our built-in calendar integration allows you to view all your study plans and deadlines in one place. You can also export to external calendars.'
    },
    {
      question: 'How does the progress tracking work?',
      answer: 'You can update your progress percentage for each study plan and task. The system tracks your progress history and provides insights on your productivity patterns.'
    },
    {
      question: 'Can I collaborate with other students?',
      answer: 'Currently, study plans are individual. However, we\'re working on collaboration features that will be available in future updates.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use industry-standard encryption to protect your data. Your study plans and personal information are never shared with third parties.'
    },
    {
      question: 'Can I export my study plans?',
      answer: 'Yes, you can generate and download detailed reports of your study plans, progress, and statistics in PDF format.'
    }
  ];

  const supportFeatures = [
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Our support team is here to help you succeed with your study planning.'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access guides, tutorials, and best practices for effective study planning.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other students and share study tips and strategies.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Need help with your study plans? Have suggestions? We're here to support your academic success.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Can We Help?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the best way to reach us. We're committed to providing you with the support you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {method.description}
                  </p>
                  <p className="text-gray-800 font-medium mb-4">
                    {method.contact}
                  </p>
                  <button
                    onClick={method.onClick}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Support Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {supportFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about using our study planner.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Support Hours
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600">24/7 - We typically respond within 24 hours</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                    Weekend: 10:00 AM - 4:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
};

export default ContactPage;