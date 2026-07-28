// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import Cookies from 'js-cookie';

// // ✅ FIX: call the FastAPI backend DIRECTLY instead of going through Next.js's
// // dev-server proxy/rewrite. The "Failed to proxy ... socket hang up /
// // ECONNRESET" errors were coming from that proxy layer dying on slower
// // requests — calling the backend directly from the browser removes that
// // layer entirely. Make sure your backend's CORS allows this origin
// // (already configured for http://localhost:3000 in main.py).
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// const FALLBACK_VOICES = [
//   { id: 'af_heart', name: 'Heart (Female)', category: '👩 Female' },
//   { id: 'af_bella', name: 'Bella (Female)', category: '👩 Female' },
//   { id: 'af_nicole', name: 'Nicole (Female)', category: '👩 Female' },
//   { id: 'af_sarah', name: 'Sarah (Female)', category: '👩 Female' },
//   { id: 'af_sky', name: 'Sky (Female)', category: '👩 Female' },
//   { id: 'am_onyx', name: 'Onyx (Male)', category: '👨 Male' },
//   { id: 'am_echo', name: 'Echo (Male)', category: '👨 Male' },
//   { id: 'am_fenrir', name: 'Fenrir (Male)', category: '👨 Male' },
//   { id: 'am_liam', name: 'Liam (Male)', category: '👨 Male' },
// ];

// interface Voice {
//   id: string;
//   name: string;
//   category: string;
// }

// export default function UserDashboard() {
//   const { user, logout } = useAuth();
//   const [text, setText] = useState('');
//   const [selectedVoice, setSelectedVoice] = useState('af_heart');
//   const [voices, setVoices] = useState<Voice[]>(FALLBACK_VOICES);
//   const [loading, setLoading] = useState(false);
//   const [loadingVoices, setLoadingVoices] = useState(false);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [error, setError] = useState('');
//   const [charactersLeft, setCharactersLeft] = useState(user?.characters_limit || 10000);
//   const [charactersUsed, setCharactersUsed] = useState(user?.characters_used || 0);
//   const [selectedFormat, setSelectedFormat] = useState<'wav' | 'mp3'>('wav');

//   const groupedVoices = voices.reduce((acc: Record<string, Voice[]>, voice) => {
//     if (!acc[voice.category]) acc[voice.category] = [];
//     acc[voice.category].push(voice);
//     return acc;
//   }, {} as Record<string, Voice[]>);

//   useEffect(() => {
//     if (user) {
//       setCharactersLeft(user.characters_limit - user.characters_used);
//       setCharactersUsed(user.characters_used);
//     }
//   }, [user]);

//   useEffect(() => {
//     const fetchVoices = async () => {
//       setLoadingVoices(true);
//       try {
//         const token = Cookies.get('access_token');
//         const response = await fetch(`${API_BASE_URL}/tts/voices`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         if (response.ok) {
//           const data = await response.json();
//           if (Array.isArray(data.voices) && data.voices.length > 0) {
//             setVoices(data.voices);
//           }
//         }
//       } catch (err) {
//         console.warn('Falling back to default voice list:', err);
//       } finally {
//         setLoadingVoices(false);
//       }
//     };
//     fetchVoices();
//   }, []);

//   const charCount = text.length;
//   const isOverLimit = charCount > charactersLeft;

//   const generateSpeech = async () => {
//     if (!text.trim()) {
//       setError('Please enter some text.');
//       return;
//     }

//     if (charCount > charactersLeft) {
//       setError(`You have only ${charactersLeft} characters left.`);
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setAudioUrl(null);

//     try {
//       const token = Cookies.get('access_token');
//       if (!token) {
//         setError('Please login again.');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/tts/generate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           text: text,
//           voice: selectedVoice,
//           format: selectedFormat,
//         }),
//       });

//       if (!response.ok) {
//         let errorMsg = 'Failed to generate speech';
//         try {
//           const rawText = await response.text();
//           try {
//             const errorData = JSON.parse(rawText);
//             errorMsg = errorData.detail || rawText || errorMsg;
//           } catch {
//             errorMsg = rawText || errorMsg;
//           }
//         } catch {
//           // body couldn't be read, keep default message
//         }
//         throw new Error(errorMsg);
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setAudioUrl(url);

