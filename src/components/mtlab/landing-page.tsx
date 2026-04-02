import * as React from "react";
import {
  ArrowRight,
  BellRing,
  Building2,
  ChevronRight,
  Cpu,
  Flame,
  Landmark,
  Mail,
  MapPinned,
  Menu,
  Orbit,
  Phone,
  Plane,
  Radar,
  Satellite,
  Ship,
  Sprout,
  Trees,
  Waves,
  X,
} from "lucide-react";
import { z } from "zod";

import heroEarth from "@/assets/mtlab-hero-earth.jpg";
import { RevealSection } from "@/components/mtlab/reveal-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "О платформе", href: "#platform" },
  { label: "Продукты", href: "#products" },
  { label: "Инфраструктура", href: "#infrastructure" },
  { label: "Сценарии", href: "#scenarios" },
  { label: "Контакты", href: "#contacts" },
];

const dataSources = [
  {
    title: "Космос",
    description: "Оптические и радиолокационные КА, разрешение до 30 см",
    icon: Satellite,
  },
  {
    title: "Воздух",
    description: "БАС, аэрофотосъёмка",
    icon: Plane,
  },
  {
    title: "Земля",
    description: "Метео, IoT, СМИ",
    icon: Landmark,
  },
  {
    title: "Вода",
    description: "БЭК, течения, телеметрия",
    icon: Waves,
  },
];

const platformResults = ["Готовые снимки", "Мониторинг", "Аналитика", "API", "Уведомления"];

const products = [
  {
    title: "Актуальные снимки территории",
    description:
      "Архивные и новые оптические и радиолокационные снимки — под вашу область интереса, сроки и требуемый уровень обработки.",
    bullets: [
      "Разрешение от 0,3 до 0,5 м/пикс, в том числе стереосъёмка",
      "Оптика и радар — российские и зарубежные КА",
      "Поставка под нужный уровень обработки",
    ],
  },
  {
    title: "Мониторинг изменений на карте",
    description:
      "Готовые сервисы регулярного контроля с автоматическими оповещениями — без ручных проверок.",
    tags: [
      {
        title: "Пожары",
        details:
          "Термоточки, огневой фронт, выгоревшие площади, предиктивная аналитика. Оповещения в Telegram / MAX.",
      },
      {
        title: "Вырубки",
        details:
          "Периодический контроль от муниципального до федерального масштаба, автоматические триггеры при изменениях, интеграция с ГИС.",
      },
      {
        title: "Ледовая обстановка",
        details:
          "Радарные снимки Sentinel-1, данные метеоКА и АИС, режим близкий к реальному времени, для навигации по Севморпути.",
      },
      {
        title: "Сельхозземли",
        details:
          "Фактическое использование, уточнение границ полей, состояние посевов, сверка с кадастром.",
      },
      {
        title: "Незаконные постройки",
        details:
          "Сегментация зданий и инфраструктуры, сверка с ЕГРН, выявление расхождений и неучтённых объектов.",
      },
    ],
  },
  {
    title: "Геопространственная аналитика под ключ",
    description:
      "Полный цикл обработки данных ДЗЗ — от сырых снимков до продукции, готовой к интеграции в ваши бизнес-процессы.",
    bullets: [
      "Цифровые модели рельефа (ЦМР) и местности (ЦММ)",
      "Ортофотопланы и цифровые карты",
      "3D-модели территории и векторы",
      "Геометрическая и радиометрическая коррекция",
    ],
  },
];

const satelliteFleet = [
  { name: "КОЭН", type: "Оптический", resolution: "50 см" },
  { name: "EOS-O", type: "Оптический", resolution: "50 см" },
  { name: "EOS-R", type: "Мультисенсор + радар", resolution: "—" },
];

const computeStats = [
  { value: "16", label: "серверов Intel Xeon" },
  { value: "52", label: "GPU Tesla A100 и H100" },
  { value: "6 ПБ", label: "хранилища" },
];

