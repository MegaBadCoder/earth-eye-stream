import {
  Bell,
  BrainCircuit,
  ChevronRight,
  Download,
  ExternalLink,
  FileStack,
  Flame,
  History,
  Layers,
  Satellite,
  SlidersHorizontal,
  Smartphone,
  TreeDeciduous,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealSection } from "./reveal-section";
import { cn } from "@/lib/utils";

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  text: string;
}

interface BentoServiceCardProps {
  title: string;
  description: string;
  features: FeatureItem[];
  accent?: boolean;
  visual?: React.ReactNode;
  tags?: string[];
  className?: string;
}

function BentoServiceCard({ title, description, features, accent, visual, tags, className }: BentoServiceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border p-6 sm:p-7",
        accent
          ? "border-primary/50 bg-gradient-to-br from-accent/80 to-accent/40 shadow-[var(--shadow-signal)]"
          : "border-border/80 bg-gradient-to-br from-panel/90 to-panel/60",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        {visual && <div className="mb-5">{visual}</div>}

        <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>

        <ul className="mt-5 space-y-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.title} className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent/60 text-primary">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-sm leading-5 text-muted-foreground">{f.text}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {tags && (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-panel/60 px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export function PgoPortalSection() {
  return (
    <RevealSection id="portal" className="scroll-mt-28 py-4 sm:py-6">
      <div className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Веб-приложение</p>
          <h2 className="section-title text-balance text-3xl sm:text-4xl lg:text-5xl">
            Портал ПГО — работайте с данными самостоятельно
          </h2>
          <p className="section-copy text-base leading-7 sm:text-lg">
            Заказывайте снимки, следите за пожарами и вырубками, запускайте ML-обработку по снимкам — всё на одной карте. Доступно на любом устройстве.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-panel/90 to-panel/60">
            <div className="px-6 pt-6 pb-0 sm:px-7 sm:pt-7">
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Заказ снимков
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Выбирайте территорию, просматривайте архив и получайте результат прямо на карте — без переписки и ожидания.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  { icon: Layers, title: "KML и GeoJSON", text: "Перетащите файл с областью интереса — граница отобразится на карте мгновенно." },
                  { icon: FileStack, title: "Архивные снимки", text: "Просматривайте квиклуки прямо на карте и заказывайте нужные." },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <li key={f.title} className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent/60 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{f.title}</p>
                        <p className="text-sm leading-5 text-muted-foreground">{f.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="relative -mt-[112px] mx-4 sm:mx-6">
              <img
                src="/pgo-macbook-clean.png"
                alt="Портал ПГО — поиск в архиве на карте"
                className="mx-auto w-[88%] translate-y-[30%] object-contain object-bottom sm:w-[80%]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <BentoServiceCard
              title="Мониторинг"
              description="Автоматическое отслеживание изменений на вашей территории интереса."
              accent
              features={[
                { icon: Flame, title: "Пожары", text: "Термоточки и динамика огневого фронта по вашей территории интереса." },
                { icon: TreeDeciduous, title: "Вырубки", text: "Изменения лесного покрова на карте с привязкой к снимкам." },
              ]}
            />
            <BentoServiceCard
              title="Личный кабинет"
              description="Все ваши заказы, результаты и оповещения — в одном месте."
              features={[
                { icon: Satellite, title: "Результаты на карте", text: "Просматривайте, масштабируйте и скачивайте готовые снимки." },
                { icon: Bell, title: "Уведомления", text: "Получите сигнал, когда заказ готов." },
                { icon: History, title: "История заказов", text: "Все заявки и результаты — в личном кабинете." },
              ]}
            />
          </div>

          <BentoServiceCard
            title="ML-обработка"
            description="Результаты машинного обучения по вашим снимкам — сравнение до/после, статистика и экспорт."
            accent
            features={[
              { icon: BrainCircuit, title: "Классификация и сегментация", text: "Автоматическое выделение объектов и изменений на снимках." },
              { icon: SlidersHorizontal, title: "Сравнение до/после", text: "Интерактивный слайдер для визуальной оценки результатов обработки." },
              { icon: Download, title: "Экспорт результатов", text: "Скачивайте статистику и файлы обработки в один клик." },
            ]}
          />

          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-panel/90 to-panel/60">
            <div className="flex flex-1 items-center justify-center px-6 pt-6">
              <img
                src="/pgo-mobile-clean.png"
                alt="Портал ПГО — мобильная версия"
                className="h-72 object-contain sm:h-96"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Работает на любом устройстве
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Портал доступен как PWA — откройте app.mtlab.space в браузере и добавьте на экран. Без App Store, без обновлений вручную.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["PWA", "iOS и Android", "Всегда актуальная версия"].map((t) => (
                  <span key={t} className="rounded-full border border-border bg-panel/60 px-3 py-1 text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button asChild variant="hero" size="lg">
            <a href="https://app.mtlab.space" target="_blank" rel="noopener noreferrer">
              Перейти на портал
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <Button asChild variant="signalOutline" size="lg">
            <a href="#contacts">Зарегистрироваться</a>
          </Button>
        </div>

        <div className="signal-line pt-6" />
      </div>
    </RevealSection>
  );
}
