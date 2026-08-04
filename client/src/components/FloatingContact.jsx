import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Phone, Calendar, Send, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hi! Thank you for visiting Esland IT Solutions. How can we help you scale your business operations today?' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = { sender: 'user', text: chatMessage };
    setChatHistory((prev) => [...prev, userMsg]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'bot', text: "Thank you. Our senior architect has been notified of your inquiry. If you'd like an immediate response, please contact us at info@eslanditsolutions.com or schedule a discovery call directly." }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Primary Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="w-80 rounded-lg border border-[#E4E9F0] dark:border-white/10 bg-white dark:bg-[#0C1A2E] backdrop-blur-2xl p-4 shadow-xl dark:shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#003087] dark:text-[#5A9FE8]">Esland Support Desk</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Agents Online
                </span>
              </div>

              <div className="space-y-2">
                {/* Book Consultation */}
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full rounded-md bg-[#003087] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#002068] transition-all uppercase tracking-wider"
                >
                  <Calendar size={15} />
                  <span>Book Free Consultation</span>
                </Link>

                {/* WhatsApp Chat Link */}
                <a
                  href="https://wa.me/442038190333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full rounded-2xl border border-emerald-500/25 bg-emerald-950/20 px-4 py-3 text-xs font-bold text-emerald-400 hover:bg-emerald-950/30 transition-all uppercase tracking-wider"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.786.002-2.617-1.01-5.08-2.852-6.924C16.386 2.05 13.939 1.042 11.33 1.04c-5.407 0-9.81 4.39-9.812 9.799-.001 1.547.41 3.053 1.19 4.4l-.994 3.63 3.733-.979zm11.176-7.234c-.3-.15-1.77-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.95 1.175-.175.2-.35.225-.65.075-1.02-.519-1.794-.907-2.52-2.15-.175-.3-.175-.55-.05-.7.115-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.633-.927-2.233-.243-.585-.49-.505-.677-.515-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.025-.275.95-1.05 3.075-1.05 3.2 0 .125.075.25.15.35.075.1.75 1.15 1.825 1.625.263.116.516.185.708.243.682.215 1.3.183 1.79.11.545-.08 1.77-.725 2.02-1.39.25-.665.25-1.233.175-1.35-.075-.117-.275-.192-.575-.342z"/>
                  </svg>
                  <span>WhatsApp Business</span>
                </a>

                {/* Simulated Live Chat Button */}
                <button
                  onClick={() => {
                    setChatOpen(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-xs font-bold text-slate-200 hover:text-white transition-all uppercase tracking-wider"
                >
                  <MessageSquare size={15} />
                  <span>Start Live Chat</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-13 w-13 items-center justify-center rounded-lg text-white transition-all ${
            isOpen ? 'rotate-90' : ''
          }`}
          style={{
            background: '#003087',
            boxShadow: '0 4px 16px rgba(0,48,135,0.35)',
            border: '1px solid rgba(0,48,135,0.5)',
            width: '3.25rem',
            height: '3.25rem',
          }}
          aria-label="Contact options"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>

      {/* Simulated Live Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[480px] rounded-lg border border-[#E4E9F0] dark:border-white/10 bg-white dark:bg-[#07111F] shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-[#003087] dark:bg-[#071829] p-4 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white border border-white/15">
                  <HelpCircle size={18} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-black uppercase text-white leading-tight">Consultation Assistant</h4>
                  <p className="text-[9px] text-emerald-400 font-bold mt-0.5">Online • AI Partner</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide text-xs">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 leading-relaxed font-medium ${
                      msg.sender === 'user'
                        ? 'bg-[#003087] text-white rounded-tr-none'
                        : 'bg-[#F4F6F9] dark:bg-[#0C1A2E] text-[#0F1729] dark:text-slate-200 border border-[#E4E9F0] dark:border-white/08 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E4E9F0] dark:border-white/08 bg-[#F8F9FA] dark:bg-[#07111F] flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your business inquiry..."
                className="flex-1 rounded-md border border-[#E4E9F0] dark:border-white/10 bg-white dark:bg-[#0C1A2E] px-3 py-2 text-xs text-[#0F1729] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:border-[#003087] dark:focus:border-[#4080FF] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-md text-white hover:opacity-90 transition"
                style={{ background: '#003087' }}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
