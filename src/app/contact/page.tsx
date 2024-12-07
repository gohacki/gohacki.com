// src/app/contact/page.tsx

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold">Contact Me</h1>
        <p className="mt-4">
          Feel free to reach out to me via email at <a href="mailto:your.email@example.com" className="text-blue-500">your.email@example.com</a>.
        </p>
      </main>
      
    </div>
  );
}