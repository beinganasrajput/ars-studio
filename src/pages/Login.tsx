import { Sparkles } from 'lucide-react';
import { Link } from 'react-router';

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute inset-0 dotted-grid opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#7C3AED]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm mx-6">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">ARS Studio</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-sm text-white/40">Sign in to access your projects and dashboard.</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <button
            onClick={() => { window.location.href = getOAuthUrl(); }}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Sign in with Kimi
          </button>

          <p className="text-center text-xs text-white/30 mt-6">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-white/40 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
