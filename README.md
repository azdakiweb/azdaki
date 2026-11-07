# აზდაკის ბაღი

ინკლუზიური თეატრის ორენოვანი (KA / EN) საიტი. Next.js 16, App Router, CSS Modules.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## სად რა არის

| გზა | შინაარსი |
| --- | --- |
| `src/lib/api.ts` | მონაცემების ერთადერთი წყარო. ბექენდი აქ ერთდება |
| `src/content/types.ts` | მონაცემების ტიპები: API-მ ეს ფორმები უნდა დააბრუნოს |
| `src/content/*.ts` | დროებითი მონაცემები |
| `src/i18n/dictionary.ts` | ინტერფეისის ტექსტები ორივე ენაზე |
| `src/styles/globals.css` | ფერები, ტიპოგრაფიკა, ზომები |
| `public/brand/` | ლოგო SVG-ში, ბრენდბორდიდან ამოღებული (`scripts/trace-logo.mjs`) |

## ბექენდის მიერთება

გვერდები მონაცემებს მხოლოდ `src/lib/api.ts`-ის ფუნქციებით იღებენ, ამიტომ საკმარისია ამ ფაილის შეცვლა:

```ts
export const getNews = () =>
  fetch(`${process.env.API_URL}/news`, { next: { revalidate: 60 } }).then((r) => r.json());
```

- მთავარი გვერდის ცვალებადი ფოტო: სპექტაკლი `cover` ველით (ჰორიზონტალური ფოტო, სასურველია მინიმუმ 1600px სიგანე).
- სპონსორები, ალბომები და YouTube ვიდეოები მასივებია, ამიტომ დამატება და წაშლა მხოლოდ მონაცემების ცვლილებაა.
- ლოგო ან ფოტო გარე დომენიდან თუ მოვა, `next.config.ts`-ის `images.remotePatterns`-ში უნდა დაემატოს.

## ფოტოები

ორიგინალები ჩააგდეთ `assets-src/photos/`-ში და გაუშვით:

```bash
npm run images
```

შედეგი `public/images/`-ში მოხვდება: WebP, მაქსიმუმ 2000px, მეტამონაცემების გარეშე. საიტზე `next/image` თითოეულ ეკრანს შესაფერის ზომას და AVIF/WebP ფორმატს აწვდის.

`public/images/{posters,scenes,people}` დროებითი გამოსახულებებია (`npm run placeholders`).

ვებზე გასვლისას დააყენეთ `NEXT_PUBLIC_SITE_URL` (sitemap-ისა და სოციალური ბმულებისთვის).
