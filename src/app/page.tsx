import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="relative w-full h-[795px] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full scale-105 origin-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDV03Gi4dQDFzd7FZjYWV5MX3wzzUhb07b9c0plV0H6Ipdbep0QpKg1avHsghzteUQNwhkj1PSz1yAZ7DQgzpYt9Sp69zKRxNI6pdq5Wjd0-Qeozwa8kUHP89EuRR_K5Zt42LUhycKlQTSdHbxTZ_eoZ5twOUZEdFrm3SJmTH_khN7xjBuloA6_BWwkO_2C_Raw9oF8W9HjJVlGNpu_cCPmpWmce3IfLfYtmrsgKfBFaekzu_hCWYrElQ')",
                animation: "slow-zoom 20s ease-in-out infinite alternate",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>
          <Reveal className="relative z-10 text-center flex flex-col items-center px-5 md:px-20 max-w-3xl">
            <h1 className="font-display text-display-lg text-tertiary mb-6 uppercase tracking-wider">
              Colección Lumina
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
              El resplandor del oro puro. Una curaduría de elegancia atemporal, diseñada para el
              conocedor moderno.
            </p>
            <Link
              href="/colecciones"
              className="inline-flex items-center justify-center px-10 py-4 bg-tertiary text-on-primary font-body text-button uppercase tracking-widest hover:bg-surface hover:text-tertiary border border-tertiary transition-all duration-300"
            >
              Ver Colección
            </Link>
          </Reveal>
        </section>

        {/* Featured collections */}
        <section className="py-30 px-5 md:px-20 max-w-[1440px] mx-auto" id="collections">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-headline-sm text-tertiary uppercase tracking-widest mb-4">
              Selecciones Curadas
            </h2>
            <div className="w-12 h-px bg-secondary mx-auto" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px] md:auto-rows-[400px]">
            <Reveal className="md:col-span-8 md:row-span-2">
              <Link
                href="/colecciones"
                className="relative group overflow-hidden border border-outline-variant bg-surface-container-lowest block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBACBve4CDccqU-4jgxT8t75gfzeIbNkOCyyKC7dE-iu7O3KUrDj_bLbC5jVF_u1okqeSmFD639RvW5NBD06x8IFCiDgV5Oa-SRKfMP02XiwyE3yiBU3TEd6mSjSiZ91BMWXVHxI2fPDjBPucEI9seNEfn1puDxqXKKE9lV6X4jh-verYdTF2QYtNOjhQLdutj3ZnXbmfmjLOPYqOG2illTE3NzKDJice1r3I8XeyGIK7d4FTgWqaWsYg')",
                  }}
                />
                <div className="absolute inset-0 bg-tertiary/10 group-hover:bg-tertiary/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-tertiary/80 to-transparent flex justify-between items-end">
                  <div>
                    <span className="font-body text-label-caps text-secondary-fixed mb-2 block">
                      Nuevos Ingresos
                    </span>
                    <h3 className="font-display text-headline-md text-on-primary">Serie Sculptura</h3>
                  </div>
                  <span className="text-on-primary group-hover:text-secondary-fixed transition-colors">
                    <span className="material-symbols-outlined text-[32px] font-light">
                      arrow_right_alt
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal className="md:col-span-4" delay={100}>
              <Link
                href="/colecciones"
                className="relative group overflow-hidden border border-outline-variant bg-surface-container-lowest block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZQJ-_TZ7CKURehP6ldr-1a3rntAnaMrPQRG_39A_Yq8WTBz6UqlRWcacXI6r7s4a3MzxumVRpUocMXLk0NL1x6BWGMNE7Qw_ywwzX9oMZ-iGCKKUQ-WYcz4QEr6SbQ8K6gVT2rE8qrFIwDbccYQhYMG8ijeT9ZIBolWAz9pG0CW7LDrcFTB8AJ0KFy_VaPmbRt6Hlix8_x6VBj-6_ecgKxAtRA2dd9dnOCgKsQO7vfAuoJaI1Swobyg')",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 text-center">
                  <h3 className="font-display text-headline-sm text-tertiary mb-4">Anillos Finos</h3>
                  <span className="font-body text-button text-tertiary border-b border-tertiary pb-1 group-hover:text-secondary group-hover:border-secondary transition-colors">
                    Ver Ahora
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal className="md:col-span-4" delay={200}>
              <Link
                href="/colecciones"
                className="relative group overflow-hidden border border-outline-variant bg-surface-container-lowest block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApeAXcAyV2oJZ-5SQEtgY75zByjQ9V2OBtJiCzBlnnIGRRix-wT2_7vuy2aeKXGazs_FBl_upO3fKf8QMSl-dsRgrsWBxLdOMvmNp03IAJjTTcA6MysMYHOel1V2F1kCWrQB3UhKxi8zcvYLVRIqS0-zYI6TIzJpU5C7MFrX9CoNg1a-lbU-dEuiMMOQCHHWmn6fYXh9EVAyhi0JSg7OUEy0BSZtmrDHe5tXyViv7Ft_kzn_MUX-S_Qw')",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 text-center">
                  <h3 className="font-display text-headline-sm text-tertiary mb-4">Pulseras</h3>
                  <span className="font-body text-button text-tertiary border-b border-tertiary pb-1 group-hover:text-secondary group-hover:border-secondary transition-colors">
                    Ver Ahora
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Bespoke */}
        <section className="py-30 bg-surface-container-low border-y border-outline-variant" id="bespoke">
          <div className="max-w-[1440px] mx-auto px-5 md:px-20">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <Reveal className="w-full md:w-1/2">
                <div className="relative pt-[120%] md:pt-[100%] w-full overflow-hidden border border-outline-variant p-4 bg-surface-container-lowest">
                  <div
                    className="absolute inset-4 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-a1V00FhxZ0DZnkAhAC50G_2C3CteZ9Jk1HA7D43wRvgroH5Emz90OnRGc1t8ipFOue9L8C0dsgwkSpIM9eCmKsJR4E4cbWgadeUquD_IDfo41OLkgJW1NplQTgSZOO0DpAVduEX7kU8L8K-olxORHjemK647Own8b8cfodCfd5tD8GQiJ4oXdr3pFZk-PPKhNNru8UBuupNmQfxsIRLN4dT7rWqfLJvNge9wUBw0Ya8BViy6Z7OSsQ')",
                    }}
                  />
                </div>
              </Reveal>
              <Reveal className="w-full md:w-1/2 flex flex-col justify-center" delay={100}>
                <span className="font-body text-label-caps text-secondary mb-6 block uppercase tracking-[0.2em]">
                  Creaciones Personalizadas
                </span>
                <h2 className="font-display text-display-lg text-tertiary mb-8 uppercase">
                  Joyería a Medida
                </h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-12 max-w-md leading-relaxed">
                  Encarga una pieza tan única como tu historia. Nuestros artesanos colaboran contigo
                  para transformar tu visión en realidad, utilizando gemas selectas y oro de la más
                  alta calidad para crear piezas de herencia sin igual.
                </p>
                <ul className="flex flex-col gap-6 mb-12">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary font-light">edit</span>
                    <div>
                      <h4 className="font-body text-body-lg text-tertiary font-medium">
                        Consulta Inicial
                      </h4>
                      <p className="font-body text-body-md text-on-surface-variant mt-1">
                        Platicamos tu inspiración y preferencias de material.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary font-light">draw</span>
                    <div>
                      <h4 className="font-body text-body-lg text-tertiary font-medium">
                        Diseño y Boceto
                      </h4>
                      <p className="font-body text-body-md text-on-surface-variant mt-1">
                        Revisa diseños conceptuales hechos a mano, exclusivos para ti.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary font-light">
                      precision_manufacturing
                    </span>
                    <div>
                      <h4 className="font-body text-body-lg text-tertiary font-medium">
                        Maestría Artesanal
                      </h4>
                      <p className="font-body text-body-md text-on-surface-variant mt-1">
                        Tu pieza cobra vida en nuestro taller.
                      </p>
                    </div>
                  </li>
                </ul>
                <div>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-tertiary font-body text-button uppercase tracking-widest border border-tertiary hover:bg-tertiary hover:text-on-primary transition-all duration-300"
                  >
                    Agendar Cita
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Heritage */}
        <section className="py-30 px-5 md:px-20 max-w-[1440px] mx-auto text-center" id="heritage">
          <Reveal>
            <span className="font-body text-label-caps text-secondary mb-6 block uppercase tracking-[0.2em]">
              Nuestra Historia
            </span>
            <h2 className="font-display text-display-lg text-tertiary mb-10 max-w-4xl mx-auto uppercase">
              Excelencia Inquebrantable
            </h2>
            <div className="w-px h-24 bg-outline-variant mx-auto mb-10" />
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-16">
              Joyería Peña ha sido sinónimo de diseño visionario y artesanía meticulosa. Cada pieza
              que sale de nuestro taller lleva consigo el peso de la tradición y la promesa de una
              belleza duradera.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Reveal delay={100} className="flex flex-col items-center p-8 border border-outline-variant bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[48px] text-secondary mb-6 font-light">
                workspace_premium
              </span>
              <h3 className="font-display text-headline-sm text-tertiary mb-4">
                Los Mejores Materiales
              </h3>
              <p className="font-body text-body-md text-on-surface-variant text-center">
                Seleccionamos únicamente las gemas y metales preciosos más excepcionales.
              </p>
            </Reveal>
            <Reveal delay={200} className="flex flex-col items-center p-8 border border-outline-variant bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[48px] text-secondary mb-6 font-light">
                handyman
              </span>
              <h3 className="font-display text-headline-sm text-tertiary mb-4">Hecho a Mano</h3>
              <p className="font-body text-body-md text-on-surface-variant text-center">
                Cada creación es acabada meticulosamente a mano por maestros joyeros.
              </p>
            </Reveal>
            <Reveal delay={300} className="flex flex-col items-center p-8 border border-outline-variant bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[48px] text-secondary mb-6 font-light">
                all_inclusive
              </span>
              <h3 className="font-display text-headline-sm text-tertiary mb-4">Diseño Atemporal</h3>
              <p className="font-body text-body-md text-on-surface-variant text-center">
                Siluetas que trascienden las tendencias pasajeras, hechas para atesorarse por
                generaciones.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