const scenarios = [
  {
    title: "Региональный орган исполнительной власти",
    challenge: "контроль лесного фонда и пожарной обстановки на территории субъекта.",
    solution:
      "мониторинг пожаров и вырубок с оповещениями и периодическими отчётами. Данные на среднем и высоком разрешении, интеграция с профильными ГИС.",
    icon: Building2,
  },
  {
    title: "Агрохолдинг или банк",
    challenge: "верификация сельхозземель при субсидировании или кредитовании.",
    solution:
      "карта фактического использования сельхозземель по всей России, сверка с кадастром, сезонный мониторинг состояния посевов.",
    icon: Sprout,
  },
  {
    title: "Лесозаготовительная компания",
    challenge: "контроль лесных делян и выявление нелегальных вырубок в зоне интереса.",
    solution:
      "автоматические триггеры при обнаружении изменений, отчёты по площадям на данных Sentinel-2 и сверхвысокого разрешения.",
    icon: Trees,
  },
  {
    title: "Судоходная компания",
    challenge: "безопасная навигация по Северному морскому пути.",
    solution:
      "оперативный продукт ледовой обстановки — радарные снимки, метеоданные и АИС в режиме близком к реальному времени, API-доступ.",
    icon: Ship,
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100, "Имя слишком длинное"),
  contact: z
    .string()
    .trim()
    .min(5, "Укажите e-mail или телефон")
    .max(255, "Слишком длинное значение")
    .refine(
      (value) => {
        const emailOk = z.string().email().safeParse(value).success;
        const phoneOk = /^[+\d()\-\s]{7,}$/.test(value);
        return emailOk || phoneOk;
      },
      "Введите корректный e-mail или телефон",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Опишите задачу чуть подробнее")
    .max(1000, "Описание слишком длинное"),
});

type ContactFormState = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

const emptyForm: ContactFormState = { name: "", contact: "", message: "" };

function SectionHeader({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2 className="section-title text-balance text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="section-copy text-base leading-7 sm:text-lg">{description}</p> : null}
    </div>
  );
}

