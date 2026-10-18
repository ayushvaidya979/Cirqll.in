/*
 * Device valuation data. Edit freely: prices are in ₹.
 *
 *   payout = brand base × age factor × condition factor
 *
 * `base` is what a less-than-a-year-old device in superb condition earns.
 * The result never drops below the category's `floor` (its material value)
 * and is rounded to the nearest ₹50.
 */

export const CATEGORIES = [
  {
    id: 'phone',
    name: 'Smartphone',
    blurb: 'Android phones, iPhones and more',
    floor: 300,
    brands: [
      {
        id: 'apple',
        name: 'Apple',
        base: 32000,
        models: [
          { id: 'ip-16pm', name: 'iPhone 16 Pro Max', base: 68000 },
          { id: 'ip-16p', name: 'iPhone 16 Pro', base: 58000 },
          { id: 'ip-16', name: 'iPhone 16 / 16 Plus', base: 46000 },
          { id: 'ip-15pm', name: 'iPhone 15 Pro Max', base: 52000 },
          { id: 'ip-15p', name: 'iPhone 15 Pro', base: 44000 },
          { id: 'ip-15', name: 'iPhone 15 / 15 Plus', base: 36000 },
          { id: 'ip-14pm', name: 'iPhone 14 Pro Max', base: 38000 },
          { id: 'ip-14p', name: 'iPhone 14 Pro', base: 32000 },
          { id: 'ip-14', name: 'iPhone 14 / 14 Plus', base: 26000 },
          { id: 'ip-13pm', name: 'iPhone 13 Pro Max', base: 28000 },
          { id: 'ip-13', name: 'iPhone 13 / 13 mini', base: 22000 },
          { id: 'ip-12', name: 'iPhone 12 / 12 Pro', base: 17000 },
          { id: 'ip-11', name: 'iPhone 11 / XR', base: 12000 },
          { id: 'ip-se', name: 'iPhone SE (3rd/2nd gen)', base: 9500 },
          { id: 'ip-other', name: 'Other iPhone', base: 8000 },
        ],
      },
      {
        id: 'samsung',
        name: 'Samsung',
        base: 22000,
        models: [
          { id: 'sam-s24u', name: 'Galaxy S24 Ultra', base: 56000 },
          { id: 'sam-s24', name: 'Galaxy S24 / S24+', base: 42000 },
          { id: 'sam-s23u', name: 'Galaxy S23 Ultra', base: 38000 },
          { id: 'sam-s23', name: 'Galaxy S23 / S23 FE', base: 28000 },
          { id: 'sam-fold', name: 'Galaxy Z Fold 5 / 4', base: 42000 },
          { id: 'sam-flip', name: 'Galaxy Z Flip 5 / 4', base: 28000 },
          { id: 'sam-s22', name: 'Galaxy S22 Series', base: 20000 },
          { id: 'sam-s21', name: 'Galaxy S21 / S20 Series', base: 14000 },
          { id: 'sam-a55', name: 'Galaxy A55 / A54 5G', base: 15000 },
          { id: 'sam-a35', name: 'Galaxy A35 / A34 5G', base: 12000 },
          { id: 'sam-m34', name: 'Galaxy M34 / M14 5G', base: 8500 },
          { id: 'sam-note20', name: 'Galaxy Note 20 Ultra', base: 16000 },
          { id: 'sam-other', name: 'Other Samsung', base: 7000 },
        ],
      },
      {
        id: 'google',
        name: 'Google',
        base: 20000,
        models: [
          { id: 'pix-9p', name: 'Pixel 9 Pro / Pro XL', base: 52000 },
          { id: 'pix-9', name: 'Pixel 9', base: 38000 },
          { id: 'pix-8p', name: 'Pixel 8 Pro', base: 34000 },
          { id: 'pix-8', name: 'Pixel 8 / 8a', base: 26000 },
          { id: 'pix-7p', name: 'Pixel 7 Pro', base: 22000 },
          { id: 'pix-7', name: 'Pixel 7 / 7a', base: 16000 },
          { id: 'pix-6', name: 'Pixel 6 / 6 Pro / 6a', base: 12000 },
          { id: 'pix-fold', name: 'Pixel Fold', base: 40000 },
          { id: 'pix-other', name: 'Other Pixel', base: 9000 },
        ],
      },
      {
        id: 'oneplus',
        name: 'OnePlus',
        base: 18000,
        models: [
          { id: 'op-13', name: 'OnePlus 13 / 13R', base: 38000 },
          { id: 'op-12', name: 'OnePlus 12 / 12R', base: 30000 },
          { id: 'op-11', name: 'OnePlus 11 / 11R', base: 22000 },
          { id: 'op-10', name: 'OnePlus 10 Pro / 10T', base: 16000 },
          { id: 'op-9', name: 'OnePlus 9 / 9 Pro', base: 12000 },
          { id: 'op-open', name: 'OnePlus Open', base: 44000 },
          { id: 'op-nord4', name: 'OnePlus Nord 4 / 3', base: 15000 },
          { id: 'op-nordce', name: 'OnePlus Nord CE 4 / CE 3', base: 11000 },
          { id: 'op-other', name: 'Other OnePlus', base: 7500 },
        ],
      },
      {
        id: 'xiaomi',
        name: 'Xiaomi',
        base: 9000,
        models: [
          { id: 'mi-14', name: 'Xiaomi 14 / 14 Ultra', base: 36000 },
          { id: 'mi-13p', name: 'Xiaomi 13 Pro', base: 24000 },
          { id: 'mi-12p', name: 'Xiaomi 12 Pro', base: 16000 },
          { id: 'rn-13p', name: 'Redmi Note 13 Pro+ / Pro', base: 14000 },
          { id: 'rn-13', name: 'Redmi Note 13 / 13C', base: 9000 },
          { id: 'rn-12', name: 'Redmi Note 12 Pro / 12', base: 8500 },
          { id: 'rn-11', name: 'Redmi Note 11 / 10 Series', base: 6500 },
          { id: 'red-12', name: 'Redmi 12 / 10 Prime', base: 5500 },
          { id: 'mi-other', name: 'Other Xiaomi / Redmi', base: 5000 },
        ],
      },
      {
        id: 'vivo',
        name: 'Vivo',
        base: 9000,
        models: [
          { id: 'v-x100', name: 'Vivo X100 / X100 Pro', base: 36000 },
          { id: 'v-x90', name: 'Vivo X90 / X90 Pro', base: 24000 },
          { id: 'v-v30', name: 'Vivo V30 / V30 Pro', base: 20000 },
          { id: 'v-v29', name: 'Vivo V29 / V27 Series', base: 15000 },
          { id: 'v-t3', name: 'Vivo T3 / T2 Series', base: 11000 },
          { id: 'v-y200', name: 'Vivo Y200 / Y100 5G', base: 9500 },
          { id: 'v-y21', name: 'Vivo Y21 / Y16 Series', base: 6000 },
          { id: 'v-other', name: 'Other Vivo', base: 5500 },
        ],
      },
      {
        id: 'oppo',
        name: 'Oppo',
        base: 9000,
        models: [
          { id: 'op-find', name: 'Oppo Find N3 Flip / Find X', base: 36000 },
          { id: 'op-r12', name: 'Oppo Reno 12 / 12 Pro', base: 22000 },
          { id: 'op-r11', name: 'Oppo Reno 11 / 10 Series', base: 16000 },
          { id: 'op-f25', name: 'Oppo F25 Pro / F23 5G', base: 12000 },
          { id: 'op-a79', name: 'Oppo A79 / A78 5G', base: 9500 },
          { id: 'op-a59', name: 'Oppo A59 / A38', base: 7000 },
          { id: 'op-other', name: 'Other Oppo', base: 5500 },
        ],
      },
      {
        id: 'motorola',
        name: 'Motorola',
        base: 8000,
        models: [
          { id: 'mot-razr', name: 'Moto Razr 50 / 40 Ultra', base: 35000 },
          { id: 'mot-e50', name: 'Moto Edge 50 Ultra / Pro', base: 24000 },
          { id: 'mot-e40', name: 'Moto Edge 40 / 40 Neo', base: 15000 },
          { id: 'mot-g85', name: 'Moto G85 / G84 5G', base: 11000 },
          { id: 'mot-g54', name: 'Moto G54 / G34 5G', base: 8000 },
          { id: 'mot-g73', name: 'Moto G73 / G62', base: 6500 },
          { id: 'mot-other', name: 'Other Motorola', base: 5000 },
        ],
      },
      {
        id: 'realme',
        name: 'Realme',
        base: 7500,
        models: [
          { id: 'rm-gt6', name: 'Realme GT 6 / GT 5 Pro', base: 24000 },
          { id: 'rm-12p', name: 'Realme 12 Pro+ / 12 Pro', base: 16000 },
          { id: 'rm-12', name: 'Realme 12 / 12x 5G', base: 10500 },
          { id: 'rm-11p', name: 'Realme 11 Pro+ / 11 5G', base: 11000 },
          { id: 'rm-narzo', name: 'Realme Narzo 70 / 60 Pro', base: 10000 },
          { id: 'rm-c67', name: 'Realme C67 / C55', base: 6500 },
          { id: 'rm-other', name: 'Other Realme', base: 5000 },
        ],
      },
      {
        id: 'other',
        name: 'Other',
        base: 5000,
        models: [
          { id: 'oth-np2', name: 'Nothing Phone (2) / (2a)', base: 17000 },
          { id: 'oth-np1', name: 'Nothing Phone (1)', base: 12000 },
          { id: 'oth-iqoo', name: 'iQOO 12 / Neo 9 Pro', base: 25000 },
          { id: 'oth-poco', name: 'Poco F6 / X6 Pro', base: 15000 },
          { id: 'oth-phone', name: 'Other Smartphone', base: 6000 },
          { id: 'oth-keypad', name: 'Feature Phone / Keypad', base: 800 },
        ],
      },
    ],
  },
  {
    id: 'laptop',
    name: 'Laptop',
    blurb: 'Windows laptops, MacBooks and Chromebooks',
    floor: 1000,
    brands: [
      {
        id: 'apple',
        name: 'Apple',
        base: 55000,
        models: [
          { id: 'mb-16m3', name: 'MacBook Pro 16" (M3 / M2)', base: 85000 },
          { id: 'mb-14m3', name: 'MacBook Pro 14" (M3 / M2)', base: 72000 },
          { id: 'mb-air15', name: 'MacBook Air 15" (M3 / M2)', base: 62000 },
          { id: 'mb-air13m2', name: 'MacBook Air 13" (M3 / M2)', base: 52000 },
          { id: 'mb-air13m1', name: 'MacBook Air 13" (M1)', base: 36000 },
          { id: 'mb-pro13m', name: 'MacBook Pro 13" (M1 / M2)', base: 40000 },
          { id: 'mb-pro-intel', name: 'MacBook Pro (Intel)', base: 22000 },
          { id: 'mb-air-intel', name: 'MacBook Air (Intel)', base: 16000 },
          { id: 'mb-other', name: 'Other MacBook', base: 14000 },
        ],
      },
      {
        id: 'dell',
        name: 'Dell',
        base: 30000,
        models: [
          { id: 'dell-xps15', name: 'XPS 15 / 16', base: 56000 },
          { id: 'dell-xps13', name: 'XPS 13 / 13 Plus', base: 46000 },
          { id: 'dell-alien', name: 'Alienware m16 / x14', base: 50000 },
          { id: 'dell-g15', name: 'G15 / G16 Gaming', base: 34000 },
          { id: 'dell-insp15', name: 'Inspiron 15 / 16', base: 26000 },
          { id: 'dell-insp14', name: 'Inspiron 14 / 2-in-1', base: 24000 },
          { id: 'dell-lat74', name: 'Latitude 7420 / 5420', base: 28000 },
          { id: 'dell-lat34', name: 'Latitude 3420 / E-Series', base: 15000 },
          { id: 'dell-other', name: 'Other Dell Laptop', base: 13000 },
        ],
      },
      {
        id: 'hp',
        name: 'HP',
        base: 28000,
        models: [
          { id: 'hp-spectre', name: 'Spectre x360 14 / 16', base: 54000 },
          { id: 'hp-omen', name: 'Omen 16 / 15', base: 46000 },
          { id: 'hp-envy', name: 'Envy x360 15 / 14', base: 34000 },
          { id: 'hp-victus', name: 'Victus 16 / 15 Gaming', base: 30000 },
          { id: 'hp-pav15', name: 'Pavilion 15 / Pavilion Plus', base: 24000 },
          { id: 'hp-pavaero', name: 'Pavilion Aero 13', base: 22000 },
          { id: 'hp-elite', name: 'EliteBook 840 / 1040', base: 32000 },
          { id: 'hp-15s', name: 'HP 15s / 14s Essential', base: 17000 },
          { id: 'hp-other', name: 'Other HP Laptop', base: 13000 },
        ],
      },
      {
        id: 'lenovo',
        name: 'Lenovo',
        base: 28000,
        models: [
          { id: 'len-x1', name: 'ThinkPad X1 Carbon', base: 56000 },
          { id: 'len-legion7', name: 'Legion Pro 7 / 5', base: 50000 },
          { id: 'len-legionslim', name: 'Legion Slim 5 / LOQ', base: 34000 },
          { id: 'len-yoga9', name: 'Yoga 9i / 7i 2-in-1', base: 40000 },
          { id: 'len-t14', name: 'ThinkPad T14 / E14', base: 30000 },
          { id: 'len-slim5', name: 'IdeaPad Slim 5 / Pro 5', base: 26000 },
          { id: 'len-slim3', name: 'IdeaPad Slim 3 / Gaming 3', base: 18000 },
          { id: 'len-tb15', name: 'ThinkBook 15 / 14', base: 24000 },
          { id: 'len-other', name: 'Other Lenovo Laptop', base: 13000 },
        ],
      },
      {
        id: 'asus',
        name: 'Asus',
        base: 27000,
        models: [
          { id: 'as-g14', name: 'ROG Zephyrus G14 / G16', base: 54000 },
          { id: 'as-strix', name: 'ROG Strix G16 / SCAR', base: 46000 },
          { id: 'as-tuf', name: 'TUF Gaming F15 / A15', base: 32000 },
          { id: 'as-zen14', name: 'ZenBook 14 OLED / Pro', base: 36000 },
          { id: 'as-duo', name: 'ZenBook Duo Dual-Screen', base: 44000 },
          { id: 'as-vpro', name: 'Vivobook Pro 15', base: 28000 },
          { id: 'as-v15', name: 'Vivobook 15 / S14', base: 20000 },
          { id: 'as-vgo', name: 'Vivobook Go 15', base: 15000 },
          { id: 'as-other', name: 'Other Asus Laptop', base: 12000 },
        ],
      },
      {
        id: 'acer',
        name: 'Acer',
        base: 22000,
        models: [
          { id: 'ac-pred', name: 'Predator Helios 16 / 18', base: 46000 },
          { id: 'ac-nitro', name: 'Nitro 5 / 16 Gaming', base: 30000 },
          { id: 'ac-swiftgo', name: 'Swift Go 14 / OLED', base: 28000 },
          { id: 'ac-swift3', name: 'Swift 3 / Swift Edge', base: 22000 },
          { id: 'ac-asp7', name: 'Aspire 7 / 5', base: 20000 },
          { id: 'ac-asp3', name: 'Aspire 3 / Lite', base: 14000 },
          { id: 'ac-other', name: 'Other Acer Laptop', base: 11000 },
        ],
      },
      {
        id: 'microsoft',
        name: 'Microsoft',
        base: 35000,
        models: [
          { id: 'ms-studio', name: 'Surface Laptop Studio 2 / 1', base: 54000 },
          { id: 'ms-lap6', name: 'Surface Laptop 6 / 5', base: 44000 },
          { id: 'ms-pro10', name: 'Surface Pro 10 / 9', base: 40000 },
          { id: 'ms-lapgo', name: 'Surface Laptop Go 3 / 2', base: 25000 },
          { id: 'ms-pro8', name: 'Surface Pro 8 / 7', base: 26000 },
          { id: 'ms-other', name: 'Other Surface', base: 15000 },
        ],
      },
      {
        id: 'msi',
        name: 'MSI',
        base: 32000,
        models: [
          { id: 'msi-stealth', name: 'Stealth 16 / 14 Studio', base: 52000 },
          { id: 'msi-raider', name: 'Raider GE78 / Vector', base: 48000 },
          { id: 'msi-katana', name: 'Katana 15 / Sword 15', base: 32000 },
          { id: 'msi-cyborg', name: 'Cyborg 15 / Thin GF63', base: 26000 },
          { id: 'msi-prest', name: 'Prestige 14 / 16', base: 30000 },
          { id: 'msi-mod', name: 'Modern 15 / 14', base: 18000 },
          { id: 'msi-other', name: 'Other MSI Laptop', base: 13000 },
        ],
      },
      {
        id: 'other',
        name: 'Other',
        base: 15000,
        models: [
          { id: 'oth-samlap', name: 'Samsung Galaxy Book', base: 30000 },
          { id: 'oth-lg', name: 'LG Gram 16 / 14', base: 34000 },
          { id: 'oth-milap', name: 'Xiaomi Notebook Pro', base: 22000 },
          { id: 'oth-rmlap', name: 'Realme Book Slim', base: 16000 },
          { id: 'oth-chromebook', name: 'Chromebook', base: 7500 },
          { id: 'oth-winlap', name: 'Other Windows Laptop', base: 12000 },
        ],
      },
    ],
  },
]