//       const charsUsed = response.headers.get('X-Characters-Used');
//       if (charsUsed) {
//         const used = parseInt(charsUsed);
//         setCharactersUsed((prev) => prev + used);
//         setCharactersLeft((prev) => prev - used);
//       }
//     } catch (err: any) {
//       console.error('TTS Error:', err);
//       setError(err.message || 'Failed to generate speech.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             🎙️ AI Voice Studio
//           </h1>
//           <div className="flex items-center gap-4">
//             <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
//               <span className="font-medium">{user?.full_name}</span>
//               <div className="text-xs">
//                 {charactersUsed.toLocaleString()} / {user?.characters_limit?.toLocaleString()} characters used
//               </div>
//             </div>
//             <button
//               onClick={logout}
//               className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* TTS Generator */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//             Text-to-Speech Generator
//           </h2>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg text-sm">
//               ❌ {error}
//             </div>
//           )}

//           {/* Character counter */}
//           <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
//             <span>Characters: {charCount}</span>
//             <span>
//               Remaining:{' '}
//               <span className={isOverLimit ? 'text-red-500 font-bold' : ''}>
//                 {Math.max(0, charactersLeft - charCount)}
//               </span>
//               / {charactersLeft}
//             </span>
//           </div>

//           {/* Progress bar */}
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
//             <div
//               className={`h-1.5 rounded-full transition-all ${
//                 isOverLimit ? 'bg-red-500' : 'bg-blue-500'
//               }`}
//               style={{
//                 width: `${((charactersUsed + charCount) / (user?.characters_limit || 1)) * 100}%`,
//               }}
//             />
//           </div>

//           {/* Text Input */}
//           <textarea
//             rows={6}
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type your text here... Use [happy], [sad], [angry] for emotional tone."
//             className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Voice Selection */}
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Choose Voice {loadingVoices && '⏳ Loading...'}
//               </label>
//               <select
//                 value={selectedVoice}
//                 onChange={(e) => setSelectedVoice(e.target.value)}
//                 disabled={loadingVoices}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
//               >
//                 {Object.keys(groupedVoices).map((category) => (
//                   <optgroup key={category} label={category}>
//                     {groupedVoices[category].map((voice: Voice) => (
//                       <option key={voice.id} value={voice.id}>
//                         {voice.name}
//                       </option>
//                     ))}
//                   </optgroup>
//                 ))}
//               </select>
//             </div>

//             {/* Audio Format */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Audio Format
//               </label>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setSelectedFormat('wav')}
//                   className={`flex-1 py-2 px-3 rounded-lg border transition ${
//                     selectedFormat === 'wav'
//                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                       : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                   }`}
//                 >
//                   WAV
//                 </button>
//                 <button
//                   onClick={() => setSelectedFormat('mp3')}
//                   className={`flex-1 py-2 px-3 rounded-lg border transition ${
//                     selectedFormat === 'mp3'
//                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                       : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                   }`}
//                 >
//                   MP3
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Generate Button */}
//           <button
//             onClick={generateSpeech}
//             disabled={loading || !text.trim() || isOverLimit || loadingVoices}
//             className="mt-4 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Generating...
//               </>
//             ) : (
//               '🔊 Generate Speech'
//             )}
//           </button>

//           {/* Audio Output */}
//           {audioUrl && (
//             <div className="mt-4 p-4 border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-3">
//               <p className="text-sm font-medium text-green-700 dark:text-green-300">
//                 ✅ Audio generated successfully!
//               </p>
//               <audio controls className="w-full" autoPlay>
//                 <source src={audioUrl} type={`audio/${selectedFormat}`} />
//                 Your browser does not support the audio element.
//               </audio>
//               <div className="flex flex-wrap gap-2">
//                 <a
//                   href={audioUrl}
//                   download={`speech_${Date.now()}.${selectedFormat}`}
//                   className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
//                 >
//                   ⬇️ Download {selectedFormat.toUpperCase()}
//                 </a>
//                 <button
//                   onClick={() => {
//                     setAudioUrl(null);
//                     URL.revokeObjectURL(audioUrl);
//                   }}
//                   className="inline-block px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded-lg transition"
//                 >
//                   ✕ Clear
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Tips */}
//           <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
//             <p className="font-medium mb-1">💡 Tips:</p>
//             <ul className="list-disc list-inside space-y-1 ml-2">
//               <li>
//                 Use <span className="font-mono">[happy]</span>,{' '}
//                 <span className="font-mono">[sad]</span>,{' '}
//                 <span className="font-mono">[angry]</span> tags for emotion.
//               </li>
//               <li>
//                 Add <span className="font-mono">[laugh]</span>,{' '}
//                 <span className="font-mono">[sigh]</span> for sound effects.
//               </li>
//               <li>
//                 Each character counts toward your{' '}
//                 <strong>{user?.characters_limit?.toLocaleString()}</strong>{' '}
//                 monthly limit.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import Cookies from 'js-cookie';