function ProductCard({ product, active = false }: { product: (typeof products)[number]; active?: boolean }) {
  const [activeTag, setActiveTag] = React.useState(product.tags?.[0]?.title ?? "");
  const selectedTag = product.tags?.find((tag) => tag.title === activeTag) ?? product.tags?.[0];

  return (
    <article
      className={cn(
        "panel-card flex h-full flex-col gap-6 p-6 sm:p-7",
        active && "border-primary/50 shadow-[var(--shadow-signal)]",
      )}
    >
      <div className="space-y-4">
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">{product.title}</h3>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">{product.description}</p>
      </div>

      {product.bullets ? (
        <ul className="space-y-3 text-sm leading-6 text-foreground/90">
          {product.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <ChevronRight className="mt-1 size-4 text-primary" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {product.tags ? (
        <div className="space-y-4">
          <div className="hide-scrollbar flex flex-wrap gap-2 overflow-x-auto pb-1">
            {product.tags.map((tag) => {
              const isCurrent = tag.title === selectedTag?.title;

              return (
                <button
                  key={tag.title}
                  type="button"
                  className={cn(
                    "monitor-chip rounded-xl border px-4 py-2 text-sm whitespace-nowrap transition-all",
                    isCurrent
                      ? "border-primary bg-accent text-foreground shadow-[var(--shadow-signal)]"
                      : "border-border bg-panel text-muted-foreground hover:border-primary/45 hover:text-foreground",
                  )}
                  onMouseEnter={() => setActiveTag(tag.title)}
                  onFocus={() => setActiveTag(tag.title)}
                  onClick={() => setActiveTag(tag.title)}
                >
                  {tag.title}
                </button>
              );
            })}
          </div>

          {selectedTag ? (() => {
            const index = product.tags.findIndex((tag) => tag.title === selectedTag.title);
            const Icon = [Flame, Trees, Waves, Sprout, Building2][index];

            return (
              <div className="tag-chip rounded-2xl px-4 py-4 text-sm leading-6">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <span>Подробнее</span>
                </div>
                <div className="flex gap-3">
                  <Icon className="mt-1 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{selectedTag.title}</p>
                    <p className="mt-1 text-muted-foreground">{selectedTag.details}</p>
                  </div>
                </div>
              </div>
            );
          })() : null}
        </div>
      ) : null}
    </article>
  );
}

export function MtlabLandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeProduct, setActiveProduct] = React.useState(products[0].title);
  const [formValues, setFormValues] = React.useState<ContactFormState>(emptyForm);
  const [errors, setErrors] = React.useState<ContactErrors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const heroRef = React.useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = heroRef.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    node.style.setProperty("--pointer-x", `${x}%`);
    node.style.setProperty("--pointer-y", `${y}%`);
  };

  const handlePointerLeave = () => {
    const node = heroRef.current;
    if (!node) return;
    node.style.setProperty("--pointer-x", "50%");
    node.style.setProperty("--pointer-y", "32%");
  };

  const handleFieldChange =
    (field: keyof ContactFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setSubmitted(false);
      setFormValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse(formValues);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        contact: fieldErrors.contact?.[0],
        message: fieldErrors.message?.[0],
      });
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setFormValues(emptyForm);
  };

  return (
    <main className="bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full border border-primary/45 bg-accent text-primary shadow-[var(--shadow-signal)]">
              <Orbit className="size-5" />
            </div>
            <div>
              <div className="font-display text-base font-bold tracking-[0.14em] text-foreground sm:text-lg">МТ-ЛАБ</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Earth observation</div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Button key={item.href} asChild variant="nav" size="sm">
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
          </nav>

          <Button
            type="button"
            variant="nav"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {menuOpen ? (
          <div className="border-t border-border/60 bg-card px-4 py-4 shadow-[var(--shadow-soft)] lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-transparent px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section
        id="top"
        ref={heroRef}
        className="hero-interactive site-grid relative flex min-h-screen items-end overflow-hidden"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <img
          src={heroEarth}
          alt="Тёмный спутниковый вид Земли из космоса"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20">
          <RevealSection className="max-w-4xl space-y-8">
            <div className="space-y-5">
              <p className="section-kicker">Платформа геопространственной осведомлённости</p>
              <h1 className="text-balance font-display text-4xl font-bold leading-[0.94] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
                МТ-ЛАБ — российская компания спутникового мониторинга Земли
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-xl">
                Помогаем государству и бизнесу принимать решения на основе актуальных данных дистанционного зондирования Земли.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <a href="#contacts">
                  Рассказать о задаче
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="signal-line" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <RevealSection id="platform" className="scroll-mt-28 py-4 sm:py-6">
          <div className="space-y-10">
            <SectionHeader
              kicker="О платформе"
              title="Платформа ПГО"
              description="Собираем данные из четырёх источников, обрабатываем их на собственных мощностях и передаём клиенту в виде готовых продуктов, отчётов или API."
            />

            <div className="grid gap-6">
              <div className="panel-card p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-primary">Шаг 1</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground">Источники данных</h3>
                  </div>
                  <Satellite className="size-6 text-primary" />
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {dataSources.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-[1.25rem] border border-border bg-panel p-4 xl:min-h-[13rem]">
                        <div className="mb-4 flex size-11 items-center justify-center rounded-full border border-primary/25 bg-accent text-primary">
                          <Icon className="size-5" />
                        </div>
                        <h4 className="font-display text-lg font-bold text-foreground">{item.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="panel-card border-primary/35 bg-accent p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-primary">Шаг 2</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground">Обработка</h3>
                  </div>
                  <Cpu className="size-6 text-primary" />
                </div>

                <div className="space-y-4 text-sm leading-7 text-foreground/88 sm:text-base">
                  <p className="font-display text-xl font-bold text-foreground">СОИ ДЗЗ</p>
                  <p>16 серверов Intel Xeon · 52 GPU Tesla A100/H100 · 6 ПБ хранилища · ML-алгоритмы обнаружения и классификации изменений</p>
                </div>
              </div>

              <div className="panel-card p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-primary">Шаг 3</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground">Результат для клиента</h3>
                  </div>
                  <BellRing className="size-6 text-primary" />
                </div>

                <div className="flex flex-wrap gap-3">
                  {platformResults.map((item) => (
                    <span key={item} className="tag-chip rounded-full px-4 py-2 text-sm">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="products" className="scroll-mt-28 space-y-8 rounded-[2rem] px-0 py-4 sm:py-6" delay={80}>
          <div className="px-1 sm:px-0">
            <SectionHeader title="Продукты" />
          </div>

          <div className="md:hidden">
            <div className="hide-scrollbar mb-5 flex gap-3 overflow-x-auto pb-2">
              {products.map((product) => (
                <button
                  key={product.title}
                  type="button"
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors",
                    activeProduct === product.title
                      ? "border-primary bg-accent text-foreground"
                      : "border-border bg-panel text-muted-foreground",
                  )}
                  onClick={() => setActiveProduct(product.title)}
                >
                  {product.title}
                </button>
              ))}
            </div>

            {products.filter((product) => product.title === activeProduct).map((product) => (
              <ProductCard key={product.title} product={product} active />
            ))}
          </div>

          <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>

          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-1 pt-2 text-center sm:px-0">
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Не нашли подходящее? Мы собираем решения под задачу — напишите, и подберём решение.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button asChild variant="hero" size="lg">
                <a href="#contacts">Запросить расчёт на услугу</a>
              </Button>
              <Button asChild variant="signalOutline" size="lg">
                <a href="#contacts">Рассказать о своей задаче</a>
              </Button>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="infrastructure" className="section-shell scroll-mt-28 rounded-[2rem] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14" delay={100}>
          <div className="relative z-10 space-y-10">
            <SectionHeader kicker="Собственная цепочка поставки" title="Космическая инфраструктура МТ-ЛАБ" />

            <blockquote className="border-l-2 border-primary pl-4 font-display text-2xl font-semibold leading-tight tracking-tight text-primary sm:text-3xl">
              Мы не только покупаем данные на рынке — мы строим собственную цепочку от спутника до клиента.
            </blockquote>

            <div className="grid gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Radar className="size-5 text-primary" />
                  <h3 className="font-display text-2xl font-bold text-foreground">Космические аппараты</h3>
                </div>

                <div className="space-y-3">
                  <div className="infra-row infra-row--fleet text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span>КА</span>
                    <span>Тип</span>
                    <span>Разрешение</span>
                  </div>
                  {satelliteFleet.map((item) => (
                    <div key={item.name} className="infra-row infra-row--fleet text-sm text-foreground/90 sm:text-base">
                      <span className="font-display font-bold text-foreground">{item.name}</span>
                      <span>{item.type}</span>
                      <span>{item.resolution}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-card space-y-5 p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <MapPinned className="size-5 text-primary" />
                  <h3 className="font-display text-2xl font-bold text-foreground">Наземная инфраструктура</h3>
                </div>

                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  Первая приёмопередающая земная станция МТ-ЛАБ уже работает в Москве. К 2026 году сеть расширится до 4 станций — они будут расположены в северных широтах Российской Федерации для оптимального охвата витков космических аппаратов.
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section-shell rounded-[2rem] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14" delay={120}>
          <div className="relative z-10 space-y-10">
            <SectionHeader title="Вычислительные мощности СОИ ДЗЗ — для вашей разработки" />

            <div className="grid gap-5 md:grid-cols-3">
              {computeStats.map((stat) => (
                <div key={stat.label} className="panel-card p-6 sm:p-7">
                  <div className="metric-value text-primary">{stat.value}</div>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>Ядром платформы ПГО является СОИ ДЗЗ — масштабируемая система потоковой обработки данных, разработанная МТ-ЛАБ при поддержке Фонда НТИ.</p>
                <p>Мы открываем доступ к этим мощностям для внешних разработчиков и компаний.</p>
                <div className="space-y-3 rounded-[1.5rem] border border-border bg-panel p-5">
                  <p className="font-display text-lg font-bold text-foreground">Подходит, если вам нужно:</p>
                  <ul className="space-y-3 text-foreground/88">
                    <li className="flex gap-3"><ChevronRight className="mt-1 size-4 text-primary" /><span>Обрабатывать большие объёмы геопространственных данных быстро и без собственной инфраструктуры</span></li>
                    <li className="flex gap-3"><ChevronRight className="mt-1 size-4 text-primary" /><span>Обучать или запускать ML-модели на спутниковых снимках</span></li>
                    <li className="flex gap-3"><ChevronRight className="mt-1 size-4 text-primary" /><span>Разрабатывать и тестировать продукты в сфере ДЗЗ, не вкладываясь в железо</span></li>
                  </ul>
                </div>
                <p>Вы получаете доступ к производительности уровня крупных ЦОД — без капитальных затрат и операционных хлопот.</p>
              </div>

              <div className="panel-card flex flex-col justify-between gap-6 p-6 sm:p-7">
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-foreground">Запускайте разработку и вычисления на мощностях МТ-ЛАБ</h3>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                    Доступ для геосервисов, R&amp;D-команд и продуктовых разработчиков, которым нужна быстрая обработка спутниковых данных и ML-пайплайны.
                  </p>
                </div>

                <Button asChild variant="signalOutline" size="lg">
                  <a href="#contacts">Обсудить условия доступа</a>
                </Button>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="scenarios" className="scroll-mt-28 space-y-8" delay={140}>
          <SectionHeader kicker="Сценарии" title="Сценарии применения" />

          <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <article key={scenario.title} className="panel-card min-w-[88vw] snap-start p-6 sm:min-w-[30rem] md:min-w-0 md:p-7">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/25 bg-accent text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">{scenario.title}</h3>
                  </div>

                  <div className="space-y-4 text-sm leading-7 sm:text-base">
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Задача:</span> {scenario.challenge}</p>
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Решение:</span> {scenario.solution}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </RevealSection>

        <RevealSection className="section-shell rounded-[2rem] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14" delay={160}>
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="section-kicker">Маркетплейс</p>
              <h2 className="section-title text-balance text-3xl sm:text-4xl lg:text-5xl">Разрабатываете решения в сфере геопространственной аналитики?</h2>
              <p className="section-copy text-base leading-7 sm:text-lg">
                Размести их на нашем портале! ПГО — маркетплейс геопространственных продуктов и сервисов. Приглашаем разработчиков опубликовать свои решения на платформе и поручить нам коммерциализацию.
              </p>
            </div>

            <Button asChild variant="signalOutline" size="lg">
              <a href="#contacts">Подробнее</a>
            </Button>
          </div>
        </RevealSection>

        <RevealSection id="contacts" className="scroll-mt-28 rounded-[2rem] border border-border bg-card px-5 py-10 shadow-[var(--shadow-soft)] sm:px-8 sm:py-12 lg:px-10 lg:py-14" delay={180}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="space-y-6">
              <SectionHeader
                kicker="Контакты"
                title="Свяжитесь с нами"
                description="Расскажите о вашей задаче — мы подберём решение и подготовим расчёт в течение 24 часов."
              />

              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Имя</label>
                  <Input
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleFieldChange("name")}
                    placeholder="Как к вам обращаться"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact" className="text-sm font-medium text-foreground">E-mail или телефон</label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formValues.contact}
                    onChange={handleFieldChange("contact")}
                    placeholder="name@company.ru или +7 (...)"
                    aria-invalid={Boolean(errors.contact)}
                  />
                  {errors.contact ? <p className="text-sm text-destructive">{errors.contact}</p> : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Краткое описание задачи / регион интереса</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    onChange={handleFieldChange("message")}
                    placeholder="Например: мониторинг пожаров в субъекте РФ, актуальные снимки или интеграция API"
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : null}
                </div>

                <div className="flex flex-col items-start gap-4 pt-2">
                  <Button type="submit" variant="hero" size="lg">Отправить</Button>
                  {submitted ? (
                    <p className="rounded-2xl border border-primary/30 bg-accent px-4 py-3 text-sm text-foreground">
                      Ваша заявка принята. Мы свяжемся с вами в течение 24 часов.
                    </p>
                  ) : null}
                </div>
              </form>
            </div>

            <aside className="panel-card flex flex-col gap-6 p-6 sm:p-7">
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold text-foreground">ООО «МТ-ЛАБ»</h3>
              </div>

              <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                <div className="flex gap-3">
                  <MapPinned className="mt-1 size-5 shrink-0 text-primary" />
                  <span>121151, г. Москва, ул. Раевского, д. 4</span>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-1 size-5 shrink-0 text-primary" />
                  <a href="tel:+74996494999" className="transition-colors hover:text-foreground">+7 (499) 649-49-99</a>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-1 size-5 shrink-0 text-primary" />
                  <a href="mailto:info@mtlab.space" className="transition-colors hover:text-foreground">info@mtlab.space</a>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-primary/20 bg-accent p-5 text-sm leading-7 text-foreground/88">
                <p className="font-display text-lg font-bold text-foreground">Для кого ПГО</p>
                <p className="mt-3">Государственные заказчики, агрохолдинги, банки, лесопользователи, судоходные компании и разработчики геосервисов.</p>
              </div>
            </aside>
          </div>
        </RevealSection>
      </div>
    </main>
  );
}