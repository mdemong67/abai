export default function InnerPageHero({ title, intro }) {
  return (
    <section className="bg-[#071c17] px-4 py-14 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-black uppercase text-[#62e69f]">ABAI</p>
        <h1 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">{title}</h1>
        {intro && (
          <p className="mt-5 text-lg font-medium leading-8 text-white/75">{intro}</p>
        )}
      </div>
    </section>
  );
}