// // ✅ FIX: call the FastAPI backend DIRECTLY instead of going through Next.js's
// // dev-server proxy/rewrite. The "Failed to proxy ... socket hang up /
// // ECONNRESET" errors were coming from that proxy layer dying on slower
// // requests — calling the backend directly from the browser removes that
// // layer entirely. Make sure your backend's CORS allows this origin
// // (already configured for http://localhost:3000 in main.py).
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// const FALLBACK_VOICES = [
//   { id: 'af_heart', name: 'Heart (Female)', category: '👩 Female' },
//   { id: 'af_bella', name: 'Bella (Female)', category: '👩 Female' },
//   { id: 'af_nicole', name: 'Nicole (Female)', category: '👩 Female' },
//   { id: 'af_sarah', name: 'Sarah (Female)', category: '👩 Female' },
//   { id: 'af_sky', name: 'Sky (Female)', category: '👩 Female' },
//   { id: 'am_onyx', name: 'Onyx (Male)', category: '👨 Male' },
//   { id: 'am_echo', name: 'Echo (Male)', category: '👨 Male' },
//   { id: 'am_fenrir', name: 'Fenrir (Male)', category: '👨 Male' },
//   { id: 'am_liam', name: 'Liam (Male)', category: '👨 Male' },
// ];

// interface Voice {
//   id: string;
//   name: string;
//   category: string;
// }

// export default function UserDashboard() {
//   const { user, logout } = useAuth();
//   const [text, setText] = useState('');
//   const [selectedVoice, setSelectedVoice] = useState('af_heart');
//   const [voices, setVoices] = useState<Voice[]>(FALLBACK_VOICES);
//   const [loading, setLoading] = useState(false);
//   const [loadingVoices, setLoadingVoices] = useState(false);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [error, setError] = useState('');
//   const [charactersLeft, setCharactersLeft] = useState(user?.characters_limit || 10000);
//   const [charactersUsed, setCharactersUsed] = useState(user?.characters_used || 0);
//   const [selectedFormat, setSelectedFormat] = useState<'wav' | 'mp3'>('wav');

//   const groupedVoices = voices.reduce((acc: Record<string, Voice[]>, voice) => {
//     if (!acc[voice.category]) acc[voice.category] = [];
//     acc[voice.category].push(voice);
//     return acc;
//   }, {} as Record<string, Voice[]>);

//   useEffect(() => {
//     if (user) {
//       setCharactersLeft(user.characters_limit - user.characters_used);
//       setCharactersUsed(user.characters_used);
//     }
//   }, [user]);

//   useEffect(() => {
//     const fetchVoices = async () => {
//       setLoadingVoices(true);
//       try {
//         const token = Cookies.get('access_token');
//         const response = await fetch(`${API_BASE_URL}/tts/voices`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         if (response.ok) {
//           const data = await response.json();
//           if (Array.isArray(data.voices) && data.voices.length > 0) {
//             setVoices(data.voices);
//           }
//         }
//       } catch (err) {
//         console.warn('Falling back to default voice list:', err);
//       } finally {
//         setLoadingVoices(false);
//       }
//     };
//     fetchVoices();
//   }, []);

//   const charCount = text.length;
//   const isOverLimit = charCount > charactersLeft;

//   const generateSpeech = async () => {
//     if (!text.trim()) {
//       setError('Please enter some text.');
//       return;
//     }

//     if (charCount > charactersLeft) {
//       setError(`You have only ${charactersLeft} characters left.`);
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setAudioUrl(null);

//     try {
//       const token = Cookies.get('access_token');
//       if (!token) {
//         setError('Please login again.');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/tts/generate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           text: text,
//           voice: selectedVoice,
//           format: selectedFormat,
//         }),
//       });

//       if (!response.ok) {
//         let errorMsg = 'Failed to generate speech';
//         try {
//           const rawText = await response.text();
//           try {
//             const errorData = JSON.parse(rawText);
//             errorMsg = errorData.detail || rawText || errorMsg;
//           } catch {
//             errorMsg = rawText || errorMsg;
//           }
//         } catch {
//           // body couldn't be read, keep default message
//         }
//         throw new Error(errorMsg);
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setAudioUrl(url);

