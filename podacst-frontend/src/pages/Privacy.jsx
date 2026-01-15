export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
        <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Information We Collect</h2>
          <p>We collect information you provide when creating an account, including your email, username, and profile information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis to improve our service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time through your profile settings.</p>
        </section>
      </div>
    </div>
  );
}
