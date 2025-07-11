// CSS styles for the HTML email template

export const getEmailStyles = (): string => {
  return `
        /* Modern CSS Reset */
        * { box-sizing: border-box; }
        
        /* Premium Glassmorphism Effect */
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        }
        
        /* Elegant Hover Effects */
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }
        
        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }
        
        /* Subtle Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        /* Premium Gradients */
        .premium-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .service-gradient {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .success-gradient {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        /* Enhanced Typography */
        .premium-title {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Responsive Design */
        @media (max-width: 600px) {
            .responsive-padding { padding: 20px !important; }
            .responsive-text { font-size: 14px !important; }
            .btn-responsive { 
                display: block !important; 
                width: 100% !important; 
                margin: 10px 0 !important; 
            }
        }
    `;
};