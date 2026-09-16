# 1. Fix BranchLocator.tsx mapEmbedUrl
with open('components/BranchLocator.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'const mapEmbedUrl = `https://maps.google.com/maps?q=${currentBranch.lat},${currentBranch.lng}&hl=en&z=16&output=embed`',
    'const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(currentBranch.name + " " + currentBranch.address)}&hl=en&z=15&output=embed`'
)

with open('components/BranchLocator.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('BranchLocator.tsx fixed')

# 2. Fix DishCard.tsx spiceOptions
with open('components/DishCard.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'const hasCustomizer = item.spiceLevels && item.spiceLevels.length > 0',
    'const hasCustomizer = (item.spiceOptions && item.spiceOptions.length > 0) || (item.addons && item.addons.length > 0)'
)

with open('components/DishCard.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('DishCard.tsx fixed')

# 3. Fix CustomerReviews.tsx review.role
with open('components/CustomerReviews.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    '<span className="text-[10px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">\n                  {review.dish}\n                </span>',
    '<span className="text-[10px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">\n                  {review.role}\n                </span>'
)

with open('components/CustomerReviews.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('CustomerReviews.tsx fixed')
