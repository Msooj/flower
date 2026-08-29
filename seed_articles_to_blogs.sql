-- Seed articles from articles.js into the blogs table
-- Run this in your Supabase SQL Editor AFTER the blogs table is created

-- Temporarily disable RLS on blogs for seeding
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;

-- Insert articles from the frontend articles.js file
INSERT INTO blogs (slug, title, excerpt, content, author, category, image, published, featured, published_at)
VALUES
  ('psychology-of-flower-colours-nairobi', 
   'The Psychology of Flower Colours: What Each Colour Says Without Words',
   "Have you ever wondered why someone chooses red roses instead of white roses, or why a bright yellow bouquet feels so cheerful? Understanding the psychology of flower colours helps you choose the perfect bouquet for every occasion in Nairobi.",
   'Have you ever wondered why someone chooses red roses instead of white roses, or why a bright yellow bouquet feels so cheerful? Colours have a powerful influence on our emotions, and flowers use this language beautifully.

When choosing a bouquet, the colour you select can help communicate feelings of love, appreciation, happiness, sympathy, or admiration. Understanding the psychology of flower colours can help you choose the perfect gift for every occasion.

🌹 Red Flowers: Love, Passion, and Romance. Red is one of the most powerful colours associated with love and deep emotions. Red roses, in particular, are often chosen to express romance, commitment, and admiration. Perfect for: Anniversaries, Valentine''s Day, romantic surprises, and expressing deep affection. A bouquet of red roses is a timeless way to say "I love you."

🤍 White Flowers: Purity, Elegance, and New Beginnings. White flowers represent simplicity, peace, and elegance. Their clean and graceful appearance makes them suitable for many occasions. Perfect for: Weddings, congratulations, appreciation gifts, and elegant celebrations. White roses, lilies, and other white blooms create a sophisticated and calming impression.

💗 Pink Flowers: Appreciation, Sweetness, and Affection. Pink flowers represent gentleness, admiration, and care. They are a beautiful choice when you want to show someone they are special. Perfect for: Girlfriend''s Day gifts, birthdays, thank-you gifts, and celebrating friendships. Pink roses are especially popular because they combine romance with softness.

💛 Yellow Flowers: Happiness, Friendship, and Positivity. Yellow is associated with warmth, joy, and optimism. Yellow flowers can brighten someone''s day and create a cheerful atmosphere. Perfect for: Friendship gifts, congratulations, get-well wishes, and celebrating achievements.

💜 Purple Flowers: Luxury, Creativity, and Admiration. Purple flowers often represent elegance, mystery, and beauty. They create a unique and luxurious feeling. Perfect for: Special occasions, unique gift ideas, and someone who appreciates uncommon beauty.

🧡 Orange Flowers: Energy, Excitement, and Enthusiasm. Orange flowers bring warmth and vibrancy. They are perfect for expressing excitement and celebrating memorable moments. Perfect for: Birthdays, celebrations, and encouragement gifts.

Choosing the Right Flower Colour for Your Gift. The best bouquet is one that matches both the occasion and the personality of the person receiving it. Before choosing flowers, consider: their favourite colours, the message you want to communicate, the occasion you are celebrating, and whether you want something romantic, cheerful, elegant, or unique. A carefully selected bouquet shows thoughtfulness and makes the gift more meaningful.

Find the Perfect Colourful Bouquet at Flower Lifestyle. At Flower Lifestyle, we create beautiful flower arrangements designed to match every emotion and occasion. Whether you are looking for romantic red roses, elegant white bouquets, cheerful yellow flowers, or colourful mixed arrangements, we help you create unforgettable moments. We offer fresh flower bouquets, customized gift arrangements, same-day flower delivery in Nairobi, and flowers and gift packages for every occasion. Choose the perfect flower colour and let your bouquet say what words cannot. Visit Flower Lifestyle today and find a bouquet that speaks from the heart.',
   'Flower Lifestyle',
   'tips',
   'https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1766216396653_hd1fdp.jpeg',
   true,
   true,
   '2026-08-11T00:00:00Z'
  ),
  ('best-birthday-flowers-nairobi',
   'Best Birthday Flowers in Nairobi: A Complete Gift Guide',
   'Discover the top birthday flower bouquets in Nairobi — from vibrant gerberas to elegant roses. Same-day delivery tips and how to pick the perfect arrangement.',
   'Birthdays in Nairobi deserve flowers that feel personal, fresh, and delivered on time. Whether you are surprising a colleague in the CBD, a partner in Westlands, or family in Karen, the right bouquet sets the tone for the whole celebration.

For vibrant, joyful birthdays, mixed gerbera and lily arrangements work beautifully — they photograph well and stay fresh in Nairobi''s climate when handled properly. For a classic romantic birthday, red or pink roses remain the most requested option at Flower Lifestyle.

Timing matters: order before midday for the best chance of same-day delivery across Nairobi. Include a personalized message at checkout and mention any favourite colours on WhatsApp — our florists at City Market can tailor the arrangement.

Budget guide: thoughtful birthday bouquets in Nairobi typically range from KES 3,000 for compact arrangements to KES 12,000+ for premium rose collections with add-ons like chocolates or balloons.

Ready to order? Browse our birthday collection online or message us on WhatsApp at 0742 370 307 for a custom quote.',
   'Flower Lifestyle',
   'gifts',
   'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800',
   true,
   false,
   '2026-01-15T00:00:00Z'
  ),
  ('same-day-flower-delivery-nairobi',
   'Same-Day Flower Delivery in Nairobi: How It Works',
   'Everything you need to know about ordering same-day flowers in Nairobi — areas covered, cut-off times, delivery fees, and M-Pesa checkout.',
   'Same-day flower delivery in Nairobi is one of the most popular services we offer at Flower Lifestyle. Customers order from our website or WhatsApp, and our team prepares fresh bouquets from City Market for dispatch across the city.

We regularly deliver to Nairobi CBD, Westlands, Kilimani, Lavington, Karen, Langata, South B, South C, Parklands, Eastlands, Kasarani, and along Thika Road. Countrywide delivery is available on request for major towns.

For same-day service, place your order as early as possible — ideally before 2 PM on weekdays. Delivery fees depend on distance and order size; exact costs appear at checkout or via WhatsApp quote.

Payment is easy with M-Pesa, which most Kenyan customers prefer. You can also pay by card online. Always double-check the recipient''s phone number and delivery address to avoid delays.

Need flowers delivered today? Start your order now or chat with us on WhatsApp for urgent sympathy, birthday, or anniversary requests.',
   'Flower Lifestyle',
   'delivery',
   'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800',
   true,
   false,
   '2026-02-01T00:00:00Z'
  ),
  ('anniversary-bouquet-guide-kenya',
   'How to Choose the Perfect Anniversary Bouquet in Kenya',
   'Anniversary flower ideas for couples in Kenya — rose colours, lily elegance, and combo gifts that make milestones unforgettable.',
   'Anniversaries are among the most meaningful occasions for sending flowers in Kenya. The right bouquet communicates love, appreciation, and the shared history you celebrate together.

Red roses symbolize deep love and passion — ideal for early anniversaries and romantic milestones. Pink roses express admiration and gratitude, perfect for long-term partners. White lilies add elegance for formal celebrations.

Consider upgrading to a combo: flowers with wine, chocolates, or a personalized card. Our anniversary collection includes curated sets designed for Nairobi delivery with same-day options where available.

If you are unsure which style to pick, send us a photo of a previous favourite arrangement on WhatsApp. Our florists can recreate or improve the design with fresh seasonal blooms.

Explore anniversary bouquets designed for delivery across Nairobi and Kenya.',
   'Flower Lifestyle',
   'occasions',
   'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800',
   true,
   false,
   '2026-02-14T00:00:00Z'
  ),
  ('red-roses-meaning-gift-guide',
   'Red Roses in Kenya: Meanings, Prices & When to Send Them',
   'Why red roses remain Kenya''s most popular romantic gift — symbolism, bouquet sizes, and tips for Valentine''s Day, proposals, and apologies.',
   'Red roses are timeless for a reason. In Kenya and worldwide, they represent love, desire, and respect — making them the go-to choice for Valentine''s Day, proposals, anniversaries, and romantic surprises.

A dozen premium red roses is the classic starting point, but Nairobi customers increasingly choose 24, 50, or 100-rose displays for major occasions. Quality matters: look for firm stems, deep colour, and fresh greenery.

Pair roses with a handwritten note or add a teddy bear and chocolates for a complete gift. Flower Lifestyle sources fresh roses daily and arranges them at our City Market workshop.

Order early during peak seasons like Valentine''s Day and Mother''s Day to secure your preferred delivery slot. WhatsApp ordering helps when you need custom counts or urgent dispatch.',
   'Flower Lifestyle',
   'tips',
   'https://images.unsplash.com/photo-1578439231583-9eca0a363860?w=800',
   true,
   false,
   '2026-03-01T00:00:00Z'
  ),
  ('mothers-day-flowers-kenya-ideas',
   'Mother''s Day Flowers in Kenya: 7 Thoughtful Bouquet Ideas',
   "Surprise Mum with fresh Mother's Day flowers in Nairobi — pink peonies, mixed pastels, and gift combos she will love.",
   "Mother''s Day is one of the busiest flower holidays in Kenya. Sons and daughters across Nairobi order bouquets to honour mums, grandmothers, and mother figures who deserve something beautiful.

Pastel mixed bouquets — pink, peach, and cream tones — are universally flattering. Add carnations for traditional symbolism or lilies for a premium feel. Combos with cake or a spa gift set make the day extra special.

If Mum lives outside Nairobi, ask about countrywide delivery when you order. We ship to major Kenyan towns with careful packaging to protect blooms in transit.

Personal touches win: include her favourite colours, a meaningful message, or a photo of a past arrangement she loved. Our team can help via WhatsApp at 0742 370 307.

Browse our Mother''s Day collection for ready-to-order bouquets with Nairobi same-day delivery.",
   'Flower Lifestyle',
   'occasions',
   'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
   true,
   false,
   '2026-04-20T00:00:00Z'
  ),
  ('money-bouquet-trend-kenya',
   'Money Bouquets in Kenya: The Trend Explained',
   'Why money bouquets are popular for graduations and birthdays in Nairobi — how they are made, pricing, and ordering tips.',
   'Money bouquets have become one of the most requested creative gifts in Kenya — especially for graduations, birthdays, and celebrations where you want to combine flowers with a cash gift.

These arrangements fold banknotes into rose shapes and combine them with fresh or artificial blooms for a stunning presentation. The final design depends on the amount, denomination, and occasion.

Order at least 2–3 days ahead for custom money bouquets so our team can prepare the notes and structure safely. Share the amount and preferred colours on WhatsApp when you enquire.

Money bouquets work beautifully alongside a card explaining the sentiment — whether congratulations on a degree, a milestone birthday, or a new job.

See our money bouquet collection or contact us for a custom quote tailored to your budget.',
   'Flower Lifestyle',
   'trends',
   'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=800',
   true,
   false,
   '2026-05-01T00:00:00Z'
  ),
  ('girlfriends-day-flowers-gifts-kenya',
   "Girlfriend's Day Gift Ideas: Surprise Her with Flowers She'll Never Forget",
   "Looking for the perfect Girlfriend's Day gift in Nairobi? From fresh red roses to luxury combos with chocolates and champagne — discover flowers and gifts she'll treasure, delivered same day across Nairobi.",
   "National Girlfriend's Day is your perfect opportunity to remind the special woman in your life just how much she means to you. Whether you've been together for a few months or many years, a beautifully arranged bouquet — paired with chocolates, a jewellery box, or a bottle of champagne — creates a moment she'll never forget. At Flower Lifestyle, Nairobi's favourite florist and gift shop, we make it easy to send that love straight to her door.

Why are flowers the perfect Girlfriend's Day gift? Because they speak when words fall short. A handcrafted bouquet of fresh red roses says 'I love you' louder than any text message. Pair it with Ferrero Rocher chocolates, a teddy bear, balloons, or a customized gift box and you've created a complete surprise she'll be posting about all day. Our most popular Girlfriend's Day combos include luxury rose bouquets with sparkling wine and premium chocolates — the kind of gift she'll want everyone to see.

Best flowers to give your girlfriend in Nairobi: 🌹 Red Roses — the timeless symbol of love and romance, perfect for expressing deep affection. 🌸 Pink Roses — soft and sweet, ideal for showing how much you appreciate her. 💐 Mixed Bouquets — a colourful blend for the girlfriend who loves variety and surprise. 🌻 Sunflowers — bright, bold, and full of positive energy for the free-spirited girlfriend. Whatever her personality, our florists at City Market hand-arrange every bouquet fresh on the day of delivery.

Make the surprise even more special with same-day delivery. Imagine her reaction when a stunning bouquet of red and white roses arrives unexpectedly at her workplace, university, or doorstep in Nairobi — with everyone around her admiring your thoughtfulness. Flower Lifestyle offers same-day flower delivery across Nairobi including CBD, Westlands, Kilimani, Karen, Lavington, Langata, South B, South C, Parklands, Kasarani, and Thika Road. Place your order before 2 PM for guaranteed same-day delivery.

How to choose the perfect bouquet for her: Think about her favourite colours, the flowers she's mentioned loving, and the message you want to send. Want to go all out? Add a personalised card, a box of Rellana chocolates, a bottle of rosé, or a matching jewellery piece. It's the thought — and the presentation — that makes the gesture truly meaningful. Not sure what to pick? Message our team on WhatsApp at 0742 370 307 and we'll help you build the perfect gift combo within your budget.

Why choose Flower Lifestyle — your florist near you in Nairobi? We carefully prepare every bouquet to ensure freshness, beauty, and on-time delivery. Our services include fresh premium flowers, gift and flower combos, same-day delivery across Nairobi, customised gift packages, and secure M-Pesa and card payment options. We're not just a flower shop — we're a full gift shop serving all occasions: birthdays, anniversaries, weddings, graduations, and of course, Girlfriend's Day.

National Girlfriend's Day comes only once a year — don't leave it to the last minute. Browse our Girlfriend's Day flowers and gift combos online, choose the bouquet that matches her personality, and let us deliver happiness right to her door. Make this Girlfriend's Day one she'll always remember — with beautiful flowers and gifts, delivered with love from Nairobi's most trusted florist.",
   'Flower Lifestyle',
   'occasions',
   'https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1784616477007_y4c4ir.jpg',
   true,
   true,
   '2026-07-17T00:00:00Z'
  ),
  ('flower-care-tips-nairobi',
   'How to Keep Cut Flowers Fresh Longer — 7 Florist Tips',
   'Your Nairobi florist reveals the 7 most effective ways to extend the vase life of cut flowers — from stem-cutting technique to water chemistry and storage tricks.',
   'You have just received a beautiful bouquet of fresh roses or lilies from Flower Lifestyle — now how do you make sure they last as long as possible? With the right care, most cut flowers delivered in Nairobi can stay fresh and vibrant for 7–14 days. Here are the seven most important things our florists recommend.

1. Re-cut the stems immediately. When flowers are out of water even briefly, the cut end seals over and the flower can no longer absorb water. As soon as your bouquet arrives, trim 2–3 cm off each stem at a 45° angle using clean, sharp scissors or a knife — never tear. The angled cut maximises the surface area for water uptake. Do this under running water to prevent air bubbles entering the stem.

2. Use a clean vase. Bacteria are the number one enemy of cut flowers. A vase that looks clean may harbour microscopic bacteria that will cloud the water and clog flower stems within hours. Wash your vase with hot soapy water and rinse thoroughly before each use. For extra insurance, add a small splash of household bleach (about ¼ teaspoon per litre of water).

3. Use cool, fresh water. Most cut flowers prefer cool water rather than warm. Cold water slows bacterial growth and helps maintain cell turgidity in petals. Fill your vase about two-thirds full. If your flowers came with a flower food sachet (the small packet of powder in premium bouquets), dissolve it in the water — it contains the right balance of nutrients, acidifier, and biocide to significantly extend vase life.

4. Strip leaves below the waterline. Any leaves submerged in your vase water will rot rapidly, dramatically increasing bacterial load and clouding the water. Before placing flowers in the vase, remove all foliage that sits below the water surface. Healthy leaves above the waterline are fine to leave on.

5. Keep away from heat, direct sunlight, and ripening fruit. Direct sunlight warms flowers and speeds up ageing. Radiators and air conditioning vents cause rapid dehydration. But the sneakiest enemy is ripening fruit — bananas, apples, avocados, and other fruits emit ethylene gas as they ripen, and this invisible gas actively wilts flowers. Keep your bouquet in a cool part of the room, away from the fruit bowl and the window.

6. Change the water every two days. Even with flower food, the water in your vase will become cloudy with bacteria over time. Every two days, pour out the old water, rinse the vase, refill with fresh cool water (and another sachet of flower food if you have it), and re-cut the stems by a centimetre before returning the flowers.

7. Mist delicate flowers. Spray flowers like hydrangeas, gerberas, and open roses with a light mist of cool water twice a day. These varieties absorb water through their petals as well as their stems, and regular misting helps them stay plump and fresh in Nairobi''s sometimes warm air. Avoid misting roses that have not yet fully opened, as it can cause brown spotting on delicate petals.

Following these seven steps, flowers from Flower Lifestyle typically stay beautiful for 7–10 days for roses, 5–8 days for gerberas and mixed bouquets, and up to 14 days for hardy lilies. Ready to order your next bouquet? Browse our fresh flower collection online.',
   'Flower Lifestyle',
   'care',
   'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
   true,
   false,
   '2026-06-10T00:00:00Z'
  ),
  ('best-flowers-every-occasion-nairobi',
   'Best Flowers for Every Occasion in Nairobi — A Complete Guide',
   'From birthdays and Valentine''s Day to funerals, weddings, and corporate events — a practical guide to choosing the right flowers for every occasion in Nairobi, Kenya.',
   'Choosing the right flowers for the right occasion can feel overwhelming when you''re standing in front of a shop or scrolling through an online florist. Different flowers carry different meanings, and getting it right makes the gesture far more meaningful. This guide walks through every major occasion where Nairobi customers send flowers — and exactly what to choose.

Birthday flowers in Nairobi. Birthdays call for colour and energy. Vibrant mixed bouquets featuring gerberas, sunflowers, and lilies in warm tones photograph beautifully and project celebratory joy. For a more romantic birthday (a partner or spouse), red or pink roses are still the gold standard. If you are unsure of the recipient''s taste, a money bouquet is a uniquely Kenyan option that combines the beauty of flowers with a practical cash gift — increasingly popular for milestone birthdays. See our dedicated birthday flowers page for arrangement ideas.

Valentine''s Day and romance. Red roses — full stop. In Kenya as worldwide, red roses on Valentine''s Day communicate deep love and romantic intention better than any other flower. A dozen premium Kenyan red roses remains the most requested Valentine''s order at Flower Lifestyle. If you want to stand out, a 50- or 100-stem display creates a room-filling statement. Pink roses work for early-stage relationships or when you want to express admiration without the full intensity of red.

Anniversary flowers. The classic choice is red roses, but many couples prefer variety on their anniversary — mixed bouquets with lilies, orchids, and seasonal blooms feel more personal. Upgrade to a combo: flowers with champagne, chocolates, or a personalised photo frame. For silver (25th) and golden (50th) anniversaries, white and cream lilies or yellow roses respectfully honour the milestone.

Wedding flowers in Nairobi. Weddings call for planning and consultation. White flowers — particularly roses, lilies, and gypsophila — are traditional and photograph magnificently. However, modern Kenyan weddings increasingly feature bold tropical arrangements with anthuriums, birds of paradise, and protea. Always book wedding flowers at least 2 weeks in advance and discuss your colour palette, table count, and venue style with our florists.

Sympathy and funeral flowers. White and cream tones are most appropriate: white lilies, white roses, and white chrysanthemums are the traditional choices for Kenyan funerals and sympathy arrangements. Avoid bright colours or cheerful arrangements. Wreaths and standing sprays are the most common formats. Sympathy bouquets for a bereaved friend''s home may use softer pinks and creams rather than pure white.

Corporate and office flowers in Nairobi. Corporate gifting in Nairobi increasingly includes premium flower arrangements. For office deliveries, neutral and sophisticated options work best — white lilies, orchids, or elegant mixed arrangements in white, green, and cream. Avoid strongly scented flowers in office environments where people may have allergies. For corporate event décor, we provide bulk arrangements on request.

Get-well flowers. Bright, uplifting colours help — yellow sunflowers, orange gerberas, and cheerful mixed bouquets in warm tones are ideal get-well gifts. Avoid strongly scented flowers if the recipient is in hospital (most wards restrict or discourage them). A potted plant can be a thoughtful alternative as it lasts beyond the hospital stay.

Not sure what to choose? WhatsApp our team at 0742 370 307 and describe the occasion, recipient, and your budget — we''ll recommend the perfect arrangement and handle same-day delivery across Nairobi.',
   'Flower Lifestyle',
   'gifts',
   'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800',
   true,
   false,
   '2026-06-25T00:00:00Z'
  ),
  ('flower-delivery-kiambu',
   'Flower Delivery in Kiambu — Order from Nairobi''s Best Florist',
   'Looking for flower delivery in Kiambu County? Flower Lifestyle delivers fresh bouquets from Nairobi CBD to Kiambu town, Ruaka, Limuru, Thika, and beyond. M-Pesa accepted.',
   'Kiambu County borders Nairobi and is home to some of the fastest-growing residential and urban areas in Kenya — including Kiambu town, Ruaka, Limuru, Githunguri, Thika, Juja, and Kikuyu. While Flower Lifestyle is based at City Market in Nairobi CBD, we regularly deliver fresh flowers and gift combos to customers across Kiambu County.

Areas in Kiambu we deliver to. Our delivery network extends beyond Nairobi''s boundaries to cover Ruaka (a short distance from Westlands), Kiambu town, Thika Road estates including Membley, Kahawa West and Kasarani-adjacent estates, Limuru, Kikuyu, Juja, and other Kiambu locations. Delivery times vary by distance from Nairobi CBD — contact us via WhatsApp for an exact quote and estimated delivery time for your specific location.

How to order flower delivery to Kiambu. Ordering is simple: browse our full flower collection online, add your preferred bouquet to cart, and at checkout enter your Kiambu delivery address. If you don''t see your location listed, WhatsApp us at 0742 370 307 with your address and we''ll confirm whether we can deliver and provide a delivery fee quote. We accept M-Pesa, Visa, Mastercard, and cash payments.

What to order for Kiambu delivery. Popular choices for Kiambu deliveries include: birthday bouquets (roses, mixed gerberas, or sunflowers), money bouquets for graduations from universities along Thika Road, anniversary roses, and Mother''s Day arrangements. Our flower-plus-gift combos with chocolates or teddies are particularly popular for customers in Kiambu sending a surprise to a family member or partner.

Delivery fees and lead times. Same-day delivery to Kiambu locations further from Nairobi (such as Limuru or Githunguri) may not always be possible — we recommend ordering at least one day in advance for these areas. Ruaka and Kiambu-adjacent areas close to Nairobi''s boundary can often be served same-day. Delivery fees for Kiambu range from KSh 400 to KSh 800+ depending on exact location.

To order flower delivery to any Kiambu address, browse our collection online or reach us on WhatsApp at 0742 370 307. We''re happy to provide a custom delivery quote and recommend the perfect flowers for your occasion.',
   'Flower Lifestyle',
   'delivery',
   'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800',
   true,
   false,
   '2026-07-10T00:00:00Z'
  )
ON CONFLICT (slug) DO NOTHING;

-- Re-enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Verify the articles were inserted
SELECT COUNT(*) AS total_blogs FROM blogs;
SELECT slug, title, category, published FROM blogs ORDER BY published_at DESC;
