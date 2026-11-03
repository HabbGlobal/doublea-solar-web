import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common.notFound");
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="neu mx-auto max-w-xl p-8 text-center sm:p-12">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-muted-foreground">{t("text")}</p>
          <Link href="/" className="btn-primary mt-8">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
