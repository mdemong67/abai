export default function ContentSection({ children }) {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-6 text-lg font-medium leading-8 text-[#5b6461] dark:text-white/70">
        {children}
      </div>
    </section>
  );
}