export const AGES = [
  { id: 'lt1', label: 'Less than 1 year', badge: '<1', unit: 'YEAR', level: 1, factor: 1 },
  { id: '1-2', label: '1 – 2 years', badge: '1–2', unit: 'YEARS', level: 2, factor: 0.72 },
  { id: '2-3', label: '2 – 3 years', badge: '2–3', unit: 'YEARS', level: 3, factor: 0.52 },
  { id: '3-5', label: '3 – 5 years', badge: '3–5', unit: 'YEARS', level: 4, factor: 0.34 },
  { id: '5+', label: 'More than 5 years', badge: '5+', unit: 'YEARS', level: 5, factor: 0.2 },
]

export const CONDITIONS = [
  { id: 'superb', name: 'Superb', text: 'Looks like new. No scratches, everything works.', factor: 1 },
  { id: 'good', name: 'Good', text: 'Minor scratches or signs of use, fully working.', factor: 0.8 },
  { id: 'cracked', name: 'Cracked display', text: 'Screen is cracked or has lines, but it turns on.', factor: 0.45 },
  { id: 'dead', name: 'Non-functional', text: 'Doesn’t turn on or has major faults.', factor: 0.12 },
]

// `baseOverride` is an exact-model price from the device catalogue, when known.
export function estimate(categoryId, brandId, ageId, conditionId, baseOverride) {
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  const brand = cat?.brands.find((b) => b.id === brandId)
  const age = AGES.find((a) => a.id === ageId)
  const cond = CONDITIONS.find((c) => c.id === conditionId)
  if (!cat || !brand || !age || !cond) return 0
  const raw = (baseOverride || brand.base) * age.factor * cond.factor
  return Math.max(cat.floor, Math.round(raw / 50) * 50)
}
