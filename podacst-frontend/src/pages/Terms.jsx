export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
      <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
        <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Acceptance of Terms</h2>
          <p>By accessing and using PodWave, you accept and agree to be bound by these Terms of Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">User Accounts</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must be at least 13 years old to use this service</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must not use the service for any illegal purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Content Guidelines</h2>
          <p>Users who upload podcasts must ensure they own the rights to the content or have permission to share it. Prohibited content includes:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Copyrighted material without permission</li>
            <li>Hate speech or discriminatory content</li>
            <li>Illegal or harmful content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Termination</h2>
          <p>We reserve the right to terminate or suspend accounts that violate these terms without prior notice.</p>
        </section>
      </div>
    </div>
  );
}