//       const charsUsed = response.headers.get('X-Characters-Used');
//       if (charsUsed) {
//         const used = parseInt(charsUsed);
//         setCharactersUsed((prev) => prev + used);
//         setCharactersLeft((prev) => prev - used);
//       }
//     } catch (err: any) {
//       console.error('TTS Error:', err);
//       setError(err.message || 'Failed to generate speech.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             🎙️ AI Voice Studio
//           </h1>
//           <div className="flex items-center gap-4">
//             <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
//               <span className="font-medium">{user?.full_name}</span>
//               <div className="text-xs">
//                 {charactersUsed.toLocaleString()} / {user?.characters_limit?.toLocaleString()} characters used
//               </div>
//             </div>
//             <button
//               onClick={logout}
//               className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* TTS Generator */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//             Text-to-Speech Generator
//           </h2>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg text-sm">
//               ❌ {error}
//             </div>
//           )}

//           {/* Character counter */}
//           <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
//             <span>Characters: {charCount}</span>
//             <span>
//               Remaining:{' '}
//               <span className={isOverLimit ? 'text-red-500 font-bold' : ''}>
//                 {Math.max(0, charactersLeft - charCount)}
//               </span>
//               / {charactersLeft}
//             </span>
//           </div>

//           {/* Progress bar */}
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
//             <div
//               className={`h-1.5 rounded-full transition-all ${
//                 isOverLimit ? 'bg-red-500' : 'bg-blue-500'
//               }`}
//               style={{
//                 width: `${((charactersUsed + charCount) / (user?.characters_limit || 1)) * 100}%`,
//               }}
//             />
//           </div>

//           {/* Text Input */}
//           <textarea
//             rows={6}
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type your text here... Use [happy], [sad], [angry] for emotional tone."
//             className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Voice Selection */}
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Choose Voice {loadingVoices && '⏳ Loading...'}
//               </label>
//               <select
//                 value={selectedVoice}
//                 onChange={(e) => setSelectedVoice(e.target.value)}
//                 disabled={loadingVoices}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
//               >
//                 {Object.keys(groupedVoices).map((category) => (
//                   <optgroup key={category} label={category}>
//                     {groupedVoices[category].map((voice: Voice) => (
//                       <option key={voice.id} value={voice.id}>
//                         {voice.name}
//                       </option>
//                     ))}
//                   </optgroup>
//                 ))}
//               </select>
//             </div>

//             {/* Audio Format */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Audio Format
//               </label>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setSelectedFormat('wav')}
//                   className={`flex-1 py-2 px-3 rounded-lg border transition ${
//                     selectedFormat === 'wav'
//                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                       : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                   }`}
//                 >
//                   WAV
//                 </button>
//                 <button
//                   onClick={() => setSelectedFormat('mp3')}
//                   className={`flex-1 py-2 px-3 rounded-lg border transition ${
//                     selectedFormat === 'mp3'
//                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                       : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                   }`}
//                 >
//                   MP3
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Generate Button */}
//           <button
//             onClick={generateSpeech}
//             disabled={loading || !text.trim() || isOverLimit || loadingVoices}
//             className="mt-4 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Generating...
//               </>
//             ) : (
//               '🔊 Generate Speech'
//             )}
//           </button>

//           {/* Audio Output */}
//           {audioUrl && (
//             <div className="mt-4 p-4 border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-3">
//               <p className="text-sm font-medium text-green-700 dark:text-green-300">
//                 ✅ Audio generated successfully!
//               </p>
//               <audio controls className="w-full" autoPlay>
//                 <source src={audioUrl} type={`audio/${selectedFormat}`} />
//                 Your browser does not support the audio element.
//               </audio>
//               <div className="flex flex-wrap gap-2">
//                 <a
//                   href={audioUrl}
//                   download={`speech_${Date.now()}.${selectedFormat}`}
//                   className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
//                 >
//                   ⬇️ Download {selectedFormat.toUpperCase()}
//                 </a>
//                 <button
//                   onClick={() => {
//                     setAudioUrl(null);
//                     URL.revokeObjectURL(audioUrl);
//                   }}
//                   className="inline-block px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded-lg transition"
//                 >
//                   ✕ Clear
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Tips */}
//           <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
//             <p className="font-medium mb-1">💡 Tips:</p>
//             <ul className="list-disc list-inside space-y-1 ml-2">
//               <li>
//                 Use <span className="font-mono">[happy]</span>,{' '}
//                 <span className="font-mono">[sad]</span>,{' '}
//                 <span className="font-mono">[angry]</span> tags for emotion.
//               </li>
//               <li>
//                 Add <span className="font-mono">[laugh]</span>,{' '}
//                 <span className="font-mono">[sigh]</span> for sound effects.
//               </li>
//               <li>
//                 Each character counts toward your{' '}
//                 <strong>{user?.characters_limit?.toLocaleString()}</strong>{' '}
//                 monthly limit.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

