import telthImg from "../assets/image-8.jpeg";
import harleyImg from "../assets/image-12.jpeg";



export default function WhoWeAre() {
  return (
    <section className="py-[72px] bg-parchment">
      <div className="max-w-site mx-auto px-6">
        <div className="max-w-lg mb-7">
          <p className="text-brass-dark font-semibold text-[11.5px] tracking-[0.14em] uppercase mb-3">Who we are</p>
          <h2 className="font-serif font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink">
            Two organisations. One precision-care infrastructure.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          <Card tag="Technology &amp; Infrastructure" title="Telth" img={telthImg}>
            A US-based health-technology and infrastructure platform building the data, AI and operational backbone for precision healthcare delivery across India, UK, and the USA.
          </Card>
          <div className="hidden md:flex items-center justify-center font-serif text-2xl text-black">×</div>
          <Card tag="Clinical Delivery Partner" title="Harley Health System" img={harleyImg}>
            A UK healthcare delivery partner, working alongside Telth to establish precision-care infrastructure and training pathways across the UK, Europe and the MENA region through Eterna by Harley Health.
          </Card>
        </div>
      </div>
    </section>
  )
}

function Card({ tag, title, img, children }) {
  return (
    <div className="relative bg-paper border border-line rounded-md shadow-card p-7 overflow-hidden min-h-[211px]">
      {img && (
        <>
          <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-paper" />
        </>
      )}
      <div className="relative z-10">
        <p className="text-brass-dark font-bold text-[11px] tracking-[0.1em] uppercase mb-2" dangerouslySetInnerHTML={{ __html: tag }} />
        <h3 className="font-serif text-ink font-semibold text-lg mb-2">{title}</h3>
        <p className="text-black text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
