// Data source: lumentale-data-research.md
// Guide content for MVP pages

export interface GuideSection {
  title: string
  content: string[]
}

export interface GuideFAQ {
  question: string
  answer: string
}

export interface Guide {
  slug: string
  title: string
  description: string
  category: 'beginner' | 'advanced' | 'combat' | 'exploration' | 'systems'
  sections: GuideSection[]
  tips: string[]
  faq: GuideFAQ[]
  related: string[]
}

export const guides: Guide[] = [
  {
    slug: 'sp-tp-explained',
    title: 'SP & TP in LumenTale: How Skill Points and Technical Points Work',
    description: 'Learn how SP (Skill Points) and TP (Technical Points) work in LumenTale, including how to earn, spend, and optimize them in battle.',
    category: 'systems',
    sections: [
      {
        title: 'What is SP (Skill Points)?',
        content: [
          'SP stands for Skill Points. SP is spent to activate your Animon\'s attribute ability during battle.',
          'Each Animon has an attribute (Felicis, Mestus, Furor, Horrens, or Sereum) that can be activated by spending SP.',
          'The exact SP cost per activation varies and is still being documented. Community sources suggest it costs extra SP on top of a move\'s normal TP cost.',
        ],
      },
      {
        title: 'What is TP (Technical Points)?',
        content: [
          'TP stands for Technical Points. TP is spent to use moves in battle.',
          'Each move has a specific TP cost. Stronger moves typically cost more TP.',
          'Managing TP across a battle is a key strategic element in LumenTale.',
        ],
      },
      {
        title: 'How SP and TP Work Together',
        content: [
          'In LumenTale battles, you spend TP to use moves and SP to activate your Animon\'s attribute bonus.',
          'Some attributes like Sereum can generate extra TP through critical hits, creating a resource loop.',
          'Balancing SP and TP usage is critical for longer boss fights with multiple health bars.',
        ],
      },
    ],
    tips: [
      'Save SP for critical moments — attribute activations can turn a fight around.',
      'Sereum-attribute Animon can help sustain TP through crits, useful for longer encounters.',
      'Watch your TP carefully in boss fights — they have multiple health bars and phases.',
    ],
    faq: [
      { question: 'What does SP mean in LumenTale?', answer: 'SP stands for Skill Points. You spend SP to activate your Animon\'s attribute ability during battle, adding an extra effect like healing, bonus damage, or increased criticals.' },
      { question: 'What does TP mean in LumenTale?', answer: 'TP stands for Technical Points. You spend TP to use moves in battle. Each move has a TP cost, and managing TP is important for strategy.' },
      { question: 'How do I get more SP and TP in battle?', answer: 'The exact mechanics for SP and TP recovery are still being documented. Community sources suggest Sereum-attribute Animon can gain extra TP through critical hits.' },
      { question: 'Is SP the same for all Animon?', answer: 'SP mechanics appear to be universal, but the effect of spending SP depends on your Animon\'s attribute (Felicis, Mestus, Furor, Horrens, or Sereum).' },
    ],
    related: ['attributes', 'best-starter', 'type-chart'],
  },
  {
    slug: 'best-starter',
    title: 'Best Starter in LumenTale: Which Animon Should You Pick?',
    description: 'Compare all five LumenTale starter Animon — Mewaii, Vortail, Ozelash, Salabel, and Queccha — and find the best pick for your playstyle.',
    category: 'beginner',
    sections: [
      {
        title: 'All Five Starters at a Glance',
        content: [
          'LumenTale offers five starter Animon, each with a unique type and attribute combination:',
          '• Mewaii — Virus/Felicis (healing and sustain)',
          '• Vortail — Aura/Mestus (bonus damage based on target HP)',
          '• Ozelash — Electric/Furor (aggressive damage boost)',
          '• Salabel — Demon/Horrens (resistance bypass finisher)',
          '• Queccha — Geo/Sereum (critical hits and TP gain)',
        ],
      },
      {
        title: 'Best for Beginners: Mewaii',
        content: [
          'Mewaii\'s Felicis attribute provides healing after attacks, which gives new players extra survivability while learning the battle system.',
          'Healing reduces the need for recovery items and lets you stay in fights longer.',
        ],
      },
      {
        title: 'Best for Aggressive Players: Ozelash',
        content: [
          'Ozelash\'s Furor attribute directly boosts move damage, rewarding players who prefer to hit hard and fast.',
          'Electric-type moves are often strong and straightforward.',
        ],
      },
      {
        title: 'Best for Strategic Players: Queccha',
        content: [
          'Queccha\'s Sereum attribute increases critical chance and grants extra TP on crits, creating a powerful resource engine for longer fights.',
          'This makes Queccha excellent for boss battles and extended encounters.',
        ],
      },
      {
        title: 'Important: Path-Dependent Final Evolutions',
        content: [
          'Official Steam news confirms that starter final evolutions depend on whether you follow the Mythos or Logos path.',
          'This means your starter\'s ultimate form is influenced by story choices, not just leveling.',
          'Second-stage evolutions are confirmed: Mewaii → Maidelly, Vortail → Furtex, Ozelash → Kouzear, Salabel → Vilender, Queccha → Quequator.',
        ],
      },
    ],
    tips: [
      'There is no wrong choice — all starters are viable through the game.',
      'Consider your preferred playstyle: sustain (Mewaii), raw damage (Ozelash), or crits/resource (Queccha).',
      'Your story path (Mythos or Logos) will affect your starter\'s final evolution.',
      'Lampecko may be given to you temporarily before you choose a starter.',
    ],
    faq: [
      { question: 'Which starter is the best in LumenTale?', answer: 'The best starter depends on your playstyle. Mewaii is best for beginners (healing), Ozelash for aggressive players (damage boost), and Queccha for strategic players (crits and TP gain). All starters are viable.' },
      { question: 'Can you change your starter in LumenTale?', answer: 'There is no confirmed way to change your starter after choosing. Choose carefully based on the playstyle you enjoy most.' },
      { question: 'Do starter evolutions depend on story choices?', answer: 'Yes! Official sources confirm that starter final evolutions differ based on the Mythos or Logos path you follow in the story.' },
      { question: 'What are the starter evolutions?', answer: 'Mewaii evolves into Maidelly, Vortail into Furtex, Ozelash into Kouzear, Salabel into Vilender, and Queccha into Quequator. Final evolutions are path-dependent.' },
      { question: 'What happens if I pick the wrong starter?', answer: 'There is no wrong choice. All five starters are viable through the entire game. Pick based on your preferred playstyle: healing (Mewaii), consistent damage (Vortail), burst damage (Ozelash), resistance bypass (Salabel), or crits and resource (Queccha).' },
    ],
    related: ['evolution-guide', 'attributes', 'team-builder'],
  },
  {
    slug: 'attributes',
    title: 'Attributes in LumenTale: Felicis, Mestus, Furor, Horrens & Sereum Explained',
    description: 'Understand the five LumenTale attributes — Felicis, Mestus, Furor, Horrens, and Sereum — and how they affect battle strategy.',
    category: 'systems',
    sections: [
      {
        title: 'What Are Attributes?',
        content: [
          'Every Animon in LumenTale has an Attribute that determines its special activation ability in battle.',
          'Unlike elemental types, which determine offensive and defensive matchups, attributes provide an active skill that costs SP to trigger.',
          'There are five attributes: Felicis, Mestus, Furor, Horrens, and Sereum.',
        ],
      },
      {
        title: 'Felicis — Healing & Sustain',
        content: [
          'Felicis restores health to allies after an attack when activated.',
          'Best for: players who value survivability and sustained team performance.',
          'Starter with Felicis: Mewaii (Virus-type).',
        ],
      },
      {
        title: 'Mestus — Bonus Damage',
        content: [
          'Mestus adds damage based on the target\'s maximum HP when activated.',
          'Best for: consistent extra damage, especially against high-HP targets like bosses.',
          'Starter with Mestus: Vortail (Aura-type).',
        ],
      },
      {
        title: 'Furor — Aggressive Damage',
        content: [
          'Furor increases the damage of the move used when activated.',
          'Best for: burst damage strategies and aggressive playstyles.',
          'Starter with Furor: Ozelash (Electric-type).',
        ],
      },
      {
        title: 'Horrens — Resistance Bypass',
        content: [
          'Horrens can bypass enemy resistance in a finishing context when activated.',
          'Best for: dealing with tanky or resistant opponents, finishing off low-HP targets.',
          'Starter with Horrens: Salabel (Demon-type).',
        ],
      },
      {
        title: 'Sereum — Critical Hits & TP',
        content: [
          'Sereum increases critical chance when activated, and critical hits grant extra TP.',
          'Best for: resource-efficient play, longer fights, and snowballing through crit chains.',
          'Starter with Sereum: Queccha (Geo-type).',
        ],
      },
    ],
    tips: [
      'Attribute activation costs SP — budget your resources wisely.',
      'Sereum\'s TP-on-crit effect creates a positive feedback loop in longer fights.',
      'Horrens is especially useful against boss-type Animon with resistance.',
      'Your starter\'s attribute is fixed, but wild Animon of any attribute exist.',
    ],
    faq: [
      { question: 'What are the attributes in LumenTale?', answer: 'There are five attributes: Felicis (healing), Mestus (bonus HP-based damage), Furor (damage boost), Horrens (resistance bypass), and Sereum (crit chance + TP gain).' },
      { question: 'How do attributes work in battle?', answer: 'Each Animon has one attribute. You can spend SP to activate the attribute\'s effect during battle, adding a strategic layer on top of type matchups and move selection.' },
      { question: 'Can an Animon change its attribute?', answer: 'No confirmed mechanic for changing attributes has been documented. Each Animon has a fixed attribute.' },
    ],
    related: ['sp-tp-explained', 'best-starter', 'type-chart'],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getAllGuides(): Guide[] {
  return guides
}
