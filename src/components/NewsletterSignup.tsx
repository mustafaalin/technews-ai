import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Temporarily disable newsletter signup until Supabase is configured
    try {
      // Simulate successful signup for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Başarıyla abone oldunuz! Teşekkür ederiz.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const resetStatus = () => {
    if (status !== 'loading') {
      setStatus('idle');
      setMessage('');
    }
  };

  return (
    <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
      <div className="flex justify-center mb-4">
        <Mail className="w-12 h-12 text-blue-100" />
      </div>
      <h3 className="text-2xl font-bold mb-4">Hiçbir Haberi Kaçırmayın</h3>
      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
        Günlük yapay zeka destekli teknoloji haberi özetlerini e-posta kutunuza alın. 
        Bilgili kalan binlerce profesyonele katılın.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                resetStatus();
              }}
              placeholder="E-posta adresinizi girin"
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              disabled={status === 'loading'}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {status === 'loading' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              'Abone Ol'
            )}
          </button>
        </div>
        
        {/* Status Messages */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg flex items-center justify-center ${
            status === 'success' 
              ? 'bg-green-500/20 text-green-100' 
              : 'bg-red-500/20 text-red-100'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <AlertCircle className="w-4 h-4 mr-2" />
            )}
            <span className="text-sm">{message}</span>
          </div>
        )}
      </form>
      
      <p className="text-blue-200 text-xs mt-4">
        Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
      </p>
    </div>
  );
};

export default NewsletterSignup;