// ✅ Direct call to backend (no proxy issues)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const VOICES = [
  { id: 'af_heart', name: 'Heart (Female)' },
  { id: 'af_bella', name: 'Bella (Female)' },
  { id: 'af_nicole', name: 'Nicole (Female)' },
  { id: 'af_sarah', name: 'Sarah (Female)' },
  { id: 'am_onyx', name: 'Onyx (Male)' },
  { id: 'am_echo', name: 'Echo (Male)' },
  { id: 'am_fenrir', name: 'Fenrir (Male)' },
];

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('af_heart');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [chars, setChars] = useState(user?.characters_limit || 10000);
  const [used, setUsed] = useState(user?.characters_used || 0);

  useEffect(() => {
    if (user) {
      setChars(user.characters_limit - user.characters_used);
      setUsed(user.characters_used);
    }
  }, [user]);

  const charCount = text.length;

  const generateSpeech = async () => {
    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }

    if (charCount > chars) {
      setError(`Only ${chars} characters left.`);
      return;
    }

    setLoading(true);
    setError('');
    setAudioUrl(null);

    try {
      const token = Cookies.get('access_token');
      if (!token) {
        setError('Please login again.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/tts/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, voice: voice }),
      });

      // ✅ Check if OK before reading blob
      if (!response.ok) {
        let msg = 'Generation failed';
        try {
          const err = await response.json();
          msg = err.detail || msg;
        } catch {
          const txt = await response.text();
          msg = txt || msg;
        }
        throw new Error(msg);
      }

      // ✅ Read as BLOB
      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Audio is empty');
      }

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Update character usage
      const usedStr = response.headers.get('X-Characters-Used');
      if (usedStr) {
        const val = parseInt(usedStr);
        setUsed(used + val);
        setChars(chars - val);
      }

    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to generate speech.');
    } finally {
      setLoading(false);
    }
  };

  // Sample texts for quick testing
  const samples = [
    'Hello! Welcome to AI Voice Studio.',
    'The quick brown fox jumps over the lazy dog.',
    'Assalam o Alaikum! Ye AI Voice Studio hai.',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🎙️ Voice Studio
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user?.full_name} | {used} / {user?.characters_limit} chars
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg text-sm">
              ❌ {error}
              <button onClick={() => setError('')} className="ml-2 font-bold">✕</button>
            </div>
          )}

          {/* Character counter */}
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>Chars: {charCount}</span>
            <span className={charCount > chars ? 'text-red-500 font-bold' : ''}>
              Left: {Math.max(0, chars - charCount)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className={`h-2 rounded-full ${charCount > chars ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${((used + charCount) / (user?.characters_limit || 1)) * 100}%` }}
            />
          </div>

          {/* Text input */}
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Sample buttons */}
          <div className="mt-2 flex flex-wrap gap-2">
            {samples.map((s, i) => (
              <button
                key={i}
                onClick={() => setText(s)}
                className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 rounded"
              >
                Sample {i+1}
              </button>
            ))}
          </div>

          {/* Voice selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Voice
            </label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          {/* Generate button */}
          <button
            onClick={generateSpeech}
            disabled={loading || !text.trim() || charCount > chars}
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            {loading ? '⏳ Generating...' : '🔊 Generate Speech'}
          </button>

          {/* Audio output */}
          {audioUrl && (
            <div className="mt-4 p-4 border border-green-300 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <audio controls className="w-full" src={audioUrl} autoPlay />
              <div className="flex gap-2 mt-2">
                <a
                  href={audioUrl}
                  download={`speech_${Date.now()}.wav`}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg"
                >
                  ⬇️ Download
                </a>
                <button
                  onClick={() => setAudioUrl(null)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-lg"
                >
                  ✕ Clear
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            💡 Use [happy], [sad], [angry] for emotion. Each char counts toward limit.
          </div>
        </div>
      </div>
    </div>
  );
}