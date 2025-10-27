export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Hoş Geldiniz! 👋
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Sağ alt köşedeki simgeye tıklayarak chatbot ile sohbet edebilirsiniz.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI destekli chatbot ile her zaman yardım alabilirsiniz
        </p>
      </div>
    </div>
  );
}
