import { useState } from 'react';

export default function Webhook() {
    const [loading, setLoading] = useState(false);
    const [endpoint, setEndpoint] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);

    const handleWebhook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponse(null);

        const url = "https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task" +
        `?url=${encodeURIComponent(endpoint)}` +
        `&email=${encodeURIComponent(email)}`;

        try {
            const res = await fetch(url);
            const text = await res.text();
            try{
                const json = JSON.parse(text);
                setResponse(json);
            } catch {
                setResponse(text);
            }
        } catch {
            setError(String(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue text-slate-100 p-6">
            <div className="w-full max-w-2xl rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow">
                <h1 className="text-2xl font-semibold">Webhook Validator</h1>
                <p className="text-slate-300 mt-2">
                Enter your email + your deployed <span className="font-mono">POST /webhook</span> URL, then test.
                </p>

                <form onSubmit={handleWebhook} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm text-slate-300">Email</label>
                    <input
                    className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 p-3 outline-none focus:border-slate-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm text-slate-300">Your API Endpoint URL</label>
                    <input
                    className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 p-3 outline-none focus:border-slate-600"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder="https://your-domain.com/webhook"
                    required
                    />
                    <p className="text-xs text-slate-400 mt-2">
                    Must be publicly reachable over HTTPS.
                    </p>
                </div>

                <button
                    disabled={loading}
                    className="w-full rounded-xl bg-slate-100 text-slate-900 font-medium p-3 disabled:opacity-60"
                >
                    {loading ? "Testing..." : "Test Endpoint"}
                </button>
                </form>

                {error && (
                <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-red-200">
                    {error}
                </div>
                )}

                {response !== null && (
                <pre className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm overflow-x-auto">
                    {typeof response === "string" ? response : JSON.stringify(response, null, 2)}
                </pre>
                )}
            </div>
        </div>
    );
}